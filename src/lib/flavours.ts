export type Flavour = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  notes: string[];
  price: number;
};

export const flavours: Flavour[] = [
  // Row 1
  {
    slug: "cappuccino-walnut",
    name: "Cappuccino Walnut Brownie",
    tagline: "Espresso meets indulgence.",
    description:
      "Mocha-style golden walnut swirled into rich chocolate, finished with crunchy walnut.",
    image: "/assets/grain-crumbs/cappuccino-walnut.png",
    notes: ["Couverture Chocolate", "Golden Walnut", "Jaggery", "Ragi", "Oats"],
    price: 129,
  },
  {
    slug: "chocolate-walnut",
    name: "Chocolate Walnut Brownie",
    tagline: "The signature classic.",
    description:
      "Deeply fudgy with toasted walnuts folded through a couverture chocolate base.",
    image: "/assets/grain-crumbs/chocolate-walnut.png",
    notes: ["Couverture Chocolate", "Golden Walnuts", "Ragi", "Oats", "Jaggery"],
    price: 129,
  },
  {
    slug: "mixed-berry-jam",
    name: "Mixed Berry Jam Brownie",
    tagline: "Bright, tart, beautiful.",
    description:
      "Slow-cooked seasonal berries spooned over a fudgy millet brownie. The brightest finish.",
    image: "/assets/grain-crumbs/mixed-berry-jam.png",
    notes: ["Real Mixed Berries", "Foxtail", "Jowar", "Oats", "Jaggery", "Couverture Chocolate"],
    price: 109,
  },
  // Row 2
  {
    slug: "cream-cheese-filling",
    name: "Cream Cheese Filling Brownie",
    tagline: "Molten heart, gentle tang.",
    description:
      "Cream cheese ribboned through the centre — a melt of tang against deep chocolate.",
    image: "/assets/grain-crumbs/cream-cheese.png",
    notes: ["D'lecta Cream Cheese", "Ragi", "Oats", "Jaggery", "Couverture Chocolate"],
    price: 149,
  },
  {
    slug: "coconut-bounty",
    name: "Coconut Bounty Brownie",
    tagline: "Tropical, glossy, generous.",
    description:
      "Toasted coconut layered with chocolate ganache — a tribute to the bounty bar, grown up.",
    image: "/assets/grain-crumbs/coconut-bounty.png",
    notes: ["Foxtail", "Oats", "Jowar", "Toasted Coconut", "Couverture Chocolate"],
    price: 119,
  },
  {
    slug: "hazelnut-spread-filling",
    name: "Hazelnut Spread Filling Brownie",
    tagline: "Roasted, nutty, luxurious.",
    description:
      "Roasted hazelnut spread folded into a millet brownie that crackles on top.",
    image: "/assets/grain-crumbs/hazelnut-spread-drizzle.png",
    notes: ["Ragi", "Oats", "Jaggery", "Golden Walnut", "Hazelnut Spread"],
    price: 159,
  },
];
