"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import CitySelector from "@/components/map/CitySelector";
import MapFilters from "@/components/map/MapFilters";
import RoutePanel from "@/components/map/RoutePanel";
import PlaceList from "@/components/places/PlaceList";
import TripTemplateCard from "@/components/templates/TripTemplateCard";
import { PLACE_CATEGORIES } from "@/lib/constants";
import type { City, Place, PlaceCategory, Route } from "@/lib/types";

const TravelerMap = dynamic(() => import("@/components/map/TravelerMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-coral-50 text-sm text-cocoa-500">
      Loading map…
    </div>
  ),
});

interface CityMapViewProps {
  city: City;
  cities: City[];
  places: Place[];
  routes: Route[];
  generatedTemplates?: import("@/lib/types").TripTemplate[];
  generatedSource?: "ai" | "osm-only";
}

export default function CityMapView({
  city,
  cities,
  places,
  routes,
  generatedTemplates,
  generatedSource,
}: CityMapViewProps) {
  const [active, setActive] = useState<Set<PlaceCategory>>(
    () => new Set(PLACE_CATEGORIES)
  );
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [recenterToken, setRecenterToken] = useState(0);

  const filteredPlaces = useMemo(
    () => places.filter((p) => active.has(p.category)),
    [places, active]
  );

  function toggle(cat: PlaceCategory) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-4">
          <CitySelector cities={cities} selectedId={city.id} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-coral-600">
              {city.country}
            </p>
            <h1 className="font-display text-4xl font-semibold text-cocoa-800 sm:text-5xl">
              {city.name}
            </h1>
            <div className="mt-3 h-px w-20 bg-coral-300" />
            <p className="mt-3 max-w-2xl text-sm text-cocoa-500">
              {city.description}
            </p>
            {generatedSource ? (
              <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-coral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-coral-700">
                {generatedSource === "ai"
                  ? "Generated · OSM + Claude"
                  : "Generated · OSM"}
              </p>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setRecenterToken((t) => t + 1)}
          className="btn-ghost"
        >
          Recenter map
        </button>
      </header>

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="order-2 h-[65vh] min-h-[420px] overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-cocoa-100 lg:order-1">
          <TravelerMap
            city={city}
            places={filteredPlaces}
            routes={routes}
            selectedRouteId={selectedRouteId}
            recenterToken={recenterToken}
          />
        </div>

        <aside className="order-1 space-y-4 lg:order-2">
          <MapFilters
            active={active}
            onToggle={toggle}
            onSelectAll={() => setActive(new Set(PLACE_CATEGORIES))}
            onClearAll={() => setActive(new Set())}
          />
          <RoutePanel
            routes={routes}
            selectedRouteId={selectedRouteId}
            onSelect={setSelectedRouteId}
          />
        </aside>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-3xl font-semibold text-cocoa-800">
          Places ({filteredPlaces.length})
        </h2>
        <div className="h-px w-20 bg-coral-300" />
        <PlaceList
          places={filteredPlaces}
          emptyMessage="No places match these filters. Try enabling more categories."
        />
      </section>

      {generatedTemplates && generatedTemplates.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-display text-3xl font-semibold text-cocoa-800">
            Suggested itinerary
          </h2>
          <div className="h-px w-20 bg-coral-300" />
          <ul className="grid gap-5 md:grid-cols-2">
            {generatedTemplates.map((tpl) => (
              <li key={tpl.id}>
                <TripTemplateCard
                  template={tpl}
                  cityName={city.name}
                  href={`/templates/generated?q=${encodeURIComponent(
                    `${city.name}, ${city.country}`
                  )}&days=${tpl.days}&style=${tpl.travelStyle}`}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
