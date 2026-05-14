import Anthropic from "@anthropic-ai/sdk";

import type { TravelStyle } from "./types";
import { safeJsonParse } from "./utils";

const CLAUDE_MODEL = process.env.CLAUDE_MODEL ?? "claude-opus-4-7";

export const isAiConfigured = Boolean(process.env.ANTHROPIC_API_KEY);

export interface CityEnrichment {
  description: string;
  currency: string;
  places: Array<{
    name: string;
    description: string;
    localTip: string;
    estimatedCost: string;
    openingHours?: string;
  }>;
  routeDescription: string;
  routeName: string;
  routeStopOrder: string[];
  routeEstimatedTime: string;
  routeEstimatedDistance: string;
  routeDifficulty: "easy" | "moderate" | "hard";
  tripTemplate: {
    title: string;
    days: number;
    estimatedBudget: string;
    itinerary: Array<{
      day: number;
      title: string;
      activities: string[];
    }>;
    tips: string[];
  };
}

interface GenerateOptions {
  cityName: string;
  country?: string;
  poiNames: string[];
  tripDays?: number;
  travelStyle?: TravelStyle;
}

const SYSTEM_PROMPT = `You are a travel writer for a budget travel app.
You will be given a list of real places in a city. Use the web_search tool to
verify current prices, opening hours, and active scams. Then return a SINGLE
JSON object — no prose, no markdown fences, no commentary. Output ONLY the JSON.

Tips must be concrete: specific prices, dish names, times, or local tricks.
Costs must be honest ranges in the local currency. Keep place names exactly
as provided.`;

function buildPrompt(options: GenerateOptions): string {
  const { cityName, country, poiNames, travelStyle = "budget" } = options;
  const days = Math.max(1, Math.min(7, Number(options.tripDays) || 2));
  const where = country ? `${cityName}, ${country}` : cityName;
  return `Generate budget-traveller content for ${where}. The places below
were extracted from OpenStreetMap — keep their names exactly:

${poiNames.map((n, i) => `${i + 1}. ${n}`).join("\n")}

Return JSON in this exact shape:

{
  "description": "2-sentence city description for budget travellers.",
  "currency": "ISO currency code, e.g. JPY, EUR, USD.",
  "places": [
    {
      "name": "exact place name from the list",
      "description": "1-sentence description.",
      "localTip": "1 concrete budget tip — price, time, or dish.",
      "estimatedCost": "Free / number + currency / range",
      "openingHours": "optional, e.g. 09:00 – 18:00"
    }
  ],
  "routeName": "Name of a walking route through 4-6 of the places.",
  "routeDescription": "1-sentence route description.",
  "routeStopOrder": ["exact place name", "..."],
  "routeEstimatedTime": "e.g. 2 - 3 hours",
  "routeEstimatedDistance": "e.g. 3.4 km",
  "routeDifficulty": "easy | moderate | hard",
  "tripTemplate": {
    "title": "${days}-day ${travelStyle} ${cityName}",
    "days": ${days},
    "estimatedBudget": "range with currency",
    "itinerary": [
      { "day": 1, "title": "Theme", "activities": ["...", "..."] }
    ],
    "tips": ["...", "..."]
  }
}

Rules:
- "tripTemplate.days" must be ${days}, and the itinerary must contain exactly ${days} day objects.
- The tripTemplate should fit this travel style: ${travelStyle}.
- "places" must have one entry per name in the list, in the same order.
- "routeStopOrder" must reference 4-6 names from the list, in walking order.
- Output ONLY the JSON object — no markdown fences, no prose.`;
}

let cachedClient: Anthropic | null = null;
function getClient(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  if (cachedClient) return cachedClient;
  cachedClient = new Anthropic({ apiKey });
  return cachedClient;
}

function extractText(content: Anthropic.ContentBlock[]): string {
  return content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
}

export async function enrichCityWithAi(
  options: GenerateOptions
): Promise<CityEnrichment | null> {
  const client = getClient();
  if (!client) return null;

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: buildPrompt(options) },
  ];

  try {
    let response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 16384,
      system: SYSTEM_PROMPT,
      thinking: { type: "adaptive" },
      output_config: { effort: "medium" },
      tools: [{ type: "web_search_20260209", name: "web_search" }],
      messages,
    });

    // The server-side web_search loop may pause if it hits its iteration cap.
    // Re-send to resume — see Anthropic docs on `pause_turn`.
    let pauseGuard = 0;
    while (response.stop_reason === "pause_turn" && pauseGuard < 3) {
      messages.push({ role: "assistant", content: response.content });
      response = await client.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 16384,
        system: SYSTEM_PROMPT,
        thinking: { type: "adaptive" },
        output_config: { effort: "medium" },
        tools: [{ type: "web_search_20260209", name: "web_search" }],
        messages,
      });
      pauseGuard += 1;
    }

    if (response.stop_reason === "refusal") {
      console.warn("Claude refused the city enrichment request");
      return null;
    }

    const text = extractText(response.content);
    if (!text) return null;

    const parsed = safeJsonParse<CityEnrichment>(text);
    if (!parsed) {
      console.warn("Claude returned non-JSON output for city enrichment");
      return null;
    }
    return parsed;
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      console.warn("Claude rate-limited city enrichment", err.message);
    } else if (err instanceof Anthropic.APIError) {
      console.warn(
        `Claude API error ${err.status} on city enrichment:`,
        err.message
      );
    } else {
      console.warn("Claude enrichment failed", err);
    }
    return null;
  }
}
