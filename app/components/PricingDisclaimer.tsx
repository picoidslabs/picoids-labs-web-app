import { pricingDisclaimer, type PriceRegion } from "@/lib/currency";

type Props = {
  region: PriceRegion;
  className?: string;
};

export default function PricingDisclaimer({ region, className = "" }: Props) {
  return (
    <p className={`text-xs text-labs-subtle leading-relaxed ${className}`}>
      {pricingDisclaimer(region)}
    </p>
  );
}
