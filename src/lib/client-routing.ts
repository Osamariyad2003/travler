/**
 * Browser-safe OSRM foot-routing helper used by "Start real trip" to draw a
 * walking path from the user's current GPS fix through a sequence of city
 * places. Mirrors src/lib/routing.ts but strips the Next.js server-only
 * `next: { revalidate }` fetch option so it runs in the browser.
 *
 * OSRM's public demo at router.project-osrm.org is CORS-enabled and free
 * for fair-use; it's the same endpoint the server-side helper hits.
 */

const OSRM_BASE = "https://router.project-osrm.org";
const WALKING_KMH = 4.2;

export interface Waypoint {
  latitude: number;
  longitude: number;
}

export interface LiveTripPath {
  /** Polyline points in Leaflet [lat, lng] order. */
  coordinates: Array<[number, number]>;
  /** Total walking distance in kilometres. */
  distanceKm: number;
  /** Estimated walking time in minutes (computed from distance, not OSRM). */
  durationMinutes: number;
}

interface OsrmResponse {
  code: string;
  routes?: Array<{
    geometry: { coordinates: Array<[number, number]> };
    distance: number;
    duration: number;
  }>;
}

export async function routeWalkingClient(
  stops: Waypoint[]
): Promise<LiveTripPath | null> {
  if (stops.length < 2) return null;

  const coords = stops
    .map((s) => `${s.longitude.toFixed(6)},${s.latitude.toFixed(6)}`)
    .join(";");
  const url =
    `${OSRM_BASE}/route/v1/foot/${coords}` +
    `?overview=full&geometries=geojson&continue_straight=false`;

  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as OsrmResponse;
    if (data.code !== "Ok") return null;
    const route = data.routes?.[0];
    if (!route) return null;

    const coordinates = route.geometry.coordinates.map(
      ([lng, lat]) => [lat, lng] as [number, number]
    );
    const distanceKm = route.distance / 1000;
    const durationMinutes = (distanceKm / WALKING_KMH) * 60;
    return { coordinates, distanceKm, durationMinutes };
  } catch {
    return null;
  }
}

/** Great-circle distance in km between two points (Haversine). */
export function haversineKm(
  a: Waypoint,
  b: Waypoint
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatKm(km: number): string {
  if (km < 0.1) return "<100 m";
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function formatMinutes(minutes: number): string {
  if (minutes < 1) return "<1 min";
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = minutes / 60;
  if (hours < 1.5) return "≈ 1 hour";
  return `${hours.toFixed(1).replace(/\.0$/, "")} hours`;
}
