import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useLiveProducts, type Product } from "@/lib/use-products";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP_PLAIN_URL } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export const Route = createFileRoute("/brownies")({
  head: () => ({
    meta: [
      { title: "Brownies — Grain Crumbs" },
      { name: "description", content: "Six signature millet brownie flavours, baked fresh in Pune. Made with jaggery and couverture chocolate." },
      { property: "og:title", content: "Brownies — Grain Crumbs" },
      { property: "og:description", content: "Explore our six signature millet brownie flavours." },
    ],
  }),
  component: BrowniesPage,
});

const photoTreatment = "h-full w-full object-cover saturate-[0.92] contrast-[1.05] brightness-[0.98]";

function BrowniesPage() {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { products: flavours } = useLiveProducts();

  // Track premium topping selection independently per flavour slug
  const [premiumToppings, setPremiumToppings] = useState<Record<string, boolean>>({});

  const handleAddToCart = (f: Product) => {
    const hasPremium = premiumToppings[f.slug] ?? false;
    const premiumLabel = f.premiumToppingLabel;
    addItem({
      slug: f.slug,
      name: hasPremium ? `${f.name} + ${premiumLabel}` : f.name,
      price: hasPremium ? f.price + f.premiumToppingPrice : f.price,
      image: f.image,
    });
    toast.success(`${f.name} added to cart`, {
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
            <p className="divider-gold eyebrow">Brownies</p>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] md:text-6xl">
              Brownies that taste like
              <span className="block italic text-[color:var(--chocolate)]">a little ceremony.</span>
            </h1>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Six signature flavours, all built on our millet-and-jaggery base. Baked to order, hand-finished, and never mass produced — without a grain of maida.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/order" className="btn-primary">Order Brownies</Link>
              <a href={WHATSAPP_PLAIN_URL} target="_blank" rel="noreferrer" className="btn-outline">Chat on WhatsApp</a>
              <a href="#menu" className="btn-outline">View Menu &amp; Pricing</a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_60px_-28px_rgba(60,30,10,0.42)]">
              <img
                src="/assets/grain-crumbs/hero-premium.png"
                alt="Grain Crumbs signature millet brownies"
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
            <h2 className="mt-3 font-display text-4xl md:text-5xl">The signature six.</h2>
            <p className="mt-4 text-muted-foreground">All brownies are baked fresh to order in Pune. Minimum order quantities apply to filled flavours.</p>
          </Reveal>

          <div className="mt-14 grid gap-10">
            {flavours.map((f, i) => {
              const hasPremium = premiumToppings[f.slug] ?? false;
              const displayPrice = hasPremium ? f.price + f.premiumToppingPrice : f.price;

              return (
                <Reveal key={f.slug} delay={i * 50}>
                  <article id={f.slug} className={`grid items-center gap-8 scroll-mt-24 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
                    <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_60px_-28px_rgba(60,30,10,0.38)]">
                      <img
                        src={f.image}
                        alt={f.name}
                        loading="lazy"
                        width={1024}
                        height={1280}
                        className={photoTreatment}
                      />
                    </div>
                    <div>
                      <p className="eyebrow">{`0${i + 1}`}</p>
                      <h3 className="mt-3 font-display text-4xl md:text-5xl">{f.name}</h3>
                      <div className="mt-3 flex flex-wrap items-baseline gap-3">
                        <p className="italic text-[color:var(--gold)]">{f.tagline}</p>
                        <span className="font-display text-2xl text-[color:var(--chocolate)]">
                          ₹{displayPrice}
                          {hasPremium && (
                            <span className="ml-2 text-base font-normal text-muted-foreground line-through">₹{f.price}</span>
                          )}
                        </span>
                      </div>
                      <p className="mt-5 max-w-md text-muted-foreground">{f.description}</p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {f.notes.map((n) => (
                          <li key={n} className="rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            {n}
                          </li>
                        ))}
                      </ul>

                      {/* Premium Chocolate Toppings add-on */}
                      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--cream-dark)]/40 px-4 py-3 text-sm transition hover:border-[color:var(--gold)]/70 hover:bg-[color:var(--cream-dark)]/70">
                        <input
                          type="checkbox"
                          checked={hasPremium}
                          onChange={(e) =>
                            setPremiumToppings((prev) => ({ ...prev, [f.slug]: e.target.checked }))
                          }
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[color:var(--chocolate-dark)]"
                        />
                        <span>
                          <span className="font-medium text-foreground">{f.premiumToppingLabel}</span>
                          <span className="ml-2 font-semibold text-[color:var(--gold)]">+₹{f.premiumToppingPrice}</span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">Available at an additional ₹{f.premiumToppingPrice} per order</span>
                        </span>
                      </label>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(f)}
                          className="btn-primary w-full sm:w-auto"
                        >
                          Add to cart
                        </button>
                        <Link to="/cart" className="btn-outline w-full sm:w-auto">View cart</Link>
                        <a href={WHATSAPP_PLAIN_URL} target="_blank" rel="noreferrer" className="btn-outline w-full sm:w-auto">Ask on WhatsApp</a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}