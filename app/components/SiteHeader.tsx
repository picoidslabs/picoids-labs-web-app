import { getPricingRegion } from "@/lib/get-pricing-region";
import Header from "./Header";

export default async function SiteHeader() {
  const region = await getPricingRegion();
  return <Header currentRegionId={region.id} />;
}
