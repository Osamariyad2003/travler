/**
 * One-off Firestore seeder. Bulk-writes sampleCities, samplePlaces,
 * sampleRoutes, and sampleTripTemplates into your Firebase project so the
 * UI shows real data instead of falling back to sampleData.ts.
 *
 * Setup
 * -----
 *   1. Firebase Console → Project settings → Service accounts →
 *      "Generate new private key". Save as ./serviceAccount.json (GIT-IGNORED).
 *   2. Install one-time deps:
 *        npm install --save-dev firebase-admin tsx
 *   3. Run:
 *        npm run seed
 *      (resolves to: tsx scripts/seed-firestore.ts)
 *
 * Re-running is idempotent — it merges by document ID. Safe to run after
 * editing sampleData.ts to push updates.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import {
  sampleCities,
  samplePlaces,
  sampleRoutes,
  sampleTripTemplates,
} from "../src/lib/sampleData";

const SERVICE_ACCOUNT_PATH = resolve(process.cwd(), "serviceAccount.json");

if (!existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error(
    "Missing serviceAccount.json at repo root. Generate one in Firebase " +
      "Console → Project settings → Service accounts → Generate new private key, " +
      "then save it next to package.json. The file is gitignored."
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(
  readFileSync(SERVICE_ACCOUNT_PATH, "utf8")
) as { project_id: string };

initializeApp({
  credential: cert(SERVICE_ACCOUNT_PATH),
  projectId: serviceAccount.project_id,
});

const db = getFirestore();

async function seedCollection<T extends { id: string }>(
  name: string,
  docs: T[]
): Promise<void> {
  console.log(`→ ${name}: ${docs.length} document(s)`);
  // Firestore commit limit is 500 ops per batch — chunk to be safe.
  const chunkSize = 400;
  for (let i = 0; i < docs.length; i += chunkSize) {
    const batch = db.batch();
    for (const doc of docs.slice(i, i + chunkSize)) {
      const { id, ...rest } = doc;
      batch.set(db.collection(name).doc(id), rest, { merge: true });
    }
    await batch.commit();
  }
}

async function main() {
  console.log(`Seeding project: ${serviceAccount.project_id}\n`);
  await seedCollection("cities", sampleCities);
  await seedCollection("places", samplePlaces);
  await seedCollection("routes", sampleRoutes);
  await seedCollection("tripTemplates", sampleTripTemplates);
  console.log("\n✓ Seed complete.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
