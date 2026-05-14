"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

import TripDateStrip from "@/components/templates/TripDateStrip";
import { CATEGORY_COLORS, CATEGORY_EMOJI, CATEGORY_LABELS } from "@/lib/constants";
import type { City, Place } from "@/lib/types";
import { fetchDailyWeather, type DayWeather } from "@/lib/weather";

const TripDayMap = dynamic(
  () => import("@/components/templates/TripDayMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-coral-50 text-xs text-cocoa-500">
        Loading map…
      </div>
    ),
  }
);

interface ExploreCityDetailProps {
  city: City;
  /** Curated places (sample/Firestore). Empty = live-generate via API. */
  places: Place[];
  onClose: () => void;
}

const FORECAST_DAYS = 5;

type PlacesState =
  | { kind: "ready"; places: Place[]; source: "curated" | "live" }
  | { kind: "loading" }
  | { kind: "error"; message: string };

function todayUtc(): Date {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
}

export default function ExploreCityDetail({
  city,
  places: curated,
  onClose,
}: ExploreCityDetailProps) {
  const [weather, setWeather] = useState<DayWeather[] | null>(null);
  const [activeDay, setActiveDay] = useState(0);
  const [placesState, setPlacesState] = useState<PlacesState>(() =>
    curated.length > 0
      ? { kind: "ready", places: curated, source: "curated" }
      : { kind: "loading" }
  );

  // Weather refetch on city change.
  useEffect(() => {
    let cancelled = false;
    setWeather(null);
    setActiveDay(0);
    fetchDailyWeather(
      city.centerLatitude,
      city.centerLongitude,
      todayUtc(),
      FORECAST_DAYS
    ).then((result) => {
      if (!cancelled) setWeather(result);
    });
    return () => {
      cancelled = true;
    };
  }, [city.id, city.centerLatitude, city.centerLongitude]);

  // Places: curated if bundled, otherwise live-generate via /api/generate.
  // First call per city is slow (Overpass ~2s; Claude enrichment ~5-15s);
  // subsequent calls hit the in-process generator cache and return instantly.
  useEffect(() => {
    let cancelled = false;
    if (curated.length > 0) {
      setPlacesState({ kind: "ready", places: curated, source: "curated" });
      return;
    }

    setPlacesState({ kind: "loading" });

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: `${city.name}, ${city.country}` }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `HTTP ${res.status}`);
        }
        return res.json() as Promise<{ places?: Place[] }>;
      })
      .then((data) => {
        if (cancelled) return;
        if (!data.places || data.places.length === 0) {
          setPlacesState({
            kind: "error",
            message: "No places returned. Try the full city map.",
          });
          return;
        }
        setPlacesState({
          kind: "ready",
          places: data.places.slice(0, 12), // cap for the detail panel
          source: "live",
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setPlacesState({
          kind: "error",
          message:
            err instanceof Error ? err.message : "Live generation failed.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [city.id, city.name, city.country, curated]);

  const dayWeather = weather?.[activeDay];
  const stops =
    placesState.kind === "ready" ? placesState.places : ([] as Place[]);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      {/* Header bar */}
      <header className="flex flex-wrap items-center gap-3 border-b border-cocoa-100 bg-white px-6 py-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-cocoa-200 px-3 py-1.5 text-xs font-semibold text-cocoa-700 transition hover:border-coral-300 hover:text-coral-600"
        >
          ← Back to world map
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-coral-600">
            {city.country} · {city.currency}
            {placesState.kind === "ready" ? (
              <span className="ml-2 rounded-full bg-coral-100 px-2 py-0.5 text-coral-700">
                {placesState.source === "curated" ? "Curated" : "Live · OSM"}
              </span>
            ) : null}
          </p>
          <h2 className="font-display text-2xl font-semibold text-cocoa-800 sm:text-3xl">
            {city.name}
          </h2>
        </div>
        <Link
          href={`/cities/${city.id}`}
          className="hidden rounded-full bg-coral-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-coral-600 sm:inline-flex"
        >
          Open full city map →
        </Link>
      </header>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-6">
        <p className="mb-5 text-sm text-cocoa-600">{city.description}</p>

        {/* Weather strip */}
        <section className="mb-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-cocoa-500">
            Next {FORECAST_DAYS} days · weather
          </p>
          {weather ? (
            <TripDateStrip
              weather={weather}
              activeDayIndex={activeDay}
              onSelect={setActiveDay}
            />
          ) : (
            <div className="flex gap-3">
              {Array.from({ length: FORECAST_DAYS }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-[78px] min-w-[150px] animate-pulse rounded-xl bg-coral-50"
                />
              ))}
            </div>
          )}
        </section>

        {/* Day card with checkpoints + map */}
        <section className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-cocoa-100">
          <header className="flex flex-wrap items-center gap-3 border-b border-cocoa-100 bg-coral-50/50 px-6 py-4">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-coral-500 text-xs font-bold text-white"
            >
              {activeDay + 1}
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-cocoa-800">
                {city.name} highlights
              </p>
              <p className="text-xs text-cocoa-500">
                {dayWeather ? (
                  <>
                    <span aria-hidden="true">{dayWeather.emoji} </span>
                    {dayWeather.label}
                    {dayWeather.temperatureMaxC !== null
                      ? ` · max ${Math.round(dayWeather.temperatureMaxC)}°C`
                      : ""}
                  </>
                ) : weather ? (
                  "Forecast unavailable"
                ) : (
                  "Checking forecast…"
                )}
              </p>
            </div>
          </header>

          <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
            {/* Checkpoints */}
            <div className="space-y-4 p-6">
              {placesState.kind === "loading" ? (
                <LoadingSkeleton />
              ) : placesState.kind === "error" ? (
                <ErrorPanel city={city} message={placesState.message} />
              ) : (
                placesState.places.map((place, idx) => (
                  <CheckpointCard key={place.id} idx={idx} place={place} />
                ))
              )}
            </div>

            {/* Day map */}
            <div className="relative h-[360px] min-h-[280px] overflow-hidden bg-coral-50 lg:h-auto">
              <TripDayMap city={city} stops={stops} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function CheckpointCard({ idx, place }: { idx: number; place: Place }) {
  return (
    <article className="rounded-2xl border border-cocoa-100 bg-white p-4 shadow-sm">
      <header className="mb-3 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: CATEGORY_COLORS[place.category] }}
        >
          {idx + 1}
        </span>
        <p className="text-xs font-semibold uppercase tracking-widest text-cocoa-500">
          Checkpoint {idx + 1} · {CATEGORY_LABELS[place.category]}
        </p>
      </header>
      <p className="font-display text-base font-semibold text-cocoa-800">
        <span aria-hidden="true">{CATEGORY_EMOJI[place.category]} </span>
        {place.name}
      </p>
      <p className="mt-2 text-sm text-cocoa-600">{place.description}</p>
      <dl className="mt-3 grid grid-cols-1 gap-2 border-t border-cocoa-50 pt-3 text-xs sm:grid-cols-2">
        <div>
          <dt className="font-semibold uppercase tracking-widest text-cocoa-500">
            Cost
          </dt>
          <dd className="text-cocoa-800">{place.estimatedCost}</dd>
        </div>
        {place.openingHours ? (
          <div>
            <dt className="font-semibold uppercase tracking-widest text-cocoa-500">
              Hours
            </dt>
            <dd className="text-cocoa-800">{place.openingHours}</dd>
          </div>
        ) : null}
      </dl>
      {place.localTip ? (
        <p className="mt-3 rounded bg-amber-50 p-2 text-xs text-amber-900">
          <span className="font-semibold">Local tip: </span>
          {place.localTip}
        </p>
      ) : null}
    </article>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <div className="rounded-2xl border border-coral-200 bg-coral-50 p-4">
        <p className="flex items-center gap-2 font-display text-base font-semibold text-coral-700">
          <span
            aria-hidden="true"
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-coral-300 border-t-coral-600"
          />
          Live-generating from OpenStreetMap…
        </p>
        <p className="mt-1 text-xs text-coral-700">
          First load takes 2–15 seconds (geocode → POI scan → AI enrichment).
          Cached for the rest of your session.
        </p>
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-[140px] animate-pulse rounded-2xl bg-coral-50/60"
        />
      ))}
    </>
  );
}

function ErrorPanel({ city, message }: { city: City; message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-cocoa-200 bg-coral-50 p-5 text-sm text-cocoa-600">
      <p className="font-display text-base font-semibold text-cocoa-800">
        Couldn&apos;t live-generate this city.
      </p>
      <p className="mt-2 text-xs text-cocoa-500">{message}</p>
      <Link
        href={`/cities/${city.id}`}
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-coral-600 hover:underline"
      >
        Try the full city map for {city.name} →
      </Link>
    </div>
  );
}
