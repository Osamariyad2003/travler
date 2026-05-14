"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import type { City, Photo, Place } from "@/lib/types";

import ExploreCityDetail from "./ExploreCityDetail";
import ExploreSidebar from "./ExploreSidebar";

const ExploreMap = dynamic(() => import("./ExploreMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-coral-50 text-sm text-cocoa-500">
      Loading map…
    </div>
  ),
});

interface ExploreClientProps {
  cities: City[];
  photoById: Record<string, Photo | null>;
  placesByCity: Record<string, Place[]>;
}

export default function ExploreClient({
  cities,
  photoById,
  placesByCity,
}: ExploreClientProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCity = useMemo(
    () => (selectedId ? cities.find((c) => c.id === selectedId) ?? null : null),
    [selectedId, cities]
  );

  return (
    <div className="grid h-[calc(100vh-65px)] grid-cols-1 lg:grid-cols-[380px_1fr]">
      <ExploreSidebar
        cities={cities}
        photoById={photoById}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      {/* Right pane: map always mounted (preserves pan/zoom across detail
          open/close cycles); detail panel overlays on selection. */}
      <div className="relative h-full min-h-[420px] bg-coral-50">
        <ExploreMap
          cities={cities}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        {selectedCity ? (
          <div className="absolute inset-0 z-10 bg-white">
            <ExploreCityDetail
              city={selectedCity}
              places={placesByCity[selectedCity.id] ?? []}
              onClose={() => setSelectedId(null)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
