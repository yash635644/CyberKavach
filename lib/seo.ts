import type { Metadata } from "next";
import { ogKeyForPath } from "./og-content";
import { SITE_NAME, SITE_URL, CREATOR, CREATOR_LINKS, CONTACT_EMAIL, SISTER_SITES, absoluteUrl, localePath, type Locale } from "./site";

type MetaInput = {
  lang: Locale;
  path: string; // locale-neutral path, e.g. "/scams/upi-fraud"
  title: string;
  description: string;
  ogImage?: string; // absolute or root-relative
  type?: "website" | "article";
  hasHindi?: boolean;
  noindex?: boolean;
  absoluteTitle?: boolean; // skip the "| Cyber Kavach" template (title already contains the brand)
};

const BRAND_SUFFIX_LEN = " | Cyber Kavach".length;

export function clampDescription(d: string, max = 158): string {
  if (d.length <= max) return d;
  const cut = d.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\-–—]$/, "")}…`;
}

export function buildMetadata({ lang, path, title, description, ogImage, type = "website", hasHindi = true, noindex, absoluteTitle }: MetaInput): Metadata {
  const url = localePath(lang, path);
  // Keep snippets within what Google shows (~60-char titles, ~160-char descriptions)
  description = clampDescription(description);
  const useAbsolute = absoluteTitle || title.length + BRAND_SUFFIX_LEN > 62;
  // Page-specific share card (WhatsApp / LinkedIn / X) — rendered at build time
  const image = ogImage ?? `/og/${lang}/${ogKeyForPath(path)}`;
  const languages: Record<string, string> = { "en-IN": localePath("en", path), "x-default": localePath("en", path) };
  if (hasHindi) languages["hi-IN"] = localePath("hi", path);

  return {
    metadataBase: new URL(SITE_URL),
    title: useAbsolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: lang === "hi" ? "hi_IN" : "en_IN",
      alternateLocale: lang === "hi" ? ["en_IN"] : ["hi_IN"],
      images: [{ url: image, width: 1200, height: 630, alt: title, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: title, width: 1200, height: 630 }],
    },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  };
}

/* ---------- JSON-LD builders (schema.org) ---------- */

export const orgId = `${SITE_URL}/#organization`;
export const siteId = `${SITE_URL}/#website`;

export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: SITE_NAME,
    alternateName: ["CyberKavach", "Cyber Kavach AI", "साइबर कवच"],
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: absoluteUrl("/icon-512.png"), width: 512, height: 512 },
    image: absoluteUrl("/og/en/home"),
    founder: { "@id": personId },
    description: "Free AI-powered scam detection and cyber-fraud help platform for India. An independent public-awareness project — not a government website.",
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: ["Cyber fraud", "Phishing", "UPI fraud", "Digital arrest scam", "Online scams in India", "Cyber safety", "Scam checker"],
    ...(CONTACT_EMAIL ? { email: CONTACT_EMAIL } : {}),
  };
}

export const personId = `${SITE_URL}/#founder`;

/** Founder entity shared with the sister projects (Gathered, Throvic) so engines connect the brand network. */
export function founderLd() {
  return {
    "@type": "Person",
    "@id": personId,
    name: CREATOR,
    url: CREATOR_LINKS.portfolio,
    jobTitle: "Founder & developer",
    homeLocation: { "@type": "Place", name: "Ahmedabad, Gujarat, India" },
    sameAs: [CREATOR_LINKS.portfolio, CREATOR_LINKS.linkedin, CREATOR_LINKS.github],
    owns: [
      { "@id": orgId },
      ...SISTER_SITES.map((s) => ({ "@type": "WebSite", name: s.name, url: s.url })),
    ],
  };
}

export function websiteLd(lang: Locale) {
  return {
    "@type": "WebSite",
    "@id": siteId,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["en-IN", "hi-IN"],
    publisher: { "@id": orgId },
    description:
      lang === "hi"
        ? "संदिग्ध SMS, WhatsApp मैसेज, लिंक और स्क्रीनशॉट की मुफ़्त AI स्कैम जांच।"
        : "Free AI scam checker for suspicious SMS, WhatsApp messages, links and screenshots in India.",
  };
}

export function webAppLd(lang: Locale) {
  return {
    "@type": "WebApplication",
    "@id": `${SITE_URL}/#app`,
    name: lang === "hi" ? "साइबर कवच AI स्कैम स्कैनर" : "Cyber Kavach AI Scam Scanner",
    url: absoluteUrl(localePath(lang, "/")),
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    featureList: [
      "Scam message checker for SMS, WhatsApp and email",
      "Suspicious link / phishing URL checker",
      "Screenshot scam analysis",
      "Hindi and English support",
      "Cyber fraud reporting guide for India",
    ],
    publisher: { "@id": orgId },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
