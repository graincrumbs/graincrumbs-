import type { AiFeature, AiRequest, AiResponse } from "./types";
import { CONCIERGE_STARTERS } from "./knowledge";

const flavourTips: Record<string, string> = {
  chocolate: "Chocolate Walnut — rich, classic, crowd-pleasing.",
  walnut: "Chocolate Walnut or Cappuccino Walnut for nutty depth.",
  coffee: "Cappuccino Walnut — espresso notes with walnut crunch.",
  berry: "Mixed Berry Jam — bright, fruity, lighter indulgence.",
  coconut: "Coconut Bounty — tropical and comforting.",
  cheese: "Cream Cheese — tangy-sweet balance, feels celebratory.",
  hazelnut: "Hazelnut Spread — premium, nutty, very gift-worthy.",
  assorted: "Assorted Box (₹789) — all six flavours, perfect for sharing.",
};

function pickFlavourTip(query: string): string {
  const q = query.toLowerCase();
  for (const [key, tip] of Object.entries(flavourTips)) {
    if (q.includes(key)) return tip;
  }
  return "Try our Assorted Box to taste all six millet-brownie flavours, or Chocolate Walnut for a safe classic.";
}

function conciergeReply(message: string): AiResponse {
  const q = message.toLowerCase();

  if (/\b(hello|hi|hey|namaste)\b/.test(q)) {
    return {
      provider: "local",
      text: "Hello! I'm your Grain Crumbs concierge. I can help you pick flavours, plan a brownie cake, find gifting ideas, or explain delivery and ordering. What are you celebrating?",
      suggestions: CONCIERGE_STARTERS,
    };
  }

  if (/\b(available|coming soon|launch|release|restock|availability|pre-?order|stock)\b/.test(q)) {
    if (/\b(cookie|cookie cake|cookie tin)\b/.test(q)) {
      return {
        provider: "local",
        text: "Cookie Cake Tins are premium gifting tins with both millet-based cookies and classic-style cookie options. They are coming soon — please confirm exact launch availability on the order page or via WhatsApp, and we will update you as soon as they are ready.",
        suggestions: ["Ask about launch date", "WhatsApp for availability"],
      };
    }

    if (/\b(lite|pro)\b/.test(q)) {
      return {
        provider: "local",
        text: "Grain Crumbs Lite and Grain Crumbs Pro are upcoming launches. Lite is lower-sugar with jaggery and monk fruit, and Pro is high-protein for active lifestyles. For current pre-order timing, confirm on order or WhatsApp.",
        suggestions: ["Tell me about Grain Crumbs Lite", "WhatsApp for launch updates"],
      };
    }

    if (/\b(assorted box|assorted)\b/.test(q)) {
      return {
        provider: "local",
        text: "The Assorted Box is available now for ₹789 and includes all six signature flavours. It's our best option for gifting or sampling the range.",
        suggestions: ["Order Assorted Box", "Ask about flavours"],
      };
    }

    if (/\b(cake|brownie cake)\b/.test(q)) {
      return {
        provider: "local",
        text: "Brownie Cakes are available to order now in 250g, 500g, 650g, and 1kg sizes with custom messages. Please use the order page or WhatsApp to check the next available slot for your chosen date.",
        suggestions: ["Order a brownie cake", "Cake message ideas"],
      };
    }

    return {
      provider: "local",
      text: "Many Grain Crumbs products are available now, while new launches like Lite, Pro, and Cookie Cake Tins are coming soon. Check the order page or WhatsApp for the latest availability and launch date.",
      suggestions: ["WhatsApp for launch updates", "Order now"],
    };
  }

  if (/\b(flavour|flavor|recommend|which|best|try|taste|menu|signature)\b/.test(q)) {
    if (/\b(gift|gifting|present|birthday|anniversary|corporate)\b/.test(q)) {
      return {
        provider: "local",
        text: "For gifting, the Assorted Box is the best choice — it includes all six Grain Crumbs flavours in one premium box for ₹789. If you want two focussed gift options, choose Chocolate Walnut for a classic rich taste and Mixed Berry Jam for a fruity crowd-pleaser.",
        suggestions: ["Order an Assorted Box", "Gift box for a birthday"],
      };
    }

    return {
      provider: "local",
      text: `Our six signature flavours are Chocolate Walnut, Cappuccino Walnut, Mixed Berry Jam, Coconut Bounty, Cream Cheese and Hazelnut Spread. The Assorted Box is ₹789 for all six flavours and is the easiest way to try them all.`,
      suggestions: ["Tell me about brownie cakes", "Gift box for a birthday"],
    };
  }

  if (/\b(what is grain crumbs|who are you|about grain crumbs|tell me about grain crumbs|founder|ankita)\b/.test(q)) {
    return {
      provider: "local",
      text: "Grain Crumbs is a premium millet bakery from Pune founded by Ankita Jain. We bake small batches of hand-finished brownies, brownie cakes, and gift boxes using millets, jaggery, and couverture chocolate. The brand is built on mindful indulgence, honest ingredients, and quality presentation.",
      suggestions: ["What flavours do you recommend?", "How do I order a brownie cake?"],
    };
  }

  if (/\b(lite|pro|cookie|cookie tin)\b/.test(q)) {
    return {
      provider: "local",
      text: "Grain Crumbs Lite is a lower-sugar millet brownie made with jaggery and monk fruit, coming soon. Grain Crumbs Pro is a high-protein millet brownie for active lifestyles, also coming soon. Cookie Cake Tins are premium gifting tins with both millet-based and classic-style cookie options.",
      suggestions: ["Tell me about Grain Crumbs Lite", "Gift ideas for a birthday"],
    };
  }

  if (/\b(cake|message|inscription|write on)\b/.test(q)) {
    return {
      provider: "local",
      text: "Brownie Cakes come in 250g, 500g, 650g or 1kg sizes with custom messages and themes. Choose your flavour, share your message, and the team will hand-finish the cake for a polished celebration item.",
      suggestions: ["How do I order?", "Delivery in Pune"],
    };
  }

  if (/\b(deliver|delivery|pincode|area|pune|pickup)\b/.test(q)) {
    return {
      provider: "local",
      text: "We offer pickup from Kharadi and delivery across Pune. Use the pincode field on the order page for a delivery estimate. If you want a faster response, WhatsApp is usually replied to within an hour.",
      suggestions: ["Start an order", "Corporate bulk gifting"],
    };
  }

  if (/\b(gift|gifting|hamper|corporate|office|bulk)\b/.test(q)) {
    return {
      provider: "local",
      text: "For gifting, choose Gift Box or Bulk/Corporate on the order form — or visit our Gifting page. Share occasion, quantity, and budget; we'll curate packaging, flavours, and branding (logo stickers, message cards, etc.).",
      suggestions: ["Gift ideas for anniversary", "Office gifting 25 boxes"],
    };
  }

  if (/₹|\b(price|cost|how much|rs)\b/.test(q)) {
    return {
      provider: "local",
      text: "Assorted Box is ₹789 (6 pieces, all flavours). Individual brownie pricing varies by flavour and quantity; brownie cakes start around ₹230 for 250g depending on flavour. Submit an enquiry for an exact quote — we confirm within 24 hours.",
      suggestions: ["Order assorted box", "WhatsApp for quick quote"],
    };
  }

  if (/\b(order|buy|place|enquiry|submit)\b/.test(q)) {
    return {
      provider: "local",
      text: "Head to Order Now on the site, pick your product type, fill in details, and submit. You'll get a confirmation and our team follows up with availability and payment. Prefer chat? Use WhatsApp — it's the fastest channel.",
      suggestions: ["Help me choose a flavour", "Custom brownie cake"],
    };
  }

  if (/\b(millet|jaggery|healthy|ingredient|veg|vegetarian|maida|sugar)\b/.test(q)) {
    return {
      provider: "local",
      text: "Grain Crumbs brownies are made with ragi, foxtail millet, oats, and buckwheat, sweetened with jaggery and finished with couverture chocolate. No maida, no refined sugar — 100% pure vegetarian indulgence.",
      suggestions: ["View all flavours", "Order now"],
    };
  }

  return {
    provider: "local",
    text: "I'm here to help with flavours, brownie cakes, gifting, delivery, and orders. Ask me anything about Grain Crumbs — or tap a suggestion below.",
    suggestions: CONCIERGE_STARTERS,
  };
}

function cakeMessageReply(context?: Record<string, string | undefined>): AiResponse {
  const occasion = context?.occasion || "your special day";
  const name = context?.recipient?.trim() || context?.name?.trim();
  const tone = (context?.tone || "Warm").toLowerCase();
  const who = name ? name : "you";

  const warm = [
    `With love, on ${occasion} — ${who}, you make life sweeter.`,
    `Happy ${occasion}! Wishing ${who} joy in every bite.`,
    `To ${who} — celebrating ${occasion} with warmth and chocolate.`,
  ];

  const elegant = [
    `${occasion} wishes to ${who}. With admiration.`,
    `For ${who}, on this ${occasion}. Elegantly yours.`,
    `Celebrating ${who} — ${occasion} edition.`,
  ];

  const funny = [
    `${who}, you're the reason we need more brownies.`,
    `Happy ${occasion}, ${who}! Calories don't count today.`,
    `${who} — officially older, definitely sweeter.`,
  ];

  const short = [
    `Happy ${occasion}, ${who}!`,
    `For ${who} — with love.`,
    `Cheers, ${who}!`,
  ];

  let pool = warm;
  if (tone.includes("elegant")) pool = elegant;
  else if (tone.includes("funny")) pool = funny;
  else if (tone.includes("short")) pool = short;

  const text = pool.map((m, i) => `${i + 1}. ${m}`).join("\n");

  return {
    provider: "local",
    text: `Here are three cake message ideas:\n\n${text}\n\nTap one to use it, or regenerate for more options.`,
    suggestions: pool,
  };
}

function whatsappReply(context?: Record<string, string | undefined>, message?: string): AiResponse {
  const intent = message?.trim() || context?.intent || "placing an order enquiry";
  const name = context?.name?.trim() || "[Your Name]";
  const phone = context?.phone?.trim() || "[Mobile]";
  const product = context?.product?.trim() || "[Product — e.g. Assorted Box / Brownie Cake]";
  const flavour = context?.flavour?.trim() || "[Flavour]";
  const delivery = context?.delivery?.trim() || "[Pickup or Delivery]";
  const date = context?.date?.trim() || "[Date required]";
  const notes = context?.notes?.trim() || "";

  const text = `Hi Grain Crumbs! I'd like to ${intent.toLowerCase()}.

Name: ${name}
Mobile: ${phone}

Product: ${product}
Flavour: ${flavour}
Delivery: ${delivery}
Date required: ${date}
${notes ? `\nNotes: ${notes}` : ""}

Please share availability and pricing. Thank you!`;

  return {
    provider: "local",
    text,
    suggestions: ["Open in WhatsApp"],
  };
}

function giftRecommendReply(context?: Record<string, string | undefined>, message?: string): AiResponse {
  const occasion = context?.occasion || "Birthday";
  const budget = context?.budget || "₹500–₹1000";
  const qty = context?.quantity || "1–2 boxes";
  const recipient = context?.recipient || message || "someone special";
  const q = `${occasion} ${budget} ${recipient}`.toLowerCase();

  let primary = "**Signature Gift Box** — 6-piece Assorted Box (₹789) in premium kraft packaging with a personalised message card. Best for: first-time gifters who want variety.";
  let alt1 = "**Elegant Single Flavour** — 12-piece Chocolate Walnut or Hazelnut Spread box. Premium, cohesive, feels luxe.";
  let alt2 = "**Celebration Cake** — 500g Brownie Cake with custom inscription. Ideal when you want a centrepiece moment.";

  if (/corporate|office|team|employee/.test(q)) {
    primary = "**Office Drop** — Assorted Boxes (6 pc) with logo sticker + custom message card. Scales cleanly for teams.";
    alt1 = "**Executive Thank-You** — Hazelnut Spread 12-piece boxes, minimal gold-accent packaging.";
    alt2 = "**Festive Hamper** — Mixed boxes + branded sleeves for seasonal gifting.";
  } else if (/anniversary|valentine|love|couple/.test(q)) {
    primary = "**Date Night Duo** — 2× 6-piece boxes (Cappuccino Walnut + Mixed Berry Jam) with elegant ribbon.";
    alt1 = "**Cake Moment** — 650g Cream Cheese brownie cake with a romantic inscription.";
    alt2 = "**Premium Pair** — Hazelnut Spread boxes with handwritten card.";
  } else if (/thank|gratitude|appreciation/.test(q)) {
    primary = "**Thoughtful Thank-You** — 6-piece Coconut Bounty or Mixed Berry Jam in kraft box with note card.";
    alt1 = "**Assorted Gratitude** — Assorted Box so they discover every flavour.";
    alt2 = "**Small Gesture** — 6-piece single-flavour box, beautifully wrapped.";
  } else if (/festival|diwali|christmas|eid/.test(q)) {
    primary = "**Festive Hamper** — Multiple assorted boxes with seasonal ribbon and custom message cards.";
    alt1 = "**Family Sharing Box** — 18–24 piece assorted spread for gatherings.";
    alt2 = "**Premium Gifting Set** — Hazelnut + Chocolate Walnut combo boxes.";
  } else if (/baby|welcome|newborn/.test(q)) {
    primary = "**Sweet Welcome** — Soft-toned packaging with Mixed Berry Jam or Coconut Bounty 6-piece box.";
    alt1 = "**Assorted for the Family** — Assorted Box for visiting well-wishers.";
    alt2 = "**Mini Celebration Cake** — 250g brownie cake with a gentle message.";
  }

  if (/250|500/.test(budget) && !/1000/.test(budget)) {
    alt1 = "**Budget-Friendly Pick** — Single 6-piece flavour box (₹300–400 range depending on flavour).";
  }

  const text = `Gift ideas for **${occasion}** (${qty}, budget ${budget}):\n\n• ${primary}\n• ${alt1}\n• ${alt2}\n\nEvery box is handcrafted — share your theme on the order form and we'll confirm a personalised quote within 24 hours.`;

  return {
    provider: "local",
    text,
    suggestions: ["Use on order form", "WhatsApp for bulk quote"],
  };
}

export function runLocalEngine(request: AiRequest): AiResponse {
  const { feature, message = "", context, messages } = request;

  switch (feature) {
    case "concierge": {
      const lastUser =
        message ||
        [...(messages ?? [])].reverse().find((m) => m.role === "user")?.content ||
        "hello";
      return conciergeReply(lastUser);
    }
    case "cake-message":
      return cakeMessageReply(context);
    case "whatsapp":
      return whatsappReply(context, message);
    case "gift-recommend":
      return giftRecommendReply(context, message);
  }
}

export function parseNumberedSuggestions(text: string): string[] | undefined {
  const lines = text
    .split("\n")
    .map((l) => l.replace(/^\d+[\).\s-]+/, "").trim())
    .filter(Boolean);
  if (lines.length >= 2 && lines.every((l) => l.length < 120)) return lines.slice(0, 5);
  return undefined;
}