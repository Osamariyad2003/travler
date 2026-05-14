/**
 * One-shot Firestore seeder that uses the user's `gcloud auth` access token
 * (no service-account JSON required). Bulk-writes sampleCities, samplePlaces,
 * sampleRoutes, sampleTripTemplates into the Traveler project.
 *
 * Run:
 *   npx tsx scripts/seed-via-gcloud.ts
 *
 * Pre-flight: `gcloud auth login` must have been run as a user account that
 * has Editor or Datastore Owner role on the Firebase project.
 */

import { execSync } from "node:child_process";

import {
  sampleCities,
  samplePlaces,
  sampleRoutes,
  sampleTripTemplates,
} from "../src/lib/sampleData";

const PROJECT_ID = "traveler-app-5bb74";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const GCLOUD_PATH_WIN =
  '"C:/Program Files (x86)/Google/Cloud SDK/google-cloud-sdk/bin/gcloud.cmd"';

function getToken(): string {
  const cmd =
    process.platform === "win32"
      ? `${GCLOUD_PATH_WIN} auth print-access-token`
      : "gcloud auth print-access-token";
  try {
    const out = execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    const token = out.trim();
    if (!token) throw new Error("gcloud returned empty token");
    return token;
  } catch (err) {
    console.error(
      "Couldn't get gcloud access token. Run `gcloud auth login` as a user " +
        "with Editor/Datastore-Owner on the Firebase project, then retry."
    );
    if (err instanceof Error) console.error(err.message);
    process.exit(1);
  }
}

/** Convert a JS value to a Firestore REST `Value` object. Recursive. */
function toValue(v: unknown): unknown {
  if (v === null) return { nullValue: "NULL_VALUE" };
  if (typeof v === "string") return { stringValue: v };
  if (typeof v === "number") {
    if (Number.isInteger(v)) return { integerValue: String(v) };
    return { doubleValue: v };
  }
  if (typeof v === "boolean") return { booleanValue: v };
  if (Array.isArray(v)) {
    return { arrayValue: { values: v.map(toValue) } };
  }
  if (typeof v === "object") {
    const fields: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      if (val === undefined) continue;
      fields[k] = toValue(val);
    }
    return { mapValue: { fields } };
  }
  throw new Error(`Unsupported value type: ${typeof v}`);
}

function toDocument(obj: Record<string, unknown>): {
  fields: Record<string, unknown>;
} {
  const fields: Record<string, unknown> = {};
  for (const [k, val] of Object.entries(obj)) {
    if (val === undefined) continue;
    fields[k] = toValue(val);
  }
  return { fields };
}

async function writeDoc(
  token: string,
  collection: string,
  docId: string,
  data: Record<string, unknown>
): Promise<void> {
  // PATCH against the document path with no updateMask = full replace / upsert.
  const url = `${BASE}/${collection}/${encodeURIComponent(docId)}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toDocument(data)),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(
      `Write failed for ${collection}/${docId}: ${res.status} ${res.statusText}\n${txt}`
    );
  }
}

/**
 * Firestore disallows arrays-of-arrays. Our Route.coordinates is
 * `Array<[lat, lng]>` (perfect for Leaflet), so convert to
 * `Array<{latitude, longitude}>` before writing. The firestore reader
 * inverts this on the way back out.
 */
function transformForCollection(
  collection: string,
  rest: Record<string, unknown>
): Record<string, unknown> {
  if (collection === "routes" && Array.isArray(rest.coordinates)) {
    return {
      ...rest,
      coordinates: (rest.coordinates as unknown[][]).map((pair) => {
        const [lat, lng] = pair as [number, number];
        return { latitude: lat, longitude: lng };
      }),
    };
  }
  return rest;
}

async function seedCollection<T extends { id: string }>(
  token: string,
  collection: string,
  docs: T[]
): Promise<void> {
  console.log(`→ ${collection}: ${docs.length} document(s)`);
  // Parallel chunks — Firestore handles bursts fine; cap to be polite.
  const CHUNK = 10;
  let done = 0;
  for (let i = 0; i < docs.length; i += CHUNK) {
    const chunk = docs.slice(i, i + CHUNK);
    await Promise.all(
      chunk.map(async (d) => {
        const { id, ...rest } = d as { id: string } & Record<string, unknown>;
        await writeDoc(token, collection, id, transformForCollection(collection, rest));
      })
    );
    done += chunk.length;
    process.stdout.write(`  ${done}/${docs.length}\r`);
  }
  console.log(`  ${done}/${docs.length} done`);
}

async function main(): Promise<void> {
  console.log(`Seeding ${PROJECT_ID}`);
  console.log("Getting access token from gcloud...");
  const token = getToken();

  await seedCollection(token, "cities", sampleCities);
  await seedCollection(token, "places", samplePlaces);
  await seedCollection(token, "routes", sampleRoutes);
  await seedCollection(token, "tripTemplates", sampleTripTemplates);

  console.log("\nSeed complete.");
}

main().catch((err) => {
  console.error("Seed failed:");
  console.error(err);
  process.exit(1);
});
