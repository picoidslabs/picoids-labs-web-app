import type { Metadata } from "next";
import { absoluteUrl, getSiteUrl } from "./site";

/** NAP + geo — single source for metadata and JSON-LD */
export const LABS_BUSINESS = {
  name: "Picoids Labs",
  legalName: "Picoids Technology and Consulting Pvt. Ltd.",
  tagline: "Web, mobile, SEO & digital marketing for SMEs in Bikaner",
  email: "connect@picoids.com",
  phone: "+91 8955225869",
  phoneE164: "+918955225869",
  url: getSiteUrl(),
  parentUrl: "https://picoids.com",
  address: {
    streetAddress: "Hanuman street, Jailwell",
    addressLocality: "Bikaner",
    addressRegion: "Rajasthan",
    postalCode: "334001",
    addressCountry: "IN",
  },
  geo: {
    latitude: 28.0229,
    longitude: 73.3119,
  },
  hours: "Mo-Sa 09:00-12:00,21:00-24:00",
  priceRange: "₹₹",
  areaServed: ["Bikaner", "Rajasthan", "India"],
} as const;

export const BIKANER_KEYWORDS = [
  "web design Bikaner",
  "website development Bikaner",
  "web development company Bikaner",
  "SEO services Bikaner",
  "local SEO Bikaner",
  "digital marketing Bikaner",
  "mobile app development Bikaner",
  "website company Bikaner Rajasthan",
  "Picoids Labs",
  "SME digital agency Bikaner",
];

const DEFAULT_DESCRIPTION =
  "Picoids Labs — Bikaner-based digital studio for micro & small businesses. Websites, web apps, mobile apps, local SEO, and digital marketing at transparent fixed pricing.";

const OG_IMAGE = "/picoids-logo-with-name.svg";

type PageMetadataOptions = {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  keywords,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const allKeywords = [...BIKANER_KEYWORDS, ...(keywords ?? [])];

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: `${title} | Picoids Labs`,
      description,
      url,
      siteName: LABS_BUSINESS.name,
      locale: "en_IN",
      alternateLocale: "en_US",
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          alt: "Picoids Labs — Digital studio in Bikaner, Rajasthan",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Picoids Labs`,
      description,
      images: [OG_IMAGE],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(`${getSiteUrl()}/`),
  title: {
    default: "Picoids Labs — Web, Mobile & SEO in Bikaner, Rajasthan",
    template: "%s | Picoids Labs",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: BIKANER_KEYWORDS,
  authors: [{ name: LABS_BUSINESS.legalName }],
  creator: LABS_BUSINESS.legalName,
  publisher: LABS_BUSINESS.legalName,
  alternates: { canonical: getSiteUrl() },
  openGraph: {
    title: "Picoids Labs — Digital Studio in Bikaner",
    description: DEFAULT_DESCRIPTION,
    type: "website",
    url: getSiteUrl(),
    siteName: LABS_BUSINESS.name,
    locale: "en_IN",
    alternateLocale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        alt: "Picoids Labs — Digital studio in Bikaner, Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Picoids Labs — Web, Mobile & SEO in Bikaner",
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
  },
  robots: { index: true, follow: true },
};

export function localBusinessJsonLd() {
  const { address, geo, ...biz } = LABS_BUSINESS;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${biz.url}/#localbusiness`,
    name: biz.name,
    description: biz.tagline,
    url: biz.url,
    email: biz.email,
    telephone: biz.phoneE164,
    image: absoluteUrl(OG_IMAGE),
    priceRange: biz.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    areaServed: biz.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHours: biz.hours,
    parentOrganization: {
      "@type": "Organization",
      name: biz.legalName,
      url: biz.parentUrl,
    },
    sameAs: [biz.parentUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital services for SMEs",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web application development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile app development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & local search" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital marketing" } },
      ],
    },
  };
}

export function organizationJsonLd() {
  const { address, ...biz } = LABS_BUSINESS;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${biz.url}/#organization`,
    name: biz.legalName,
    alternateName: biz.name,
    url: biz.url,
    logo: absoluteUrl(OG_IMAGE),
    email: biz.email,
    telephone: biz.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    sameAs: [biz.parentUrl],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${LABS_BUSINESS.url}/#website`,
    name: LABS_BUSINESS.name,
    url: LABS_BUSINESS.url,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-IN",
    publisher: { "@id": `${LABS_BUSINESS.url}/#organization` },
  };
}

export function webPageJsonLd(path: string, title: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { "@id": `${LABS_BUSINESS.url}/#website` },
    about: { "@id": `${LABS_BUSINESS.url}/#localbusiness` },
    inLanguage: "en-IN",
  };
}
