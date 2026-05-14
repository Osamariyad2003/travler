import type { Place } from "@/lib/types";

import PlaceCard from "./PlaceCard";

interface PlaceListProps {
  places: Place[];
  emptyMessage?: string;
  onFocusPlace?: (place: Place) => void;
}

export default function PlaceList({
  places,
  emptyMessage = "No places match your filters yet.",
  onFocusPlace,
}: PlaceListProps) {
  if (places.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-cocoa-200 bg-coral-50 p-4 text-sm text-cocoa-600">
        {emptyMessage}
      </p>
    );
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place) => (
        <li key={place.id}>
          <PlaceCard place={place} onFocus={onFocusPlace} />
        </li>
      ))}
    </ul>
  );
}
