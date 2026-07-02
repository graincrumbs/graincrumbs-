import { Gift, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { providerLabel, useAiAssistant } from "./use-ai-assistant";

const occasions = ["Birthday", "Anniversary", "Thank You", "Festival", "Corporate", "Baby Announcement", "Other"];
const budgets = ["₹250–₹500", "₹500–₹1000", "₹1000+"];
const quantities = ["1 box", "2–5 boxes", "6–10 boxes", "10+ boxes"];

type Props = {
  compact?: boolean;
  onApply?: (ctx: { occasion: string; budget: string; quantity: string }) => void;
};

export function GiftRecommender({ compact, onApply }: Props) {
  const [occasion, setOccasion] = useState("Birthday");
  const [budget, setBudget] = useState("₹500–₹1000");
  const [quantity, setQuantity] = useState("1 box");
  const [recipient, setRecipient] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const { generate, loading, error } = useAiAssistant("gift-recommend");

  const run = async () => {
    const context = { occasion, budget, quantity, recipient };
    const response = await generate({
      message: recipient ? `Gift for ${recipient}` : `Gift for ${occasion}`,
      context,
    });
    if (!response) return;
    setProvider(providerLabel(response.provider));
    setResult(response.text);
    onApply?.({ occasion, budget, quantity });
  };

  return (
    <div className={`rounded-2xl border border-[color:var(--gold)]/30 bg-card ${compact ? "p-4" : "p-6 md:p-8"}`}>
      <div className="flex items-center gap-2">
        <Gift className="h-4 w-4 text-[color:var(--gold)]" />
        <p className="font-display text-xl md:text-2xl">AI Gift Recommender</p>
        {provider && (
          <span className="ml-auto text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{provider}</span>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Tell us the occasion and we'll suggest curated Grain Crumbs gift packages.
      </p>

      <div className={`mt-5 grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field label="Occasion">
          <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className={selectCls}>
            {occasions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget per box">
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className={selectCls}>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field label="Quantity">
          <select value={quantity} onChange={(e) => setQuantity(e.target.value)} className={selectCls}>
            {quantities.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
        </Field>
        <Field label="Recipient (optional)">
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className={selectCls}
            placeholder="e.g. best friend, client team"
          />
        </Field>
      </div>

      <button type="button" onClick={() => void run()} disabled={loading} className="btn-primary mt-4">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Finding gifts…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" /> Get recommendations
          </>
        )}
      </button>

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

      {result && (
        <div className="mt-5 rounded-xl border border-[color:var(--gold)]/25 bg-[color:var(--cream-dark)]/40 p-4 text-sm leading-relaxed whitespace-pre-wrap">
          {result.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={i}>{part.slice(2, -2)}</strong>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
          {!compact && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/order" className="btn-gold">
                Start gift enquiry
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const selectCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30";
