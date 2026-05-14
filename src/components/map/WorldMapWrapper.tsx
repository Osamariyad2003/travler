"use client";

import dynamic from "next/dynamic";

import type { City } from "@/lib/types";

/**
 * Leaflet touches `window` at module-eval time, so the actual map component
 * must never run during SSR. Dynamic import with `ssr: false` keeps Leaflet
 * client-only while letting the parent /cities page stay a server component.
 */
const WorldMap = dynamic(() => import("./WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-coral-50 text-sm text-cocoa-500">
      Loading world map…
    </div>
  ),
});

export default function WorldMapWrapper({ cities }: { cities: City[] }) {
  return <WorldMap cities={cities} />;
}
