import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { flavours as fallbackFlavours, type Flavour } from "@/lib/flavours";
import type { CookieTinVariant, ProductCollection } from "@/lib/product-collections";
import {
  DEFAULT_CLASSIC_COOKIE_FLAVOURS,
  DEFAULT_MILLET_COOKIE_FLAVOURS,
} from "@/lib/product-collections";

export type Product = Flavour & {
  id: string;
  status: "live" | "coming_soon";
  premiumToppingLabel: string;
  premiumToppingPrice: number;
  collection: ProductCollection;
  variant: CookieTinVariant | null;
};

type ProductRow = {
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
  collection: ProductCollection;
  variant: CookieTinVariant | null;
};

function mapRow(row: ProductRow): Product {
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
    collection: row.collection ?? "brownies",
    variant: row.variant ?? null,
  };
}

const fallbackProducts: Product[] = fallbackFlavours.map((f) => ({
  ...f,
  id: f.slug,
  status: "live" as const,
  premiumToppingLabel: "Premium Chocolate Toppings",
  premiumToppingPrice: 35,
  collection: "brownies" as const,
  variant: null,
}));

function fallbackCookieFlavours(variant: CookieTinVariant): Product[] {
  const names = variant === "classic" ? DEFAULT_CLASSIC_COOKIE_FLAVOURS : DEFAULT_MILLET_COOKIE_FLAVOURS;
  return names.map((name) => ({
    id: `${variant}-${name.toLowerCase().replace(/\s+/g, "-")}`,
    slug: `${variant}-${name.toLowerCase().replace(/\s+/g, "-")}`,
    name,
    tagline: "",
    description: "",
    image: "",
    notes: [],
    price: 0,
    status: "coming_soon" as const,
    premiumToppingLabel: "Premium Chocolate Toppings",
    premiumToppingPrice: 35,
    collection: "cookie_tins" as const,
    variant,
  }));
}

type CollectionQueryOptions = {
  status?: "live" | "all";
  variant?: CookieTinVariant;
};

/**
 * Fetches live brownie products for the public site.
 */
export function useLiveProducts() {
  return useCollectionProducts("brownies", { status: "live" });
}

/**
 * Fetches products for a collection from Supabase with static fallbacks.
 */
export function useCollectionProducts(collection: ProductCollection, options: CollectionQueryOptions = {}) {
  const { status = "live", variant } = options;
  const fallback =
    collection === "brownies"
      ? fallbackProducts
      : collection === "cookie_tins" && variant
        ? fallbackCookieFlavours(variant)
        : [];

  const [products, setProducts] = useState<Product[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let query = supabase
        .from("products")
        .select("*")
        .eq("collection", collection)
        .order("sort_order", { ascending: true });

      if (status === "live") {
        query = query.eq("status", "live");
      }
      if (variant) {
        query = query.eq("variant", variant);
      }

      const { data, error } = await query;
      if (!cancelled && !error && data && data.length > 0) {
        setProducts(data.map((row) => mapRow(row as ProductRow)));
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [collection, status, variant]);

  return { products, loading };
}

/**
 * Returns true when a collection has at least one live product.
 */
export function useCollectionIsLive(collection: ProductCollection) {
  const { products, loading } = useCollectionProducts(collection, { status: "live" });
  return { isLive: products.length > 0, loading };
}
