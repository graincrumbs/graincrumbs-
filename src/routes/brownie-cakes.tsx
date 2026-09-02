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
      {
        property: "og:title",
        content: "Brownie Cakes — Grain Crumbs",
      },
      {
        property: "og:description",
        content:
          "Cakes that taste like brownies — six flavours, four sizes, made without a grain of maida.",
      },
    ],
  }),
  component: Page,
});

const photo =
  "h-full w-full object-cover saturate-[0.92] contrast-[1.05] brightness-[0.98]";

const occasions = [
  {
    title: "Birthdays",
    tag: "Walnut & chocolate, hand-piped.",
    img: "/assets/grain-crumbs/occasions/birthday.png",
  },
  {
    title: "For Mom",
    tag: "Personalised, heart-detailed.",
    img: "/assets/grain-crumbs/occasions/for-mom.png",
  },
  {
    title: "Father's Day",
    tag: "Coconut snow, gold hearts.",
    img: "/assets/grain-crumbs/occasions/fathers-day.png",
  },
  {
    title: "Congratulations",
    tag: "For the big wins.",
    img: "/assets/grain-crumbs/occasions/congratulations.png",
  },
  {
    title: "Anniversaries",
    tag: "Rosettes & gold hearts.",
    img: "/assets/grain-crumbs/occasions/anniversary.png",
  },
  {
    title: "Custom Cakes",
    tag: "Butterfly-detailed, signature.",
    img: "/assets/grain-crumbs/occasions/custom-cakes.png",
  },
];

function hasDiscount(
  oldPrice: number | null | undefined,
  price: number | null | undefined,
) {
  return (
    oldPrice != null &&
    price != null &&
    oldPrice > 0 &&
    oldPrice > price
  );
}

function isFixedPrice(prices: Array<number | null | undefined>) {
  if (prices.length === 0) return false;

  const firstPrice = prices[0];

  if (firstPrice == null) return false;

  return prices.every(
    (price) => price != null && price === firstPrice,
  );
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
      {/* ───────────────── HERO ───────────────── */}
      <section className="relative overflow-hidden border-b border-border/60 bg-[color:var(--cream)]">
        <div className="container-prose grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <p className="divider-gold eyebrow">Brownie Cakes</p>

            <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-6xl">
              Cakes that taste like{" "}
              <em className="italic">brownies.</em>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Birthdays. Anniversaries. Promotions. Baby showers. Celebrate
              with a brownie cake that's rich, indulgent and thoughtfully made
              — without a grain of maida.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/order" className="btn-primary">
                Customise Your Cake
              </Link>

              <a
                href={WHATSAPP_ORDER_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative mx-auto grid aspect-square w-full max-w-[560px] grid-cols-2 grid-rows-2 gap-3">
              <div className="relative col-span-2 overflow-hidden rounded-[1.75rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_30px_60px_-30px_rgba(60,30,10,0.5)]">
                <img
                  src={heroImages[0]}
                  alt="Signature brownie cake"
                  className={photo}
                  loading="eager"
                />
              </div>

              <div className="relative overflow-hidden rounded-[1.5rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_50px_-30px_rgba(60,30,10,0.45)]">
                <img
                  src={heroImages[1]}
                  alt="Brownie cake detail"
                  className={photo}
                  loading="lazy"
                />
              </div>

              <div className="relative overflow-hidden rounded-[1.5rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_50px_-30px_rgba(60,30,10,0.45)]">
                <img
                  src={heroImages[2]}
                  alt="Celebration brownie cake"
                  className={photo}
                  loading="lazy"
                />
              </div>

              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--cream)] ring-1 ring-[color:var(--gold)]/40 shadow-md md:flex">
                <img
                  src="/assets/grain-crumbs/logo-premium.png"
                  alt="Grain Crumbs"
                  className="h-16 w-16 object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── MENU ───────────────── */}
      <section className="section" id="menu">
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-[color:var(--gold)]">
              Menu &amp; pricing
            </p>

            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Brownie Cake Menu
            </h2>

            <p className="mt-3 italic text-muted-foreground">
              Handcrafted with real ingredients. Baked with love.
            </p>
          </Reveal>

          {/* ───────────── DESKTOP TABLE ───────────── */}
          <Reveal className="mt-12 hidden overflow-hidden rounded-[1.75rem] border border-[color:var(--gold)]/30 bg-card shadow-[0_24px_60px_-30px_rgba(60,30,10,0.45)] md:block">
            <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] items-center bg-[color:var(--cream-dark)]/70 px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-[color:var(--chocolate)]">
              <div>Flavours</div>
              <div className="text-center">250g</div>
              <div className="text-center">500g</div>
              <div className="text-center">650g</div>
              <div className="text-center">1000g</div>
            </div>

            {rows.map((r, i) => {
              const prices = [
                r.price_250,
                r.price_500,
                r.price_650,
                r.price_1000,
              ];

              const olds = [
                r.old_price_250,
                r.old_price_500,
                r.old_price_650,
                r.old_price_1000,
              ];

              const fixedPrice = isFixedPrice(prices);

              return (
                <div
                  key={r.id}
                  className={`grid grid-cols-[1.6fr_repeat(4,1fr)] items-center px-8 py-5 ${
                    i !== rows.length - 1
                      ? "border-t border-border/60"
                      : ""
                  }`}
                >
                  {/* Flavour */}
                  <div className="flex items-center gap-4">
                    {r.image_url ? (
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-[color:var(--gold)]/30">
                        <img
                          src={r.image_url}
                          alt={r.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 shrink-0 rounded-full bg-[color:var(--cream-dark)] ring-1 ring-[color:var(--gold)]/30" />
                    )}

                    <div className="font-display text-lg leading-tight text-[color:var(--chocolate-dark)]">
                      {r.name}
                    </div>
                  </div>

                  {/* Fixed price */}
                  {fixedPrice ? (
                    <div className="col-span-4 text-center">
                      {hasDiscount(olds[0], prices[0]) && (
                        <div className="text-[11px] text-muted-foreground line-through">
                          ₹{olds[0]}
                        </div>
                      )}

                      <div className="font-display text-xl text-[color:var(--chocolate)]">
                        ₹{prices[0]}
                      </div>
                    </div>
                  ) : (
                    /* Individual prices */
                    prices.map((price, idx) => (
                      <div key={idx} className="text-center">
                        {hasDiscount(olds[idx], price) && (
                          <div className="text-[11px] text-muted-foreground line-through">
                            ₹{olds[idx]}
                          </div>
                        )}

                        <div className="font-display text-xl text-[color:var(--chocolate)]">
                          {price != null ? `₹${price}` : "—"}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </Reveal>

          {/* ───────────── MOBILE TABLE ───────────── */}
          <Reveal className="mt-10 md:hidden">
            <div className="mb-3 grid grid-cols-[2fr_repeat(4,1fr)] items-center px-4 text-[10px] uppercase tracking-[0.18em] text-[color:var(--chocolate)]/60">
              <div>Flavour</div>
              <div className="text-center">250g</div>
              <div className="text-center">500g</div>
              <div className="text-center">650g</div>
              <div className="text-center">1kg</div>
            </div>

            <div className="space-y-3">
              {rows.map((r) => {
                const prices = [
                  r.price_250,
                  r.price_500,
                  r.price_650,
                  r.price_1000,
                ];

                const olds = [
                  r.old_price_250,
                  r.old_price_500,
                  r.old_price_650,
                  r.old_price_1000,
                ];

                const fixedPrice = isFixedPrice(prices);

                return (
                  <div
                    key={r.id}
                    className="overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-card shadow-[0_8px_24px_-12px_rgba(60,30,10,0.25)]"
                  >
                    <div className="grid grid-cols-[2fr_repeat(4,1fr)] items-center gap-0 px-3 py-3">
                      {/* Flavour name */}
                      <div className="flex items-center gap-2 pr-2">
                        {r.image_url ? (
                          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-[color:var(--gold)]/30">
                            <img
                              src={r.image_url}
                              alt={r.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="h-8 w-8 shrink-0 rounded-full bg-[color:var(--cream-dark)] ring-1 ring-[color:var(--gold)]/30" />
                        )}

                        <span className="font-display text-[13px] leading-snug text-[color:var(--chocolate-dark)]">
                          {r.name}
                        </span>
                      </div>

                      {/* Fixed price */}
                      {fixedPrice ? (
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
                        /* Individual prices */
                        prices.map((price, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col items-center gap-0.5 border-l border-border/40 py-1"
                          >
                            {hasDiscount(olds[idx], price) && (
                              <span className="text-[9px] leading-none text-muted-foreground line-through">
                                ₹{olds[idx]}
                              </span>
                            )}

                            <span className="font-display text-[13px] leading-tight text-[color:var(--chocolate)]">
                              {price != null ? `₹${price}` : "—"}
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
            Custom messages, themed finishes &amp; occasion detailing
            available on request.
          </Reveal>

          <Reveal className="mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground">
            <ul className="space-y-1">
              <li>Vegan option available for an additional ₹99.</li>
              <li>
                100% Monk Fruit sweetener option available for an additional
                ₹99.
              </li>
            </ul>
          </Reveal>

          <Reveal className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/order" className="btn-primary">
              Order Now
            </Link>

            <a
              href={WHATSAPP_ORDER_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              WhatsApp Enquiry
            </a>
          </Reveal>
        </div>
      </section>

      {/* ───────────── CALENDAR BROWNIE CAKE ───────────── */}
      <section className="section" id="calendar-cake">
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          {/* Image shows first on mobile, stays on the right on desktop */}
          <Reveal delay={120} className="order-first md:order-none">
            <div className="relative mx-auto aspect-square w-full max-w-[480px] overflow-hidden rounded-[1.75rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_30px_60px_-30px_rgba(60,30,10,0.5)]">
              <img
                src="/assets/grain-crumbs/calendar-brownie-cake.png"
                alt="Calendar Brownie Cake"
                className={photo}
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal>
            <p className="eyebrow text-[color:var(--gold)]">
              📅 Calendar Brownie Cake
            </p>

            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Because some dates deserve to be remembered forever.
            </h2>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Celebrate life's special moments with a handcrafted Calendar
              Brownie Cake. Simply choose your month and highlight the date
              that means the most to you. Every calendar is individually
              handcrafted, with the date numbers made using 100% Premium
              Couverture Chocolate.
            </p>

            <h3 className="mt-8 font-display text-xl text-[color:var(--chocolate-dark)]">
              Perfect For
            </h3>

            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <li>🎂 Birthdays</li>
              <li>💍 Wedding Anniversaries</li>
              <li>💼 Work Anniversaries & Promotions</li>
              <li>🏢 Company Foundation Days & Milestones</li>
              <li>🎓 Graduations & Achievements</li>
              <li>👶 Baby Announcements & Family Milestones</li>
              <li>❤️ First Meeting, Proposal or Engagement</li>
              <li>✨ Or any date that deserves to be celebrated</li>
            </ul>

            <h3 className="mt-8 font-display text-xl text-[color:var(--chocolate-dark)]">
              What's Included
            </h3>

            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li>✔️ Approx. 1.1 kg Brownie Cake</li>
              <li>
                ✔️ Available in any Grain Crumbs flavour (same price for all
                flavours)
              </li>
              <li>✔️ Handcrafted edible calendar design</li>
              <li>
                ✔️ Date numbers made with 100% Premium Couverture Chocolate
              </li>
              <li>✔️ Personalised message for your occasion</li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-display text-3xl text-[color:var(--chocolate)]">
                ₹1,350
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/order"
                search={{ calendar: "1" }}
                className="btn-primary"
              >
                Order Calendar Cake
              </Link>

              <a
                href={WHATSAPP_ORDER_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                WhatsApp Enquiry
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── OCCASIONS ───────────── */}
      <section
        className="section bg-[color:var(--cream-dark)]/40"
        id="celebrations"
      >
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-[color:var(--gold)]">
              For every occasion
            </p>

            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Reasons to celebrate.
            </h2>

            <p className="mt-3 text-muted-foreground">
              A glimpse of cakes we've baked for our community.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((occasion, i) => (
              <Reveal key={occasion.title} delay={i * 60}>
                <article className="group relative overflow-hidden rounded-[1.5rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_18px_45px_-28px_rgba(60,30,10,0.4)]">
                  <img
                    src={occasion.img}
                    alt={occasion.title}
                    loading="lazy"
                    width={800}
                    height={900}
                    className={`${photo} aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.05]`}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-2xl text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      {occasion.title}
                    </h3>

                    <p className="mt-1 text-sm text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {occasion.tag}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link to="/order" className="btn-primary">
              Enquire / Order Your Cake
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
