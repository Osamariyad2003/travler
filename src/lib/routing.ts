/**
 * Road-following walking routes via OSRM (Open Source Routing Machine).
 *
 * OSRM's public demo server (https://router.project-osrm.org) is free, has no
 * auth requirement, and is the standard "open" routing endpoint used by OSM
 * tooling. It's fair-use only — for production traffic, host your own (the
 * server is open-source) or swap to OpenRouteService with a free key.
 *
 * The endpoint we use:
 *   GET /route/v1/foot/{lon,lat;lon,lat;...}?overview=full&geometries=geojson
 *   ↳ returns geometry as GeoJSON [lon, lat] pairs that we flip to [lat, lng]
 *     for Leaflet's Polyline component.
 */

const OSRM_BASE =
  process.env.OSRM_BASE_URL ?? "https://router.project-osrm.org";

export interface RoadPath {
  /** Polyline points in Leaflet order: [lat, lng]. */
  coordinates: Array<[number, number]>;
  /** Total walking distance from OSRM, in kilometres. */
  distanceKm: number;
  /** OSRM's estimated walking duration, in minutes. */
  durationMinutes: number;
}

interface Waypoint {
  latitude: number;
  longitude: number;
}

interface OsrmRouteResponse {
  code: string;
  routes?: Array<{
    geometry: { coordinates: Array<[number, number]> };
    distance: number;
    duration: number;
  }>;
}

/**
 * Realistic walking pace for a budget traveller stopping at every viewpoint
 * and food stall — slower than the 5 km/h "fitness pace" most routers
 * assume. Override per-deploy if your OSRM instance's `foot` profile is
 * tuned differently.
 */
const WALKING_KMH = 4.2;

/**
 * Resolve a walking path through the given ordered stops by snapping to the
 * actual street network. Returns null on routing failure — callers should
 * fall back to straight-line geometry.
 */
export async function routeWalking(
  stops: Waypoint[]
): Promise<RoadPath | null> {
  if (stops.length < 2) return null;

  // OSRM expects lon,lat (the GIS convention), opposite of Leaflet's [lat, lng].
  const coords = stops
    .map((s) => `${s.longitude.toFixed(6)},${s.latitude.toFixed(6)}`)
    .join(";");

  const url =
    `${OSRM_BASE}/route/v1/foot/${coords}` +
    `?overview=full&geometries=geojson&continue_straight=false`;

  try {
    const res = await fetch(url, {
      // Cache 24h — same coords always return the same path until OSM updates.
      next: { revalidate: 60 * 60 * 24 },
      // Wall-clock timeout so a hanging public-demo doesn't block page render.
      signal: AbortSignal.timeout(8000),
      headers: {
        // OSRM doesn't require this but the public demo's fair-use logs key
        // off it — identifying ourselves is polite and helps debugging.
        "User-Agent": "traveler-app (+https://github.com/traveler)",
      },
    });
    if (!res.ok) {
      console.warn(`OSRM ${res.status} for ${stops.length} waypoints`);
      return null;
    }
    const data = (await res.json()) as OsrmRouteResponse;
    if (data.code !== "Ok") {
      console.warn("OSRM non-Ok code:", data.code);
      return null;
    }
    const route = data.routes?.[0];
    if (!route) return null;

    // GeoJSON [lng, lat] → Leaflet [lat, lng]
    const coordinates = route.geometry.coordinates.map(
      ([lng, lat]) => [lat, lng] as [number, number]
    );
    const distanceKm = route.distance / 1000;
    // Don't trust OSRM's duration — the public demo's `foot` profile silently
    // falls back to driving on unknown profiles, giving car-speed durations.
    // Compute walking time from the routed distance for honesty.
    const durationMinutes = (distanceKm / WALKING_KMH) * 60;
    return {
      coordinates,
      distanceKm,
      durationMinutes,
    };
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      console.warn("OSRM request timed out");
    } else {
      console.warn("OSRM request failed", err);
    }
    return null;
  }
}

/**
 * Format distance + duration for display fields like Route.estimatedTime.
 * Hours-if-≥1, otherwise minutes; rounded sensibly.
 */
export function formatDuration(minutes: number): string {
  if (minutes < 1) return "<1 min";
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = minutes / 60;
  if (hours < 1.5) return "≈ 1 hour";
  return `${hours.toFixed(1).replace(/\.0$/, "")} hours`;
}

export function formatDistance(km: number): string {
  if (km < 0.1) return "<100 m";
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}
