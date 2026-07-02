# Email Confirmation Setup

## What was changed

1. **Email is now a mandatory field** on the order/enquiry form.
2. **Confirmation email** is sent to the customer automatically after form submission.
3. **Order numbers** starting at `#101` are now assigned to every enquiry.
4. **Admin dashboard** now shows the Order # column in the table and detail panel.

---

## To enable the confirmation email (one-time setup)

The confirmation email is sent via **Resend** (https://resend.com) using a Supabase Edge Function.

### Step 1 — Create a free Resend account
1. Go to https://resend.com and sign up (free tier: 3,000 emails/month)
2. Verify your sending domain (e.g. `graincrumbs.in`) — OR use Resend's shared domain for testing
3. Copy your **API Key** from the Resend dashboard

### Step 2 — Add the API key to Supabase
1. In your Supabase project → **Edge Functions → Secrets**
2. Add a secret named `RESEND_API_KEY` with your Resend API key value

### Step 3 — Deploy the Edge Function
Run from the project root:
```bash
npx supabase functions deploy send-confirmation-email
```

### Step 4 — Run the new DB migration
```bash
npx supabase db push
```
This adds the `order_number` column (auto-increments, starting at 101).

---

## From email address
The "From" address is set in `supabase/functions/send-confirmation-email/index.ts`:

```ts
const FROM_EMAIL = "Grain Crumbs by Ankita <orders@graincrumbs.in>";
```

Update this to match your verified Resend domain.

---

## If email fails
The order is **always saved** to the database even if the email fails. Email errors are logged to the Edge Function console but do not block the submission.
