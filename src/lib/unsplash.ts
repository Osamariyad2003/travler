import type { Photo } from "./types";

/**
 * Unsplash — high-quality stock photography. Server-side only — the access
 * key is read from process.env, never bundled into the client. Only the
 * Access Key is required; the Secret Key is for OAuth flows we don't use,
 * and putting it in this app would broaden the blast radius if leaked.
 *
 * Free tier: 50 requests/hour on demo apps, 5,000/hour on production-approved
 * apps. Results are cached for 24h via Next's fetch cache so the same query
 * hits Unsplash at most once per day.
 *
 * Attribution requirement: every rendered photo must credit the
 * photographer with a UTM-tagged link. The `Photo` shape we return covers it.
 */

const TOKEN = process.env.UNSPLASH_ACCESS_KEY;
const SOURCE = "Unsplash";
const UTM = "?utm_source=traveler&utm_medium=referral";

export const isUnsplashConfigured = Boolean(TOKEN);

interface UnsplashRaw {
  id: string;
  alt_description: string | null;
  description: string | null;
  urls: { small: string; regular: string; full: string };
  user: { name: string; links: { html: string } };
  links: { html: string };
}

function adapt(raw: UnsplashRaw, fallbackAlt: string): Photo {
  return {
    id: raw.id,
    url: raw.urls.regular,
    alt: raw.alt_description ?? raw.description ?? fallbackAlt,
    credit: {
      name: raw.user.name,
      profileUrl: `${raw.user.links.html}${UTM}`,
    },
    sourceName: SOURCE,
    sourceUrl: `${raw.links.html}${UTM}`,
  };
}

export async function searchUnsplash(
  query: string,
  count = 1
): Promise<Photo[]> {
  if (!TOKEN) return [];

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(Math.max(1, Math.min(30, count))));
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("content_filter", "high");

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${TOKEN}`,
        "Accept-Version": "v1",
      },
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) {
      console.warn(`Unsplash ${res.status} for "${query}"`);
      return [];
    }
    const data = (await res.json()) as { results?: UnsplashRaw[] };
    return (data.results ?? []).map((p) => adapt(p, query));
  } catch (err) {
    console.warn("Unsplash request failed", err);
    return [];
  }
}

export async function fetchOnePhoto(query: string): Promise<Photo | null> {
  const [first] = await searchUnsplash(query, 1);
  return first ?? null;
}

export async function fetchPhotosByQueries(
  queries: string[]
): Promise<Array<Photo | null>> {
  return Promise.all(queries.map((q) => fetchOnePhoto(q)));
}
