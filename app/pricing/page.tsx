import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import Marquee from "../components/Marquee";
import ServiceGlyph from "../components/ServiceGlyph";
import ProformaInvoiceCard from "../components/ProformaInvoice";
import ShopifyVsCustom from "../components/ShopifyVsCustom";
import WebAppStarterPackage from "../components/WebAppStarterPackage";
import PricingDisclaimer from "../components/PricingDisclaimer";
import { formatPackagePrice, formatScaledInr, type PackagePriceKey } from "@/lib/currency";
import { getPricingRegion } from "@/lib/get-pricing-region";
import { labServices, SERVICE_PACKAGE_KEYS } from "@/lib/services";
import { servicePricing, sumLineItems } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent base packages, add-ons, and example proforma invoices for website, web application, mobile, SEO, and digital marketing services.",
};

const marqueeItems = [
  "Base + add-ons",
  "Proforma examples",
  "Clear pricing",
  "No hidden fees",
  "SME first",
  "Picoids Labs",
];

function serviceName(id: string) {
  return labServices.find((s) => s.id === id)?.name ?? id;
}

function packageKeyForService(serviceId: string): PackagePriceKey {
  return SERVICE_PACKAGE_KEYS[serviceId as keyof typeof SERVICE_PACKAGE_KEYS];
}

export default async function PricingPage() {
  const region = await getPricingRegion();
  const starterLabel = formatPackagePrice("webapp_starter", region);
  const ecomLabel = formatPackagePrice("webapp_ecommerce", region);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="section-pad pb-12 md:pb-16">
          <div className="container-labs">
            <p className="text-xs uppercase tracking-[0.35em] text-labs-accent mb-6">Pricing</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-labs-fg max-w-4xl leading-[0.95]">
              What you get.
              <br />
              <span className="text-outline">What it costs.</span>
            </h1>
            <p className="mt-8 text-xl text-labs-muted max-w-2xl leading-relaxed">
              Every service has a base package with a line-by-line breakdown, optional add-ons with
              fixed prices, and an example proforma invoice you can share with your team.
            </p>
            <PricingDisclaimer region={region} className="mt-6 max-w-2xl" />
            <nav className="mt-10 flex flex-wrap gap-3">
              {servicePricing.map((pkg) => (
                <a
                  key={pkg.serviceId}
                  href={`#${pkg.serviceId}`}
                  className="text-xs uppercase tracking-[0.12em] px-4 py-2 rounded-full border border-labs-border text-labs-muted hover:text-labs-accent hover:border-labs-accent/40 transition-colors"
                >
                  {serviceName(pkg.serviceId)}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <Marquee items={marqueeItems} speed="slow" />

        <section className="section-pad pt-8 space-y-24 md:space-y-32">
          <div className="container-labs space-y-24 md:space-y-32">
            {servicePricing.map((pkg, index) => {
              const packageKey = packageKeyForService(pkg.serviceId);
              const format = (amountInr: number) =>
                formatScaledInr(amountInr, region, packageKey);
              const baseSum = sumLineItems(pkg.baseIncludes);
              const exampleBase = sumLineItems(pkg.proforma.lineItems);
              const exampleAddons = pkg.proforma.addonLineItems
                ? sumLineItems(pkg.proforma.addonLineItems)
                : 0;
              const exampleTotal = exampleBase + exampleAddons;
              const baseLabel =
                pkg.billingType === "monthly"
                  ? formatPackagePrice(packageKey, region, { monthly: true })
                  : formatPackagePrice(packageKey, region);

              return (
                <article
                  key={pkg.serviceId}
                  id={pkg.serviceId}
                  className="scroll-mt-28"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-10">
                    <div className="w-20 h-20 text-labs-accent shrink-0">
                      <ServiceGlyph id={pkg.serviceId} />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-5xl font-bold text-watermark leading-none mb-2">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-labs-fg">
                        {serviceName(pkg.serviceId)}
                      </h2>
                      <p className="text-labs-accent text-sm uppercase tracking-[0.2em] mt-2">
                        {pkg.serviceId === "webapp"
                          ? "Starter & e-commerce tiers"
                          : pkg.packageName}
                      </p>
                      {pkg.serviceId === "webapp" ? (
                        <p className="mt-4 text-labs-muted text-sm max-w-2xl leading-relaxed">
                          From{" "}
                          <a
                            href="#webapp-starter"
                            className="text-labs-fg font-medium hover:text-labs-accent transition-colors"
                          >
                            {starterLabel} starter
                          </a>{" "}
                          or{" "}
                          <a
                            href="#webapp-ecommerce"
                            className="text-labs-fg font-medium hover:text-labs-accent transition-colors"
                          >
                            {ecomLabel} e-commerce
                          </a>
                          .{" "}
                          <a
                            href="#webapp-comparison"
                            className="text-labs-accent hover:text-labs-fg transition-colors"
                          >
                            Compare with Shopify →
                          </a>
                        </p>
                      ) : null}
                    </div>
                    <div className="lg:text-right shrink-0">
                      {pkg.serviceId === "webapp" ? (
                        <>
                          <p className="labs-label mb-1">From</p>
                          <p className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">
                            {starterLabel}
                          </p>
                          <p className="text-xs text-labs-subtle mt-2 uppercase tracking-wider">
                            E-commerce {ecomLabel}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="labs-label mb-1">Base package</p>
                          <p className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">
                            {baseLabel}
                          </p>
                        </>
                      )}
                      {pkg.billingType === "monthly" ? (
                        <p className="text-xs text-labs-subtle mt-1 uppercase tracking-wider">
                          billed monthly
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {pkg.serviceId === "webapp" ? <WebAppStarterPackage region={region} /> : null}

                  {pkg.serviceId === "webapp" ? (
                    <div
                      id="webapp-ecommerce"
                      className="scroll-mt-28 mb-8 pt-8 border-t border-labs-border"
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-labs-subtle mb-2">
                        Tier 2
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-labs-fg">
                        {pkg.packageName}
                      </h3>
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                    <div className="labs-card p-6 md:p-8">
                      <h3 className="font-display text-xl font-bold text-labs-fg mb-6">
                        {pkg.serviceId === "webapp"
                          ? "Included in e-commerce base"
                          : "Included in base price"}
                      </h3>
                      <ul className="space-y-0 divide-y divide-labs-border">
                        {pkg.baseIncludes.map((line) => (
                          <li
                            key={line.description}
                            className="flex justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0"
                          >
                            <span className="text-labs-muted">{line.description}</span>
                            <span className="text-labs-fg tabular-nums shrink-0">
                              {format(line.amountInr)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between gap-4 pt-4 mt-4 border-t border-labs-border-strong font-display font-bold text-labs-fg">
                        <span>Base total</span>
                        <span className="text-gradient-gold tabular-nums">{format(baseSum)}</span>
                      </div>
                    </div>

                    <div className="labs-card p-6 md:p-8">
                      <h3 className="font-display text-xl font-bold text-labs-fg mb-4">
                        You receive
                      </h3>
                      <ul className="space-y-3 mb-8">
                        {pkg.deliverables.map((d) => (
                          <li key={d} className="flex gap-3 text-sm text-labs-muted">
                            <span className="text-labs-accent shrink-0">—</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                      <h3 className="font-display text-xl font-bold text-labs-fg mb-4">
                        Optional add-ons
                      </h3>
                      <ul className="space-y-4">
                        {pkg.addons.map((addon) => (
                          <li
                            key={addon.id}
                            className="flex justify-between gap-4 text-sm border-b border-labs-border/60 pb-4 last:border-0 last:pb-0"
                          >
                            <div>
                              <p className="text-labs-fg font-medium">{addon.name}</p>
                              <p className="text-labs-subtle text-xs mt-0.5">{addon.description}</p>
                            </div>
                            <span className="text-labs-accent font-display font-semibold tabular-nums shrink-0">
                              +{format(addon.priceInr)}
                              {pkg.billingType === "monthly" ? (
                                <span className="block text-[10px] font-body font-normal text-labs-subtle text-right">
                                  /mo
                                </span>
                              ) : null}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {pkg.serviceId === "webapp" ? <ShopifyVsCustom region={region} /> : null}

                  <div className="mb-4">
                    <h3 className="font-display text-2xl font-bold text-labs-fg mb-2">
                      {pkg.serviceId === "webapp"
                        ? "Example proforma — e-commerce tier"
                        : "Example proforma invoice"}
                    </h3>
                    <p className="text-sm text-labs-muted max-w-2xl">
                      Illustrative invoice for{" "}
                      <span className="text-labs-fg">{pkg.proforma.clientName}</span>
                      {pkg.proforma.addonLineItems?.length
                        ? " — base package plus selected add-ons"
                        : " — base package only"}
                      . Example total:{" "}
                      <span className="text-labs-accent font-medium">
                        {format(exampleTotal)}
                        {pkg.billingType === "monthly" ? "/mo" : ""}
                      </span>
                    </p>
                  </div>
                  <ProformaInvoiceCard
                    invoice={pkg.proforma}
                    billingType={pkg.billingType}
                    region={region}
                    packageKey={packageKey}
                  />

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/contact" className="btn-labs">
                      Request this package
                    </Link>
                    <Link
                      href={`/services#${pkg.serviceId}`}
                      className="btn-labs-ghost"
                    >
                      Service overview
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section-pad border-t border-labs-border">
          <div className="container-labs text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-labs-fg mb-4">
              Need a custom quote?
            </h2>
            <p className="text-labs-muted mb-8">
              Mix services, change scope, or combine base packages—we&apos;ll send a proforma
              tailored to your project.
            </p>
            <Link href="/contact" className="btn-labs">
              Get a quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}