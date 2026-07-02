import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { bootstrapAdmin } from "@/lib/admin-bootstrap.functions";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — Grain Crumbs" }, { name: "robots", content: "noindex" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "bootstrap">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const bootstrap = useServerFn(bootstrapAdmin);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      window.location.replace(`/admin/forgot-password${hash}`);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (mode === "bootstrap") {
        await bootstrap({ data: { email, password } });
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.session) throw new Error("Unable to create a session. Please try again.");
      navigate({ to: "/admin" });
    } catch (e: any) {
      setErr(e?.message ?? "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="section">
      <div className="container-prose max-w-md">
        <div className="rounded-[2rem] border border-border bg-card p-8 md:p-10">
          <p className="divider-gold eyebrow">Admin</p>
          <h1 className="mt-4 font-display text-4xl">
            {mode === "signin" ? "Sign in" : "Create admin account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Access the Grain Crumbs orders dashboard."
              : "First-time setup. Only available until the first admin is created."}
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Email
              </span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Password
              </span>
              <input
                required
                type="password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30"
              />
            </label>

            {err && <p className="text-sm text-destructive">{err}</p>}

            <button
              type="submit"
              disabled={busy}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {busy
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Please wait</>
                : mode === "signin" ? "Sign in" : "Create & sign in"}
            </button>
          </form>

          {/* Forgot password — only shown in sign in mode */}
          {mode === "signin" && (
            <div className="mt-4 text-center">
              <Link
                to="/admin/forgot-password"
                className="text-xs uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => { setMode(mode === "signin" ? "bootstrap" : "signin"); setErr(null); }}
            className="mt-5 text-xs uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {mode === "signin" ? "" : "Back to sign in"}
          </button>
        </div>
      </div>
    </section>
  );
}
