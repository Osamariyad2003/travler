import { doc, getDoc, setDoc } from "firebase/firestore";

import { COLLECTIONS } from "./firestore";
import { getDb } from "./firebase-db";
import {
  POI_TARGET,
  fetchOsmPoisAround,
  geocodeCity,
  type OsmPoi,
} from "./geo";
import {
  formatDistance,
  formatDuration,
  routeWalking,
} from "./routing";
import type {
  City,
  Place,
  Route,
  RouteStop,
  TravelStyle,
  TripTemplate,
} from "./types";
import { slugify, titleCase } from "./utils";

export interface GeneratedCityBundle {
  city: City;
  places: Place[];
  routes: Route[];
  templates: TripTemplate[];
  source: "osm-only";
}

interface GenerateOptions {
  query: string;
  /** Stable id used as the city slug. */
  cityId?: string;
  tripDays?: number;
  travelStyle?: TravelStyle;
}

// L1: fast, but process-local — gone on every serverless cold start and not
// shared across concurrently-scaled instances.
const memoryCache = new Map<string, GeneratedCityBundle>();

// L2: Firestore-backed, shared across every instance. This is what actually
// protects the fair-use-only Nominatim/Overpass/OSRM public endpoints under
// real concurrent traffic — without it, every cold instance re-generates
// (and re-hits those endpoints for) the same city independently.
async function readCachedBundle(
  cacheKey: string
): Promise<GeneratedCityBundle | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, COLLECTIONS.generatedCityCache, cacheKey));
    if (!snap.exists()) return null;
    return snap.data() as GeneratedCityBundle;
  } catch (err) {
    console.warn("generateCity: Firestore cache read failed", err);
    return null;
  }
}

async function writeCachedBundle(
  cacheKey: string,
  bundle: GeneratedCityBundle
): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    await setDoc(doc(db, COLLECTIONS.generatedCityCache, cacheKey), bundle);
  } catch (err) {
    console.warn("generateCity: Firestore cache write failed", err);
  }
}

export async function generateCity({
  query,
  cityId,
  tripDays,
  travelStyle = "budget",
}: GenerateOptions): Promise<GeneratedCityBundle | null> {
  const slug = cityId ?? slugify(query);
  const days = clampTripDays(tripDays);
  const cacheKey = `${slug}:${days}:${travelStyle}`;

  const memoryHit = memoryCache.get(cacheKey);
  if (memoryHit) return memoryHit;

  const firestoreHit = await readCachedBundle(cacheKey);
  if (firestoreHit) {
    memoryCache.set(cacheKey, firestoreHit);
    return firestoreHit;
  }

  const geo = await geocodeCity(query);
  if (!geo) return null;

  let pois = await fetchOsmPoisAround(geo.latitude, geo.longitude, 5000);
  if (pois.length < POI_TARGET * 0.7) {
    // Sparse city centre — widen the search radius to fill out the map.
    const expanded = await fetchOsmPoisAround(
      geo.latitude,
      geo.longitude,
      9000
    );
    if (expanded.length > pois.length) pois = expanded;
  }
  if (pois.length === 0) return null;

  const trimmed = pois.slice(0, POI_TARGET);
  const now = Date.now();

  const city: City = {
    id: slug,
    name: titleCase(geo.name),
    country: geo.country || "—",
    centerLatitude: geo.latitude,
    centerLongitude: geo.longitude,
    defaultZoom: 13,
    currency: "Local",
    description: `Map of ${geo.name} generated from OpenStreetMap data. Showing free activities, cheap food, public transport, and viewpoints near the city centre.`,
  };

  const places: Place[] = trimmed.map((poi) => ({
    id: `${slug}-${slugify(poi.name)}-${shortId(poi.osmId)}`,
    cityId: slug,
    name: poi.name,
    category: poi.category,
    latitude: poi.latitude,
    longitude: poi.longitude,
    estimatedCost: defaultCost(poi),
    description: defaultDescription(poi),
    localTip:
      "Verify opening hours before visiting — OpenStreetMap data is community-edited.",
    openingHours: poi.tags.opening_hours,
    source: "OpenStreetMap",
    status: "approved",
    createdAt: now,
    updatedAt: now,
  }));

  const routes = await buildRoute(slug, places);
  const templates = buildTemplate(slug, city, places, {
    tripDays: days,
    travelStyle,
  });

  const bundle: GeneratedCityBundle = {
    city,
    places,
    routes,
    templates,
    source: "osm-only",
  };
  memoryCache.set(cacheKey, bundle);
  await writeCachedBundle(cacheKey, bundle);
  return bundle;
}

function shortId(input: string): string {
  return input.replace(/[^a-z0-9]/gi, "").slice(-6);
}

function clampTripDays(days: number | undefined): number {
  if (!Number.isFinite(days)) return 2;
  return Math.max(1, Math.min(7, Math.round(days ?? 2)));
}

function styleLabel(style: TravelStyle): string {
  return style.charAt(0).toUpperCase() + style.slice(1);
}

function defaultCost(poi: OsmPoi): string {
  if (poi.category === "water_refill") return "Free";
  if (poi.category === "free_activity") return "Free / low cost";
  if (poi.category === "public_transport") return "Local fare";
  if (poi.category === "cheap_food") return "Budget";
  return "Varies";
}

function defaultDescription(poi: OsmPoi): string {
  const tagBits: string[] = [];
  if (poi.tags.cuisine) tagBits.push(`cuisine: ${poi.tags.cuisine}`);
  if (poi.tags.historic) tagBits.push(`historic: ${poi.tags.historic}`);
  if (poi.tags.tourism) tagBits.push(`tourism: ${poi.tags.tourism}`);
  return tagBits.length
    ? `OSM-tagged ${tagBits.join(", ")}.`
    : "Mapped from OpenStreetMap. Add a description through the submit form.";
}

async function buildRoute(cityId: string, places: Place[]): Promise<Route[]> {
  if (places.length < 2) return [];
  const now = Date.now();

  const stopsSource = places.slice(0, Math.min(5, places.length));
  const stops: RouteStop[] = stopsSource.map((p) => ({
    name: p.name,
    latitude: p.latitude,
    longitude: p.longitude,
  }));

  // Try to route along actual streets via OSRM. Falls back to straight lines
  // between stops if OSRM is unreachable, rate-limits us, or can't find a
  // walking path (e.g. stops on opposite sides of an unbridged river).
  const straightLine: Array<[number, number]> = stopsSource.map((p) => [
    p.latitude,
    p.longitude,
  ]);
  const roadPath = await routeWalking(stops);

  const distanceLabel = roadPath
    ? formatDistance(roadPath.distanceKm)
    : formatDistance(approxDistance(straightLine));
  const timeLabel = roadPath
    ? formatDuration(roadPath.durationMinutes)
    : "2 – 3 hours";

  return [
    {
      id: `${cityId}-generated-walk`,
      cityId,
      name: `Highlights of ${places[0].cityId}`,
      estimatedTime: timeLabel,
      estimatedDistance: distanceLabel,
      estimatedCost: "Free walking",
      difficulty: "moderate",
      stops,
      coordinates: roadPath?.coordinates ?? straightLine,
      description:
        "Auto-generated walking route connecting the highest-rated free attractions in the city centre.",
      status: "approved",
      createdAt: now,
      updatedAt: now,
    },
  ];
}

function buildTemplate(
  cityId: string,
  city: City,
  places: Place[],
  options: { tripDays: number; travelStyle: TravelStyle }
): TripTemplate[] {
  const now = Date.now();
  const days = clampTripDays(options.tripDays);
  const itinerary = buildFallbackItinerary(days, places);
  return [
    {
      id: `${cityId}-generated-template`,
      cityId,
      title: `${days}-day ${styleLabel(options.travelStyle).toLowerCase()} ${city.name}`,
      days,
      travelStyle: options.travelStyle,
      estimatedBudget: `Low-cost, varies in ${city.currency}`,
      itinerary,
      tips: [
        "Check opening hours before leaving; generated plans use community map data.",
        "Keep the route flexible and group nearby stops to save on transport.",
        "Carry small cash for markets, buses, and inexpensive local food.",
      ],
      createdAt: now,
      updatedAt: now,
    },
  ];
}

function buildFallbackItinerary(
  days: number,
  places: Place[]
): TripTemplate["itinerary"] {
  const preferred = [
    ...places.filter((p) => p.category === "free_activity"),
    ...places.filter((p) => p.category === "viewpoint"),
    ...places.filter((p) => p.category === "market"),
    ...places.filter((p) => p.category === "cheap_food"),
    ...places.filter((p) => p.category === "walking_route_stop"),
    ...places.filter((p) => p.category === "public_transport"),
    ...places.filter((p) => p.category === "water_refill"),
    ...places.filter(
      (p) => p.category === "safety_warning" || p.category === "scam_warning"
    ),
  ];
  const unique = preferred.filter(
    (place, index, all) => all.findIndex((p) => p.id === place.id) === index
  );
  const source = unique.length ? unique : places;
  const themes = [
    "City centre basics",
    "Food, markets, and viewpoints",
    "Neighbourhood walk",
    "Low-cost local life",
    "Slow final day",
    "Outer neighbourhoods",
    "Flexible buffer day",
  ];

  return Array.from({ length: days }, (_, index) => {
    const picks = Array.from({ length: 3 }, (_, offset) => {
      if (!source.length) return null;
      return source[(index * 3 + offset) % source.length];
    }).filter((place): place is Place => Boolean(place));

    const activities = picks.length
      ? picks.map((place, placeIndex) => {
          const time = ["Morning", "Lunch / midday", "Afternoon"][placeIndex];
          return `${time}: ${place.name} (${place.estimatedCost})`;
        })
      : [
          "Morning: Start with the main square or central market.",
          "Lunch / midday: Choose a simple local meal near the centre.",
          "Afternoon: Walk to a free viewpoint or public park.",
        ];

    return {
      day: index + 1,
      title: themes[index] ?? `Budget day ${index + 1}`,
      activities,
    };
  });
}

function approxDistance(coords: Array<[number, number]>): number {
  let km = 0;
  for (let i = 1; i < coords.length; i++) {
    km += haversine(coords[i - 1], coords[i]);
  }
  return km;
}

function haversine(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
