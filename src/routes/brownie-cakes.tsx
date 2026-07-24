import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP_ORDER_URL } from "@/lib/whatsapp";
import { useCakeFlavours } from "@/lib/use-cake-flavours";

export const Route = createFileRoute("/brownie-cakes")({
  head: () => ({
    meta: [
      { title: "Brownie Cakes — Grain Crumbs" },
      {
        name: "description",
        content:
          "Brownie cakes for every celebration — six signature flavours with transparent size-wise pricing, baked fresh in Pune.",
      },
      { property: "og:title", content: "Brownie Cakes — Grain Crumbs" },
      {
        property: "og:description",
        content: "Cakes that taste like brownies — six flavours, four sizes, made without a grain of maida.",
      },
    ],
  }),
  component: Page,
});

const photo =
  "h-full w-full object-cover saturate-[0.92] contrast-[1.05] brightness-[0.98]";

const occasions = [
  { title: "Birthdays",       tag: "Walnut & chocolate, hand-piped.",     img: "/assets/grain-crumbs/occasions/birthday.png"        },
  { title: "For Mom",         tag: "Personalised, heart-detailed.",        img: "/assets/grain-crumbs/occasions/for-mom.png"          },
  { title: "Father's Day",    tag: "Coconut snow, gold hearts.",           img: "/assets/grain-crumbs/occasions/fathers-day.png"      },
  { title: "Congratulations", tag: "For the big wins.",                    img: "/assets/grain-crumbs/occasions/congratulations.png"  },
  { title: "Anniversaries",   tag: "Rosettes & gold hearts.",              img: "/assets/grain-crumbs/occasions/anniversary.png"      },
  { title: "Custom Cakes",    tag: "Butterfly-detailed, signature.",       img: "/assets/grain-crumbs/occasions/custom-cakes.png"     },
];

// Show a strikethrough only when there's a real discount set for that size.
function hasDiscount(oldPrice: number, price: number) {
  return !!oldPrice && oldPrice > price;
}

// Items like "Assorted Box" are sold at one flat price, not per weight —
// detected when all 4 size prices are identical, so the menu shows a single price.
function isFixedPrice(prices: number[]) {
  return prices.every((p) => p === prices[0]);
}

const heroImages = [
  "/assets/grain-crumbs/cake-chocolate-walnut.png",
  "/assets/grain-crumbs/cake-cappuccino-walnut.png",
  "/assets/grain-crumbs/cake-cream-cheese.png",
];

function Page() {
  const { flavours: rows } = useCakeFlavours();
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-border/60 bg-[color:var(--cream)]">
        <div className="container-prose grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <p className="divider-gold eyebrow">Brownie Cakes</p>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-6xl">
              Cakes that taste like <em className="italic">brownies.</em>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Birthdays. Anniversaries. Promotions. Baby showers. Celebrate with a brownie cake that's rich,
              indulgent and thoughtfully made — without a grain of maida.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/order" className="btn-primary">Customise Your Cake</Link>
              <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noreferrer" className="btn-outline">Chat on WhatsApp</a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative mx-auto grid aspect-square w-full max-w-[560px] grid-cols-2 grid-rows-2 gap-3">
              <div className="relative col-span-2 overflow-hidden rounded-[1.75rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_30px_60px_-30px_rgba(60,30,10,0.5)]">
                <img src={heroImages[0]} alt="Signature brownie cake" className={photo} loading="eager" />
              </div>
              <div className="relative overflow-hidden rounded-[1.5rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_50px_-30px_rgba(60,30,10,0.45)]">
                <img src={heroImages[1]} alt="Brownie cake detail" className={photo} loading="lazy" />
              </div>
              <div className="relative overflow-hidden rounded-[1.5rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_50px_-30px_rgba(60,30,10,0.45)]">
                <img src={heroImages[2]} alt="Celebration brownie cake" className={photo} loading="lazy" />
              </div>
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--cream)] ring-1 ring-[color:var(--gold)]/40 shadow-md md:flex">
                <img src="/assets/grain-crumbs/logo-premium.png" alt="Grain Crumbs" className="h-16 w-16 object-contain" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MENU TABLE ── */}
      <section className="section" id="menu">
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-[color:var(--gold)]">Menu &amp; pricing</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Brownie Cake Menu</h2>
            <p className="mt-3 italic text-muted-foreground">Handcrafted with real ingredients. Baked with love.</p>
          </Reveal>

          {/* ── DESKTOP TABLE (md+) ── */}
          <Reveal className="mt-12 hidden md:block overflow-hidden rounded-[1.75rem] border border-[color:var(--gold)]/30 bg-card shadow-[0_24px_60px_-30px_rgba(60,30,10,0.45)]">
            {/* Header */}
            <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] items-center bg-[color:var(--cream-dark)]/70 px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-[color:var(--chocolate)]">
              <div>Flavours</div>
              <div className="text-center">250g</div>
              <div className="text-center">500g</div>
              <div className="text-center">650g</div>
              <div className="text-center">1000g</div>
            </div>

            {rows.map((r, i) => {
              const prices = [r.price_250, r.price_500, r.price_650, r.price_1000];
              const olds = [r.old_price_250, r.old_price_500, r.old_price_650, r.old_price_1000];
              return (
              <div
                key={r.id}
                className={`grid grid-cols-[1.6fr_repeat(4,1fr)] items-center px-8 py-5 ${
                  i !== rows.length - 1 ? "border-t border-border/60" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-[color:var(--gold)]/30">
                    <img src={r.image_url ?? ""} alt={r.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="font-display text-lg leading-tight text-[color:var(--chocolate-dark)]">
                    {r.name}
                  </div>
                </div>
                {isFixedPrice(prices) ? (
                  <div className="col-span-4 text-center">
                    {hasDiscount(olds[0], prices[0]) && (
                      <div className="text-[11px] text-muted-foreground line-through">₹{olds[0]}</div>
                    )}
                    <div className="font-display text-xl text-[color:var(--chocolate)]">₹{prices[0]}</div>
                  </div>
                ) : (
                  prices.map((p, idx) => (
                    <div key={idx} className="text-center">
                      {hasDiscount(olds[idx], p) && (
                        <div className="text-[11px] text-muted-foreground line-through">₹{olds[idx]}</div>
                      )}
                      <div className="font-display text-xl text-[color:var(--chocolate)]">₹{p}</div>
                    </div>
                  ))
                )}
              </div>
              );
            })}
          </Reveal>

          {/* ── MOBILE CARDS (< md) ── */}
          <Reveal className="mt-10 md:hidden">
            {/* Shared size column headers */}
            <div className="mb-3 grid grid-cols-[2fr_repeat(4,1fr)] items-center px-4 text-[10px] uppercase tracking-[0.18em] text-[color:var(--chocolate)]/60">
              <div>Flavour</div>
              <div className="text-center">250g</div>
              <div className="text-center">500g</div>
              <div className="text-center">650g</div>
              <div className="text-center">1kg</div>
            </div>

            <div className="space-y-3">
              {rows.map((r) => {
                const prices = [r.price_250, r.price_500, r.price_650, r.price_1000];
                const olds = [r.old_price_250, r.old_price_500, r.old_price_650, r.old_price_1000];
                return (
                <div
                  key={r.id}
                  className="overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-card shadow-[0_8px_24px_-12px_rgba(60,30,10,0.25)]"
                >
                  {/* Single row: icon + name + 4 prices */}
                  <div className="grid grid-cols-[2fr_repeat(4,1fr)] items-center gap-0 px-3 py-3">
                    {/* Flavour name + icon */}
                    <div className="flex items-center gap-2 pr-2">
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-[color:var(--gold)]/30">
                        <img src={r.image_url ?? ""} alt={r.name} className="h-full w-full object-cover" loading="lazy" />
                      </div>
                      <span className="font-display text-[13px] leading-snug text-[color:var(--chocolate-dark)]">
                        {r.name}
                      </span>
                    </div>

                    {/* 4 price columns (or a single merged price for fixed-price items) */}
                    {isFixedPrice(prices) ? (
                      <div className="col-span-4 flex flex-col items-center gap-0.5 border-l border-border/40 py-1">
                        {hasDiscount(olds[0], prices[0]) && (
                          <span className="text-[9px] leading-none text-muted-foreground line-through">
                            ₹{olds[0]}
                          </span>
                        )}
                        <span className="font-display text-[13px] leading-tight text-[color:var(--chocolate)]">
                          ₹{prices[0]}
                        </span>
                      </div>
                    ) : (
                      prices.map((p, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-0.5 border-l border-border/40 py-1">
                          {hasDiscount(olds[idx], p) && (
                            <span className="text-[9px] leading-none text-muted-foreground line-through">
                              ₹{olds[idx]}
                            </span>
                          )}
                          <span className="font-display text-[13px] leading-tight text-[color:var(--chocolate)]">
                            ₹{p}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="mt-8 text-center text-sm text-muted-foreground">
            Custom messages, themed finishes &amp; occasion detailing available on request.
          </Reveal>

          <Reveal className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/order" className="btn-primary">Order Now</Link>
            <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noreferrer" className="btn-outline">WhatsApp Enquiry</a>
          </Reveal>
        </div>
      </section>

      {/* ── OCCASIONS ── */}
      <section className="section bg-[color:var(--cream-dark)]/40" id="celebrations">
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-[color:var(--gold)]">For every occasion</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Reasons to celebrate.</h2>
            <p className="mt-3 text-muted-foreground">A glimpse of cakes we've baked for our community.</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((o, i) => (
              <Reveal key={o.title} delay={i * 60}>
                <article className="group relative overflow-hidden rounded-[1.5rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_18px_45px_-28px_rgba(60,30,10,0.4)]">
                  <img
                    src={o.img}
                    alt={o.title}
                    loading="lazy"
                    width={800}
                    height={900}
                    className={`${photo} aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.05]`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-2xl text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{o.title}</h3>
                    <p className="mt-1 text-sm text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{o.tag}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link to="/order" className="btn-primary">Enquire / Order Your Cake</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
