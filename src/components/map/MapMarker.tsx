"use client";

import { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { CATEGORY_COLORS, CATEGORY_EMOJI } from "@/lib/constants";
import type { Place } from "@/lib/types";

import PlacePopup from "./PlacePopup";

interface MapMarkerProps {
  place: Place;
}

function buildIcon(place: Place): L.DivIcon {
  const color = CATEGORY_COLORS[place.category];
  const emoji = CATEGORY_EMOJI[place.category];
  const isWarning =
    place.category === "safety_warning" || place.category === "scam_warning";
  return L.divIcon({
    className: "",
    html: `<div class="traveler-marker ${
      isWarning ? "traveler-marker-warning" : ""
    }" style="background:${color}">${emoji}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export default function MapMarker({ place }: MapMarkerProps) {
  const icon = useMemo(() => buildIcon(place), [place]);
  return (
    <Marker
      position={[place.latitude, place.longitude]}
      icon={icon}
      keyboard
      title={place.name}
    >
      <Popup>
        <PlacePopup place={place} />
      </Popup>
    </Marker>
  );
}
