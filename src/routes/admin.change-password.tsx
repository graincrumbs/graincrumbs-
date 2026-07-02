import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/change-password")({
  head: () => ({
    meta: [
      { title: "Change Password — Grain Crumbs Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ChangePasswordPage,
});

// ── EmailJS config ────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_o3pbjwb";
const EMAILJS_TEMPLATE_ID = "template_144sxrs";       // combined alert + OTP template
const EMAILJS_PUBLIC_KEY  = "P8p-EPatFJBMOHmsz";
const PERSONAL_EMAIL      = "ankita.junankar@gmail.com"; // only this gets the email

// OTP expires after 10 minutes
const OTP_TTL_MS = 10 * 60 * 1000;

type Step = "form" | "otp" | "done";

const inputCls =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/30";

function ChangePasswordPage() {
  const navigate = useNavigate();

  // ── Auth guard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate({ to: "/admin/login" });
    });
  }, [navigate]);

  // ── State ──────────────────────────────────────────────────────────────────
  const [step, setStep]               = useState<Step>("form");
  const [currentPw, setCurrentPw]     = useState("");
  const [newPw, setNewPw]             = useState("");
  const [confirmPw, setConfirmPw]     = useState("");
  const [otpInput, setOtpInput]       = useState("");
  const [busy, setBusy]               = useState(false);
  const [err, setErr]                 = useState<string | null>(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // OTP kept only in memory — never persisted
  const [otpCode, setOtpCode]               = useState<string>("");
  const [otpExpiry, setOtpExpiry]           = useState<number>(0);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const generateOtp = () =>
    String(Math.floor(100000 + Math.random() * 900000));

  const sendEmail = async (otp: string, adminEmail: string) => {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id:  EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id:     EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email:    PERSONAL_EMAIL,
          admin_email: adminEmail,
          otp:         otp,
          time:        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        },
      }),
    });
    if (!res.ok) throw new Error("Failed to send verification email. Please try again.");
  };

  // ── Step 1: Validate → verify current pw → send email ─────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (newPw.length < 8) {
      setErr("New password must be at least 8 characters.");
      return;
    }
    if (newPw !== confirmPw) {
      setErr("New passwords do not match.");
      return;
    }
    if (currentPw === newPw) {
      setErr("New password must be different from the current password.");
      return;
    }

    setBusy(true);
    try {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) throw new Error("Session expired. Please sign in again.");

      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email:    sess.session.user.email!,
        password: currentPw,
      });
      if (signInErr) throw new Error("Current password is incorrect.");

      const otp = generateOtp();
      await sendEmail(otp, sess.session.user.email!);

      setOtpCode(otp);
      setOtpExpiry(Date.now() + OTP_TTL_MS);
      setResendCooldown(60);
      setStep("otp");
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  // ── Resend OTP ─────────────────────────────────────────────────────────────
  const handleResend = async () => {
    setErr(null);
    setBusy(true);
    try {
      const { data: sess } = await supabase.auth.getSession();
      const otp = generateOtp();
      await sendEmail(otp, sess.session?.user.email ?? "");
      setOtpCode(otp);
      setOtpExpiry(Date.now() + OTP_TTL_MS);
      setResendCooldown(60);
      setOtpInput("");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to resend OTP.");
    } finally {
      setBusy(false);
    }
  };

  // ── Step 2: Verify OTP → update password ──────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!/^\d{6}$/.test(otpInput.trim())) {
      setErr("Please enter the 6-digit OTP.");
      return;
    }
    if (Date.now() > otpExpiry) {
      setErr("OTP has expired. Please request a new one.");
      setOtpCode("");
      return;
    }
    if (otpInput.trim() !== otpCode) {
      setErr("Incorrect OTP. Please check and try again.");
      return;
    }

    setBusy(true);
    try {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session?.user.email) throw new Error("Session expired. Please sign in again.");

      const { error } = await supabase.auth.updateUser({ password: newPw });
      if (error) throw error;

      await supabase.auth.signOut();
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: sess.session.user.email,
        password: newPw,
      });
      if (signInErr) throw signInErr;

      setOtpCode(""); // invalidate immediately after use
      setStep("done");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to update password. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section className="section">
      <div className="container-prose max-w-lg">

        {/* Step indicator */}
        <div className="mb-8 flex items-center gap-3">
          {(["form", "otp", "done"] as Step[]).map((s, i) => {
            const past =
              (s === "form" && (step === "otp" || step === "done")) ||
              (s === "otp" && step === "done");
            const active = step === s;
            return (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold transition-colors ${
                    past
                      ? "bg-green-100 text-green-700"
                      : active
                      ? "bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {past ? "✓" : i + 1}
                </div>
                <span className={`text-xs uppercase tracking-[0.18em] ${active ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                  {s === "form" && "Passwords"}
                  {s === "otp"  && "Verify OTP"}
                  {s === "done" && "Done"}
                </span>
                {i < 2 && <div className="h-px w-8 bg-border" />}
              </div>
            );
          })}
        </div>

        <div className="rounded-[2rem] border border-border bg-card p-6 md:p-10">

          {/* ── Step 1: Password form ── */}
          {step === "form" && (
            <>
              <div className="flex items-center gap-3 mb-7">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="font-display text-2xl">Change Password</h1>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    An OTP will be sent to your personal email
                  </p>
                </div>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-5">
                {/* Current password */}
                <label className="block">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Current Password
                  </span>
                  <div className="relative">
                    <input
                      required
                      type={showCurrent ? "text" : "password"}
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                      className={inputCls + " pr-10"}
                      placeholder="Your current password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                {/* New password */}
                <label className="block">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    New Password
                  </span>
                  <div className="relative">
                    <input
                      required
                      type={showNew ? "text" : "password"}
                      minLength={8}
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      className={inputCls + " pr-10"}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                {/* Confirm password */}
                <label className="block">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Confirm New Password
                  </span>
                  <div className="relative">
                    <input
                      required
                      type={showConfirm ? "text" : "password"}
                      minLength={8}
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      className={inputCls + " pr-10"}
                      placeholder="Repeat new password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                {err && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {err}
                  </p>
                )}

                <div className="flex gap-3 pt-1">
                  <Link to="/admin" className="btn-outline flex-1 justify-center">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={busy}
                    className="btn-primary flex-1 justify-center disabled:opacity-60"
                  >
                    {busy
                      ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending OTP…</>
                      : "Send OTP"}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ── Step 2: OTP entry ── */}
          {step === "otp" && (
            <>
              <div className="flex items-center gap-3 mb-7">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--chocolate-dark)] text-[color:var(--cream)]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="font-display text-2xl">Enter OTP</h1>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Sent to your personal email
                  </p>
                </div>
              </div>

              <div className="mb-5 rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--cream-dark)]/40 px-5 py-4 text-sm text-muted-foreground">
                Check your personal email for a <strong>6-digit OTP</strong>.
                It expires in <strong>10 minutes</strong>.
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    6-Digit OTP
                  </span>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className={inputCls + " text-center font-mono text-3xl tracking-[0.6em]"}
                    placeholder="——————"
                    autoFocus
                  />
                </label>

                {err && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {err}
                  </p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => { setStep("form"); setOtpInput(""); setErr(null); }}
                    className="btn-outline flex-1 justify-center"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={busy || otpInput.length !== 6}
                    className="btn-primary flex-1 justify-center disabled:opacity-60"
                  >
                    {busy
                      ? <><Loader2 className="h-4 w-4 animate-spin" /> Verifying…</>
                      : "Verify & Update"}
                  </button>
                </div>

                {/* Resend */}
                <p className="text-center text-xs text-muted-foreground">
                  Didn't receive it?{" "}
                  {resendCooldown > 0 ? (
                    <span className="text-[color:var(--gold)]">
                      Resend in {resendCooldown}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={handleResend}
                      className="underline underline-offset-2 hover:text-foreground disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </form>
            </>
          )}

          {/* ── Step 3: Done ── */}
          {step === "done" && (
            <div className="py-6 text-center space-y-6">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                <h1 className="font-display text-3xl text-[color:var(--chocolate-dark)]">
                  Password Updated!
                </h1>
                <p className="mt-3 text-sm text-muted-foreground">
                  Your admin password has been changed successfully.
                  You'll remain signed in on this device.
                </p>
              </div>
              <Link to="/admin" className="btn-primary inline-flex justify-center">
                Back to Dashboard
              </Link>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
