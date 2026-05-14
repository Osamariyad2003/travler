import type { Video } from "./types";

/**
 * Pexels Videos — free CC0 stock video API. Symmetric to the Unsplash photo
 * flow we use elsewhere: server-side, key from env, results cached for 24h.
 *
 * Note: Unsplash doesn't expose a video API, so we use Pexels for video and
 * keep Unsplash for photos.
 *
 * Free tier: 200 requests/hour, 20K/month. Get a key at
 * https://www.pexels.com/api/. The key is server-side only — `process.env`
 * resolved at request time, never bundled into the client.
 */

const TOKEN = process.env.PEXELS_API_KEY;
const SOURCE = "Pexels";

export const isPexelsConfigured = Boolean(TOKEN);

interface PexelsVideoFile {
  id: number;
  quality: "hd" | "sd" | "hls" | string;
  file_type: string;
  width: number;
  height: number;
  fps?: number;
  link: string;
}

interface PexelsVideoPicture {
  id: number;
  picture: string;
  nr: number;
}

interface PexelsRaw {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: { id: number; name: string; url: string };
  video_files: PexelsVideoFile[];
  video_pictures?: PexelsVideoPicture[];
}

/**
 * Pick the best mp4 file: prefer HD, ≤1080p, landscape.
 * Avoid HLS streams (browsers need MSE / hls.js to play those reliably).
 */
function pickBestMp4(files: PexelsVideoFile[]): PexelsVideoFile | null {
  const mp4s = files.filter(
    (f) => f.file_type === "video/mp4" && f.link
  );
  if (mp4s.length === 0) return null;

  const landscape = mp4s.filter((f) => f.width >= f.height);
  const candidates = landscape.length > 0 ? landscape : mp4s;

  // Prefer ≤1080p HD for hero playback (1920x1080 is plenty, 4K is wasteful).
  const sortedByQuality = [...candidates].sort((a, b) => {
    const aPenalty = a.width > 1920 ? a.width - 1920 + 1_000_000 : 1920 - a.width;
    const bPenalty = b.width > 1920 ? b.width - 1920 + 1_000_000 : 1920 - b.width;
    return aPenalty - bPenalty;
  });
  return sortedByQuality[0] ?? null;
}

function adapt(raw: PexelsRaw): Video | null {
  const file = pickBestMp4(raw.video_files);
  if (!file) return null;
  return {
    id: String(raw.id),
    url: file.link,
    posterUrl: raw.image ?? raw.video_pictures?.[0]?.picture,
    width: file.width,
    height: file.height,
    credit: {
      name: raw.user.name,
      profileUrl: raw.user.url,
    },
    sourceName: SOURCE,
    sourceUrl: raw.url,
  };
}

export async function searchPexelsVideos(
  query: string,
  count = 1
): Promise<Video[]> {
  if (!TOKEN) return [];

  const url = new URL("https://api.pexels.com/videos/search");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(Math.max(1, Math.min(15, count))));
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("size", "medium");

  try {
    const res = await fetch(url, {
      headers: { Authorization: TOKEN },
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) {
      console.warn(`Pexels ${res.status} for "${query}"`);
      return [];
    }
    const data = (await res.json()) as { videos?: PexelsRaw[] };
    return (data.videos ?? [])
      .map(adapt)
      .filter((v): v is Video => v !== null);
  } catch (err) {
    console.warn("Pexels request failed", err);
    return [];
  }
}

export async function fetchOneVideo(query: string): Promise<Video | null> {
  const [first] = await searchPexelsVideos(query, 1);
  return first ?? null;
}
