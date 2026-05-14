"use client";

import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";

import {
  TILE_LAYER_ATTRIBUTION,
  TILE_LAYER_URL,
} from "@/lib/constants";
import type { City, Place, Route } from "@/lib/types";

import MapMarker from "./MapMarker";
import RouteLayer from "./RouteLayer";

interface TravelerMapProps {
  city: City;
  places: Place[];
  routes: Route[];
  selectedRouteId: string | null;
  recenterToken: number;
}

function RecenterController({
  city,
  recenterToken,
}: {
  city: City;
  recenterToken: number;
}) {
  const map = useMap();
  const lastToken = useRef<number>(recenterToken);
  useEffect(() => {
    if (recenterToken !== lastToken.current) {
      map.flyTo(
        [city.centerLatitude, city.centerLongitude],
        city.defaultZoom,
        { duration: 0.8 }
      );
      lastToken.current = recenterToken;
    }
  }, [recenterToken, city, map]);
  return null;
}

export default function TravelerMap({
  city,
  places,
  routes,
  selectedRouteId,
  recenterToken,
}: TravelerMapProps) {
  const center = useMemo<[number, number]>(
    () => [city.centerLatitude, city.centerLongitude],
    [city]
  );

  return (
    <MapContainer
      center={center}
      zoom={city.defaultZoom}
      zoomControl={false}
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer attribution={TILE_LAYER_ATTRIBUTION} url={TILE_LAYER_URL} />
      <ZoomControl position="bottomright" />
      <RecenterController city={city} recenterToken={recenterToken} />
      {routes.map((route) => (
        <RouteLayer
          key={route.id}
          route={route}
          highlighted={selectedRouteId === null || selectedRouteId === route.id}
        />
      ))}
      {places.map((place) => (
        <MapMarker key={place.id} place={place} />
      ))}
    </MapContainer>
  );
}
