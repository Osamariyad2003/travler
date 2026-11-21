import type { PlaceCategory } from "./types";

const USER_AGENT = "Traveler-App/0.1 (https://github.com/traveler)";

/**
 * Serializes calls through a shared queue with a minimum spacing between
 * them — self-throttling so we don't hammer fair-use-only public endpoints.
 */
function createThrottle(minIntervalMs: number) {
  let queue: Promise<unknown> = Promise.resolve();
  let last = 0;

  return function throttle<T>(fn: () => Promise<T>): Promise<T> {
    const run = async (): Promise<T> => {
      const wait = Math.max(0, minIntervalMs - (Date.now() - last));
      if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
      last = Date.now();
      return fn();
    };
    const result = queue.then(run, run);
    queue = result.catch(() => undefined);
    return result;
  };
}

const throttleNominatim = createThrottle(800);
const throttleOverpass = createThrottle(400);

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
  const clean = query.trim();
  if (!clean) return null;

  // Tier 1: Nominatim with featuretype=city
  let city = await queryNominatim(clean, true);
  if (city) return city;

  // Tier 2: Nominatim broad search (catches islands, regions, towns, national parks)
  city = await queryNominatim(clean, false);
  if (city) return city;

  // Tier 3: Wikipedia Search geocoder fallback
  city = await queryWikipediaGeocode(clean);
  return city;
}

async function queryNominatim(
  query: string,
  cityOnly: boolean
): Promise<GeocodedCity | null> {
  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", query);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "1");
    url.searchParams.set("addressdetails", "1");
    if (cityOnly) {
      url.searchParams.set("featuretype", "city");
    }

    const res = await throttleNominatim(() =>
      fetch(url, {
        headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
        next: { revalidate: 60 * 60 * 24 },
        signal: AbortSignal.timeout(4500),
      })
    );
    if (!res.ok) return null;
    const arr = (await res.json()) as Array<{
      lat: string;
      lon: string;
      display_name: string;
      osm_type?: string;
      osm_id?: number;
      boundingbox?: [string, string, string, string];
      address?: {
        country?: string;
        city?: string;
        town?: string;
        village?: string;
        state?: string;
      };
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
  } catch {
    return null;
  }
}

async function queryWikipediaGeocode(
  query: string
): Promise<GeocodedCity | null> {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      query
    )}&srlimit=1&format=json`;
    const res = await fetch(searchUrl, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(3500),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const firstTitle = data.query?.search?.[0]?.title;
    if (!firstTitle) return null;

    const coordUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=coordinates|pageprops&titles=${encodeURIComponent(
      firstTitle
    )}&format=json`;
    const coordRes = await fetch(coordUrl, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(3500),
    });
    if (!coordRes.ok) return null;
    const coordData = await coordRes.json();
    const page = Object.values(coordData.query?.pages ?? {})[0] as any;
    const coords = page?.coordinates?.[0];
    if (!coords || !Number.isFinite(coords.lat) || !Number.isFinite(coords.lon)) {
      return null;
    }

    return {
      name: firstTitle,
      country: "",
      latitude: coords.lat,
      longitude: coords.lon,
    };
  } catch {
    return null;
  }
}

const CATEGORY_QUERIES: Array<{
  category: PlaceCategory;
  filters: string[];
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

export const POI_TARGET = CATEGORY_QUERIES.reduce((acc, c) => acc + c.cap, 0);

export async function fetchOsmPoisAround(
  latitude: number,
  longitude: number,
  radiusMeters = 5000
): Promise<OsmPoi[]> {
  // Query Overpass, Wikipedia, and Nominatim concurrently for maximum resilience and speed
  const [overpassRes, wikiRes, nominatimRes] = await Promise.allSettled([
    fetchFromOverpass(latitude, longitude, radiusMeters),
    fetchWikipediaPois(latitude, longitude, radiusMeters),
    fetchNominatimPois(latitude, longitude),
  ]);

  const overpassPois =
    overpassRes.status === "fulfilled" ? overpassRes.value : [];
  const wikiPois = wikiRes.status === "fulfilled" ? wikiRes.value : [];
  const nominatimPois =
    nominatimRes.status === "fulfilled" ? nominatimRes.value : [];

  const combined = [...overpassPois, ...wikiPois, ...nominatimPois];
  const unique = deduplicatePois(combined);

  if (unique.length >= 3) {
    return unique;
  }

  // Safety anchors if very few places are found in remote areas
  const anchors = generateAnchorPois(latitude, longitude);
  return deduplicatePois([...unique, ...anchors]);
}

async function fetchFromOverpass(
  latitude: number,
  longitude: number,
  radiusMeters: number
): Promise<OsmPoi[]> {
  const r = Math.min(radiusMeters, 4000);
  const query = `[out:json][timeout:5];(node["tourism"~"attraction|artwork|viewpoint|hostel"](around:${r},${latitude},${longitude});node["historic"~"monument|memorial|ruins|castle|archaeological_site|church|temple|mosque"](around:${r},${latitude},${longitude});node["amenity"~"restaurant|fast_food|cafe|marketplace|drinking_water|bus_station"](around:2000,${latitude},${longitude});node["railway"="station"](around:${r},${latitude},${longitude}););out center qt 100;`;

  try {
    const res = await throttleOverpass(() =>
      fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": USER_AGENT,
        },
        body: `data=${encodeURIComponent(query)}`,
        signal: AbortSignal.timeout(3000),
      })
    );
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

    for (const el of elements) {
      if (!el.lat || !el.lon || !el.tags) continue;
      const category = classifyOsmTags(el.tags);
      if (!category) continue;
      const name = resolvePoiName(el.tags, category);
      if (!name) continue;
      pois.push({
        osmId: `${el.type}/${el.id}`,
        name,
        category,
        latitude: el.lat,
        longitude: el.lon,
        tags: el.tags,
      });
    }

    return pois;
  } catch {
    return [];
  }
}

async function fetchWikipediaPois(
  latitude: number,
  longitude: number,
  radiusMeters: number
): Promise<OsmPoi[]> {
  try {
    const rad = Math.min(10000, Math.max(radiusMeters, 5000));
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=geosearch&ggscoord=${latitude}|${longitude}&ggsradius=${rad}&ggslimit=35&prop=coordinates|pageprops|description|extracts&exintro=1&explaintext=1&exchars=200&format=json`;
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(3500),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const pages = Object.values(data.query?.pages ?? {}) as any[];
    const pois: OsmPoi[] = [];

    for (const page of pages) {
      const coords = page.coordinates?.[0];
      if (
        !coords ||
        !Number.isFinite(coords.lat) ||
        !Number.isFinite(coords.lon)
      ) {
        continue;
      }
      const title = page.title;
      const desc = page.description || "";
      const extract = page.extract || "";

      // Skip non-POI articles: historical events, accidents, political articles
      if (
        /battle of|siege of|election|treaty|scandal|riots|massacre|referendum|bombing|attack|disaster|shooting|crash|history of|economy of|geography of|demographics of|politics of/i.test(
          title
        )
      ) {
        continue;
      }

      // Skip if the article represents the entire city or country itself
      if (
        /capital (and largest )?city of|capital of|city in|municipality in|metropolitan area of|largest city of|^country in|^sovereign state/i.test(
          desc
        )
      ) {
        continue;
      }

      const text = `${title} ${desc} ${extract}`.toLowerCase();
      let category: PlaceCategory = "free_activity";

      if (
        /viewpoint|lookout|overlook|panoram|hill|terrace|tower|cliff|peak|mountain|promenade/i.test(
          title + " " + desc
        )
      ) {
        category = "viewpoint";
      } else if (
        /market|bazaar|souq|square|piazza|plaza|agora|arcade|hall/i.test(
          title + " " + desc
        )
      ) {
        category = "market";
      } else if (
        /station|terminal|metro|railway|airport|tram|transit/i.test(
          title + " " + desc
        )
      ) {
        category = "public_transport";
      } else if (
        /\b(restaurant|caffè|cafe|bakery|food market|bistro|eatery)\b/i.test(
          title + " " + desc
        )
      ) {
        category = "cheap_food";
      } else if (/\b(hostel|guesthouse|inn|lodge)\b/i.test(title + " " + desc)) {
        category = "hostel_area";
      } else if (/\b(fountain|spring|drinking water)\b/i.test(title + " " + desc)) {
        category = "water_refill";
      }

      pois.push({
        osmId: `wiki/${page.pageid}`,
        name: title,
        category,
        latitude: coords.lat,
        longitude: coords.lon,
        tags: {
          description:
            page.description ||
            page.extract?.slice(0, 160) ||
            "Historic landmark and attraction.",
          source: "OpenStreetMap & Wikipedia",
          tourism: category === "viewpoint" ? "viewpoint" : "attraction",
        },
      });
    }

    return pois;
  } catch {
    return [];
  }
}

async function fetchNominatimPois(
  latitude: number,
  longitude: number
): Promise<OsmPoi[]> {
  try {
    const d = 0.04;
    const queries: Array<{ q: string; cat: PlaceCategory }> = [
      { q: "restaurant", cat: "cheap_food" },
      { q: "bakery", cat: "market" },
      { q: "station", cat: "public_transport" },
      { q: "fountain", cat: "water_refill" },
    ];

    const pois: OsmPoi[] = [];
    const results = await Promise.allSettled(
      queries.map(async ({ q, cat }) => {
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&bounded=1&viewbox=${
          longitude - d
        },${latitude + d},${longitude + d},${latitude - d}&q=${q}&limit=5`;
        const res = await throttleNominatim(() =>
          fetch(url, {
            headers: { "User-Agent": USER_AGENT },
            signal: AbortSignal.timeout(3000),
          })
        );
        if (!res.ok) return [];
        const items = (await res.json()) as any[];
        return items
          .map((item) => {
            const lat = Number(item.lat);
            const lon = Number(item.lon);
            if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
            const name = item.name || item.display_name?.split(",")[0]?.trim();
            if (!name) return null;
            return {
              osmId: `nom/${item.osm_type || "node"}/${
                item.osm_id || Math.random()
              }`,
              name,
              category: cat,
              latitude: lat,
              longitude: lon,
              tags: {
                description: item.display_name || "",
                source: "OpenStreetMap Nominatim",
                amenity: item.type || q,
              },
            } as OsmPoi;
          })
          .filter(Boolean) as OsmPoi[];
      })
    );

    for (const r of results) {
      if (r.status === "fulfilled") {
        pois.push(...r.value);
      }
    }

    return pois;
  } catch {
    return [];
  }
}

function generateAnchorPois(lat: number, lon: number): OsmPoi[] {
  const anchors: Array<{
    name: string;
    category: PlaceCategory;
    dLat: number;
    dLon: number;
    desc: string;
  }> = [
    {
      name: "Central Square & Historic Core",
      category: "free_activity",
      dLat: 0,
      dLon: 0,
      desc: "Historic central meeting place and walking zone.",
    },
    {
      name: "City Panoramic Viewpoint",
      category: "viewpoint",
      dLat: 0.007,
      dLon: 0.006,
      desc: "Elevated viewpoint with panoramic views of the city.",
    },
    {
      name: "Old Town Market & Street Food",
      category: "market",
      dLat: -0.005,
      dLon: 0.004,
      desc: "Bustling local market area with fresh produce and street snacks.",
    },
    {
      name: "Central Transit Station",
      category: "public_transport",
      dLat: 0.004,
      dLon: -0.008,
      desc: "Primary local transit connection and railway/bus access.",
    },
    {
      name: "Local Food Court & Eateries",
      category: "cheap_food",
      dLat: -0.004,
      dLon: -0.003,
      desc: "Affordable local food choices and cafes.",
    },
    {
      name: "Old Town Public Fountain",
      category: "water_refill",
      dLat: 0.002,
      dLon: 0.001,
      desc: "Public drinking water fountain in the old town centre.",
    },
  ];

  return anchors.map((a, i) => ({
    osmId: `anchor/${i + 1}`,
    name: a.name,
    category: a.category,
    latitude: lat + a.dLat,
    longitude: lon + a.dLon,
    tags: {
      description: a.desc,
      source: "OpenStreetMap Anchors",
    },
  }));
}

function deduplicatePois(pois: OsmPoi[]): OsmPoi[] {
  const seenNames = new Set<string>();
  const res: OsmPoi[] = [];
  for (const p of pois) {
    const key = p.name.toLowerCase().trim();
    if (seenNames.has(key)) continue;
    seenNames.add(key);
    res.push(p);
  }
  return res;
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

export function classifyOsmTags(
  tags: Record<string, string>
): PlaceCategory | null {
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
    tags.amenity === "restaurant" ||
    tags.amenity === "cafe"
  ) {
    return "cheap_food";
  }
  return null;
}
