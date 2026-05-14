import DestinationGallery from "@/components/home/DestinationGallery";
import HeroCarousel, {
  type HeroSlide,
} from "@/components/home/HeroCarousel";
import TripPlannerSection from "@/components/home/TripPlannerSection";
import CityPicker from "@/components/map/CityPicker";
import { APP_NAME, DEFAULT_CITY_ID } from "@/lib/constants";
import { fetchCities, fetchTripTemplates } from "@/lib/firestore";
import {
  fetchPhotosByQueries,
  isUnsplashConfigured,
} from "@/lib/unsplash";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [cities, templates] = await Promise.all([
    fetchCities(),
    fetchTripTemplates(),
  ]);

  const featured =
    cities.find((c) => c.id === DEFAULT_CITY_ID) ?? cities[0] ?? null;

  // Top 4 cities go into the cinematic carousel — same Unsplash queries the
  // gallery uses, so the second component hits the Next fetch cache.
  const heroCities = cities.slice(0, 4);
  const heroPhotos = isUnsplashConfigured
    ? await fetchPhotosByQueries(
        heroCities.map((c) => `${c.name} ${c.country} travel`)
      )
    : heroCities.map(() => null);

  const slides: HeroSlide[] = heroCities.map((city, idx) => ({
    city,
    photo: heroPhotos[idx] ?? null,
  }));

  return (
    <div>
      {/* Cinematic hero carousel */}
      <HeroCarousel slides={slides} />

      {/* Booking-style picker overlapping the hero */}
      <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-6 sm:-mt-12">
        <CityPicker
          cities={cities}
          defaultCityId={featured?.id}
          ctaLabel="Plan trip"
        />
      </div>

      {/* Tagline + value props */}
      <section className="mx-auto mt-20 max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-cocoa-800 sm:text-4xl">
            Travel further on a smaller budget.
          </h2>
          <p className="mt-3 text-sm text-cocoa-500">
            {APP_NAME} helps budget travellers plan with free activities, cheap
            food, walking routes, and honest local tips — on a simple 2D map.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Free activities",
              body: "Walks, viewpoints, and free attractions in every city.",
            },
            {
              title: "Cheap food",
              body: "Honest budget ranges and dish-level local tips.",
            },
            {
              title: "Safety + scams",
              body: "Crowd-sourced warnings about scams in the city centre.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-3xl bg-coral-50 p-6 shadow-soft ring-1 ring-coral-100"
            >
              <p className="font-display text-2xl text-cocoa-800">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-cocoa-500">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <DestinationGallery cities={cities} />

      <TripPlannerSection templates={templates} cities={cities} />
    </div>
  );
}
