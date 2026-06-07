/**
 * Canonical site origin for metadata, sitemap, and structured data.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://labs.picoids.com).
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://labs.picoids.com";
  return raw.replace(/\/+$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export const MAIN_SITE_URL = "https://picoids.com";

/** E.164 digits only — used for tel: and WhatsApp links */
export const LABS_PHONE_E164 = "918955225869";

export const LABS_WHATSAPP_URL = `https://wa.me/${LABS_PHONE_E164}`;
