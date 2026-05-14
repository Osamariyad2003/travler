import Link from "next/link";

import Logo from "@/components/Logo";
import { APP_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-cocoa-100 bg-cocoa-800 text-cocoa-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <p className="flex items-center gap-2 font-display text-xl font-semibold text-white">
            <Logo className="h-6 w-6 text-coral-400" />
            <span>{APP_NAME}</span>
          </p>
          <p className="text-sm text-cocoa-200">
            Open-source budget travel planning. Free activities, cheap food,
            walking routes — on a simple 2D map.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-coral-200">
            Explore
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/cities" className="hover:text-coral-300">Cities</Link></li>
            <li><Link href="/templates" className="hover:text-coral-300">Trip templates</Link></li>
            <li><Link href="/submit" className="hover:text-coral-300">Submit a place</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-coral-200">
            Account
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/login" className="hover:text-coral-300">Sign in</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-coral-200">
            Privacy
          </p>
          <p className="text-sm text-cocoa-200">
            No tracking. No third-party analytics. Your location stays on your
            device unless you choose to share it.
          </p>
        </div>
      </div>
      <div className="border-t border-cocoa-700 px-6 py-4">
        <p className="mx-auto max-w-7xl text-xs text-cocoa-300">
          &copy; {new Date().getFullYear()} {APP_NAME}. Map data &copy;{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            className="underline hover:text-coral-300"
            rel="noreferrer noopener"
            target="_blank"
          >
            OpenStreetMap
          </a>{" "}
          contributors. Photos via{" "}
          <a
            href="https://unsplash.com/?utm_source=traveler&utm_medium=referral"
            className="underline hover:text-coral-300"
            rel="noreferrer noopener"
            target="_blank"
          >
            Unsplash
          </a>{" "}
          contributors.
        </p>
      </div>
    </footer>
  );
}
