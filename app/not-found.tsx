import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center section-pad">
        <div className="container-labs text-center max-w-lg mx-auto">
          <p className="font-display text-8xl font-bold text-watermark mb-6">404</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-labs-fg mb-4">
            Page not found
          </h1>
          <p className="text-labs-muted mb-10">
            This page does not exist. Head back home or tell us what you were looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-labs">
              Back home
            </Link>
            <Link href="/contact" className="btn-labs-ghost">
              Contact us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
