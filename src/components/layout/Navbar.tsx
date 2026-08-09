"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Logo from "@/components/Logo";
import { useAuthUser, useSignOut } from "@/lib/auth-client";
import { APP_NAME } from "@/lib/constants";
import type { City } from "@/lib/types";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/cities", label: "Cities" },
  { href: "/templates", label: "Trips" },
  { href: "/submit", label: "Contribute" },
];

const ROTATING_CITY_LIMIT = 12;
const ROTATE_INTERVAL_MS = 3200;

interface NavbarProps {
  cities?: City[];
}

/**
 * Transparent header — no background, no border. Auth-aware: shows
 * Sign in / Sign up for guests, and a friendly greeting + sign-out
 * button for authenticated users.
 */
export default function Navbar({ cities = [] }: NavbarProps) {
  const { user, loading } = useAuthUser();
  const signOut = useSignOut();
  const [signingOut, setSigningOut] = useState(false);

  const rotatingCities = useMemo(
    () => cities.slice(0, ROTATING_CITY_LIMIT),
    [cities]
  );
  const [cityIndex, setCityIndex] = useState(0);

  useEffect(() => {
    if (rotatingCities.length < 2) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const id = window.setInterval(() => {
      setCityIndex((i) => (i + 1) % rotatingCities.length);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [rotatingCities.length]);

  const spotlightCity = rotatingCities[cityIndex] ?? null;

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  }

  // Friendly display name — Google sign-in provides displayName, email/password
  // uses the email itself. Trim to first name for compactness.
  const greetingName =
    user?.displayName?.split(/\s+/)[0] ??
    user?.email?.split("@")[0] ??
    "you";

  return (
    <header className="sticky top-0 z-30 bg-transparent">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-semibold text-cocoa-800"
          >
            <Logo className="h-6 w-6 text-coral-500" />
            <span>{APP_NAME}</span>
          </Link>

          {spotlightCity ? (
            <Link
              key={spotlightCity.id}
              href={`/cities/${spotlightCity.id}`}
              className="navbar-city-fade hidden items-center gap-1.5 rounded-full border border-coral-100 bg-coral-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-coral-600 transition-colors hover:border-coral-200 hover:bg-coral-100 lg:inline-flex"
            >
              <span className="text-coral-400" aria-hidden="true">
                ✦
              </span>
              {spotlightCity.name}, {spotlightCity.country}
            </Link>
          ) : null}
        </div>

        <ul className="hidden items-center gap-7 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-cocoa-700 transition-colors hover:text-coral-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {loading ? (
            // Tiny placeholder so the navbar doesn't jump when auth state
            // resolves. Width matches "Sign in [Sign up]" approximately.
            <span
              aria-hidden="true"
              className="h-9 w-32 animate-pulse rounded-full bg-cocoa-100/60"
            />
          ) : user ? (
            <>
              <span className="hidden text-sm text-cocoa-700 sm:inline">
                Hi,{" "}
                <span className="font-semibold text-cocoa-800">
                  {greetingName}
                </span>
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="rounded-full border border-cocoa-200 px-4 py-2 text-sm font-medium text-cocoa-700 transition-colors hover:border-coral-300 hover:text-coral-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {signingOut ? "Signing out…" : "Sign out"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-medium text-cocoa-700 transition-colors hover:text-coral-600 sm:inline"
              >
                Sign in
              </Link>
              <Link
                href="/login?mode=signup"
                className="btn-primary !py-2 !px-4 text-sm"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
