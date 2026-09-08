/**
 * Canonical business constants.
 *
 * The phone number was written as a literal in roughly twenty places in this
 * repo, including the mobile CTA bar, so changing it meant finding all twenty.
 * This module is the one place it lives now. `schemas.ts` derives its
 * `telephone` from here too, so the number Google is told and the number the
 * bar dials cannot drift apart.
 *
 * The remaining presentational call sites (Header, Footer, SecondaryCTA,
 * FeatureHero, the service and legal pages) still carry literals and should be
 * migrated onto `site.phoneE164` / `site.phoneDisplay` as they are next
 * touched.
 */
export const site = {
  name: "Neighborhood Hauling and Junk Removal",
  shortName: "Neighborhood Hauling",

  /** tel: / sms: href form. Digits and a leading +, nothing else. */
  phoneE164: "+18015164149",
  /** How the number is written for a human to read. */
  phoneDisplay: "(801) 516-4149",
  /** schema.org prefers the dashed international form. */
  phoneSchema: "+1-801-516-4149",

  email: "team@neighborhoodhaulingut.com",
  url: "https://neighborhoodhaulingut.com",
} as const;
