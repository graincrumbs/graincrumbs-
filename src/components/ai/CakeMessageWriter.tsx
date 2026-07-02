import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { CAKE_MESSAGE_TONES } from "@/lib/ai/knowledge";
import { providerLabel, useAiAssistant } from "./use-ai-assistant";

type Props = {
  occasion: string;
  value: string;
  onSelect: (message: string) => void;
};

export function CakeMessageWriter({ occasion, value, onSelect }: Props) {
  const [tone, setTone] = useState<string>("Warm");
  const [recipient, setRecipient] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [provider, setProvider] = useState<string | null>(null);
  const { generate, loading, error } = useAiAssistant("cake-message");

  const run = async () => {
    const result = await generate({
      message: `Occasion: ${occasion}. Recipient: ${recipient || "unspecified"}. Tone: ${tone}.`,
      context: { occasion, recipient, tone },
    });
    if (!result) return;
    setProvider(providerLabel(result.provider));
    if (result.suggestions?.length) {
      setIdeas(result.suggestions);
    } else {
      setIdeas(
        result.text
          .split("\n")
          .map((l) => l.replace(/^\d+[\).\s-]+/, "").trim())
          .filter((l) => l.length > 0 && l.length < 100)
          .slice(0, 3),
      );
    }
  };

  return (
    <div className="mt-3 rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--cream-dark)]/35 p-4">
      <div className="flex items-center gap-2">
        <Wand2 className="h-4 w-4 text-[color:var(--gold)]" />
        <p className="font-display text-base">AI Cake Message Writer</p>
        {provider && (
          <span className="ml-auto text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{provider}</span>
        )}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Get inscription ideas for your brownie cake — pick one to fill the field above.
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Recipient name (optional)
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm normal-case tracking-normal outline-none focus:border-[color:var(--gold)]"
            placeholder="e.g. Aanya"
          />
        </label>
        <label className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Tone
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm normal-case tracking-normal outline-none focus:border-[color:var(--gold)]"
          >
            {CAKE_MESSAGE_TONES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={() => void run()}
        disabled={loading}
        className="btn-outline mt-3 w-full sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Generating…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" /> Generate messages
          </>
        )}
      </button>

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

      {ideas.length > 0 && (
        <div className="mt-4 space-y-2">
          {ideas.map((idea) => {
            const active = value === idea;
            return (
              <button
                key={idea}
                type="button"
                onClick={() => onSelect(idea)}
                className={`block w-full rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                  active
                    ? "border-[color:var(--chocolate-dark)] bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]"
                    : "border-[color:var(--gold)]/30 bg-background hover:border-[color:var(--gold)]"
                }`}
              >
                {idea}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
