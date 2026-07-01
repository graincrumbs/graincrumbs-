import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { KeyRound, Loader2, LogOut, MessageCircle, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Grain Crumbs" }, { name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
});

type Order = {
  id: string;
  order_number: number;
  name: string;
  phone: string;
  email: string | null;
  product_type: string;
  flavour: string | null;
  weight: string | null;
  cake_message: string | null;
  theme: string | null;
  delivery: string;
  address: string | null;
  occasion: string | null;
  date_required: string | null;
  notes: string | null;
  image_url: string | null;
  status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
  created_at: string;
};

const ADMIN_EMAIL = "ankita.junankar@gmail.com";
const STATUSES: Order["status"][] = ["new", "contacted", "confirmed", "completed", "cancelled"];
const STATUS_STYLES: Record<Order["status"], string> = {
  new: "bg-[color:var(--gold)]/20 text-[color:var(--chocolate-dark)] border-[color:var(--gold)]",
  contacted: "bg-blue-100 text-blue-900 border-blue-300",
  confirmed: "bg-amber-100 text-amber-900 border-amber-300",
  completed: "bg-green-100 text-green-900 border-green-300",
  cancelled: "bg-red-100 text-red-900 border-red-300",
};

// ── NEW: build a wa.me URL from any phone string ──────────────────────────────
// Strips all non-digits, then ensures the number starts with the country code.
// Handles formats like: "+91 98765 43210", "098765 43210", "9876543210"
function toWhatsAppUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  // If it's already 12 digits and starts with 91, use as-is; otherwise prepend 91
  const normalised =
    digits.length === 12 && digits.startsWith("91")
      ? digits
      : `91${digits.slice(-10)}`;
  return `https://wa.me/${normalised}`;
}
// ─────────────────────────────────────────────────────────────────────────────

// Detect assorted box orders from the flavour field
function isAssortedBoxOrder(flavour: string | null): boolean {
  return !!(flavour && flavour.toLowerCase().includes("assorted box"));
}

// Display-friendly flavour label for the table
function flavourDisplay(order: Order): string {
  if (!order.flavour) return "—";
  if (isAssortedBoxOrder(order.flavour)) return "Assorted Box 🎁";
  return order.flavour;
}

// Display-friendly qty/weight label — for assorted box, weight holds "N boxes"
function qtyDisplay(order: Order): string {
  if (!order.weight) return "—";
  if (isAssortedBoxOrder(order.flavour)) return `${order.weight} (assorted)`;
  return order.weight;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" });
  return `${day}/${month}/${d.getUTCFullYear()}`;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"all" | Order["status"]>("all");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Order | null>(null);
  const [lightbox, setLightbox] = useState(false);

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
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (!cancelled) {
        if (!error && data) setOrders(data as Order[]);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      if (q) {
        const s = q.toLowerCase();
        if (
          !o.name.toLowerCase().includes(s) &&
          !o.phone.toLowerCase().includes(s) &&
          !(o.email ?? "").toLowerCase().includes(s) &&
          !o.product_type.toLowerCase().includes(s) &&
          !(o.flavour ?? "").toLowerCase().includes(s)
        ) return false;
      }
      return true;
    });
  }, [orders, filter, q]);

  const updateStatus = async (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    if (active?.id === id) setActive((prev) => prev ? { ...prev, status } : prev);
    await supabase.from("orders").update({ status }).eq("id", id);
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
            <h1 className="mt-3 font-display text-4xl md:text-5xl">Orders</h1>
            <p className="mt-2 text-sm text-muted-foreground">{filtered.length} of {orders.length} enquiries</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/analytics" className="btn-outline">Analytics</Link>
            <Link to="/admin/products" className="btn-outline">Products</Link>
            <Link to="/admin/cake-flavours" className="btn-outline">Cakes</Link>
            <Link to="/admin/pages" className="btn-outline">Pages</Link>
            <Link to="/admin/change-password" className="btn-outline">
              <KeyRound className="h-4 w-4" /> Change Password
            </Link>
            <button onClick={signOut} className="btn-outline">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search name, phone, email, product…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["all", ...STATUSES] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
                  filter === s
                    ? "border-[color:var(--chocolate-dark)] bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]"
                    : "border-border bg-background hover:border-[color:var(--gold)]"
                }`}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Desktop table */}
        <div className="mt-8 hidden md:block overflow-hidden rounded-[1.5rem] border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[color:var(--cream-dark)]/40 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Order #</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">WhatsApp</th>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Flavour / Type</th>
                  <th className="px-4 py-3 text-left">Qty</th>
                  <th className="px-4 py-3 text-left">Date Req.</th>
                  <th className="px-4 py-3 text-left">Order Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">No orders found.</td></tr>
                ) : filtered.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => { setActive(o); setLightbox(false); }}
                    className={`cursor-pointer border-t border-border hover:bg-[color:var(--cream-dark)]/30 ${
                      isAssortedBoxOrder(o.flavour) ? "bg-[color:var(--gold)]/5" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-sm font-semibold text-[color:var(--chocolate-dark)]">#{o.order_number}</td>
                    <td className="px-4 py-3 font-medium">{o.name}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={toWhatsAppUrl(o.phone)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--cream-dark)]/60 px-3 py-1 text-xs font-medium text-[color:var(--chocolate-dark)] hover:bg-[color:var(--gold)]/20 transition-colors"
                        title={`WhatsApp ${o.phone}`}
                      >
                        <MessageCircle className="h-3 w-3 text-[color:var(--gold)]" />
                        {o.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3">{o.product_type}</td>
                    <td className="px-4 py-3">
                      {isAssortedBoxOrder(o.flavour) ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--cream-dark)]/60 px-2 py-0.5 text-xs font-medium text-[color:var(--chocolate-dark)]">
                          🎁 Assorted Box
                        </span>
                      ) : (
                        flavourDisplay(o)
                      )}
                    </td>
                    <td className="px-4 py-3">{qtyDisplay(o)}</td>
                    <td className="px-4 py-3">{formatDate(o.date_required)}</td>
                    <td className="px-4 py-3">{formatDate(o.created_at)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${STATUS_STYLES[o.status]}`}>{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="mt-6 md:hidden space-y-3">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">No orders found.</p>
          ) : filtered.map((o) => (
            <div
              key={o.id}
              onClick={() => { setActive(o); setLightbox(false); }}
              className={`cursor-pointer rounded-2xl border border-border bg-card p-4 transition hover:border-[color:var(--gold)]/60 active:scale-[0.99] ${
                isAssortedBoxOrder(o.flavour) ? "border-[color:var(--gold)]/30 bg-[color:var(--gold)]/5" : ""
              }`}
            >
              {/* Top row: order number + status */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-bold text-[color:var(--chocolate-dark)]">#{o.order_number}</span>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${STATUS_STYLES[o.status]}`}>{o.status}</span>
              </div>

              {/* Customer name */}
              <p className="mt-2 font-display text-xl text-[color:var(--chocolate-dark)]">{o.name}</p>

              {/* Product + flavour */}
              <p className="mt-0.5 text-sm text-muted-foreground">
                {o.product_type}
                {o.flavour ? ` · ${isAssortedBoxOrder(o.flavour) ? "🎁 Assorted Box" : o.flavour}` : ""}
                {o.weight ? ` · ${qtyDisplay(o)}` : ""}
              </p>

              {/* Dates row */}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>Ordered {formatDate(o.created_at)}</span>
                {o.date_required && <span>Required {formatDate(o.date_required)}</span>}
              </div>

              {/* WhatsApp button — stop propagation so tapping it doesn't open modal */}
              <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                <a
                  href={toWhatsAppUrl(o.phone)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--cream-dark)]/60 px-3 py-1.5 text-xs font-medium text-[color:var(--chocolate-dark)] hover:bg-[color:var(--gold)]/20 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-[color:var(--gold)]" />
                  {o.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Detail Modal */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 p-0 md:p-4" onClick={() => setActive(null)}>
          <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full overflow-y-auto rounded-t-[1.5rem] md:rounded-[1.5rem] border border-border bg-card p-6 md:max-w-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Enquiry</p>
                <h2 className="mt-2 font-display text-3xl">{active.name}</h2>
                {/* ── CHANGED: phone in modal header is also a WhatsApp link ── */}
                <p className="text-sm text-muted-foreground">
                  <a
                    href={toWhatsAppUrl(active.phone)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[color:var(--chocolate-dark)] underline underline-offset-2 decoration-[color:var(--gold)] hover:opacity-75 transition-opacity"
                    title="Open WhatsApp chat"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-[color:var(--gold)]" />
                    {active.phone}
                  </a>
                  {active.email && <span className="ml-1">· {active.email}</span>}
                </p>
                {active.order_number && (
                  <p className="mt-1 inline-block rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--cream-dark)]/50 px-3 py-1 font-mono text-sm font-semibold text-[color:var(--chocolate-dark)]">
                    #{active.order_number}
                  </p>
                )}
              </div>
              <button onClick={() => setActive(null)} className="text-2xl leading-none text-muted-foreground hover:text-foreground">×</button>
            </div>

            {/* Assorted Box banner in modal */}
            {isAssortedBoxOrder(active.flavour) && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-[color:var(--gold)]/40 bg-[color:var(--cream-dark)]/60 px-4 py-3">
                <span className="text-xl">🎁</span>
                <div>
                  <p className="text-sm font-semibold text-[color:var(--chocolate-dark)]">Assorted Box Order</p>
                  <p className="text-xs text-muted-foreground">All 6 flavours · 6 pieces per box · {active.weight ?? "qty not specified"}</p>
                </div>
              </div>
            )}

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <Detail label="Product" value={active.product_type} />
              <Detail
                label={isAssortedBoxOrder(active.flavour) ? "Selection" : "Flavour"}
                value={isAssortedBoxOrder(active.flavour) ? "Assorted Box (all 6 flavours, 6 pieces per box)" : active.flavour}
              />
              <Detail
                label={isAssortedBoxOrder(active.flavour) ? "No. of Boxes" : "Weight / Qty"}
                value={active.weight}
              />
              <Detail label="Delivery" value={active.delivery} />
              <Detail label="Occasion" value={active.occasion} />
              <Detail label="Date required" value={formatDate(active.date_required)} />
              <Detail label="Cake message" value={active.cake_message} full />
              <Detail label="Theme" value={active.theme} full />
              <Detail label="Address" value={active.address} full />
              <Detail label="Notes" value={active.notes} full />
              <Detail label="Submitted" value={new Date(active.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} full />
            </dl>

            {/* Reference Image */}
            {active.image_url && (
              <div className="mt-6">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Reference Image</p>
                <div
                  className="cursor-zoom-in overflow-hidden rounded-xl border border-[color:var(--gold)]/30"
                  onClick={() => setLightbox(true)}
                >
                  <img
                    src={active.image_url}
                    alt="Customer reference"
                    className="max-h-56 w-full object-cover hover:opacity-90 transition-opacity"
                  />
                  <p className="px-3 py-2 text-xs text-muted-foreground">Click to view full image</p>
                </div>
                <a
                  href={active.image_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs text-[color:var(--gold)] underline underline-offset-2"
                >
                  Open in new tab ↗
                </a>
              </div>
            )}

            {/* ── NEW: quick WhatsApp button in modal footer ── */}
            <div className="mt-6 rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--cream-dark)]/40 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">Contact Customer</p>
              <a
                href={toWhatsAppUrl(active.phone)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--chocolate-dark)] hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp {active.name.split(" ")[0]}
              </a>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <p className="eyebrow mb-3">Update status</p>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(active.id, s)}
                    className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
                      active.status === s
                        ? "border-[color:var(--chocolate-dark)] bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]"
                        : "border-border bg-background hover:border-[color:var(--gold)]"
                    }`}
                  >{s}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && active?.image_url && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(false)}
        >
          <img
            src={active.image_url}
            alt="Reference full view"
            className="max-h-[90vh] max-w-full rounded-xl object-contain"
          />
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-white text-3xl leading-none hover:opacity-70"
          >×</button>
        </div>
      )}
    </section>
  );
}

function Detail({ label, value, full }: { label: string; value: string | null | undefined; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
      <dd className="mt-1">{value || "—"}</dd>
    </div>
  );
}