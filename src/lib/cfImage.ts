// Cloudflare Images URL helpers for Neighborhood Hauling.
//
// Images live on the Ghost Zero Cloudflare Images account. The intended
// delivery domain is images.neighborhoodhaulingut.com (proxied to
// imagedelivery.net), but that hostname currently returns CF error 1014.
// Using the raw imagedelivery.net base until CF support resolves —
// one-line flip on CF_IMAGES_BASE when it does.
//
// File names from src/assets/ are converted to deterministic Cloudflare
// Image IDs by slugging:
//   "jobs/job1-before.jpg" -> "nbh_jobs_job1_before_jpg"
//   "mou.jpg"              -> "nbh_mou_jpg"
//
// Variants are defined account-level in the Cloudflare dashboard:
//   - thumbnail (400w, fit=scale-down)
//   - card      (800w, fit=scale-down)
//   - hero      (1600w, fit=scale-down)
//   - headshot  (400x400, fit=cover)
//   - public    (original, built-in)

const ACCOUNT_HASH = 'qPxaZUKncGiksK_4N8a1yg';
export const CF_IMAGES_BASE = `https://imagedelivery.net/${ACCOUNT_HASH}`;
export const CF_IMAGES_PREFIX = 'nbh_';

export type CFVariant = 'thumbnail' | 'card' | 'hero' | 'headshot' | 'public';

/** Convert a repo-relative path under src/assets/ to its Cloudflare Image ID. */
export function cfImageId(file: string): string {
  const slug = file
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return CF_IMAGES_PREFIX + slug;
}

/** Build a delivery URL for a given filename + variant. */
export function cfImageUrl(file: string, variant: CFVariant = 'card'): string {
  return `${CF_IMAGES_BASE}/${cfImageId(file)}/${variant}`;
}

/** Build a responsive `srcset` covering the thumbnail / card / hero variants. */
export function cfImageSrcset(file: string): string {
  const id = cfImageId(file);
  return [
    `${CF_IMAGES_BASE}/${id}/thumbnail 400w`,
    `${CF_IMAGES_BASE}/${id}/card 800w`,
    `${CF_IMAGES_BASE}/${id}/hero 1600w`,
  ].join(', ');
}
