import type { Enums } from "@/integrations/supabase/types";

export type ProductCollection = Enums<"product_collection">;
export type CookieTinVariant = Enums<"cookie_tin_variant">;

export const COLLECTION_LABELS: Record<ProductCollection, string> = {
  brownies: "Brownies",
  cookie_tins: "Cookie Tins",
  lite: "Lite",
  pro: "Pro",
};

export const DEFAULT_CLASSIC_COOKIE_FLAVOURS = [
  "Vanilla",
  "Red Velvet",
  "Oozy Dark Chocolate",
  "Pistachio",
  "Biscoff",
];

export const DEFAULT_MILLET_COOKIE_FLAVOURS = [
  "Oozy Dark Chocolate",
  "Red Velvet",
  "Pistachio",
  "Biscoff",
];
