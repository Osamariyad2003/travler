"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import type { City, Photo } from "@/lib/types";

interface ExploreSidebarProps {
  cities: City[];
  photoById: Record<string, Photo | null>;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function ExploreSidebar({
  cities,
  photoById,
  selectedId,
  onSelect,
}: ExploreSidebarProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cities;
    return cities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.currency.toLowerCase().includes(q)
    );
  }, [cities, query]);

  // Scroll the selected card into view when the user clicks a map marker.
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!selectedId || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLLIElement>(
      `[data-city-id="${selectedId}"]`
    );
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedId]);

  return (
    <aside className="flex h-full flex-col overflow-hidden border-r border-cocoa-100 bg-white">
      <header className="border-b border-cocoa-100 p-5">
        <h1 className="font-display text-3xl font-semibold text-cocoa-800">
          Explore
        </h1>
        <p className="mt-1 text-xs text-cocoa-500">
          {cities.length} budget destinations · click a pin or card
        </p>
      </header>

      <div className="border-b border-cocoa-100 p-3">
        <label className="block">
          <span className="sr-only">Search cities</span>
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cocoa-400"
            >
              🔍
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cities or countries…"
              className="block w-full rounded-full border border-cocoa-200 bg-white py-2 pl-9 pr-3 text-sm text-cocoa-800 placeholder:text-cocoa-300 focus:border-coral-400 focus:outline-none focus:ring-2 focus:ring-coral-200"
            />
          </div>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="p-6 text-sm text-cocoa-500">
          No cities match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <ul
          ref={listRef}
          className="flex-1 overflow-y-auto"
          aria-label="Cities"
        >
          {filtered.map((city) => {
            const photo = photoById[city.id];
            const isSelected = selectedId === city.id;
            return (
              <li
                key={city.id}
                data-city-id={city.id}
                className={`border-b border-cocoa-50 transition ${
                  isSelected ? "bg-coral-50" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(city.id)}
                  className={`flex w-full items-center gap-3 p-3 text-left transition ${
                    isSelected ? "" : "hover:bg-coral-50/60"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-coral-100">
                    {photo ? (
                      <Image
                        src={photo.url}
                        alt={photo.alt}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-coral-200 to-coral-400 text-xs font-display text-cocoa-800">
                        {city.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-semibold text-cocoa-800">
                      {city.name}
                    </p>
                    <p className="truncate text-[11px] uppercase tracking-widest text-coral-600">
                      {city.country}
                    </p>
                    <p className="truncate text-[11px] text-cocoa-400">
                      {city.currency}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`text-xl transition ${
                      isSelected ? "text-coral-500" : "text-cocoa-200"
                    }`}
                  >
                    ›
                  </span>
                </button>
                {isSelected ? (
                  <div className="space-y-2 px-3 pb-4 pt-1">
                    <p className="text-xs leading-relaxed text-cocoa-600">
                      {city.description}
                    </p>
                    <Link
                      href={`/cities/${city.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-coral-600 hover:underline"
                    >
                      Open the city map →
                    </Link>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
