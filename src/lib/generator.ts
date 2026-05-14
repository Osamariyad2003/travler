import { enrichCityWithAi, isAiConfigured } from "./ai";
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
  source: "ai" | "osm-only";
}

interface GenerateOptions {
  query: string;
  /** Stable id used as the city slug. */
  cityId?: string;
  tripDays?: number;
  travelStyle?: TravelStyle;
}

const cache = new Map<string, GeneratedCityBundle>();

export async function generateCity({
  query,
  cityId,
  tripDays,
  travelStyle = "budget",
}: GenerateOptions): Promise<GeneratedCityBundle | null> {
  const slug = cityId ?? slugify(query);
  const days = clampTripDays(tripDays);
  const cacheKey = `${slug}:${days}:${travelStyle}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

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
  const enrichment = isAiConfigured
    ? await enrichCityWithAi({
        cityName: geo.name,
        country: geo.country,
        poiNames: trimmed.map((p) => p.name),
        tripDays: days,
        travelStyle,
      })
    : null;

  const now = Date.now();

  const city: City = {
    id: slug,
    name: titleCase(geo.name),
    country: geo.country || "—",
    centerLatitude: geo.latitude,
    centerLongitude: geo.longitude,
    defaultZoom: 13,
    currency: enrichment?.currency || "Local",
    description:
      enrichment?.description ||
      `Map of ${geo.name} generated from OpenStreetMap data. Showing free activities, cheap food, public transport, and viewpoints near the city centre.`,
  };

  const enrichmentByName = new Map<string, NonNullable<typeof enrichment>["places"][number]>();
  if (enrichment) {
    for (const p of enrichment.places) {
      enrichmentByName.set(normalizeName(p.name), p);
    }
  }

  const places: Place[] = trimmed.map((poi) => {
    const enriched = enrichmentByName.get(normalizeName(poi.name));
    return {
      id: `${slug}-${slugify(poi.name)}-${shortId(poi.osmId)}`,
      cityId: slug,
      name: poi.name,
      category: poi.category,
      latitude: poi.latitude,
      longitude: poi.longitude,
      estimatedCost: enriched?.estimatedCost ?? defaultCost(poi),
      description: enriched?.description ?? defaultDescription(poi),
      localTip:
        enriched?.localTip ??
        "Verify opening hours before visiting — OpenStreetMap data is community-edited.",
      openingHours: enriched?.openingHours ?? poi.tags.opening_hours,
      source: "OpenStreetMap" + (enrichment ? " + Gemini" : ""),
      status: "approved",
      createdAt: now,
      updatedAt: now,
    };
  });

  const routes = await buildRoute(slug, places, enrichment);
  const templates = buildTemplate(slug, city, places, enrichment, {
    tripDays: days,
    travelStyle,
  });

  const bundle: GeneratedCityBundle = {
    city,
    places,
    routes,
    templates,
    source: enrichment ? "ai" : "osm-only",
  };
  cache.set(cacheKey, bundle);
  return bundle;
}

function normalizeName(input: string): string {
  return input.trim().toLowerCase();
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

async function buildRoute(
  cityId: string,
  places: Place[],
  enrichment: Awaited<ReturnType<typeof enrichCityWithAi>>
): Promise<Route[]> {
  if (places.length < 2) return [];
  const now = Date.now();

  let stopsSource = places.slice(0, Math.min(5, places.length));
  if (enrichment?.routeStopOrder?.length) {
    const map = new Map(places.map((p) => [normalizeName(p.name), p]));
    const ordered = enrichment.routeStopOrder
      .map((n) => map.get(normalizeName(n)))
      .filter((p): p is Place => Boolean(p));
    if (ordered.length >= 2) stopsSource = ordered;
  }

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

  // Prefer routed values: they're empirically accurate vs. LLM guesses or
  // crow-flies haversine. But honour the LLM's strings if routing fails AND
  // the LLM provided one.
  const distanceLabel = roadPath
    ? formatDistance(roadPath.distanceKm)
    : enrichment?.routeEstimatedDistance ??
      formatDistance(approxDistance(straightLine));
  const timeLabel = roadPath
    ? formatDuration(roadPath.durationMinutes)
    : enrichment?.routeEstimatedTime ?? "2 – 3 hours";

  return [
    {
      id: `${cityId}-generated-walk`,
      cityId,
      name: enrichment?.routeName ?? `Highlights of ${places[0].cityId}`,
      estimatedTime: timeLabel,
      estimatedDistance: distanceLabel,
      estimatedCost: "Free walking",
      difficulty: enrichment?.routeDifficulty ?? "moderate",
      stops,
      coordinates: roadPath?.coordinates ?? straightLine,
      description:
        enrichment?.routeDescription ??
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
  enrichment: Awaited<ReturnType<typeof enrichCityWithAi>>,
  options: { tripDays: number; travelStyle: TravelStyle }
): TripTemplate[] {
  const now = Date.now();
  const t = enrichment?.tripTemplate ?? {
    title: "",
    days: options.tripDays,
    estimatedBudget: `Low-cost, varies in ${city.currency}`,
    itinerary: [],
    tips: [],
  };
  const days = clampTripDays(t?.days || options.tripDays);
  const fallback = buildFallbackItinerary(days, places);
  const itinerary =
    t?.itinerary?.length === days
      ? t.itinerary
      : normalizeItinerary(t?.itinerary, fallback);
  return [
    {
      id: `${cityId}-generated-template`,
      cityId,
      title:
        t?.title ||
        `${days}-day ${styleLabel(options.travelStyle).toLowerCase()} ${city.name}`,
      days,
      travelStyle: options.travelStyle,
      estimatedBudget: t.estimatedBudget || "—",
      itinerary,
      tips:
        t?.tips?.length
          ? t.tips
          : [
              "Check opening hours before leaving; generated plans use community map data.",
              "Keep the route flexible and group nearby stops to save on transport.",
              "Carry small cash for markets, buses, and inexpensive local food.",
            ],
      createdAt: now,
      updatedAt: now,
    },
  ];
}

function normalizeItinerary(
  generated:
    | Array<{
        day: number;
        title: string;
        activities: string[];
      }>
    | undefined,
  fallback: TripTemplate["itinerary"]
): TripTemplate["itinerary"] {
  if (!generated?.length) return fallback;
  return fallback.map((fallbackDay, index) => {
    const generatedDay = generated[index];
    if (!generatedDay?.activities?.length) return fallbackDay;
    return {
      day: index + 1,
      title: generatedDay.title || fallbackDay.title,
      activities: generatedDay.activities,
    };
  });
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
