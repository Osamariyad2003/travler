"use client";

import L from "leaflet";
import { useEffect } from "react";
import {
  CircleMarker,
  Marker,
  Polyline,
  Tooltip,
  useMap,
} from "react-leaflet";

import type { LiveTrip } from "./LiveTripButton";

interface LiveTripLayerProps {
  trip: LiveTrip;
}

const userIcon: L.DivIcon = L.divIcon({
  className: "",
  html:
    '<div class="traveler-marker" style="background:#0ea5e9;width:34px;height:34px;font-size:17px">🧍</div>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
  popupAnchor: [0, -20],
});

export default function LiveTripLayer({ trip }: LiveTripLayerProps) {
  const map = useMap();

  // Fit the map to the whole live trip the first time it's drawn so the
  // user sees both their location AND the final stop without panning.
  useEffect(() => {
    if (trip.path.coordinates.length === 0) return;
    const bounds = L.latLngBounds(trip.path.coordinates);
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 16 });
  }, [trip, map]);

  return (
    <>
      <Polyline
        positions={trip.path.coordinates}
        pathOptions={{
          color: "#0ea5e9",
          weight: 6,
          opacity: 0.9,
          lineCap: "round",
        }}
      />
      <Marker
        position={[trip.origin.latitude, trip.origin.longitude]}
        icon={userIcon}
        title="Your current location"
      />
      {trip.stops.map((stop, idx) => (
        <CircleMarker
          key={stop.id}
          center={[stop.latitude, stop.longitude]}
          radius={8}
          pathOptions={{
            color: "#0c4a6e",
            fillColor: "#fde68a",
            fillOpacity: 1,
            weight: 2,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
            <span className="text-xs font-medium">
              {idx + 1}. {stop.name}
            </span>
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}
