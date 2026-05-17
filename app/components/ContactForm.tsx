"use client";

import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { contactServiceOptions } from "@/lib/services";

type ContactFormProps = {
  /** When true, form requires Google reCAPTCHA v3 (provider must wrap this component). */
  useRecaptcha?: boolean;
};

export default function ContactForm({ useRecaptcha = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const recaptchaReady = !useRecaptcha || Boolean(executeRecaptcha);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (useRecaptcha && !executeRecaptcha) {
      setFormError(
        "Verification is still loading. Please wait a moment and try again."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      let recaptchaToken: string | undefined;
      if (useRecaptcha && executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("labs_contact_form");
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      let result: { error?: string; message?: string } = {};
      try {
        result = await response.json();
      } catch {
        if (!response.ok) {
          throw new Error("Server error. Please try again later.");
        }
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
      }, 4000);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "We could not send your message. Try again or email connect@picoids.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="labs-card p-10 text-center border-labs-accent/30">
        <p className="font-display text-6xl font-bold text-gradient-gold mb-4" aria-hidden>
          ✓
        </p>
        <h3 className="font-display text-2xl font-bold text-labs-fg mb-2">
          Message sent
        </h3>
        <p className="text-labs-muted">
          We will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {formError ? (
        <div
          role="alert"
          className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {formError}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="labs-label">
            Full name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="labs-input"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="labs-label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="labs-input"
            placeholder="you@business.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="labs-label">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            className="labs-input"
            placeholder="+91"
          />
        </div>
        <div>
          <label htmlFor="company" className="labs-label">
            Business name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            autoComplete="organization"
            className="labs-input"
            placeholder="Your shop or company"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="labs-label">
          Service
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="labs-input labs-select"
        >
          <option value="">Select a service</option>
          {contactServiceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="labs-label">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="labs-input resize-y min-h-[140px]"
          placeholder="Tell us about your business and what you need..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !recaptchaReady}
        className="btn-labs disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting
          ? "Sending…"
          : useRecaptcha && !recaptchaReady
            ? "Loading verification…"
            : "Send message"}
      </button>
    </form>
  );
}
