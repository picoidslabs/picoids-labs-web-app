import { cookies, headers } from "next/headers";
import {
  PRICING_REGION_COOKIE,
  PRICING_REGION_OVERRIDE_COOKIE,
  detectCountryFromRequestHeaders,
  getRegion,
  resolveRegionId,
  type PriceRegion,
} from "./currency";

export async function getPricingRegion(): Promise<PriceRegion> {
  const cookieStore = await cookies();
  const manualOverride =
    cookieStore.get(PRICING_REGION_OVERRIDE_COOKIE)?.value ??
    cookieStore.get(PRICING_REGION_COOKIE)?.value;

  const headersList = await headers();
  const country = detectCountryFromRequestHeaders(headersList);
  const regionId = resolveRegionId(manualOverride, country);

  return getRegion(regionId);
}
