/** Text for every page's social-share card (WhatsApp, LinkedIn, X, Facebook, Telegram). */
import { PAGES, toolItems } from "./nav";
import { scams } from "./content/scams";
import { tools } from "./content/tools";
import { locales, type Locale } from "./site";

export type OgText = { eyebrow: string; title: string; subtitle: string; accent?: string };

const EYEBROW: Record<string, { en: string; hi: string }> = {
  home: { en: "Free AI Scam Checker", hi: "मुफ़्त AI स्कैम चेकर" },
  scams: { en: "Scam Library", hi: "स्कैम लाइब्रेरी" },
  services: { en: "Govt Cyber Services", hi: "सरकारी साइबर सेवाएं" },
  report: { en: "Report Cyber Fraud", hi: "साइबर फ्रॉड की शिकायत" },
  help: { en: "Emergency Help", hi: "आपातकालीन सहायता" },
  quiz: { en: "Scam IQ Quiz", hi: "स्कैम IQ क्विज़" },
  upsc: { en: "UPSC · GS-III", hi: "UPSC · GS-III" },
  about: { en: "About", hi: "हमारे बारे में" },
  privacy: { en: "Privacy", hi: "गोपनीयता" },
  terms: { en: "Terms", hi: "शर्तें" },
  sitemap: { en: "Site Map", hi: "साइट मैप" },
  glossary: { en: "Cyber Safety Glossary", hi: "शब्दकोश" },
  letters: { en: "Complaint Letters", hi: "शिकायत पत्र" },
  alerts: { en: "Scam Alerts", hi: "स्कैम अलर्ट" },
  bank: { en: "Bank Fraud Help", hi: "बैंक फ्रॉड सहायता" },
};

/** Maps a locale-neutral path to its OG key ("/" → "home", "/scams/upi-fraud" → "upi-fraud"). */
export function ogKeyForPath(path: string): string {
  if (path === "/") return "home";
  if (path.startsWith("/scams/")) return path.slice("/scams/".length);
  if (path === "/cyber-security-upsc") return "upsc";
  if (path === "/site-map") return "sitemap";
  if (path === "/complaint-letter-format") return "letters";
  if (path === "/scam-alerts") return "alerts";
  if (path === "/bank-fraud-help") return "bank";
  return path.replace(/^\//, "");
}

export function ogText(lang: Locale, key: string): OgText | null {
  const scam = scams.find((s) => s.slug === key);
  if (scam) {
    return {
      eyebrow: lang === "hi" ? "स्कैम अलर्ट · कैसे बचें" : "Scam alert · How to stay safe",
      title: scam.content[lang].name,
      subtitle: scam.content[lang].short,
      accent: scam.accent,
    };
  }
  const tool = tools.find((t) => t.slug === key);
  if (tool) {
    const item = toolItems.find((t) => t.href === `/${key}`)!;
    return { eyebrow: lang === "hi" ? "मुफ़्त चेकर" : "Free checker", title: tool.content[lang].h1, subtitle: item.desc[lang] };
  }
  const page = PAGES[key as keyof typeof PAGES];
  if (page) {
    const title =
      key === "home"
        ? lang === "hi"
          ? "क्या यह मैसेज फ्रॉड है? सेकंडों में मुफ़्त जांचें।"
          : "Is this message a scam? Check it free in seconds."
        : page.label[lang];
    const subtitle =
      key === "home"
        ? lang === "hi"
          ? "कोई भी SMS, WhatsApp मैसेज, लिंक या स्क्रीनशॉट पेस्ट करें। भारत के लिए — हिंदी और English।"
          : "Paste any SMS, WhatsApp message, link or screenshot. Built for India — English & Hindi."
        : page.desc[lang];
    return { eyebrow: EYEBROW[key]?.[lang] ?? "Cyber Kavach", title, subtitle };
  }
  return null;
}

export function allOgParams(): { lang: Locale; key: string }[] {
  const keys = [...Object.keys(PAGES), ...tools.map((t) => t.slug), ...scams.map((s) => s.slug)];
  return locales.flatMap((lang) => keys.map((key) => ({ lang, key })));
}
