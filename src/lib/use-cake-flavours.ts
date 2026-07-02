import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type CakeFlavour = Tables<"cake_flavours">;

const fallback: CakeFlavour[] = [
  { id: "1", name: "Chocolate Walnut", image_url: "/assets/grain-crumbs/chocolate-walnut.png", price_250: 310, old_price_250: 360, price_500: 540, old_price_500: 640, price_650: 670, old_price_650: 810, price_1000: 990, old_price_1000: 1200, sort_order: 1, created_at: "", updated_at: "" },
  { id: "2", name: "Cappuccino Walnut", image_url: "/assets/grain-crumbs/cappuccino-walnut.png", price_250: 310, old_price_250: 360, price_500: 520, old_price_500: 620, price_650: 650, old_price_650: 780, price_1000: 950, old_price_1000: 1150, sort_order: 2, created_at: "", updated_at: "" },
  { id: "3", name: "Mixed Berry Jam", image_url: "/assets/grain-crumbs/mixed-berry-jam.png", price_250: 230, old_price_250: 270, price_500: 390, old_price_500: 460, price_650: 480, old_price_650: 570, price_1000: 700, old_price_1000: 840, sort_order: 3, created_at: "", updated_at: "" },
  { id: "4", name: "Coconut Bounty", image_url: "/assets/grain-crumbs/coconut-bounty.png", price_250: 240, old_price_250: 280, price_500: 410, old_price_500: 490, price_650: 510, old_price_650: 610, price_1000: 740, old_price_1000: 900, sort_order: 4, created_at: "", updated_at: "" },
  { id: "5", name: "Cream Cheese", image_url: "/assets/grain-crumbs/cream-cheese.png", price_250: 320, old_price_250: 380, price_500: 570, old_price_500: 690, price_650: 720, old_price_650: 870, price_1000: 1060, old_price_1000: 1300, sort_order: 5, created_at: "", updated_at: "" },
  { id: "6", name: "Hazelnut Spread Filling", image_url: "/assets/grain-crumbs/hazelnut-spread.png", price_250: 390, old_price_250: 460, price_500: 700, old_price_500: 850, price_650: 890, old_price_650: 1080, price_1000: 1320, old_price_1000: 1620, sort_order: 6, created_at: "", updated_at: "" },
];

export function useCakeFlavours() {
  const [flavours, setFlavours] = useState<CakeFlavour[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("cake_flavours")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!cancelled && !error && data && data.length > 0) setFlavours(data);
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { flavours, loading };
}
