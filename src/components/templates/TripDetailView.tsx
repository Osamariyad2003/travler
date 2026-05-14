"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type {
  City,
  Place,
  TripTemplate,
  TripTemplateDay,
} from "@/lib/types";
import type { DayWeather } from "@/lib/weather";

import TripCheckpoint from "./TripCheckpoint";
import TripDayMapWrapper from "./TripDayMapWrapper";

interface TripDetailViewProps {
  template: TripTemplate;
  city: City;
  places: Place[];
  startDate: string;
  weather: DayWeather[];
}

const STYLE_LABEL: Record<TripTemplate["travelStyle"], string> = {
  budget: "Budget",
  student: "Student",
  backpacker: "Backpacker",
  family: "Family",
  solo: "Solo",
  couple: "Couple",
};

/**
 * Best-effort mapping of an activity string ("Lunch: Hashem Restaurant") to a
 * Place from the city's collection. Substring match first, then first-word
 * fallback. Imperfect but keeps the existing `activities: string[]` shape.
 */
function matchPlaces(activity: string, places: Place[]): Place[] {
  const haystack = activity.toLowerCase();
  const matched = places.filter((p) =>
    haystack.includes(p.name.toLowerCase())
  );
  if (matched.length > 0) return matched;

  const firstWordMatches = places.filter((p) => {
    const first = p.name.split(/[\s,()-]+/)[0]?.toLowerCase();
    return first && first.length >= 4 && haystack.includes(first);
  });
  return firstWordMatches;
}

type Tab =
  | { id: string; type: "plan"; label: string }
  | { id: string; type: "day"; label: string; dayIdx: number }
  | { id: string; type: "notes"; label: string };

export default function TripDetailView({
  template,
  city,
  places,
  weather,
}: TripDetailViewProps) {
  // Pre-compute matched stops per day + the unmatched-places bucket once.
  const { dayStops, unmatchedPlaces } = useMemo(() => {
    const dayStops: Record<number, Place[]> = {};
    const matchedIds = new Set<string>();

    for (let i = 0; i < template.itinerary.length; i++) {
      const day = template.itinerary[i];
      const seen = new Set<string>();
      const stops: Place[] = [];
      for (const activity of day.activities) {
        for (const m of matchPlaces(activity, places)) {
          if (seen.has(m.id)) continue;
          seen.add(m.id);
          matchedIds.add(m.id);
          stops.push(m);
        }
      }
      dayStops[i] = stops;
    }
    const unmatchedPlaces = places.filter((p) => !matchedIds.has(p.id));
    return { dayStops, unmatchedPlaces };
  }, [template.itinerary, places]);

  // Tab definitions — "To be planned" first, then each day, then "Notes".
  const tabs: Tab[] = useMemo(() => {
    const out: Tab[] = [
      { id: "plan", type: "plan", label: "To be planned" },
    ];
    template.itinerary.forEach((d, idx) => {
      out.push({
        id: `day-${idx}`,
        type: "day",
        label: `Day ${d.day}`,
        dayIdx: idx,
      });
    });
    out.push({ id: "notes", type: "notes", label: "Notes" });
    return out;
  }, [template.itinerary]);

  const firstDayId = tabs.find((t) => t.type === "day")?.id ?? "plan";
  const [activeTabId, setActiveTabId] = useState<string>(firstDayId);
  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  // Per-day notes, persisted to localStorage keyed by template id.
  const notesKey = `traveler:notes:${template.id}`;
  const [notes, setNotes] = useState<Record<number, string>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(notesKey);
      if (raw) setNotes(JSON.parse(raw));
    } catch {
      // ignore storage errors (Safari private mode, quota exceeded)
    }
  }, [notesKey]);

  function setNote(dayIdx: number, text: string) {
    setNotes((prev) => {
      const next = { ...prev, [dayIdx]: text };
      try {
        window.localStorage.setItem(notesKey, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  // The map shows: active day's stops, or unmatched preview, or nothing.
  let mapStops: Place[] = [];
  if (activeTab.type === "day") {
    mapStops = dayStops[activeTab.dayIdx] ?? [];
  } else if (activeTab.type === "plan") {
    mapStops = unmatchedPlaces.slice(0, 12);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Title block */}
      <header className="mb-6">
        <Link
          href="/templates"
          className="text-xs font-semibold uppercase tracking-widest text-coral-600 hover:underline"
        >
          ← All trip plans
        </Link>
        <h1 className="mt-3 font-display text-3xl font-bold text-cocoa-800 sm:text-4xl">
          {template.title}
        </h1>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-cocoa-500">
          <span>
            {template.days} day{template.days === 1 ? "" : "s"}
          </span>
          <span aria-hidden="true">·</span>
          <span>{STYLE_LABEL[template.travelStyle]}</span>
          <span aria-hidden="true">·</span>
          <span className="font-semibold text-coral-600">
            {template.estimatedBudget}
          </span>
          <span aria-hidden="true">·</span>
          <Link
            href={`/cities/${city.id}`}
            className="font-medium text-cocoa-700 hover:text-coral-600 hover:underline"
          >
            {city.name}, {city.country} →
          </Link>
        </p>
      </header>

      {/* Tab strip */}
      <nav
        className="mb-6 flex flex-wrap items-center gap-2 border-b border-cocoa-100 pb-3"
        aria-label="Trip days"
      >
        {tabs.map((t) => {
          const isActive = activeTabId === t.id;
          const dayEmoji =
            t.type === "day" && weather[t.dayIdx]?.emoji
              ? weather[t.dayIdx].emoji
              : null;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTabId(t.id)}
              aria-pressed={isActive}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-cocoa-800 text-white"
                  : "border border-cocoa-200 bg-white text-cocoa-700 hover:border-coral-300 hover:text-coral-600"
              }`}
            >
              {t.label}
              {dayEmoji ? (
                <span aria-hidden="true" className="opacity-80">
                  {dayEmoji}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Two columns: content + sticky map */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section className="space-y-5">
          {activeTab.type === "day" ? (
            <DaySection
              day={template.itinerary[activeTab.dayIdx]}
              dayIdx={activeTab.dayIdx}
              weather={weather[activeTab.dayIdx]}
              places={places}
              note={notes[activeTab.dayIdx] ?? ""}
              onNoteChange={(text) => setNote(activeTab.dayIdx, text)}
            />
          ) : activeTab.type === "plan" ? (
            <PlanSection
              unmatchedPlaces={unmatchedPlaces}
              cityId={city.id}
              cityName={city.name}
            />
          ) : (
            <NotesSection
              itinerary={template.itinerary}
              notes={notes}
              onNoteChange={setNote}
            />
          )}

          {template.tips.length > 0 ? (
            <article className="rounded-2xl bg-cocoa-800 p-4 text-xs text-coral-100">
              <p className="font-semibold uppercase tracking-widest text-coral-200">
                Travel tips
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {template.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </article>
          ) : null}
        </section>

        {/* Sticky map */}
        <aside className="relative h-[560px] min-h-[420px] overflow-hidden rounded-3xl bg-coral-50 shadow-card ring-1 ring-cocoa-100 lg:sticky lg:top-24 lg:self-start">
          <TripDayMapWrapper city={city} stops={mapStops} />
          {mapStops.length === 0 ? (
            <p className="absolute bottom-3 left-3 right-3 rounded bg-white/95 px-3 py-2 text-[11px] text-cocoa-600 shadow">
              {activeTab.type === "notes"
                ? "Pick a Day tab to see its route."
                : "No stops to show. Open the city map for the full pin list."}
            </p>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section sub-components
// ─────────────────────────────────────────────────────────────────────────────

function DaySection({
  day,
  dayIdx,
  weather,
  places,
  note,
  onNoteChange,
}: {
  day: TripTemplateDay;
  dayIdx: number;
  weather: DayWeather | undefined;
  places: Place[];
  note: string;
  onNoteChange: (text: string) => void;
}) {
  const [showNotes, setShowNotes] = useState(note.length > 0);

  return (
    <>
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-coral-600">
          Day {day.day}
        </p>
        <h2 className="font-display text-2xl font-bold leading-snug text-cocoa-800">
          {day.title}
        </h2>
        <p className="text-xs text-cocoa-500">
          {weather ? (
            <>
              <span aria-hidden="true">{weather.emoji} </span>
              {weather.label}
              {weather.temperatureMaxC !== null
                ? ` · max ${Math.round(weather.temperatureMaxC)}°C`
                : ""}
            </>
          ) : (
            "Forecast unavailable"
          )}
        </p>
        <button
          type="button"
          onClick={() => setShowNotes((s) => !s)}
          className="text-xs font-semibold text-coral-600 hover:underline"
        >
          {showNotes ? "− Hide notes" : "+ Add notes"}
        </button>
        {showNotes ? (
          <textarea
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder={`Notes for Day ${day.day}…`}
            className="form-input min-h-[80px] text-sm"
          />
        ) : null}
      </header>

      <ol className="space-y-3">
        {day.activities.map((activity, idx) => (
          <TripCheckpoint
            key={`${dayIdx}-${idx}`}
            idx={idx}
            activity={activity}
            matchedPlace={matchPlaces(activity, places)[0] ?? null}
          />
        ))}
      </ol>
    </>
  );
}

function PlanSection({
  unmatchedPlaces,
  cityId,
  cityName,
}: {
  unmatchedPlaces: Place[];
  cityId: string;
  cityName: string;
}) {
  return (
    <>
      <header className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-cocoa-800">
          To be planned
        </h2>
        <p className="text-xs text-cocoa-500">
          {unmatchedPlaces.length === 0
            ? "All curated places are already on the schedule. Add more from the city map."
            : `${unmatchedPlaces.length} place${
                unmatchedPlaces.length === 1 ? "" : "s"
              } in ${cityName} that aren't on the schedule yet — drag/drop to be added in a future release.`}
        </p>
        <Link
          href={`/cities/${cityId}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-coral-600 hover:underline"
        >
          + Add places from the {cityName} map →
        </Link>
      </header>

      {unmatchedPlaces.length > 0 ? (
        <ol className="space-y-3">
          {unmatchedPlaces.map((place, idx) => (
            <TripCheckpoint
              key={place.id}
              idx={idx}
              activity={place.name}
              matchedPlace={place}
            />
          ))}
        </ol>
      ) : null}
    </>
  );
}

function NotesSection({
  itinerary,
  notes,
  onNoteChange,
}: {
  itinerary: TripTemplate["itinerary"];
  notes: Record<number, string>;
  onNoteChange: (dayIdx: number, text: string) => void;
}) {
  return (
    <>
      <header className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-cocoa-800">Notes</h2>
        <p className="text-xs text-cocoa-500">
          Per-day notes save to your browser. Clear browser data to reset.
        </p>
      </header>

      <div className="space-y-3">
        {itinerary.map((day, idx) => (
          <article
            key={day.day}
            className="rounded-2xl border border-cocoa-100 bg-white p-4 shadow-sm"
          >
            <h3 className="font-display text-base font-semibold text-cocoa-800">
              Day {day.day} · {day.title}
            </h3>
            <textarea
              value={notes[idx] ?? ""}
              onChange={(e) => onNoteChange(idx, e.target.value)}
              placeholder="Anything you want to remember for this day…"
              className="form-input mt-2 min-h-[100px] text-sm"
            />
          </article>
        ))}
      </div>
    </>
  );
}
