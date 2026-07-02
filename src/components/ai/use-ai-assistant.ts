import { useServerFn } from "@tanstack/react-start";
import { useCallback, useState } from "react";
import { askAiAssistant } from "@/lib/ai-assistant.functions";
import type { AiFeature, AiMessage, AiResponse } from "@/lib/ai/types";

export function useAiAssistant(feature: AiFeature) {
  const ask = useServerFn(askAiAssistant);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (opts: {
      message?: string;
      messages?: AiMessage[];
      context?: Record<string, string | undefined>;
    }): Promise<AiResponse | null> => {
      setLoading(true);
      setError(null);
      try {
        const result = await ask({
          data: {
            feature,
            message: opts.message,
            messages: opts.messages,
            context: opts.context,
          },
        });
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [ask, feature],
  );

  return { generate, loading, error };
}

export function providerLabel(provider: AiResponse["provider"]): string {
  switch (provider) {
    case "groq":
      return "Groq AI";
    case "gemini":
      return "Gemini AI";
    case "pollinations":
      return "Free AI";
    case "local":
      return "Smart assistant";
  }
}
