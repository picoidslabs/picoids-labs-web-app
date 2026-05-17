import {
  formatMoney,
  formatScaledInr,
  formatPackagePrice,
  scaleInrAmount,
  type PriceRegion,
} from "./currency";
import { shopifyVsCustom } from "./pricing";

export function getShopifyComparisonRows(region: PriceRegion) {
  const ecom = formatPackagePrice("webapp_ecommerce", region);
  const isIndia = region.id === "IN";

  return [
    {
      label: "Upfront cost",
      custom: `${ecom} one-time (e-commerce standard)`,
      shopify: isIndia
        ? "₹30,000–1,20,000 setup + theme (agency-assisted)"
        : `${formatMoney(scaleInrAmount(30_000, region, "webapp_ecommerce"), region)}–${formatMoney(scaleInrAmount(120_000, region, "webapp_ecommerce"), region)} setup + theme`,
    },
    {
      label: "Monthly platform cost",
      custom: isIndia
        ? "~₹0–3,000 hosting (Vercel, DB, media)"
        : `~${formatMoney(scaleInrAmount(3_000, region, "webapp_ecommerce"), region)} hosting (Vercel, DB, media)`,
      shopify: isIndia
        ? "₹4,000–10,000+ plan + paid apps"
        : `${formatMoney(scaleInrAmount(4_000, region, "webapp_ecommerce"), region)}+ plan + paid apps`,
    },
    {
      label: "Ownership",
      custom: "You own code & database",
      shopify: "Rent the platform; migrate later is costly",
    },
    {
      label: isIndia ? "COD & local checkout" : "Checkout & payments",
      custom: "Built for your workflow",
      shopify: "Apps + configuration",
    },
    {
      label: "Verified reviews",
      custom: "Included in base build",
      shopify: isIndia
        ? "Paid app (~₹1,500–4,000/mo)"
        : `Paid app (~${formatMoney(scaleInrAmount(1_500, region, "webapp_ecommerce"), region)}/mo)`,
    },
    {
      label: "Admin panel",
      custom: "Products, orders, users, tax/shipping",
      shopify: "Shopify admin (excellent, generic)",
    },
    {
      label: "Time to launch",
      custom: "Weeks to months (custom build)",
      shopify: "Days to weeks (template + DIY)",
    },
    {
      label: "Payment gateway fees",
      custom: isIndia
        ? "~2% on online orders (Razorpay etc.)"
        : "~2% on online orders (Stripe / Razorpay etc.)",
      shopify: "Same gateway + possible Shopify transaction fee",
    },
    {
      label: "Bug fixes after launch",
      custom: "Always available for delivered scope",
      shopify: "Platform updates; store changes often need apps or agency",
    },
    {
      label: "Cost as sales grow",
      custom: "Hosting & DB scale gradually—no % of GMV to platform",
      shopify: "Plan upgrades, apps & transaction fees rise with volume",
    },
  ];
}

export function getShopifyScaleIntro(region: PriceRegion) {
  const avgOrder = formatMoney(scaleInrAmount(500, region, "webapp_ecommerce"), region);
  return `Monthly run-cost once the store is live (illustrative). Assumes ~${avgOrder} average order, ~30% orders paid online at ~2% gateway fee.`;
}

export function getShopifyScaleScenarios(region: PriceRegion) {
  return shopifyVsCustom.scaleScenarios.map((scenario) => ({
    ...scenario,
    gmvLabel: formatScaledInr(scenario.gmvInr, region, "webapp_ecommerce"),
    customMonthlyLabel: formatScaledInr(scenario.customMonthlyInr, region, "webapp_ecommerce"),
    shopifyMonthlyLabel: formatScaledInr(scenario.shopifyMonthlyInr, region, "webapp_ecommerce"),
    monthlyDeltaLabel: formatScaledInr(
      scenario.shopifyMonthlyInr - scenario.customMonthlyInr,
      region,
      "webapp_ecommerce",
    ),
    annualDeltaLabel: formatScaledInr(
      (scenario.shopifyMonthlyInr - scenario.customMonthlyInr) * 12,
      region,
      "webapp_ecommerce",
    ),
    customBreakdown: scenario.customBreakdown.map((line) =>
      localizeBreakdownLine(line, region),
    ),
    shopifyBreakdown: scenario.shopifyBreakdown.map((line) =>
      localizeBreakdownLine(line, region),
    ),
    note: localizeNote(scenario.note, region),
  }));
}

function localizeBreakdownLine(line: string, region: PriceRegion): string {
  if (region.id === "IN") return line;
  return line.replace(/₹[\d,]+(?:–₹[\d,]+)?/g, (match) => {
    const parts = match.split("–");
    return parts
      .map((part) => {
        const digits = part.replace(/[^\d]/g, "");
        if (!digits) return part;
        const inr = Number(digits);
        return formatScaledInr(inr, region, "webapp_ecommerce");
      })
      .join("–");
  });
}

function localizeNote(note: string, region: PriceRegion): string {
  if (region.id === "IN") return note;
  return note.replace(/₹[\d,.]+[Lk+]?/g, (match) => {
    const normalized = match.replace(/[₹,]/g, "");
    if (normalized.includes("L")) {
      const lakhs = Number(normalized.replace("L", "").replace("+", ""));
      if (!Number.isNaN(lakhs)) {
        return formatScaledInr(lakhs * 100_000, region, "webapp_ecommerce");
      }
    }
    const digits = normalized.replace(/[^\d]/g, "");
    if (!digits) return match;
    return formatScaledInr(Number(digits), region, "webapp_ecommerce");
  });
}

export function getShopifyTcoExamples(region: PriceRegion) {
  return shopifyVsCustom.tcoExamples.map((example) => ({
    ...example,
    customLabel: formatScaledInr(example.custom, region, "webapp_ecommerce"),
    shopifyLabel: formatScaledInr(example.shopify, region, "webapp_ecommerce"),
  }));
}

export function getShopifyCaveats(region: PriceRegion) {
  const maintenance = formatScaledInr(12_000, region, "webapp_ecommerce");
  return shopifyVsCustom.caveats.map((c) =>
    c.replace("₹12,000/mo", `${maintenance}/mo`),
  );
}

export function getShopifyIntro(region: PriceRegion) {
  if (region.id === "IN") {
    return "A fair comparison for a growing e-commerce store—catalog, cart, checkout, admin, and reviews. Shopify wins on speed to launch; a Picoids build wins on ownership, fit, and long-run cost as you scale.";
  }
  return "A fair comparison for a growing e-commerce store—catalog, cart, checkout, admin, and reviews. Shopify wins on speed to launch; a Picoids build wins on ownership, fit, and long-run cost as you scale.";
}
