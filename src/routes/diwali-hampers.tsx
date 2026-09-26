import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { diwaliHampers } from "@/lib/diwali-hampers";
import { DiwaliHamperCard } from "@/components/DiwaliHamperCard";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/diwali-hampers")({
  head: () => ({
    meta: [
      { title: "Diwali Corporate Hampers 2026 — Grain Crumbs" },
      {
        name: "description",
        content:
          "Millet brownie Diwali hampers for corporate & bulk gifting. Sweetened naturally with jaggery. Order online or on WhatsApp. Pre-orders close 1st November.",
      },
    ],
  }),
  component: DiwaliHampersPage,
});

function DiwaliHampersPage() {
  const { itemCount } = useCart();

  return (
    <>
      <SiteHeader />

      <section className="border-b border-border/60 bg-[color:var(--cream-dark)]/35">
        <div className="container-prose py-16 text-center md:py-20">
          <p className="divider-gold eyebrow mx-auto">Corporate &amp; Bulk · Diwali 2026</p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">Diwali Gifting for Your Team</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Millet brownie hampers, sweetened naturally with jaggery. Add to cart with live bulk
            pricing, or order directly on WhatsApp. Pre-orders close 1st November.
          </p>
          <Link
            to="/cart"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--chocolate)] underline-link"
          >
            <ShoppingBag className="h-4 w-4" /> View Cart {itemCount > 0 ? `(${itemCount})` : ""}
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container-prose grid gap-8">
          {diwaliHampers.map((h) => (
            <DiwaliHamperCard key={h.slug} hamper={h} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
