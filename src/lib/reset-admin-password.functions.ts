import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ADMIN_EMAIL = "ankita.junankar@gmail.com";

const checkSchema = z.object({
  email: z.string().email().max(255),
});

/**
 * Verify the supplied email belongs to an admin account.
 * Returns { ok: true } when the email matches the admin user with the admin role.
 */
export const verifyAdminEmail = createServerFn({ method: "POST" })
  .inputValidator((input) => checkSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.email.trim().toLowerCase() !== ADMIN_EMAIL) {
      throw new Error("This email is not authorised for admin access.");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers();
    if (listErr) throw new Error(listErr.message);
    const user = list.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);
    if (!user) throw new Error("Admin account not found.");

    const { data: role, error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (roleErr) throw new Error(roleErr.message);
    if (!role) throw new Error("This account does not have admin access.");

    return { ok: true };
  });

// FIX: field renamed from `newPassword` → `password` to match what the
// forgot-password page sends: resetPassword({ data: { email, password } })
const resetSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(72),
});

/**
 * Reset the admin password. Server validates the email is the admin account
 * with the admin role before updating via the service role client.
 *
 * NOTE: This is a TanStack server function — do NOT call the Supabase Edge
 * Function for password reset.
 */
export const resetAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((input) => resetSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.email.trim().toLowerCase() !== ADMIN_EMAIL) {
      throw new Error("This email is not authorised for admin access.");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers();
    if (listErr) throw new Error(listErr.message);
    const user = list.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);
    if (!user) throw new Error("Admin account not found.");

    const { data: role, error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (roleErr) throw new Error(roleErr.message);
    if (!role) throw new Error("This account does not have admin access.");

    const { error: updErr } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password: data.password,
    });
    if (updErr) throw new Error(updErr.message);

    return { ok: true };
  });
