"use client";

import dynamic from "next/dynamic";

import type { City, Place } from "@/lib/types";

const TripDayMap = dynamic(() => import("./TripDayMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-coral-50 text-xs text-cocoa-500">
      Loading map…
    </div>
  ),
});

export default function TripDayMapWrapper({
  city,
  stops,
}: {
  city: City;
  stops: Place[];
}) {
  return <TripDayMap city={city} stops={stops} />;
}
