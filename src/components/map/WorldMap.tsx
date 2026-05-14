"use client";

import L from "leaflet";
import Link from "next/link";
import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";

import {
  TILE_LAYER_ATTRIBUTION,
  TILE_LAYER_URL,
  WORLD_MAP_CENTER,
  WORLD_MAP_ZOOM,
} from "@/lib/constants";
import type { City } from "@/lib/types";

interface WorldMapProps {
  cities: City[];
}

/**
 * Build the city pin once and reuse it. divIcon (not Leaflet's default
 * Marker icon) sidesteps the well-known webpack bundling break with
 * leaflet's default-marker-icon assets.
 */
function buildCityIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div class="traveler-marker" style="background:#ff7757">📍</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
}

export default function WorldMap({ cities }: WorldMapProps) {
  const icon = useMemo(() => buildCityIcon(), []);

  return (
    <MapContainer
      center={WORLD_MAP_CENTER}
      zoom={WORLD_MAP_ZOOM}
      zoomControl={false}
      scrollWheelZoom
      worldCopyJump
      className="h-full w-full"
    >
      <TileLayer attribution={TILE_LAYER_ATTRIBUTION} url={TILE_LAYER_URL} />
      <ZoomControl position="bottomright" />
      {cities.map((city) => (
        <Marker
          key={city.id}
          position={[city.centerLatitude, city.centerLongitude]}
          icon={icon}
          title={`${city.name}, ${city.country}`}
        >
          <Popup>
            <div className="min-w-[200px] max-w-[240px] space-y-2 text-sm">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-coral-600">
                {city.country}
              </p>
              <p className="font-display text-base font-semibold text-cocoa-800">
                {city.name}
              </p>
              <p className="text-xs text-cocoa-600">{city.description}</p>
              <Link
                href={`/cities/${city.id}`}
                className="inline-block text-xs font-semibold text-coral-600 hover:underline"
              >
                Open the map →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
