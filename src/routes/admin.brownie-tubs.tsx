import { createFileRoute } from "@tanstack/react-router";
import { AdminProductsPanel } from "@/components/admin/AdminProductsPanel";

export const Route = createFileRoute("/admin/brownie-tubs")({
  head: () => ({ meta: [{ title: "Brownie Tubs — Admin — Grain Crumbs" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <AdminProductsPanel
      config={{
        collection: "brownie_tubs",
        title: "Brownie Tubs",
        navActive: "brownie_tubs",
        addLabel: "Add tub flavour",
      }}
    />
  ),
});
