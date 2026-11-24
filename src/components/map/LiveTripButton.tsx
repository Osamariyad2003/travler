"use client";

import { useState } from "react";

import {
  formatKm,
  formatMinutes,
  haversineKm,
  routeWalkingClient,
  type LiveTripPath,
  type Waypoint,
} from "@/lib/client-routing";
import type { Place } from "@/lib/types";

export interface LiveTrip {
  origin: Waypoint;
  stops: Place[];
  path: LiveTripPath;
}

interface LiveTripButtonProps {
  cityCenter: Waypoint;
  places: Place[];
  liveTrip: LiveTrip | null;
  onStart: (trip: LiveTrip) => void;
  onClear: () => void;
  /**
   * How many stops to string together. Default 4 — enough to feel like a
   * short real walk without blowing past OSRM's fair-use limits.
   */
  maxStops?: number;
}

type Status =
  | { kind: "idle" }
  | { kind: "locating" }
  | { kind: "routing" }
  | { kind: "error"; message: string };

function pickNearestStops(
  origin: Waypoint,
  places: Place[],
  count: number
): Place[] {
  // Keep only places we have real coords for and that look like somewhere a
  // walker would actually stop at. Filtering out safety/scam markers avoids
  // routing the user toward a pickpocketing hotspot.
  const walkable = places.filter(
    (p) =>
      Number.isFinite(p.latitude) &&
      Number.isFinite(p.longitude) &&
      p.category !== "safety_warning" &&
      p.category !== "scam_warning"
  );

  return walkable
    .map((p) => ({
      place: p,
      km: haversineKm(origin, { latitude: p.latitude, longitude: p.longitude }),
    }))
    // OSRM round trips are slow, so cap at places within a reasonable walk
    // radius (10 km). Falls through if nothing is in range.
    .filter(({ km }) => km < 10)
    .sort((a, b) => a.km - b.km)
    .slice(0, count)
    .map((entry) => entry.place);
}

export default function LiveTripButton({
  cityCenter,
  places,
  liveTrip,
  onStart,
  onClear,
  maxStops = 4,
}: LiveTripButtonProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleStart() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus({
        kind: "error",
        message: "Your browser doesn't support location access.",
      });
      return;
    }

    setStatus({ kind: "locating" });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const origin: Waypoint = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Sanity check: if the user is nowhere near this city (> 150 km),
        // the resulting walk would be nonsensical. Flag it instead of
        // asking OSRM to compute a 100 km foot route.
        const distanceToCity = haversineKm(origin, cityCenter);
        if (distanceToCity > 150) {
          setStatus({
            kind: "error",
            message: `You're ~${Math.round(
              distanceToCity
            )} km from this city — open the city nearest you to start a trip from here.`,
          });
          return;
        }

        const stops = pickNearestStops(origin, places, maxStops);
        if (stops.length === 0) {
          setStatus({
            kind: "error",
            message: "No walkable places found within 10 km of you.",
          });
          return;
        }

        setStatus({ kind: "routing" });
        const path = await routeWalkingClient([
          origin,
          ...stops.map((s) => ({ latitude: s.latitude, longitude: s.longitude })),
        ]);
        if (!path) {
          setStatus({
            kind: "error",
            message: "Couldn't build a walking route right now. Try again shortly.",
          });
          return;
        }

        onStart({ origin, stops, path });
        setStatus({ kind: "idle" });
      },
      (err) => {
        const message =
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied. Enable it in your browser to start a real trip."
            : err.code === err.POSITION_UNAVAILABLE
            ? "Location unavailable right now — try again in a moment."
            : err.code === err.TIMEOUT
            ? "Location request timed out."
            : "Couldn't get your location.";
        setStatus({ kind: "error", message });
      },
      {
        enableHighAccuracy: true,
        timeout: 10_000,
        maximumAge: 60_000,
      }
    );
  }

  const busy = status.kind === "locating" || status.kind === "routing";
  const label =
    status.kind === "locating"
      ? "Getting your location…"
      : status.kind === "routing"
      ? "Drawing route…"
      : liveTrip
      ? "Restart from my location"
      : "Start real trip from my location";

  return (
    <section
      aria-label="Start a real trip"
      className="rounded-3xl bg-white shadow-card ring-1 ring-cocoa-100"
    >
      <header className="border-b border-cocoa-100 p-4">
        <h2 className="font-display text-lg font-semibold text-cocoa-800">
          Real trip
        </h2>
        <p className="text-xs text-cocoa-500">
          Share your location and we&apos;ll draw a walking route from where
          you are, through the nearest budget-friendly stops.
        </p>
      </header>
      <div className="space-y-3 p-4">
        <button
          type="button"
          onClick={handleStart}
          disabled={busy}
          className="w-full rounded-md bg-coral-500 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-soft transition hover:bg-coral-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {label}
        </button>

        {status.kind === "error" ? (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-[11px] text-red-700"
          >
            {status.message}
          </p>
        ) : null}

        {liveTrip ? (
          <div className="space-y-2 rounded-lg bg-coral-50 p-3 text-[11px] text-cocoa-700">
            <div className="flex justify-between font-semibold text-cocoa-800">
              <span>{formatKm(liveTrip.path.distanceKm)}</span>
              <span>{formatMinutes(liveTrip.path.durationMinutes)} walk</span>
            </div>
            <ol className="list-decimal space-y-0.5 pl-4">
              <li className="font-medium text-coral-700">You are here</li>
              {liveTrip.stops.map((s) => (
                <li key={s.id}>{s.name}</li>
              ))}
            </ol>
            <button
              type="button"
              onClick={onClear}
              className="text-[11px] font-semibold text-coral-600 hover:underline"
            >
              Clear trip
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
