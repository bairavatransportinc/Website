// Central source of truth for company facts.
// Incorporation details verified from the Ontario Business Registry.

export const company = {
  name: "Bairava Transport Inc.",
  shortName: "Bairava Transport",
  tagline: "Freight that moves with the pack.",
  description:
    "A Brampton-based Ontario carrier delivering reliable, on-time freight across Canada and cross-border to the United States.",

  // Note: registry identifiers (Business Number, Registry ID) and the exact
  // incorporation date are intentionally NOT stored here — they were removed
  // from the public site to avoid misuse. Verify credentials privately via the
  // Ontario Business Registry if needed.

  contact: {
    email: "contactus@bairavatransportinc.ca",
    phone: "+1 (647) 871-9003",
    address: "Brampton, Ontario, Canada",
    hours: "24/7 Dispatch",
  },
} as const;

export const services = [
  {
    title: "Full Truckload (FTL)",
    description:
      "Dedicated capacity for your freight — one shipment, one truck, direct from pickup to delivery with no stops in between.",
    icon: "truck",
  },
  {
    title: "Cross-Border Freight",
    description:
      "Seamless Canada–US shipping with customs-ready documentation and drivers experienced on both sides of the border.",
    icon: "border",
  },
  {
    title: "Dry Van Shipping",
    description:
      "Secure, weather-protected transport for palletized and packaged goods across all major lanes.",
    icon: "box",
  },
  {
    title: "Dedicated Lanes",
    description:
      "Consistent, contracted routes with reserved capacity so your supply chain never misses a beat.",
    icon: "route",
  },
  {
    title: "Expedited Delivery",
    description:
      "Time-critical freight moved fast. When the deadline is tight, the pack runs harder.",
    icon: "bolt",
  },
  {
    title: "24/7 Dispatch",
    description:
      "Real people, around the clock. Track your load and reach a dispatcher whenever you need one.",
    icon: "clock",
  },
] as const;

export const stats = [
  { value: "2023", label: "Ontario Incorporated" },
  { value: "24/7", label: "Dispatch & Tracking" },
  { value: "CA ↔ US", label: "Cross-Border Freight" },
  { value: "FTL", label: "Full-Truckload Focus" },
] as const;

// Fleet / equipment. Edit these to match your actual equipment and specs.
export const fleet = [
  {
    name: "Dry Van",
    specs: "53' trailers",
    description:
      "Sealed, weather-protected trailers for palletized freight, packaged goods, and general commodities.",
    icon: "box",
  },
  {
    name: "Cross-Border Ready",
    specs: "PARS / PAPS",
    description:
      "Equipment and paperwork set up for Canada–US crossings, with drivers familiar with the main border points.",
    icon: "border",
  },
  {
    name: "Power-Only",
    specs: "Bring your trailer",
    description:
      "Just need a tractor to move your trailer? We can provide the power and the driver to keep it rolling.",
    icon: "truck",
  },
] as const;

// Coverage lanes — city names are language-neutral, so they live here (not in
// the translation dictionary) and render the same in EN and FR.
export const coverageLanes = [
  { from: "Toronto, ON", to: "Chicago, IL" },
  { from: "Brampton, ON", to: "Detroit, MI" },
  { from: "Montreal, QC", to: "New York, NY" },
  { from: "Ontario", to: "Texas" },
] as const;

export const whyChooseUs = [
  {
    title: "Licensed & Incorporated",
    description:
      "A registered Ontario Business Corporation in active standing — fully accountable and compliant.",
  },
  {
    title: "Cross-Border Ready",
    description:
      "Experienced with Canada–US freight, customs paperwork, and the lanes that keep goods moving.",
  },
  {
    title: "On-Time, Every Time",
    description:
      "We treat your deadline as our own. Reliability is the reason our clients stay.",
  },
  {
    title: "Modern Fleet Standards",
    description:
      "Well-maintained equipment and safety-first drivers protect your freight from dock to dock.",
  },
];
