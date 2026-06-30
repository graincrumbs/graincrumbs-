import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { flavours as fallbackFlavours, type Flavour } from "@/lib/flavours";

export type Product = Flavour & {
  id: string;
  status: "live" | "coming_soon";
  premiumToppingLabel: string;
  premiumToppingPrice: number;
};

function mapRow(row: {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  image_url: string | null;
  notes: string[];
  price: number;
  premium_topping_label: string | null;
  premium_topping_price: number;
  status: "live" | "coming_soon";
}): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    image: row.image_url ?? "",
    notes: row.notes ?? [],
    price: row.price,
    status: row.status,
    premiumToppingLabel: row.premium_topping_label ?? "Premium Chocolate Toppings",
    premiumToppingPrice: row.premium_topping_price ?? 35,
  };
}

const fallbackProducts: Product[] = fallbackFlavours.map((f) => ({
  ...f,
  id: f.slug,
  status: "live",
  premiumToppingLabel: "Premium Chocolate Toppings",
  premiumToppingPrice: 35,
}));

/**
 * Fetches live products for the public site (brownies page, homepage, order page).
 * Falls back to the bundled static list so the site never shows an empty menu
 * if the request fails or hasn't resolved yet.
 */
export function useLiveProducts() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "live")
        .order("sort_order", { ascending: true });
      if (!cancelled && !error && data && data.length > 0) {
        setProducts(data.map(mapRow));
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading };
}
