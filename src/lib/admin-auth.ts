import { supabase } from "@/integrations/supabase/client";

/**
 * Verify the admin email.
 *
 * We skip the Supabase RPC (`is_admin_email`) entirely because it does not
 * exist in this project, which caused the "Invalid API key" error you saw.
 * Instead we always delegate to the TanStack server function fallback which
 * runs on the server with the service-role key.
 */
export async function verifyAdminEmailClient(
  email: string,
  fallback: () => Promise<unknown>,
): Promise<void> {
  await fallback();
}

/**
 * Reset the admin password.
 *
 * We skip the Supabase Edge Function (`reset-admin-password`) entirely because
 * it does not exist in this project.  Instead we always delegate to the
 * TanStack server function fallback which uses the service-role key.
 */
export async function resetAdminPasswordClient(
  email: string,
  password: string,
  fallback: () => Promise<unknown>,
): Promise<void> {
  await fallback();
}
