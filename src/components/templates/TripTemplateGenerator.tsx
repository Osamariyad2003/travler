"use client";

import { useMemo, useState } from "react";

import TripTemplateCard from "@/components/templates/TripTemplateCard";
import type { City, Place, Route, TravelStyle, TripTemplate } from "@/lib/types";

interface GeneratedTripBundle {
  city: City;
  places: Place[];
  routes: Route[];
  templates: TripTemplate[];
  source: "ai" | "osm-only";
}

interface TripTemplateGeneratorProps {
  cities: City[];
}

const STYLE_OPTIONS: Array<{ value: TravelStyle; label: string }> = [
  { value: "budget", label: "Budget" },
  { value: "backpacker", label: "Backpacker" },
  { value: "student", label: "Student" },
  { value: "solo", label: "Solo" },
  { value: "couple", label: "Couple" },
  { value: "family", label: "Family" },
];

function getErrorMessage(data: unknown): string | null {
  if (typeof data === "object" && data !== null && "error" in data) {
    const error = (data as { error?: unknown }).error;
    return typeof error === "string" ? error : null;
  }
  return null;
}

function isGeneratedTripBundle(data: unknown): data is GeneratedTripBundle {
  return (
    typeof data === "object" &&
    data !== null &&
    "city" in data &&
    "templates" in data &&
    Array.isArray((data as { templates?: unknown }).templates)
  );
}

export default function TripTemplateGenerator({
  cities,
}: TripTemplateGeneratorProps) {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("2");
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("budget");
  const [bundle, setBundle] = useState<GeneratedTripBundle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatedHref = useMemo(() => {
    if (!bundle) return null;
    const params = new URLSearchParams({
      q: destination.trim() || `${bundle.city.name}, ${bundle.city.country}`,
      days,
      style: travelStyle,
    });
    return `/templates/generated?${params.toString()}`;
  }, [bundle, days, destination, travelStyle]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = destination.trim();
    if (!query) return;

    setLoading(true);
    setError(null);
    setBundle(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          days: Number(days),
          travelStyle,
        }),
      });
      const data = (await response.json()) as unknown;

      if (!response.ok) {
        throw new Error(getErrorMessage(data) || "Could not generate a trip plan.");
      }

      if (!isGeneratedTripBundle(data)) {
        throw new Error("Generator returned an unexpected response.");
      }

      setBundle(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not generate a trip plan."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mb-12 rounded-lg border border-cocoa-100 bg-coral-50 p-5 shadow-card">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-coral-600">
            Generate
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-cocoa-800">
            Create a trip template
          </h2>
          <p className="mt-2 text-sm leading-6 text-cocoa-500">
            Type any city and Traveler will build a budget itinerary from map
            data. If AI is configured, it enriches the plan with current local
            tips; otherwise it creates a practical map-based draft.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 grid gap-3" noValidate>
            <label className="block">
              <span className="text-sm font-medium text-cocoa-800">
                Destination
              </span>
              <input
                type="text"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                list="template-generator-cities"
                className="form-input"
                placeholder="e.g. Tokyo, Japan"
                autoComplete="off"
                required
              />
              <datalist id="template-generator-cities">
                {cities.map((city) => (
                  <option key={city.id} value={`${city.name}, ${city.country}`} />
                ))}
              </datalist>
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-cocoa-800">Days</span>
                <select
                  value={days}
                  onChange={(event) => setDays(event.target.value)}
                  className="form-input"
                >
                  {[1, 2, 3, 4, 5, 7].map((dayCount) => (
                    <option key={dayCount} value={dayCount}>
                      {dayCount} day{dayCount === 1 ? "" : "s"}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-cocoa-800">
                  Style
                </span>
                <select
                  value={travelStyle}
                  onChange={(event) =>
                    setTravelStyle(event.target.value as TravelStyle)
                  }
                  className="form-input"
                >
                  {STYLE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Generating..." : "Generate trip template"}
            </button>
          </form>

          {error ? (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </p>
          ) : null}
        </div>

        <div>
          {bundle?.templates.length ? (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cocoa-400">
                Generated from {bundle.source === "ai" ? "OSM + AI" : "OSM"}
              </p>
              <TripTemplateCard
                template={bundle.templates[0]}
                cityName={bundle.city.name}
                href={generatedHref}
              />
            </div>
          ) : (
            <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-cocoa-200 bg-white p-6 text-center text-sm leading-6 text-cocoa-500">
              {loading
                ? "Looking up places, routes, and itinerary ideas..."
                : "Your generated template will appear here."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
