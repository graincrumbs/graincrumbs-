export type AiFeature = "concierge" | "cake-message" | "whatsapp" | "gift-recommend";

export type AiProvider = "groq" | "gemini" | "pollinations" | "local";

export type AiMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AiRequest = {
  feature: AiFeature;
  message?: string;
  messages?: AiMessage[];
  context?: Record<string, string | undefined>;
};

export type AiResponse = {
  text: string;
  suggestions?: string[];
  provider: AiProvider;
};
