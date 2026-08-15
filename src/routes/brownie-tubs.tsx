import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useLiveTubProducts } from "@/lib/use-products";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP_PLAIN_URL } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { Heart, Package, Ban, Wheat } from "lucide-react";

export const Route = createFileRoute("/brownie-tubs")({
  head: () => ({
    meta: [
      { title: "Brownie Tubs — Little Tubs of Happiness — Grain Crumbs" },
      {
        name: "description",
        content:
          "Grain Crumbs Brownie Tubs — 250g tubs with 3 fudgy millet brownie pieces in six signature flavours. Baked fresh in Pune, no maida, no refined sugar.",
      },
      { property: "og:title", content: "Brownie Tubs — Grain Crumbs" },
      { property: "og:description", content: "Little tubs of happiness. Six signature Brownie Tub flavours, 250g each." },
    ],
  }),
  component: BrownieTubsPage,
});

const photoTreatment = "h-full w-full object-cover saturate-[0.92] contrast-[1.05] brightness-[0.98]";

const madeUsing = [
  { label: "Ragi" },
  { label: "Oats" },
  { label: "Sorghum (Jowar)" },
  { label: "Foxtail Millets" },
  { label: "Sweetened with Jaggery" },
  { label: "Premium Couverture Chocolate" },
  { label: "Pure Veg" },
];

const noNoList = [
  "No Refined Flour, Maida",
  "No Refined Sugar",
  "No Artificial Colours",
  "No Preservatives",
];

function BrownieTubsPage() {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { products: tubs } = useLiveTubProducts();

  const handleAddToCart = (t: (typeof tubs)[number]) => {
    addItem({
      slug: t.slug,
      name: t.name,
      price: t.price,
      image: t.image,
    });
    toast.success(`${t.name} added to cart`, {
      action: {
        label: "View cart",
        onClick: () => navigate({ to: "/cart" }),
      },
    });
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60 bg-[color:var(--cream-dark)]/40">
        <div className="container-prose relative grid items-center gap-10 py-16 md:grid-cols-[1.05fr_1fr] md:py-24">
          <Reveal>
            <p className="divider-gold eyebrow">Brownie Tubs</p>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-6xl">
              Little tubs of
              <span className="block italic text-[color:var(--chocolate)]">happiness.</span>
            </h1>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Every tub is 250 grams and comes with 3 generous brownie pieces in your favourite signature flavour — perfect for sharing, gifting, or keeping entirely to yourself.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--cream)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--chocolate)]">
                <Heart className="h-3.5 w-3.5" /> All tubs are 250 grams
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--cream)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--chocolate)]">
                <Package className="h-3.5 w-3.5" /> 3 brownie pieces per tub
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#menu" className="btn-primary">View Menu &amp; Pricing</a>
              <a href={WHATSAPP_PLAIN_URL} target="_blank" rel="noreferrer" className="btn-outline">Chat on WhatsApp</a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_60px_-28px_rgba(60,30,10,0.42)]">
              <img
                src="/assets/grain-crumbs/Brownie-Tub.png"
                alt="Grain Crumbs Brownie Tub"
                width={1200}
                height={1500}
                className={`${photoTreatment} aspect-[4/5]`}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Menu &amp; pricing</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">The six tub flavours.</h2>
            <p className="mt-4 text-muted-foreground">All Brownie Tubs are baked fresh in Pune. Every tub is 250g and includes 3 brownie pieces.</p>
          </Reveal>

          <div className="mt-14 grid gap-10">
            {tubs.map((t, i) => (
              <Reveal key={t.slug} delay={i * 50}>
                <article id={t.slug} className={`grid items-center gap-8 scroll-mt-24 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
                  <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_60px_-28px_rgba(60,30,10,0.38)]">
                    <img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className={photoTreatment}
                    />
                  </div>
                  <div>
                    <p className="eyebrow">{`0${i + 1}`}</p>
                    <h3 className="mt-3 font-display text-4xl md:text-5xl">{t.name}</h3>
                    <div className="mt-3 flex flex-wrap items-baseline gap-3">
                      <p className="italic text-[color:var(--gold)]">{t.tagline}</p>
                      <span className="font-display text-2xl text-[color:var(--chocolate)]">₹{t.price}/-</span>
                    </div>
                    <p className="mt-5 max-w-md text-muted-foreground">{t.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {t.notes.map((n) => (
                        <li key={n} className="rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {n}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <button type="button" onClick={() => handleAddToCart(t)} className="btn-primary w-full sm:w-auto">
                        Add to cart
                      </button>
                      <Link to="/cart" className="btn-outline w-full sm:w-auto">View cart</Link>
                      <a href={WHATSAPP_PLAIN_URL} target="_blank" rel="noreferrer" className="btn-outline w-full sm:w-auto">Ask on WhatsApp</a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MADE USING / NO-NO LIST */}
      <section className="section">
        <div className="container-prose grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="card-warm h-full p-6">
              <div className="flex items-center gap-2.5">
                <Wheat className="h-5 w-5 text-[color:var(--gold)]" />
                <h3 className="font-display text-2xl">Made Using</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {madeUsing.map((m) => (
                  <li key={m.label} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {m.label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card-warm h-full p-6">
              <div className="flex items-center gap-2.5">
                <Ban className="h-5 w-5 text-[color:var(--gold)]" />
                <h3 className="font-display text-2xl">Our No-No List</h3>
              </div>
              <ul className="mt-5 space-y-2">
                {noNoList.map((n) => (
                  <li key={n} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--gold)]" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="section">
        <div className="container-prose">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-[color:var(--chocolate-dark)] px-6 py-12 text-center text-[color:var(--cream)] md:px-16 md:py-16">
              <div className="grain absolute inset-0 opacity-30" aria-hidden />
              <p className="relative eyebrow text-[color:var(--gold)]">Brownie Tubs</p>
              <h2 className="relative mt-3 font-display text-3xl text-[color:var(--cream)] md:text-4xl">Little tubs of happiness, mindfully made.</h2>
              <p className="relative mx-auto mt-4 max-w-lg text-[color:var(--cream)]/80 text-sm">250g tubs, 3 brownie pieces, six signature flavours. Baked fresh in Pune.</p>
              <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <a href="#menu" className="btn-gold w-full sm:w-auto">Shop Brownie Tubs</a>
                <a href={WHATSAPP_PLAIN_URL} target="_blank" rel="noreferrer" className="btn-outline w-full border-[color:var(--cream)]/40 text-[color:var(--cream)] hover:bg-[color:var(--cream)] hover:text-[color:var(--chocolate-dark)] sm:w-auto">
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
