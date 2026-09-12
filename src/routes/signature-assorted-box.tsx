import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Check, Phone, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import giftBoxImg from "@/assets/signature-assorted-box.png";

const logo = "/assets/grain-crumbs/logo-premium.png";

// ─────────────────────────────────────────────────────────────
// EDIT THESE LINES ONLY when you need to change price /
// Zomato link / product photo for this page.
// ─────────────────────────────────────────────────────────────
const PRODUCT_PRICE = 749;
const ZOMATO_URL: string | null = "https://www.zomato.com/pune/grain-crumbs-kharadi";
const PRODUCT_IMAGE = giftBoxImg;
// ─────────────────────────────────────────────────────────────

// Official Zomato mark (via simple-icons, MIT-licensed), used for the
// "We're live on Zomato" badge at the bottom of the page.
function ZomatoLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.615 9.45l-1.258.473-.167.71-.446.021-.115.978h.408l-.211 1.51c-.131.939.036 1.381.865 1.381.488 0 .91-.175 1.135-.297l.145-.9c-.167.083-.436.19-.618.19-.247 0-.276-.13-.225-.488l.189-1.396h.843c.03-.206.131-.877.16-1h-.865zm-3.779 1.002c-.115.002-.236.01-.361.026a3.592 3.592 0 0 0-1.347.432l.26.789c.269-.15.615-.28.978-.326.538-.066.757.1.79.375.014.109.004.199-.005.289l-.014.056a3.46 3.46 0 0 0-1.097-.036c-.518.063-.943.273-1.204.6a1.324 1.324 0 0 0-.225 1.034c.127.583.553.84 1.199.76.45-.055.812-.27 1.076-.63a2.665 2.665 0 0 1-.03.304 1.74 1.74 0 0 1-.072.29l1.244.001a3.657 3.657 0 0 1-.001-.365c.036-.459.118-1.143.247-2.051a2.397 2.397 0 0 0-.002-.59c-.08-.644-.628-.969-1.436-.958zm6.536.063c-1.194 0-2.107 1.067-2.107 2.342 0 .959.552 1.693 1.628 1.693 1.2 0 2.107-1.067 2.107-2.35 0-.95-.538-1.685-1.628-1.685zm-11.777.041c-.538 0-1.12.465-1.52 1.236.102-.504.08-1.076.051-1.198a8.964 8.964 0 0 1-1.287.122 6.9 6.9 0 0 1-.073 1.243l-.167 1.145c-.066.45-.138.969-.211 1.297h1.353c.007-.199.058-.511.094-.786l.116-.786c.095-.511.502-1.114.815-1.114.182 0 .175.176.124.504l-.131.885c-.066.45-.138.969-.211 1.297h1.367c.008-.199.051-.512.088-.786l.116-.786c.094-.512.502-1.114.814-1.114.182 0 .175.168.146.396l-.327 2.29H13l.438-2.609c.095-.649.044-1.236-.676-1.236-.523 0-1.09.443-1.49 1.182.087-.61.036-1.182-.677-1.182zm-4.88.008c-1.177 0-2.08 1.053-2.08 2.312 0 .946.546 1.67 1.608 1.67 1.185 0 2.08-1.052 2.08-2.319 0-.938-.531-1.663-1.607-1.663zm-5.126.091c-.05.39-.102.778-.175 1.13.328-.008.619-.016 1.411-.016l-1.81 1.96-.015.703c.444-.03.997-.039 1.63-.039.566 0 1.134.008 1.497.039.065-.458.13-.763.21-1.137-.275.015-.755.023-1.512.023l1.81-1.969.023-.694c-.437.023-.83.03-1.52.03-.749 0-.975-.007-1.549-.03zm4.988.927c.255 0 .408.228.408.701 0 .687-.276 1.251-.626 1.251-.261 0-.414-.236-.414-.702 0-.694.283-1.25.632-1.25zm16.629 0c.254 0 .407.228.407.701 0 .687-.276 1.251-.625 1.251-.262 0-.415-.236-.415-.702 0-.694.284-1.25.633-1.25zM15.51 12.64c.206-.003.403.024.55.058l-.013.118c-.075.44-.39.881-.848.938-.31.037-.578-.148-.608-.39a.538.538 0 0 1 .114-.41c.117-.159.336-.268.599-.3.069-.009.138-.013.206-.014Z" />
    </svg>
  );
}

export const Route = createFileRoute("/signature-assorted-box")({
  head: () => ({
    meta: [
      { title: "Signature Assorted Box — 6 Piece — Grain Crumbs" },
      {
        name: "description",
        content:
          "Grain Crumbs Signature Assorted Box — 6 handcrafted millet brownie pieces, beautifully gift-wrapped. ₹749/-. Order directly on WhatsApp or Zomato.",
      },
      { property: "og:title", content: "Signature Assorted Box — Grain Crumbs" },
      {
        property: "og:description",
        content: "6 handcrafted millet brownie pieces in a signature gift box. ₹749/-.",
      },
      { property: "og:image", content: PRODUCT_IMAGE },
    ],
  }),
  component: SignatureAssortedBoxPage,
});

const SLUG = "signature-assorted-box";
const NAME = "Signature Assorted Box (6 Piece)";

const highlights = [
  "6 handcrafted millet brownie pieces",
  "Assorted signature flavours in every box",
  "Gift-ready packaging with ribbon",
  "No maida, no refined sugar",
];

function SignatureAssortedBoxPage() {
  const { addItem, itemCount } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ slug: SLUG, name: NAME, price: PRODUCT_PRICE, image: PRODUCT_IMAGE });
    }
    toast.success(`${NAME} added to cart`, {
      action: { label: "View cart", onClick: () => navigate({ to: "/cart" }) },
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Grain Crumbs! I'd like to order the Signature Assorted Box (6 piece) — Qty: ${qty}. Estimated Total: ₹${PRODUCT_PRICE * qty}`,
  );

  return (
    <>
      {/* Minimal top bar — logo, back arrow, and cart only. No site
          navigation, so this stays a true single-product page (no way
          to browse other products). */}
      <header className="border-b border-border/60 bg-background/95">
        <div className="container-prose flex h-20 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              aria-label="Back to home"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <img src={logo} alt="Grain Crumbs" width={48} height={48} className="h-12 w-12 rounded-full object-contain" />
            <span className="font-display text-lg tracking-wide">Grain Crumbs</span>
          </div>
          <Link
            to="/cart"
            aria-label="View cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[color:var(--chocolate)] px-1 text-[10px] font-semibold leading-none text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </header>

    <section className="section">
      <div className="container-prose">
        <div className="mx-auto grid max-w-4xl items-start gap-10 md:grid-cols-2">
          {/* PRODUCT IMAGE */}
          <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_60px_-28px_rgba(60,30,10,0.42)]">
            <img
              src={PRODUCT_IMAGE}
              alt="Grain Crumbs Signature Assorted Box — 6 piece"
              width={1024}
              height={1024}
              className="aspect-square h-full w-full object-cover"
            />
          </div>

          {/* PRODUCT DETAILS */}
          <div>
            <p className="divider-gold eyebrow">Grain Crumbs</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] md:text-5xl">
              Signature Assorted Box
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">
              6 pieces per box
            </p>
            <p className="mt-5 font-display text-3xl text-[color:var(--chocolate)]">
              ₹{PRODUCT_PRICE}/-
            </p>

            <ul className="mt-6 space-y-2.5">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  {h}
                </li>
              ))}
            </ul>

            {/* QUANTITY */}
            <div className="mt-7 flex items-center gap-4">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center rounded-full border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-9 w-9 text-lg leading-none hover:text-[color:var(--chocolate)]"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  className="h-9 w-9 text-lg leading-none hover:text-[color:var(--chocolate)]"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-muted-foreground">
                Total: ₹{PRODUCT_PRICE * qty}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={handleAddToCart} className="btn-primary w-full sm:w-auto">
                Add to cart
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

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-[color:var(--gold)]" />
              100% Pure Veg · Baked fresh in Pune
            </div>

            {/* ZOMATO */}
            <div className="mt-10 border-t border-border/60 pt-6">
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-[color:var(--gold)]" />
                We're also live on Zomato
              </p>
              {ZOMATO_URL ? (
                <a
                  href={ZOMATO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E23744] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  <ZomatoLogo className="h-5 w-5" />
                  Order on Zomato
                </a>
              ) : (
                <span
                  title="Add the real Zomato link in signature-assorted-box.tsx (ZOMATO_URL) to activate this button"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-[#E23744]/60 px-5 py-2.5 text-sm font-semibold text-white/90"
                >
                  <ZomatoLogo className="h-5 w-5" />
                  Order on Zomato
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>

      {/* Minimal footer — contact + copyright only, no links to other
          products/pages, keeping this a true single-product page. */}
      <footer className="mt-8 border-t border-border/70 bg-[color:var(--cream-dark)] py-8">
        <div className="container-prose flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
          <a href="tel:+918208257574" className="flex items-center gap-2 hover:text-foreground">
            <Phone className="h-4 w-4" /> +91 82082 57574
          </a>
          <p className="text-xs">© 2026 Grain Crumbs. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Check, Phone, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import giftBoxImg from "@/assets/gifting.jpg";

const logo = "/assets/grain-crumbs/logo-premium.png";

// ─────────────────────────────────────────────────────────────
// EDIT THESE LINES ONLY when you need to change price /
// Zomato link / product photo for this page.
// ─────────────────────────────────────────────────────────────
const PRODUCT_PRICE = 749;
const ZOMATO_URL: string | null = "https://www.zomato.com/pune/grain-crumbs-kharadi";
const PRODUCT_IMAGE = giftBoxImg;
// ─────────────────────────────────────────────────────────────

// Official Zomato mark (via simple-icons, MIT-licensed), used for the
// "We're live on Zomato" badge at the bottom of the page.
function ZomatoLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.615 9.45l-1.258.473-.167.71-.446.021-.115.978h.408l-.211 1.51c-.131.939.036 1.381.865 1.381.488 0 .91-.175 1.135-.297l.145-.9c-.167.083-.436.19-.618.19-.247 0-.276-.13-.225-.488l.189-1.396h.843c.03-.206.131-.877.16-1h-.865zm-3.779 1.002c-.115.002-.236.01-.361.026a3.592 3.592 0 0 0-1.347.432l.26.789c.269-.15.615-.28.978-.326.538-.066.757.1.79.375.014.109.004.199-.005.289l-.014.056a3.46 3.46 0 0 0-1.097-.036c-.518.063-.943.273-1.204.6a1.324 1.324 0 0 0-.225 1.034c.127.583.553.84 1.199.76.45-.055.812-.27 1.076-.63a2.665 2.665 0 0 1-.03.304 1.74 1.74 0 0 1-.072.29l1.244.001a3.657 3.657 0 0 1-.001-.365c.036-.459.118-1.143.247-2.051a2.397 2.397 0 0 0-.002-.59c-.08-.644-.628-.969-1.436-.958zm6.536.063c-1.194 0-2.107 1.067-2.107 2.342 0 .959.552 1.693 1.628 1.693 1.2 0 2.107-1.067 2.107-2.35 0-.95-.538-1.685-1.628-1.685zm-11.777.041c-.538 0-1.12.465-1.52 1.236.102-.504.08-1.076.051-1.198a8.964 8.964 0 0 1-1.287.122 6.9 6.9 0 0 1-.073 1.243l-.167 1.145c-.066.45-.138.969-.211 1.297h1.353c.007-.199.058-.511.094-.786l.116-.786c.095-.511.502-1.114.815-1.114.182 0 .175.176.124.504l-.131.885c-.066.45-.138.969-.211 1.297h1.367c.008-.199.051-.512.088-.786l.116-.786c.094-.512.502-1.114.814-1.114.182 0 .175.168.146.396l-.327 2.29H13l.438-2.609c.095-.649.044-1.236-.676-1.236-.523 0-1.09.443-1.49 1.182.087-.61.036-1.182-.677-1.182zm-4.88.008c-1.177 0-2.08 1.053-2.08 2.312 0 .946.546 1.67 1.608 1.67 1.185 0 2.08-1.052 2.08-2.319 0-.938-.531-1.663-1.607-1.663zm-5.126.091c-.05.39-.102.778-.175 1.13.328-.008.619-.016 1.411-.016l-1.81 1.96-.015.703c.444-.03.997-.039 1.63-.039.566 0 1.134.008 1.497.039.065-.458.13-.763.21-1.137-.275.015-.755.023-1.512.023l1.81-1.969.023-.694c-.437.023-.83.03-1.52.03-.749 0-.975-.007-1.549-.03zm4.988.927c.255 0 .408.228.408.701 0 .687-.276 1.251-.626 1.251-.261 0-.414-.236-.414-.702 0-.694.283-1.25.632-1.25zm16.629 0c.254 0 .407.228.407.701 0 .687-.276 1.251-.625 1.251-.262 0-.415-.236-.415-.702 0-.694.284-1.25.633-1.25zM15.51 12.64c.206-.003.403.024.55.058l-.013.118c-.075.44-.39.881-.848.938-.31.037-.578-.148-.608-.39a.538.538 0 0 1 .114-.41c.117-.159.336-.268.599-.3.069-.009.138-.013.206-.014Z" />
    </svg>
  );
}

export const Route = createFileRoute("/signature-assorted-box")({
  head: () => ({
    meta: [
      { title: "Signature Assorted Box — 6 Piece — Grain Crumbs" },
      {
        name: "description",
        content:
          "Grain Crumbs Signature Assorted Box — 6 handcrafted millet brownie pieces, beautifully gift-wrapped. ₹749/-. Order directly on WhatsApp or Zomato.",
      },
      { property: "og:title", content: "Signature Assorted Box — Grain Crumbs" },
      {
        property: "og:description",
        content: "6 handcrafted millet brownie pieces in a signature gift box. ₹749/-.",
      },
      { property: "og:image", content: PRODUCT_IMAGE },
    ],
  }),
  component: SignatureAssortedBoxPage,
});

const SLUG = "signature-assorted-box";
const NAME = "Signature Assorted Box (6 Piece)";

const highlights = [
  "6 handcrafted millet brownie pieces",
  "Assorted signature flavours in every box",
  "Gift-ready packaging with ribbon",
  "No maida, no refined sugar",
];

function SignatureAssortedBoxPage() {
  const { addItem, itemCount } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ slug: SLUG, name: NAME, price: PRODUCT_PRICE, image: PRODUCT_IMAGE });
    }
    toast.success(`${NAME} added to cart`, {
      action: { label: "View cart", onClick: () => navigate({ to: "/cart" }) },
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Grain Crumbs! I'd like to order the Signature Assorted Box (6 piece) — Qty: ${qty}. Estimated Total: ₹${PRODUCT_PRICE * qty}`,
  );

  return (
    <>
      {/* Minimal top bar — logo, back arrow, and cart only. No site
          navigation, so this stays a true single-product page (no way
          to browse other products). */}
      <header className="border-b border-border/60 bg-background/95">
        <div className="container-prose flex h-20 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              aria-label="Back to home"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <img src={logo} alt="Grain Crumbs" width={48} height={48} className="h-12 w-12 rounded-full object-contain" />
            <span className="font-display text-lg tracking-wide">Grain Crumbs</span>
          </div>
          <Link
            to="/cart"
            aria-label="View cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[color:var(--chocolate)] px-1 text-[10px] font-semibold leading-none text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </header>

    <section className="section">
      <div className="container-prose">
        <div className="mx-auto grid max-w-4xl items-start gap-10 md:grid-cols-2">
          {/* PRODUCT IMAGE */}
          <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-[color:var(--gold)]/25 shadow-[0_24px_60px_-28px_rgba(60,30,10,0.42)]">
            <img
              src={PRODUCT_IMAGE}
              alt="Grain Crumbs Signature Assorted Box — 6 piece"
              width={1024}
              height={1024}
              className="aspect-square h-full w-full object-cover"
            />
          </div>

          {/* PRODUCT DETAILS */}
          <div>
            <p className="divider-gold eyebrow">Grain Crumbs</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] md:text-5xl">
              Signature Assorted Box
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">
              6 pieces per box
            </p>
            <p className="mt-5 font-display text-3xl text-[color:var(--chocolate)]">
              ₹{PRODUCT_PRICE}/-
            </p>

            <ul className="mt-6 space-y-2.5">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
                  {h}
                </li>
              ))}
            </ul>

            {/* QUANTITY */}
            <div className="mt-7 flex items-center gap-4">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center rounded-full border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-9 w-9 text-lg leading-none hover:text-[color:var(--chocolate)]"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  className="h-9 w-9 text-lg leading-none hover:text-[color:var(--chocolate)]"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-muted-foreground">
                Total: ₹{PRODUCT_PRICE * qty}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={handleAddToCart} className="btn-primary w-full sm:w-auto">
                Add to cart
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

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-[color:var(--gold)]" />
              100% Pure Veg · Baked fresh in Pune
            </div>

            {/* ZOMATO */}
            <div className="mt-10 border-t border-border/60 pt-6">
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-[color:var(--gold)]" />
                We're also live on Zomato
              </p>
              {ZOMATO_URL ? (
                <a
                  href={ZOMATO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E23744] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  <ZomatoLogo className="h-5 w-5" />
                  Order on Zomato
                </a>
              ) : (
                <span
                  title="Add the real Zomato link in signature-assorted-box.tsx (ZOMATO_URL) to activate this button"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-[#E23744]/60 px-5 py-2.5 text-sm font-semibold text-white/90"
                >
                  <ZomatoLogo className="h-5 w-5" />
                  Order on Zomato
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>

      {/* Minimal footer — contact + copyright only, no links to other
          products/pages, keeping this a true single-product page. */}
      <footer className="mt-8 border-t border-border/70 bg-[color:var(--cream-dark)] py-8">
        <div className="container-prose flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
          <a href="tel:+918208257574" className="flex items-center gap-2 hover:text-foreground">
            <Phone className="h-4 w-4" /> +91 82082 57574
          </a>
          <p className="text-xs">© 2026 Grain Crumbs. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
