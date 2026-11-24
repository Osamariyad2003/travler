import DestinationGallery from "@/components/home/DestinationGallery";
import HeroCarousel, {
  type HeroSlide,
} from "@/components/home/HeroCarousel";
import TripPlannerSection from "@/components/home/TripPlannerSection";
import TravelOrbitSection from "@/components/home/TravelOrbitSection";
import WorkflowShowcase from "@/components/home/WorkflowShowcase";
import CityPicker from "@/components/map/CityPicker";
import { APP_NAME, DEFAULT_CITY_ID } from "@/lib/constants";
import { fetchCities, fetchTripTemplates } from "@/lib/firestore";
import { fetchOneVideo, isPexelsConfigured } from "@/lib/pexels";
import {
  fetchPhotosByQueries,
  isUnsplashConfigured,
} from "@/lib/unsplash";

export const dynamic = "force-dynamic";

// Fisher-Yates shuffle driven by a seeded PRNG (mulberry32) instead of
// Math.random — same seed always produces the same order.
function seededShuffle<T>(items: T[], seed: number): T[] {
  let state = seed;
  const rand = () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

// Hash of the current UTC hour (YYYY-MM-DDTHH) — rotates the hero pick ~24
// times a day instead of once, so repeat visitors through the day actually
// get shifted selections while the pool stays small enough for Pexels /
// Unsplash fetch-cache hits.
function hourlySeed(): number {
  const stamp = new Date().toISOString().slice(0, 13); // YYYY-MM-DDTHH
  let hash = 0;
  for (let i = 0; i < stamp.length; i++) {
    hash = (Math.imul(hash, 31) + stamp.charCodeAt(i)) | 0;
  }
  return hash;
}

// A modest, curated pool of visually distinct, well-known budget-travel
// cities. Picking from a small fixed pool — rather than the full city list —
// keeps the Unsplash/Pexels queries below mostly *repeating* across
// visitors and across the day, so Next's 24h fetch-cache actually gets hit
// instead of firing a fresh (rate-limited) request per visitor.
const HERO_CITY_POOL_IDS = [
  "bangkok", "istanbul", "mexico-city", "cape-town",
  "lisbon", "hanoi", "medellin", "tbilisi",
  "marrakech", "budapest", "kyoto", "buenos-aires",
];

export default async function HomePage() {
  const [cities, templates] = await Promise.all([
    fetchCities(),
    fetchTripTemplates(),
  ]);

  const featured =
    cities.find((c) => c.id === DEFAULT_CITY_ID) ?? cities[0] ?? null;

  // Today's 4 cities for the cinematic hero carousel — same set all day
  // (for cache-friendliness), rotates to a new set at midnight UTC. Falls
  // back to the first 4 cities if fewer than 4 curated ids exist in this
  // deployment's data.
  const heroPool = HERO_CITY_POOL_IDS.map((id) =>
    cities.find((c) => c.id === id)
  ).filter((c): c is (typeof cities)[number] => Boolean(c));
  const heroCities =
    heroPool.length >= 4
      ? seededShuffle(heroPool, hourlySeed()).slice(0, 4)
      : cities.slice(0, 4);

  // A Pexels video per hero city, with a same-query Unsplash photo as the
  // <video poster> / no-video-configured fallback.
  const [videoResults, videoPhotos] = await Promise.all([
    isPexelsConfigured
      ? Promise.all(
        heroCities.map((c) => fetchOneVideo(`${c.name} ${c.country} city`))
      )
      : Promise.resolve(heroCities.map(() => null)),
    isUnsplashConfigured
      ? fetchPhotosByQueries(
        heroCities.map((c) => `${c.name} ${c.country} travel`)
      )
      : Promise.resolve(heroCities.map(() => null)),
  ]);
  const slides: HeroSlide[] = heroCities.map((city, idx) => ({
    city,
    photo: videoPhotos[idx] ?? null,
    video: videoResults[idx] ?? null,
  }));

  // Workflow showcase card backdrops — themed to what each card is actually
  // about, rather than reusing arbitrary city photos.
  const workflowQueries = [
    "travel photography camera",
    "travel planning notebook desk",
    "city map navigation",
  ];
  const workflowPhotos = isUnsplashConfigured
    ? await fetchPhotosByQueries(workflowQueries)
    : workflowQueries.map(() => null);
  const workflowImages = {
    shoot: workflowPhotos[0] ?? null,
    "call-sheets": workflowPhotos[1] ?? null,
    locations: workflowPhotos[2] ?? null,
  };
  const prioritizedOrbitCities = new Map<string, (typeof cities)[number]>();
  for (const cityId of [
    DEFAULT_CITY_ID,
    ...templates.map((template) => template.cityId),
  ]) {
    const city = cities.find((item) => item.id === cityId);
    if (city) {
      prioritizedOrbitCities.set(city.id, city);
    }
  }
  const orbitCities = [
    ...prioritizedOrbitCities.values(),
    ...cities.filter((city) => !prioritizedOrbitCities.has(city.id)),
  ];

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

      <TravelOrbitSection cities={orbitCities} />

      <WorkflowShowcase images={workflowImages} />

      <DestinationGallery cities={cities} />

      <TripPlannerSection templates={templates} cities={cities} />
    </div>
  );
}
