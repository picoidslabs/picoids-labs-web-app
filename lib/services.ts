import type { PackagePriceKey } from "./currency";

export type ServiceGlyphId = "web" | "webapp" | "mobile" | "seo" | "marketing";

export type LabService = {
  id: ServiceGlyphId;
  name: string;
  tagline: string;
  description: string;
  fromPriceKey: PackagePriceKey;
  fromPriceMonthly?: boolean;
  secondaryFromPriceKey?: PackagePriceKey;
  highlights: string[];
};

export const labServices: LabService[] = [
  {
    id: "web",
    name: "Website development",
    tagline: "Your shop window on the internet",
    description:
      "Professional business websites—responsive, fast, and easy for your team to maintain.",
    fromPriceKey: "web",
    highlights: [
      "Up to 5 pages",
      "Mobile-friendly design",
      "Contact form & basic SEO",
    ],
  },
  {
    id: "webapp",
    name: "Web application development",
    tagline: "Stores, dashboards, and custom flows",
    description:
      "Enquiry portals, booking tools, and admin dashboards with login, database, and bug fixes always included. Full e-commerce (cart, checkout, catalogue) available as a separate tier.",
    fromPriceKey: "webapp_starter",
    secondaryFromPriceKey: "webapp_ecommerce",
    highlights: [
      "Starter app tier",
      "Bug fixes always available",
      "E-commerce tier available",
    ],
  },
  {
    id: "mobile",
    name: "Mobile apps",
    tagline: "In every customer's pocket",
    description:
      "Android and iOS apps for customer-facing products or internal business tools.",
    fromPriceKey: "mobile",
    highlights: [
      "Cross-platform options",
      "App store guidance",
      "Maintenance plans available",
    ],
  },
  {
    id: "seo",
    name: "SEO & local search",
    tagline: "Found when it matters",
    description:
      "Help customers find your business on Google—local listings and on-page optimization.",
    fromPriceKey: "seo_monthly",
    fromPriceMonthly: true,
    highlights: [
      "On-page optimization",
      "Google Business Profile",
      "Monthly performance report",
    ],
  },
  {
    id: "marketing",
    name: "Digital marketing",
    tagline: "Reach without the agency bill",
    description:
      "Social media, paid ads, and content that fits SME budgets—not enterprise retainers.",
    fromPriceKey: "marketing_monthly",
    fromPriceMonthly: true,
    highlights: [
      "Campaign setup",
      "Creative & copy support",
      "Clear monthly deliverables",
    ],
  },
];

export const SERVICE_PACKAGE_KEYS: Record<ServiceGlyphId, PackagePriceKey> = {
  web: "web",
  webapp: "webapp_ecommerce",
  mobile: "mobile",
  seo: "seo_monthly",
  marketing: "marketing_monthly",
};

export const contactServiceOptions = [
  ...labServices.map((s) => s.name),
  "Multiple services",
  "Not sure yet",
];
