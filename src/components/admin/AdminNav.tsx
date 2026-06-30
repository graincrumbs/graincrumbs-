import { Link } from "@tanstack/react-router";
import { KeyRound, LogOut } from "lucide-react";

type AdminNavProps = {
  active?: "orders" | "brownies" | "cakes" | "cookie_tins" | "lite" | "pro";
  onSignOut: () => void;
};

const links = [
  { key: "orders" as const, to: "/admin", label: "Orders" },
  { key: "brownies" as const, to: "/admin/products", label: "Brownies" },
  { key: "cakes" as const, to: "/admin/cake-flavours", label: "Cakes" },
  { key: "cookie_tins" as const, to: "/admin/cookie-tins", label: "Cookie Tins" },
  { key: "lite" as const, to: "/admin/lite", label: "Lite" },
  { key: "pro" as const, to: "/admin/pro", label: "Pro" },
];

export function AdminNav({ active, onSignOut }: AdminNavProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <Link
          key={link.key}
          to={link.to}
          className={
            active === link.key
              ? "btn-primary"
              : "btn-outline"
          }
        >
          {link.label}
        </Link>
      ))}
      <Link to="/admin/change-password" className="btn-outline">
        <KeyRound className="h-4 w-4" /> Change Password
      </Link>
      <button onClick={onSignOut} className="btn-outline">
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}
