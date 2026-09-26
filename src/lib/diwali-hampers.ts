// Exact tiered pricing from "Grain Crumbs Diwali Corporate Hampers 2026" PDF.
// Each tier is the price PER UNIT once quantity reaches that breakpoint.
export type PricingTier = { minQty: number; pricePerUnit: number };

export type DiwaliHamper = {
  slug: string;
  name: string;
  blurb: string;
  inclusions: string[];
  boxSize: string;
  image: string;
  tiers: PricingTier[];
};

export const diwaliHampers: DiwaliHamper[] = [
  {
    slug: "diwali-pastel-green-rajwadi",
    name: "Pastel Green Rajwadi",
    blurb: "A traditional Rajwadi-style Diwali hamper, designed to be carried like a bag — no carry bag needed.",
    inclusions: [
      "3 brownies — Mixed Berry, Coconut Bounty, Chocolate Walnut",
      "A traditional clay diya",
      "A Bhagavad Gita shloka card",
      "Roli Chawal & Kumkum dome glass bottles",
      "Personalised thank-you card (personal or company)",
    ],
    boxSize: "21 × 30 × 10 cm (8.3 × 11.8 × 3.9 in)",
    image: "/assets/grain-crumbs/diwali-2026/diwali-01-pastel-green-rajwadi.jpg",
    tiers: [
      { minQty: 1, pricePerUnit: 369 },
      { minQty: 5, pricePerUnit: 360 },
      { minQty: 10, pricePerUnit: 350 },
      { minQty: 20, pricePerUnit: 340 },
      { minQty: 30, pricePerUnit: 330 },
      { minQty: 40, pricePerUnit: 320 },
      { minQty: 50, pricePerUnit: 320 },
    ],
  },
  {
    slug: "diwali-peach-rajwadi",
    name: "Peach Rajwadi",
    blurb: "A traditional Rajwadi-style Diwali hamper, designed to be carried like a bag — no carry bag needed.",
    inclusions: [
      "3 brownies — Mixed Berry, Coconut Bounty, Chocolate Walnut",
      "A traditional clay diya",
      "A Bhagavad Gita shloka card",
      "Roli Chawal & Kumkum dome glass bottles",
      "Personalised thank-you card (personal or company)",
    ],
    boxSize: "21 × 30 × 10 cm (8.3 × 11.8 × 3.9 in)",
    image: "/assets/grain-crumbs/diwali-2026/diwali-02-peach-rajwadi.jpg",
    tiers: [
      { minQty: 1, pricePerUnit: 379 },
      { minQty: 5, pricePerUnit: 370 },
      { minQty: 10, pricePerUnit: 360 },
      { minQty: 20, pricePerUnit: 350 },
      { minQty: 30, pricePerUnit: 340 },
      { minQty: 40, pricePerUnit: 330 },
      { minQty: 50, pricePerUnit: 330 },
    ],
  },
  {
    slug: "diwali-dhamaka-blue-box",
    name: "Diwali Dhamaka Blue Box",
    blurb: "A festive blue gift box with 4 brownie pieces — no bulk minimum for the personalised card.",
    inclusions: [
      "4 brownie pieces — Mixed Berry, Coconut Bounty, Chocolate Walnut, Cappuccino Walnut",
      "Personalised thank-you card (personal or company)",
    ],
    boxSize: "6 × 6 × 1.75 in (15.2 × 15.2 × 4.4 cm)",
    image: "/assets/grain-crumbs/diwali-2026/diwali-03-blue-boxes-dhamaka-shagun.jpg",
    tiers: [
      { minQty: 1, pricePerUnit: 314 },
      { minQty: 5, pricePerUnit: 314 },
      { minQty: 10, pricePerUnit: 304 },
      { minQty: 20, pricePerUnit: 294 },
      { minQty: 30, pricePerUnit: 284 },
      { minQty: 40, pricePerUnit: 274 },
      { minQty: 50, pricePerUnit: 264 },
    ],
  },
  {
    slug: "diwali-shagun-blue-box",
    name: "Diwali Shagun Blue Box",
    blurb: "A slim festive blue gift box with 4 brownie pieces — no bulk minimum for the personalised card.",
    inclusions: [
      "4 brownie pieces — Mixed Berry, Coconut Bounty, Chocolate Walnut, Cappuccino Walnut",
      "Personalised thank-you card (personal or company)",
    ],
    boxSize: "4 × 4 × 0.5 in (10.2 × 10.2 × 1.3 cm)",
    image: "/assets/grain-crumbs/diwali-2026/diwali-03-blue-boxes-dhamaka-shagun.jpg",
    tiers: [
      { minQty: 1, pricePerUnit: 290 },
      { minQty: 5, pricePerUnit: 290 },
      { minQty: 10, pricePerUnit: 284 },
      { minQty: 20, pricePerUnit: 274 },
      { minQty: 30, pricePerUnit: 260 },
      { minQty: 40, pricePerUnit: 250 },
      { minQty: 50, pricePerUnit: 240 },
    ],
  },
  {
    slug: "diwali-mode-on",
    name: "Diwali Mode On",
    blurb: "A bold, standout festive box — a box of pure celebration.",
    inclusions: [
      "3 brownies — Mixed Berry, Coconut Bounty, Chocolate Walnut",
      "Roli Chawal & Kumkum dome glass bottle",
      "Personalised thank-you card (personal or company)",
    ],
    boxSize: "6.5 × 3.5 × 2 in (16.5 × 8.9 × 5.1 cm)",
    image: "/assets/grain-crumbs/diwali-2026/diwali-04-mode-on.jpg",
    tiers: [
      { minQty: 1, pricePerUnit: 300 },
      { minQty: 5, pricePerUnit: 292 },
      { minQty: 10, pricePerUnit: 290 },
      { minQty: 20, pricePerUnit: 280 },
      { minQty: 30, pricePerUnit: 270 },
      { minQty: 40, pricePerUnit: 260 },
      { minQty: 50, pricePerUnit: 250 },
    ],
  },
];

/** Returns the per-unit price for a given quantity, using the highest tier
 * breakpoint the quantity qualifies for. Quantities above 50 keep the 50+
 * rate (the PDF asks bulk 100+ orders to WhatsApp for custom pricing). */
export function unitPriceForQty(hamper: DiwaliHamper, qty: number): number {
  let price = hamper.tiers[0].pricePerUnit;
  for (const tier of hamper.tiers) {
    if (qty >= tier.minQty) price = tier.pricePerUnit;
  }
  return price;
}
