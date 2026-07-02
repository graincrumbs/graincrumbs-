import { Bot, Loader2, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CONCIERGE_STARTERS } from "@/lib/ai/knowledge";
import type { AiMessage } from "@/lib/ai/types";
import { providerLabel, useAiAssistant } from "./use-ai-assistant";

export function AiConciergeWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your Grain Crumbs concierge. Ask about flavours, brownie cakes, gifting, delivery, or how to order.",
    },
  ]);
  const [provider, setProvider] = useState<string>("Smart assistant");
  const [hideOnFooter, setHideOnFooter] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { generate, loading } = useAiAssistant("concierge");

  // Lock the page behind the widget from scrolling while it's open. Without
  // this, on mobile a touch-scroll or the keyboard opening on input focus
  // can bleed through the fixed overlay and scroll the site underneath.
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPosition = body.style.position;
    const previousWidth = body.style.width;
    const scrollY = window.scrollY;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = previousOverflow;
      body.style.position = previousPosition;
      body.style.width = previousWidth;
      body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideOnFooter(entry.isIntersecting);
      },
      { rootMargin: "0px", threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: AiMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");

    const result = await generate({ message: trimmed, messages: nextMessages });
    if (result) {
      setProvider(providerLabel(result.provider));
      setMessages((prev) => [...prev, { role: "assistant", content: result.text }]);
    }
  };

  const starters = !loading && messages.length > 0 && messages[messages.length - 1].role === "assistant"
    ? CONCIERGE_STARTERS
    : [];

  return (
    <>
      {!open && !hideOnFooter && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[color:var(--chocolate-dark)] px-4 py-3 text-sm font-medium text-[color:var(--cream)] shadow-[0_12px_40px_-12px_rgba(45,27,18,0.45)] transition hover:bg-[color:var(--chocolate)] md:bottom-6 md:right-6"
          aria-label="Open AI Concierge"
        >
          <Sparkles className="h-4 w-4 text-[color:var(--gold)]" />
          AI Concierge
        </button>
      )}

      {open && (
        <div className="fixed bottom-4 right-4 z-50 flex h-[min(560px,calc(100dvh-2rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-card shadow-[0_24px_60px_-20px_rgba(45,27,18,0.35)]">
          <div className="flex items-center justify-between border-b border-border/60 bg-[color:var(--cream-dark)]/50 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="font-display text-lg leading-none">AI Concierge</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{provider}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted"
              aria-label="Close concierge"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]"
                      : "bg-[color:var(--cream-dark)]/70 text-foreground ring-1 ring-[color:var(--gold)]/20"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
              </div>
            )}
          </div>

          {starters.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-border/60 px-4 py-3">
              {starters.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-[color:var(--gold)]/40 bg-background px-3 py-1.5 text-xs hover:bg-[color:var(--cream-dark)]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className="border-t border-border/60 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                placeholder="Ask about flavours, cakes, gifting…"
                className="min-h-[44px] flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--chocolate-dark)] text-[color:var(--cream)] disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              Need to order? <Link to="/order" className="underline underline-offset-2">Go to order form</Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
}