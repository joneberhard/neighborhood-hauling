# Notes — Open Decisions & Pending Assets

Living document. Update or delete as items resolve.

## Open design decisions (deferred from initial build)

These are gaps between hiredeclutter.com's homepage flow (the reference) and what's currently shipped. Not bugs, just choices Jonny + Mou should make together.

### 1. Testimonials / social proof section

**Status:** missing.

The reference site has a "What Our Clients Say" section between the secondary CTA and the footer. The current homepage substitutes the **Meet Mou** founder bio in roughly that slot — different intent (founder story, not customer reviews).

**Options when Mou has 3+ Google/Yelp reviews to use:**
- **A.** Add a Testimonials section between `SecondaryCTA` and `Footer` and keep `MeetMou` where it is. Recommended.
- **B.** Move `MeetMou` to `/about` only and put Testimonials in its homepage slot.

### 2. Military / first-responder discount badge

**Status:** missing.

The reference site has a small promo badge for this. Skipped because we don't know if Mou actually offers the discount.

**Action:** Ask Mou. If yes, add a slim badge section between the service grid and service area sections (matches the reference page order).

### 3. Mid-page large image break

**Status:** intentionally skipped.

The reference has a full-width photo as a visual breather. The current `FeatureHero` already serves that role. Reconsider only if the page feels visually flat once real photography is in.

## Pending assets to swap (placeholders are already wired in)

| Where | File / location | What |
|---|---|---|
| Hero image on homepage | `public/truck.jpg` | Real photo of Mou + truck. Referenced from `src/components/FeatureHero.astro`. |
| Mou portrait | `public/mou.jpg` | Real portrait. Referenced from `src/components/MeetMou.astro` and `src/pages/about.astro`. |
| Contact form backend | `src/pages/contact.astro` | Replace `YOUR_WEB3FORMS_ACCESS_KEY` with a real key from web3forms.com (free, ~1 min). Form fails silently until set. |
| Optional Google Maps embed | `src/pages/contact.astro` | Replace the placeholder square next to the service-area copy with an iframe embed if desired. |

## Future ideas (not committed)

- Connect the GitHub repo to the Cloudflare Pages project for auto-deploy on `git push` (Cloudflare dashboard → Pages → neighborhood-hauling → Settings → Builds & deployments → Connect to Git).
- Add a blog/news collection (`src/content/`) for SEO if Mou wants to publish.
- Schema.org `LocalBusiness` JSON-LD in the layout for richer Google results.
