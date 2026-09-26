import { useEffect, useState } from "react";
import { getGoogleReviews, type GoogleReviewsResult } from "@/lib/google-reviews.functions";

const empty: GoogleReviewsResult = { configured: false, reviews: [] };

/** Loads live 5-star Google reviews. `configured` is false until the site
 * owner adds GOOGLE_PLACES_API_KEY — until then callers should show their
 * existing static testimonials instead. */
export function useGoogleReviews() {
  const [data, setData] = useState<GoogleReviewsResult>(empty);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await getGoogleReviews();
        if (!cancelled) setData(result);
      } catch {
        if (!cancelled) setData(empty);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { ...data, loading };
}
