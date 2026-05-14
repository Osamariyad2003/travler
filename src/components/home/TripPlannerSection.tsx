import {
  fetchPhotosByQueries,
  isUnsplashConfigured,
} from "@/lib/unsplash";
import type { City, Photo, TripTemplate } from "@/lib/types";

import TripPlannerCarousel from "./TripPlannerCarousel";

interface TripPlannerSectionProps {
  templates: TripTemplate[];
  cities: City[];
}

export default async function TripPlannerSection({
  templates,
  cities,
}: TripPlannerSectionProps) {
  if (templates.length === 0) return null;

  const cityById: Record<string, City> = Object.fromEntries(
    cities.map((c) => [c.id, c])
  );

  const photos: Array<Photo | null> = isUnsplashConfigured
    ? await fetchPhotosByQueries(
        templates.map((t) => {
          const c = cityById[t.cityId];
          const cityName = c?.name ?? t.cityId;
          return `${cityName} landmark travel`;
        })
      )
    : templates.map(() => null);

  return (
    <TripPlannerCarousel
      templates={templates}
      photos={photos}
      cities={cities}
    />
  );
}
