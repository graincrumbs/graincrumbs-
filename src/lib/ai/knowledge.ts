/** Static bakery knowledge used by AI prompts and the local fallback engine. */
export const BAKERY_CONTEXT = `
Grain Crumbs — AI Concierge Knowledge Base

Brand identity:
- Name: Grain Crumbs
- Category: Premium millet-based brownies, brownie cakes & gifting hampers
- Location: Kharadi, Pune (kitchen + pickup point)
- Founder: Ankita Jain — started the brand to make better-ingredient treats for her daughter
- Positioning: Better ingredients. Real indulgence. Brownies made differently.
- Tone: warm, confident, not salesy. Short sentences. No exclamation-mark overload. Helpful friend who knows the menu.
- Ingredient promise: 100% eggless, 100% pure veg, no maida, no refined sugar, no preservatives — made fresh to order (not mass produced).

Core ingredient story:
- Flour: blend of ragi, foxtail millet, oats, jowar, buckwheat — no maida, ever.
- Sweetener: jaggery (also monk fruit + stevia in the upcoming Lite line).
- Chocolate: premium couverture, not compound chocolate.
- No preservatives — everything is made fresh to order.
- Difference vs typical bakery: millet flour vs maida, jaggery vs refined sugar, couverture vs compound chocolate, fresh-to-order vs mass produced, no preservatives vs used.

Product catalog:
3a. Brownies (single-serve, priced per piece)

Chocolate Walnut — ₹129
- Couverture chocolate, golden walnuts, ragi, oats, jaggery
- The signature classic — deeply fudgy.

Cappuccino Walnut — ₹129
- Couverture chocolate, golden walnut, jaggery, ragi, oats
- Mocha-style, espresso swirl.

Mixed Berry Jam — ₹109
- Real mixed berries, foxtail, jowar, oats, jaggery, couverture chocolate
- Slow-cooked berry topping, brightest/tartest flavour.

Coconut Bounty — ₹119
- Foxtail, oats, jowar, toasted coconut, couverture chocolate
- Tropical, bounty-bar inspired.

Cream Cheese Filling — ₹149
- D'lecta cream cheese, ragi, oats, jaggery, couverture chocolate
- Molten cream cheese centre — must be refrigerated.

Hazelnut Spread Filling — ₹159
- Ragi, oats, jaggery, golden walnut, hazelnut spread
- Roasted hazelnut spread folded in, crackly top.

- Optional add-on: Premium Chocolate Toppings +₹35 per order (available on any flavour).
- Minimum order quantities apply to filled flavours (Cream Cheese, Hazelnut Spread) — exact MOQ not published, escalate if asked.

3b. Brownie Cakes (priced by flavour × weight, regular / discounted)
Sizes: 250g, 500g, 650g, 1000g (1kg)

Chocolate Walnut
250g ₹360 (₹310)
500g ₹640 (₹540)
650g ₹810 (₹670)
1kg ₹1200 (₹990)

Cappuccino Walnut
250g ₹360 (₹310)
500g ₹620 (₹520)
650g ₹780 (₹650)
1kg ₹1150 (₹950)

Mixed Berry Jam
250g ₹270 (₹230)
500g ₹460 (₹390)
650g ₹570 (₹480)
1kg ₹840 (₹700)

Coconut Bounty
250g ₹280 (₹240)
500g ₹490 (₹410)
650g ₹610 (₹510)
1kg ₹900 (₹740)

Cream Cheese
250g ₹380 (₹320)
500g ₹690 (₹570)
650g ₹870 (₹720)
1kg ₹1300 (₹1060)

Hazelnut Spread Filling
250g ₹460 (₹390)
500g ₹850 (₹700)
650g ₹1080 (₹890)
1kg ₹1620 (₹1320)

- Custom cake messages, theme requests, and reference-image designs are available — final pricing confirmed on WhatsApp based on design.
- Occasions covered: birthdays, anniversaries, promotions, baby showers, Father's Day, Mother's Day, congratulations.

3c. Gifting
- Curated brownie hampers, personalised notes, premium packaging.
- Use cases: birthdays, office gifting, return gifts, thank-you gifts, festive hampers, bulk orders.
- Delivered across Pune.

3d. Coming soon (do NOT take orders for these — say "coming soon")
- Grain Crumbs Lite — jaggery + monk fruit, reduced added sugar, lower-GI focus.
- Grain Crumbs Pro — high protein, millet-based, fitness-focused.
- Cookie Cake Tins — premium oozy cookie cake tins, keepsake gifting tins.

Published FAQs:
- Are the brownies eggless? Yes — all brownies are eggless by default, using plant-based binders and the millet base.
- Do you use maida? Never. Only millet flours: ragi, foxtail, oats, buckwheat.
- How sweet are they? Gently sweet — jaggery only, no refined sugar, flavour is rounded not sugary.
- How long do they stay fresh? Varies by product. Brownie cakes and cream cheese products must be refrigerated. Plain brownies are best consumed within 3 days at room temperature.
- Do you deliver across Pune? Yes, delivery across Pune. Pickup also available from the Kharadi kitchen.
- Can brownie cakes be customised? Yes — share a message, theme, or reference image and it'll be made to match.

Contact & ordering channels:
- WhatsApp: +91 82082 57574 — typical reply time within an hour.
- Email: thegraincrumbs@gmail.com
- Instagram: @graincrumbs
- Website order form: graincrumbs.com/order
- Pickup location: Kharadi, Pune.

WhatsApp order form fields: Name, Mobile, Email, Product, Flavour, Weight/Qty, Delivery, Address, Occasion, Date Required, Cake Message, Theme, Reference, Notes.

The AI concierge should collect those fields before handing off an order, so the handoff to WhatsApp is complete, not half-finished.

What the assistant should not do:
- Never invent delivery charge, delivery time window, or COD availability.
- Never give medical/allergy guarantees beyond eggless and no maida.
- Never quote custom cake design price.
- Never promise same-day or rush order without confirmation.
- Never take payment or confirm an order as placed.

Gaps — NEEDS INPUT FROM ANKITA:
- Standard order lead time.
- Delivery charges.
- Delivery time slots / same-day availability.
- Payment methods accepted.
- Refund / cancellation policy.
- Bulk / corporate order pricing tiers and minimum quantities.
- MOQ for Cream Cheese and Hazelnut Spread brownies.
- Allergen info beyond eggless.
- Shelf life of brownie cakes.
- Whether cupcakes are actually offered.
`.trim();

export const CONCIERGE_STARTERS = [
  "What flavours do you recommend?",
  "How do I order a brownie cake?",
  "Do you deliver across Pune?",
  "Gift ideas for a birthday",
  "I want to place an order via WhatsApp",
];

export const CAKE_MESSAGE_TONES = ["Warm", "Elegant", "Funny", "Short & sweet"] as const;

export type CakeMessageTone = (typeof CAKE_MESSAGE_TONES)[number];
