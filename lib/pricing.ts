import type { ServiceGlyphId } from "./services";

export type PricingAddon = {
  id: string;
  name: string;
  description: string;
  priceInr: number;
};

export type PricingLineItem = {
  description: string;
  amountInr: number;
};

export type ProformaInvoice = {
  invoiceNo: string;
  issuedLabel: string;
  clientName: string;
  clientLocation: string;
  projectTitle: string;
  lineItems: PricingLineItem[];
  addonLineItems?: PricingLineItem[];
  paymentTerms: string;
  notes: string[];
};

export type ServicePricing = {
  serviceId: ServiceGlyphId;
  packageName: string;
  basePriceInr: number;
  billingType: "one-time" | "monthly";
  baseIncludes: PricingLineItem[];
  deliverables: string[];
  addons: PricingAddon[];
  proforma: ProformaInvoice;
};

export const LABS_BILLING = {
  legalName: "Picoids Technology and Consulting Pvt. Ltd.",
  brand: "Picoids Labs",
  gstin: "GSTIN on request",
  address: "Hanuman street, Jailwell, Bikaner, Rajasthan 334001",
  email: "connect@picoids.com",
  phone: "+91 8955225869",
};

export { formatInr, formatScaledInr, formatPackagePrice, formatMoney } from "./currency";

export function sumLineItems(items: PricingLineItem[]): number {
  return items.reduce((sum, item) => sum + item.amountInr, 0);
}

export const servicePricing: ServicePricing[] = [
  {
    serviceId: "web",
    packageName: "Starter website",
    basePriceInr: 15_000,
    billingType: "one-time",
    baseIncludes: [
      { description: "Discovery call & sitemap (up to 5 pages)", amountInr: 2_000 },
      { description: "Mobile-first UI design (1 revision round)", amountInr: 4_500 },
      { description: "Next.js development & responsive layout", amountInr: 5_000 },
      { description: "Contact form with email notifications", amountInr: 1_500 },
      { description: "Basic on-page SEO (titles, meta, sitemap)", amountInr: 1_000 },
      { description: "Deployment (Vercel) + ongoing bug fixes (always available)", amountInr: 1_000 },
    ],
    deliverables: [
      "Up to 5 pages (Home, About, Services, Contact, +1)",
      "Your branding, colours, and logo",
      "Google-friendly structure",
      "Bug fixes for delivered scope—always available (new features quoted separately)",
      "Handoff notes for simple text edits",
    ],
    addons: [
      { id: "extra-page", name: "Extra page", description: "Each additional static page", priceInr: 2_500 },
      { id: "blog", name: "Blog / news section", description: "Listing + article template", priceInr: 8_000 },
      { id: "whatsapp", name: "WhatsApp chat button", description: "Floating CTA with your number", priceInr: 1_500 },
      { id: "content", name: "Content writing", description: "Copy for up to 5 pages", priceInr: 5_000 },
      { id: "hindi", name: "Hindi / bilingual", description: "Second language toggle", priceInr: 12_000 },
      { id: "analytics", name: "Analytics setup", description: "Google Analytics 4 + Search Console", priceInr: 3_000 },
    ],
    proforma: {
      invoiceNo: "PL-2026-WEB-0142",
      issuedLabel: "15 May 2026",
      clientName: "Rajasthan Handicrafts Co.",
      clientLocation: "Jaipur, Rajasthan",
      projectTitle: "Starter business website (5 pages)",
      lineItems: [
        { description: "Discovery call & sitemap (up to 5 pages)", amountInr: 2_000 },
        { description: "Mobile-first UI design (1 revision round)", amountInr: 4_500 },
        { description: "Next.js development & responsive layout", amountInr: 5_000 },
        { description: "Contact form with email notifications", amountInr: 1_500 },
        { description: "Basic on-page SEO (titles, meta, sitemap)", amountInr: 1_000 },
        { description: "Deployment (Vercel) + ongoing bug fixes (always available)", amountInr: 1_000 },
      ],
      addonLineItems: [
        { description: "Add-on: Extra page × 2", amountInr: 5_000 },
        { description: "Add-on: Google Analytics 4 + Search Console", amountInr: 3_000 },
      ],
      paymentTerms: "40% on acceptance · 40% on design approval · 20% on go-live",
      notes: [
        "Amounts in INR. GST @ 18% extra if applicable.",
        "Client provides logo, photos, and page content unless content add-on is selected.",
        "Hosting/domain third-party costs billed separately at actuals.",
      ],
    },
  },
  {
    serviceId: "webapp",
    packageName: "E-commerce web application (standard)",
    basePriceInr: 245_000,
    billingType: "one-time",
    baseIncludes: [
      { description: "Discovery, IA & UI (storefront + admin)", amountInr: 28_000 },
      { description: "Storefront: home, catalog, filters, product pages", amountInr: 42_000 },
      { description: "Authentication (email + Google) & customer accounts", amountInr: 26_000 },
      { description: "Cart, checkout & COD order engine", amountInr: 48_000 },
      { description: "Admin panel (products, orders, users, settings)", amountInr: 58_000 },
      { description: "Cloudinary product image pipeline", amountInr: 14_000 },
      { description: "Verified-purchase reviews & ratings", amountInr: 12_000 },
      { description: "PostgreSQL, Prisma schema & server actions", amountInr: 22_000 },
      { description: "Deployment, SSL, env setup & basic SEO meta", amountInr: 12_000 },
      { description: "QA, admin training & ongoing bug fixes (always available)", amountInr: 18_000 },
      { description: "SME bundle adjustment", amountInr: -35_000 },
    ],
    deliverables: [
      "Customer storefront with search, filters & cart",
      "Multi-step checkout with cash-on-delivery",
      "Admin dashboard for products, orders & charges",
      "Product images via Cloudinary",
      "Bug fixes for delivered scope—always available (new features quoted separately)",
      "Reference build: snack-shop e-commerce (e.g. shwetafoods.in scope)",
    ],
    addons: [
      {
        id: "razorpay",
        name: "Razorpay / Stripe (live)",
        description: "Online payments, webhooks & pay flow",
        priceInr: 40_000,
      },
      {
        id: "email-orders",
        name: "Order email notifications",
        description: "Customer + admin emails on new orders",
        priceInr: 15_000,
      },
      {
        id: "sms",
        name: "SMS / WhatsApp order updates",
        description: "Transactional messages via provider API",
        priceInr: 20_000,
      },
      {
        id: "inventory",
        name: "Advanced inventory",
        description: "Low-stock alerts, variants, bulk import",
        priceInr: 25_000,
      },
      {
        id: "maintenance",
        name: "Monthly maintenance",
        description: "New features & enhancements (bug fixes already always included)",
        priceInr: 12_000,
      },
    ],
    proforma: {
      invoiceNo: "PL-2026-APP-0087",
      issuedLabel: "15 May 2026",
      clientName: "Shweta Foods",
      clientLocation: "Bikaner, Rajasthan",
      projectTitle: "E-commerce web application (COD) — shwetafoods.in scope",
      lineItems: [
        { description: "Discovery, IA & UI (storefront + admin)", amountInr: 28_000 },
        { description: "Storefront: home, catalog, filters, product pages", amountInr: 42_000 },
        { description: "Authentication (email + Google) & customer accounts", amountInr: 26_000 },
        { description: "Cart, checkout & COD order engine", amountInr: 48_000 },
        { description: "Admin panel (products, orders, users, settings)", amountInr: 58_000 },
        { description: "Cloudinary product image pipeline", amountInr: 14_000 },
        { description: "Verified-purchase reviews & ratings", amountInr: 12_000 },
        { description: "PostgreSQL, Prisma schema & server actions", amountInr: 22_000 },
        { description: "Deployment, SSL, env setup & basic SEO meta", amountInr: 12_000 },
        { description: "QA, admin training & ongoing bug fixes (always available)", amountInr: 18_000 },
        { description: "SME bundle adjustment", amountInr: -35_000 },
      ],
      addonLineItems: [
        { description: "Add-on: Razorpay / Stripe (live payments)", amountInr: 40_000 },
        { description: "Add-on: Order email notifications", amountInr: 15_000 },
      ],
      paymentTerms: "40% on acceptance · 40% on UAT sign-off · 20% on go-live",
      notes: [
        "Amounts in INR. GST @ 18% extra if applicable.",
        "Bug fixes for delivered scope are always available; new features or scope changes are quoted separately.",
        "Database (Postgres), hosting (Vercel), and Cloudinary billed at client account where possible.",
        "Payment gateway merchant fees paid directly to Razorpay/Stripe.",
      ],
    },
  },
  {
    serviceId: "mobile",
    packageName: "Starter mobile app",
    basePriceInr: 45_000,
    billingType: "one-time",
    baseIncludes: [
      { description: "Discovery & screen flows (up to 8 screens)", amountInr: 5_000 },
      { description: "UI design (1 revision round)", amountInr: 8_000 },
      { description: "Cross-platform app (React Native / Expo)", amountInr: 22_000 },
      { description: "API integration with your website or backend", amountInr: 6_000 },
      { description: "App store listing assets & submission guidance", amountInr: 2_000 },
      { description: "QA on 2 devices + ongoing bug fixes (always available)", amountInr: 2_000 },
    ],
    deliverables: [
      "Android build (Play Store ready)",
      "Up to 8 core screens",
      "Auth or guest flow as scoped",
      "Bug fixes for delivered scope—always available (new features quoted separately)",
      "Push notification scaffold (provider setup extra)",
    ],
    addons: [
      { id: "ios", name: "iOS build & App Store", description: "Apple developer setup + submission", priceInr: 15_000 },
      { id: "push", name: "Push notifications (live)", description: "FCM/APNs integration", priceInr: 12_000 },
      { id: "offline", name: "Offline mode", description: "Cached data for poor connectivity", priceInr: 18_000 },
      { id: "screens", name: "Extra screens", description: "Per screen beyond package", priceInr: 3_500 },
      { id: "maint-mobile", name: "Monthly maintenance", description: "OS updates & small fixes", priceInr: 10_000 },
    ],
    proforma: {
      invoiceNo: "PL-2026-MOB-0031",
      issuedLabel: "15 May 2026",
      clientName: "City Clinic Bikaner",
      clientLocation: "Bikaner, Rajasthan",
      projectTitle: "Patient appointment app (Android, 8 screens)",
      lineItems: [
        { description: "Discovery & screen flows (up to 8 screens)", amountInr: 5_000 },
        { description: "UI design (1 revision round)", amountInr: 8_000 },
        { description: "Cross-platform app (React Native / Expo)", amountInr: 22_000 },
        { description: "API integration with your website or backend", amountInr: 6_000 },
        { description: "App store listing assets & submission guidance", amountInr: 2_000 },
        { description: "QA on 2 devices + ongoing bug fixes (always available)", amountInr: 2_000 },
      ],
      addonLineItems: [{ description: "Add-on: iOS build & App Store", amountInr: 15_000 }],
      paymentTerms: "50% on acceptance · 50% on store approval",
      notes: [
        "Amounts in INR. GST @ 18% extra if applicable.",
        "Google Play / Apple developer account fees paid by client.",
        "Backend/API must exist or be scoped as a separate web app package.",
      ],
    },
  },
  {
    serviceId: "seo",
    packageName: "SEO & local search (monthly)",
    basePriceInr: 8_000,
    billingType: "monthly",
    baseIncludes: [
      { description: "Google Business Profile optimisation", amountInr: 2_000 },
      { description: "On-page SEO (up to 10 pages / month)", amountInr: 2_500 },
      { description: "Keyword tracking & local rank check", amountInr: 1_500 },
      { description: "Monthly performance report (PDF)", amountInr: 1_000 },
      { description: "2 hours consultancy / Q&A", amountInr: 1_000 },
    ],
    deliverables: [
      "Monthly report with actions taken",
      "GBP posts & category/attribute tune-ups",
      "Title/meta improvements on agreed pages",
      "Recommendations for content you publish",
    ],
    addons: [
      { id: "blog-seo", name: "Blog articles", description: "2 SEO articles per month", priceInr: 6_000 },
      { id: "citations", name: "Local citations", description: "Directory listings setup", priceInr: 5_000 },
      { id: "technical", name: "Technical SEO audit", description: "One-time deep site audit", priceInr: 12_000 },
      { id: "competitor", name: "Competitor tracking", description: "3 competitors monitored", priceInr: 3_000 },
    ],
    proforma: {
      invoiceNo: "PL-2026-SEO-0601",
      issuedLabel: "1 May 2026",
      clientName: "Bikaner Sweets & Namkeen",
      clientLocation: "Bikaner, Rajasthan",
      projectTitle: "SEO & local search — May 2026 retainer",
      lineItems: [
        { description: "Google Business Profile optimisation", amountInr: 2_000 },
        { description: "On-page SEO (up to 10 pages)", amountInr: 2_500 },
        { description: "Keyword tracking & local rank check", amountInr: 1_500 },
        { description: "Monthly performance report", amountInr: 1_000 },
        { description: "Consultancy (2 hours)", amountInr: 1_000 },
      ],
      addonLineItems: [{ description: "Add-on: 2 SEO blog articles", amountInr: 6_000 }],
      paymentTerms: "100% payable in advance each month",
      notes: [
        "Recurring monthly invoice. Minimum 3-month commitment recommended.",
        "GST @ 18% extra if applicable.",
        "Ad spend on Google Ads not included.",
      ],
    },
  },
  {
    serviceId: "marketing",
    packageName: "Digital marketing (monthly)",
    basePriceInr: 12_000,
    billingType: "monthly",
    baseIncludes: [
      { description: "Social channel setup & brand templates", amountInr: 2_500 },
      { description: "8 posts / month (design + caption)", amountInr: 4_000 },
      { description: "Meta or Google Ads campaign setup", amountInr: 2_500 },
      { description: "Ads monitoring & weekly tweaks", amountInr: 2_000 },
      { description: "Monthly results summary", amountInr: 1_000 },
    ],
    deliverables: [
      "Content calendar agreed each month",
      "Static/post creatives in your brand colours",
      "One active paid campaign (budget separate)",
      "Clear list of what ran and what we learned",
    ],
    addons: [
      { id: "extra-posts", name: "Extra posts", description: "4 additional posts per month", priceInr: 4_000 },
      { id: "video", name: "Short video reels", description: "2 edited reels per month", priceInr: 8_000 },
      { id: "influencer", name: "Influencer outreach", description: "Local micro-influencer coordination", priceInr: 6_000 },
      { id: "landing", name: "Campaign landing page", description: "One focused landing page", priceInr: 10_000 },
    ],
    proforma: {
      invoiceNo: "PL-2026-MKT-0601",
      issuedLabel: "1 May 2026",
      clientName: "Desert Bloom Salon",
      clientLocation: "Bikaner, Rajasthan",
      projectTitle: "Digital marketing — May 2026 retainer",
      lineItems: [
        { description: "Social channel setup & brand templates", amountInr: 2_500 },
        { description: "8 posts / month (design + caption)", amountInr: 4_000 },
        { description: "Meta Ads campaign setup", amountInr: 2_500 },
        { description: "Ads monitoring & weekly tweaks", amountInr: 2_000 },
        { description: "Monthly results summary", amountInr: 1_000 },
      ],
      addonLineItems: [{ description: "Add-on: 4 extra posts", amountInr: 4_000 }],
      paymentTerms: "100% payable in advance each month",
      notes: [
        "Ad spend (Meta/Google) paid directly by client to the platform.",
        "GST @ 18% extra if applicable.",
        "Creative assets remain usable by client after engagement.",
      ],
    },
  },
];

export type StarterPackage = {
  packageName: string;
  description: string;
  basePriceInr: number;
  billingType: "one-time";
  baseIncludes: PricingLineItem[];
  deliverables: string[];
  notIncluded: string[];
  addons: PricingAddon[];
  proforma: ProformaInvoice;
};

/** Starter web-app tier — portals, bookings, simple CRUD (not full e-commerce). */
export const webAppStarterTier: StarterPackage = {
  packageName: "Starter web application",
  description:
    "For businesses that need more than a brochure site but not yet a full online store. You get a secure web app with up to eight screens, your own database, and an admin panel—ideal for appointment enquiries, lead capture, internal dashboards, or managing one type of record (clients, bookings, inventory logs). Your team can update data without a developer; Picoids fixes defects in what we delivered, always. Cart, checkout, and product catalogues are part of the e-commerce tier below.",
  basePriceInr: 75_000,
  billingType: "one-time",
  baseIncludes: [
    { description: "Discovery, user flows & wireframes (up to 8 screens)", amountInr: 6_000 },
    { description: "UI design aligned to your brand (1 revision round)", amountInr: 10_000 },
    { description: "Next.js app — responsive public + logged-in views", amountInr: 18_000 },
    { description: "Sign-in (email & password) with secure sessions", amountInr: 12_000 },
    { description: "PostgreSQL database & Prisma data models", amountInr: 9_000 },
    { description: "Admin panel — create, edit, list one record type", amountInr: 14_000 },
    {
      description: "Deployment (Vercel), SSL & ongoing bug fixes (always available)",
      amountInr: 6_000,
    },
  ],
  deliverables: [
    "Up to 8 screens (e.g. home, list, detail, form, account, admin)",
    "One primary workflow (bookings, enquiries, inventory log, etc.)",
    "Role-based access: public visitors + admin (2 roles)",
    "Admin to add, edit, and deactivate records without code",
    "Mobile-friendly UI and handoff notes for your team",
    "Bug fixes for delivered scope—always available (new features quoted separately)",
    "You own the codebase and database",
  ],
  notIncluded: [
    "Online store, shopping cart, or checkout",
    "Payment gateway (Razorpay / Stripe)",
    "Product catalogue with filters (see e-commerce package below)",
    "Customer reviews, deals, or multi-step COD flows",
  ],
  addons: [
    {
      id: "google-auth",
      name: "Google sign-in",
      description: "OAuth login alongside email & password",
      priceInr: 8_000,
    },
    {
      id: "extra-module",
      name: "Extra admin module",
      description: "Second record type with its own CRUD screens",
      priceInr: 15_000,
    },
    {
      id: "email-notify",
      name: "Email notifications",
      description: "Auto emails on form submit or status change",
      priceInr: 10_000,
    },
    {
      id: "file-upload",
      name: "File / image uploads",
      description: "Cloud storage for documents or photos",
      priceInr: 12_000,
    },
    {
      id: "upgrade-ecom",
      name: "Upgrade to e-commerce",
      description: "Cart, checkout & store features (priced on top of starter)",
      priceInr: 170_000,
    },
  ],
  proforma: {
    invoiceNo: "PL-2026-APP-0204",
    issuedLabel: "15 May 2026",
    clientName: "City Clinic Bikaner",
    clientLocation: "Bikaner, Rajasthan",
    projectTitle: "Starter web app — appointment enquiry portal (8 screens)",
    lineItems: [
      { description: "Discovery, user flows & wireframes (up to 8 screens)", amountInr: 6_000 },
      { description: "UI design aligned to your brand (1 revision round)", amountInr: 10_000 },
      { description: "Next.js app — responsive public + logged-in views", amountInr: 18_000 },
      { description: "Sign-in (email & password) with secure sessions", amountInr: 12_000 },
      { description: "PostgreSQL database & Prisma data models", amountInr: 9_000 },
      { description: "Admin panel — create, edit, list one record type", amountInr: 14_000 },
      {
        description: "Deployment (Vercel), SSL & ongoing bug fixes (always available)",
        amountInr: 6_000,
      },
    ],
    addonLineItems: [
      { description: "Add-on: Google sign-in", amountInr: 8_000 },
      { description: "Add-on: Email notifications", amountInr: 10_000 },
    ],
    paymentTerms: "50% on acceptance · 50% on go-live",
    notes: [
      "Amounts in INR. GST @ 18% extra if applicable.",
      "Bug fixes for delivered scope are always available; new features or scope changes are quoted separately.",
      "Scope limited to one primary workflow; e-commerce requires the standard package below.",
      "Hosting and database costs at client/third-party rates where applicable.",
    ],
  },
};

export function getPricingByServiceId(id: ServiceGlyphId): ServicePricing | undefined {
  return servicePricing.find((p) => p.serviceId === id);
}

export type ComparisonRow = {
  label: string;
  custom: string;
  shopify: string;
};

export type ScaleScenario = {
  id: string;
  label: string;
  ordersPerMonth: number;
  gmvInr: number;
  customMonthlyInr: number;
  shopifyMonthlyInr: number;
  customBreakdown: string[];
  shopifyBreakdown: string[];
  note: string;
};

export const shopifyVsCustom = {
  customBuildInr: 245_000,
  customHostingMonthlyInr: 1_500,
  shopifySetupInr: 80_000,
  shopifyMonthlyInr: 6_500,
  comparisonRows: [
    {
      label: "Upfront cost",
      custom: "₹2,45,000 one-time (e-commerce standard)",
      shopify: "₹30,000–1,20,000 setup + theme (agency-assisted)",
    },
    {
      label: "Monthly platform cost",
      custom: "~₹0–3,000 hosting (Vercel, DB, media)",
      shopify: "₹4,000–10,000+ plan + paid apps",
    },
    {
      label: "Ownership",
      custom: "You own code & database",
      shopify: "Rent the platform; migrate later is costly",
    },
    {
      label: "COD & India checkout",
      custom: "Built for your workflow",
      shopify: "Apps + configuration",
    },
    {
      label: "Verified reviews",
      custom: "Included in base build",
      shopify: "Paid app (~₹1,500–4,000/mo)",
    },
    {
      label: "Admin panel",
      custom: "Products, orders, users, tax/shipping",
      shopify: "Shopify admin (excellent, generic)",
    },
    {
      label: "Time to launch",
      custom: "Weeks to months (custom build)",
      shopify: "Days to weeks (template + DIY)",
    },
    {
      label: "Payment gateway fees",
      custom: "~2% on online orders (Razorpay etc.)",
      shopify: "Same gateway + possible Shopify transaction fee",
    },
    {
      label: "Bug fixes after launch",
      custom: "Always available for delivered scope",
      shopify: "Platform updates; store changes often need apps or agency",
    },
    {
      label: "Cost as sales grow",
      custom: "Hosting & DB scale gradually—no % of GMV to platform",
      shopify: "Plan upgrades, apps & transaction fees rise with volume",
    },
  ] satisfies ComparisonRow[],
  scaleIntro:
    "Monthly run-cost once the store is live (illustrative). Assumes ~₹500 average order, ~30% orders paid online at ~2% gateway fee. COD-heavy shops pay less in gateway fees; high online-card volume increases both paths slightly.",
  scaleScenarios: [
    {
      id: "starter",
      label: "Starting out (~100 orders / month)",
      ordersPerMonth: 100,
      gmvInr: 50_000,
      customMonthlyInr: 2_000,
      shopifyMonthlyInr: 6_500,
      customBreakdown: [
        "Vercel hobby / low tier ~₹0–1,000",
        "Managed Postgres ~₹500–1,000",
        "Cloudinary / email ~₹500",
      ],
      shopifyBreakdown: [
        "Shopify Basic plan ~₹3,300",
        "Apps (reviews, COD helpers) ~₹2,000",
        "Minimal transaction fees at this volume",
      ],
      note: "Shopify cheaper to start; custom wins on ownership from day one.",
    },
    {
      id: "growing",
      label: "Growing (~500 orders / month)",
      ordersPerMonth: 500,
      gmvInr: 250_000,
      customMonthlyInr: 5_500,
      shopifyMonthlyInr: 12_000,
      customBreakdown: [
        "Vercel Pro ~₹1,700",
        "Postgres ~₹2,500",
        "Cloudinary ~₹1,500",
        "Gateway ~₹750 (30% online × 2%)",
      ],
      shopifyBreakdown: [
        "Shopify Grow ~₹8,700",
        "Apps ~₹2,500",
        "Gateway + Shopify txn fee ~₹800+",
      ],
      note: "Run-cost gap widens—roughly ₹6,500/mo more on Shopify.",
    },
    {
      id: "scale",
      label: "At scale (~1,500 orders / month)",
      ordersPerMonth: 1_500,
      gmvInr: 750_000,
      customMonthlyInr: 11_000,
      shopifyMonthlyInr: 24_000,
      customBreakdown: [
        "Vercel + DB ~₹8,000",
        "Cloudinary / bandwidth ~₹2,500",
        "Gateway ~₹4,500 (scales with online sales)",
      ],
      shopifyBreakdown: [
        "Shopify Advanced or Grow + overages ~₹16,000+",
        "Apps & integrations ~₹3,500",
        "Gateway + platform transaction fees ~₹4,500+",
      ],
      note: "At scale, custom run-cost often ~half of Shopify—≈₹1.5L+ saved per year on ops alone.",
    },
    {
      id: "high",
      label: "High volume (~3,000 orders / month)",
      ordersPerMonth: 3_000,
      gmvInr: 1_500_000,
      customMonthlyInr: 18_000,
      shopifyMonthlyInr: 42_000,
      customBreakdown: [
        "Production infra ~₹12,000",
        "Media CDN ~₹4,000",
        "Gateway ~₹9,000",
      ],
      shopifyBreakdown: [
        "Advanced plan ~₹33,000",
        "Apps & automation ~₹5,000",
        "Fees on ~₹4.5L online GMV ~₹4,000+",
      ],
      note: "Shopify’s % and plan tiers compound; custom infra does not tax your GMV.",
    },
  ] satisfies ScaleScenario[],
  tcoExamples: [
    {
      title: "Year 1",
      custom: 245_000 + 1_500 * 12,
      shopify: 80_000 + 6_500 * 12,
      note: "Custom higher upfront; Shopify lower if DIY setup",
    },
    {
      title: "3 years (no Picoids maintenance)",
      custom: 245_000 + 1_500 * 36,
      shopify: 80_000 + 6_500 * 36,
      note: "Often similar or lower TCO on custom—no monthly platform rent",
    },
  ],
  chooseCustom: [
    "You want your own brand experience—not a template storefront",
    "COD-first sales and a simple admin your team understands",
    "You plan to keep the store 2+ years and avoid recurring platform fees",
    "You may need custom features later (loyalty, B2B, regional pricing)",
  ],
  chooseShopify: [
    "You need to launch in days with a standard catalog",
    "You prefer all-in-one hosting and app marketplace",
    "Budget is tight in year one and DIY setup is realistic",
  ],
  caveats: [
    "Shopify figures are illustrative (Basic/Grow/Advanced plan + apps + agency setup). Actual costs vary.",
    "Picoids bug fixes for delivered scope are always available; optional maintenance (₹12,000/mo) covers new features.",
    "Scale table excludes one-time build cost; gateway fees apply to both paths on online payments.",
    "Ad spend, accounting, and product photography are separate on either path.",
  ],
};
