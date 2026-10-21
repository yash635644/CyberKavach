# 🛡️ Cyber Kavach

Free AI scam checker and cyber-fraud help platform for India — English & Hindi.
Live: https://cyber-kavach.vercel.app · Created by **Yash Trivedi**

## Features
- **AI Scam Scanner** — check SMS/WhatsApp text, links, or screenshots. Gemini AI + an offline Indian scam-pattern engine; if the AI quota runs out, the pattern engine still answers.
- **Scam Library** — 10 in-depth guides (digital arrest, UPI, KYC, job/task, investment, courier, electricity, sextortion, loan apps, fake customer care, lottery).
- **Got scammed? wizard** — situation-based recovery checklists.
- **Report Fraud guide** — step-by-step cybercrime.gov.in filing + verified official portals.
- **QR code scam checker** (decoded on-device), **complaint letter generator** (bank, police, RBI Ombudsman, telecom), **bank fraud help**, **scam alerts**, **glossary**.
- **Scam IQ quiz**, WhatsApp sharing, installable PWA, full Hindi site at `/hi`.

## Stack (₹0 to run)
| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, static generation), React 19, TypeScript |
| Styling | Tailwind CSS v4, CSS-only animations (respect `prefers-reduced-motion`) |
| AI | Google Gemini API free tier via REST (`gemini-flash-lite-latest` — fast, ~1 s — with `gemini-flash-latest` fallback; aliases auto-update) |
| Hosting | Vercel Hobby (free); all content pages are static & CDN-cached |
| Feedback | Formspree free plan |
| Database | None — nothing scanned is stored |

## SEO / AEO / GEO
- Per-page titles, descriptions, canonical + `hreflang` (en-IN / hi-IN / x-default)
- JSON-LD: Organization, WebSite, WebApplication, Article, FAQPage, HowTo, BreadcrumbList, Quiz
- `sitemap.xml`, `robots.txt` (AI crawlers explicitly allowed), `llms.txt`, `llms-full.txt`
- Answer-first "Quick answer" blocks (40–60 words) on every guide for AI/featured-snippet citation
- Generated Open Graph images for home and every scam guide

## Develop
```bash
npm install
cp .env.example .env.local   # add GEMINI_API_KEY
npm run dev
```

## Deploy (Vercel)
1. Push this folder to the GitHub repo connected to Vercel.
2. Vercel → Project → Settings → General → **Framework Preset: Next.js** (the old project used a static/Python setup).
3. Settings → Environment Variables: keep `GEMINI_API_KEY`. `SUPABASE_*` variables are no longer used and can be deleted.
4. Redeploy.

## Pre-deploy checklist (one time)
1. **Google Cloud / AI Studio:** make sure the project behind `GEMINI_API_KEY` has **no billing enabled** (free tier only) or a budget cap, and restrict the key to the "Generative Language API".
2. **Supabase (old site):** delete the `scam_logs` table / project — it holds messages saved by the old version. Remove `SUPABASE_*` env vars from Vercel.
3. **Old GitHub history:** scan for committed secrets (`npx gitleaks detect`) and rotate any key that appears.
4. **Vercel:** Settings → General → Framework Preset **Next.js**; Environment Variables: `GEMINI_API_KEY`, `NEXT_PUBLIC_CONTACT_EMAIL`.
5. **Formspree:** enable spam protection in the Formspree dashboard.

## After the first deploy
- **Vercel Firewall:** add a rate-limit rule for `/api/analyze` (e.g. 20 requests / minute per IP).
- Check share previews: Facebook Sharing Debugger, LinkedIn Post Inspector; Google Rich Results Test on a scam guide.
- Run PageSpeed Insights on the live URL.

## After every deploy (free SEO boosts)
- `npm run indexnow` — pings Bing/IndexNow with every sitemap URL (ChatGPT search and Copilot use Bing). The key file lives in `public/`.
- Google Search Console & Bing Webmaster Tools: submit `/sitemap.xml` once; put verification codes in the env vars from `.env.example`.

## Legal & trust checklist
- Never add the State Emblem or any government/bank logo (Emblems & Names Act 1950, State Emblem Act 2005).
- Keep the "not a government website" notice on /services, /report and /help.
- Set `NEXT_PUBLIC_CONTACT_EMAIL` so the Privacy Policy shows a grievance contact (DPDP Act 2023).
- Do not publish user-submitted "scammer" names/numbers without moderation (IT Rules 2021 intermediary duties, defamation risk).

## Sister projects
Cyber Kavach links to [Gathered](https://gathered.pages.dev) (cyber-news strip from its RSS feed, refreshed every 6 h) and [Throvic](https://throvic.pages.dev) (mind-map links on every scam guide and the UPSC page). The founder schema in `lib/seo.ts` uses the same `sameAs` profiles as the sister sites.

## Content updates
All content is in `lib/content/*.ts` (bilingual). Update `CONTENT_UPDATED` in `lib/content/scams.ts` after reviewing content — it feeds "Last reviewed" dates, the sitemap and structured data.
