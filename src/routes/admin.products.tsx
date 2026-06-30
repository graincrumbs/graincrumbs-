import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, KeyRound, Loader2, LogOut, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/products")({
  head: () => ({ meta: [{ title: "Products — Admin — Grain Crumbs" }, { name: "robots", content: "noindex" }] }),
  component: AdminProducts,
});

type Product = Tables<"products">;
type ProductForm = Omit<TablesInsert<"products">, "id" | "created_at" | "updated_at">;

const ADMIN_EMAIL = "ankita.junankar@gmail.com";

const inputCls =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30";

const emptyForm: ProductForm = {
  slug: "",
  name: "",
  tagline: "",
  description: "",
  image_url: "",
  notes: [],
  price: 0,
  premium_topping_label: "",
  premium_topping_price: 35,
  status: "coming_soon",
  sort_order: 0,
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function StatusPill({ status }: { status: Product["status"] }) {
  const live = status === "live";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
        live
          ? "bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]"
          : "border border-[color:var(--chocolate-dark)]/40 text-[color:var(--chocolate-dark)]"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[color:var(--gold)]" : "bg-[color:var(--chocolate-dark)]/40"}`} />
      {live ? "Live" : "Coming Soon"}
    </span>
  );
}

function ProductFormModal({
  product,
  onCancel,
  onSave,
  saving,
}: {
  product: Product | null;
  onCancel: () => void;
  onSave: (form: ProductForm) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<ProductForm>(
    product
      ? {
          slug: product.slug,
          name: product.name,
          tagline: product.tagline ?? "",
          description: product.description ?? "",
          image_url: product.image_url ?? "",
          notes: product.notes ?? [],
          price: product.price,
          premium_topping_label: product.premium_topping_label ?? "",
          premium_topping_price: product.premium_topping_price,
          status: product.status,
          sort_order: product.sort_order,
        }
      : emptyForm
  );
  const [notesText, setNotesText] = useState((product?.notes ?? []).join(", "));
  const [uploading, setUploading] = useState(false);

  const update = <K extends keyof ProductForm>(key: K, value: ProductForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleNameChange = (name: string) => {
    update("name", name);
    if (!product) update("slug", slugify(name));
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(fileName, file, { upsert: false });
      if (error) {
        alert("Image upload failed: " + error.message);
        return;
      }
      const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
      update("image_url", data.publicUrl);
    } finally {
      setUploading(false);
    }
  };

  const submit = () => {
    onSave({
      ...form,
      notes: notesText.split(",").map((n) => n.trim()).filter(Boolean),
      price: Number(form.price) || 0,
      premium_topping_price: Number(form.premium_topping_price) || 0,
    });
  };

  const valid = form.name.trim() && form.slug.trim() && Number(form.price) > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm md:items-center md:p-4" onClick={onCancel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-[1.5rem] border border-border bg-card p-6 md:max-w-xl md:rounded-[1.5rem] md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{product ? "Edit" : "New"}</p>
            <h2 className="mt-2 font-display text-3xl">{product ? "Edit Product" : "Add Product"}</h2>
          </div>
          <button onClick={onCancel} className="text-2xl leading-none text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <Field label="Product name">
            <input
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Biscoff Brownie"
              className={inputCls}
            />
          </Field>

          <Field label="URL slug">
            <input
              value={form.slug}
              onChange={(e) => update("slug", slugify(e.target.value))}
              placeholder="biscoff-brownie"
              className={`${inputCls} font-mono text-sm`}
            />
          </Field>

          <Field label="Tagline">
            <input
              value={form.tagline ?? ""}
              onChange={(e) => update("tagline", e.target.value)}
              placeholder="A short, evocative line"
              className={inputCls}
            />
          </Field>

          <Field label="Description">
            <textarea
              value={form.description ?? ""}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              placeholder="What makes this flavour special"
              className={`${inputCls} resize-none`}
            />
          </Field>

          <Field label="Notes (comma separated — ingredients shown as pill tags)">
            <input
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Ragi, Oats, Jaggery, Couverture Chocolate"
              className={inputCls}
            />
          </Field>

          <Field label="Product image">
            <div className="flex items-center gap-3">
              {form.image_url && (
                <img src={form.image_url} alt="" className="h-14 w-14 rounded-lg object-cover ring-1 ring-border" />
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

          <div className="grid grid-cols-2 gap-3">
            <Field label="Price (₹)">
              <input
                type="number"
                value={form.price}
                onChange={(e) => update("price", Number(e.target.value))}
                className={inputCls}
              />
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value as Product["status"])}
                className={inputCls}
              >
                <option value="coming_soon">Coming Soon</option>
                <option value="live">Live</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Premium topping label">
              <input
                value={form.premium_topping_label ?? ""}
                onChange={(e) => update("premium_topping_label", e.target.value)}
                placeholder="Premium Chocolate Toppings"
                className={inputCls}
              />
            </Field>
            <Field label="Premium topping price (₹)">
              <input
                type="number"
                value={form.premium_topping_price}
                onChange={(e) => update("premium_topping_price", Number(e.target.value))}
                className={inputCls}
              />
            </Field>
          </div>
        </div>

        <div className="mt-7 flex gap-3">
          <button onClick={onCancel} className="btn-outline flex-1 justify-center">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!valid || saving}
            className="btn-primary flex-1 justify-center disabled:opacity-40"
          >
            {saving ? "Saving…" : product ? "Save changes" : "Add product"}
          </button>
        </div>
      </div>
    </div>
  );
}

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

function ConfirmDelete({ name, onCancel, onConfirm }: { name: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-[1.5rem] border border-border bg-card p-6">
        <h3 className="font-display text-2xl">Remove this product?</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          “{name}” will disappear from the website immediately. This can't be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={onCancel} className="btn-outline flex-1 justify-center">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 justify-center rounded-full bg-red-700 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-red-800 transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminProducts() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | Product["status"]>("all");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    const { data, error } = await supabase.from("products").select("*").order("sort_order", { ascending: true });
    if (!error && data) setProducts(data);
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
      await loadProducts();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filter !== "all" && p.status !== filter) return false;
      if (q) {
        const s = q.toLowerCase();
        if (!p.name.toLowerCase().includes(s) && !p.slug.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [products, filter, q]);

  const toggleStatus = async (p: Product) => {
    const next = p.status === "live" ? "coming_soon" : "live";
    setProducts((ps) => ps.map((x) => (x.id === p.id ? { ...x, status: next } : x)));
    const { error } = await supabase.from("products").update({ status: next }).eq("id", p.id);
    if (error) {
      setError(error.message);
      await loadProducts();
    }
  };

  const saveProduct = async (form: ProductForm) => {
    setSaving(true);
    setError(null);
    try {
      if (editing) {
        const { error } = await supabase.from("products").update(form).eq("id", editing.id);
        if (error) throw error;
        setEditing(null);
      } else {
        const maxOrder = products.reduce((m, p) => Math.max(m, p.sort_order), 0);
        const { error } = await supabase.from("products").insert({ ...form, sort_order: maxOrder + 1 });
        if (error) throw error;
        setAdding(false);
      }
      await loadProducts();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    const { error } = await supabase.from("products").delete().eq("id", deleting.id);
    if (error) {
      setError(error.message);
    } else {
      setProducts((ps) => ps.filter((p) => p.id !== deleting.id));
    }
    setDeleting(null);
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

  return (
    <section className="section">
      <div className="container-prose">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="divider-gold eyebrow">Admin</p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl">Products</h1>
            <p className="mt-2 text-sm text-muted-foreground">{filtered.length} of {products.length} items</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin" className="btn-outline">Orders</Link>
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

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search product, slug..."
              className={`${inputCls} pl-11`}
            />
          </div>
          <button onClick={() => setAdding(true)} className="btn-primary whitespace-nowrap">
            <Plus className="h-4 w-4" /> Add product
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["all", "live", "coming_soon"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                filter === f
                  ? "border-[color:var(--chocolate-dark)] bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]"
                  : "border-border hover:border-[color:var(--gold)]"
              }`}
            >
              {f === "all" ? "All" : f === "live" ? "Live" : "Coming Soon"}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              No products match. Try a different search or filter.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((p) => (
                <div key={p.id} className="flex flex-wrap items-center gap-4 px-5 py-4 hover:bg-[color:var(--cream-dark)]/30 transition">
                  {p.image_url && (
                    <img src={p.image_url} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover ring-1 ring-border" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.slug} · ₹{p.price}</p>
                  </div>
                  <StatusPill status={p.status} />
                  <button
                    onClick={() => toggleStatus(p)}
                    title={p.status === "live" ? "Set to Coming Soon" : "Make live"}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-[color:var(--gold)] transition"
                  >
                    {p.status === "live" ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setEditing(p)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-[color:var(--gold)] transition"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleting(p)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-red-300 text-red-700 hover:bg-red-50 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {adding && (
        <ProductFormModal product={null} saving={saving} onCancel={() => setAdding(false)} onSave={saveProduct} />
      )}
      {editing && (
        <ProductFormModal product={editing} saving={saving} onCancel={() => setEditing(null)} onSave={saveProduct} />
      )}
      {deleting && (
        <ConfirmDelete name={deleting.name} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} />
      )}
    </section>
  );
}
