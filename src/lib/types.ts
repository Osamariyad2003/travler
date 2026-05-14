export type PlaceCategory =
  | "free_activity"
  | "cheap_food"
  | "public_transport"
  | "market"
  | "viewpoint"
  | "water_refill"
  | "hostel_area"
  | "walking_route_stop"
  | "safety_warning"
  | "scam_warning"
  | "other";

export type SubmissionStatus = "pending" | "approved" | "rejected";

export type SubmissionType = "place" | "route" | "tripTemplate";

export type UserRole = "user" | "admin";

export type RouteDifficulty = "easy" | "moderate" | "hard";

export type TravelStyle =
  | "budget"
  | "student"
  | "backpacker"
  | "family"
  | "solo"
  | "couple";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  savedPlaces: string[];
  createdAt: number;
}

export interface City {
  id: string;
  name: string;
  country: string;
  centerLatitude: number;
  centerLongitude: number;
  defaultZoom: number;
  currency: string;
  description: string;
}

export interface Place {
  id: string;
  cityId: string;
  name: string;
  category: PlaceCategory;
  latitude: number;
  longitude: number;
  estimatedCost: string;
  description: string;
  localTip: string;
  openingHours?: string;
  source?: string;
  status: SubmissionStatus;
  createdAt: number;
  updatedAt: number;
}

export interface RouteStop {
  name: string;
  latitude: number;
  longitude: number;
  note?: string;
}

export interface Route {
  id: string;
  cityId: string;
  name: string;
  estimatedTime: string;
  estimatedDistance: string;
  estimatedCost: string;
  difficulty: RouteDifficulty;
  stops: RouteStop[];
  coordinates: Array<[number, number]>;
  description: string;
  status: SubmissionStatus;
  createdAt: number;
  updatedAt: number;
}

export interface TripTemplateDay {
  day: number;
  title: string;
  activities: string[];
}

export interface TripTemplate {
  id: string;
  cityId: string;
  title: string;
  days: number;
  travelStyle: TravelStyle;
  estimatedBudget: string;
  itinerary: TripTemplateDay[];
  tips: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Submission {
  id: string;
  userId: string;
  type: SubmissionType;
  cityId: string;
  data: Partial<Place> | Partial<Route> | Partial<TripTemplate>;
  status: SubmissionStatus;
  createdAt: number;
  reviewedAt?: number;
  reviewedBy?: string;
}

export interface Video {
  /** Stable identifier from the source (e.g. Pexels video ID). */
  id: string;
  /** Direct MP4 URL playable by the <video> element. */
  url: string;
  /** Optional poster URL (preview frame). */
  posterUrl?: string;
  /** Width in pixels. */
  width?: number;
  /** Height in pixels. */
  height?: number;
  /** Photographer / contributor credit. */
  credit: {
    name: string;
    profileUrl?: string;
  };
  /** Source service ("Pexels"). */
  sourceName: string;
  /** Link back to the video on the source service. */
  sourceUrl: string;
}

export interface Photo {
  /** Stable identifier from the source (e.g. Mapillary image ID). */
  id: string;
  /** Display URL for the rendered image. */
  url: string;
  /** Alt text. */
  alt: string;
  /** Photographer / contributor credit. */
  credit: {
    name: string;
    profileUrl?: string;
  };
  /** Source service ("Mapillary"). */
  sourceName: string;
  /** Link back to the photo on the source service. */
  sourceUrl: string;
  /** Approximate capture date (ms epoch). */
  capturedAt?: number;
}

export interface PlaceSubmissionInput {
  cityId: string;
  name: string;
  category: PlaceCategory;
  latitude: number;
  longitude: number;
  estimatedCost: string;
  description: string;
  localTip: string;
  source?: string;
}
