import type { ReviewItem } from "../lib/schemas";

/**
 * Real customer reviews shown on the site.
 *
 * IMPORTANT: only add reviews that are real and verifiable (e.g. copied from
 * the Google Business Profile). The Review/AggregateRating schema in
 * `src/lib/schemas.ts` only emits when this array has entries OR when an
 * aggregate is passed. Google penalizes fabricated review schema aggressively.
 *
 * Until real reviews exist, leave this empty. The Reviews component will
 * render a "coming soon" placeholder with no Review schema attached.
 */
export const reviews: ReviewItem[] = [
  // {
  //   author: "Jane D.",
  //   rating: 5,
  //   date: "2026-04-01",
  //   text: "Mou and crew showed up on time, sent me a flat quote in 10 minutes...",
  // },
];

/**
 * Aggregate rating across all reviews (e.g. matches the Google Business
 * Profile star rating). Only emit when this matches a real, verifiable
 * source — match the GBP exactly. Set to `null` until set up.
 */
export const aggregate: { ratingValue: number; reviewCount: number } | null = null;
