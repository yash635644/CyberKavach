/**
 * Explains what a decoded QR code will actually do. Runs in the browser only.
 * UPI QR format reference: upi://pay?pa=<payee VPA>&pn=<payee name>&am=<amount>&tn=<note>&cu=INR
 */
import { checkUpi, type IdFinding, type Level } from "./idcheck";
import { runRules } from "./detector";
import type { Locale } from "./site";

export type QrResult = {
  kind: "upi" | "url" | "text";
  level: Level;
  headline: string;
  details: { label: string; value: string }[];
  findings: IdFinding[];
};

const T = (lang: Locale, en: string, hi: string) => (lang === "hi" ? hi : en);

export function explainQr(raw: string, lang: Locale): QrResult {
  const text = raw.trim();

  if (/^upi:\/\//i.test(text)) {
    let params: URLSearchParams;
    try {
      params = new URL(text.replace(/^upi:\/\//i, "https://upi.local/")).searchParams;
    } catch {
      params = new URLSearchParams(text.split("?")[1] || "");
    }
    const pa = params.get("pa") || "";
    const pn = params.get("pn") || "";
    const am = params.get("am") || "";
    const tn = params.get("tn") || "";
    const findings: IdFinding[] = [
      {
        level: "high",
        text: T(
          lang,
          "This is a UPI PAYMENT QR. Scanning it and entering your UPI PIN SENDS money from your account — it can never put money into your account.",
          "यह UPI भुगतान QR है। इसे स्कैन करके UPI PIN डालने से आपके खाते से पैसा जाता है — इससे आपके खाते में पैसा कभी नहीं आ सकता।",
        ),
      },
    ];
    if (am) {
      findings.push({
        level: "medium",
        text: T(lang, `The amount ₹${am} is pre-filled. Check it carefully before paying.`, `राशि ₹${am} पहले से भरी है। भुगतान से पहले ध्यान से जांचें।`),
      });
    }
    const upiFindings = pa ? checkUpi(pa, lang).findings.filter((f) => f.level !== "info") : [];
    findings.push(...upiFindings);
    findings.push({
      level: "info",
      text: T(
        lang,
        "Before paying, confirm the name your UPI app shows matches the shop or person you intend to pay. Shopkeepers: scammers sometimes paste their own QR sticker over yours.",
        "भुगतान से पहले देखें कि UPI ऐप में दिखा नाम उसी दुकान या व्यक्ति का है जिसे आप भुगतान करना चाहते हैं। दुकानदार: ठग कभी-कभी आपके QR पर अपना QR स्टिकर चिपका देते हैं।",
      ),
    });
    // Any payment QR deserves care (medium); suspicious payee IDs raise it to high
    const level: Level = upiFindings.some((f) => f.level === "high") ? "high" : "medium";
    return {
      kind: "upi",
      level,
      headline: T(lang, "UPI payment QR — scanning this will SEND money", "UPI भुगतान QR — स्कैन करने से पैसा जाएगा"),
      details: [
        { label: T(lang, "Pays to (UPI ID)", "भुगतान पाने वाला (UPI ID)"), value: pa || "—" },
        { label: T(lang, "Name in QR", "QR में नाम"), value: pn || "—" },
        { label: T(lang, "Amount", "राशि"), value: am ? `₹${am}` : T(lang, "Not fixed (you type it)", "तय नहीं (आप डालेंगे)") },
        ...(tn ? [{ label: T(lang, "Note", "नोट"), value: tn }] : []),
      ],
      findings,
    };
  }

  const rules = runRules(text, lang);
  const isUrl = /^(https?:\/\/|www\.)/i.test(text) || rules.urls.length === 1 && rules.urls[0] === text;
  const level: Level = rules.verdict === "DANGEROUS" ? "high" : rules.verdict === "SUSPICIOUS" ? "medium" : "low";
  const findings: IdFinding[] = rules.signals.map((s) => ({ level: s.weight > 0 ? (s.weight >= 30 ? "high" : "medium") : "low", text: s.label }));
  if (isUrl) {
    findings.push({
      level: "info",
      text: T(lang, "Don't log in or pay on a site opened from a QR code unless you are sure it is the official website.", "QR से खुली साइट पर तब तक लॉगिन या भुगतान न करें जब तक पक्का न हो कि वह आधिकारिक वेबसाइट है।"),
    });
  }
  return {
    kind: isUrl ? "url" : "text",
    level,
    headline: isUrl
      ? level === "low"
        ? T(lang, "Website link — no common scam signs found", "वेबसाइट लिंक — कोई आम स्कैम संकेत नहीं")
        : T(lang, "Website link with warning signs", "चेतावनी संकेतों वाला वेबसाइट लिंक")
      : T(lang, "Text QR code", "टेक्स्ट QR कोड"),
    details: [{ label: isUrl ? T(lang, "Opens", "खुलेगा") : T(lang, "Contains", "इसमें है"), value: text.slice(0, 300) }],
    findings,
  };
}
