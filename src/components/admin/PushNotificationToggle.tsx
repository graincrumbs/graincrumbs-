import { useEffect, useState } from "react";
import { BellRing, Loader2 } from "lucide-react";
import { enableAdminPushNotifications } from "@/lib/push/subscribe";

const STORAGE_KEY = "graincrumbs-admin-push-enabled";

type ToggleState = "idle" | "enabled" | "loading" | "unsupported";

export function PushNotificationToggle() {
  const [state, setState] = useState<ToggleState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);

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

    if (Notification.permission === "denied") {
      setErrorMessage("Browser notifications are blocked. Please enable them in browser settings.");
      setIsBlocked(true);
    }

    setState("idle");
  }, []);

  const handleEnable = async () => {
    if (typeof window === "undefined") return;

    if (state === "enabled" || state === "loading" || isBlocked) return;
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      setState("unsupported");
      return;
    }

    setState("loading");
    setErrorMessage(null);
    try {
      await enableAdminPushNotifications();
      window.localStorage.setItem(STORAGE_KEY, "true");
      setState("enabled");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn("Enable order alerts failed:", error);
      setErrorMessage(message);
      if (message.includes("denied")) {
        setIsBlocked(true);
      }
      setState("idle");
    }
  };

  if (state === "unsupported") return null;

  const isEnabled = state === "enabled";

  return (
    <div className="flex flex-col gap-2">
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
      {errorMessage ? (
        <p className="text-xs text-red-600">{errorMessage}</p>
      ) : null}
    </div>
  );
}
