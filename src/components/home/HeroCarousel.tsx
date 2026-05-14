"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import type { City, Photo } from "@/lib/types";

export interface HeroSlide {
  city: City;
  photo: Photo | null;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  intervalMs?: number;
}

export default function HeroCarousel({
  slides,
  intervalMs = 6000,
}: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (slides.length === 0 ? 0 : (i + 1) % slides.length));
  }, [slides.length]);

  const prev = useCallback(() => {
    setActive((i) =>
      slides.length === 0 ? 0 : (i - 1 + slides.length) % slides.length
    );
  }, [slides.length]);

  // Autoplay — pause on hover/focus to respect "user is reading the slide"
  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = window.setTimeout(next, intervalMs);
    return () => window.clearTimeout(id);
  }, [active, paused, intervalMs, next, slides.length]);

  if (slides.length === 0) return null;
  const current = slides[active];

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured destinations"
    >
      <div className="relative h-[640px] w-full sm:h-[760px]">
        {/* Stack each slide image absolutely, fade between them. Keeping all
            in the DOM avoids remount + re-decode flicker on every transition. */}
        {slides.map((slide, idx) => (
          <div
            key={slide.city.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={idx !== active}
          >
            {slide.photo ? (
              <Image
                src={slide.photo.url}
                alt={slide.photo.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-coral-300 via-coral-400 to-cocoa-700" />
            )}
          </div>
        ))}

        {/* Heavy cinematic overlay so the white text + uppercase city stay readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-cocoa-900/80 via-cocoa-900/45 to-cocoa-900/85" />

        {/* Centered content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="font-display text-[11px] italic tracking-[0.45em] text-coral-400 sm:text-sm">
            FEATURED DESTINATION
          </p>
          <h1
            key={current.city.id}
            className="mt-5 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white drop-shadow-lg sm:text-7xl md:text-8xl"
          >
            {current.city.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {current.city.description}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href={`/cities/${current.city.id}`}
              className="rounded-md bg-coral-500 px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-soft transition hover:bg-coral-600 sm:px-9 sm:text-sm"
            >
              Explore Map
            </Link>
            <Link
              href="/templates"
              className="rounded-md border border-white/70 bg-transparent px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-cocoa-800 sm:px-9 sm:text-sm"
            >
              View Trips
            </Link>
          </div>
        </div>

        {/* Carousel controls */}
        {slides.length > 1 ? (
          <div className="absolute bottom-12 left-0 right-0 z-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous destination"
              className="rounded p-1 text-white/70 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-coral-400"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {slides.map((slide, idx) => (
                <button
                  key={slide.city.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${slide.city.name}`}
                  aria-current={idx === active}
                  className={`h-[3px] rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-coral-400 ${
                    idx === active
                      ? "w-12 bg-coral-500"
                      : "w-8 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next destination"
              className="rounded p-1 text-white/70 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-coral-400"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ) : null}

        {/* Photo credit, bottom-right */}
        {current.photo ? (
          <p className="absolute bottom-2 right-4 z-10 text-[10px] text-white/60">
            Photo by{" "}
            {current.photo.credit.profileUrl ? (
              <a
                href={current.photo.credit.profileUrl}
                rel="noreferrer noopener"
                target="_blank"
                className="underline hover:text-coral-300"
              >
                {current.photo.credit.name}
              </a>
            ) : (
              current.photo.credit.name
            )}{" "}
            on Unsplash
          </p>
        ) : null}
      </div>
    </section>
  );
}
