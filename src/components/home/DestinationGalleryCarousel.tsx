"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { City, Photo } from "@/lib/types";

interface DestinationGalleryCarouselProps {
  cities: City[];
  photos: Array<Photo | null>;
}

export default function DestinationGalleryCarousel({
  cities,
  photos,
}: DestinationGalleryCarouselProps) {
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
    // Page by ~80% of viewport width so the next batch of cards lands cleanly
    const distance = el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  }

  if (cities.length === 0) return null;

  return (
    <section className="mx-auto mt-24 max-w-7xl px-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-4xl font-semibold text-cocoa-800 sm:text-5xl">
            Destination Gallery
          </h2>
          <div className="mt-3 h-px w-24 bg-coral-300" />
          <p className="mt-3 text-sm text-cocoa-500">
            Browse {cities.length} budget destinations on Traveler.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Previous destinations"
            disabled={atStart}
            onClick={() => page("prev")}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-cocoa-800 text-white transition hover:bg-cocoa-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next destinations"
            disabled={atEnd}
            onClick={() => page("next")}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral-500 text-white transition hover:bg-coral-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </header>

      <ul
        ref={trackRef}
        className="scrollbar-hide mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth"
        aria-label="Destination cards"
      >
        {cities.map((city, idx) => {
          const photo = photos[idx] ?? null;
          return (
            <li
              key={city.id}
              className="w-[58%] shrink-0 snap-start sm:w-[40%] md:w-[30%] lg:w-[23%]"
            >
              <Link
                href={`/cities/${city.id}`}
                className="group block overflow-hidden rounded-3xl shadow-card"
              >
                <div className="relative aspect-[3/4] w-full bg-coral-100">
                  {photo ? (
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 60vw, (max-width: 1024px) 35vw, 23vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-coral-200 to-coral-400 font-display text-2xl text-cocoa-800">
                      {city.name}
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa-900/80 to-transparent p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-coral-200">
                      {city.country}
                    </p>
                    <p className="font-display text-xl text-white">
                      {city.name}
                    </p>
                  </div>
                </div>
              </Link>
              {photo ? (
                <p className="mt-2 text-[11px] text-cocoa-400">
                  Photo by{" "}
                  {photo.credit.profileUrl ? (
                    <a
                      href={photo.credit.profileUrl}
                      rel="noreferrer noopener"
                      target="_blank"
                      className="underline hover:text-coral-600"
                    >
                      {photo.credit.name}
                    </a>
                  ) : (
                    <span>{photo.credit.name}</span>
                  )}{" "}
                  · Unsplash
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
