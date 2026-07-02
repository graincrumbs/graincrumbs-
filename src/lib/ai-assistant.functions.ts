import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateAiResponse } from "@/lib/ai/provider";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(4000),
});

const schema = z.object({
  feature: z.enum(["concierge", "cake-message", "whatsapp", "gift-recommend"]),
  message: z.string().max(4000).optional(),
  messages: z.array(messageSchema).max(20).optional(),
  context: z.record(z.string().max(500).optional()).optional(),
});

/** Public AI assistant — uses the fast bakery-specific local response first and falls back to Gemini when needed. */
export const askAiAssistant = createServerFn({ method: "POST" })
  .inputValidator((input) => schema.parse(input))
  .handler(async ({ data }) => generateAiResponse(data));
