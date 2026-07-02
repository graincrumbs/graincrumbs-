import { createFileRoute } from "@tanstack/react-router";
import { AdminProductsPanel } from "@/components/admin/AdminProductsPanel";

export const Route = createFileRoute("/admin/lite")({
  head: () => ({ meta: [{ title: "Lite — Admin — Grain Crumbs" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AdminProductsPanel
      config={{
        collection: "lite",
        title: "Grain Crumbs Lite",
        navActive: "lite",
        showPremiumTopping: true,
      }}
    />
  ),
});
