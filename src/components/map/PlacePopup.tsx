"use client";

import { CATEGORY_EMOJI, CATEGORY_LABELS } from "@/lib/constants";
import type { Place } from "@/lib/types";

interface PlacePopupProps {
  place: Place;
}

function formatDate(timestamp: number): string {
  try {
    return new Date(timestamp).toLocaleDateString();
  } catch {
    return "—";
  }
}

export default function PlacePopup({ place }: PlacePopupProps) {
  const isWarning =
    place.category === "safety_warning" || place.category === "scam_warning";
  return (
    <div className="min-w-[220px] max-w-[260px] space-y-2 text-sm">
      <header className="flex items-start gap-2">
        <span aria-hidden="true" className="text-lg leading-none">
          {CATEGORY_EMOJI[place.category]}
        </span>
        <div>
          <h3 className="font-semibold text-slate-900">{place.name}</h3>
          <p
            className={`text-xs uppercase tracking-wide ${
              isWarning ? "text-red-600" : "text-slate-500"
            }`}
          >
            {CATEGORY_LABELS[place.category]}
          </p>
        </div>
      </header>
      <dl className="space-y-1 text-slate-700">
        <div>
          <dt className="inline font-medium text-slate-900">Cost: </dt>
          <dd className="inline">{place.estimatedCost}</dd>
        </div>
        {place.openingHours ? (
          <div>
            <dt className="inline font-medium text-slate-900">Hours: </dt>
            <dd className="inline">{place.openingHours}</dd>
          </div>
        ) : null}
      </dl>
      <p className="text-slate-700">{place.description}</p>
      {place.localTip ? (
        <p className="rounded bg-amber-50 p-2 text-xs text-amber-900">
          <span className="font-semibold">Local tip:</span> {place.localTip}
        </p>
      ) : null}
      <p className="text-[11px] text-slate-400">
        Last updated {formatDate(place.updatedAt)}
      </p>
    </div>
  );
}
