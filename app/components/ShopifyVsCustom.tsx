import { shopifyVsCustom } from "@/lib/pricing";
import {
  getShopifyCaveats,
  getShopifyComparisonRows,
  getShopifyIntro,
  getShopifyScaleIntro,
  getShopifyScaleScenarios,
  getShopifyTcoExamples,
} from "@/lib/shopify-comparison";
import type { PriceRegion } from "@/lib/currency";

type Props = {
  region: PriceRegion;
};

export default function ShopifyVsCustom({ region }: Props) {
  const { chooseCustom, chooseShopify } = shopifyVsCustom;
  const comparisonRows = getShopifyComparisonRows(region);
  const scaleIntro = getShopifyScaleIntro(region);
  const scaleScenarios = getShopifyScaleScenarios(region);
  const tcoExamples = getShopifyTcoExamples(region);
  const caveats = getShopifyCaveats(region);
  const intro = getShopifyIntro(region);

  return (
    <section
      id="webapp-comparison"
      className="scroll-mt-28 mb-10 labs-card p-6 md:p-10 lg:p-12 border-labs-accent/20"
      aria-labelledby="shopify-vs-custom-heading"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-labs-accent mb-3">Why custom?</p>
      <h3
        id="shopify-vs-custom-heading"
        className="font-display text-2xl md:text-3xl font-bold text-labs-fg max-w-2xl leading-tight mb-4"
      >
        Custom build vs Shopify for the same store
      </h3>
      <p className="text-labs-muted text-sm md:text-base max-w-3xl leading-relaxed mb-10">{intro}</p>

      <div className="overflow-x-auto mb-10 -mx-2 px-2">
        <table className="w-full min-w-[32rem] text-sm text-left">
          <thead>
            <tr className="border-b border-labs-border text-[10px] uppercase tracking-wider text-labs-subtle">
              <th className="py-3 pr-4 font-medium w-[28%]"> </th>
              <th className="py-3 pr-4 font-medium text-labs-accent">Picoids custom</th>
              <th className="py-3 font-medium">Shopify (typical)</th>
            </tr>
          </thead>
          <tbody className="text-labs-muted">
            {comparisonRows.map((row) => (
              <tr key={row.label} className="border-b border-labs-border/60">
                <td className="py-3.5 pr-4 font-medium text-labs-fg">{row.label}</td>
                <td className="py-3.5 pr-4">{row.custom}</td>
                <td className="py-3.5">{row.shopify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-10 pb-10 border-b border-labs-border">
        <h4 className="font-display text-xl font-bold text-labs-fg mb-3">
          Cost as you scale (monthly run-cost)
        </h4>
        <p className="text-sm text-labs-muted max-w-3xl leading-relaxed mb-6">{scaleIntro}</p>
        <div className="space-y-5">
          {scaleScenarios.map((scenario) => {
            const monthlyDelta =
              scenario.shopifyMonthlyInr - scenario.customMonthlyInr;

            return (
              <div
                key={scenario.id}
                className="rounded-lg border border-labs-border bg-labs-bg-elevated p-5 md:p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <p className="font-display text-lg font-bold text-labs-fg">{scenario.label}</p>
                    <p className="text-xs text-labs-subtle mt-1">
                      ~{scenario.ordersPerMonth.toLocaleString(region.locale)} orders ·{" "}
                      {scenario.gmvLabel} GMV / month
                    </p>
                  </div>
                  <div className="flex gap-6 md:text-right">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-labs-subtle mb-1">
                        Custom / mo
                      </p>
                      <p className="font-display text-xl font-bold text-gradient-gold tabular-nums">
                        {scenario.customMonthlyLabel}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-labs-subtle mb-1">
                        Shopify / mo
                      </p>
                      <p className="font-display text-xl font-bold text-labs-fg tabular-nums">
                        {scenario.shopifyMonthlyLabel}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-labs-muted mb-3">
                  <div>
                    <p className="text-labs-subtle uppercase tracking-wider mb-2">Custom stack</p>
                    <ul className="space-y-1">
                      {scenario.customBreakdown.map((line) => (
                        <li key={line}>— {line}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-labs-subtle uppercase tracking-wider mb-2">Shopify stack</p>
                    <ul className="space-y-1">
                      {scenario.shopifyBreakdown.map((line) => (
                        <li key={line}>— {line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-labs-subtle leading-relaxed">
                  {scenario.note}
                  {monthlyDelta > 0 ? (
                    <span className="text-labs-accent">
                      {" "}
                      · Shopify ~{scenario.monthlyDeltaLabel}/mo more (~
                      {scenario.annualDeltaLabel}/yr at this volume).
                    </span>
                  ) : null}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {tcoExamples.map((example) => (
          <div
            key={example.title}
            className="rounded-lg border border-labs-border bg-labs-bg-elevated p-6"
          >
            <p className="labs-label mb-4">{example.title} — total cost of ownership</p>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-labs-subtle mb-1">Custom</p>
                <p className="font-display text-2xl font-bold text-gradient-gold tabular-nums">
                  {example.customLabel}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-labs-subtle mb-1">Shopify</p>
                <p className="font-display text-2xl font-bold text-labs-fg tabular-nums">
                  {example.shopifyLabel}
                </p>
              </div>
            </div>
            <p className="text-xs text-labs-subtle leading-relaxed">{example.note}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h4 className="font-display text-lg font-bold text-labs-fg mb-4">Choose custom when</h4>
          <ul className="space-y-2.5">
            {chooseCustom.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-labs-muted">
                <span className="text-labs-accent shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold text-labs-fg mb-4">Choose Shopify when</h4>
          <ul className="space-y-2.5">
            {chooseShopify.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-labs-muted">
                <span className="text-labs-subtle shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="text-xs text-labs-subtle leading-relaxed border-t border-labs-border pt-6 mb-6 space-y-2 list-disc list-inside">
        {caveats.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <p className="text-sm text-labs-muted">
        Reference build:{" "}
        <a
          href="https://shwetafoods.in"
          className="text-labs-accent hover:text-labs-fg transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          shwetafoods.in
        </a>{" "}
        — snack-shop e-commerce in this package scope.
      </p>
    </section>
  );
}
