import { notFound } from "next/navigation";

import TripDetailView from "@/components/templates/TripDetailView";
import {
  fetchCity,
  fetchPlacesForCity,
  fetchTripTemplates,
} from "@/lib/firestore";
import { generateCity } from "@/lib/generator";
import type { TravelStyle } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { fetchDailyWeather } from "@/lib/weather";

export const dynamic = "force-dynamic";

interface TemplateDetailPageProps {
  params: { templateId: string };
  searchParams: {
    days?: string;
    q?: string;
    startDate?: string;
    style?: string;
  };
}

const TRAVEL_STYLES: TravelStyle[] = [
  "budget",
  "student",
  "backpacker",
  "family",
  "solo",
  "couple",
];

function parseStartDate(input: string | undefined): Date {
  if (input) {
    const d = new Date(input);
    if (!Number.isNaN(d.getTime())) return d;
  }
  // Default to today (UTC).
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
}

function parseDays(input: string | undefined): number | undefined {
  const days = Number(input);
  if (!Number.isFinite(days)) return undefined;
  return Math.max(1, Math.min(7, Math.round(days)));
}

function parseTravelStyle(input: string | undefined): TravelStyle {
  return TRAVEL_STYLES.includes(input as TravelStyle)
    ? (input as TravelStyle)
    : "budget";
}

export default async function TemplateDetailPage({
  params,
  searchParams,
}: TemplateDetailPageProps) {
  if (params.templateId === "generated") {
    const query = searchParams.q?.trim();
    if (!query) notFound();

    const bundle = await generateCity({
      query,
      cityId: slugify(query),
      tripDays: parseDays(searchParams.days),
      travelStyle: parseTravelStyle(searchParams.style),
    });
    const template = bundle?.templates[0];
    if (!bundle || !template) notFound();

    const startDate = parseStartDate(searchParams.startDate);
    const weather = await fetchDailyWeather(
      bundle.city.centerLatitude,
      bundle.city.centerLongitude,
      startDate,
      Math.max(template.days, 1)
    );

    return (
      <TripDetailView
        template={template}
        city={bundle.city}
        places={bundle.places}
        startDate={startDate.toISOString()}
        weather={weather}
      />
    );
  }

  const templates = await fetchTripTemplates();
  const template = templates.find((t) => t.id === params.templateId);
  if (!template) notFound();

  const [city, places] = await Promise.all([
    fetchCity(template.cityId),
    fetchPlacesForCity(template.cityId),
  ]);
  if (!city) notFound();

  const startDate = parseStartDate(searchParams.startDate);
  const weather = await fetchDailyWeather(
    city.centerLatitude,
    city.centerLongitude,
    startDate,
    Math.max(template.days, 1)
  );

  return (
    <TripDetailView
      template={template}
      city={city}
      places={places}
      startDate={startDate.toISOString()}
      weather={weather}
    />
  );
}
