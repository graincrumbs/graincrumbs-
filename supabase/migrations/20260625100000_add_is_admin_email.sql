-- Allows the forgot-password flow to verify admin emails from the browser (anon key),
-- avoiding server-side Supabase admin calls that fail on some local SSL setups.
CREATE OR REPLACE FUNCTION public.is_admin_email(check_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users u
    JOIN public.user_roles r ON r.user_id = u.id AND r.role = 'admin'
    WHERE lower(u.email) = lower(check_email)
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin_email(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin_email(text) TO anon, authenticated;
