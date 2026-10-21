export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://cyber-kavach.vercel.app").replace(/\/$/, "");

export const SITE_NAME = "Cyber Kavach";
export const CREATOR = "Yash Trivedi";
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbddobkb";
/** Grievance / privacy contact (DPDP Act). Set NEXT_PUBLIC_CONTACT_EMAIL in Vercel to show a direct email. */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

/** Creator identity — kept identical across Cyber Kavach, Gathered and Throvic so search & AI engines link them. */
export const CREATOR_LINKS = {
  portfolio: "https://yash635644.github.io/yash-portfolio/",
  linkedin: "https://in.linkedin.com/in/yash-trivedii",
  github: "https://github.com/yash635644",
};

export const SISTER_SITES = [
  {
    name: "Gathered",
    url: "https://gathered.pages.dev",
    desc: {
      en: "Daily India & world news in short, current affairs and UPSC study cards.",
      hi: "भारत और दुनिया की रोज़ की ख़बरें संक्षेप में, करेंट अफ़ेयर्स और UPSC स्टडी कार्ड।",
    },
  },
  {
    name: "Throvic",
    url: "https://throvic.pages.dev",
    desc: {
      en: "Turn any topic into an interactive AI mind map, verified on Wikipedia.",
      hi: "किसी भी विषय को इंटरैक्टिव AI माइंड मैप में बदलें, विकिपीडिया से सत्यापित।",
    },
  },
] as const;

export const throvicMapUrl = (topic: string) => `https://throvic.pages.dev/explore?q=${encodeURIComponent(topic)}`;

export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];

/** Builds a locale-aware path. English lives at the root, Hindi under /hi. */
export function localePath(lang: Locale, path: string = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return clean;
  if (clean.startsWith("/#")) return `/hi${clean.slice(1)}`;
  return clean === "/" ? "/hi" : `/hi${clean}`;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export type Bilingual<T = string> = Record<Locale, T>;

export const helplines: { number: string; tel: string; label: Bilingual; note: Bilingual; primary?: boolean }[] = [
  {
    number: "1930",
    tel: "1930",
    primary: true,
    label: { en: "National Cyber Crime Helpline", hi: "राष्ट्रीय साइबर अपराध हेल्पलाइन" },
    note: {
      en: "Call immediately after any online financial fraud — the faster you call, the better the chance of freezing the money.",
      hi: "ऑनलाइन वित्तीय धोखाधड़ी के तुरंत बाद कॉल करें — जितनी जल्दी कॉल करेंगे, पैसा रुकवाने की संभावना उतनी अधिक।",
    },
  },
  {
    number: "112",
    tel: "112",
    label: { en: "All-in-one Emergency", hi: "आपातकालीन सेवा (सभी के लिए)" },
    note: { en: "Police, fire and ambulance — use if you face threats or physical danger.", hi: "पुलिस, फायर और एम्बुलेंस — धमकी या खतरे की स्थिति में।" },
  },
  {
    number: "1947",
    tel: "1947",
    label: { en: "UIDAI Aadhaar Helpline", hi: "UIDAI आधार हेल्पलाइन" },
    note: { en: "Report Aadhaar misuse and get help locking biometrics.", hi: "आधार के दुरुपयोग की शिकायत और बायोमेट्रिक लॉक में सहायता।" },
  },
  {
    number: "1915",
    tel: "1915",
    label: { en: "National Consumer Helpline", hi: "राष्ट्रीय उपभोक्ता हेल्पलाइन" },
    note: { en: "Fake shopping sites, undelivered orders and refund disputes.", hi: "नकली शॉपिंग साइट, ऑर्डर न मिलना और रिफंड विवाद।" },
  },
  {
    number: "181",
    tel: "181",
    label: { en: "Women Helpline", hi: "महिला हेल्पलाइन" },
    note: { en: "Online harassment, stalking and sextortion support for women.", hi: "महिलाओं के लिए ऑनलाइन उत्पीड़न, स्टॉकिंग और सेक्सटॉर्शन सहायता।" },
  },
  {
    number: "1098",
    tel: "1098",
    label: { en: "Childline", hi: "चाइल्डलाइन" },
    note: { en: "If a child is being exploited or threatened online.", hi: "यदि किसी बच्चे का ऑनलाइन शोषण या धमकी हो रही हो।" },
  },
];
