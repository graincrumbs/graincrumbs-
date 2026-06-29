import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { NotifyMeForm } from "@/components/NotifyMeForm";
import {
  Leaf, Ban, TrendingDown, Heart, Wheat, Shield, Star,
  CheckCircle2, Zap, Cookie, BadgeCheck, ArrowRight, Clock
} from "lucide-react";

export const Route = createFileRoute("/grain-crumbs-lite")({
  head: () => ({
    meta: [
      { title: "Grain Crumbs Lite — Lower-Sugar Millet Brownies (Coming Soon)" },
      {
        name: "description",
        content:
          "Grain Crumbs Lite — a lighter, lower-GI millet brownie sweetened with jaggery and monk fruit. Coming soon. Sign up to be notified at launch.",
      },
      { property: "og:title", content: "Grain Crumbs Lite — Coming Soon" },
      {
        property: "og:description",
        content: "A lighter, lower-sugar millet brownie. Coming soon from Grain Crumbs.",
      },
    ],
  }),
  component: Page,
});

const liteImages = {
  hero: "/assets/grain-crumbs/lite/lite-hero.png",
  monkFruit: "/assets/grain-crumbs/lite/lite-monk-fruit.png",
  millet: "/assets/grain-crumbs/lite/lite-millet.png",
  chocolate: "/assets/grain-crumbs/lite/lite-chocolate.png",
} as const;

const monkFruitBenefits = [
  { icon: Leaf, label: "Reduced added sugar" },
  { icon: TrendingDown, label: "Lower GI positioning" },
  { icon: Star, label: "Naturally derived sweetener" },
  { icon: Shield, label: "Sweetness without overwhelming sugar levels" },
  { icon: Heart, label: "Supports mindful indulgence" },
  { icon: CheckCircle2, label: "Zero refined sugar" },
];

const milletBenefits = [
  { icon: Wheat, label: "Millet-first recipe" },
  { icon: Leaf, label: "Source of fibre" },
  { icon: Ban, label: "No maida" },
  { icon: Zap, label: "More wholesome than conventional brownies" },
  { icon: Cookie, label: "Same fudgy experience" },
  { icon: CheckCircle2, label: "Made fresh to order" },
];

const chocolateBenefits = [
  { icon: Cookie, label: "Rich chocolate flavour" },
  { icon: BadgeCheck, label: "Premium couverture chocolate" },
  { icon: Zap, label: "Deep cocoa experience" },
  { icon: Heart, label: "Crafted for true brownie lovers" },
];

const comparisonRows = [
  { feature: "Sweetener", classic: "Jaggery", lite: "Jaggery + Monk Fruit" },
  { feature: "Sweetness Style", classic: "Traditional sweetness", lite: "Reduced added sugar" },
  { feature: "Positioning", classic: "Everyday indulgence", lite: "Lower GI positioning" },
  { feature: "Recipe", classic: "Original recipe", lite: "Thoughtfully reformulated" },
  { feature: "Chocolate", classic: "Premium Couverture", lite: "Premium Couverture" },
  { feature: "Preservatives", classic: "None", lite: "None" },
];

function Page() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-border/60 bg-[color:var(--cream-dark)]/40">
        <div className="absolute inset-0 bg-[url('/assets/grain-crumbs/lite/lite-hero.png')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--cream)]/90 to-[color:var(--cream)]" />
        <div className="container-prose relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <Link
              to="/"
              hash="collections"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--chocolate)] hover:text-[color:var(--chocolate-dark)]"
            >
              <span aria-hidden>←</span> Back to Classic Collection
            </Link>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/60 bg-[color:var(--cream)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--chocolate)]">
              Coming Soon
            </span>
            <p className="eyebrow mt-5 text-[color:var(--gold)]">Grain Crumbs · Lite</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[1.05] tracking-tight">
              Grain Crumbs Lite.
              <span className="block italic text-[color:var(--chocolate)]">Lighter sweetness. Same indulgence.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Thoughtfully crafted for people who want to enjoy dessert with reduced added sugar — without compromising on taste.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#notify" className="btn-primary">Notify Me When Available</a>
              <Link to="/brownies" className="btn-outline">Back to Classic</Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-warm)]">
              <img
                src={liteImages.hero}
                alt="Grain Crumbs Lite brownies"
                width={900}
                height={1100}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 1: WHY MONK FRUIT ── */}
      <section className="section">
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
              <img
                src={liteImages.monkFruit}
                alt="Monk fruit — natural zero-calorie sweetener"
                width={800}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow text-[color:var(--gold)]">01 · Why Monk Fruit?</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Why Monk Fruit?</h2>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[color:var(--gold)]" />
              <Heart className="h-4 w-4 text-[color:var(--gold)]" />
              <span className="h-px w-8 bg-[color:var(--gold)]" />
            </div>
            <p className="mt-5 text-muted-foreground">
              Monk fruit is a naturally sweet fruit used for centuries.
            </p>
            <p className="mt-3 text-muted-foreground">
              We are combining monk fruit with jaggery to reduce added sugar while preserving the rich Grain Crumbs experience.
            </p>
            <p className="mt-3 font-medium text-muted-foreground">Key Benefits</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {monkFruitBenefits.map((b) => (
                <div key={b.label} className="flex items-center gap-2.5 text-sm">
                  <b.icon className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 2: MILLET STORY ── */}
      <section className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-[color:var(--gold)]">02 · The Millet Story</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">The Grain Crumbs Foundation.</h2>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[color:var(--gold)]" />
              <Heart className="h-4 w-4 text-[color:var(--gold)]" />
              <span className="h-px w-8 bg-[color:var(--gold)]" />
            </div>
            <p className="mt-5 text-muted-foreground">
              Every Grain Crumbs brownie begins with wholesome millets.
            </p>
            <p className="mt-3 text-muted-foreground">
              Our signature blend includes ragi, foxtail millet, oats and buckwheat — never maida.
            </p>
            <p className="mt-3 font-medium text-muted-foreground">Benefits</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {milletBenefits.map((b) => (
                <div key={b.label} className="flex items-center gap-2.5 text-sm">
                  <b.icon className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
              <img
                src={liteImages.millet}
                alt="Ragi, foxtail millet, oats and buckwheat — Grain Crumbs millet blend"
                width={800}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 3: PREMIUM CHOCOLATE ── */}
      <section className="section">
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
              <img
                src={liteImages.chocolate}
                alt="Premium couverture chocolate"
                width={800}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow text-[color:var(--gold)]">03 · Premium Chocolate</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Premium Chocolate. Always.</h2>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[color:var(--gold)]" />
              <Heart className="h-4 w-4 text-[color:var(--gold)]" />
              <span className="h-px w-8 bg-[color:var(--gold)]" />
            </div>
            <p className="mt-5 text-muted-foreground">
              Lite does not mean compromise.
            </p>
            <p className="mt-3 text-muted-foreground">
              We continue using premium couverture chocolate because indulgence should still feel indulgent.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {chocolateBenefits.map((b) => (
                <div key={b.label} className="flex items-center gap-2.5 text-sm">
                  <b.icon className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="section bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]">
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-[color:var(--gold)]">Classic vs Lite</p>
            <h2 className="mt-3 font-display text-4xl text-[color:var(--cream)] md:text-5xl">
              Same soul. Different sweetness.
            </h2>
          </Reveal>
          <Reveal delay={200} className="mt-12">
            <p className="mb-2 text-center text-[10px] uppercase tracking-[0.18em] text-[color:var(--gold)]/60 md:hidden">
              ← Scroll to see all →
            </p>
            <div className="overflow-x-auto rounded-2xl border border-[color:var(--gold)]/30 [-webkit-overflow-scrolling:touch]">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="bg-[color:var(--chocolate)]/70 text-xs uppercase tracking-[0.2em] text-[color:var(--gold-soft)]">
                    <th className="px-4 py-5">Feature</th>
                    <th className="px-4 py-5">Classic</th>
                    <th className="px-4 py-5 text-[color:var(--gold)]">Lite</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((r, i) => (
                    <tr key={r.feature} className={i % 2 ? "bg-white/[0.02]" : ""}>
                      <td className="px-4 py-4 font-medium uppercase tracking-wider text-[color:var(--gold-soft)]">{r.feature}</td>
                      <td className="px-4 py-4 text-[color:var(--cream)]/70">{r.classic}</td>
                      <td className="px-4 py-4 font-semibold text-[color:var(--cream)]">{r.lite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── LAUNCH TIMELINE ── */}
      <section className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Currently in Development</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Our Lite Launch Journey.</h2>
            <p className="mt-4 text-muted-foreground">
              Our Lite range is undergoing extensive testing to ensure it delivers the same Grain Crumbs experience you already love.
              We will launch only when taste, texture and quality meet our standards.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Recipe Trials", desc: "Testing the perfect jaggery + monk fruit ratio" },
              { step: "02", title: "Customer Tastings", desc: "Blind taste tests with our loyal customers" },
              { step: "03", title: "Final Refinement", desc: "Fine-tuning texture, taste and chocolate balance" },
              { step: "04", title: "Launch", desc: "Notify Me waitlist gets first access" },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 80}>
                <a
                  href="#notify"
                  className="block h-full no-underline"
                  aria-label="Join the waitlist"
                >
                  <div className="card-warm h-full p-6 cursor-pointer transition-shadow hover:shadow-[var(--shadow-warm)]">
                    <span className="font-display text-4xl text-[color:var(--gold)] opacity-60">{s.step}</span>
                    <h3 className="mt-3 font-display text-xl">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTIFY FORM ── */}
      <section id="notify" className="section">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl">
            <Reveal className="text-center">
              <p className="eyebrow">Join the Waitlist</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Be the first to taste Grain Crumbs Lite.</h2>
              <p className="mt-4 text-muted-foreground">
                Join our waitlist and we'll notify you personally when Lite launches.
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <NotifyMeForm productName="Grain Crumbs Lite" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-[color:var(--chocolate-dark)] px-6 py-12 text-center text-[color:var(--cream)] md:px-16 md:py-16">
              <div className="grain absolute inset-0 opacity-30" aria-hidden />
              <p className="relative eyebrow text-[color:var(--gold)]">Grain Crumbs Lite</p>
              <h2 className="relative mt-3 font-display text-3xl text-[color:var(--cream)] md:text-4xl">
                Lighter brownies, crafted the Grain Crumbs way.
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-[color:var(--cream)]/80 text-sm">
                We're perfecting the recipe to deliver the ideal balance of taste, texture and reduced sugar. Stay tuned.
              </p>
              <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <a href="#notify" className="btn-gold w-full sm:w-auto">Notify Me When Available</a>
                <Link to="/brownies" className="btn-outline w-full border-[color:var(--cream)]/40 text-[color:var(--cream)] hover:bg-[color:var(--cream)] hover:text-[color:var(--chocolate-dark)] sm:w-auto">
                  Shop Classic Brownies
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}