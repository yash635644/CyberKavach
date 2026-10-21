import type { Verdict } from "./detector";
import type { Locale } from "./site";

export type ScanResponse = {
  score: number;
  verdict: Verdict;
  scamType: string | null;
  summary: string;
  redFlags: string[];
  nextSteps: string[];
  engine: "ai" | "rules";
};

const generic: Record<Locale, Record<Verdict, string[]>> = {
  en: {
    DANGEROUS: [
      "Do not click any link, call back, or reply to this message.",
      "Never share OTP, UPI PIN, CVV or passwords — no bank or government officer will ask for them.",
      "Block and report the sender on Sanchar Saathi Chakshu (sancharsaathi.gov.in/sfc).",
      "If you already paid or shared details, call 1930 and your bank immediately.",
    ],
    SUSPICIOUS: [
      "Don't act in a hurry — verify through the official app, website or branch.",
      "Don't click links or install apps from this message.",
      "Ask a family member or friend before responding.",
      "Report it on Sanchar Saathi Chakshu if it turns out to be fraud.",
    ],
    SAFE: [
      "No strong scam signals found, but stay alert.",
      "Never share OTP, PIN or passwords, even with people you trust.",
      "When in doubt, contact the company through its official app or website.",
    ],
  },
  hi: {
    DANGEROUS: [
      "इस मैसेज के किसी लिंक पर क्लिक न करें, कॉल बैक या जवाब न दें।",
      "OTP, UPI PIN, CVV या पासवर्ड कभी न बताएं — कोई बैंक या सरकारी अधिकारी इन्हें नहीं मांगता।",
      "भेजने वाले को ब्लॉक करें और संचार साथी चक्षु (sancharsaathi.gov.in/sfc) पर रिपोर्ट करें।",
      "अगर पैसे दे चुके हैं या जानकारी साझा कर दी है, तो तुरंत 1930 और अपने बैंक को कॉल करें।",
    ],
    SUSPICIOUS: [
      "जल्दबाज़ी न करें — आधिकारिक ऐप, वेबसाइट या शाखा से पुष्टि करें।",
      "इस मैसेज के लिंक पर क्लिक न करें और कोई ऐप इंस्टॉल न करें।",
      "जवाब देने से पहले परिवार या दोस्त से सलाह लें।",
      "फ्रॉड निकले तो संचार साथी चक्षु पर रिपोर्ट करें।",
    ],
    SAFE: [
      "कोई बड़ा स्कैम संकेत नहीं मिला, फिर भी सतर्क रहें।",
      "OTP, PIN या पासवर्ड किसी को न बताएं, भरोसेमंद लोगों को भी नहीं।",
      "संदेह हो तो कंपनी से उसके आधिकारिक ऐप या वेबसाइट से संपर्क करें।",
    ],
  },
};

export type ScamInfo = { name: string; whatToDo: string[] };

export function nextStepsFor(verdict: Verdict, scam: ScamInfo | undefined, lang: Locale): string[] {
  if (scam && verdict !== "SAFE") return scam.whatToDo.slice(0, 4);
  return generic[lang][verdict];
}

export function summaryFor(verdict: Verdict, scam: ScamInfo | undefined, lang: Locale): string {
  if (lang === "hi") {
    if (verdict === "DANGEROUS") return scam ? `यह ${scam.name} जैसा लगता है। इसमें कई ख़तरनाक संकेत हैं।` : "इस मैसेज में कई ख़तरनाक स्कैम संकेत हैं।";
    if (verdict === "SUSPICIOUS") return "इस मैसेज में कुछ संदिग्ध संकेत हैं। आगे बढ़ने से पहले आधिकारिक माध्यम से पुष्टि करें।";
    return "हमारे पैटर्न इंजन को कोई आम स्कैम संकेत नहीं मिला।";
  }
  if (verdict === "DANGEROUS") return scam ? `This looks like a ${scam.name}. Several high-risk scam signals were found.` : "This message shows several high-risk scam signals.";
  if (verdict === "SUSPICIOUS") return "This message has some suspicious signals. Verify through official channels before acting.";
  return "Our pattern engine did not find common scam signals.";
}
