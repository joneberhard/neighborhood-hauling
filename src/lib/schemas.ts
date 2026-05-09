import type { Service } from "../data/services";

const SITE = "https://neighborhoodhaulingut.com";
const BUSINESS_ID = `${SITE}/#business`;
const WEBSITE_ID = `${SITE}/#website`;

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": BUSINESS_ID,
  name: "Neighborhood Hauling and Junk Removal",
  alternateName: "Neighborhood Hauling",
  description:
    "Locally owned junk removal and hauling along the Wasatch Front. Same-day pickups, upfront pricing, eco-friendly disposal.",
  url: SITE,
  telephone: "+1-801-516-4149",
  email: "team@neighborhoodhaulingut.com",
  priceRange: "$$",
  image: `${SITE}/favicon.svg`,
  logo: `${SITE}/favicon.svg`,
  paymentAccepted: ["Cash", "Credit Card", "Venmo", "Zelle"],
  currenciesAccepted: "USD",
  knowsAbout: [
    "Junk removal",
    "Hauling",
    "Garage cleanouts",
    "Construction debris removal",
    "Furniture and appliance removal",
    "Yard waste removal",
    "Estate cleanouts",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "2081 W 13180 S",
    addressLocality: "Riverton",
    addressRegion: "UT",
    postalCode: "84065",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.5066,
    longitude: -111.9905,
  },
  areaServed: [
    { "@type": "City", name: "Bluffdale" },
    { "@type": "City", name: "Riverton" },
    { "@type": "City", name: "Herriman" },
    { "@type": "City", name: "South Jordan" },
    { "@type": "City", name: "West Jordan" },
    { "@type": "City", name: "Sandy" },
    { "@type": "City", name: "Draper" },
    { "@type": "City", name: "Lehi" },
    { "@type": "City", name: "Saratoga Springs" },
    { "@type": "City", name: "American Fork" },
    { "@type": "City", name: "Salt Lake City" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "17:00",
    },
  ],
  founder: { "@type": "Person", name: "Mou" },
  // Authoritative profiles for this business — feeds Google's entity graph for
  // local SEO, and pairs the GBP rating signals with the site domain.
  sameAs: [
    "https://maps.app.goo.gl/oN3CrLU3eVEZMi6V9", // Google Business Profile
    "http://neighborhoodbarbersutah.com",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE,
  name: "Neighborhood Hauling and Junk Removal",
  publisher: { "@id": BUSINESS_ID },
  inLanguage: "en-US",
};

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : SITE + it.url,
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/services/${service.slug}/#service`,
    name: service.title,
    description: service.short,
    serviceType: service.title,
    category: "Junk Removal",
    url: `${SITE}/services/${service.slug}/`,
    provider: { "@id": BUSINESS_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Salt Lake County, UT" },
      { "@type": "AdministrativeArea", name: "Utah County, UT" },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: service.pricingNote,
      },
      availability: "https://schema.org/InStock",
    },
  };
}

export function servicesItemListSchema(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Neighborhood Hauling Services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/services/${s.slug}/`,
      name: s.title,
    })),
  };
}

export interface FAQItem {
  q: string;
  a: string;
}

export function faqPageSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
}

export interface ReviewItem {
  author: string;
  rating: number; // 1-5
  date: string; // ISO yyyy-mm-dd
  text: string;
}

/**
 * AggregateRating + Review schema for a page that displays real reviews.
 *
 * IMPORTANT (per local-seo-playbook):
 * - Only emit when reviews are real and visible on the page.
 * - aggregateRating numbers must match the GBP listing or visible-on-page count.
 * - Don't fabricate. Google penalizes review-schema fraud aggressively.
 *
 * CRITICAL — itemReviewed must NOT be the LocalBusiness/MovingCompany.
 * Per Google's 2019 policy update, self-serving Review/AggregateRating
 * attached to LocalBusiness or its subtypes is rejected for Review-snippet
 * rich results — GSC flags it as "Invalid object type for field <parent_node>"
 * and excludes the page from review rich results. The fix: attach reviews to
 * a specific Service (or Product) that the reviews are genuinely about.
 *
 * Caller must pass `itemReviewed` — typically a `{ "@id": serviceSchemaId }`
 * reference to one of the per-service Service schemas, OR a fully-formed
 * Service node. We don't default it to the business — fail closed instead.
 *
 * Returns null when no real reviews are passed in — caller should not emit
 * any review schema until real data exists. The visual placeholder section
 * can render with `reviews=[]` and skip schema entirely.
 */
export function reviewsSchema(
  reviews: ReviewItem[],
  aggregate: { ratingValue: number; reviewCount: number } | null,
  itemReviewed: object,
) {
  if (!reviews.length && !aggregate) return null;
  if (!itemReviewed) return null;

  const blocks: object[] = [];

  if (aggregate) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      itemReviewed,
      ratingValue: aggregate.ratingValue.toFixed(1),
      reviewCount: aggregate.reviewCount,
      bestRating: 5,
      worstRating: 1,
    });
  }

  reviews.forEach((r) => {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed,
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.text,
    });
  });

  return blocks;
}
