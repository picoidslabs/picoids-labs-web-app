import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import Marquee from "../components/Marquee";
import { MAIN_SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Picoids Labs",
  description:
    "Picoids Labs is the SME initiative from Picoids Technology and Consulting—training and digital services for small businesses worldwide.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="section-pad">
          <div className="container-labs grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-labs-accent mb-6">Our story</p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                Built for the business next door
              </h1>
            </div>
            <div className="space-y-6 text-lg text-labs-muted leading-relaxed lg:pt-8">
              <p>
                Picoids Labs is the SME arm of Picoids Technology and Consulting Pvt. Ltd.—for
                micro, small, and medium enterprises that need a professional digital presence
                without enterprise budgets.
              </p>
              <p>
                We are based in Bikaner, Rajasthan, and work with clients locally and internationally.
                The same engineering discipline behind enterprise consulting—packaged into clear
                deliverables and transparent fixed pricing.
              </p>
              <p>
                Beyond client work, we invest in candidate training in Bikaner so more people can
                join the digital economy.
              </p>
            </div>
          </div>
        </section>

        <Marquee
          items={["Bikaner", "Rajasthan", "India", "SME", "Training", "Delivery"]}
          speed="slow"
        />

        <section className="section-pad bg-labs-bg-elevated/50 border-y border-labs-border">
          <div className="container-labs max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-labs-fg mb-6">
              Part of the Picoids family
            </h2>
            <p className="text-labs-muted leading-relaxed mb-8">
              For cloud, enterprise applications, and AI programs at scale, visit{" "}
              <a
                href={MAIN_SITE_URL}
                className="text-labs-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                picoids.com
              </a>
              .
            </p>
            <Link href="/contact" className="btn-labs">
              Work with Labs
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
