"use client";

import {
  CATEGORY_COLORS,
  CATEGORY_EMOJI,
  CATEGORY_LABELS,
} from "@/lib/constants";
import type { Place, PlaceCategory } from "@/lib/types";

/**
 * Popularity heuristic — based on category. The Singapore-style "🔥 N.N"
 * badge needs a number; we don't have real popularity data, so categories
 * with high tourist appeal score higher than functional ones.
 */
const POPULARITY_BY_CATEGORY: Record<PlaceCategory, number> = {
  viewpoint: 9.2,
  free_activity: 8.5,
  walking_route_stop: 7.8,
  cheap_food: 7.5,
  market: 7.0,
  hostel_area: 6.0,
  public_transport: 5.5,
  water_refill: 4.0,
  safety_warning: 2.0,
  scam_warning: 1.5,
  other: 6.0,
};

/** Realistic time budgets per category for the "Suggested visit" line. */
const SUGGESTED_VISIT_BY_CATEGORY: Record<PlaceCategory, string> = {
  viewpoint: "1–2 hours",
  free_activity: "2–3 hours",
  cheap_food: "30–60 min",
  market: "1–2 hours",
  public_transport: "<30 min",
  water_refill: "5 min",
  hostel_area: "Check-in",
  walking_route_stop: "30–60 min",
  safety_warning: "Avoid",
  scam_warning: "Avoid",
  other: "Varies",
};

interface TripCheckpointProps {
  idx: number;
  /** The activity string from the itinerary, e.g. "Lunch: Hashem Restaurant". */
  activity: string;
  /** Matched Place (best-effort substring match). Null when no match. */
  matchedPlace?: Place | null;
}

function deriveTitle(activity: string, place: Place | null | undefined): string {
  if (place) return place.name;
  // Strip leading "Morning:" / "Lunch:" / etc. prefix when present
  const colonIdx = activity.indexOf(":");
  if (colonIdx > 0 && colonIdx < 20) {
    return activity.slice(colonIdx + 1).trim();
  }
  return activity;
}

export default function TripCheckpoint({
  idx,
  activity,
  matchedPlace,
}: TripCheckpointProps) {
  const category = matchedPlace?.category;
  const score = category !== undefined ? POPULARITY_BY_CATEGORY[category] : null;
  const hours = matchedPlace?.openingHours ?? "Open year-round, 24/7";
  const suggested =
    category !== undefined ? SUGGESTED_VISIT_BY_CATEGORY[category] : "Varies";
  const title = deriveTitle(activity, matchedPlace);
  const description = matchedPlace?.description ?? activity;
  const markerColor = category
    ? CATEGORY_COLORS[category]
    : CATEGORY_COLORS.other;

  return (
    <li>
      <article className="overflow-hidden rounded-2xl border border-cocoa-100 bg-white shadow-sm transition hover:border-coral-200 hover:shadow">
        <div className="flex items-start gap-3 p-4">
          {/* Numbered marker matching the map's coral pins */}
          <span
            aria-hidden="true"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-soft"
            style={{ backgroundColor: markerColor }}
          >
            {idx + 1}
          </span>

          <div className="min-w-0 flex-1">
            {/* Title row + "..." menu */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-base font-bold leading-snug text-cocoa-800">
                {idx + 1}. {title}
              </h3>
              <button
                type="button"
                aria-label="More options"
                className="-mr-1 rounded p-1 text-cocoa-300 transition hover:bg-cocoa-50 hover:text-cocoa-700"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h.01M12 12h.01M19 12h.01"
                  />
                </svg>
              </button>
            </div>

            {/* Score badge */}
            {score !== null ? (
              <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">
                <span aria-hidden="true">🔥</span>
                {score.toFixed(1)}
              </p>
            ) : null}

            {/* Hours + suggested visit, like TripAdvisor */}
            <p className="mt-2 text-xs text-cocoa-500">
              <span className="text-cocoa-800">{hours}</span>
              <span className="mx-2 text-cocoa-300" aria-hidden="true">
                |
              </span>
              Suggested visit:{" "}
              <span className="text-cocoa-800">{suggested}</span>
            </p>

            {/* Category pill */}
            {category ? (
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-coral-600">
                <span aria-hidden="true">{CATEGORY_EMOJI[category]}</span>{" "}
                {CATEGORY_LABELS[category]}
              </p>
            ) : null}

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-cocoa-700">
              {description}
            </p>

            {/* Local tip */}
            {matchedPlace?.localTip ? (
              <p className="mt-3 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-900">
                <span className="font-semibold">Tip: </span>
                {matchedPlace.localTip}
              </p>
            ) : null}

            {/* Cost footer */}
            {matchedPlace?.estimatedCost ? (
              <p className="mt-2 text-[11px] text-cocoa-500">
                <span className="font-semibold uppercase tracking-widest">
                  Cost
                </span>{" "}
                <span className="text-cocoa-800">
                  {matchedPlace.estimatedCost}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </article>
    </li>
  );
}
