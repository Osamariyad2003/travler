import {
  fetchPhotosByQueries,
  isUnsplashConfigured,
} from "@/lib/unsplash";
import type { City, Photo } from "@/lib/types";

import DestinationGalleryCarousel from "./DestinationGalleryCarousel";

interface DestinationGalleryProps {
  cities: City[];
}

export default async function DestinationGallery({
  cities,
}: DestinationGalleryProps) {
  if (cities.length === 0) return null;

  const photos: Array<Photo | null> = isUnsplashConfigured
    ? await fetchPhotosByQueries(
        cities.map((c) => `${c.name} ${c.country} travel`)
      )
    : cities.map(() => null);

  return <DestinationGalleryCarousel cities={cities} photos={photos} />;
}
