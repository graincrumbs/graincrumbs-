import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { NotifyMeForm } from "@/components/NotifyMeForm";
import {
  Heart, Gift, Package, Wheat, Leaf, Ban,
  BadgeCheck, Star, Cookie, Sparkles, Users
} from "lucide-react";

export const Route = createFileRoute("/cookie-tins")({
  head: () => ({
    meta: [
      { title: "Cookie Cake Tins — Premium Cookie Gifting (Coming Soon)" },
      { name: "description", content: "Grain Crumbs Cookie Cake Tins — classic and millet cookies, beautifully packed for gifting. Launching soon." },
      { property: "og:title", content: "Cookie Cake Tins — Coming Soon" },
      { property: "og:description", content: "Handcrafted Cookie Cake Tins for gifting. Classic and millet varieties. Coming soon from Grain Crumbs." },
    ],
  }),
  component: Page,
});

const classicBenefits = [
  { icon: Star, label: "Authentic bakery-style experience" },
  { icon: Cookie, label: "Premium butter, maida & chocolate" },
  { icon: Gift, label: "Perfect for celebrations & gifting" },
  { icon: Heart, label: "Made for sharing special moments" },
  { icon: Sparkles, label: "Rich, indulgent and nostalgic flavours" },
];

const milletBenefits = [
  { icon: Wheat, label: "Crafted with wholesome millets" },
  { icon: Leaf, label: "Sweetened with jaggery" },
  { icon: Cookie, label: "Small batch baked" },
  { icon: Ban, label: "No preservatives" },
  { icon: BadgeCheck, label: "Handcrafted with real ingredients" },
];

const giftingBenefits = [
  { icon: Heart, label: "Personal gifting" },
  { icon: Users, label: "Corporate gifting" },
  { icon: Sparkles, label: "Festive gifting" },
  { icon: Package, label: "Custom message cards" },
  { icon: Gift, label: "Premium packaging" },
];

const comparisonRows = [
  { feature: "Flour Base", classic: "Premium Maida", millet: "Millet Flour Blend" },
  { feature: "Sweetener", classic: "Sugar", millet: "Jaggery" },
  { feature: "Taste", classic: "Traditional Bakery Style", millet: "Wholesome & Rustic" },
  { feature: "Best For", classic: "Celebrations & Gifting", millet: "Everyday Mindful Treats" },
  { feature: "Texture", classic: "Rich & Buttery", millet: "Soft & Hearty" },
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
      <section className="relative overflow-hidden border-b border-border/60 bg-[color:var(--cream-dark)]/40">
        <div className="container-prose relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <Link to="/brownies" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--chocolate)] hover:text-[color:var(--chocolate-dark)]">
              <span aria-hidden>←</span> Explore Our Brownies
            </Link>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/60 bg-[color:var(--cream)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--chocolate)]">
              Coming Soon
            </span>
            <p className="eyebrow mt-5 text-[color:var(--gold)]">Grain Crumbs · Cookie Cake Tins</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[1.05] tracking-tight">
              Cookies Worth
              <span className="block italic text-[color:var(--chocolate)]">Sharing.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Thoughtfully baked Cookie Cake Tins crafted for gifting, celebrations and everyday indulgence. Whether you love classic flavours or wholesome millet creations, there's a Grain Crumbs Cookie Cake Tin waiting for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#notify" className="btn-primary">Notify Me When Available</a>
              <Link to="/brownies" className="btn-outline">Explore Our Brownies</Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-warm)]" style={{ maskImage: "radial-gradient(ellipse 85% 90% at 50% 50%, black 42%, transparent 84%)" }}>
              <img src="/assets/grain-crumbs/cookie-tins/cookie-main-new.png" alt="Beautifully arranged Cookie Cake Tin with assorted cookies" width={900} height={1000} className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 01: TWO RANGES ── */}
      <section className="section">
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-[color:var(--gold)]">01 · Two Ways to Indulge</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Choose Your Cookie Story.</h2>
            <HeartDivider />
            <p className="mt-5 text-muted-foreground">At Grain Crumbs, we believe everyone deserves cookies they love.</p>
            <p className="mt-3 text-muted-foreground">Our upcoming collection will feature two thoughtfully crafted ranges:</p>
            <div className="mt-6 space-y-4">
              <div className="card-warm p-5">
                <div className="flex items-center gap-3">
                  <Cookie className="h-5 w-5 text-[color:var(--gold)]" />
                  <h3 className="font-display text-xl">Classic Cookie Cake Tins</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Timeless flavours made for pure indulgence.</p>
              </div>
              <div className="card-warm p-5">
                <div className="flex items-center gap-3">
                  <Wheat className="h-5 w-5 text-[color:var(--gold)]" />
                  <h3 className="font-display text-xl">Millet Cookie Cake Tins</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Wholesome creations made with nourishing millets and jaggery.</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground italic">Whichever you choose, every batch will be baked fresh, in small quantities and with the same Grain Crumbs love.</p>
          </Reveal>
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-[2rem]" style={{ maskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 40%, transparent 82%)" }}>
              <img src="/assets/grain-crumbs/cookie-tins/Choose-cookie.png" alt="Classic and millet cookies side by side" width={800} height={900} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 02: CLASSIC ── */}
      <section className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem]" style={{ maskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 40%, transparent 82%)" }}>
              <img src="/assets/grain-crumbs/cookie-tins/classic-cookie.png" alt="Luxurious classic Cookie Cake Tin" width={800} height={900} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow text-[color:var(--gold)]">02 · Classic Collection</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Classic Cookie Cake Tins.</h2>
            <HeartDivider />
            <p className="mt-5 text-muted-foreground">For those who love traditional bakery-style cookies.</p>
            <p className="mt-3 text-muted-foreground">Expect rich flavours, comforting textures and familiar favourites — perfect for celebrations, gifting and sharing with loved ones.</p>

            <div className="mt-5 rounded-2xl border border-[color:var(--gold)]/30 bg-[color:var(--cream-dark)]/50 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--chocolate)]">
                🍪 A Note From Grain Crumbs
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                At Grain Crumbs, most of our products are millet-based and jaggery sweetened. However, for our Classic Cookie Cake Tins, we use premium maida and sugar to recreate the traditional bakery-style cookie experience that many customers love for celebrations and gifting.
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed italic">
                If you're looking for a wholesome alternative, do explore our Millet Cookie Tin collection.
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--chocolate)]">Flavours</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Vanilla", "Red Velvet", "Oozy Dark Chocolate", "Pistachio", "Biscoff"].map((f) => (
                  <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">{f}</span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {classicBenefits.map((b) => (
                <div key={b.label} className="flex items-center gap-2.5 text-sm">
                  <b.icon className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 03: MILLET ── */}
      <section className="section">
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-[color:var(--gold)]">03 · Wholesome Collection</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Millet Cookie Cake Tins.</h2>
            <HeartDivider />
            <p className="mt-5 text-muted-foreground">Our millet Cookie Cake Tins are thoughtfully crafted using wholesome ingredients including millets and jaggery, bringing together nourishment and delicious flavours.</p>
            <p className="mt-3 text-muted-foreground">Perfect for families looking for mindful snacking options without compromising on taste.</p>

            <div className="mt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--chocolate)]">Flavours</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Oozy Dark Chocolate", "Red Velvet", "Pistachio", "Biscoff"].map((f) => (
                  <span key={f} className="rounded-full border border-[color:var(--gold)]/40 bg-[color:var(--cream-dark)]/60 px-3 py-1 text-xs font-medium">{f}</span>
                ))}
              </div>
            </div>

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
            <div className="overflow-hidden rounded-[2rem]" style={{ maskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 40%, transparent 82%)" }}>
              <img src="/assets/grain-crumbs/cookie-tins/millet-cookie.png" alt="Rustic millet cookies surrounded by ragi, oats, foxtail millet and jaggery" width={800} height={900} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 04: GIFTING ── */}
      <section className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem]" style={{ maskImage: "radial-gradient(ellipse 88% 88% at 50% 50%, black 40%, transparent 82%)" }}>
              <img src="/assets/grain-crumbs/gifting-hamper.png" alt="Beautifully packed Cookie Cake Tin gift with ribbons and dried flowers" width={800} height={900} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow text-[color:var(--gold)]">04 · Gifting Made Special</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Thoughtful Gifting, Beautifully Packed.</h2>
            <HeartDivider />
            <p className="mt-5 text-muted-foreground">Whether it's birthdays, festivals, return gifts, corporate gifting or simply sending love, our Cookie Cake Tins are designed to make every occasion memorable.</p>
            <p className="mt-3 text-muted-foreground">Beautiful packaging and handcrafted cookies come together to create gifts people truly remember.</p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {giftingBenefits.map((b) => (
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
            <p className="eyebrow text-[color:var(--gold)]">Find Your Perfect Cookie Cake Tin</p>
            <h2 className="mt-3 font-display text-4xl text-[color:var(--cream)] md:text-5xl">Classic or Millet?</h2>
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
                    <th className="px-4 py-5">Classic Collection</th>
                    <th className="px-4 py-5 text-[color:var(--gold)]">Millet Collection</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((r, i) => (
                    <tr key={r.feature} className={i % 2 ? "bg-white/[0.02]" : ""}>
                      <td className="px-4 py-4 font-medium uppercase tracking-wider text-[color:var(--gold-soft)]">{r.feature}</td>
                      <td className="px-4 py-4 text-[color:var(--cream)]/70">{r.classic}</td>
                      <td className="px-4 py-4 font-semibold text-[color:var(--cream)]">{r.millet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-center text-sm italic text-[color:var(--cream)]/70">
              "Every celebration deserves a little indulgence. Choose Classic for timeless bakery flavours or Millet for a more wholesome experience. Different moments call for different treats — and we're happy to bake both."
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── LAUNCH TIMELINE ── */}
      <section className="section">
        <div className="container-prose">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Currently in Development</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Our Cookie Cake Tin Journey.</h2>
            <p className="mt-4 text-sm text-muted-foreground">We're currently testing recipes and flavours to bring you the perfect Cookie Cake Tin experience.</p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Recipe Trials", desc: "Testing flavour combinations and textures" },
              { step: "02", title: "Customer Tastings", desc: "Getting feedback from our loyal community" },
              { step: "03", title: "Final Flavour Selection", desc: "Curating the perfect mix for each tin" },
              { step: "04", title: "Launch", desc: "Notify Me waitlist gets first access" },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 80}>
                <a href="#notify" className="block h-full no-underline" aria-label="Join the waitlist">
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

      {/* ── NOTIFY ── */}
      <section id="notify" className="section bg-[color:var(--cream-dark)]/40">
        <div className="container-prose">
          <div className="mx-auto max-w-2xl">
            <Reveal className="text-center">
              <p className="eyebrow">Join the Waitlist</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Be The First To Taste Our Cookie Cake Tins.</h2>
              <p className="mt-4 text-muted-foreground">Join our waitlist and we'll let you know the moment Cookie Cake Tins are available.</p>
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <NotifyMeForm productName="Cookie Cake Tins" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="section">
        <div className="container-prose">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-[color:var(--chocolate-dark)] px-6 py-12 text-center text-[color:var(--cream)] md:px-16 md:py-16">
              <div className="grain absolute inset-0 opacity-30" aria-hidden />
              <p className="relative eyebrow text-[color:var(--gold)]">Cookie Cake Tins</p>
              <h2 className="relative mt-3 font-display text-3xl text-[color:var(--cream)] md:text-4xl">Handcrafted cookies. Small batches. Made with love.</h2>
              <p className="relative mx-auto mt-4 max-w-lg text-[color:var(--cream)]/80 text-sm">We're carefully testing flavours, textures and packaging to create Cookie Cake Tins you'll truly love.</p>
              <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <a href="#notify" className="btn-gold w-full sm:w-auto">Notify Me When Available</a>
                <Link to="/brownies" className="btn-outline w-full border-[color:var(--cream)]/40 text-[color:var(--cream)] hover:bg-[color:var(--cream)] hover:text-[color:var(--chocolate-dark)] sm:w-auto">Explore Our Brownies</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}