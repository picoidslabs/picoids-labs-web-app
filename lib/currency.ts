export type PriceRegionId = "IN" | "US" | "GB" | "EU";

export type PackagePriceKey =
  | "web"
  | "webapp_starter"
  | "webapp_ecommerce"
  | "mobile"
  | "seo_monthly"
  | "marketing_monthly";

export type PriceRegion = {
  id: PriceRegionId;
  label: string;
  currency: string;
  locale: string;
};

/** Set only when the visitor picks a currency in the header dropdown. */
export const PRICING_REGION_OVERRIDE_COOKIE = "picoids-pricing-override";

/** @deprecated Auto-set cookie; cleared by middleware — geo headers are used instead. */
export const PRICING_REGION_COOKIE = "picoids-pricing-region";

export const PICOIDS_COUNTRY_HEADER = "x-picoids-country";

export const DEFAULT_REGION_ID: PriceRegionId = "US";

export const REGIONS: Record<PriceRegionId, PriceRegion> = {
  IN: { id: "IN", label: "India (INR)", currency: "INR", locale: "en-IN" },
  US: { id: "US", label: "United States (USD)", currency: "USD", locale: "en-US" },
  GB: { id: "GB", label: "United Kingdom (GBP)", currency: "GBP", locale: "en-GB" },
  EU: { id: "EU", label: "Europe (EUR)", currency: "EUR", locale: "en-GB" },
};

/** Rounded list prices per region (headline package amounts). */
export const PACKAGE_LIST_PRICES: Record<PriceRegionId, Record<PackagePriceKey, number>> = {
  IN: {
    web: 15_000,
    webapp_starter: 75_000,
    webapp_ecommerce: 245_000,
    mobile: 45_000,
    seo_monthly: 8_000,
    marketing_monthly: 12_000,
  },
  US: {
    web: 199,
    webapp_starter: 899,
    webapp_ecommerce: 2_999,
    mobile: 549,
    seo_monthly: 99,
    marketing_monthly: 149,
  },
  GB: {
    web: 179,
    webapp_starter: 799,
    webapp_ecommerce: 2_499,
    mobile: 449,
    seo_monthly: 89,
    marketing_monthly: 129,
  },
  EU: {
    web: 189,
    webapp_starter: 849,
    webapp_ecommerce: 2_799,
    mobile: 499,
    seo_monthly: 95,
    marketing_monthly: 139,
  },
};

const EU_COUNTRY_CODES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
]);

export function countryToRegionId(countryCode: string | null | undefined): PriceRegionId {
  const code = (countryCode ?? "").toUpperCase();
  if (code === "IN") return "IN";
  if (code === "US") return "US";
  if (code === "GB" || code === "UK") return "GB";
  if (EU_COUNTRY_CODES.has(code)) return "EU";
  return DEFAULT_REGION_ID;
}

/** Read country from edge geo headers (and optional middleware-forwarded header). */
export function detectCountryFromRequestHeaders(
  headersList: Headers,
): string | null {
  const geo =
    headersList.get(PICOIDS_COUNTRY_HEADER) ??
    headersList.get("x-vercel-ip-country") ??
    headersList.get("cf-ipcountry");
  if (geo) return geo.toUpperCase();

  const acceptLanguage = headersList.get("accept-language");
  if (acceptLanguage) {
    const localeMatch = acceptLanguage.match(/\b([a-z]{2})-([A-Z]{2})\b/i);
    if (localeMatch) return localeMatch[2].toUpperCase();
  }

  return null;
}

export function resolveRegionId(
  overrideCookie: string | undefined,
  countryCode: string | null | undefined,
): PriceRegionId {
  if (overrideCookie && overrideCookie in REGIONS) {
    return overrideCookie as PriceRegionId;
  }
  return countryToRegionId(countryCode);
}

export function getRegion(regionId: PriceRegionId): PriceRegion {
  return REGIONS[regionId];
}

export function getPackageListPrice(
  packageKey: PackagePriceKey,
  region: PriceRegion,
): number {
  return PACKAGE_LIST_PRICES[region.id][packageKey];
}

function roundRegionalAmount(amount: number, region: PriceRegion): number {
  if (region.id === "IN") return Math.round(amount);

  const abs = Math.abs(amount);
  let step: number;
  if (abs < 50) step = 5;
  else if (abs < 200) step = 5;
  else if (abs < 1_000) step = 10;
  else if (abs < 5_000) step = 25;
  else step = 50;

  const rounded = Math.round(amount / step) * step;
  return amount < 0 ? -rounded : rounded;
}

/** Scale an INR line-item amount using the package's regional list-price ratio. */
export function scaleInrAmount(
  amountInr: number,
  region: PriceRegion,
  packageKey: PackagePriceKey,
): number {
  if (region.id === "IN") return amountInr;

  const inrBase = PACKAGE_LIST_PRICES.IN[packageKey];
  const regionalBase = PACKAGE_LIST_PRICES[region.id][packageKey];
  return roundRegionalAmount(amountInr * (regionalBase / inrBase), region);
}

export function formatMoney(amount: number, region: PriceRegion): string {
  return new Intl.NumberFormat(region.locale, {
    style: "currency",
    currency: region.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatScaledInr(
  amountInr: number,
  region: PriceRegion,
  packageKey: PackagePriceKey,
): string {
  return formatMoney(scaleInrAmount(amountInr, region, packageKey), region);
}

export function formatPackagePrice(
  packageKey: PackagePriceKey,
  region: PriceRegion,
  options?: { prefix?: string; monthly?: boolean },
): string {
  const amount = getPackageListPrice(packageKey, region);
  const formatted = formatMoney(amount, region);
  const withPeriod = options?.monthly ? `${formatted}/mo` : formatted;
  if (options?.prefix === "from") return `from ${withPeriod}`;
  return withPeriod;
}

export function pricingDisclaimer(region: PriceRegion): string {
  if (region.id === "IN") {
    return "Prices in INR. GST @ 18% may apply where relevant.";
  }
  return `Prices shown in ${region.currency}. Invoices are typically issued in INR unless agreed otherwise.`;
}

/** @deprecated Use formatScaledInr or formatMoney with a region. */
export function formatInr(amount: number): string {
  return formatMoney(amount, REGIONS.IN);
}
