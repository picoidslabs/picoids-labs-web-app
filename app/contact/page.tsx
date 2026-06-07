import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import ContactPageClient from "./ContactPageClient";
import JsonLd from "../components/JsonLd";
import { buildPageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = "Contact Picoids Labs — Bikaner, Rajasthan";
const PAGE_DESCRIPTION =
  "Get a free quote for website development, mobile apps, local SEO, or digital marketing. Visit our Bikaner studio or reach us at connect@picoids.com.";

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={webPageJsonLd("/contact", PAGE_TITLE, PAGE_DESCRIPTION)} />
      <SiteHeader />
      <main className="flex-1 section-pad">
        <div className="container-labs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <header className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.35em] text-labs-accent mb-6">
                Contact
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-labs-fg leading-[0.95] mb-6">
                Let&apos;s build your next chapter
              </h1>
              <p className="text-lg text-labs-muted leading-relaxed">
                Share your goals—we typically respond within one business day. Based in Bikaner,
                Rajasthan, serving local businesses and clients worldwide.
              </p>
            </header>
            <div className="lg:col-span-7">
              <ContactPageClient />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
