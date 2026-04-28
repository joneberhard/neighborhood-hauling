export type ServiceIcon =
  | "trash"
  | "box"
  | "hammer"
  | "couch"
  | "leaf"
  | "home";

export interface Service {
  slug: string;
  title: string;
  short: string;
  long: string;
  icon: ServiceIcon;
  weTake: string[];
  weDont: string[];
  pricingNote: string;
}

export const services: Service[] = [
  {
    slug: "junk-removal",
    title: "Junk Removal",
    short:
      "General household clutter, yard waste, old electronics, and everyday rubbish cleared out fast and responsibly.",
    long:
      "From a single load to a packed-out home, we handle the lifting, the loading, and the cleanup. We give you a flat, upfront quote before we start and we sweep up after. Most jobs are same-day or next-day along the Wasatch Front.",
    icon: "trash",
    weTake: [
      "Household trash and clutter",
      "Old electronics and TVs",
      "Toys, clothes, and small household items",
      "Boxes, bags, and packing material",
      "Garage overflow and shed contents",
    ],
    weDont: [
      "Hazardous chemicals or paint",
      "Asbestos or biohazards",
      "Live ammunition or fuel",
    ],
    pricingNote:
      "Priced by truck volume. Send a photo for a same-day flat quote.",
  },
  {
    slug: "garage-storage",
    title: "Garage & Storage Cleanouts",
    short:
      "Complete cleanouts for garages, attics, basements, and storage units. Get your valuable square footage back.",
    long:
      "Decades of stuff doesn't move itself. We clear out garages, attics, basements, and rented storage units in a single visit. We sort what we can donate or recycle, and you get the space back the same day.",
    icon: "box",
    weTake: [
      "Garage and shed contents",
      "Attic and crawlspace junk",
      "Storage unit overflow",
      "Basement clutter and old furniture",
      "Boxes of unsorted items",
    ],
    weDont: [
      "Live mold (we'll refer a remediation pro)",
      "Hazardous chemicals",
    ],
    pricingNote:
      "Most garages clear in a half day. Flat quote based on volume, not hours.",
  },
  {
    slug: "construction-debris",
    title: "Construction Debris Removal",
    short:
      "Remodeling aftermath? We haul drywall, wood, tile, fencing, and other post-construction materials.",
    long:
      "Renovation done? Tear-out finished? We haul out the mess so you don't burn a Saturday at the dump. Drywall, wood, flooring, fencing, fixtures &mdash; all loaded and disposed of properly.",
    icon: "hammer",
    weTake: [
      "Drywall, wood, and trim",
      "Tile, flooring, and underlayment",
      "Old fencing and decking",
      "Plumbing fixtures and cabinets",
      "Bagged construction trash",
    ],
    weDont: [
      "Asbestos-containing materials",
      "Lead paint debris",
      "Wet concrete or stucco mud",
    ],
    pricingNote:
      "Priced by load. We coordinate with contractors and homeowners.",
  },
  {
    slug: "furniture-appliances",
    title: "Furniture & Appliance Removal",
    short:
      "Heavy couches, mattresses, refrigerators, and washers removed safely without damaging your property.",
    long:
      "Sectional couches, king mattresses, fridges that don't fit through the door &mdash; we know the moves. We pad doorways, work the angles, and get heavy items out without scraping your walls or your floors.",
    icon: "couch",
    weTake: [
      "Couches and sectionals",
      "Mattresses and box springs",
      "Refrigerators and freezers",
      "Washers, dryers, and dishwashers",
      "Desks, dressers, and bed frames",
    ],
    weDont: [
      "Live appliances with refrigerant leaks",
    ],
    pricingNote:
      "Priced per item or per truck load. Stairs and tight access included.",
  },
  {
    slug: "yard-waste",
    title: "Yard Waste Removal",
    short:
      "Branches, leaves, sod, and landscaping debris loaded up and hauled out so your yard stays sharp.",
    long:
      "After a big trim, a sod tear-out, or a storm, the pile in the side yard adds up fast. We load it, haul it, and dispose of it at the green-waste facility &mdash; no green-can wait, no trips back and forth.",
    icon: "leaf",
    weTake: [
      "Tree branches and trimmings",
      "Bagged leaves and grass",
      "Sod and dirt piles",
      "Old landscaping rock and edging",
      "Fence boards and lattice",
    ],
    weDont: [
      "Live trees we have to fell (call an arborist first)",
    ],
    pricingNote: "Priced by load. Same-day pickups when our schedule allows.",
  },
  {
    slug: "estate-cleanouts",
    title: "Estate Cleanouts",
    short:
      "Full property cleanouts handled with care and discretion during difficult transitions.",
    long:
      "Estate work asks for patience. We move at your pace, set aside what the family wants to keep, donate what's still useful, and clear the rest. Realtors, attorneys, and family members all welcome on site.",
    icon: "home",
    weTake: [
      "Full home contents",
      "Decades of garage and basement storage",
      "Furniture, clothing, and household goods",
      "Old electronics and appliances",
      "Yard and outbuilding contents",
    ],
    weDont: [
      "Items being inventoried for legal or insurance purposes (until released)",
    ],
    pricingNote:
      "Custom quote per property. Flat rate, no hourly surprises.",
  },
];
