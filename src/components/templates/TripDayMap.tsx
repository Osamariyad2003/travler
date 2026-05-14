"use client";

import L from "leaflet";
import { useMemo } from "react";
import { MapContainer, Marker, Polyline, TileLayer, ZoomControl } from "react-leaflet";

import {
  TILE_LAYER_ATTRIBUTION,
  TILE_LAYER_URL,
} from "@/lib/constants";
import type { City, Place } from "@/lib/types";

interface TripDayMapProps {
  city: City;
  /** Places matched to this day's checkpoints (in order). */
  stops: Place[];
}

function buildIcon(idx: number): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div class="traveler-marker" style="background:#ff7757;font-size:14px">${idx + 1}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
}

export default function TripDayMap({ city, stops }: TripDayMapProps) {
  const center: [number, number] = useMemo(() => {
    if (stops.length === 0) {
      return [city.centerLatitude, city.centerLongitude];
    }
    // Geometric centre of the day's stops — keeps the polyline framed.
    const avgLat =
      stops.reduce((sum, p) => sum + p.latitude, 0) / stops.length;
    const avgLng =
      stops.reduce((sum, p) => sum + p.longitude, 0) / stops.length;
    return [avgLat, avgLng];
  }, [stops, city]);

  const zoom = stops.length > 1 ? 14 : 13;

  const polyline: Array<[number, number]> = useMemo(
    () => stops.map((s) => [s.latitude, s.longitude]),
    [stops]
  );

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer attribution={TILE_LAYER_ATTRIBUTION} url={TILE_LAYER_URL} />
      <ZoomControl position="bottomright" />
      {polyline.length > 1 ? (
        <Polyline
          positions={polyline}
          pathOptions={{
            color: "#ff7757",
            weight: 4,
            opacity: 0.85,
            dashArray: "6,8",
          }}
        />
      ) : null}
      {stops.map((stop, idx) => (
        <Marker
          key={stop.id}
          position={[stop.latitude, stop.longitude]}
          icon={buildIcon(idx)}
          title={stop.name}
        />
      ))}
    </MapContainer>
  );
}
