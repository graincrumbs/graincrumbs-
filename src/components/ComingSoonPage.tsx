import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { NotifyMeForm } from "@/components/NotifyMeForm";

export type ComingSoonContent = {
  eyebrow: string;
  productName: string;
  headline: React.ReactNode;
  intro: string;
  heroImage: string;
  pillars: { title: string; text: string }[];
  story: { title: string; paragraphs: string[] };
  faq: { q: string; a: string }[];
};

export function ComingSoonPage({ content }: { content: ComingSoonContent }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60 bg-[color:var(--cream-dark)]/40">
        <div className="absolute inset-0">
          <img
            src={content.heroImage}
            alt=""
            className="h-full w-full object-cover opacity-20 saturate-[0.9] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--cream)]/85 via-[color:var(--cream)]/95 to-[color:var(--cream)]" />
        </div>
        <div className="container-prose relative grid items-center gap-10 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <Reveal>
            <Link
              to="/"
              hash="collections"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--chocolate)] hover:text-[color:var(--chocolate-dark)]"
            >
              <span aria-hidden>←</span> Back to Our Collections
            </Link>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/60 bg-[color:var(--cream)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--chocolate)]">
              Coming Soon
            </span>
            <p className="divider-gold eyebrow mt-5">{content.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">{content.headline}</h1>
            <p className="mt-6 max-w-xl text-muted-foreground">{content.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#notify" className="btn-primary">Notify Me</a>
              <Link to="/brownies" className="btn-outline">Shop Classic</Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_60px_-28px_rgba(60,30,10,0.38)]">
              <img
                src={content.heroImage}
                alt={`${content.productName} preview`}
                className="h-full w-full object-cover saturate-[0.92] contrast-[1.05]"
                width={1200}
                height={1500}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What to expect</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Crafted with the same Grain Crumbs care.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="card-warm h-full p-7">
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose grid items-start gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="eyebrow">The story behind {content.productName}</p>
            <h2 className="mt-3 font-display text-4xl">{content.story.title}</h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              {content.story.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </Reveal>
          <div id="notify">
            <Reveal delay={150}>
              <NotifyMeForm productName={content.productName} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Questions</p>
            <h2 className="mt-3 font-display text-4xl">Good to know.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {content.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <div className="card-warm h-full p-6">
                  <h3 className="font-display text-xl">{f.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
