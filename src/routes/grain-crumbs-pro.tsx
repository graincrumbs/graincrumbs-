import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { NotifyMeForm } from "@/components/NotifyMeForm";
import {
  Leaf, Ban, TrendingDown, Heart, Wheat, Shield,
  CheckCircle2, Zap, Cookie, BadgeCheck, Dumbbell, Activity,
  Clock, Scale
} from "lucide-react";

export const Route = createFileRoute("/grain-crumbs-pro")({
  head: () => ({
    meta: [
      { title: "Grain Crumbs Pro — High-Protein Millet Brownies (Coming Soon)" },
      {
        name: "description",
        content:
          "Grain Crumbs Pro — a high-protein millet brownie designed for active lifestyles, with the same premium chocolate and clean-label promise. Coming soon.",
      },
      { property: "og:title", content: "Grain Crumbs Pro — Coming Soon" },
      {
        property: "og:description",
        content: "A high-protein millet brownie for active lifestyles. Coming soon from Grain Crumbs.",
      },
    ],
  }),
  component: Page,
});

const proImages = {
  hero: "/assets/grain-crumbs/pro/pro-hero.png",
  monkFruit: "/assets/grain-crumbs/pro/pro-monk-fruit.png",
  protein: "/assets/grain-crumbs/pro/pro-protein.png",
  millet: "/assets/grain-crumbs/pro/pro-millet.png",
  performance: "/assets/grain-crumbs/pro/pro-performance.png",
} as const;

const monkFruitBenefits = [
  { icon: Leaf, label: "Zero-calorie natural sweetener" },
  { icon: Ban, label: "No refined sugar" },
  { icon: TrendingDown, label: "Lower impact on blood sugar levels" },
  { icon: Shield, label: "Naturally sourced sweetness" },
  { icon: Heart, label: "Ideal for mindful eating" },
  { icon: CheckCircle2, label: "Sweetness without compromise" },
];

const proteinBenefits = [
  { icon: Dumbbell, label: "High-quality protein" },
  { icon: Activity, label: "Supports muscle recovery" },
  { icon: Shield, label: "Helps improve satiety" },
  { icon: Clock, label: "Keeps you fuller for longer" },
  { icon: Scale, label: "Better nutritional balance" },
  { icon: Zap, label: "Designed for active lifestyles" },
];

const milletBenefits = [
  { icon: Wheat, label: "Ragi, Foxtail Millet, Oats & Buckwheat" },
  { icon: Ban, label: "No Maida" },
  { icon: Leaf, label: "High in Fibre" },
  { icon: Cookie, label: "Premium Couverture Chocolate" },
  { icon: Shield, label: "No Artificial Colours" },
  { icon: BadgeCheck, label: "No Preservatives" },
];

const performanceBenefits = [
  { icon: Dumbbell, label: "Fitness-friendly" },
  { icon: Zap, label: "Protein enriched" },
  { icon: Scale, label: "Balanced nutrition" },
  { icon: Heart, label: "Mindful indulgence" },
  { icon: Activity, label: "Suitable for active lifestyles" },
  { icon: Cookie, label: "Everyday snack alternative" },
];

const comparisonRows = [
  {
    feature: "Sweetener",
    classic: "Jaggery",
    lite: "Jaggery + Monk Fruit",
    pro: "Monk Fruit",
  },
  {
    feature: "Protein",
    classic: "Naturally Present",
    lite: "Naturally Present",
    pro: "High Protein Added",
  },
  {
    feature: "Sugar Impact",
    classic: "Moderate",
    lite: "Lower",
    pro: "Minimal",
  },
  {
    feature: "Primary Focus",
    classic: "Wholesome Indulgence",
    lite: "Lower Sugar Lifestyle",
    pro: "Fitness & Performance",
  },
  {
    feature: "Best For",
    classic: "Everyday Treats",
    lite: "Mindful Dessert Lovers",
    pro: "Gym-Goers & Active Lifestyles",
  },
  {
    feature: "Calories",
    classic: "Standard",
    lite: "Reduced",
    pro: "Optimized for Performance",
  },
];

function HeartDivider() {
  return (
    <div className="mt-3 flex items-center gap-2">
      <span className="h-px w-8 bg-[color:var(--gold)]" />
      <Heart className="h-4 w-4 text-[color:var(--gold)]" />
      <span className="h-px w-8 bg-[color:var(--gold)]" />
    </div>
  );
}

function Page() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-[color:var(--cream-dark)]/40" />
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
            <p className="eyebrow mt-5 text-[color:var(--gold)]">Grain Crumbs · Pro</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[1.05] tracking-tight">
              Protein Meets
              <span className="block italic text-[color:var(--chocolate)]">Indulgence.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              High-protein brownies thoughtfully crafted for fitness enthusiasts, gym-goers and active lifestyles — because healthy eating should still feel indulgent.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#notify" className="btn-primary">Notify Me When Available</a>
              <Link to="/brownies" className="btn-outline">Back to Classic Collection</Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-warm)]">
              <img
                src={proImages.hero}
                alt="Grain Crumbs Pro — premium brownie stack"
                width={900}
                height={1100}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 01: MONK FRUIT ── */}
      <section className="section">
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-[color:var(--gold)]">01 · Naturally Sweet. Zero Compromise.</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Sweetened with Monk Fruit.</h2>
            <HeartDivider />
            <p className="mt-5 text-muted-foreground">
              At Grain Crumbs Pro, sweetness comes from monk fruit — a naturally derived zero-calorie sweetener loved by fitness enthusiasts worldwide.
            </p>
            <p className="mt-3 text-muted-foreground">
              Monk fruit allows us to deliver delicious brownies without unnecessary added sugars, helping you enjoy dessert while staying aligned with your health goals.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {monkFruitBenefits.map((b) => (
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
                src={proImages.monkFruit}
                alt="Monk fruit — natural zero-calorie sweetener"
                width={800}
                height={950}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 02: CLEAN PROTEIN ── */}
      <section className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
              <img
                src={proImages.protein}
                alt="Clean protein powder and fitness nutrition"
                width={800}
                height={950}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow text-[color:var(--gold)]">02 · Protein That Powers You</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Clean Protein.
              <span className="block italic">Real Benefits.</span>
            </h2>
            <HeartDivider />
            <p className="mt-5 text-muted-foreground">
              Every Grain Crumbs Pro brownie is enriched with high-quality protein to support active lifestyles.
            </p>
            <p className="mt-3 text-muted-foreground">
              Whether you're heading to the gym, recovering after a workout or simply looking for smarter snacking choices, Pro delivers nourishment and indulgence together.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {proteinBenefits.map((b) => (
                <div key={b.label} className="flex items-center gap-2.5 text-sm">
                  <b.icon className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 03: MILLET-BASED ── */}
      <section className="section">
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-[color:var(--gold)]">03 · Wholesome Ingredients. Honest Indulgence.</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Millet-Based. Better For You.</h2>
            <HeartDivider />
            <p className="mt-5 text-muted-foreground">
              Just like our Classic range, Grain Crumbs Pro remains proudly millet-first.
            </p>
            <p className="mt-3 text-muted-foreground">
              We use nutrient-rich millets combined with premium couverture chocolate and carefully selected ingredients to create brownies that are both wholesome and indulgent.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                src={proImages.millet}
                alt="Ragi, foxtail millet, oats, buckwheat and premium chocolate"
                width={800}
                height={950}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 04: PERFORMANCE ── */}
      <section className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
              <img
                src={proImages.performance}
                alt="Active fitness lifestyle — gym, workouts and healthy snacking"
                width={800}
                height={950}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow text-[color:var(--gold)]">04 · Performance Friendly</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Built For Everyday Performance.</h2>
            <HeartDivider />
            <p className="mt-5 text-muted-foreground">
              Grain Crumbs Pro is designed for those who believe nutrition and enjoyment can coexist.
            </p>
            <p className="mt-3 text-muted-foreground">
              Perfect as a post-workout treat, evening snack or a mindful dessert that supports your active lifestyle.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {performanceBenefits.map((b) => (
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
            <p className="eyebrow text-[color:var(--gold)]">Classic vs Pro</p>
            <h2 className="mt-3 font-display text-4xl text-[color:var(--cream)] md:text-5xl">
              Same Grain Crumbs Soul. Different Nutrition.
            </h2>
          </Reveal>
          <Reveal delay={200} className="mt-12">
            <p className="mb-2 text-center text-[10px] uppercase tracking-[0.18em] text-[color:var(--gold)]/60 md:hidden">
              ← Scroll to see all →
            </p>
            <div className="overflow-x-auto rounded-2xl border border-[color:var(--gold)]/30 [-webkit-overflow-scrolling:touch]">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="bg-[color:var(--chocolate)]/70 text-xs uppercase tracking-[0.2em] text-[color:var(--gold-soft)]">
                    <th className="px-4 py-5">Feature</th>
                    <th className="px-4 py-5">Classic</th>
                    <th className="px-4 py-5">Lite</th>
                    <th className="px-4 py-5 text-[color:var(--gold)]">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((r, i) => (
                    <tr key={r.feature} className={i % 2 ? "bg-white/[0.02]" : ""}>
                      <td className="px-4 py-4 font-medium uppercase tracking-wider text-[color:var(--gold-soft)]">{r.feature}</td>
                      <td className="px-4 py-4 text-[color:var(--cream)]/60">{r.classic}</td>
                      <td className="px-4 py-4 text-[color:var(--cream)]/60">{r.lite}</td>
                      <td className="px-4 py-4 font-semibold text-[color:var(--cream)]">{r.pro}</td>
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
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Our Pro Launch Journey.</h2>
            <p className="mt-4 text-muted-foreground">
              Our Pro range is undergoing extensive testing to ensure it delivers the same Grain Crumbs experience you already love.
              We will launch only when taste, texture and quality meet our standards.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Recipe Trials", desc: "Testing the perfect protein + flavour balance" },
              { step: "02", title: "Customer Tastings", desc: "Blind taste tests with our loyal customers" },
              { step: "03", title: "Final Refinement", desc: "Fine-tuning texture, taste and nutrition" },
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
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
              <img
                src={proImages.hero}
                alt="Grain Crumbs Pro — be the first to try"
                width={800}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow text-[color:var(--gold)]">Coming Soon</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Be The First To Try
              <span className="block italic text-[color:var(--chocolate)]">Grain Crumbs Pro.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join our waitlist and we'll notify you as soon as Grain Crumbs Pro launches.
            </p>
            <div className="mt-6">
              <NotifyMeForm productName="Grain Crumbs Pro" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-[color:var(--chocolate-dark)] px-6 py-12 text-center text-[color:var(--cream)] md:px-16 md:py-16">
              <div className="grain absolute inset-0 opacity-30" aria-hidden />
              <div className="relative flex flex-col items-center gap-8 md:flex-row md:text-left">
                <div className="flex flex-col items-center gap-4 md:items-start md:flex-1">
                  <Dumbbell className="h-8 w-8 text-[color:var(--gold)]" />
                  <p className="font-display text-xl text-[color:var(--cream)]">Currently in development.</p>
                  <p className="text-sm text-[color:var(--cream)]/70">
                    We're perfecting the recipe to deliver the ideal balance of taste, texture, nutrition and indulgence. Stay tuned.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 md:items-start md:flex-1">
                  <Activity className="h-8 w-8 text-[color:var(--gold)]" />
                  <p className="font-display text-xl text-[color:var(--cream)]">Tagline</p>
                  <p className="text-sm text-[color:var(--cream)]/70">
                    Protein-packed brownies, crafted the Grain Crumbs way.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 md:items-start md:flex-1">
                  <Heart className="h-8 w-8 text-[color:var(--gold)]" />
                  <p className="font-display text-xl text-[color:var(--cream)]">Promise</p>
                  <p className="text-sm text-[color:var(--cream)]/70">
                    Same clean ingredients. Same premium chocolate. Just more protein.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}