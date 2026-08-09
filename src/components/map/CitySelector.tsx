"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import type { City } from "@/lib/types";

interface CitySelectorProps {
  cities: City[];
  selectedId: string;
}

// Custom listbox instead of a native <select> — some browser extensions
// (autofill/security-suite tools that inject attributes like
// "fdprocessedid" onto form fields) can swallow the click that would
// normally open a native select's popup. A button + panel we render
// ourselves doesn't depend on that native popup at all.
export default function CitySelector({ cities, selectedId }: CitySelectorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selected = cities.find((c) => c.id === selectedId) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cities;
    return cities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
    );
  }, [cities, query]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  function selectCity(cityId: string) {
    setOpen(false);
    router.push(`/cities/${cityId}`);
  }

  return (
    <div className="relative" ref={containerRef}>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-cocoa-400">
        Select a city
      </span>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="mt-1 flex w-full items-center justify-between gap-3 rounded-2xl border border-cocoa-200 bg-white px-4 py-3 font-display text-lg font-semibold text-cocoa-800 shadow-soft focus:border-coral-400 focus:outline-none focus:ring-2 focus:ring-coral-200 sm:w-80"
      >
        <span className="truncate">
          {selected ? `${selected.name}, ${selected.country}` : "Choose a city"}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={`h-4 w-4 shrink-0 text-cocoa-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label="Select a city"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-cocoa-100 bg-white shadow-card sm:w-80"
        >
          <div className="border-b border-cocoa-100 p-2">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cities…"
              className="w-full rounded-xl border border-cocoa-100 px-3 py-2 text-sm text-cocoa-700 focus:border-coral-400 focus:outline-none focus:ring-2 focus:ring-coral-200"
            />
          </div>
          <ul className="max-h-72 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-cocoa-400">
                No cities match &ldquo;{query}&rdquo;
              </li>
            ) : (
              filtered.map((city) => (
                <li key={city.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={city.id === selectedId}
                    onClick={() => selectCity(city.id)}
                    className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-coral-50 ${
                      city.id === selectedId
                        ? "bg-coral-50 font-semibold text-coral-700"
                        : "text-cocoa-700"
                    }`}
                  >
                    <span>{city.name}</span>
                    <span className="text-xs text-cocoa-400">{city.country}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
