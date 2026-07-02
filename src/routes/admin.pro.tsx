import { createFileRoute } from "@tanstack/react-router";
import { AdminProductsPanel } from "@/components/admin/AdminProductsPanel";

export const Route = createFileRoute("/admin/pro")({
  head: () => ({ meta: [{ title: "Pro — Admin — Grain Crumbs" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AdminProductsPanel
      config={{
        collection: "pro",
        title: "Grain Crumbs Pro",
        navActive: "pro",
        showPremiumTopping: true,
      }}
    />
  ),
});
