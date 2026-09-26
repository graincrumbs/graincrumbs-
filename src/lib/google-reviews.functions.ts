import { createServerFn } from "@tanstack/react-start";
import { readServerEnv } from "@/integrations/supabase/env.server";

// If the client's Google Business Place ID is known, set GOOGLE_PLACE_ID in
// env to skip the text-search lookup below. Otherwise we resolve it once
// (per server boot) from the business name via the Places "Find Place" API.
const FALLBACK_SEARCH_TEXT = "Grain Crumbs Kharadi Pune Maharashtra";

export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhoto?: string;
};

export type GoogleReviewsResult = {
  configured: boolean;
  rating?: number;
  totalReviews?: number;
  reviews: GoogleReview[];
  mapsUrl?: string;
};

let cachedPlaceId: string | null | undefined; // undefined = not yet looked up

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  const explicit = readServerEnv("GOOGLE_PLACE_ID");
  if (explicit) return explicit;
  if (cachedPlaceId !== undefined) return cachedPlaceId;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      FALLBACK_SEARCH_TEXT,
    )}&inputtype=textquery&fields=place_id&key=${apiKey}`;
    const res = await fetch(url);
    const json = await res.json();
    cachedPlaceId = json?.candidates?.[0]?.place_id ?? null;
  } catch {
    cachedPlaceId = null;
  }
  return cachedPlaceId;
}

/** Public: fetch the business's live Google rating + 5-star reviews. Returns
 * configured:false (no error thrown) until GOOGLE_PLACES_API_KEY is set, so
 * the UI can quietly fall back to the static testimonials until then. */
export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsResult> => {
    const apiKey = readServerEnv("GOOGLE_PLACES_API_KEY");
    if (!apiKey) return { configured: false, reviews: [] };

    try {
      const placeId = await resolvePlaceId(apiKey);
      if (!placeId) return { configured: false, reviews: [] };

      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&key=${apiKey}`;
      const res = await fetch(url);
      const json = await res.json();
      const result = json?.result;
      if (!result) return { configured: true, reviews: [] };

      const reviews: GoogleReview[] = (result.reviews ?? [])
        .filter((r: { rating: number }) => r.rating === 5) // client asked: 5-star only
        .map((r: { author_name: string; rating: number; text: string; relative_time_description: string; profile_photo_url?: string }) => ({
          author: r.author_name,
          rating: r.rating,
          text: r.text,
          relativeTime: r.relative_time_description,
          profilePhoto: r.profile_photo_url,
        }));

      return {
        configured: true,
        rating: result.rating,
        totalReviews: result.user_ratings_total,
        reviews,
        mapsUrl: result.url,
      };
    } catch {
      return { configured: true, reviews: [] };
    }
  },
);
