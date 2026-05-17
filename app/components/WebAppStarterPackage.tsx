import { sumLineItems, webAppStarterTier } from "@/lib/pricing";
import {
  formatPackagePrice,
  formatScaledInr,
  type PriceRegion,
} from "@/lib/currency";
import ProformaInvoiceCard from "./ProformaInvoice";

type Props = {
  region: PriceRegion;
};

export default function WebAppStarterPackage({ region }: Props) {
  const tier = webAppStarterTier;
  const packageKey = "webapp_starter" as const;
  const baseSum = sumLineItems(tier.baseIncludes);
  const exampleBase = sumLineItems(tier.proforma.lineItems);
  const exampleAddons = tier.proforma.addonLineItems
    ? sumLineItems(tier.proforma.addonLineItems)
    : 0;
  const exampleTotal = exampleBase + exampleAddons;
  const baseLabel = formatPackagePrice(packageKey, region);
  const ecomFrom = formatPackagePrice("webapp_ecommerce", region, { prefix: "from" });

  return (
    <section id="webapp-starter" className="scroll-mt-28 mb-16 md:mb-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-8 border-b border-labs-border">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-labs-subtle mb-2">
            Tier 1 · Starting price
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-labs-fg">
            {tier.packageName}
          </h3>
          <p className="mt-4 text-sm md:text-base text-labs-muted max-w-3xl leading-relaxed">
            {tier.description}
          </p>
        </div>
        <div className="md:text-right shrink-0">
          <p className="labs-label mb-1">Base package</p>
          <p className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">
            {baseLabel}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <div className="labs-card p-6 md:p-8">
          <h4 className="font-display text-xl font-bold text-labs-fg mb-6">
            Included in {baseLabel}
          </h4>
          <ul className="space-y-0 divide-y divide-labs-border">
            {tier.baseIncludes.map((line) => (
              <li
                key={line.description}
                className="flex justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0"
              >
                <span className="text-labs-muted">{line.description}</span>
                <span className="text-labs-fg tabular-nums shrink-0">
                  {formatScaledInr(line.amountInr, region, packageKey)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between gap-4 pt-4 mt-4 border-t border-labs-border-strong font-display font-bold text-labs-fg">
            <span>Base total</span>
            <span className="text-gradient-gold tabular-nums">
              {formatScaledInr(baseSum, region, packageKey)}
            </span>
          </div>
        </div>

        <div className="labs-card p-6 md:p-8">
          <h4 className="font-display text-xl font-bold text-labs-fg mb-4">You receive</h4>
          <ul className="space-y-3 mb-8">
            {tier.deliverables.map((d) => (
              <li key={d} className="flex gap-3 text-sm text-labs-muted">
                <span className="text-labs-accent shrink-0">—</span>
                {d}
              </li>
            ))}
          </ul>
          <h4 className="font-display text-lg font-bold text-labs-fg mb-3">Not in this tier</h4>
          <ul className="space-y-2.5 mb-8">
            {tier.notIncluded.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-labs-subtle">
                <span className="shrink-0">×</span>
                {item}
              </li>
            ))}
          </ul>
          <h4 className="font-display text-xl font-bold text-labs-fg mb-4">Optional add-ons</h4>
          <ul className="space-y-4">
            {tier.addons.map((addon) => (
              <li
                key={addon.id}
                className="flex justify-between gap-4 text-sm border-b border-labs-border/60 pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-labs-fg font-medium">{addon.name}</p>
                  <p className="text-labs-subtle text-xs mt-0.5">{addon.description}</p>
                </div>
                <span className="text-labs-accent font-display font-semibold tabular-nums shrink-0">
                  +{formatScaledInr(addon.priceInr, region, packageKey)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-display text-2xl font-bold text-labs-fg mb-2">
          Example proforma — starter tier
        </h4>
        <p className="text-sm text-labs-muted max-w-2xl">
          Illustrative invoice for{" "}
          <span className="text-labs-fg">{tier.proforma.clientName}</span> — base plus Google
          sign-in and email notifications. Example total:{" "}
          <span className="text-labs-accent font-medium">
            {formatScaledInr(exampleTotal, region, packageKey)}
          </span>
        </p>
      </div>
      <ProformaInvoiceCard
        invoice={tier.proforma}
        billingType={tier.billingType}
        region={region}
        packageKey={packageKey}
      />

      <p className="mt-8 text-sm text-labs-muted">
        Need a full online store?{" "}
        <a href="#webapp-ecommerce" className="text-labs-accent hover:text-labs-fg transition-colors">
          See e-commerce standard ({ecomFrom}) ↓
        </a>
      </p>
    </section>
  );
}
