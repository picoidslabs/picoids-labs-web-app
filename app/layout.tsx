import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import JsonLd from "./components/JsonLd";
import {
  localBusinessJsonLd,
  organizationJsonLd,
  rootMetadata,
  webSiteJsonLd,
} from "@/lib/seo";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${syne.variable} ${outfit.variable}`}>
      <body className="font-body labs-mesh grain antialiased">
        <JsonLd
          data={[organizationJsonLd(), localBusinessJsonLd(), webSiteJsonLd()]}
        />
        {children}
        <WhatsAppButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
