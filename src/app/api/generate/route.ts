import { NextResponse } from "next/server";

import { generateCity } from "@/lib/generator";
import type { TravelStyle } from "@/lib/types";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TRAVEL_STYLES: TravelStyle[] = [
  "budget",
  "student",
  "backpacker",
  "family",
  "solo",
  "couple",
];

function parseDays(value: unknown): number | undefined {
  const days = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(days)) return undefined;
  return Math.max(1, Math.min(7, Math.round(days)));
}

function parseTravelStyle(value: unknown): TravelStyle {
  return TRAVEL_STYLES.includes(value as TravelStyle)
    ? (value as TravelStyle)
    : "budget";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const query =
    typeof (body as { query?: unknown })?.query === "string"
      ? ((body as { query: string }).query as string).trim()
      : "";
  const tripDays = parseDays((body as { days?: unknown })?.days);
  const travelStyle = parseTravelStyle(
    (body as { travelStyle?: unknown })?.travelStyle
  );

  if (!query) {
    return NextResponse.json(
      { error: "Missing 'query' in body." },
      { status: 400 }
    );
  }

  const cityId = slugify(query);
  if (!cityId) {
    return NextResponse.json(
      { error: "Could not derive a city id from the query." },
      { status: 400 }
    );
  }

  const bundle = await generateCity({ query, cityId, tripDays, travelStyle });
  if (!bundle) {
    return NextResponse.json(
      {
        error:
          "Could not generate a map for that city — geocoding or POI lookup failed.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(bundle, { status: 200 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  if (!query) {
    return NextResponse.json(
      { error: "Pass ?q=<city name>" },
      { status: 400 }
    );
  }
  const bundle = await generateCity({
    query,
    cityId: slugify(query),
    tripDays: parseDays(searchParams.get("days")),
    travelStyle: parseTravelStyle(searchParams.get("style")),
  });
  if (!bundle) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(bundle);
}
