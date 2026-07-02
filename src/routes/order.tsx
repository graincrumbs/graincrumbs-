import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, Loader2, MapPin, MessageCircle, ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { estimateDelivery } from "@/lib/delivery-estimate";
import { useCart, formatCartSummary } from "@/lib/cart-context";
import { CakeMessageWriter } from "@/components/ai/CakeMessageWriter";
import { GiftRecommender } from "@/components/ai/GiftRecommender";
import { WhatsAppAiAssistant } from "@/components/ai/WhatsAppAiAssistant";

const EMAILJS_SERVICE_ID = "service_o3pbjwb";
const EMAILJS_TEMPLATE_ID = "template_4ci5adc";
const EMAILJS_PUBLIC_KEY = "P8p-EPatFJBMOHmsz";

export const Route = createFileRoute("/order")({
  validateSearch: (search: Record<string, unknown>) => ({
    from: (search.from as string) ?? "",
  }),
  head: () => ({
    meta: [
      { title: "Order Now — Grain Crumbs" },
      { name: "description", content: "Place an order for Grain Crumbs millet brownies, brownie cakes, gift boxes or bulk orders. Pickup or delivery across Pune." },
      { property: "og:title", content: "Order Now — Grain Crumbs" },
      { property: "og:description", content: "Customise and request your Grain Crumbs order." },
    ],
  }),
  component: OrderPage,
});

type ProductType = "Brownies" | "Brownie Cake" | "Gift Box" | "Bulk / Corporate Order";
type Delivery = "Pickup" | "Delivery";

const productTypes: ProductType[] = ["Brownies", "Brownie Cake", "Gift Box", "Bulk / Corporate Order"];

// Regular flavours + Assorted Box at the bottom
const flavoursList = [
  "Chocolate Walnut", "Cappuccino Walnut", "Mixed Berry Jam",
  "Coconut Bounty", "Cream Cheese", "Hazelnut Spread",
];
const ASSORTED_BOX = "Assorted Box";
const flavoursWithAssorted = [...flavoursList, ASSORTED_BOX];

const ASSORTED_BOX_PRICE = 789;

const browniePieces = ["6 pieces", "12 pieces", "18 pieces", "24 pieces"];
// For assorted box — quantity means number of boxes (each box = 6 pieces, all 6 flavours)
const assortedBoxQty = ["1 box", "2 boxes", "3 boxes", "4 boxes", "5 boxes", "6+ boxes"];

// Helper to parse number of boxes from assortedQty string
function parseBoxCount(qty: string): number | null {
  const match = qty.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

const cakeWeights = ["250g", "500g", "650g", "1kg"];

const giftThemes = ["Birthday", "Anniversary", "Congratulations", "Thank You", "Baby Announcement", "Festival", "Other"];
const giftQtyOptions = ["1", "2–5", "6–10", "10+"];
const giftBudgetOptions = ["₹250–₹500", "₹500–₹1000", "₹1000+"];

const corporateBoxOptions = ["10–25", "25–50", "50–100", "100+"];
const brandingOptions = ["Logo Sticker", "Custom Message Card", "Custom Packaging", "Employee Names"];

const occasions = ["Birthday", "Anniversary", "Corporate Event", "Gift", "Other"];

function OrderPage() {
  const { from } = Route.useSearch();
  const { items: cartItems, subtotal: cartSubtotal, clearCart } = useCart();
  const hasCart = from === "cart" && cartItems.length > 0;

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  // Reference image state
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    type: "Brownies" as ProductType,
    flavour: flavoursList[0],
    browniePieces: browniePieces[0],
    assortedQty: assortedBoxQty[0],
    weight: cakeWeights[1],
    message: "", theme: "",
    delivery: "Pickup" as Delivery,
    address: "",
    pincode: "",
    occasion: "Birthday",
    date: "",
    notes: "",
    // Gift Box fields
    giftTheme: "Birthday",
    giftQty: "1",
    giftBudget: "",
    // Corporate fields
    companyName: "",
    corporateBoxes: corporateBoxOptions[0],
    corporateDeliveryDate: "",
    corporateBudgetPerBox: "",
    corporateBranding: [] as string[],
    corporateNotes: "",
  });

  const isAssortedBox = form.flavour === ASSORTED_BOX;

  // Compute assorted box total price
  const assortedBoxCount = isAssortedBox ? parseBoxCount(form.assortedQty) : null;
  const assortedBoxTotal = assortedBoxCount !== null
    ? assortedBoxCount * ASSORTED_BOX_PRICE
    : null;

  const estimate = estimateDelivery(form.pincode);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleBranding = (option: string) => {
    setForm((f) => ({
      ...f,
      corporateBranding: f.corporateBranding.includes(option)
        ? f.corporateBranding.filter((b) => b !== option)
        : [...f.corporateBranding, option],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setReferenceImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const cartSummary = useMemo(
    () => (hasCart ? formatCartSummary(cartItems) : ""),
    [hasCart, cartItems],
  );

  const waMessage = useMemo(() => {
    const lines = [
      `*New enquiry — Grain Crumbs*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      `Product: ${form.type}`,
      hasCart && form.type === "Brownies" && `Cart items: ${cartSummary}`,
      hasCart && form.type === "Brownies" && `Estimated total: ₹${cartSubtotal}`,
      !hasCart && form.type === "Brownies" && !isAssortedBox && `Flavour: ${form.flavour}`,
      !hasCart && form.type === "Brownies" && !isAssortedBox && `Pieces: ${form.browniePieces}`,
      !hasCart && form.type === "Brownies" && isAssortedBox && `Selection: Premium Assorted Box (all 6 flavours, 6 pieces per box)`,
      !hasCart && form.type === "Brownies" && isAssortedBox && `Number of Boxes: ${form.assortedQty}`,
      !hasCart && form.type === "Brownies" && isAssortedBox && assortedBoxTotal !== null && `Estimated Total: ₹${assortedBoxTotal}`,
      form.type === "Brownie Cake" && `Flavour: ${form.flavour}`,
      form.type === "Brownie Cake" && `Weight: ${form.weight}`,
      form.type === "Brownie Cake" && form.message && `Cake message: ${form.message}`,
      form.type === "Brownie Cake" && form.theme && `Theme: ${form.theme}`,
      form.type === "Gift Box" && `Gift Theme: ${form.giftTheme}`,
      form.type === "Gift Box" && `Number of Boxes: ${form.giftQty}`,
      form.type === "Gift Box" && form.giftBudget && `Budget per Box: ${form.giftBudget}`,
      form.type === "Bulk / Corporate Order" && `Company: ${form.companyName}`,
      form.type === "Bulk / Corporate Order" && `Boxes Required: ${form.corporateBoxes}`,
      form.type === "Bulk / Corporate Order" && form.corporateDeliveryDate && `Expected Delivery: ${form.corporateDeliveryDate}`,
      form.type === "Bulk / Corporate Order" && form.corporateBudgetPerBox && `Budget per Box: ${form.corporateBudgetPerBox}`,
      form.type === "Bulk / Corporate Order" && form.corporateBranding.length > 0 && `Branding: ${form.corporateBranding.join(", ")}`,
      form.type === "Bulk / Corporate Order" && form.corporateNotes && `Additional Requirements: ${form.corporateNotes}`,
      `Delivery: ${form.delivery}`,
      form.delivery === "Delivery" && form.address && `Address: ${form.address}`,
      form.type !== "Bulk / Corporate Order" && `Occasion: ${form.occasion}`,
      form.date && `Date required: ${form.date}`,
      form.notes && `Notes: ${form.notes}`,
    ].filter(Boolean).join("\n");
    return encodeURIComponent(lines);
  }, [form, hasCart, cartSummary, cartSubtotal, isAssortedBox, assortedBoxTotal]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = form.email.trim();

    if (!email) {
      alert("Please enter your email address so we can send your confirmation email.");
      return;
    }

    setSubmitting(true);
    try {
      // Upload reference image if provided
      let imageUrl: string | null = null;
      if (referenceImage && form.type === "Brownie Cake") {
        const fileExt = referenceImage.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("order-images")
          .upload(fileName, referenceImage, { upsert: false });

        if (uploadError) {
          console.warn("Image upload failed (order will still be saved):", uploadError);
        } else {
          const { data: urlData } = supabase.storage
            .from("order-images")
            .getPublicUrl(fileName);
          imageUrl = urlData.publicUrl;
        }
      }

      const cartNotes = hasCart && form.type === "Brownies"
        ? [form.notes, `Cart: ${cartSummary} (Est. ₹${cartSubtotal})`].filter(Boolean).join("\n")
        : form.notes || null;

      // For assorted box: flavour = "Assorted Box", weight = number of boxes
      const flavourValue = form.type === "Brownies" || form.type === "Brownie Cake"
        ? hasCart && form.type === "Brownies"
          ? cartItems.map((i) => i.name).join(", ")
          : isAssortedBox
            ? "Premium Assorted Box (all 6 flavours, 6 pieces per box)"
            : form.flavour
        : null;

      const weightValue = form.type === "Brownie Cake"
        ? form.weight
        : form.type === "Brownies" && !hasCart
          ? isAssortedBox
            ? form.assortedQty
            : form.browniePieces
          : hasCart ? cartSummary : null;

      const { data, error } = await supabase.from("orders").insert({
        name: form.name,
        phone: form.phone,
        email,
        product_type: form.type,
        flavour: flavourValue,
        weight: weightValue,
        cake_message: form.message || null,
        theme: form.type === "Brownie Cake"
          ? form.theme || null
          : form.type === "Gift Box" ? form.giftTheme : null,
        delivery: form.delivery,
        address: form.delivery === "Delivery" ? form.address : null,
        occasion: form.type !== "Bulk / Corporate Order" ? form.occasion : null,
        date_required: form.date || null,
        notes: cartNotes,
        image_url: imageUrl,
      }).select("order_number").single();

      if (error) throw error;

      const newOrderNumber = data?.order_number ?? null;
      setOrderNumber(newOrderNumber);

      // Send confirmation email via EmailJS (non-blocking)
      if (email) {
        try {
          await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              service_id: EMAILJS_SERVICE_ID,
              template_id: EMAILJS_TEMPLATE_ID,
              user_id: EMAILJS_PUBLIC_KEY,
              template_params: {
                to_email: email,
                customer_name: form.name,
                order_number: String(newOrderNumber ?? ""),
                product_type: form.type,
                delivery: form.delivery === "Delivery" ? `Delivery to ${form.address}` : "Pickup",
                date_required: form.date || "To be confirmed",
              },
            }),
          });
        } catch (emailErr) {
          console.warn("Email failed (order still saved):", emailErr);
        }
      }

      if (hasCart) clearCart();
      setSubmitted(true);
    } catch (err) {
      console.error("Order submission error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      alert(`Could not submit: ${msg}. Please try WhatsApp instead.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    const isCorporate = form.type === "Bulk / Corporate Order";
    return (
      <section className="section">
        <div className="container-prose max-w-2xl">
          <Reveal>
            <div className="rounded-[2rem] border border-[color:var(--gold)]/30 bg-card p-10 text-center md:p-14">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[color:var(--gold)] text-[color:var(--chocolate-dark)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h1 className="mt-6 font-display text-4xl md:text-5xl">Thank you!</h1>

              {orderNumber !== null && (
                <div className="mt-6 inline-block rounded-2xl border border-[color:var(--gold)]/40 bg-[color:var(--cream-dark)]/60 px-8 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--gold)]">Your Enquiry ID</p>
                  <p className="mt-1 font-display text-4xl text-[color:var(--chocolate-dark)]">#{orderNumber}</p>
                </div>
              )}

              <p className="mt-6 text-muted-foreground">
                {isCorporate
                  ? "Thank you for your enquiry! We will review your requirements and share a personalized quotation shortly."
                  : "We've received your request and will contact you shortly to confirm availability, pricing and customisation details."}
              </p>
              {form.email && (
                <p className="mt-3 text-sm text-[color:var(--gold)]">
                  A confirmation email has been sent to <strong>{form.email}</strong>
                </p>
              )}
              <p className="mt-2 text-sm text-muted-foreground">
                Prefer to chat? Send the same details on WhatsApp for the fastest reply.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={`https://wa.me/918208257574?text=${waMessage}`}
                  target="_blank" rel="noreferrer"
                  className="btn-gold"
                >
                  <MessageCircle className="h-4 w-4" /> Send on WhatsApp
                </a>
                <Link to="/" className="btn-outline">Back to home</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  const isCorporate = form.type === "Bulk / Corporate Order";
  const isGiftBox = form.type === "Gift Box";
  const isBrownies = form.type === "Brownies";
  const isBrownieCake = form.type === "Brownie Cake";

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-prose py-16 text-center md:py-20">
          <p className="divider-gold eyebrow">Place an Order</p>
          <h1 className="mt-5 font-display text-5xl md:text-6xl">Tell us what to bake.</h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Fill in the form below and we'll get back within minutes with availability,
            pricing and the next steps.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-prose grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <form onSubmit={onSubmit} className="space-y-10 rounded-[2rem] border border-border bg-card p-6 md:p-10">

              <Fieldset title="Customer Information" step="01">
                <Field label="Full Name" required>
                  <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} placeholder="Your name" />
                </Field>
                {/* ── CHANGED: label updated + WhatsApp hint added below the input ── */}
                <Field label="WhatsApp Number" required>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputCls}
                    placeholder="+91 9XXXX XXXXX"
                  />
                  <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <MessageCircle className="h-3 w-3 shrink-0 text-[color:var(--gold)]" />
                    Please enter your WhatsApp number — we'll use this to confirm your order.
                    If your WhatsApp number is different from your regular number, use that one here.
                  </p>
                </Field>
                <Field label="Email" required>
                  <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} placeholder="you@example.com" />
                </Field>
              </Fieldset>

              <Fieldset title="Product Selection" step="02">
                <Field label="What would you like?" full>
                  <ChipGroup options={productTypes} value={form.type} onChange={(v) => update("type", v)} />
                </Field>

                {/* BROWNIES — cart flow */}
                {isBrownies && hasCart && (
                  <div className="sm:col-span-2 rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--cream-dark)]/40 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <ShoppingBag className="h-4 w-4 text-[color:var(--gold)]" />
                      <p className="eyebrow !mb-0">Your cart</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {cartItems.map((item) => (
                        <li key={item.slug} className="flex justify-between gap-4">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 font-display text-xl text-[color:var(--chocolate)]">
                      Estimated total: ₹{cartSubtotal}
                    </p>
                  </div>
                )}

                {/* BROWNIES — manual / no cart flow */}
                {isBrownies && !hasCart && (
                  <>
                    {/* Flavour dropdown includes Premium Assorted Box at the bottom */}
                    <Field label="Flavour" full>
                      <select
                        value={form.flavour}
                        onChange={(e) => update("flavour", e.target.value)}
                        className={inputCls}
                      >
                        {flavoursList.map((f) => <option key={f}>{f}</option>)}
                        <option disabled>──────────</option>
                        <option value={ASSORTED_BOX}>Premium Assorted Box</option>
                      </select>
                    </Field>

                    {/* Assorted Box note */}
                    {isAssortedBox && (
                      <div className="sm:col-span-2 flex items-start gap-2 rounded-xl border border-[color:var(--gold)]/40 bg-[color:var(--cream-dark)]/50 px-4 py-3 text-sm">
                        <span className="mt-0.5 shrink-0 font-semibold text-[color:var(--gold)]">*</span>
                        <p className="text-muted-foreground">
                          This box will have <span className="font-medium text-foreground">all 6 flavours</span> — 6 pieces per box (one of each flavour). Includes artisanal toppings and decorations. Select how many boxes you'd like below.
                        </p>
                      </div>
                    )}

                    {/* Pricing card — shown above the quantity selector when Assorted Box is selected */}
                    {isAssortedBox && (
                      <div className="sm:col-span-2 rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--cream-dark)]/40 px-5 py-4">
                        <div className="flex items-end justify-between flex-wrap gap-2">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Price per Box</p>
                            <p className="mt-1 font-display text-3xl text-[color:var(--chocolate-dark)]">
                              ₹{ASSORTED_BOX_PRICE}
                            </p>
                          </div>
                          {assortedBoxTotal !== null && (
                            <div className="text-right">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                {form.assortedQty} × ₹{ASSORTED_BOX_PRICE}
                              </p>
                              <p className="mt-1 font-display text-3xl text-[color:var(--chocolate)]">
                                ₹{assortedBoxTotal}
                              </p>
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-[11px] text-muted-foreground">
                          * Estimated total. Final price confirmed on order review.
                        </p>
                      </div>
                    )}

                    {/* Quantity — changes label/options based on assorted vs regular */}
                    {isAssortedBox ? (
                      <Field label="Number of Boxes">
                        <ChipGroup
                          options={assortedBoxQty}
                          value={form.assortedQty}
                          onChange={(v) => update("assortedQty", v)}
                        />
                      </Field>
                    ) : (
                      <Field label="Number of Pieces">
                        <ChipGroup
                          options={browniePieces}
                          value={form.browniePieces}
                          onChange={(v) => update("browniePieces", v)}
                        />
                      </Field>
                    )}
                  </>
                )}

                {/* BROWNIE CAKE */}
                {isBrownieCake && (
                  <>
                    <Field label="Flavour">
                      <select value={form.flavour} onChange={(e) => update("flavour", e.target.value)} className={inputCls}>
                        {flavoursList.map((f) => <option key={f}>{f}</option>)}
                      </select>
                    </Field>
                    <Field label="Weight / Size">
                      <ChipGroup options={cakeWeights} value={form.weight} onChange={(v) => update("weight", v)} />
                    </Field>
                  </>
                )}

                {/* GIFT BOX */}
                {isGiftBox && (
                  <>
                    <Field label="Theme" full>
                      <select value={form.giftTheme} onChange={(e) => update("giftTheme", e.target.value)} className={inputCls}>
                        {giftThemes.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field label="Number of Gift Boxes">
                      <select value={form.giftQty} onChange={(e) => update("giftQty", e.target.value)} className={inputCls}>
                        {giftQtyOptions.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field label="Budget per Box (Optional)">
                      <select value={form.giftBudget} onChange={(e) => update("giftBudget", e.target.value)} className={inputCls}>
                        <option value="">Select a range</option>
                        {giftBudgetOptions.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                    <div className="sm:col-span-2">
                      <GiftRecommender
                        compact
                        onApply={({ occasion, budget, quantity }) => {
                          const themeMap: Record<string, string> = {
                            Birthday: "Birthday",
                            Anniversary: "Anniversary",
                            "Thank You": "Thank You",
                            Festival: "Festival",
                            Corporate: "Other",
                            "Baby Announcement": "Baby Announcement",
                            Other: "Other",
                          };
                          update("giftTheme", themeMap[occasion] ?? "Other");
                          if (budget) update("giftBudget", budget);
                          if (quantity === "1 box") update("giftQty", "1");
                          else if (quantity === "2–5 boxes") update("giftQty", "2–5");
                          else if (quantity === "6–10 boxes") update("giftQty", "6–10");
                          else if (quantity === "10+ boxes") update("giftQty", "10+");
                        }}
                      />
                    </div>
                  </>
                )}

                {/* BULK / CORPORATE */}
                {isCorporate && (
                  <>
                    <Field label="Company Name" full>
                      <input value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className={inputCls} placeholder="Your company name" />
                    </Field>
                    <Field label="Number of Boxes Required">
                      <select value={form.corporateBoxes} onChange={(e) => update("corporateBoxes", e.target.value)} className={inputCls}>
                        {corporateBoxOptions.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field label="Expected Delivery Date">
                      <input type="date" value={form.corporateDeliveryDate} onChange={(e) => update("corporateDeliveryDate", e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Approximate Budget per Box">
                      <input value={form.corporateBudgetPerBox} onChange={(e) => update("corporateBudgetPerBox", e.target.value)} className={inputCls} placeholder="e.g. ₹500" />
                    </Field>
                    <Field label="Branding Requirements" full>
                      <div className="flex flex-wrap gap-3 mt-1">
                        {brandingOptions.map((opt) => (
                          <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm">
                            <input
                              type="checkbox"
                              checked={form.corporateBranding.includes(opt)}
                              onChange={() => toggleBranding(opt)}
                              className="h-4 w-4 rounded border-input accent-[color:var(--chocolate-dark)]"
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </Field>
                    <Field label="Additional Requirements" full>
                      <textarea value={form.corporateNotes} onChange={(e) => update("corporateNotes", e.target.value)} className={`${inputCls} min-h-24`} placeholder="Any specific requirements, themes, or instructions." />
                    </Field>
                    <div className="sm:col-span-2 rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--cream-dark)]/40 p-5 text-sm text-muted-foreground">
                      <p>Every gift box is handcrafted and customized based on your requirements.</p>
                      <p className="mt-1">Submit your enquiry and we'll get back to you with a personalized quotation within 24 hours.</p>
                    </div>
                  </>
                )}
              </Fieldset>

              {/* Customisation — only for Brownie Cake */}
              {isBrownieCake && (
                <Fieldset title="Customisation" step="03">
                  <Field label="Cake Message" full>
                    <input value={form.message} onChange={(e) => update("message", e.target.value)} className={inputCls} placeholder="e.g. Happy Birthday, Aanya!" />
                    <CakeMessageWriter
                      occasion={form.occasion}
                      value={form.message}
                      onSelect={(message) => update("message", message)}
                    />
                  </Field>
                  <Field label="Theme Request">
                    <input value={form.theme} onChange={(e) => update("theme", e.target.value)} className={inputCls} placeholder="Floral, minimal, gold accents…" />
                  </Field>
                  <Field label="Reference Image (optional)" full>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-[color:var(--chocolate-dark)] file:px-4 file:py-2 file:text-[color:var(--cream)] hover:file:bg-[color:var(--chocolate)]"
                    />
                    {imagePreview && (
                      <div className="mt-3 overflow-hidden rounded-xl border border-[color:var(--gold)]/30">
                        <img src={imagePreview} alt="Reference preview" className="max-h-48 w-full object-cover" />
                        <p className="px-3 py-2 text-xs text-muted-foreground">Preview — this image will be sent with your order</p>
                      </div>
                    )}
                  </Field>
                </Fieldset>
              )}

              <Fieldset title="Delivery" step={isBrownieCake ? "04" : "03"}>
                <Field label="How will you receive it?" full>
                  <ChipGroup options={["Pickup", "Delivery"]} value={form.delivery} onChange={(v) => update("delivery", v as Delivery)} />
                </Field>
                {form.delivery === "Delivery" && (
                  <>
                    <Field label="Delivery Address" full>
                      <textarea required value={form.address} onChange={(e) => update("address", e.target.value)} className={`${inputCls} min-h-24`} placeholder="Full address, landmark, pincode" />
                    </Field>
                    <Field label="Delivery Pincode" full>
                      <input
                        inputMode="numeric"
                        pattern="\d{6}"
                        maxLength={6}
                        value={form.pincode}
                        onChange={(e) => update("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className={inputCls}
                        placeholder="e.g. 411014"
                      />
                      <DeliveryEstimateCard estimate={estimate} pincode={form.pincode} />
                    </Field>
                  </>
                )}
                {!isCorporate && (
                  <Field label="Occasion">
                    <select value={form.occasion} onChange={(e) => update("occasion", e.target.value)} className={inputCls}>
                      {occasions.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                )}
                <Field label="Date Required" required>
                  <input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={inputCls} />
                </Field>
                {!isCorporate && (
                  <Field label="Additional Notes" full>
                    <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} className={`${inputCls} min-h-24`} placeholder="Allergies, decorations, anything else." />
                  </Field>
                )}
              </Fieldset>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
                <p className="text-xs text-muted-foreground">
                  By submitting, you agree to be contacted for order confirmation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/918208257574?text=${waMessage}`}
                    target="_blank" rel="noreferrer"
                    className="btn-outline"
                  >
                    <MessageCircle className="h-4 w-4" /> Send on WhatsApp instead
                  </a>
                  <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                    {submitting
                      ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>)
                      : isCorporate || isGiftBox
                        ? "Submit Enquiry"
                        : "Submit Enquiry"}
                  </button>
                </div>
              </div>
            </form>
          </Reveal>

          <Reveal delay={150}>
            <aside className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-[color:var(--gold)]/30 bg-card p-7">
                <p className="eyebrow">What happens next</p>
                <ol className="mt-4 space-y-4 text-sm">
                  {[
                    "We receive your enquiry instantly.",
                    "You hear back with availability and pricing.",
                    "You confirm details and complete payment.",
                    "We bake fresh — and deliver or arrange pickup.",
                  ].map((s, i) => (
                    <li key={s} className="flex gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--chocolate-dark)] text-[10px] text-[color:var(--cream)]">{i + 1}</span>
                      <span className="text-muted-foreground">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <WhatsAppAiAssistant
                compact
                defaultContext={{
                  name: form.name,
                  phone: form.phone,
                  product: form.type,
                  flavour: form.flavour,
                  delivery: form.delivery,
                  date: form.date,
                  notes: form.notes,
                }}
              />
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30";

function Fieldset({ title, step, children }: { title: string; step: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-6 flex items-center gap-4">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--chocolate-dark)] text-xs text-[color:var(--cream)]">{step}</span>
        <span className="font-display text-2xl">{title}</span>
      </legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({ label, children, full, required }: { label: string; children: React.ReactNode; full?: boolean; required?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label} {required && <span className="text-[color:var(--gold)]">*</span>}
      </span>
      {children}
    </label>
  );
}

function ChipGroup<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active
                ? "border-[color:var(--chocolate-dark)] bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]"
                : "border-border bg-background hover:border-[color:var(--gold)]"
            }`}
            aria-pressed={active}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function DeliveryEstimateCard({
  estimate,
  pincode,
}: {
  estimate: ReturnType<typeof estimateDelivery>;
  pincode: string;
}) {
  if (!pincode) return null;

  const headerCls =
    "mt-4 rounded-2xl border border-[color:var(--gold)]/30 bg-[color:var(--cream-dark)]/40 p-5";

  if (estimate.kind === "invalid") {
    return (
      <div className={headerCls}>
        <p className="text-sm text-muted-foreground">
          Enter a valid 6-digit pincode to see an estimated delivery charge.
        </p>
      </div>
    );
  }

  const whatsappQuoteText = encodeURIComponent(
    `Hi Grain Crumbs! I'd like to confirm delivery availability and charges for my location (pincode: ${pincode}). Can you help?`
  );
  const whatsappQuoteUrl = `https://wa.me/918208257574?text=${whatsappQuoteText}`;

  if (estimate.kind === "unknown") {
    return (
      <div className={headerCls}>
        <div className="flex items-center gap-2 text-[color:var(--chocolate-dark)]">
          <MapPin className="h-4 w-4 text-[color:var(--gold)]" />
          <p className="eyebrow !mb-0">Contact for Quote</p>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Please WhatsApp us to confirm delivery availability and exact charges for your location.
        </p>
        <a href={whatsappQuoteUrl} target="_blank" rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--chocolate-dark)] hover:opacity-90 transition-opacity">
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Us
        </a>
      </div>
    );
  }

  if (estimate.kind === "quote") {
    return (
      <div className={headerCls}>
        <div className="flex items-center gap-2 text-[color:var(--chocolate-dark)]">
          <MapPin className="h-4 w-4 text-[color:var(--gold)]" />
          <p className="eyebrow !mb-0">Contact for Quote</p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          ~{estimate.km} km from Kharadi · {estimate.label}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Please WhatsApp us to confirm delivery availability and exact charges for your location.
        </p>
        <a href={whatsappQuoteUrl} target="_blank" rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--chocolate-dark)] hover:opacity-90 transition-opacity">
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Us
        </a>
      </div>
    );
  }

  return (
    <div className={headerCls}>
      <div className="flex items-center gap-2 text-[color:var(--chocolate-dark)]">
        <MapPin className="h-4 w-4 text-[color:var(--gold)]" />
        <p className="eyebrow !mb-0">Estimated Delivery Charge</p>
      </div>
      <p className="mt-3 font-display text-3xl text-[color:var(--chocolate-dark)]">
        {estimate.charge}{" "}
        <span className="text-sm font-normal text-muted-foreground">(Approx.)</span>
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        ~{estimate.km} km from Kharadi · {estimate.label}
      </p>
      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        * Final delivery charges may vary based on exact location, order size, and
        delivery partner availability. This estimate is shown for reference only and
        is not added to your order total.
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
        * You may also book your preferred delivery partner (Porter / Uber / Rapido, etc.)
        for pickup from our location at your convenience.
      </p>
    </div>
  );
}