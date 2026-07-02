import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type SitePage = Tables<"site_pages">;

const fallbacks: Record<string, SitePage> = {
  "cookie-tins": {
    id: "cookie-tins", slug: "cookie-tins", status: "coming_soon",
    eyebrow: "Grain Crumbs · Cookie Cake Tins",
    title_line1: "Cookies Worth", title_line2: "Sharing.",
    description: "Thoughtfully baked Cookie Cake Tins crafted for gifting, celebrations and everyday indulgence. Whether you love classic flavours or wholesome millet creations, there's a Grain Crumbs Cookie Cake Tin waiting for you.",
    hero_image_url: "/assets/grain-crumbs/cookie-tins/cookie-main-new.png",
    cta_label: "Notify Me When Available", updated_at: "",
  },
  "grain-crumbs-lite": {
    id: "grain-crumbs-lite", slug: "grain-crumbs-lite", status: "coming_soon",
    eyebrow: "Grain Crumbs · Lite",
    title_line1: "Grain Crumbs Lite.", title_line2: "Lighter sweetness. Same indulgence.",
    description: "Thoughtfully crafted for people who want to enjoy dessert with reduced added sugar — without compromising on taste.",
    hero_image_url: "/assets/grain-crumbs/lite/lite-hero.png",
    cta_label: "Notify Me When Available", updated_at: "",
  },
  "grain-crumbs-pro": {
    id: "grain-crumbs-pro", slug: "grain-crumbs-pro", status: "coming_soon",
    eyebrow: "Grain Crumbs · Pro",
    title_line1: "Protein Meets", title_line2: "Indulgence.",
    description: "High-protein brownies thoughtfully crafted for fitness enthusiasts, gym-goers and active lifestyles — because healthy eating should still feel indulgent.",
    hero_image_url: "/assets/grain-crumbs/pro/pro-hero.png",
    cta_label: "Notify Me When Available", updated_at: "",
  },
};

export function useSitePage(slug: string) {
  const [page, setPage] = useState<SitePage>(fallbacks[slug]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.from("site_pages").select("*").eq("slug", slug).maybeSingle();
      if (!cancelled && !error && data) setPage(data);
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { page, loading };
}
