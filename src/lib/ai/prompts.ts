import type { AiFeature, AiMessage } from "./types";
import { BAKERY_CONTEXT } from "./knowledge";

function formatContext(context?: Record<string, string | undefined>): string {
  if (!context) return "";
  const lines = Object.entries(context)
    .filter(([, v]) => v?.trim())
    .map(([k, v]) => `${k}: ${v}`);
  return lines.length ? `\nUser context:\n${lines.join("\n")}` : "";
}

function formatHistory(messages?: AiMessage[]): string {
  if (!messages?.length) return "";
  return `\nConversation:\n${messages.map((m) => `${m.role}: ${m.content}`).join("\n")}`;
}

export function buildSystemPrompt(feature: AiFeature, liveCatalog?: string): string {
  const base = `You are the Grain Crumbs AI Concierge, a warm and knowledgeable assistant for a premium millet brownie brand in Pune. Use only the knowledge base below. If a question isn't covered — especially delivery times, pricing for bulk/custom orders, allergies, or refunds — say so honestly and direct the customer to WhatsApp (+91 82082 57574) rather than guessing. Keep answers short and warm, never robotic. When a customer wants to order, collect: name, product, flavour, weight/qty, delivery or pickup, address, occasion, date required, and any cake message/theme — then hand off to WhatsApp with that info pre-filled.

${BAKERY_CONTEXT}${
    liveCatalog
      ? `\n\nLIVE CATALOG (fetched just now from the store database — this is the current source of truth for prices and what's actually live vs. coming soon; if it conflicts with anything above, trust this instead):\n${liveCatalog}`
      : ""
  }`;

  switch (feature) {
    case "concierge":
      return `${base}\n\nRole: AI Concierge. Help visitors choose products, explain ordering, delivery, gifting, and customisation. Suggest relevant next steps (order form, WhatsApp, gifting page). Be friendly and precise.`;
    case "cake-message":
      return `${base}\n\nRole: Cake Message Writer. Generate 3 short cake inscription options (each under 60 characters). Match the occasion and tone. Output format:\n1. message one\n2. message two\n3. message three\nNo extra commentary.`;
    case "whatsapp":
      return `${base}\n\nRole: WhatsApp Assistant. Draft one polished WhatsApp enquiry message the customer can send to Grain Crumbs. Include placeholders only where info is missing. Keep it friendly, structured, and under 180 words. Output only the message text.`;
    case "gift-recommend":
      return `${base}\n\nRole: Gift Recommender. Suggest 1 primary gift package and 2 alternatives with brief reasons. Include suggested flavours, box type, approximate budget fit, and presentation tip. Use bullet points.`;
  }
}

export function buildUserPrompt(
  feature: AiFeature,
  message: string,
  context?: Record<string, string | undefined>,
  messages?: AiMessage[],
): string {
  const ctx = formatContext(context);
  const history = feature === "concierge" ? formatHistory(messages) : "";

  switch (feature) {
    case "concierge":
      return `${history}${ctx}\n\nCustomer question: ${message}`;
    case "cake-message":
      return `${ctx}\n\nWrite cake messages for: ${message || "a celebration"}`;
    case "whatsapp":
      return `${ctx}\n\nDraft a WhatsApp message for: ${message || "placing an order enquiry"}`;
    case "gift-recommend":
      return `${ctx}\n\nRecommend gifts for: ${message || "a special occasion"}`;
  }
}