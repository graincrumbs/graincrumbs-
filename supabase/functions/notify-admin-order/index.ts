import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import webpush from "npm:web-push@3.6.7";
import { createClient } from "npm:@supabase/supabase-js@2";

webpush.setVapidDetails(
  "mailto:orders@graincrumbs.in",
  Deno.env.get("VAPID_PUBLIC_KEY")!,
  Deno.env.get("VAPID_PRIVATE_KEY")!
);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" } });
  }
  const { orderNumber, productType } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  const { data: subs } = await supabase.from("push_subscriptions").select("*");

  const payload = JSON.stringify({
    title: "New order received 🎉",
    body: `${orderNumber} — ${productType}`,
    url: "/admin",
  });

  await Promise.all((subs ?? []).map((s) =>
    webpush.sendNotification(
      { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
      payload
    ).catch(async (err) => {
      if (err.statusCode === 410) await supabase.from("push_subscriptions").delete().eq("id", s.id); // expired
    })
  ));

  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
});