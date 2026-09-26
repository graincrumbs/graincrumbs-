import { useEffect } from "react";

const ELFSIGHT_SCRIPT_SRC = "https://elfsightcdn.com/platform.js";
const ELFSIGHT_WIDGET_CLASS = "elfsight-app-b9144849-e0bc-4650-9ad8-82d32fde9f5c";

/** Loads the Elfsight Google Reviews widget (5-star Google reviews, kept live
 * and up to date from the Elfsight dashboard — no API key or account access
 * needed on our side). */
export function GoogleReviewsWidget() {
  useEffect(() => {
    if (document.querySelector(`script[src="${ELFSIGHT_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = ELFSIGHT_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div className={ELFSIGHT_WIDGET_CLASS} data-elfsight-app-lazy />;
}
