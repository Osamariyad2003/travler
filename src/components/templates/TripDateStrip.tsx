"use client";

import type { DayWeather } from "@/lib/weather";

interface TripDateStripProps {
  weather: DayWeather[];
  activeDayIndex: number;
  onSelect: (idx: number) => void;
}

const DAY_FORMAT = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return DAY_FORMAT.format(d);
}

/**
 * Map weather code → soft pastel background. Mirrors the screenshot's
 * yellow-for-sun, peach-for-clouds, blue-for-rain ramp.
 */
function pillStyle(w: DayWeather, isActive: boolean): string {
  const base =
    "min-w-[150px] rounded-xl border px-4 py-3 text-left transition";
  const ring = isActive
    ? "ring-2 ring-coral-500 ring-offset-2"
    : "hover:border-coral-300";
  if (w.weatherCode === null) return `${base} ${ring} border-cocoa-100 bg-white`;
  if (w.weatherCode === 0)
    return `${base} ${ring} border-amber-200 bg-amber-50`;
  if (w.weatherCode <= 3)
    return `${base} ${ring} border-coral-200 bg-coral-50`;
  if (w.weatherCode === 45 || w.weatherCode === 48)
    return `${base} ${ring} border-cocoa-100 bg-cocoa-50`;
  if (w.weatherCode >= 51 && w.weatherCode <= 67)
    return `${base} ${ring} border-sky-200 bg-sky-50`;
  if (w.weatherCode >= 71 && w.weatherCode <= 86)
    return `${base} ${ring} border-cocoa-100 bg-white`;
  if (w.weatherCode >= 95)
    return `${base} ${ring} border-violet-200 bg-violet-50`;
  return `${base} ${ring} border-coral-200 bg-coral-50`;
}

export default function TripDateStrip({
  weather,
  activeDayIndex,
  onSelect,
}: TripDateStripProps) {
  return (
    <ul className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
      {weather.map((w, idx) => {
        const isActive = idx === activeDayIndex;
        return (
          <li key={w.date} className="flex-shrink-0">
            <button
              type="button"
              onClick={() => onSelect(idx)}
              className={pillStyle(w, isActive)}
              aria-pressed={isActive}
              aria-label={`Day ${idx + 1}: ${formatDate(w.date)} — ${w.label}`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-cocoa-500">
                Day {idx + 1}
              </p>
              <p className="mt-1 font-display text-sm font-semibold text-cocoa-800">
                {formatDate(w.date)}
              </p>
              <p className="mt-1 text-xs text-cocoa-600">
                <span aria-hidden="true">{w.emoji} </span>
                {w.label}
                {w.temperatureMaxC !== null
                  ? ` · ${Math.round(w.temperatureMaxC)}°C`
                  : ""}
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
