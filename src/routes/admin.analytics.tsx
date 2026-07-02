import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound, Loader2, LogOut, TrendingUp, ShoppingBag, Clock, CheckCircle2, ChefHat, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Admin — Grain Crumbs" }, { name: "robots", content: "noindex" }] }),
  component: AdminAnalytics,
});

const ADMIN_EMAIL = "ankita.junankar@gmail.com";

type Order = {
  id: string;
  order_number: number;
  product_type: string;
  flavour: string | null;
  weight: string | null;
  status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
  created_at: string;
  occasion: string | null;
  delivery: string;
};

type Period = "7d" | "30d" | "90d" | "all";

const PERIOD_LABELS: Record<Period, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  "all": "All time",
};

const STATUS_COLORS: Record<Order["status"], string> = {
  new: "bg-[color:var(--gold)]/20 text-[color:var(--chocolate-dark)] border-[color:var(--gold)]",
  contacted: "bg-blue-100 text-blue-800 border-blue-300",
  confirmed: "bg-amber-100 text-amber-800 border-amber-300",
  completed: "bg-green-100 text-green-800 border-green-300",
  cancelled: "bg-red-100 text-red-800 border-red-300",
};

function filterByPeriod(orders: Order[], period: Period): Order[] {
  if (period === "all") return orders;
  const now = new Date();
  const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return orders.filter((o) => new Date(o.created_at) >= cutoff);
}

function topN<T extends string>(
  items: (T | null)[],
  n = 5
): { label: string; count: number; pct: number }[] {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const key = item?.trim() || "Unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  const total = items.length;
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([label, count]) => ({ label, count, pct: Math.round((count / total) * 100) }));
}

function Stat({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-4xl text-[color:var(--chocolate-dark)]">{value}</p>
          {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--cream-dark)]/60">
          <Icon className="h-4 w-4 text-[color:var(--chocolate)]" />
        </div>
      </div>
    </div>
  );
}

function Bar({ label, count, pct, max }: { label: string; count: number; pct: number; max: number }) {
  const width = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="group flex items-center gap-3">
      <div className="w-36 shrink-0 truncate text-right text-sm text-[color:var(--chocolate-dark)]">{label}</div>
      <div className="flex-1 overflow-hidden rounded-full bg-[color:var(--cream-dark)] h-2.5">
        <div
          className="h-full rounded-full bg-[color:var(--chocolate-dark)] transition-all duration-500"
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="w-16 shrink-0 text-xs text-muted-foreground">
        {count} <span className="text-[10px]">({pct}%)</span>
      </div>
    </div>
  );
}

function StatusDonut({ orders }: { orders: Order[] }) {
  const STATUSES: Order["status"][] = ["new", "contacted", "confirmed", "completed", "cancelled"];
  const counts = STATUSES.map((s) => ({ s, n: orders.filter((o) => o.status === s).length }));
  const total = orders.length || 1;

  return (
    <div className="space-y-2">
      {counts.map(({ s, n }) => (
        <div key={s} className="flex items-center gap-3">
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${STATUS_COLORS[s]}`}>{s}</span>
          <div className="flex-1 overflow-hidden rounded-full bg-[color:var(--cream-dark)] h-2">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.round((n / total) * 100)}%`,
                backgroundColor: s === "completed" ? "#4ade80" : s === "confirmed" ? "#fbbf24" : s === "cancelled" ? "#f87171" : s === "contacted" ? "#60a5fa" : "var(--gold)",
              }}
            />
          </div>
          <span className="w-8 shrink-0 text-right text-sm font-semibold text-[color:var(--chocolate-dark)]">{n}</span>
        </div>
      ))}
    </div>
  );
}

function WeeklyChart({ orders }: { orders: Order[] }) {
  // Last 8 weeks, grouped by week starting Monday
  const weeks: { label: string; count: number }[] = [];
  const now = new Date();
  for (let w = 7; w >= 0; w--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1 - w * 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    const count = orders.filter((o) => {
      const d = new Date(o.created_at);
      return d >= weekStart && d < weekEnd;
    }).length;
    const label = weekStart.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    weeks.push({ label, count });
  }
  const max = Math.max(...weeks.map((w) => w.count), 1);
  return (
    <div className="flex h-32 items-end gap-1.5">
      {weeks.map((w, i) => (
        <div key={i} className="group flex flex-1 flex-col items-center gap-1">
          <div className="relative w-full flex-1 flex items-end">
            <div
              title={`${w.count} orders`}
              className="w-full rounded-t-md bg-[color:var(--chocolate-dark)] transition-all duration-500 hover:bg-[color:var(--gold)]"
              style={{ height: `${Math.round((w.count / max) * 100)}%`, minHeight: w.count > 0 ? "4px" : "0" }}
            />
          </div>
          <p className="text-center text-[9px] text-muted-foreground leading-tight">{w.label}</p>
        </div>
      ))}
    </div>
  );
}

function AdminAnalytics() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [period, setPeriod] = useState<Period>("30d");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) { navigate({ to: "/admin/login" }); return; }
      const isKnownAdmin = sess.session.user.email?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
      const { data: roleRow } = await supabase.from("user_roles").select("role").eq("user_id", sess.session.user.id).eq("role", "admin").maybeSingle();
      if (!roleRow && !isKnownAdmin) { await supabase.auth.signOut(); navigate({ to: "/admin/login" }); return; }
      const { data } = await supabase.from("orders").select("id,order_number,product_type,flavour,weight,status,created_at,occasion,delivery").order("created_at", { ascending: false });
      if (!cancelled && data) setOrders(data as Order[]);
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  const signOut = async () => { await supabase.auth.signOut(); navigate({ to: "/admin/login" }); };

  const filtered = filterByPeriod(orders, period);
  const prev = period === "all" ? [] : filterByPeriod(orders, period === "7d" ? "7d" : period === "30d" ? "30d" : "90d").filter((o) => {
    const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const prevCutoff = new Date(cutoff.getTime() - days * 24 * 60 * 60 * 1000);
    const d = new Date(o.created_at);
    return d >= prevCutoff && d < cutoff;
  });

  const completed = filtered.filter((o) => o.status === "completed").length;
  const cancelled = filtered.filter((o) => o.status === "cancelled").length;
  const pending = filtered.filter((o) => ["new", "contacted", "confirmed"].includes(o.status)).length;
  const conversionRate = filtered.length ? Math.round((completed / filtered.length) * 100) : 0;

  const topFlavours = topN(filtered.map((o) => o.flavour));
  const topProducts = topN(filtered.map((o) => o.product_type));
  const topOccasions = topN(filtered.filter((o) => o.occasion).map((o) => o.occasion));
  const topWeights = topN(filtered.filter((o) => o.weight).map((o) => o.weight));

  const maxFlavour = topFlavours[0]?.count || 1;
  const maxProduct = topProducts[0]?.count || 1;
  const maxOccasion = topOccasions[0]?.count || 1;

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
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="divider-gold eyebrow">Admin</p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl">Analytics</h1>
            <p className="mt-2 text-sm text-muted-foreground">{orders.length} total enquiries</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin" className="btn-outline">Orders</Link>
            <Link to="/admin/products" className="btn-outline">Brownies</Link>
            <Link to="/admin/cake-flavours" className="btn-outline">Cakes</Link>
            <Link to="/admin/pages" className="btn-outline">Pages</Link>
            <Link to="/admin/change-password" className="btn-outline"><KeyRound className="h-4 w-4" /> Password</Link>
            <button onClick={signOut} className="btn-outline"><LogOut className="h-4 w-4" /> Sign out</button>
          </div>
        </div>

        {/* Period filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                period === p
                  ? "border-[color:var(--chocolate-dark)] bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]"
                  : "border-border hover:border-[color:var(--gold)]"
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={ShoppingBag} label="Total enquiries" value={filtered.length}
            sub={prev.length ? `${filtered.length > prev.length ? "+" : ""}${filtered.length - prev.length} vs prev. period` : undefined} />
          <Stat icon={CheckCircle2} label="Completed" value={completed}
            sub={`${conversionRate}% conversion rate`} />
          <Stat icon={Clock} label="Pending" value={pending}
            sub="New · Contacted · Confirmed" />
          <Stat icon={TrendingUp} label="Cancelled" value={cancelled}
            sub={filtered.length ? `${Math.round((cancelled / filtered.length) * 100)}% of enquiries` : "—"} />
        </div>

        {/* Weekly trend */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <p className="eyebrow mb-1">Weekly trend</p>
          <h2 className="font-display text-2xl text-[color:var(--chocolate-dark)] mb-5">Orders over 8 weeks</h2>
          <WeeklyChart orders={orders} />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Order status breakdown */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow mb-1">Breakdown</p>
            <h2 className="font-display text-2xl text-[color:var(--chocolate-dark)] mb-5">Order status</h2>
            <StatusDonut orders={filtered} />
          </div>

          {/* Top products */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow mb-1 flex items-center gap-2"><Package className="h-3.5 w-3.5" /> Products</p>
            <h2 className="font-display text-2xl text-[color:var(--chocolate-dark)] mb-5">What's selling</h2>
            {topProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data yet for this period.</p>
            ) : (
              <div className="space-y-3">
                {topProducts.map((p) => (
                  <Bar key={p.label} label={p.label} count={p.count} pct={p.pct} max={maxProduct} />
                ))}
              </div>
            )}
          </div>

          {/* Top flavours */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow mb-1 flex items-center gap-2"><ChefHat className="h-3.5 w-3.5" /> Flavours</p>
            <h2 className="font-display text-2xl text-[color:var(--chocolate-dark)] mb-5">Most requested flavours</h2>
            {topFlavours.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data yet for this period.</p>
            ) : (
              <div className="space-y-3">
                {topFlavours.map((f) => (
                  <Bar key={f.label} label={f.label} count={f.count} pct={f.pct} max={maxFlavour} />
                ))}
              </div>
            )}
          </div>

          {/* Top occasions */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow mb-1">Occasions</p>
            <h2 className="font-display text-2xl text-[color:var(--chocolate-dark)] mb-5">Why people order</h2>
            {topOccasions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No occasion data yet.</p>
            ) : (
              <div className="space-y-3">
                {topOccasions.map((o) => (
                  <Bar key={o.label} label={o.label} count={o.count} pct={o.pct} max={maxOccasion} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Delivery split */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <p className="eyebrow mb-1">Delivery</p>
          <h2 className="font-display text-2xl text-[color:var(--chocolate-dark)] mb-5">Pickup vs delivery split</h2>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data yet.</p>
          ) : (() => {
            const pickup = filtered.filter((o) => o.delivery?.toLowerCase().includes("pickup") || o.delivery?.toLowerCase().includes("pick")).length;
            const delivery = filtered.length - pickup;
            const pickupPct = Math.round((pickup / filtered.length) * 100);
            const deliveryPct = 100 - pickupPct;
            return (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
                <div className="flex-1">
                  <div className="flex overflow-hidden rounded-full h-4 gap-0.5">
                    <div className="bg-[color:var(--chocolate-dark)] h-full rounded-l-full transition-all duration-500" style={{ width: `${pickupPct}%` }} />
                    <div className="bg-[color:var(--gold)]/60 h-full rounded-r-full transition-all duration-500" style={{ width: `${deliveryPct}%` }} />
                  </div>
                </div>
                <div className="flex gap-8 shrink-0">
                  <div>
                    <p className="font-display text-3xl text-[color:var(--chocolate-dark)]">{pickupPct}%</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Pickup ({pickup})</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-[color:var(--chocolate-dark)]">{deliveryPct}%</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Delivery ({delivery})</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
