import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { unitPriceForQty, type DiwaliHamper } from "@/lib/diwali-hampers";

export function DiwaliHamperCard({ hamper }: { hamper: DiwaliHamper }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const unitPrice = unitPriceForQty(hamper, qty);
  const total = unitPrice * qty;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ slug: hamper.slug, name: `${hamper.name} (Diwali Hamper)`, price: unitPrice, image: hamper.image });
    }
    toast.success(`${hamper.name} added to cart`, {
      action: { label: "View cart", onClick: () => navigate({ to: "/cart" }) },
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Grain Crumbs! I'd like to order the ${hamper.name} Diwali hamper.\n\nQuantity: ${qty}\nPrice per unit: ₹${unitPrice}\nEstimated Total: ₹${total}\n\nDelivery Address:\nCompany Name (for thank-you card, if any):`,
  );

  return (
    <div className="card-warm grid gap-6 p-6 md:grid-cols-[0.85fr_1.15fr] md:p-8">
      <div className="overflow-hidden rounded-2xl ring-1 ring-[color:var(--gold)]/25">
        <img
          src={hamper.image}
          alt={hamper.name}
          loading="lazy"
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div>
        <h3 className="font-display text-2xl">{hamper.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{hamper.blurb}</p>

        <ul className="mt-4 space-y-1.5">
          {hamper.inclusions.map((line) => (
            <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">Box size: {hamper.boxSize}</p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium">Quantity</span>
          <div className="flex items-center rounded-full border border-border">
            <button
              type="button"
              aria-label={`Decrease quantity for ${hamper.name}`}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-9 w-9 text-lg leading-none hover:text-[color:var(--chocolate)]"
            >
              −
            </button>
            <span className="w-10 text-center text-sm font-semibold">{qty}</span>
            <button
              type="button"
              aria-label={`Increase quantity for ${hamper.name}`}
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="h-9 w-9 text-lg leading-none hover:text-[color:var(--chocolate)]"
            >
              +
            </button>
          </div>
        </div>

        <p className="mt-3 font-display text-2xl text-[color:var(--chocolate)]">
          ₹{unitPrice} <span className="text-sm font-sans text-muted-foreground">/ hamper</span>
        </p>
        <p className="text-sm text-muted-foreground">Total: ₹{total}</p>
        {qty >= 100 && (
          <p className="mt-1 text-xs text-muted-foreground">
            For 100+ units, WhatsApp us for custom bulk pricing.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={handleAddToCart} className="btn-primary w-full sm:w-auto">
            Add to Cart
          </button>
          <a
            href={`https://wa.me/918208257574?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="btn-outline w-full sm:w-auto"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
