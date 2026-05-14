import type { PlaceCategory } from "./types";

export const APP_NAME = "Traveler";

export const APP_TAGLINE =
  "Budget travel planning with free activities, cheap food, and simple 2D maps.";

export const PLACE_CATEGORIES: PlaceCategory[] = [
  "free_activity",
  "cheap_food",
  "public_transport",
  "market",
  "viewpoint",
  "water_refill",
  "hostel_area",
  "walking_route_stop",
  "safety_warning",
  "scam_warning",
  "other",
];

export const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  free_activity: "Free activity",
  cheap_food: "Cheap food",
  public_transport: "Public transport",
  market: "Market",
  viewpoint: "Viewpoint",
  water_refill: "Water refill",
  hostel_area: "Hostel area",
  walking_route_stop: "Walking route stop",
  safety_warning: "Safety warning",
  scam_warning: "Scam warning",
  other: "Other",
};

export const CATEGORY_EMOJI: Record<PlaceCategory, string> = {
  free_activity: "★",
  cheap_food: "🍽",
  public_transport: "🚌",
  market: "🛒",
  viewpoint: "⛰",
  water_refill: "💧",
  hostel_area: "🛏",
  walking_route_stop: "🚶",
  safety_warning: "⚠",
  scam_warning: "🚫",
  other: "📍",
};

export const CATEGORY_COLORS: Record<PlaceCategory, string> = {
  free_activity: "#10b981",
  cheap_food: "#f59e0b",
  public_transport: "#3b82f6",
  market: "#a855f7",
  viewpoint: "#0ea5e9",
  water_refill: "#06b6d4",
  hostel_area: "#6366f1",
  walking_route_stop: "#84cc16",
  safety_warning: "#ef4444",
  scam_warning: "#dc2626",
  other: "#6b7280",
};

export const DEFAULT_CITY_ID = "amman";

export const TILE_LAYER_URL =
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export const TILE_LAYER_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/**
 * Default centre + zoom for the world overview map at /cities.
 * Mirrors https://www.openstreetmap.org/#map=7/31.300/37.131 — a Middle East
 * regional view that frames the featured city (Amman) but lets users pan
 * out to find the other 30+ destinations.
 */
export const WORLD_MAP_CENTER: [number, number] = [31.3, 37.131];
export const WORLD_MAP_ZOOM = 7;
