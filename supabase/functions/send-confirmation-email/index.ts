import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM_EMAIL = "Grain Crumbs by Ankita <orders@graincrumbs.in>";

interface EmailPayload {
  to: string;
  name: string;
  orderNumber: string;
  productType: string;
  dateRequired: string | null;
  delivery: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const payload: EmailPayload = await req.json();
    const { to, name, orderNumber, productType, dateRequired, delivery } = payload;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Enquiry Received — Grain Crumbs</title>
</head>
<body style="margin:0;padding:0;background:#faf6f0;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:24px;overflow:hidden;border:1px solid #e8ddd0;">
          <!-- Header -->
          <tr>
            <td style="background:#2c1810;padding:36px 40px;text-align:center;">
              <p style="margin:0;font-family:Georgia,serif;font-size:26px;color:#e8c97d;letter-spacing:2px;">GRAIN CRUMBS</p>
              <p style="margin:4px 0 0;font-size:12px;color:#c4a870;letter-spacing:3px;text-transform:uppercase;">by Ankita</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:28px;color:#2c1810;">Enquiry Received! 🎉</h1>
              <p style="margin:0 0 24px;color:#6b5c4e;font-size:15px;">Hi ${name}, thank you for reaching out to Grain Crumbs.</p>
              
              <div style="background:#faf6f0;border-radius:16px;padding:24px;margin-bottom:24px;border:1px solid #e8ddd0;">
                <p style="margin:0 0 16px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#9b8b7d;">Your Enquiry Details</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #e8ddd0;">
                      <span style="font-size:12px;color:#9b8b7d;text-transform:uppercase;letter-spacing:1px;">Order Reference</span><br/>
                      <strong style="font-size:18px;color:#2c1810;font-family:Georgia,serif;">${orderNumber}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #e8ddd0;">
                      <span style="font-size:12px;color:#9b8b7d;text-transform:uppercase;letter-spacing:1px;">Product</span><br/>
                      <span style="font-size:15px;color:#2c1810;">${productType}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;border-bottom:1px solid #e8ddd0;">
                      <span style="font-size:12px;color:#9b8b7d;text-transform:uppercase;letter-spacing:1px;">Fulfilment</span><br/>
                      <span style="font-size:15px;color:#2c1810;">${delivery}</span>
                    </td>
                  </tr>
                  ${dateRequired ? `
                  <tr>
                    <td style="padding:8px 0;">
                      <span style="font-size:12px;color:#9b8b7d;text-transform:uppercase;letter-spacing:1px;">Date Required</span><br/>
                      <span style="font-size:15px;color:#2c1810;">${dateRequired}</span>
                    </td>
                  </tr>` : ""}
                </table>
              </div>

              <p style="color:#6b5c4e;font-size:15px;line-height:1.7;margin:0 0 16px;">
                We've received your enquiry and will get back to you shortly with availability, pricing and next steps.
              </p>
              <p style="color:#6b5c4e;font-size:15px;line-height:1.7;margin:0 0 24px;">
                For the fastest response, feel free to send us a message on WhatsApp!
              </p>

              <a href="https://wa.me/918208257574" style="display:inline-block;background:#e8c97d;color:#2c1810;padding:14px 28px;border-radius:99px;text-decoration:none;font-size:14px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">
                WhatsApp Us
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#faf6f0;border-top:1px solid #e8ddd0;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9b8b7d;">Grain Crumbs by Ankita · Pune, Maharashtra</p>
              <p style="margin:6px 0 0;font-size:11px;color:#b5a89a;">Please do not reply to this email. Contact us on WhatsApp for all enquiries.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject: `${orderNumber} — Enquiry Received · Grain Crumbs by Ankita`,
        html,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Resend error:", errBody);
      return new Response(JSON.stringify({ error: errBody }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify({ ok: true, id: data.id }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});
