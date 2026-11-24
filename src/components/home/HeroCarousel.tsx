"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import type { City, Photo, Video } from "@/lib/types";

export interface HeroSlide {
  city: City;
  photo: Photo | null;
  video?: Video | null;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  intervalMs?: number;
  /** How many of `slides` to show per lap before swapping in a new set. */
  windowSize?: number;
}

/** Fisher–Yates — a fresh shuffled copy, leaving the input untouched. */
function shuffleOnce<T>(items: T[]): T[] {
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

/**
 * Pick a new window of `size` from `pool`, biased against overlap with the
 * current window. If the pool is larger than 2 * size, no overlap is
 * possible; otherwise we take as many unseen videos as we can and only
 * fall back to current-window entries to fill the rest.
 */
function nextWindow<T>(pool: T[], current: T[], size: number): T[] {
  if (pool.length <= size) return shuffleOnce(pool);
  const currentSet = new Set(current);
  const unseen = pool.filter((item) => !currentSet.has(item));
  const shuffledUnseen = shuffleOnce(unseen);
  if (shuffledUnseen.length >= size) return shuffledUnseen.slice(0, size);
  // Fill the remainder from the current set (also shuffled, for variety).
  const fillers = shuffleOnce(current).slice(0, size - shuffledUnseen.length);
  return [...shuffledUnseen, ...fillers];
}

export default function HeroCarousel({
  slides,
  intervalMs = 6000,
  windowSize = 4,
}: HeroCarouselProps) {
  // SSR shows the first `windowSize` slides in server order so the
  // hydrated client HTML matches. After mount, the carousel takes over and
  // rotates its visible window from the full `slides` pool.
  const initialWindow = slides.slice(0, windowSize);
  const [visible, setVisible] = useState<HeroSlide[]>(initialWindow);

  useEffect(() => {
    // First post-hydration render: shuffle the initial window so the lap
    // order isn't the same across visitors on the same build.
    setVisible((prev) => shuffleOnce(prev));
  }, [slides]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = visible.length;

  const next = useCallback(() => {
    setActive((i) => {
      if (count === 0) return 0;
      const nextIdx = (i + 1) % count;
      // End of a lap → swap in a fresh set of `windowSize` videos from the
      // bigger server-provided pool. New videos show every six slides, as
      // requested. If the pool is <= windowSize this just reshuffles.
      if (nextIdx === 0) {
        setVisible((current) => nextWindow(slides, current, windowSize));
      }
      return nextIdx;
    });
  }, [count, slides, windowSize]);

  const prev = useCallback(() => {
    setActive((i) => (count === 0 ? 0 : (i - 1 + count) % count));
  }, [count]);

  // Autoplay — pause on hover/focus to respect "user is reading the slide"
  useEffect(() => {
    if (paused || count <= 1) return;
    const id = window.setTimeout(next, intervalMs);
    return () => window.clearTimeout(id);
  }, [active, paused, intervalMs, next, count]);

  if (count === 0) return null;
  const current = visible[active];

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
        {visible.map((slide, idx) => (
          <div
            key={slide.city.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={idx !== active}
          >
            {slide.video ? (
              <video
                className="h-full w-full object-cover"
                src={slide.video.url}
                poster={slide.photo?.url ?? slide.video.posterUrl}
                autoPlay
                muted
                loop
                playsInline
                preload={idx === 0 ? "auto" : "metadata"}
              />
            ) : slide.photo ? (
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
        {count > 1 ? (
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
              {visible.map((slide, idx) => (
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

        {/* Video/photo credit, bottom-right */}
        {current.video ? (
          <p className="absolute bottom-2 right-4 z-10 text-[10px] text-white/60">
            Video by{" "}
            {current.video.credit.profileUrl ? (
              <a
                href={current.video.credit.profileUrl}
                rel="noreferrer noopener"
                target="_blank"
                className="underline hover:text-coral-300"
              >
                {current.video.credit.name}
              </a>
            ) : (
              current.video.credit.name
            )}{" "}
            on Pexels
          </p>
        ) : current.photo ? (
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
