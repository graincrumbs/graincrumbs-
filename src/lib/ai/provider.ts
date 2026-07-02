import { readServerEnv } from "@/integrations/supabase/env.server";
import type { AiFeature, AiMessage, AiProvider, AiRequest, AiResponse } from "./types";
import { buildSystemPrompt, buildUserPrompt } from "./prompts";
import { parseNumberedSuggestions, runLocalEngine } from "./local-engine";

const TIMEOUT_MS = 8_000;
const CATALOG_CACHE_MS = 60_000; // avoid hitting the DB on every single chat message

let catalogCache: { text: string; fetchedAt: number } | null = null;

/**
 * Pulls the current products + cake-flavour prices/availability straight from
 * the database (the same source the admin panel and storefront use), so the
 * AI never quotes stale numbers from the static knowledge.ts text after an
 * admin changes something. Server-only: supabaseAdmin is dynamically
 * imported so the service role key never ends up in the client bundle.
 */
async function fetchLiveCatalog(): Promise<string | null> {
  if (catalogCache && Date.now() - catalogCache.fetchedAt < CATALOG_CACHE_MS) {
    return catalogCache.text;
  }

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [{ data: products, error: productsErr }, { data: cakeFlavours, error: cakeErr }] = await Promise.all([
      supabaseAdmin.from("products").select("*").order("sort_order", { ascending: true }),
      supabaseAdmin.from("cake_flavours").select("*").order("sort_order", { ascending: true }),
    ]);

    if (productsErr || cakeErr) {
      console.error("[ai/provider] live catalog fetch error", productsErr ?? cakeErr);
      return catalogCache?.text ?? null;
    }

    const lines: string[] = [];

    if (products?.length) {
      lines.push("Brownies & other single items (live status + current price):");
      for (const p of products as Record<string, unknown>[]) {
        const status = p.status === "live" ? "LIVE" : "coming soon";
        const collection = typeof p.collection === "string" ? ` [${p.collection}]` : "";
        lines.push(`- ${p.name}${collection} — ₹${p.price} — ${status}`);
      }
    }

    if (cakeFlavours?.length) {
      lines.push("\nBrownie Cake prices by flavour and weight (current, discounted price shown):");
      for (const f of cakeFlavours as Record<string, unknown>[]) {
        lines.push(
          `- ${f.name}: 250g ₹${f.price_250}, 500g ₹${f.price_500}, 650g ₹${f.price_650}, 1kg ₹${f.price_1000}`,
        );
      }
    }

    const text = lines.join("\n").trim();
    if (!text) return null;

    catalogCache = { text, fetchedAt: Date.now() };
    return text;
  } catch (err) {
    console.error("[ai/provider] live catalog fetch failed", err);
    return catalogCache?.text ?? null;
  }
}

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  return fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
}

async function callGroq(
  feature: AiFeature,
  message: string,
  context?: Record<string, string | undefined>,
  messages?: AiMessage[],
  liveCatalog?: string | null,
): Promise<string | null> {
  const apiKey = readServerEnv("GROQ_API_KEY");
  if (!apiKey) return null;

  const chatMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: buildSystemPrompt(feature, liveCatalog ?? undefined) },
  ];

  if (feature === "concierge" && messages?.length) {
    for (const m of messages.slice(-8)) {
      chatMessages.push({ role: m.role, content: m.content });
    }
  }

  chatMessages.push({
    role: "user",
    content: buildUserPrompt(feature, message, context, messages),
  });

  const res = await fetchWithTimeout("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 512,
      messages: chatMessages,
    }),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content?.trim() || null;
}

async function callGemini(
  feature: AiFeature,
  message: string,
  context?: Record<string, string | undefined>,
  messages?: AiMessage[],
  liveCatalog?: string | null,
): Promise<string | null> {
  const apiKey = readServerEnv("GEMINI_API_KEY");
  if (!apiKey) return null;

  const prompt = `${buildSystemPrompt(feature, liveCatalog ?? undefined)}\n\n${buildUserPrompt(feature, message, context, messages)}`;

  const res = await fetchWithTimeout(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.6, maxOutputTokens: 320 },
      }),
    },
  );

  if (!res.ok) return null;
  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
}

/** Free community API — no key required. Used when no Groq/Gemini key is set. */
async function callPollinations(
  feature: AiFeature,
  message: string,
  context?: Record<string, string | undefined>,
  messages?: AiMessage[],
  liveCatalog?: string | null,
): Promise<string | null> {
  const prompt = `${buildSystemPrompt(feature, liveCatalog ?? undefined)}\n\n${buildUserPrompt(feature, message, context, messages)}`;
  const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai&seed=${Date.now() % 10000}`;

  const res = await fetchWithTimeout(url, { headers: { Accept: "text/plain" } });
  if (!res.ok) return null;
  const text = (await res.text()).trim();
  if (!text || text.length < 8) return null;
  return text;
}

function wrapText(text: string, provider: AiProvider, feature: AiFeature): AiResponse {
  const suggestions =
    feature === "cake-message" ? parseNumberedSuggestions(text) : undefined;
  return { text, provider, suggestions };
}

function shouldUseLocalResponse(feature: AiFeature, message: string): boolean {
  // Every feature has a real system prompt in prompts.ts and should be answered
  // by an actual model whenever one is available. The local engine in
  // local-engine.ts is a keyword-matched script, not a real assistant, so it's
  // reserved for two cases only:
  //   1. A bare greeting on the concierge (instant, no need to spend an API call).
  //   2. The final safety-net fallback if every provider errors/times out —
  //      that fallback already happens automatically at the end of
  //      generateAiResponse, so we don't need to special-case it here.
  if (feature === "concierge") {
    const q = message.trim().toLowerCase();
    return /^(hi|hello|hey|namaste)[!.\s]*$/.test(q);
  }

  return false;
}

export async function generateAiResponse(request: AiRequest): Promise<AiResponse> {
  const message =
    request.message ||
    [...(request.messages ?? [])].reverse().find((m) => m.role === "user")?.content ||
    "";

  const localResponse = runLocalEngine(request);
  if (shouldUseLocalResponse(request.feature, message)) {
    return localResponse;
  }

  const liveCatalog = await fetchLiveCatalog();

  const providers: { name: AiProvider; fn: () => Promise<string | null> }[] = [
    { name: "gemini", fn: () => callGemini(request.feature, message, request.context, request.messages, liveCatalog) },
    { name: "groq", fn: () => callGroq(request.feature, message, request.context, request.messages, liveCatalog) },
    { name: "pollinations", fn: () => callPollinations(request.feature, message, request.context, request.messages, liveCatalog) },
  ];

  for (const { name, fn } of providers) {
    try {
      const text = await fn();
      if (text) return wrapText(text, name, request.feature);
    } catch {
      // try next provider
    }
  }

  return localResponse;
}