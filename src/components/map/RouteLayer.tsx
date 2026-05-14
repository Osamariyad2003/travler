"use client";

import { Polyline, CircleMarker, Tooltip } from "react-leaflet";

import type { Route } from "@/lib/types";

interface RouteLayerProps {
  route: Route;
  highlighted?: boolean;
}

export default function RouteLayer({ route, highlighted = true }: RouteLayerProps) {
  if (!route.coordinates || route.coordinates.length < 2) return null;
  return (
    <>
      <Polyline
        positions={route.coordinates}
        pathOptions={{
          color: highlighted ? "#0284c7" : "#94a3b8",
          weight: highlighted ? 5 : 3,
          opacity: highlighted ? 0.85 : 0.6,
          dashArray: highlighted ? undefined : "6,8",
        }}
      />
      {route.stops.map((stop, idx) => (
        <CircleMarker
          key={`${route.id}-stop-${idx}`}
          center={[stop.latitude, stop.longitude]}
          radius={6}
          pathOptions={{
            color: "#0c4a6e",
            fillColor: "#ffffff",
            fillOpacity: 1,
            weight: 2,
          }}
        >
          <Tooltip direction="top" offset={[0, -6]} opacity={0.95}>
            <span className="text-xs font-medium">
              {idx + 1}. {stop.name}
            </span>
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}
