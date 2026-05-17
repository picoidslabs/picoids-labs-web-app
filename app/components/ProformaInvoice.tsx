import { LABS_BILLING, sumLineItems, type ProformaInvoice } from "@/lib/pricing";
import {
  formatScaledInr,
  pricingDisclaimer,
  type PackagePriceKey,
  type PriceRegion,
} from "@/lib/currency";

type Props = {
  invoice: ProformaInvoice;
  billingType: "one-time" | "monthly";
  region: PriceRegion;
  packageKey: PackagePriceKey;
};

export default function ProformaInvoiceCard({
  invoice,
  billingType,
  region,
  packageKey,
}: Props) {
  const baseTotal = sumLineItems(invoice.lineItems);
  const addonTotal = invoice.addonLineItems ? sumLineItems(invoice.addonLineItems) : 0;
  const grandTotal = baseTotal + addonTotal;

  const format = (amountInr: number) => formatScaledInr(amountInr, region, packageKey);

  return (
    <div className="proforma-sheet rounded-lg border border-labs-border-strong bg-labs-bg overflow-hidden text-sm">
      <div className="px-6 py-5 border-b border-labs-border bg-labs-bg-elevated flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-labs-accent mb-1">
            Proforma invoice
          </p>
          <p className="font-display text-xl font-bold text-labs-fg">{LABS_BILLING.brand}</p>
          <p className="text-labs-subtle text-xs mt-1">{LABS_BILLING.legalName}</p>
          <p className="text-labs-subtle text-xs mt-2 leading-relaxed max-w-xs">
            {LABS_BILLING.address}
          </p>
        </div>
        <div className="sm:text-right text-labs-muted text-xs space-y-1">
          <p>
            <span className="text-labs-subtle">Invoice no.</span>{" "}
            <span className="text-labs-fg font-mono">{invoice.invoiceNo}</span>
          </p>
          <p>
            <span className="text-labs-subtle">Date</span> {invoice.issuedLabel}
          </p>
          <p>
            <span className="text-labs-subtle">Type</span>{" "}
            {billingType === "monthly" ? "Monthly retainer" : "Project (one-time)"}
          </p>
        </div>
      </div>

      <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-labs-border">
        <div>
          <p className="labs-label mb-2">Bill to</p>
          <p className="font-medium text-labs-fg">{invoice.clientName}</p>
          <p className="text-labs-muted">{invoice.clientLocation}</p>
        </div>
        <div className="md:text-right">
          <p className="labs-label mb-2">Project</p>
          <p className="text-labs-fg leading-snug">{invoice.projectTitle}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-labs-border text-[10px] uppercase tracking-wider text-labs-subtle">
              <th className="px-6 py-3 font-medium">Description</th>
              <th className="px-6 py-3 font-medium text-right w-32">Amount</th>
            </tr>
          </thead>
          <tbody className="text-labs-muted">
            {invoice.lineItems.map((item, i) => (
              <tr key={`base-${i}`} className="border-b border-labs-border/60">
                <td className="px-6 py-3">{item.description}</td>
                <td className="px-6 py-3 text-right text-labs-fg tabular-nums">
                  {format(item.amountInr)}
                </td>
              </tr>
            ))}
            {invoice.addonLineItems?.map((item, i) => (
              <tr key={`addon-${i}`} className="border-b border-labs-border/60 bg-labs-bg-elevated/50">
                <td className="px-6 py-3">{item.description}</td>
                <td className="px-6 py-3 text-right text-labs-accent tabular-nums">
                  {format(item.amountInr)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-labs-border-strong">
              <td className="px-6 py-4 font-display font-bold text-labs-fg">Total</td>
              <td className="px-6 py-4 text-right font-display text-xl font-bold text-gradient-gold tabular-nums">
                {format(grandTotal)}
                {billingType === "monthly" ? (
                  <span className="block text-[10px] font-body font-normal text-labs-subtle tracking-normal">
                    per month
                  </span>
                ) : null}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-labs-border space-y-3 text-xs text-labs-muted">
        <p>
          <span className="text-labs-subtle uppercase tracking-wider">Payment terms · </span>
          {invoice.paymentTerms}
        </p>
        <ul className="space-y-1 list-disc list-inside text-labs-subtle">
          {invoice.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <p className="pt-1 text-labs-subtle">{pricingDisclaimer(region)}</p>
        <p className="pt-2 text-labs-subtle italic">
          This is an example proforma for illustration. Final invoice issued on project acceptance.
        </p>
      </div>
    </div>
  );
}
