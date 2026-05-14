"use client";

import L from "leaflet";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMap,
  useMapEvents,
} from "react-leaflet";

import {
  TILE_LAYER_ATTRIBUTION,
  TILE_LAYER_URL,
  WORLD_MAP_CENTER,
  WORLD_MAP_ZOOM,
} from "@/lib/constants";
import type { City } from "@/lib/types";

interface ExploreMapProps {
  cities: City[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

/**
 * Listens for moveend / zoomend on the map and pushes lat / lng / z into the
 * URL via replaceState (no history pollution). Debounced 300ms so quick pans
 * don't spam the URL bar while dragging.
 */
function URLSync() {
  const pathname = usePathname();
  const debounceRef = useRef<number | null>(null);

  useMapEvents({
    moveend(e) {
      const map = e.target as L.Map;
      const center = map.getCenter();
      const zoom = map.getZoom();

      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        const params = new URLSearchParams();
        params.set("lat", center.lat.toFixed(4));
        params.set("lng", center.lng.toFixed(4));
        params.set("z", String(zoom));
        window.history.replaceState({}, "", `${pathname}?${params.toString()}`);
      }, 300);
    },
  });

  return null;
}

/** Smoothly fly to a city when its sidebar entry is selected. */
function FlyToSelected({
  cities,
  selectedId,
}: {
  cities: City[];
  selectedId: string | null;
}) {
  const map = useMap();
  const lastFlownRef = useRef<string | null>(null);

  useEffect(() => {
    if (!selectedId || selectedId === lastFlownRef.current) return;
    const city = cities.find((c) => c.id === selectedId);
    if (!city) return;
    map.flyTo(
      [city.centerLatitude, city.centerLongitude],
      Math.max(map.getZoom(), 11),
      { duration: 1.0 }
    );
    lastFlownRef.current = selectedId;
  }, [selectedId, cities, map]);

  return null;
}

function buildIcon(active: boolean): L.DivIcon {
  const color = active ? "#cc4424" : "#ff7757";
  const size = active ? 38 : 30;
  return L.divIcon({
    className: "",
    html: `<div class="traveler-marker" style="background:${color};width:${size}px;height:${size}px;font-size:${size * 0.5}px">📍</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 2],
  });
}

export default function ExploreMap({
  cities,
  selectedId,
  onSelect,
}: ExploreMapProps) {
  const params = useSearchParams();

  // Resolve initial centre/zoom from URL params ONCE — Leaflet's MapContainer
  // ignores `center`/`zoom` prop changes after mount anyway, so this avoids
  // re-evaluating on every render.
  const [initialCenter] = useState<[number, number]>(() => {
    const lat = Number(params?.get("lat"));
    const lng = Number(params?.get("lng"));
    if (Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90) {
      return [lat, lng];
    }
    return WORLD_MAP_CENTER;
  });
  const [initialZoom] = useState<number>(() => {
    const z = Number(params?.get("z"));
    return Number.isFinite(z) && z >= 1 && z <= 19 ? z : WORLD_MAP_ZOOM;
  });

  const baseIcon = useMemo(() => buildIcon(false), []);
  const activeIcon = useMemo(() => buildIcon(true), []);

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      zoomControl={false}
      scrollWheelZoom
      worldCopyJump
      className="h-full w-full"
    >
      <TileLayer attribution={TILE_LAYER_ATTRIBUTION} url={TILE_LAYER_URL} />
      <ZoomControl position="bottomright" />
      <URLSync />
      <FlyToSelected cities={cities} selectedId={selectedId} />

      {cities.map((city) => {
        const isActive = selectedId === city.id;
        return (
          <Marker
            key={city.id}
            position={[city.centerLatitude, city.centerLongitude]}
            icon={isActive ? activeIcon : baseIcon}
            title={`${city.name}, ${city.country}`}
            eventHandlers={{
              click: () => onSelect(city.id),
            }}
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
                  Open the city map →
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
