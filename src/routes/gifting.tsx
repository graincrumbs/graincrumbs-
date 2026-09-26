import { createFileRoute } from "@tanstack/react-router";
import { Gift, Building2, HeartHandshake, Sparkles, Package } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP_ORDER_URL } from "@/lib/whatsapp";
import { GiftRecommender } from "@/components/ai/GiftRecommender";

export const Route = createFileRoute("/gifting")({
  head: () => ({
    meta: [
      { title: "Gifting — Grain Crumbs" },
      {
        name: "description",
        content:
          "Premium Grain Crumbs gifting with elegant brownie boxes, personalised presentation and delivery across Pune.",
      },
      { property: "og:title", content: "Gifting — Grain Crumbs" },
      {
        property: "og:description",
        content: "Premium brownie gifting with elegant presentation and personalised packaging.",
      },
    ],
  }),
  component: Page,
});

const gifting = "/assets/grain-crumbs/gifting-premium.png";
const giftingHamper = "/assets/grain-crumbs/gifting-hamper.png";

// Diwali 2026 corporate/bulk hamper range — using the client's own designed
// marketing images directly. Dhamaka & Shagun share one image (as she sent it).
const diwaliHampers = [
  {
    name: "Pastel Green Rajwadi",
    blurb: "3 brownies, clay diya, Gita shloka card, Roli Chawal & Kumkum, personalised thank-you card.",
    from: 369,
    bulkFrom: 320,
    image: "/assets/grain-crumbs/diwali-2026/diwali-01-pastel-green-rajwadi.jpg",
  },
  {
    name: "Peach Rajwadi",
    blurb: "3 brownies, clay diya, Gita shloka card, Roli Chawal & Kumkum, personalised thank-you card.",
    from: 379,
    bulkFrom: 330,
    image: "/assets/grain-crumbs/diwali-2026/diwali-02-peach-rajwadi.jpg",
  },
  {
    name: "Diwali Dhamaka Blue Box",
    blurb: "4 brownie pieces including Cappuccino Walnut, personalised thank-you card included.",
    from: 314,
    bulkFrom: 264,
    image: "/assets/grain-crumbs/diwali-2026/diwali-03-blue-boxes-dhamaka-shagun.jpg",
  },
  {
    name: "Diwali Shagun Blue Box",
    blurb: "4 brownie pieces including Cappuccino Walnut, personalised thank-you card included.",
    from: 290,
    bulkFrom: 240,
    image: "/assets/grain-crumbs/diwali-2026/diwali-03-blue-boxes-dhamaka-shagun.jpg",
  },
  {
    name: "Diwali Mode On",
    blurb: "3 brownies, Roli Chawal & Kumkum dome glass bottle, personalised thank-you card.",
    from: 300,
    bulkFrom: 250,
    image: "/assets/grain-crumbs/diwali-2026/diwali-04-mode-on.jpg",
  },
] as const;


const useCases = [
  { icon: Gift, title: "Birthdays", text: "A premium box that feels celebratory before it's even opened." },
  { icon: Building2, title: "Office Gifting", text: "Elegant gifting for teams, founders, clients and festive drops." },
  { icon: HeartHandshake, title: "Thank You Gifts", text: "Thoughtful enough for personal notes and meaningful delivery." },
  { icon: Sparkles, title: "Festive Hampers", text: "Warm, polished presentation for seasonal gifting moments." },
  { icon: Package, title: "Bulk Orders", text: "Consistent packaging and premium presentation at larger quantities." },
];

function Page() {
  return (
    <>
      <section className="border-b border-border/60 bg-[color:var(--cream-dark)]/35">
        <div className="container-prose grid items-center gap-12 py-20 md:grid-cols-[0.92fr_1.08fr] md:py-28">
          <Reveal>
            <p className="divider-gold eyebrow">Gifting</p>
            <h1 className="mt-5 font-display text-5xl md:text-6xl">
              Sweet gestures,
              <span className="block italic text-[color:var(--chocolate)]"> beautifully presented.</span>
            </h1>
            <p className="mt-6 max-w-md text-muted-foreground">
              Beautifully packed treats for thoughtful gifting, celebrations, office orders and special occasions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noreferrer" className="btn-primary w-full sm:w-auto">Request a Quote</a>
              <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noreferrer" className="btn-outline w-full sm:w-auto">WhatsApp Us</a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_60px_-28px_rgba(60,30,10,0.38)]">
              <img src={gifting} alt="Grain Crumbs premium gifting box with gold ribbon" width={1200} height={1800} className="h-full w-full object-cover saturate-[0.93] contrast-[1.04] brightness-[0.99]" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-prose grid gap-10 md:grid-cols-[1.02fr_0.98fr] md:items-start">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_60px_-28px_rgba(60,30,10,0.38)]">
              <img src={giftingHamper} alt="Grain Crumbs kraft gifting hamper with gold-foiled brownies and ribbon" loading="lazy" width={1200} height={1200} className="h-full w-full object-cover saturate-[0.93] contrast-[1.04] brightness-[0.99]" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow">Perfect for</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Elegant gifting, kept simple.</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {useCases.map((u, i) => (
                <Reveal key={u.title} delay={i * 70}>
                  <div className="card-warm h-full p-6">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--cream-dark)] text-[color:var(--chocolate)] ring-1 ring-[color:var(--gold)]/40">
                      <u.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-xl">{u.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{u.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-[color:var(--cream-dark)]/25">
        <div className="container-prose py-16 md:py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Corporate &amp; Bulk · Diwali 2026</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Diwali Gifting for Your Team.</h2>
            <p className="mt-4 text-muted-foreground">
              Millet brownie hampers, sweetened naturally with jaggery and made with real, honest
              ingredients. Pre-orders are open — place your order before 1st November.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {diwaliHampers.map((h, i) => (
              <Reveal key={h.name} delay={i * 80}>
                <div className="card-warm flex h-full flex-col overflow-hidden p-0">
                  <img
                    src={h.image}
                    alt={`${h.name} — Diwali hamper pricing and details`}
                    loading="lazy"
                    className="w-full object-cover object-top"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl">{h.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{h.blurb}</p>
                    <p className="mt-3 text-sm font-medium text-[color:var(--chocolate)]">
                      From ₹{h.from} · Bulk from ₹{h.bulkFrom} each
                    </p>
                    <a
                      href={`https://wa.me/918208257574?text=${encodeURIComponent(
                        `Hi Grain Crumbs! I'd like to enquire about the ${h.name} Diwali hamper.\n\nQuantity:\nDelivery Address:\nCompany Name (for thank-you card, if any):`,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline mt-5 w-full"
                    >
                      WhatsApp for {h.name}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
            <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noreferrer" className="btn-primary w-full sm:w-auto">
              Bulk Order Enquiry (50+ units)
            </a>
            <p className="text-sm text-muted-foreground">
              Custom flavours, quantities or card messages? WhatsApp us and we'll tailor it for you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60 bg-[color:var(--cream-dark)]/25">
        <div className="container-prose py-16 md:py-20">
          <Reveal>
            <GiftRecommender />
          </Reveal>
        </div>
      </section>
    </>
  );
}
