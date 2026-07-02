import { Copy, Loader2, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { providerLabel, useAiAssistant } from "./use-ai-assistant";

type Props = {
  compact?: boolean;
  defaultContext?: Record<string, string | undefined>;
};

export function WhatsAppAiAssistant({ compact, defaultContext }: Props) {
  const [intent, setIntent] = useState(defaultContext?.intent || "place an order enquiry");
  const [draft, setDraft] = useState("");
  const [provider, setProvider] = useState<string | null>(null);
  const { generate, loading, error } = useAiAssistant("whatsapp");

  const run = async () => {
    const result = await generate({
      message: intent,
      context: { ...defaultContext, intent },
    });
    if (!result) return;
    setProvider(providerLabel(result.provider));
    setDraft(result.text);
  };

  const copy = async () => {
    if (!draft) return;
    await navigator.clipboard.writeText(draft);
    toast.success("Copied to clipboard");
  };

  const openWhatsApp = () => {
    if (!draft) return;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(draft)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`rounded-2xl border border-[color:var(--gold)]/30 bg-[color:var(--cream-dark)]/35 ${compact ? "p-4" : "p-6 md:p-7"}`}>
      <div className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-[color:var(--gold)]" />
        <p className="font-display text-xl">WhatsApp AI Assistant</p>
        {provider && (
          <span className="ml-auto text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{provider}</span>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Describe what you need — we'll draft a polished WhatsApp message you can send instantly.
      </p>

      <label className="mt-4 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        What do you want to ask?
        <textarea
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          rows={compact ? 2 : 3}
          className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm normal-case tracking-normal outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30"
          placeholder="e.g. 2 assorted boxes for delivery to Baner on Saturday"
        />
      </label>

      <button type="button" onClick={() => void run()} disabled={loading} className="btn-outline mt-3">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Drafting…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" /> Draft WhatsApp message
          </>
        )}
      </button>

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

      {draft && (
        <div className="mt-4 rounded-xl border border-[color:var(--gold)]/25 bg-background p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Preview</p>
          <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed">{draft}</pre>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => void copy()} className="btn-outline">
              <Copy className="h-4 w-4" /> Copy
            </button>
            <button type="button" onClick={openWhatsApp} className="btn-primary">
              <MessageCircle className="h-4 w-4" /> Open WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
