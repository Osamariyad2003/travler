"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

import { useAuthUser } from "@/lib/auth-client";
import { isFirebaseConfigured, getFirebaseAuth } from "@/lib/firebase";
import { upsertUserProfile } from "@/lib/firestore";

type Mode = "signin" | "signup";

const DEFAULT_AFTER_LOGIN = "/explore";

/**
 * Only allow same-origin relative paths to flow through `?next=`. Stops
 * `?next=https://evil.example.com` from open-redirecting after sign-in.
 */
function safeNext(raw: string | null): string {
  if (!raw) return DEFAULT_AFTER_LOGIN;
  if (!raw.startsWith("/") || raw.startsWith("//")) return DEFAULT_AFTER_LOGIN;
  return raw;
}

function getAuthErrorMessage(err: unknown, fallback: string) {
  const code =
    typeof err === "object" && err !== null && "code" in err
      ? String((err as { code?: unknown }).code)
      : "";

  if (code === "auth/unauthorized-domain") {
    const host =
      typeof window !== "undefined" ? window.location.hostname : "this domain";
    return `Firebase does not authorize ${host} for Google sign in. In Firebase Console, open Authentication > Settings > Authorized domains and add ${host}. For local development, add both localhost and 127.0.0.1 if you use either URL.`;
  }

  return err instanceof Error ? err.message : fallback;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = safeNext(searchParams?.get("next") ?? null);
  const initialMode: Mode =
    searchParams?.get("mode") === "signup" ? "signup" : "signin";

  const { user, loading: authLoading } = useAuthUser();

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "loading" }
    | { type: "error"; message: string }
    | { type: "success"; message: string }
  >({ type: "idle" });

  // Already signed in — bounce straight to wherever they were headed.
  // Done in effect (not during render) because router.replace can't run during
  // a render pass.
  useEffect(() => {
    if (!authLoading && user) {
      router.replace(nextPath);
    }
  }, [authLoading, user, nextPath, router]);

  async function handleEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFirebaseConfigured) {
      setStatus({
        type: "error",
        message:
          "Firebase isn't configured. Add credentials to .env.local to enable real sign in.",
      });
      return;
    }
    setStatus({ type: "loading" });
    try {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error("Auth not available");
      const {
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
      } = await import("firebase/auth");
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
        setStatus({ type: "success", message: "Signed in." });
        router.replace(nextPath);
      } else {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await upsertUserProfile(cred.user.uid, email, name || email);
        setStatus({ type: "success", message: "Account created." });
        router.replace(nextPath);
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: getAuthErrorMessage(err, "Sign in failed."),
      });
    }
  }

  async function handleGoogle() {
    if (!isFirebaseConfigured) {
      setStatus({
        type: "error",
        message:
          "Firebase isn't configured. Add credentials to .env.local to enable Google sign in.",
      });
      return;
    }
    setStatus({ type: "loading" });
    try {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error("Auth not available");
      const { GoogleAuthProvider, signInWithPopup } = await import(
        "firebase/auth"
      );
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await upsertUserProfile(
        result.user.uid,
        result.user.email ?? "",
        result.user.displayName ?? result.user.email ?? "Traveler"
      );
      setStatus({ type: "success", message: "Signed in with Google." });
      router.replace(nextPath);
    } catch (err) {
      setStatus({
        type: "error",
        message: getAuthErrorMessage(err, "Google sign in failed."),
      });
    }
  }

  // Auth resolved + signed in → render a brief redirect notice instead of
  // flashing the form. The effect above pushes us to nextPath.
  if (!authLoading && user) {
    return (
      <div className="mx-auto max-w-md px-6 py-12 text-center text-sm text-cocoa-500">
        <p className="font-display text-2xl text-cocoa-800">
          You&apos;re signed in.
        </p>
        <p className="mt-2">Redirecting…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-semibold text-cocoa-800 sm:text-5xl">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <div className="mt-3 h-px w-20 bg-coral-300" />
        <p className="mt-3 text-sm text-cocoa-500">
          Sign in to submit places, save favourites, and help review community
          contributions.
        </p>
      </header>

      {!isFirebaseConfigured ? (
        <p className="mb-4 rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Firebase isn&apos;t configured yet. The form is shown for layout
          purposes — set the values in <code>.env.local</code> to enable real
          authentication.
        </p>
      ) : null}

      <form onSubmit={handleEmailSubmit} className="space-y-3" noValidate>
        {mode === "signup" ? (
          <label className="block">
            <span className="text-sm font-medium text-cocoa-800">Display name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              autoComplete="name"
            />
          </label>
        ) : null}
        <label className="block">
          <span className="text-sm font-medium text-cocoa-800">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            autoComplete="email"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-cocoa-800">Password</span>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
          />
        </label>
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="btn-primary w-full"
        >
          {status.type === "loading"
            ? "Working…"
            : mode === "signin"
              ? "Sign in"
              : "Create account"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-cocoa-400">
        <span className="h-px flex-1 bg-cocoa-100" />
        or
        <span className="h-px flex-1 bg-cocoa-100" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={status.type === "loading"}
        className="btn-ghost w-full"
      >
        Continue with Google
      </button>

      <p className="mt-5 text-center text-sm text-cocoa-500">
        {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="font-semibold text-coral-600 hover:underline"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        >
          {mode === "signin" ? "Create one" : "Sign in"}
        </button>
      </p>

      {status.type === "error" ? (
        <p className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {status.message}
        </p>
      ) : null}
      {status.type === "success" ? (
        <p className="mt-4 rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          {status.message}
        </p>
      ) : null}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-cocoa-500">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
