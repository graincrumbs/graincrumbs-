import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
const logo = "/assets/grain-crumbs/logo-premium.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/brownies", label: "Brownies" },
  { to: "/brownie-cakes", label: "Brownie Cakes" },
  { to: "/gifting", label: "Gifting" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-prose flex h-20 items-center justify-between gap-3 md:h-24 md:gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3 md:gap-4" aria-label="Grain Crumbs home">
          <img
            src={logo}
            alt="Grain Crumbs"
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 rounded-full object-contain md:h-16 md:w-16"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-display text-lg leading-none tracking-wide md:text-xl">
              Grain Crumbs
            </span>
            <span className="mt-1 block font-['Cormorant_Garamond'] text-[8px] font-medium tracking-[0.18em] text-muted-foreground sm:text-[11px] sm:tracking-[0.28em]">
  REDEFINING SWEET INDULGENCE WITH MILLETS
</span>
          </div>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="underline-link text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="tel:+918208257574"
            className="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            +91 82082 57574
          </a>
          <Link
            to="/cart"
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border hover:border-[color:var(--gold)]"
            aria-label={`Cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
          >
            <ShoppingBag className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[color:var(--gold)] px-1 text-[10px] font-semibold text-[color:var(--chocolate-dark)]">
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            to="/order"
            className="btn-gold hidden sm:inline-flex"
          >
            Order Now
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="container-prose flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium hover:bg-muted"
                activeProps={{ className: "bg-muted" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium hover:bg-muted"
            >
              Cart{itemCount > 0 ? ` (${itemCount})` : ""}
            </Link>
            <Link
              to="/order"
              onClick={() => setOpen(false)}
              className="btn-gold mt-3 w-full"
            >
              Order Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
