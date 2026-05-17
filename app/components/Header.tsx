"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MAIN_SITE_URL } from "@/lib/site";
import type { PriceRegionId } from "@/lib/currency";
import CurrencySelector from "./CurrencySelector";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

type HeaderProps = {
  currentRegionId: PriceRegionId;
};

export default function Header({ currentRegionId }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="nav-glass relative z-50">
      <div className="container-labs flex items-center justify-between h-[4.5rem]">
        <Link
          href="/"
          className="group flex items-center gap-3 shrink-0 min-w-0"
          aria-label="Picoids Labs home"
        >
          <div className="relative w-11 h-11 md:w-12 md:h-12 shrink-0">
            <Image
              src="/picoids-logo-without-name.svg"
              alt="Picoids Labs"
              width={48}
              height={48}
              className="w-full h-full object-contain transition-opacity group-hover:opacity-90"
              priority
            />
          </div>
          <div className="flex flex-col leading-none min-w-0">
            <span className="font-display text-lg font-bold tracking-tight text-labs-fg group-hover:text-labs-accent transition-colors">
              Picoids Labs
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-labs-subtle mt-1">
              SME digital studio
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm uppercase tracking-[0.12em] transition-colors ${
                isActive(item.href)
                  ? "text-labs-accent"
                  : "text-labs-muted hover:text-labs-fg"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <CurrencySelector currentRegionId={currentRegionId} />
          <a
            href={MAIN_SITE_URL}
            className="text-xs uppercase tracking-[0.12em] text-labs-subtle hover:text-labs-fg transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Enterprise →
          </a>
          <Link href="/contact" className="btn-labs text-xs py-2.5 px-5">
            Quote
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-0.5 w-6 bg-labs-fg transition-all duration-300 origin-center ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-labs-fg transition-all duration-300 ${
              isMenuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-labs-fg transition-all duration-300 origin-center ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 top-[4.5rem] z-[60] bg-labs-bg/98 backdrop-blur-2xl transition-all duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="container-labs pt-12 flex flex-col gap-8">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`font-display text-4xl font-bold tracking-tight transition-colors ${
                isActive(item.href) ? "text-gradient-gold" : "text-labs-fg"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item.name}
            </Link>
          ))}
          <CurrencySelector currentRegionId={currentRegionId} className="mt-2" />
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="btn-labs w-fit mt-4"
          >
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
