import type { PlaceCategory } from "./types";

const USER_AGENT = "Traveler-App/0.1 (https://github.com/traveler)";

export interface GeocodedCity {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  /** Bounding box [south, north, west, east] when available. */
  boundingBox?: [number, number, number, number];
  osmType?: string;
  osmId?: number;
}

export interface OsmPoi {
  osmId: string;
  name: string;
  category: PlaceCategory;
  latitude: number;
  longitude: number;
  tags: Record<string, string>;
}

export async function geocodeCity(query: string): Promise<GeocodedCity | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("featuretype", "city");

  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) return null;
  const arr = (await res.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
    osm_type?: string;
    osm_id?: number;
    boundingbox?: [string, string, string, string];
    address?: { country?: string; city?: string; town?: string; village?: string };
    name?: string;
  }>;
  if (!arr.length) return null;
  const first = arr[0];
  const lat = Number(first.lat);
  const lon = Number(first.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  const name =
    first.address?.city ??
    first.address?.town ??
    first.address?.village ??
    first.name ??
    first.display_name.split(",")[0]?.trim() ??
    query;

  const bb = first.boundingbox?.map(Number) as
    | [number, number, number, number]
    | undefined;

  return {
    name,
    country: first.address?.country ?? "",
    latitude: lat,
    longitude: lon,
    boundingBox: bb && bb.every((n) => Number.isFinite(n)) ? bb : undefined,
    osmType: first.osm_type,
    osmId: first.osm_id,
  };
}

const CATEGORY_QUERIES: Array<{
  category: PlaceCategory;
  filters: string[];
  /** Soft cap on results per category to keep the map readable. */
  cap: number;
}> = [
  {
    category: "free_activity",
    filters: [
      'node["tourism"="attraction"]',
      'node["tourism"="artwork"]',
      'node["historic"~"monument|memorial|ruins|castle|archaeological_site|church|temple|mosque"]',
    ],
    cap: 14,
  },
  {
    category: "viewpoint",
    filters: ['node["tourism"="viewpoint"]'],
    cap: 8,
  },
  {
    category: "cheap_food",
    filters: [
      'node["amenity"="restaurant"]',
      'node["amenity"="fast_food"]',
      'node["amenity"="food_court"]',
      'node["amenity"="cafe"]',
    ],
    cap: 14,
  },
  {
    category: "market",
    filters: [
      'node["amenity"="marketplace"]',
      'node["shop"="bakery"]',
      'node["shop"="greengrocer"]',
    ],
    cap: 6,
  },
  {
    category: "public_transport",
    filters: [
      'node["amenity"="bus_station"]',
      'node["highway"="bus_stop"]',
      'node["railway"="station"]',
      'node["public_transport"="station"]',
    ],
    cap: 10,
  },
  {
    category: "water_refill",
    filters: ['node["amenity"="drinking_water"]'],
    cap: 4,
  },
  {
    category: "hostel_area",
    filters: ['node["tourism"="hostel"]'],
    cap: 4,
  },
];

/** Total target places returned by the generator. */
export const POI_TARGET = CATEGORY_QUERIES.reduce((acc, c) => acc + c.cap, 0);

export async function fetchOsmPoisAround(
  latitude: number,
  longitude: number,
  radiusMeters = 5000
): Promise<OsmPoi[]> {
  const sections = CATEGORY_QUERIES.map(({ filters }) =>
    filters
      .map((f) => `${f}(around:${radiusMeters},${latitude},${longitude});`)
      .join("\n")
  ).join("\n");

  const query = `[out:json][timeout:30];\n(\n${sections}\n);\nout body 600;`;
  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": USER_AGENT,
    },
    body: `data=${encodeURIComponent(query)}`,
    next: { revalidate: 60 * 60 * 12 },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as {
    elements?: Array<{
      type: string;
      id: number;
      lat?: number;
      lon?: number;
      tags?: Record<string, string>;
    }>;
  };
  const elements = data.elements ?? [];

  const pois: OsmPoi[] = [];
  const buckets: Record<PlaceCategory, OsmPoi[]> = {
    free_activity: [],
    cheap_food: [],
    public_transport: [],
    market: [],
    viewpoint: [],
    water_refill: [],
    hostel_area: [],
    walking_route_stop: [],
    safety_warning: [],
    scam_warning: [],
    other: [],
  };

  for (const el of elements) {
    if (!el.lat || !el.lon || !el.tags) continue;
    const category = classifyOsmTags(el.tags);
    if (!category) continue;
    const name = resolvePoiName(el.tags, category);
    if (!name) continue;
    buckets[category].push({
      osmId: `${el.type}/${el.id}`,
      name,
      category,
      latitude: el.lat,
      longitude: el.lon,
      tags: el.tags,
    });
  }

  for (const { category, cap } of CATEGORY_QUERIES) {
    pois.push(...buckets[category].slice(0, cap));
  }
  return pois;
}

function resolvePoiName(
  tags: Record<string, string>,
  category: PlaceCategory
): string | null {
  const named =
    tags.name ??
    tags["name:en"] ??
    tags["int_name"] ??
    tags["official_name"];
  if (named) return named;

  // Categories where unnamed nodes are still useful (drinking fountains,
  // unnamed bus stops). Provide a generic but informative label.
  if (category === "water_refill") {
    return tags["drinking_water:legal"] === "yes"
      ? "Drinking water (potable)"
      : "Drinking water";
  }
  if (category === "public_transport") {
    if (tags.highway === "bus_stop") return "Bus stop";
    if (tags.railway === "station") return "Train station";
    if (tags.public_transport === "station") return "Transit station";
    if (tags.amenity === "bus_station") return "Bus station";
  }
  return null;
}

function classifyOsmTags(tags: Record<string, string>): PlaceCategory | null {
  if (tags.tourism === "viewpoint") return "viewpoint";
  if (
    tags.tourism === "attraction" ||
    tags.tourism === "artwork" ||
    tags.historic
  ) {
    return "free_activity";
  }
  if (tags.tourism === "hostel") return "hostel_area";
  if (tags.amenity === "drinking_water") return "water_refill";
  if (tags.amenity === "marketplace" || tags.shop === "bakery") return "market";
  if (
    tags.amenity === "bus_station" ||
    tags.public_transport === "station" ||
    tags.railway === "station"
  ) {
    return "public_transport";
  }
  if (
    tags.amenity === "fast_food" ||
    tags.amenity === "food_court" ||
    tags.amenity === "restaurant"
  ) {
    return "cheap_food";
  }
  return null;
}
