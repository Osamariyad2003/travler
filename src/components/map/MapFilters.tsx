"use client";

import {
  CATEGORY_COLORS,
  CATEGORY_EMOJI,
  CATEGORY_LABELS,
  PLACE_CATEGORIES,
} from "@/lib/constants";
import type { PlaceCategory } from "@/lib/types";

interface MapFiltersProps {
  active: Set<PlaceCategory>;
  onToggle: (category: PlaceCategory) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export default function MapFilters({
  active,
  onToggle,
  onSelectAll,
  onClearAll,
}: MapFiltersProps) {
  return (
    <section
      aria-label="Map category filters"
      className="rounded-3xl bg-white p-4 shadow-card ring-1 ring-cocoa-100"
    >
      <header className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-cocoa-800">
          Categories
        </h2>
        <div className="flex gap-3 text-xs">
          <button
            type="button"
            onClick={onSelectAll}
            className="font-semibold text-coral-600 hover:underline"
          >
            All
          </button>
          <button
            type="button"
            onClick={onClearAll}
            className="text-cocoa-500 hover:underline"
          >
            None
          </button>
        </div>
      </header>
      <ul className="flex flex-wrap gap-2">
        {PLACE_CATEGORIES.map((cat) => {
          const isActive = active.has(cat);
          return (
            <li key={cat}>
              <button
                type="button"
                onClick={() => onToggle(cat)}
                aria-pressed={isActive}
                className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? "border-transparent text-white shadow-soft"
                    : "border-cocoa-200 bg-white text-cocoa-700 hover:bg-coral-50"
                }`}
                style={
                  isActive ? { backgroundColor: CATEGORY_COLORS[cat] } : undefined
                }
              >
                <span aria-hidden="true">{CATEGORY_EMOJI[cat]}</span>
                <span>{CATEGORY_LABELS[cat]}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
