import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

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

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: "Picoids Labs — Web, Mobile & Digital for SMEs",
    template: "%s | Picoids Labs",
  },
  description:
    "Fixed, transparent pricing for micro and small businesses—websites, web applications, mobile apps, SEO, and digital marketing from Picoids Labs.",
  authors: [{ name: "Picoids Technology and Consulting Pvt. Ltd." }],
  openGraph: {
    title: "Picoids Labs",
    description:
      "Web, mobile, SEO, and digital marketing for micro & small businesses—transparent fixed pricing.",
    type: "website",
    url: siteUrl,
    siteName: "Picoids Labs",
    locale: "en_US",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`}>
      <body className="font-body labs-mesh grain antialiased">{children}</body>
    </html>
  );
}
