import ExploreClient from "@/components/explore/ExploreClient";
import { fetchCities } from "@/lib/firestore";
import { samplePlaces } from "@/lib/sampleData";
import type { Photo, Place } from "@/lib/types";
import {
  fetchPhotosByQueries,
  isUnsplashConfigured,
} from "@/lib/unsplash";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const cities = await fetchCities();
  const photos: Array<Photo | null> = isUnsplashConfigured
    ? await fetchPhotosByQueries(
        cities.map((c) => `${c.name} ${c.country} travel`)
      )
    : cities.map(() => null);

  const photoById: Record<string, Photo | null> = Object.fromEntries(
    cities.map((c, i) => [c.id, photos[i] ?? null])
  );

  // Group curated places by cityId once, server-side. Most of the 110 cities
  // only have entries via OSM live-generation (per-page-load), so this map
  // typically only contains the 4 hand-curated cities. Cities without
  // curated places render a "open the full city map" CTA in the detail
  // panel, which the user can click to trigger live-generation.
  const placesByCity: Record<string, Place[]> = {};
  for (const place of samplePlaces) {
    if (place.status !== "approved") continue;
    if (!placesByCity[place.cityId]) placesByCity[place.cityId] = [];
    placesByCity[place.cityId].push(place);
  }

  return (
    <ExploreClient
      cities={cities}
      photoById={photoById}
      placesByCity={placesByCity}
    />
  );
}
