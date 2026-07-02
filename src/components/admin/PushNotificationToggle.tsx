import { useEffect, useState } from "react";
import { BellRing, Loader2 } from "lucide-react";
import { enableAdminPushNotifications } from "@/lib/push/subscribe";

const STORAGE_KEY = "graincrumbs-admin-push-enabled";

type ToggleState = "idle" | "enabled" | "loading" | "unsupported";

export function PushNotificationToggle() {
  const [state, setState] = useState<ToggleState>("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (storedValue === "true") {
      setState("enabled");
      return;
    }

    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      setState("unsupported");
      return;
    }

    setState("idle");
  }, []);

  const handleEnable = async () => {
    if (typeof window === "undefined") return;

    if (state === "enabled" || state === "loading") return;
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      setState("unsupported");
      return;
    }

    setState("loading");
    try {
      await enableAdminPushNotifications();
      window.localStorage.setItem(STORAGE_KEY, "true");
      setState("enabled");
    } catch (error) {
      console.warn("Enable order alerts failed:", error);
      setState("idle");
      window.alert("Could not enable order alerts on this device. Please allow notifications and try again.");
    }
  };

  if (state === "unsupported") return null;

  const isEnabled = state === "enabled";

  return (
    <button
      type="button"
      onClick={handleEnable}
      disabled={state === "loading" || isEnabled}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
        isEnabled
          ? "border-green-600/40 bg-green-50 text-green-700"
          : "border-[color:var(--gold)]/40 bg-[color:var(--cream-dark)]/70 text-[color:var(--chocolate-dark)] hover:bg-[color:var(--gold)]/20"
      } ${state === "loading" ? "cursor-wait opacity-70" : ""}`}
    >
      {state === "loading" ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <BellRing className="h-4 w-4" />
      )}
      {isEnabled ? "Alerts enabled" : "Enable order alerts"}
    </button>
  );
}
