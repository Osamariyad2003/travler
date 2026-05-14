/**
 * Open-Meteo — free, no-key weather forecasts.
 * https://open-meteo.com/
 *
 * Forecasts up to 16 days ahead. Past dates and dates beyond the forecast
 * window simply come back as null — caller renders an em dash.
 */

export interface DayWeather {
  /** ISO date YYYY-MM-DD. */
  date: string;
  /** Localised label like "Sunny" or "Patchy rain". */
  label: string;
  /** Single emoji visual. */
  emoji: string;
  /** Daily max temp in Celsius, null if forecast unavailable. */
  temperatureMaxC: number | null;
  /** WMO weather code, null if unavailable. */
  weatherCode: number | null;
}

interface OpenMeteoDaily {
  time: string[];
  weathercode?: number[];
  temperature_2m_max?: number[];
}

interface OpenMeteoResponse {
  daily?: OpenMeteoDaily;
}

/**
 * WMO weather code → friendly label + emoji. Source codes documented at
 * https://open-meteo.com/en/docs (the "Weather variable documentation").
 */
function describe(code: number | null): { label: string; emoji: string } {
  if (code === null) return { label: "—", emoji: "·" };
  if (code === 0) return { label: "Sunny", emoji: "☀️" };
  if (code === 1) return { label: "Mainly clear", emoji: "🌤️" };
  if (code === 2) return { label: "Partly cloudy", emoji: "⛅" };
  if (code === 3) return { label: "Overcast", emoji: "☁️" };
  if (code === 45 || code === 48) return { label: "Fog", emoji: "🌫️" };
  if (code >= 51 && code <= 57) return { label: "Drizzle", emoji: "🌦️" };
  if (code === 61) return { label: "Patchy rain", emoji: "🌦️" };
  if (code === 63) return { label: "Rain", emoji: "🌧️" };
  if (code === 65) return { label: "Heavy rain", emoji: "🌧️" };
  if (code >= 71 && code <= 77) return { label: "Snow", emoji: "🌨️" };
  if (code >= 80 && code <= 82) return { label: "Rain showers", emoji: "🌧️" };
  if (code >= 85 && code <= 86) return { label: "Snow showers", emoji: "🌨️" };
  if (code === 95) return { label: "Thunderstorm", emoji: "⛈️" };
  if (code === 96 || code === 99) return { label: "Hailstorm", emoji: "⛈️" };
  return { label: "—", emoji: "·" };
}

function formatYmd(d: Date): string {
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Fetch forecast for `days` consecutive days starting at `startDate` for the
 * given lat/lng. Returns one entry per day, in order. Always returns exactly
 * `days` entries — slots outside the forecast window come back with null
 * temperature/code so the UI can render placeholders.
 */
export async function fetchDailyWeather(
  latitude: number,
  longitude: number,
  startDate: Date,
  days: number
): Promise<DayWeather[]> {
  if (days < 1) return [];

  // Build the day series first so we can fill placeholders if the API fails.
  const series: DayWeather[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(
      Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate() + i
      )
    );
    const date = formatYmd(d);
    series.push({
      date,
      label: "—",
      emoji: "·",
      temperatureMaxC: null,
      weatherCode: null,
    });
  }
  const startYmd = series[0].date;
  const endYmd = series[series.length - 1].date;

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", latitude.toFixed(4));
  url.searchParams.set("longitude", longitude.toFixed(4));
  url.searchParams.set("daily", "weathercode,temperature_2m_max");
  url.searchParams.set("start_date", startYmd);
  url.searchParams.set("end_date", endYmd);
  url.searchParams.set("timezone", "auto");

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 * 60 * 6 }, // 6h — forecast updates regularly
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) {
      console.warn(`Open-Meteo ${res.status} for ${latitude},${longitude}`);
      return series;
    }
    const data = (await res.json()) as OpenMeteoResponse;
    const daily = data.daily;
    if (!daily?.time) return series;

    for (let i = 0; i < daily.time.length; i++) {
      const date = daily.time[i];
      const idx = series.findIndex((s) => s.date === date);
      if (idx === -1) continue;
      const weatherCode = daily.weathercode?.[i] ?? null;
      const temperatureMaxC = daily.temperature_2m_max?.[i] ?? null;
      const { label, emoji } = describe(weatherCode);
      series[idx] = {
        date,
        weatherCode,
        temperatureMaxC,
        label,
        emoji,
      };
    }
    return series;
  } catch (err) {
    console.warn("Open-Meteo request failed", err);
    return series;
  }
}
