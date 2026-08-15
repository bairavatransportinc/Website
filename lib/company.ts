// Central source of truth for company facts.
// Incorporation details verified from the Ontario Business Registry.

export const company = {
  name: "Bairava Transport Inc.",
  shortName: "Bairava Transport",
  tagline: "Freight that moves with the pack.",
  description:
    "A Brampton-based Ontario carrier delivering reliable, on-time freight across Canada and cross-border to the United States.",

  // Verified incorporation details
  businessNumber: "731593943",
  registryId: "1000456273",
  registeredOffice: "Brampton, Ontario",
  status: "Active",
  statusNotes: "Incorporated",
  businessType: "Ontario Business Corp.",
  incorporatedDate: "2023-02-24",

  contact: {
    email: "contactus@bairavatransport.ca",
    phone: "+1 (647) 871-9003",
    address: "61 Circus Cres, Brampton, ON L7A 5E1, Canada",
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
  { value: "48", label: "US States & Provinces Served" },
  { value: "24/7", label: "Dispatch Availability" },
  { value: "100%", label: "On-Time Commitment" },
  { value: "2023", label: "Proudly Incorporated" },
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
