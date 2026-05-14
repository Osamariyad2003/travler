"use client";

import type { Route } from "@/lib/types";

interface RoutePanelProps {
  routes: Route[];
  selectedRouteId: string | null;
  onSelect: (routeId: string | null) => void;
}

const DIFFICULTY_LABEL: Record<Route["difficulty"], string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
};

const DIFFICULTY_STYLE: Record<Route["difficulty"], string> = {
  easy: "bg-emerald-100 text-emerald-800",
  moderate: "bg-coral-100 text-coral-700",
  hard: "bg-red-100 text-red-800",
};

export default function RoutePanel({
  routes,
  selectedRouteId,
  onSelect,
}: RoutePanelProps) {
  if (routes.length === 0) {
    return (
      <section className="rounded-3xl bg-white p-4 text-sm text-cocoa-500 shadow-card ring-1 ring-cocoa-100">
        No walking routes for this city yet.
      </section>
    );
  }

  return (
    <section
      aria-label="Walking routes"
      className="rounded-3xl bg-white shadow-card ring-1 ring-cocoa-100"
    >
      <header className="border-b border-cocoa-100 p-4">
        <h2 className="font-display text-lg font-semibold text-cocoa-800">
          Walking routes
        </h2>
        <p className="text-xs text-cocoa-500">
          Tap a route to highlight it on the map.
        </p>
      </header>
      <ul className="divide-y divide-cocoa-100">
        {routes.map((route) => {
          const isSelected = selectedRouteId === route.id;
          return (
            <li key={route.id}>
              <button
                type="button"
                onClick={() => onSelect(isSelected ? null : route.id)}
                className={`flex w-full flex-col gap-2 p-4 text-left transition ${
                  isSelected ? "bg-coral-50" : "hover:bg-coral-50/50"
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-semibold text-cocoa-800">
                    {route.name}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                      DIFFICULTY_STYLE[route.difficulty]
                    }`}
                  >
                    {DIFFICULTY_LABEL[route.difficulty]}
                  </span>
                </div>
                <p className="text-xs text-cocoa-500">{route.description}</p>
                <dl className="mt-1 grid grid-cols-3 gap-2 text-[11px] text-cocoa-600">
                  <div>
                    <dt className="font-semibold text-cocoa-800">Time</dt>
                    <dd>{route.estimatedTime}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-cocoa-800">Distance</dt>
                    <dd>{route.estimatedDistance}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-cocoa-800">Cost</dt>
                    <dd>{route.estimatedCost}</dd>
                  </div>
                </dl>
                {isSelected ? (
                  <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-cocoa-700">
                    {route.stops.map((stop, idx) => (
                      <li key={`${route.id}-stop-${idx}`}>
                        <span className="font-medium">{stop.name}</span>
                        {stop.note ? (
                          <span className="text-cocoa-500"> — {stop.note}</span>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
