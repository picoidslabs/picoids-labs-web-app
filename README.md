# Picoids Labs Web App

Marketing site for [labs.picoids.com](https://labs.picoids.com)—web, mobile, SEO, and digital marketing for micro and small businesses in India.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 3
- Microsoft Graph API (contact form email)
- Google reCAPTCHA v3 (optional)

## Local development

```bash
cd picoids-labs-web-app
npm install
cp env.example .env.local
# Edit .env.local with your keys (contact form works without reCAPTCHA in dev if RECAPTCHA_SECRET_KEY is unset)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If the main Picoids site uses port 3000, run Labs on another port:

```bash
npm run dev -- -p 3001
```

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel (`labs.picoids.com`)

1. Push this folder to a GitHub repository (e.g. `picoids-labs-web-app`).
2. In [Vercel](https://vercel.com), create a **New Project** and import the repo.
3. Framework preset: **Next.js** (default).
4. Set environment variables from `env.example`:
   - `NEXT_PUBLIC_SITE_URL` = `https://labs.picoids.com`
   - Microsoft Graph + reCAPTCHA keys (same Azure/reCAPTCHA apps as picoids.com; add `labs.picoids.com` to reCAPTCHA domains).
5. Deploy, then open **Project → Settings → Domains** and add `labs.picoids.com`.
6. At your DNS provider for `picoids.com`, add the record Vercel shows (typically):
   - Type: `CNAME`
   - Name: `labs`
   - Value: `cname.vercel-dns.com`
7. Wait for SSL to provision, then verify the site loads.

## Main site integration

The enterprise site at `picoids.com` links to Labs in the header and redirects `/picoids-labs` to this subdomain.

## Pages

| Route       | Description                          |
| ----------- | ------------------------------------ |
| `/`         | Home — SME value prop & service preview |
| `/services` | Packages and starter pricing         |
| `/about`    | About Picoids Labs                   |
| `/contact`  | Lead form                            |

## License

Proprietary — Picoids Technology and Consulting Pvt. Ltd.
