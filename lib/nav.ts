/**
 * Single source of truth for the site's information architecture.
 * Footer, mobile menu, HTML site map and "Explore more" blocks all read from here,
 * so every page stays interconnected as the site grows.
 */
import type { Bilingual } from "./site";
import { tools } from "./content/tools";
import { scams } from "./content/scams";

export type PageKey =
  | "home" | "scams" | "scam" | "tool" | "services" | "report" | "help" | "quiz" | "upsc" | "about" | "privacy" | "terms" | "sitemap"
  | "glossary" | "letters" | "alerts" | "bank";

export type NavItem = { key: string; href: string; icon: string; label: Bilingual; desc: Bilingual };

export const PAGES: Record<Exclude<PageKey, "scam" | "tool">, NavItem> = {
  home: {
    key: "home", href: "/", icon: "scan",
    label: { en: "AI Scam Checker", hi: "AI स्कैम चेकर" },
    desc: { en: "Check any message, link or screenshot", hi: "कोई भी मैसेज, लिंक या स्क्रीनशॉट जांचें" },
  },
  scams: {
    key: "scams", href: "/scams", icon: "book",
    label: { en: "Scam Library", hi: "स्कैम लाइब्रेरी" },
    desc: { en: "How every common Indian scam works", hi: "भारत के आम स्कैम कैसे होते हैं" },
  },
  services: {
    key: "services", href: "/services", icon: "landmark",
    label: { en: "Govt Cyber Services", hi: "सरकारी साइबर सेवाएं" },
    desc: { en: "Every official portal, app & helpline", hi: "हर आधिकारिक पोर्टल, ऐप और हेल्पलाइन" },
  },
  report: {
    key: "report", href: "/report", icon: "file-check",
    label: { en: "Report Cyber Fraud", hi: "साइबर फ्रॉड की शिकायत" },
    desc: { en: "Step-by-step 1930 & cybercrime.gov.in guide", hi: "1930 और cybercrime.gov.in की पूरी गाइड" },
  },
  help: {
    key: "help", href: "/help", icon: "siren",
    label: { en: "Got Scammed? Act Now", hi: "ठगी हो गई? तुरंत करें" },
    desc: { en: "First-hour recovery checklist", hi: "पहले घंटे की रिकवरी चेकलिस्ट" },
  },
  quiz: {
    key: "quiz", href: "/quiz", icon: "brain",
    label: { en: "Scam IQ Quiz", hi: "स्कैम IQ क्विज़" },
    desc: { en: "Can you spot the fake? 2-minute quiz", hi: "क्या आप नकली पहचान सकते हैं? 2 मिनट" },
  },
  upsc: {
    key: "upsc", href: "/cyber-security-upsc", icon: "graduation",
    label: { en: "Cyber Security for UPSC", hi: "UPSC के लिए साइबर सुरक्षा" },
    desc: { en: "GS-III laws, agencies & current affairs", hi: "GS-III कानून, संस्थाएं और करेंट अफ़ेयर्स" },
  },
  about: {
    key: "about", href: "/about", icon: "info",
    label: { en: "About Cyber Kavach", hi: "साइबर कवच के बारे में" },
    desc: { en: "Mission, methodology & creator", hi: "उद्देश्य, कार्यप्रणाली और निर्माता" },
  },
  privacy: {
    key: "privacy", href: "/privacy", icon: "lock",
    label: { en: "Privacy Policy", hi: "गोपनीयता नीति" },
    desc: { en: "We never store what you scan", hi: "हम आपका स्कैन किया डेटा सेव नहीं करते" },
  },
  terms: {
    key: "terms", href: "/terms", icon: "file-check",
    label: { en: "Terms of Use", hi: "उपयोग की शर्तें" },
    desc: { en: "Fair use and disclaimers", hi: "उचित उपयोग और अस्वीकरण" },
  },
  glossary: {
    key: "glossary", href: "/glossary", icon: "book",
    label: { en: "Cyber Safety Glossary", hi: "साइबर सुरक्षा शब्दकोश" },
    desc: { en: "Phishing, vishing, mule account & more explained", hi: "फ़िशिंग, विशिंग, म्यूल खाता और अधिक आसान भाषा में" },
  },
  letters: {
    key: "letters", href: "/complaint-letter-format", icon: "file-check",
    label: { en: "Complaint Letter Formats", hi: "शिकायत पत्र प्रारूप" },
    desc: { en: "Bank, police & RBI letters — fill in and download", hi: "बैंक, पुलिस और RBI पत्र — भरें और डाउनलोड करें" },
  },
  alerts: {
    key: "alerts", href: "/scam-alerts", icon: "megaphone",
    label: { en: "Scam Alerts", hi: "स्कैम अलर्ट" },
    desc: { en: "Latest scam news & official safety updates", hi: "ताज़ा स्कैम ख़बरें और आधिकारिक सुरक्षा अपडेट" },
  },
  bank: {
    key: "bank", href: "/bank-fraud-help", icon: "bank",
    label: { en: "Bank Fraud Help", hi: "बैंक फ्रॉड सहायता" },
    desc: { en: "What to do & official bank websites", hi: "क्या करें और बैंकों की आधिकारिक वेबसाइटें" },
  },
  sitemap: {
    key: "sitemap", href: "/site-map", icon: "grid",
    label: { en: "Site Map", hi: "साइट मैप" },
    desc: { en: "Every page on Cyber Kavach", hi: "साइबर कवच के सभी पेज" },
  },
};

export const toolItems: NavItem[] = tools.map((t) => ({
  key: `tool:${t.slug}`,
  href: `/${t.slug}`,
  icon: t.icon,
  label: { en: t.content.en.nav, hi: t.content.hi.nav },
  desc: { en: t.content.en.description, hi: t.content.hi.description },
}));

export const scamItems: NavItem[] = scams.map((s) => ({
  key: `scam:${s.slug}`,
  href: `/scams/${s.slug}`,
  icon: "alert",
  label: { en: s.content.en.name, hi: s.content.hi.name },
  desc: { en: s.content.en.short, hi: s.content.hi.short },
}));

/** Grouped structure used by the footer and the HTML site map. */
export const SECTIONS: { id: string; title: Bilingual; items: NavItem[] }[] = [
  { id: "check", title: { en: "Check for scams", hi: "स्कैम जांचें" }, items: [PAGES.home, ...toolItems] },
  { id: "help", title: { en: "Get help", hi: "सहायता पाएं" }, items: [PAGES.help, PAGES.report, PAGES.letters, PAGES.bank, PAGES.services] },
  { id: "learn", title: { en: "Learn", hi: "सीखें" }, items: [PAGES.scams, PAGES.alerts, PAGES.glossary, PAGES.upsc, PAGES.quiz] },
  { id: "company", title: { en: "Cyber Kavach", hi: "साइबर कवच" }, items: [PAGES.about, PAGES.privacy, PAGES.terms, PAGES.sitemap] },
];

/** Which scam guide relates to which checker — used for two-way links between guides and tools. */
export const SCAM_TOOL: Record<string, string> = {
  "upi-fraud": "qr-code-scam-checker",
  "kyc-update-scam": "link-checker",
  "e-challan-scam": "link-checker",
  "courier-parcel-scam": "link-checker",
  "fake-customer-care-scam": "fraud-number-checker",
  "digital-arrest-scam": "fraud-number-checker",
  "ai-voice-clone-scam": "fraud-number-checker",
  "electricity-bill-scam": "fraud-number-checker",
  "stock-trading-investment-scam": "upi-id-checker",
  "part-time-job-scam": "scam-message-checker",
  "lottery-prize-scam": "scam-message-checker",
  "loan-app-scam": "screenshot-scam-checker",
  "sextortion-video-call-scam": "screenshot-scam-checker",
  "aeps-aadhaar-fingerprint-fraud": "scam-message-checker",
};

/** Context-aware "Explore more" picks for each page type (most useful next steps first). */
export function relatedFor(page: PageKey, ctx?: { scam?: string; tool?: string }): NavItem[] {
  const pick = (...items: (NavItem | undefined)[]) => items.filter(Boolean) as NavItem[];
  const toolBySlug = (slug?: string) => toolItems.find((t) => t.href === `/${slug}`);
  const scamsForTool = (slug?: string) =>
    Object.entries(SCAM_TOOL)
      .filter(([, t]) => t === slug)
      .map(([s]) => scamItems.find((i) => i.href === `/scams/${s}`));

  switch (page) {
    case "scam":
      return pick(toolBySlug(ctx?.scam ? SCAM_TOOL[ctx.scam] : undefined), PAGES.help, PAGES.report, PAGES.services, PAGES.quiz).slice(0, 4);
    case "tool":
      return pick(...scamsForTool(ctx?.tool).slice(0, 2), PAGES.help, PAGES.services, PAGES.scams).slice(0, 4);
    case "scams":
      return pick(PAGES.alerts, PAGES.glossary, PAGES.home, PAGES.quiz);
    case "services":
      return pick(PAGES.report, PAGES.help, toolItems[3], toolItems[2]);
    case "report":
      return pick(PAGES.letters, PAGES.help, PAGES.bank, PAGES.services);
    case "help":
      return pick(PAGES.letters, PAGES.bank, PAGES.report, PAGES.services);
    case "quiz":
      return pick(PAGES.scams, PAGES.home, PAGES.upsc, PAGES.help);
    case "upsc":
      return pick(PAGES.scams, PAGES.services, PAGES.quiz, PAGES.report);
    case "about":
      return pick(PAGES.home, PAGES.services, PAGES.scams, PAGES.privacy);
    case "privacy":
    case "terms":
    case "sitemap":
      return pick(PAGES.home, PAGES.about, PAGES.services, PAGES.help);
    case "glossary":
      return pick(PAGES.scams, PAGES.alerts, PAGES.home, PAGES.upsc);
    case "letters":
      return pick(PAGES.report, PAGES.bank, PAGES.help, PAGES.services);
    case "alerts":
      return pick(PAGES.scams, PAGES.home, PAGES.glossary, PAGES.help);
    case "bank":
      return pick(PAGES.letters, PAGES.report, PAGES.help, toolItems[2]);
    default:
      return pick(PAGES.help, PAGES.services, PAGES.scams, PAGES.quiz);
  }
}
