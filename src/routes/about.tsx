import { createFileRoute, Link } from "@tanstack/react-router";
import founderImg from "@/assets/founder.jpg";
import ingredients from "@/assets/ingredients.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Grain Crumbs" },
      { name: "description", content: "Grain Crumbs began with a mother looking for better treats for her toddler. Today, every batch is still made with the same care." },
      { property: "og:title", content: "Our Story — Grain Crumbs" },
      { property: "og:description", content: "Made for my daughter. Loved by everyone." },
    ],
  }),
  component: Page,
});

const values = [
  { title: "Ingredient-first", text: "We start with grains and chocolate worth the recipe — millets, jaggery, couverture." },
  { title: "Small batches", text: "Hand-finished, baked to order. The opposite of mass production." },
  { title: "Honest sweetness", text: "Jaggery only — never refined sugar. You'll taste the difference." },
  { title: "Quiet luxury", text: "Premium without the gloss. Beautiful without the noise." },
];

function Page() {
  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-prose py-20 text-center md:py-28">
          <p className="divider-gold eyebrow">Our Story</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl leading-tight md:text-6xl">
            Made for my daughter.
            <span className="block italic text-[color:var(--chocolate)]">Loved by everyone.</span>
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container-prose grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
              <img src={founderImg} alt="Ankita Jain, founder of Grain Crumbs" width={1024} height={1280} className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Founder · Ankita Jain</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              Hi, I'm <span className="italic text-[color:var(--chocolate)]">Ankita</span>
            </h2>
            <div className="mt-5 space-y-4 text-base text-muted-foreground md:space-y-5 md:text-lg">
              <p>
                Grain Crumbs was born from a simple question I kept asking myself as a mother:
              </p>
              <p className="font-display text-xl italic text-foreground md:text-2xl">
                Why should we have to choose between enjoying a treat and feeling good about its ingredients?
              </p>
              <p>
                As a working professional and a mom, I became more conscious about what was finding
                its way onto our plates. I wanted better options for my daughter — made with
                ingredients I could trust and feel comfortable sharing with my family.
              </p>
              <p>
                What started as small kitchen experiments soon grew into something much bigger.
                Today, Grain Crumbs is my humble attempt to create thoughtful treats made with
                ingredients like millets and natural sweeteners, without compromising on taste.
              </p>
              <p>
                The journey has been far from perfect — and that's what makes it special. Sometimes
                entrepreneurship means planning recipes and managing orders. Sometimes it means
                turning your lipstick into a marketing tool at an exhibition because you suddenly
                need a sign and have no marker handy! 😄
              </p>
              <p>
                I don't claim to be changing the world. This is simply my small contribution — a
                tiny drop in the ocean — in the hope that we can create a slightly better,
                healthier, and more mindful world for our children.
              </p>
              <p>
                Thank you for being part of this journey. 🤎
              </p>
              <p className="font-display text-2xl text-foreground">
                — Ankita Jain
                <span className="block text-sm not-italic tracking-[0.22em] uppercase text-muted-foreground">
                  Founder, Grain Crumbs
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What we believe</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Four quiet principles.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card-warm h-full p-8">
                  <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-display text-2xl">{v.title}</h3>
                  <p className="mt-3 text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-prose grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="eyebrow">The pantry</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Millets, jaggery, chocolate.</h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Our pantry is short and uncompromising. Ragi for depth. Foxtail for softness.
              Oats and buckwheat for structure. Jaggery for warmth. And the best couverture
              chocolate we can source.
            </p>
            <div className="mt-8">
              <Link to="/brownies" className="btn-primary">See the menu</Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-[2rem]">
              <img src={ingredients} alt="Millet grains and jaggery" loading="lazy" width={1600} height={1200} className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Behind the kitchen gallery — all images from public/assets (guaranteed to resolve) */}
      <section className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Behind the kitchen</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Real moments,
              <span className="italic text-[color:var(--chocolate)]"> real hands.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              From mise en place to corporate exhibitions — a quiet look at how every Grain Crumbs batch comes together.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <figure className="group overflow-hidden rounded-[1.75rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_22px_55px_-28px_rgba(60,30,10,0.42)]">
                <img
                  src="/assets/grain-crumbs/story/baking-setup.png"
                  alt="The Grain Crumbs kitchen — millet flours, walnuts and a fresh brownie tray on marble"
                  loading="lazy"
                  width={1200}
                  height={1500}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <figcaption className="px-5 py-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Mise en place · the home kitchen
                </figcaption>
              </figure>
            </Reveal>

            <Reveal className="md:col-span-7" delay={120}>
              <figure className="group overflow-hidden rounded-[1.75rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_22px_55px_-28px_rgba(60,30,10,0.42)]">
                <img
                  src="/assets/grain-crumbs/story/corporate-exhibition.png"
                  alt="Grain Crumbs tasting table at a corporate exhibition — labelled brownie flavours on a red-checked cloth"
                  loading="lazy"
                  width={1400}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <figcaption className="px-5 py-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  On the road · corporate exhibition, Pune
                </figcaption>
              </figure>
            </Reveal>

            <Reveal className="md:col-span-12" delay={200}>
              <figure className="group overflow-hidden rounded-[1.75rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_22px_55px_-28px_rgba(60,30,10,0.42)]">
                <img
                  src="/assets/grain-crumbs/story/hands-baking.png"
                  alt="Ankita preparing a fresh batch of brownies in the Grain Crumbs kitchen"
                  loading="lazy"
                  width={1600}
                  height={2200}
                  className="h-[70vh] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <figcaption className="px-5 py-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Every batch · weighed to the gram, no two alike
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
