import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";
import ServiceGlyph from "./components/ServiceGlyph";
import PricingDisclaimer from "./components/PricingDisclaimer";
import { formatPackagePrice } from "@/lib/currency";
import { getPricingRegion } from "@/lib/get-pricing-region";
import { labServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Web, Mobile & Digital for SMEs",
  description:
    "Picoids Labs helps micro and small businesses with websites, web applications, SEO, and digital marketing at fixed, transparent pricing.",
};

const marqueeItems = [
  "Transparent pricing",
  "Web apps & mobile",
  "SEO & ads",
  "Worldwide delivery",
  "No enterprise fluff",
  "Picoids Labs",
];

const pillars = [
  {
    num: "01",
    title: "Clear packages",
    body: "Starter prices you can read on the page—not a discovery call to learn the minimum.",
  },
  {
    num: "02",
    title: "Built to ship",
    body: "Practical delivery for local and international clients—remote collaboration, clear milestones.",
  },
  {
    num: "03",
    title: "Picoids engineering",
    body: "The same discipline behind international consulting—scaled for shop, clinic, and SME budgets.",
  },
];

export default async function HomePage() {
  const region = await getPricingRegion();
  const starterWeb = formatPackagePrice("web", region, { prefix: "from" });
  const heroPrice = formatPackagePrice("web", region);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative pt-8 md:pt-12 pb-16 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 right-[-8%] w-[min(52vw,520px)] aspect-square rounded-full bg-labs-accent/10 blur-[100px] float-slow" />
            <div className="absolute bottom-[20%] left-[-12%] w-[min(40vw,400px)] aspect-square rounded-full bg-labs-accent-hot/10 blur-[90px]" />
            <div className="absolute top-28 right-[8%] hidden lg:block labs-card p-6 w-56 float-slow opacity-90" style={{ animationDelay: "1.5s" }}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-labs-subtle mb-2">Starter web</p>
              <p className="font-display text-3xl font-bold text-gradient-gold">{heroPrice}+</p>
              <p className="text-xs text-labs-muted mt-2">Transparent. No retainer games.</p>
            </div>
          </div>

          <div className="container-labs relative z-10">
            <p className="text-xs uppercase tracking-[0.35em] text-labs-accent mb-6 md:mb-8">
              Picoids Labs · Digital studio
            </p>
            <h1 className="hero-display max-w-[14ch]">
              <span className="block text-labs-fg">Digital</span>
              <span className="block text-outline">for</span>
              <span className="block text-gradient-gold">growing</span>
              <span className="block text-labs-fg">brands.</span>
            </h1>
            <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
              <p className="lg:col-span-5 text-lg md:text-xl text-labs-muted leading-relaxed max-w-md">
                Websites, web applications, SEO, and marketing with{" "}
                <span className="text-labs-fg font-medium">transparent fixed pricing</span>
                —built for shops, clinics, and growing brands—not enterprise decks.
              </p>
              <div className="lg:hidden labs-card inline-flex flex-col p-4 w-fit">
                <p className="text-[10px] uppercase tracking-[0.2em] text-labs-subtle mb-1">
                  Starter web
                </p>
                <p className="font-display text-2xl font-bold text-gradient-gold">{starterWeb}</p>
              </div>
              <div className="lg:col-span-7 flex flex-wrap gap-4 lg:justify-end">
                <Link href="/contact" className="btn-labs">
                  Start a project
                </Link>
                <Link href="/services" className="btn-labs-ghost">
                  See packages
                </Link>
              </div>
            </div>
            <PricingDisclaimer region={region} className="mt-8 max-w-md" />
          </div>
        </section>

        <Marquee items={marqueeItems} />

        <section className="section-pad">
          <div className="container-labs">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-labs-accent mb-4">What we ship</p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-labs-fg max-w-lg">
                  Five ways to grow online
                </h2>
              </div>
              <Link
                href="/pricing"
                className="text-sm uppercase tracking-[0.15em] text-labs-muted hover:text-labs-accent transition-colors self-start md:self-auto"
              >
                Full pricing →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {labServices.map((service, index) => (
                <Link
                  key={service.id}
                  href={`/services#${service.id}`}
                  className={`labs-card group p-8 md:p-10 flex flex-col ${
                    index === 0 ? "md:row-span-1" : ""
                  }`}
                >
                  <div className="flex justify-between items-start gap-6 mb-8">
                    <span className="font-display text-6xl md:text-7xl font-bold text-watermark leading-none select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="w-16 h-16 md:w-20 md:h-20 text-labs-accent opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                      <ServiceGlyph id={service.id} />
                    </div>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-labs-accent mb-2">
                    {service.tagline}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-labs-fg mb-3 group-hover:text-labs-accent transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-labs-muted text-sm leading-relaxed flex-1 mb-6">
                    {service.description}
                  </p>
                  <p className="font-display text-xl font-semibold text-gradient-gold">
                    {formatPackagePrice(service.fromPriceKey, region, {
                      prefix: "from",
                      monthly: service.fromPriceMonthly,
                    })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad border-t border-labs-border bg-labs-bg-elevated/50">
          <div className="container-labs">
            <p className="text-xs uppercase tracking-[0.3em] text-labs-subtle mb-16">Why Labs</p>
            <div className="space-y-0 divide-y divide-labs-border">
              {pillars.map((p) => (
                <article
                  key={p.num}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 py-12 md:py-16 first:pt-0"
                >
                  <span className="md:col-span-2 font-display text-5xl md:text-6xl font-bold text-watermark">
                    {p.num}
                  </span>
                  <h3 className="md:col-span-4 font-display text-2xl md:text-3xl font-bold text-labs-fg">
                    {p.title}
                  </h3>
                  <p className="md:col-span-6 text-labs-muted text-lg leading-relaxed md:pt-1">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-labs-accent/20 via-transparent to-labs-accent-hot/15" />
          <div className="container-labs relative z-10 text-center">
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-labs-fg mb-6 text-balance max-w-4xl mx-auto">
              Your next customer is already searching online
            </h2>
            <p className="text-labs-muted text-lg max-w-xl mx-auto mb-10">
              Tell us what you sell—we will reply within one business day with a clear next step.
            </p>
            <Link href="/contact" className="btn-labs">
              Get a free quote
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
