"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { City } from "@/lib/types";
import { slugify } from "@/lib/utils";

interface CityPickerProps {
  cities: City[];
  defaultCityId?: string;
  ctaLabel?: string;
}

export default function CityPicker({
  cities,
  defaultCityId,
  ctaLabel = "Generate map",
}: CityPickerProps) {
  const router = useRouter();
  const [destination, setDestination] = useState<string>(() => {
    const def = cities.find((c) => c.id === defaultCityId);
    return def ? def.name : "";
  });
  const [travellers, setTravellers] = useState("1");
  const [travelStyle, setTravelStyle] = useState("Backpacker");
  const [duration, setDuration] = useState("Weekend");
  const [navigating, setNavigating] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = destination.trim();
    if (!trimmed) return;

    const matched = cities.find((c) =>
      [c.name, `${c.name}, ${c.country}`].some(
        (label) => label.toLowerCase() === trimmed.toLowerCase()
      )
    );
    const slug = matched ? matched.id : slugify(trimmed);
    if (!slug) return;

    setNavigating(true);
    const qs = matched ? "" : `?q=${encodeURIComponent(trimmed)}`;
    router.push(`/cities/${slug}${qs}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-soft ring-1 ring-cocoa-100 sm:flex-row sm:items-stretch sm:gap-0 sm:p-2"
    >
      <PickerField label="Destination" className="sm:flex-[1.3]">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          list="traveler-city-suggestions"
          placeholder="Where to?"
          className="w-full bg-transparent text-base font-medium text-cocoa-800 outline-none placeholder:text-cocoa-300"
          autoComplete="off"
          required
        />
        <datalist id="traveler-city-suggestions">
          {cities.map((city) => (
            <option key={city.id} value={`${city.name}, ${city.country}`} />
          ))}
        </datalist>
      </PickerField>

      <Divider />

      <PickerField label="Travellers">
        <select
          value={travellers}
          onChange={(e) => setTravellers(e.target.value)}
          className="w-full bg-transparent text-base font-medium text-cocoa-800 outline-none"
        >
          {["1", "2", "3", "4", "5+"].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </PickerField>

      <Divider />

      <PickerField label="Style">
        <select
          value={travelStyle}
          onChange={(e) => setTravelStyle(e.target.value)}
          className="w-full bg-transparent text-base font-medium text-cocoa-800 outline-none"
        >
          {["Backpacker", "Student", "Couple", "Family", "Solo"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </PickerField>

      <Divider />

      <PickerField label="Duration">
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full bg-transparent text-base font-medium text-cocoa-800 outline-none"
        >
          {["Day trip", "Weekend", "3 days", "5 days", "1 week"].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </PickerField>

      <button
        type="submit"
        disabled={navigating}
        className="ml-0 mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-coral-500 px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-coral-600 disabled:cursor-not-allowed disabled:opacity-60 sm:ml-2 sm:mt-0"
      >
        {navigating ? "Loading…" : ctaLabel}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

function PickerField({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex flex-1 flex-col justify-center px-4 py-2 ${className ?? ""}`}
    >
      <span className="text-[11px] font-semibold uppercase tracking-widest text-cocoa-400">
        {label}
      </span>
      <div className="mt-0.5">{children}</div>
    </label>
  );
}

function Divider() {
  return <span className="hidden w-px self-stretch bg-cocoa-100 sm:block" />;
}
