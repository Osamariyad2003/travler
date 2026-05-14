import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
  type DocumentData,
} from "firebase/firestore";

import { getDb, isFirebaseConfigured } from "./firebase";
import {
  sampleCities,
  samplePlaces,
  sampleRoutes,
  sampleTripTemplates,
} from "./sampleData";
import type {
  City,
  Place,
  PlaceSubmissionInput,
  Route,
  Submission,
  TripTemplate,
} from "./types";

export const COLLECTIONS = {
  users: "users",
  cities: "cities",
  places: "places",
  routes: "routes",
  tripTemplates: "tripTemplates",
  submissions: "submissions",
} as const;

function mapDoc<T>(id: string, data: DocumentData): T {
  return { id, ...data } as T;
}

function withoutUndefined(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) => key !== "id" && value !== undefined
    )
  );
}

function serializeRouteCoordinates(value: unknown): unknown {
  if (!Array.isArray(value)) return value;
  return value.map((coord) => {
    if (Array.isArray(coord)) {
      const [latitude, longitude] = coord;
      return { latitude, longitude };
    }
    return coord;
  });
}

export async function fetchCities(): Promise<City[]> {
  const db = getDb();
  if (!db) return sampleCities;
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.cities));
    if (snap.empty) return sampleCities;
    return snap.docs.map((d) => mapDoc<City>(d.id, d.data()));
  } catch (err) {
    console.warn("fetchCities falling back to sample data", err);
    return sampleCities;
  }
}

export async function fetchCity(cityId: string): Promise<City | null> {
  const db = getDb();
  if (!db) {
    return sampleCities.find((c) => c.id === cityId) ?? null;
  }
  try {
    const ref = doc(db, COLLECTIONS.cities, cityId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return sampleCities.find((c) => c.id === cityId) ?? null;
    return mapDoc<City>(snap.id, snap.data());
  } catch (err) {
    console.warn("fetchCity falling back to sample data", err);
    return sampleCities.find((c) => c.id === cityId) ?? null;
  }
}

export async function fetchPlacesForCity(cityId: string): Promise<Place[]> {
  const db = getDb();
  if (!db) return samplePlaces.filter((p) => p.cityId === cityId);
  try {
    const q = query(
      collection(db, COLLECTIONS.places),
      where("cityId", "==", cityId),
      where("status", "==", "approved")
    );
    const snap = await getDocs(q);
    if (snap.empty) return samplePlaces.filter((p) => p.cityId === cityId);
    return snap.docs.map((d) => mapDoc<Place>(d.id, d.data()));
  } catch (err) {
    console.warn("fetchPlacesForCity falling back to sample data", err);
    return samplePlaces.filter((p) => p.cityId === cityId);
  }
}

/**
 * Firestore rejects nested arrays, so we serialise Route.coordinates as
 * `Array<{latitude, longitude}>` on write (see scripts/seed-via-gcloud.ts).
 * Convert back to `Array<[lat, lng]>` here so Leaflet's Polyline is happy.
 * Also tolerates the original tuple shape in case a route was written by a
 * client that doesn't use the seeder.
 */
function rehydrateRouteCoords(data: DocumentData): DocumentData {
  if (!Array.isArray(data.coordinates)) return data;
  return {
    ...data,
    coordinates: data.coordinates.map((c: unknown) => {
      if (Array.isArray(c)) return c;
      if (
        typeof c === "object" &&
        c !== null &&
        "latitude" in c &&
        "longitude" in c
      ) {
        const obj = c as { latitude: number; longitude: number };
        return [obj.latitude, obj.longitude];
      }
      return c;
    }),
  };
}

export async function fetchRoutesForCity(cityId: string): Promise<Route[]> {
  const db = getDb();
  if (!db) return sampleRoutes.filter((r) => r.cityId === cityId);
  try {
    const q = query(
      collection(db, COLLECTIONS.routes),
      where("cityId", "==", cityId),
      where("status", "==", "approved")
    );
    const snap = await getDocs(q);
    if (snap.empty) return sampleRoutes.filter((r) => r.cityId === cityId);
    return snap.docs.map((d) => mapDoc<Route>(d.id, rehydrateRouteCoords(d.data())));
  } catch (err) {
    console.warn("fetchRoutesForCity falling back to sample data", err);
    return sampleRoutes.filter((r) => r.cityId === cityId);
  }
}

export async function fetchTripTemplates(): Promise<TripTemplate[]> {
  const db = getDb();
  if (!db) return sampleTripTemplates;
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.tripTemplates));
    if (snap.empty) return sampleTripTemplates;
    return snap.docs.map((d) => mapDoc<TripTemplate>(d.id, d.data()));
  } catch (err) {
    console.warn("fetchTripTemplates falling back to sample data", err);
    return sampleTripTemplates;
  }
}

export async function submitPlace(
  userId: string,
  input: PlaceSubmissionInput
): Promise<{ ok: boolean; mock: boolean; id?: string; error?: string }> {
  const db = getDb();
  if (!isFirebaseConfigured || !db) {
    return { ok: true, mock: true };
  }
  try {
    const ref = await addDoc(collection(db, COLLECTIONS.submissions), {
      userId,
      type: "place",
      cityId: input.cityId,
      data: { ...input, status: "pending" },
      status: "pending",
      createdAt: serverTimestamp(),
    });
    return { ok: true, mock: false, id: ref.id };
  } catch (err) {
    return {
      ok: false,
      mock: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function fetchPendingSubmissions(): Promise<Submission[]> {
  const db = getDb();
  if (!db) return [];
  try {
    const q = query(
      collection(db, COLLECTIONS.submissions),
      where("status", "==", "pending")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => mapDoc<Submission>(d.id, d.data()));
  } catch (err) {
    console.warn("fetchPendingSubmissions failed", err);
    return [];
  }
}

export async function reviewSubmission(
  submissionId: string,
  decision: "approved" | "rejected",
  reviewerId: string
): Promise<{ ok: boolean; mock: boolean; error?: string }> {
  const db = getDb();
  if (!isFirebaseConfigured || !db) {
    return { ok: true, mock: true };
  }
  try {
    const ref = doc(db, COLLECTIONS.submissions, submissionId);
    const submissionSnap = await getDoc(ref);
    if (!submissionSnap.exists()) {
      return { ok: false, mock: false, error: "Submission not found." };
    }

    const submission = submissionSnap.data();
    const batch = writeBatch(db);

    batch.update(ref, {
      status: decision,
      reviewedAt: serverTimestamp(),
      reviewedBy: reviewerId,
    });

    if (decision === "approved") {
      const rawData =
        typeof submission.data === "object" && submission.data !== null
          ? (submission.data as Record<string, unknown>)
          : {};
      const type = submission.type as Submission["type"];
      const cityId = (submission.cityId as string | undefined) ?? rawData.cityId;

      if (type === "place") {
        batch.set(
          doc(db, COLLECTIONS.places, submissionId),
          withoutUndefined({
            ...rawData,
            cityId,
            status: "approved",
            sourceSubmissionId: submissionId,
            createdAt: rawData.createdAt ?? serverTimestamp(),
            updatedAt: serverTimestamp(),
          }),
          { merge: true }
        );
      }

      if (type === "route") {
        batch.set(
          doc(db, COLLECTIONS.routes, submissionId),
          withoutUndefined({
            ...rawData,
            cityId,
            coordinates: serializeRouteCoordinates(rawData.coordinates),
            status: "approved",
            sourceSubmissionId: submissionId,
            createdAt: rawData.createdAt ?? serverTimestamp(),
            updatedAt: serverTimestamp(),
          }),
          { merge: true }
        );
      }

      if (type === "tripTemplate") {
        batch.set(
          doc(db, COLLECTIONS.tripTemplates, submissionId),
          withoutUndefined({
            ...rawData,
            cityId,
            sourceSubmissionId: submissionId,
            createdAt: rawData.createdAt ?? serverTimestamp(),
            updatedAt: serverTimestamp(),
          }),
          { merge: true }
        );
      }
    }

    await batch.commit();
    return { ok: true, mock: false };
  } catch (err) {
    return {
      ok: false,
      mock: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function upsertUserProfile(
  userId: string,
  email: string,
  name: string
): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    const ref = doc(db, COLLECTIONS.users, userId);
    await setDoc(
      ref,
      {
        name,
        email,
        role: "user",
        savedPlaces: [],
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn("upsertUserProfile failed", err);
  }
}
