export interface FAQ {
  q: string;
  a: string;
}

// Placeholder starter answers based on what we know about the business.
// Mou: edit these to your voice, add more questions, mark TBD ones.
// Schema below pulls directly from this data — keep answers truthful so the
// FAQPage rich-result eligibility doesn't get flagged.
export const faqs: FAQ[] = [
  {
    q: "How does your pricing work?",
    a: "Send a photo of what needs to go and we'll send back a flat quote. Bigger jobs price by trailer fill (1/4 trailer $130, half to three-quarter $230-$330, full $430). Smaller jobs have per-item minimums starting at $55.",
  },
  {
    q: "How big is your trailer?",
    a: "14 cubic yards. That's roughly the equivalent of a full pickup truck bed, three times over. Most multi-room cleanouts fit in a half to three-quarter fill.",
  },
  {
    q: "What areas do you serve?",
    a: "Based out of Riverton, Utah. We cover Salt Lake County, Utah County, and the Wasatch Front — Bluffdale, Riverton, Herriman, South Jordan, West Jordan, Sandy, Draper, Lehi, Saratoga Springs, American Fork, Salt Lake City, and most points in between.",
  },
  {
    q: "Do you offer same-day service?",
    a: "Same-day pickups when our schedule allows. We send quotes back within minutes during business hours, and you'll get a pickup time with the quote.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes — fully licensed and insured. We treat your property with the same care we'd want on our own.",
  },
  {
    q: "What can you haul?",
    a: "General household trash, furniture, appliances, mattresses, yard waste, construction debris, garage and storage cleanouts, and full estate or property clears. If you're not sure, send a photo and we'll tell you.",
  },
  {
    q: "What can't you take?",
    a: "Hazardous chemicals, asbestos, biohazards, lead paint debris, live ammunition or fuel, and wet concrete. If your job involves any of those, we'll point you to the right specialist.",
  },
  {
    q: "Do I need to be home for the pickup?",
    a: "Not always — if items are accessible from the curb, driveway, or yard, we can pick up without you there. Just let us know in your quote message.",
  },
  {
    q: "How do I pay?",
    a: "Cash, credit card, Venmo, or Zelle — your choice. Payment is due when the job's done.",
  },
];
