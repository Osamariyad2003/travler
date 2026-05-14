"use client";

import { useRouter } from "next/navigation";

import type { City } from "@/lib/types";

interface CitySelectorProps {
  cities: City[];
  selectedId: string;
}

export default function CitySelector({ cities, selectedId }: CitySelectorProps) {
  const router = useRouter();
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-cocoa-400">
        Select a city
      </span>
      <select
        value={selectedId}
        onChange={(e) => router.push(`/cities/${e.target.value}`)}
        className="mt-1 block w-full rounded-2xl border border-cocoa-200 bg-white px-4 py-3 font-display text-lg font-semibold text-cocoa-800 shadow-soft focus:border-coral-400 focus:outline-none focus:ring-2 focus:ring-coral-200 sm:w-80"
      >
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}, {city.country}
          </option>
        ))}
      </select>
    </label>
  );
}
