import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Grain Crumbs" },
      {
        name: "description",
        content: "Review your selected brownie flavours and proceed to place your order.",
      },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container-prose max-w-2xl text-center">
          <Reveal>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[color:var(--cream-dark)]">
              <ShoppingBag className="h-8 w-8 text-[color:var(--chocolate)]" />
            </div>
            <h1 className="mt-6 font-display text-4xl md:text-5xl">Your cart is empty</h1>
            <p className="mt-4 text-muted-foreground">
              Browse our signature flavours and add a few favourites before placing your enquiry.
            </p>
            <Link to="/brownies" className="btn-primary mt-8 inline-flex">
              Explore Brownies
            </Link>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-prose py-16 text-center md:py-20">
          <p className="divider-gold eyebrow">Your Cart</p>
          <h1 className="mt-5 font-display text-5xl md:text-6xl">Almost there.</h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Review your selected flavours, then continue to the enquiry form to confirm your order.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-prose grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.slug}
                  className="flex gap-4 rounded-[1.5rem] border border-border bg-card p-4 md:gap-6 md:p-6"
                >
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-[color:var(--gold)]/25 md:h-28 md:w-24">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <h2 className="font-display text-xl md:text-2xl">{item.name}</h2>
                      <p className="mt-1 text-sm text-[color:var(--gold)]">₹{item.price} each</p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-[color:var(--gold)]"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[2rem] text-center font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-[color:var(--gold)]"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-display text-xl text-[color:var(--chocolate)]">
                          ₹{item.price * item.quantity}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <aside className="sticky top-28 space-y-6">
              <div className="rounded-[2rem] border border-[color:var(--gold)]/30 bg-card p-7">
                <p className="eyebrow">Order summary</p>
                <div className="mt-4 space-y-3 text-sm">
                  {items.map((item) => (
                    <div key={item.slug} className="flex justify-between gap-4">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
                  <span className="font-display text-xl">Estimated total</span>
                  <span className="font-display text-3xl text-[color:var(--chocolate)]">₹{subtotal}</span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Final pricing confirmed after enquiry. Minimum quantities may apply to filled flavours.
                </p>
                <Link to="/order" search={{ from: "cart" }} className="btn-primary mt-6 w-full">
                  Proceed to Enquiry
                </Link>
                <Link to="/brownies" className="btn-outline mt-3 w-full">
                  Add more flavours
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
