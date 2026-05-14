"use client";

import type { User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

import { getFirebaseAuth, isFirebaseConfigured } from "./firebase";

/**
 * Subscribes to Firebase Auth state changes and exposes the current user.
 * Returns `{ user: null, loading: false }` immediately when Firebase isn't
 * configured, so components don't have to guard for the unconfigured case.
 */
export function useAuthUser(): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    // Lazy-import to keep firebase/auth out of components that don't need it.
    let unsubscribe: (() => void) | null = null;
    let cancelled = false;
    void import("firebase/auth").then(({ onAuthStateChanged }) => {
      if (cancelled) return;
      unsubscribe = onAuthStateChanged(auth, (u) => {
        setUser(u);
        setLoading(false);
      });
    });
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  return { user, loading };
}

/**
 * Sign out helper — wraps the lazy import so call sites don't have to.
 */
export function useSignOut(): () => Promise<void> {
  return useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
  }, []);
}
