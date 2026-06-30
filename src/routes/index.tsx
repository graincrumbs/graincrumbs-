import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wheat,
  Sparkles,
  Cookie,
  Ban,
  Leaf,
  Heart,
  ArrowRight,
  Quote,
  Youtube,
} from "lucide-react";
import founderImg from "@/assets/founder.jpg";
const giftingImg = "/assets/grain-crumbs/gifting-premium.png";

const hero = "/assets/grain-crumbs/hero-premium.png";
const cakeImg = "/assets/grain-crumbs/brownie-cake-feature.png";
import { Reveal } from "@/components/Reveal";
import { useLiveProducts } from "@/lib/use-products";
import { useSitePage } from "@/lib/use-site-page";
import { WHATSAPP_ORDER_URL, WHATSAPP_PLAIN_URL } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grain Crumbs — Millet Brownies. Crafted Differently." },
      {
        name: "description",
        content:
          "Premium millet brownies from Pune. Made with ragi, foxtail millet, oats & buckwheat — sweetened with jaggery, finished with couverture chocolate.",
      },
      { property: "og:title", content: "Grain Crumbs — Millet Brownies" },
      {
        property: "og:description",
        content: "Better ingredients. Real indulgence. Brownies made differently.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <Collections />
      <Flavours />
      <BrownieCakes />
      <ComparisonTable />
      <Story />
      <BehindTheScenes />
      <Reviews />
      <Gifting />
      <FAQ />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grain absolute inset-0 opacity-60" aria-hidden />
      <div className="container-prose relative grid items-center gap-10 pt-12 pb-16 md:grid-cols-[1.05fr_1fr] md:pt-24 md:pb-28">
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="divider-gold eyebrow">Pune · Made fresh</p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-600/40 bg-green-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-green-700">
                <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 border-green-600 text-green-600">
                  <span className="block h-1.5 w-1.5 rounded-full bg-green-600" />
                </span>
                100% Pure Veg
              </span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-5 font-display text-[clamp(2.1rem,8vw,4.75rem)] leading-[1.05] tracking-tight md:mt-6">
              Brownies made
              <span className="italic text-[color:var(--chocolate)]"> differently</span>.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:mt-7 md:text-lg">
              Made with <em className="not-italic font-medium text-foreground">Ragi, Foxtail Millet,
              Oats & Buckwheat.</em> Sweetened with jaggery. Crafted with premium couverture chocolate.
            </p>
          </Reveal>
          <Reveal delay={360}>
            {/* FIX 1: On mobile — 2 main buttons + secondary actions as text links */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap md:mt-9">
              <Link to="/order" className="btn-primary w-full sm:w-auto">
                Order Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/brownies" className="btn-outline w-full sm:w-auto">View Menu</Link>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm sm:hidden">
              <a
                href={WHATSAPP_ORDER_URL}
                target="_blank"
                rel="noreferrer"
                className="text-[color:var(--chocolate)] underline underline-offset-2"
              >
                Request a Quote
              </a>
              <span className="text-border">·</span>
              <Link
                to="/brownie-cakes"
                className="text-[color:var(--chocolate)] underline underline-offset-2"
              >
                Customise Your Cake
              </Link>
            </div>
            <div className="mt-3 hidden flex-wrap gap-3 sm:flex">
              <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noreferrer" className="btn-outline w-full sm:w-auto">Request a Quote</a>
              <Link to="/brownie-cakes" className="btn-outline w-full sm:w-auto">Customise Your Cake</Link>
            </div>
          </Reveal>
          <Reveal delay={500}>
            <dl className="mt-12 grid max-w-md grid-cols-2 gap-6 border-t border-border/70 pt-8 text-sm">
              <div>
                <dt className="text-muted-foreground">Flour Used</dt>
                <dd className="mt-1 font-display text-xl">Millet-Based Flour Blend</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Chocolate</dt>
                <dd className="mt-1 font-display text-xl">Couverture</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[color:var(--cream-dark)] shadow-[var(--shadow-warm)]">
            <img
              src={hero}
              alt="Grain Crumbs signature chocolate walnut brownie"
              width={1600}
              height={2000}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[color:var(--gold)]/30" />
          </div>
          <div className="absolute -left-6 -bottom-6 hidden w-56 rotate-[-4deg] rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)] ring-1 ring-[color:var(--gold)]/30 md:block">
            <p className="eyebrow">A mother's recipe</p>
            <p className="mt-2 font-display text-lg leading-snug">
              "Made for my daughter. Loved by everyone."
            </p>
          </div>
          <div className="absolute -right-4 top-8 hidden rounded-full bg-[color:var(--gold)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--chocolate-dark)] shadow-md md:block">
            No Maida · No Refined Sugar
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const why = [
  { icon: Wheat, title: "Millet-Based Flour Blend Only", text: "Ragi, Foxtail, Oats, Jowar, And Buckwheat." },
  { icon: Leaf, title: "Sweetened with Jaggery, Monkfruit, And Stevia", text: "Naturally, Never Refined." },
  { icon: Cookie, title: "Couverture Chocolate", text: "Premium, Real, Glossy." },
  { icon: Ban, title: "No Maida", text: "Ever. We Don't Compromise." },
  { icon: Ban, title: "No Refined Sugar", text: "Not At All." },
  { icon: Sparkles, title: "No Preservatives", text: "Made Fresh To Order." },
];

function WhyUs() {
  return (
    <section className="section bg-[color:var(--cream-dark)]/40">
      <div className="container-prose">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Why Grain Crumbs</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Everything you love about brownies.
            <span className="block italic text-[color:var(--chocolate)]">Nothing you don't.</span>
          </h2>
        </Reveal>

        {/* FIX 2: Mobile — icon left of text (flex row), desktop — icon above text (block) */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              <div className="card-warm flex h-full items-start gap-4 p-5 md:block md:p-7">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--cream)] text-[color:var(--chocolate)] ring-1 ring-[color:var(--gold)]/40 md:h-12 md:w-12">
                  <w.icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div>
                  <h3 className="mt-0 font-display text-xl md:mt-5 md:text-2xl">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="/assets/grain-crumbs/brownie-tray-process.png"
              alt="Grain Crumbs brownie tray with walnuts, hazelnuts and chocolate chips"
              width={1600}
              height={900}
              loading="lazy"
              className="h-72 w-full object-cover md:h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--chocolate-dark)]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
              <p className="eyebrow font-semibold text-white tracking-[0.2em] uppercase [text-shadow:0_3px_10px_rgba(0,0,0,1)]">
                Ingredient-first
              </p>
              <p className="mt-2 max-w-xl font-display text-2xl text-white md:text-3xl [text-shadow:0_2px_8px_rgba(0,0,0,0.55)]">
                Millets you'd cook with at home. Chocolate you'd never compromise on.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const collections = [
  {
    name: "Grain Crumbs Classic",
    status: "Available now",
    available: true,
    to: "/brownies" as const,
    points: [
      "Millet Flour Based",
      "Sweetened With Jaggery",
      "No Refined Sugar",
      "Premium Couverture Chocolate",
      "Freshly Made To Order",
    ],
  },
  {
    name: "Grain Crumbs Lite",
    status: "Coming soon",
    available: false,
    to: "/grain-crumbs-lite" as const,
    points: ["Jaggery + Monk Fruit", "Reduced Added Sugar", "Lower-GI Focus"],
  },
  {
    name: "Grain Crumbs Pro",
    status: "Coming soon",
    available: false,
    to: "/grain-crumbs-pro" as const,
    points: ["High Protein", "Millet Based", "Fitness Focused"],
  },
  {
    name: "Cookie Cake Tins",
    status: "Coming soon",
    available: false,
    to: "/cookie-tins" as const,
    points: ["Premium Oozy Cookie Cake Tins", "Keepsake Gifting Tins", "In Scrumptious Flavours"],
  },
];

function Collections() {
  const { page: litePage } = useSitePage("grain-crumbs-lite");
  const { page: proPage } = useSitePage("grain-crumbs-pro");
  const { page: cookiePage } = useSitePage("cookie-tins");
  const statusFor = (slug: string) => {
    const page = slug === "grain-crumbs-lite" ? litePage : slug === "grain-crumbs-pro" ? proPage : cookiePage;
    return page.status === "live" ? { status: "Available now", available: true } : { status: "Coming soon", available: false };
  };
  return (
    <section id="collections" className="section scroll-mt-24">
      <div className="container-prose">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Our Collections</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">A brownie for every you.</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Four thoughtfully designed ranges — from the indulgent classic to lighter,
            higher-protein and beautifully-tinned companions on the way.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => {
            const live = c.available ? { status: c.status, available: c.available } : statusFor(c.to.replace("/", ""));
            return (
            <Reveal key={c.name} delay={i * 100}>
              <article className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all ${live.available ? "border-[color:var(--chocolate-dark)] bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]" : "border-border bg-card"}`}>
                <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] ${live.available ? "bg-[color:var(--gold)] text-[color:var(--chocolate-dark)]" : "border border-border text-muted-foreground"}`}>
                  {live.status}
                </span>
                <h3 className={`mt-5 font-display text-2xl ${live.available ? "text-[color:var(--cream)]" : ""}`}>{c.name}</h3>
                <ul className="mt-5 space-y-2.5 text-sm">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className={`mt-2 inline-block h-1 w-3 ${live.available ? "bg-[color:var(--gold)]" : "bg-[color:var(--chocolate)]"}`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  {live.available ? (
                    <Link to={c.to} className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-[color:var(--gold-soft)] hover:text-[color:var(--gold)]">
                      Order the classic <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Link to={c.to} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--chocolate)] hover:text-[color:var(--chocolate-dark)]">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Flavours() {
  const { products: flavours } = useLiveProducts();
  return (
    <section className="section bg-[color:var(--cream-dark)]/40">
      <div className="container-prose">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Our Signature Flavours</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Six ways to fall in love.</h2>
          <p className="mt-4 text-muted-foreground">
            Each flavour begins with the same millet-and-jaggery base — then takes a quiet
            detour into something memorable.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flavours.map((f, i) => (
            <Reveal key={f.slug} delay={i * 80}>
              <article className="group card-warm overflow-hidden">
                <Link
                  to="/brownies"
                  hash={f.slug}
                  className="block aspect-[4/5] overflow-hidden bg-muted"
                  aria-label={`View ${f.name} on menu`}
                >
                  <img
                    src={f.image}
                    alt={f.name}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Link>
                <div className="p-6">
                  <h3 className="font-display text-2xl">{f.name}</h3>
                  <p className="mt-1 text-sm italic text-[color:var(--gold)]">{f.tagline}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{f.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link to="/brownies" className="btn-outline">Explore Flavours</Link>
        </Reveal>
      </div>
    </section>
  );
}

function BrownieCakes() {
  return (
    <section className="section">
      <div className="container-prose grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src={cakeImg}
              alt="Premium chocolate brownie celebration cake"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <p className="eyebrow">Brownie Cakes</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            For every celebration.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Birthdays. Anniversaries. Promotions. Baby showers. Father's Day. Mother's Day.
            Celebrate with a brownie cake that's rich, indulgent and thoughtfully made.
          </p>
          <ul className="mt-7 grid grid-cols-2 gap-3 text-sm">
            {["Custom messages", "Theme requests", "Reference images", "Made to order"].map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-[color:var(--gold)]" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/brownie-cakes" className="btn-primary w-full sm:w-auto">See Cakes</Link>
            <Link to="/order" className="btn-outline w-full sm:w-auto">Customise Yours</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const rows = [
  ["Flour", "Millet Flour", "Maida"],
  ["Sweetener", "Jaggery", "Refined Sugar"],
  ["Chocolate", "Premium Couverture", "Compound Chocolate"],
  ["Production", "Made Fresh to Order", "Mass Produced"],
  ["Preservatives", "None", "Used"],
];

function ComparisonTable() {
  return (
    <section className="section bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]">
      <div className="container-prose">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-[color:var(--gold)]">What makes us different</p>
          <h2 className="mt-3 font-display text-4xl text-[color:var(--cream)] md:text-5xl">
            Better in every line.
          </h2>
        </Reveal>

        <Reveal delay={200} className="mt-12">
          <p className="mb-2 text-center text-[10px] uppercase tracking-[0.18em] text-[color:var(--gold)]/60 md:hidden">
            ← Scroll to see all →
          </p>
          <div className="overflow-x-auto rounded-2xl border border-[color:var(--gold)]/30 [-webkit-overflow-scrolling:touch]">
            <table className="w-full min-w-[380px] text-left text-sm">
              <thead>
                <tr className="bg-[color:var(--chocolate)]/70 text-xs uppercase tracking-[0.2em] text-[color:var(--gold-soft)]">
                  <th className="px-4 py-5 font-semibold text-[color:var(--gold)]"> </th>
                  <th className="px-4 py-5">Grain Crumbs</th>
                  <th className="px-4 py-5 opacity-70">Typical Bakery</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r[0]} className={i % 2 ? "bg-white/[0.02]" : ""}>
                    <td className="px-4 py-5 font-medium uppercase tracking-wider text-[color:var(--gold-soft)]">{r[0]}</td>
                    <td className="px-4 py-5 font-semibold text-[color:var(--cream)]">{r[1]}</td>
                    <td className="px-4 py-5 text-[color:var(--cream)]/60">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="section">
      <div className="container-prose grid items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
            <img
              src={founderImg}
              alt="Ankita Jain, founder of Grain Crumbs, at a corporate exhibition"
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[color:var(--gold)]/30" />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <p className="eyebrow">Our Story</p>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            Made for my daughter.
            <span className="block italic text-[color:var(--chocolate)]">Loved by everyone.</span>
          </h2>
          <p className="mt-5 text-sm uppercase tracking-[0.25em] text-[color:var(--gold)]">
            Founder · Ankita Jain
          </p>
          <div className="mt-5 space-y-4 text-muted-foreground md:space-y-5">
            <p>
              Grain Crumbs started when I wanted treats made with better ingredients
              for my daughter. What began as a personal journey soon became something
              friends and family kept asking for.
            </p>
            <p>Today, every batch is still made with the same care.</p>
            <p className="font-display text-xl text-foreground md:text-2xl">— Ankita Jain</p>
          </div>
          <div className="mt-7 md:mt-8">
            <Link to="/about" className="btn-outline w-full sm:w-auto">Read the full story</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const reviews = [
  { text: "Everyone loved it. The cake disappeared in 10 minutes.", who: "Priya · Birthday Order" },
  { text: "Should have ordered double. So glad I found you.", who: "Nikhil · Office Gifting" },
  { text: "Less sweet and perfect. My kids didn't realise it was millet.", who: "Anita · Repeat Customer" },
];

function BehindTheScenes() {
  return (
    <section className="section bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]">
      <div className="container-prose">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-[color:var(--gold)]">On YouTube</p>
          <h2 className="mt-3 font-display text-4xl text-[color:var(--cream)] md:text-5xl">
            Grain Crumbs: Behind The Scenes
          </h2>
          <p className="mt-4 text-[color:var(--cream)]/70">
            Watch how every batch comes to life — the ingredients, the process,
            and the care that goes into each brownie.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-12">
          <a
            href="https://youtube.com/@graincrumbs?si=u-YRVSvuixrJap_T"
            target="_blank"
            rel="noreferrer"
            className="group relative mx-auto flex max-w-3xl flex-col items-center overflow-hidden rounded-[2rem] border border-[color:var(--gold)]/30 bg-[color:var(--chocolate)] transition-all hover:border-[color:var(--gold)]/60 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="relative w-full bg-[color:var(--chocolate-dark)] aspect-video flex items-center justify-center">
              <div className="grain absolute inset-0 opacity-20" aria-hidden />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-red-600 shadow-[0_8px_32px_rgba(220,38,38,0.5)] transition-transform duration-300 group-hover:scale-110">
                  <Youtube className="h-9 w-9 text-white" />
                </div>
                <p className="font-display text-xl text-[color:var(--cream)] md:text-2xl">
                  Watch on YouTube
                </p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4 px-8 py-5">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-red-600">
                  <Youtube className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[color:var(--cream)]">@graincrumbs</p>
                  <p className="text-xs text-[color:var(--cream)]/50">youtube.com/@graincrumbs</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--gold)] transition-gap group-hover:gap-3">
                Visit Channel <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section bg-[color:var(--cream-dark)]/40">
      <div className="container-prose">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">From our customers</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Notes from the WhatsApp inbox.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.who} delay={i * 100}>
              <figure className="card-warm flex h-full flex-col p-7">
                <Quote className="h-7 w-7 text-[color:var(--gold)]" />
                <blockquote className="mt-4 font-display text-xl leading-snug">
                  "{r.text}"
                </blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {r.who}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gifting() {
  return (
    <section className="section">
      <div className="container-prose grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Gifting</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Thoughtful gifting,
            <span className="block italic text-[color:var(--chocolate)]"> made easy.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Curated brownie hampers for the people you care about — and the people you
            want to impress. Personalised notes, premium packaging, delivered across Pune.
          </p>
          <ul className="mt-7 grid grid-cols-2 gap-y-3 text-sm">
            {["Birthdays", "Office Gifting", "Return Gifts", "Thank You Gifts", "Festive Hampers", "Bulk Orders"].map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="h-1 w-3 bg-[color:var(--gold)]" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/gifting" className="btn-primary w-full sm:w-auto">Explore Hampers</Link>
            <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noreferrer" className="btn-outline w-full sm:w-auto">Request a Quote</a>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src={giftingImg}
              alt="Premium brownie gift box with gold ribbon"
              loading="lazy"
              width={1400}
              height={1400}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Are your brownies eggless?", a: "Yes — all our brownies are eggless, by default. We use plant-based binders and our signature millet base." },
  { q: "Do you use maida?", a: "Never. We work only with millet flours — ragi, foxtail, oats and buckwheat." },
  { q: "How sweet are they?", a: "Gently sweet. We use jaggery only, so the flavour is rounded and never sugary." },
  { q: "How long do they stay fresh?", a: "Storage instructions vary by product. Brownie cakes and cream cheese products must be refrigerated. Plain brownies are best within 3 days at room temperature." },
  { q: "Do you deliver across Pune?", a: "Yes. We deliver across Pune; pickup is also available from our Kharadi kitchen." },
  { q: "Can brownie cakes be customised?", a: "Absolutely. Share a message, theme or reference image — we'll make it yours." },
];

function FAQ() {
  return (
    <section className="section bg-[color:var(--cream-dark)]/40">
      <div className="container-prose grid gap-12 md:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Good to know.</h2>
          <p className="mt-4 text-muted-foreground">
            Anything else? Message us on{" "}
            <a href={WHATSAPP_PLAIN_URL} target="_blank" rel="noreferrer" className="underline-link text-foreground">WhatsApp</a> —
            we usually reply within an hour.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <ul className="divide-y divide-border/70">
            {faqs.map((f) => (
              <li key={f.q}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <span className="font-display text-lg md:text-xl">{f.q}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-lg transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground md:text-base">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="section">
      <div className="container-prose">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[color:var(--chocolate-dark)] px-6 py-16 text-center text-[color:var(--cream)] md:px-16 md:py-24">
            <div className="grain absolute inset-0 opacity-30" aria-hidden />
            <p className="eyebrow relative text-[color:var(--gold)]">Bake an order</p>
            <h2 className="relative mt-4 font-display text-4xl text-[color:var(--cream)] md:text-6xl">
              Hungry yet?
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-[color:var(--cream)]/80">
              Tell us what you'd like and when. We'll handle the rest — pickup from Kharadi
              or delivered fresh across Pune.
            </p>
            <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/order" className="btn-gold w-full sm:w-auto">Place an order</Link>
              <a href={WHATSAPP_PLAIN_URL} target="_blank" rel="noreferrer" className="btn-outline w-full border-[color:var(--cream)]/40 text-[color:var(--cream)] hover:bg-[color:var(--cream)] hover:text-[color:var(--chocolate-dark)] sm:w-auto">
                WhatsApp Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}