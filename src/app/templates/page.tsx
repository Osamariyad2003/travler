import TripTemplateGenerator from "@/components/templates/TripTemplateGenerator";
import TripTemplateCard from "@/components/templates/TripTemplateCard";
import { fetchCities, fetchTripTemplates } from "@/lib/firestore";
import {
  fetchPhotosByQueries,
  isUnsplashConfigured,
} from "@/lib/unsplash";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const [templates, cities] = await Promise.all([
    fetchTripTemplates(),
    fetchCities(),
  ]);
  const cityNameById: Record<string, string> = Object.fromEntries(
    cities.map((c) => [c.id, c.name])
  );
  const photos = isUnsplashConfigured
    ? await fetchPhotosByQueries(
        templates.map((t) => {
          const city = cityNameById[t.cityId] ?? t.cityId;
          return `${city} city skyline travel`;
        })
      )
    : templates.map(() => null);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-display text-4xl font-semibold text-cocoa-800 sm:text-5xl">
          Trip planners
        </h1>
        <div className="mt-3 h-px w-24 bg-coral-300" />
        <p className="mt-3 text-sm text-cocoa-500">
          Ready-made itineraries for short, low-cost trips. Each template lists
          activities, estimated budgets, and local tips.
        </p>
      </header>

      <TripTemplateGenerator cities={cities} />

      {templates.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-cocoa-200 bg-coral-50 p-6 text-sm text-cocoa-600">
          No templates yet.
        </p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, idx) => (
            <li key={template.id}>
              <TripTemplateCard
                template={template}
                cityName={cityNameById[template.cityId]}
                photo={photos[idx] ?? undefined}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
