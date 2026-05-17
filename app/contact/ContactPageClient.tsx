"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactForm from "../components/ContactForm";

export default function ContactPageClient() {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  const form = recaptchaKey ? (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <ContactForm useRecaptcha />
    </GoogleReCaptchaProvider>
  ) : (
    <ContactForm useRecaptcha={false} />
  );

  return (
    <div className="space-y-12">
      <div>{form}</div>

      <aside className="labs-card p-8 border-labs-border">
        <p className="labs-label mb-4">Direct</p>
        <ul className="space-y-3 text-labs-muted">
          <li>
            <a
              href="mailto:connect@picoids.com"
              className="hover:text-labs-accent transition-colors text-labs-fg"
            >
              connect@picoids.com
            </a>
          </li>
          <li>
            <a
              href="tel:+918955225869"
              className="hover:text-labs-accent transition-colors text-labs-fg"
            >
              +91 8955225869
            </a>
          </li>
          <li className="text-sm pt-2 leading-relaxed">
            Hanuman street, Jailwell
            <br />
            Bikaner, Rajasthan 334001
          </li>
        </ul>
        <p className="text-xs text-labs-subtle mt-6 uppercase tracking-wider">
          Mon–Sat · 9 AM–12 PM & 9 PM–12 AM IST
        </p>
      </aside>
    </div>
  );
}
