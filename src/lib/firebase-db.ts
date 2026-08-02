import { getFirestore, type Firestore } from "firebase/firestore";

import { getFirebaseApp } from "./firebase";

// Kept out of firebase.ts so client components that only need Auth
// (e.g. the login page) don't pull the Firestore SDK into their bundle.
let firestoreDb: Firestore | null = null;

export function getDb(): Firestore | null {
    if (firestoreDb) return firestoreDb;
    const app = getFirebaseApp();
    if (!app) return null;
    firestoreDb = getFirestore(app);
    return firestoreDb;
}
