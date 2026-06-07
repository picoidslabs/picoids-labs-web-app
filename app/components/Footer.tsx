import Link from "next/link";
import Image from "next/image";
import { MAIN_SITE_URL } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-labs-border bg-labs-bg-elevated">
      <div className="container-labs py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src="/picoids-logo-without-name.svg"
                  alt="Picoids Labs"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold tracking-tight text-labs-fg group-hover:text-labs-accent transition-colors">
                  Picoids Labs
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-labs-subtle mt-1">
                  SME digital studio
                </span>
              </div>
            </Link>
            <p className="text-labs-muted text-sm leading-relaxed max-w-sm mb-6">
              Web, mobile, SEO, and digital marketing for micro & small businesses—transparent
              fixed pricing, delivered worldwide from our studio in Bikaner, India.
            </p>
            <a
              href={MAIN_SITE_URL}
              className="text-xs uppercase tracking-[0.15em] text-labs-subtle hover:text-labs-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enterprise consulting at picoids.com →
            </a>
          </div>

          <div className="lg:col-span-3">
            <p className="labs-label mb-4">Navigate</p>
            <ul className="space-y-3">
              {[
                { label: "Services", href: "/services" },
                { label: "Pricing", href: "/pricing" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-labs-muted hover:text-labs-fg transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="labs-label mb-4">Reach us</p>
            <ul className="space-y-2 text-labs-muted text-sm">
              <li>
                <a
                  href="mailto:connect@picoids.com"
                  className="hover:text-labs-accent transition-colors"
                >
                  connect@picoids.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918955225869"
                  className="hover:text-labs-accent transition-colors"
                >
                  +91 8955225869
                </a>
              </li>
              <li className="pt-2 leading-relaxed">
                <address className="not-italic">
                  Hanuman street, Jailwell
                  <br />
                  Bikaner, Rajasthan 334001
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-labs-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-labs-subtle uppercase tracking-wider">
          <p>© {year} Picoids Technology and Consulting Pvt. Ltd.</p>
          <p>labs.picoids.com</p>
        </div>
      </div>
    </footer>
  );
}
