import { notFound } from "next/navigation";

import CityMapView from "./CityMapView";
import {
  fetchCities,
  fetchCity,
  fetchPlacesForCity,
  fetchRoutesForCity,
} from "@/lib/firestore";
import { generateCity } from "@/lib/generator";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface CityPageProps {
  params: { cityId: string };
  searchParams: { q?: string };
}

export default async function CityPage({
  params,
  searchParams,
}: CityPageProps) {
  const [storedCity, cities, storedPlaces, storedRoutes] = await Promise.all([
    fetchCity(params.cityId),
    fetchCities(),
    fetchPlacesForCity(params.cityId),
    fetchRoutesForCity(params.cityId),
  ]);

  // 1. Fully seeded — Firestore has a city AND curated places. Use as-is.
  if (storedCity && storedPlaces.length > 0) {
    return (
      <CityMapView
        city={storedCity}
        cities={cities}
        places={storedPlaces}
        routes={storedRoutes}
      />
    );
  }

  // 2. City exists in Firestore (or sample data) but has no curated places.
  //    Live-generate POIs from OSM, but keep the curated description.
  if (storedCity) {
    const query = `${storedCity.name}, ${storedCity.country}`;
    const generated = await generateCity({ query, cityId: params.cityId });
    if (generated) {
      return (
        <CityMapView
          city={storedCity} // keep curated description / currency / zoom
          cities={cities}
          places={generated.places}
          routes={
            storedRoutes.length > 0 ? storedRoutes : generated.routes
          }
          generatedTemplates={generated.templates}
          generatedSource={generated.source}
        />
      );
    }
    // Generation failed — render with whatever Firestore returned (likely empty).
    return (
      <CityMapView
        city={storedCity}
        cities={cities}
        places={storedPlaces}
        routes={storedRoutes}
      />
    );
  }

  // 3. No city at all — pure live generation from a free-text query.
  const query = searchParams.q?.trim() || params.cityId.replace(/-/g, " ");
  const generated = await generateCity({ query, cityId: params.cityId });
  if (!generated) {
    notFound();
  }

  const allCities = [
    generated.city,
    ...cities.filter((c) => c.id !== generated.city.id),
  ];

  return (
    <CityMapView
      city={generated.city}
      cities={allCities}
      places={generated.places}
      routes={generated.routes}
      generatedTemplates={generated.templates}
      generatedSource={generated.source}
    />
  );
}
