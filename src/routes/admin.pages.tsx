import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound, Loader2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/pages")({
  head: () => ({ meta: [{ title: "Pages — Admin — Grain Crumbs" }, { name: "robots", content: "noindex" }] }),
  component: AdminPages,
});

type SitePage = Tables<"site_pages">;
const ADMIN_EMAIL = "ankita.junankar@gmail.com";

const inputCls =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30";

const PAGES = [
  { slug: "cookie-tins", label: "Cookie Tins", url: "/cookie-tins" },
  { slug: "grain-crumbs-lite", label: "Grain Crumbs Lite", url: "/grain-crumbs-lite" },
  { slug: "grain-crumbs-pro", label: "Grain Crumbs Pro", url: "/grain-crumbs-pro" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function AdminPages() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<SitePage[]>([]);
  const [activeSlug, setActiveSlug] = useState(PAGES[0].slug);
  const [form, setForm] = useState<Partial<SitePage>>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.from("site_pages").select("*");
    if (!error && data) setPages(data);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      const isKnownAdmin = sess.session.user.email?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!roleRow && !isKnownAdmin) {
        await supabase.auth.signOut();
        navigate({ to: "/admin/login" });
        return;
      }
      await load();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    const p = pages.find((x) => x.slug === activeSlug);
    if (p) setForm(p);
  }, [activeSlug, pages]);

  const update = <K extends keyof SitePage>(key: K, value: SitePage[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("page-images").upload(fileName, file, { upsert: false });
      if (error) {
        alert("Image upload failed: " + error.message);
        return;
      }
      const { data } = supabase.storage.from("page-images").getPublicUrl(fileName);
      update("hero_image_url", data.publicUrl);
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    setSavedMsg(false);
    const p = pages.find((x) => x.slug === activeSlug);
    if (!p) {
      setSaving(false);
      return;
    }
    const { error } = await supabase
      .from("site_pages")
      .update({
        status: form.status,
        eyebrow: form.eyebrow,
        title_line1: form.title_line1,
        title_line2: form.title_line2,
        description: form.description,
        hero_image_url: form.hero_image_url,
        cta_label: form.cta_label,
      })
      .eq("id", p.id);
    if (error) {
      setError(error.message);
    } else {
      await load();
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2500);
    }
    setSaving(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const activePageDef = PAGES.find((p) => p.slug === activeSlug)!;

  return (
    <section className="section">
      <div className="container-prose max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="divider-gold eyebrow">Admin</p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl">Pages</h1>
            <p className="mt-2 text-sm text-muted-foreground">Edit hero copy and live status for Cookie Tins, Lite &amp; Pro</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin" className="btn-outline">Orders</Link>
            <Link to="/admin/analytics" className="btn-outline">Analytics</Link>
            <Link to="/admin/products" className="btn-outline">Brownies</Link>
            <Link to="/admin/cake-flavours" className="btn-outline">Cakes</Link>
            <Link to="/admin/change-password" className="btn-outline">
              <KeyRound className="h-4 w-4" /> Change Password
            </Link>
            <button onClick={signOut} className="btn-outline">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
        )}
        {savedMsg && (
          <div className="mt-4 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">Saved.</div>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {PAGES.map((p) => (
            <button
              key={p.slug}
              onClick={() => setActiveSlug(p.slug)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                activeSlug === p.slug
                  ? "border-[color:var(--chocolate-dark)] bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]"
                  : "border-border hover:border-[color:var(--gold)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Live page: <a href={activePageDef.url} target="_blank" rel="noreferrer" className="underline text-[color:var(--gold)]">{activePageDef.url} ↗</a>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Status</span>
              <button
                onClick={() => update("status", form.status === "live" ? "coming_soon" : "live")}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                  form.status === "live"
                    ? "border-[color:var(--chocolate-dark)] bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]"
                    : "border-border"
                }`}
              >
                {form.status === "live" ? "Live" : "Coming Soon"}
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <Field label="Eyebrow (small label above headline)">
              <input value={form.eyebrow ?? ""} onChange={(e) => update("eyebrow", e.target.value)} className={inputCls} />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Headline — line 1">
                <input value={form.title_line1 ?? ""} onChange={(e) => update("title_line1", e.target.value)} className={inputCls} />
              </Field>
              <Field label="Headline — line 2 (italic)">
                <input value={form.title_line2 ?? ""} onChange={(e) => update("title_line2", e.target.value)} className={inputCls} />
              </Field>
            </div>

            <Field label="Description">
              <textarea value={form.description ?? ""} onChange={(e) => update("description", e.target.value)} rows={3} className={`${inputCls} resize-none`} />
            </Field>

            <Field label="Button text">
              <input value={form.cta_label ?? ""} onChange={(e) => update("cta_label", e.target.value)} className={inputCls} />
            </Field>

            <Field label="Hero image">
              <div className="flex items-center gap-3">
                {form.hero_image_url && (
                  <img src={form.hero_image_url} alt="" className="h-16 w-16 rounded-lg object-cover ring-1 ring-border" />
                )}
                <label className="btn-outline cursor-pointer text-xs">
                  {uploading ? "Uploading…" : "Upload image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  />
                </label>
              </div>
            </Field>
          </div>

          <div className="mt-7">
            <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-40">
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
