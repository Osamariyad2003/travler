import Image from "next/image";
import Link from "next/link";

import WorldMapWrapper from "@/components/map/WorldMapWrapper";
import { fetchCities } from "@/lib/firestore";
import {
  fetchPhotosByQueries,
  isUnsplashConfigured,
} from "@/lib/unsplash";

export const dynamic = "force-dynamic";

export default async function CitiesPage() {
  const cities = await fetchCities();
  const photos = isUnsplashConfigured
    ? await fetchPhotosByQueries(
        cities.map((c) => `${c.name} ${c.country} travel`)
      )
    : cities.map(() => null);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-4xl font-semibold text-cocoa-800 sm:text-5xl">
          Cities
        </h1>
        <div className="mt-3 h-px w-24 bg-coral-300" />
        <p className="mt-3 text-sm text-cocoa-500">
          Browse {cities.length} budget destinations on a 2D map. Click any pin
          to see free activities, cheap food, and walking routes for that city.
        </p>
      </header>

      {/* World overview map — same view as
          openstreetmap.org/#map=7/31.300/37.131 with all cities pinned */}
      {cities.length > 0 ? (
        <section className="mb-12 h-[60vh] min-h-[420px] overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-cocoa-100">
          <WorldMapWrapper cities={cities} />
        </section>
      ) : null}

      {cities.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-cocoa-200 bg-coral-50 p-6 text-sm text-cocoa-600">
          No cities have been added yet. Check back soon.
        </p>
      ) : (
        <>
          <header className="mb-6">
            <h2 className="font-display text-2xl font-semibold text-cocoa-800 sm:text-3xl">
              All destinations
            </h2>
            <div className="mt-2 h-px w-16 bg-coral-300" />
          </header>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city, idx) => {
              const photo = photos[idx];
              return (
                <li key={city.id}>
                  <Link
                    href={`/cities/${city.id}`}
                    className="group block overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-cocoa-100 transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <div className="relative aspect-[4/3] w-full bg-coral-100">
                      {photo ? (
                        <Image
                          src={photo.url}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-coral-200 to-coral-400 font-display text-3xl text-cocoa-800">
                          {city.name}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-coral-600">
                        {city.country}
                      </p>
                      <h3 className="font-display text-2xl font-semibold text-cocoa-800">
                        {city.name}
                      </h3>
                      <p className="text-sm text-cocoa-500">{city.description}</p>
                      <p className="text-xs text-cocoa-400">
                        Currency · {city.currency}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
