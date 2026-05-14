"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { City, Photo, TripTemplate } from "@/lib/types";

interface TripPlannerCarouselProps {
  templates: TripTemplate[];
  photos: Array<Photo | null>;
  cities: City[];
}

export default function TripPlannerCarousel({
  templates,
  photos,
  cities,
}: TripPlannerCarouselProps) {
  const cityById: Record<string, City> = Object.fromEntries(
    cities.map((c) => [c.id, c])
  );
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  function page(direction: "prev" | "next") {
    const el = trackRef.current;
    if (!el) return;
    const distance = el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  }

  if (templates.length === 0) return null;

  return (
    <section className="mx-auto mt-24 max-w-7xl px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col justify-center gap-5">
          <h2 className="font-display text-4xl font-semibold text-cocoa-800 sm:text-5xl">
            Trip Planners
          </h2>
          <p className="text-sm leading-relaxed text-cocoa-500">
            {templates.length} hand-picked itineraries built for budget
            travellers — short trips, cheap food, free activities, and
            walking-friendly routes.
          </p>
          <Link
            href="/templates"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-coral-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-coral-600"
          >
            View all trip plans
            <span aria-hidden="true">→</span>
          </Link>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous trips"
              disabled={atStart}
              onClick={() => page("prev")}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-cocoa-800 text-white transition hover:bg-cocoa-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next trips"
              disabled={atEnd}
              onClick={() => page("next")}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral-500 text-white transition hover:bg-coral-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ›
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="scrollbar-hide -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-2"
          aria-label="Trip plan cards"
        >
          {templates.map((template, idx) => {
            const photo = photos[idx] ?? null;
            const cityName = cityById[template.cityId]?.name ?? template.cityId;
            return (
              <li
                key={template.id}
                className="w-[60%] shrink-0 snap-start sm:w-[40%] md:w-[34%] lg:w-[28%]"
              >
                <article className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-cocoa-100">
                  <div className="relative aspect-[3/4] w-full bg-coral-100">
                    {photo ? (
                      <Image
                        src={photo.url}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 60vw, (max-width: 1024px) 35vw, 28vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-coral-200 to-coral-400 font-display text-xl text-cocoa-800">
                        {cityName}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-coral-600">
                      {template.travelStyle} · {template.estimatedBudget}
                    </p>
                    <h3 className="font-display text-lg leading-snug text-cocoa-800">
                      {template.title}
                    </h3>
                    <p className="text-xs text-cocoa-400">
                      {template.days} day{template.days === 1 ? "" : "s"} ·{" "}
                      {cityName}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
