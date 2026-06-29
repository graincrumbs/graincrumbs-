import { useState } from "react";
import { z } from "zod";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  mobile: z
    .string()
    .trim()
    .min(7, "Enter a valid mobile number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Only digits and + - ( ) allowed"),
  email: z.string().trim().email("Enter a valid email").max(160),
});

type Status = "idle" | "submitting" | "success" | "error";

export function NotifyMeForm({ productName }: { productName: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      mobile: fd.get("mobile"),
      email: fd.get("email"),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    const { name, mobile, email } = parsed.data;
    const message = `Hi Grain Crumbs! Please notify me when ${productName} is available.\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setError(null);
    setStatus("success");
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} className="card-warm grid gap-4 p-6 sm:p-8">
      <div>
        <p className="eyebrow">Notify Me</p>
        <h3 className="mt-2 font-display text-2xl">Be first to taste {productName}.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Share your details — we'll WhatsApp you the moment it launches.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1.5 block font-medium">Name</span>
          <input
            name="name"
            required
            maxLength={80}
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none ring-[color:var(--gold)]/40 focus:ring-2"
            placeholder="Your full name"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1.5 block font-medium">Mobile</span>
          <input
            name="mobile"
            required
            inputMode="tel"
            maxLength={20}
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none ring-[color:var(--gold)]/40 focus:ring-2"
            placeholder="+91 98000 00000"
          />
        </label>
        <label className="text-sm sm:col-span-2">
          <span className="mb-1.5 block font-medium">Email</span>
          <input
            name="email"
            required
            type="email"
            maxLength={160}
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none ring-[color:var(--gold)]/40 focus:ring-2"
            placeholder="you@example.com"
          />
        </label>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {status === "success" && (
        <p className="text-sm text-[color:var(--chocolate)]">
          Thank you! We've opened WhatsApp so you can send your request — we'll be in touch.
        </p>
      )}
      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Notify Me"}
      </button>
    </form>
  );
}
