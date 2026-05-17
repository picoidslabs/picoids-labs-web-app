import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import Marquee from "../components/Marquee";
import ServiceGlyph from "../components/ServiceGlyph";
import PricingDisclaimer from "../components/PricingDisclaimer";
import { formatPackagePrice } from "@/lib/currency";
import { getPricingRegion } from "@/lib/get-pricing-region";
import { labServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services & pricing",
  description:
    "Fixed-price website, mobile app, SEO, and digital marketing packages for micro and small businesses.",
};

const marqueeItems = ["Web", "Web apps", "Mobile", "SEO", "Marketing", "Fixed pricing"];

export default async function ServicesPage() {
  const region = await getPricingRegion();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="section-pad pb-12 md:pb-16">
          <div className="container-labs">
            <p className="text-xs uppercase tracking-[0.35em] text-labs-accent mb-6">Packages</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-labs-fg max-w-4xl leading-[0.95]">
              Services &<br />
              <span className="text-outline">starter</span> pricing
            </h1>
            <p className="mt-8 text-xl text-labs-muted max-w-2xl leading-relaxed">
              Transparent packages for SMEs. We tailor scope after a short call—no hidden fees.
            </p>
            <PricingDisclaimer region={region} className="mt-6 max-w-2xl" />
          </div>
        </section>

        <Marquee items={marqueeItems} speed="slow" />

        <section className="section-pad pt-12">
          <div className="container-labs space-y-6">
            {labServices.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className="labs-card scroll-mt-28 p-8 md:p-12 lg:p-14"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div className="lg:col-span-1 font-display text-5xl font-bold text-watermark">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="lg:col-span-4">
                    <div className="w-24 h-24 text-labs-accent mb-6">
                      <ServiceGlyph id={service.id} />
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-labs-accent mb-2">
                      {service.tagline}
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-labs-fg">
                      {service.name}
                    </h2>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="text-labs-muted leading-relaxed mb-8">{service.description}</p>
                    <ul className="space-y-3">
                      {service.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm text-labs-muted">
                          <span className="text-labs-accent shrink-0">—</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-3 lg:text-right">
                    <p className="labs-label mb-2">From</p>
                    <p className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">
                      {formatPackagePrice(service.fromPriceKey, region, {
                        monthly: service.fromPriceMonthly,
                      })}
                    </p>
                    {service.secondaryFromPriceKey ? (
                      <p className="text-xs text-labs-subtle mt-2 uppercase tracking-wider">
                        E-commerce{" "}
                        {formatPackagePrice(service.secondaryFromPriceKey, region, {
                          prefix: "from",
                        })}
                      </p>
                    ) : null}
                    <div className="flex flex-col gap-3 mt-8 lg:items-end">
                      <Link
                        href={`/pricing#${service.id}`}
                        className="text-sm uppercase tracking-[0.12em] text-labs-accent hover:text-labs-fg transition-colors"
                      >
                        Full breakdown →
                      </Link>
                      <Link
                        href="/contact"
                        className="text-sm uppercase tracking-[0.12em] text-labs-muted hover:text-labs-accent transition-colors"
                      >
                        Request quote →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-pad border-t border-labs-border">
          <div className="container-labs text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-labs-fg mb-4">
              Need a custom mix?
            </h2>
            <p className="text-labs-muted mb-8">
              E-commerce, bookings, integrations—we quote after understanding your goals.
            </p>
            <Link href="/contact" className="btn-labs">
              Talk to us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
