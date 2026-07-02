import { createFileRoute } from "@tanstack/react-router";
import { AdminProductsPanel } from "@/components/admin/AdminProductsPanel";

export const Route = createFileRoute("/admin/cookie-tins")({
  head: () => ({ meta: [{ title: "Cookie Tins — Admin — Grain Crumbs" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AdminProductsPanel
      config={{
        collection: "cookie_tins",
        title: "Cookie Cake Tins",
        navActive: "cookie_tins",
        addLabel: "Add flavour",
        showVariant: true,
      }}
    />
  ),
});
