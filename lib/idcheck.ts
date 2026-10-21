/**
 * Instant, offline checks for UPI IDs and phone numbers (pattern guidance — not a database lookup).
 * Runs entirely in the browser: zero cost, works without the AI.
 */
import type { Locale } from "./site";

export type Level = "low" | "medium" | "high" | "info";
export type IdFinding = { level: Level; text: string };
export type IdResult = { level: Level; summary: string; findings: IdFinding[] };

const T = (lang: Locale, en: string, hi: string) => (lang === "hi" ? hi : en);

const PSP_HANDLES = new Set([
  "okaxis", "oksbi", "okhdfcbank", "okicici", "ybl", "ibl", "axl", "paytm", "ptyes", "ptaxis", "pthdfc", "ptsbi", "apl", "yapl", "rapl",
  "upi", "axisbank", "sbi", "hdfcbank", "icici", "kotak", "airtel", "jio", "fbl", "freecharge", "pingpay", "ikwik", "waaxis", "wahdfcbank",
  "wasbi", "waicici", "idfcbank", "idfcfirst", "rbl", "indus", "federal", "barodampay", "pnb", "cnrb", "aubank", "yesbank", "yesbankltd",
  "kmbl", "mahb", "unionbankofindia", "uboi", "boi", "centralbank", "indianbank", "iob", "ucobank", "psb", "dbs", "hsbc", "sc", "citi",
  "superyes", "naviaxis", "abfspay", "timecosmos", "kbl", "jupiteraxis", "slice", "postbank", "airtelpaymentsbank", "nsdl", "dlb", "tjsb",
]);

const IMPERSONATION = /(refund|cashback|reward|prize|lottery|kbc|kyc|support|care|helpdesk|customer|service|official|govt|gov|police|cbi|rbi|sebi|npci|trai|incometax|itr|electricity|bijli|bill|loan|task|job|recharge|winner|claim|verify|helpline)/i;
const BRANDS = /(amazon|flipkart|paytm|phonepe|gpay|google|sbi|hdfc|icici|axis|kotak|swiggy|zomato|irctc|airtel|jio|lic|bajaj|meesho|myntra|ola|uber)/i;

export function checkUpi(raw: string, lang: Locale): IdResult {
  const id = raw.trim().toLowerCase().replace(/\s+/g, "");
  const findings: IdFinding[] = [];
  const m = id.match(/^([a-z0-9._-]{2,256})@([a-z0-9.]{2,64})$/);
  if (!m) {
    return {
      level: "medium",
      summary: T(lang, "This doesn't look like a valid UPI ID (format: name@bank).", "यह मान्य UPI ID जैसी नहीं लगती (फ़ॉर्मेट: name@bank)।"),
      findings: [{ level: "info", text: T(lang, "A UPI ID looks like 9876543210@ybl or name@okhdfcbank.", "UPI ID ऐसी दिखती है: 9876543210@ybl या name@okhdfcbank।") }],
    };
  }
  const [, local, handle] = m;

  if (handle.startsWith("valid")) {
    const type = local.endsWith(".brk") ? T(lang, "stock broker", "स्टॉक ब्रोकर") : local.endsWith(".mf") ? T(lang, "mutual fund", "म्यूचुअल फ़ंड") : T(lang, "SEBI-registered intermediary", "SEBI-रजिस्टर्ड संस्था");
    findings.push({
      level: "low",
      text: T(
        lang,
        `Uses SEBI's @valid format for a ${type}. Confirm the green thumbs-up icon in your UPI app and verify on SEBI Check.`,
        `${type} के लिए SEBI का @valid फ़ॉर्मेट है। UPI ऐप में हरा थम्स-अप आइकन देखें और SEBI Check पर पुष्टि करें।`,
      ),
    });
  } else if (PSP_HANDLES.has(handle)) {
    findings.push({ level: "info", text: T(lang, `@${handle} is a regular payment-app/bank handle — it can belong to any individual.`, `@${handle} एक सामान्य पेमेंट-ऐप/बैंक हैंडल है — यह किसी भी व्यक्ति का हो सकता है।`) });
  } else {
    findings.push({ level: "medium", text: T(lang, `@${handle} is not a common UPI handle. Double-check the spelling.`, `@${handle} एक आम UPI हैंडल नहीं है। वर्तनी दोबारा जांचें।`) });
  }

  const imp = local.match(IMPERSONATION);
  if (imp) {
    findings.push({
      level: "high",
      text: T(lang, `Contains the word "${imp[1]}" — scammers use such IDs to look like refunds, support desks or officials.`, `इसमें "${imp[1]}" शब्द है — ठग ऐसी ID से रिफंड, सपोर्ट या अधिकारी जैसा दिखाते हैं।`),
    });
  }
  const brand = local.match(BRANDS);
  if (brand && !handle.startsWith("valid")) {
    findings.push({
      level: "high",
      text: T(lang, `Uses the brand name "${brand[1]}" on a personal handle. Companies don't collect refunds or fees through such IDs.`, `निजी हैंडल पर "${brand[1]}" ब्रांड नाम है। कंपनियां ऐसी ID से रिफंड या फ़ीस नहीं लेतीं।`),
    });
  }
  if (/^\d{10}$/.test(local)) {
    findings.push({ level: "info", text: T(lang, "Linked to a mobile number — this is a personal account, not a company.", "मोबाइल नंबर से जुड़ी है — यह निजी खाता है, कंपनी का नहीं।") });
  }
  if (/\d{6,}/.test(local) && !/^\d{10}$/.test(local)) {
    findings.push({ level: "medium", text: T(lang, "Long random-looking numbers in the ID — common in mule accounts.", "ID में लंबे बेतरतीब अंक — म्यूल खातों में आम।") });
  }

  return finalize(findings, lang);
}

const FOREIGN_RISK: Record<string, string> = {
  "92": "Pakistan", "84": "Vietnam", "855": "Cambodia", "856": "Laos", "95": "Myanmar", "63": "Philippines", "62": "Indonesia",
  "60": "Malaysia", "234": "Nigeria", "880": "Bangladesh", "977": "Nepal", "971": "UAE", "1": "USA/Canada", "44": "UK",
};
const HELPLINES: Record<string, { en: string; hi: string }> = {
  "1930": { en: "National Cyber Crime Helpline", hi: "राष्ट्रीय साइबर अपराध हेल्पलाइन" },
  "112": { en: "All-in-one emergency number", hi: "आपातकालीन नंबर" },
  "1947": { en: "UIDAI Aadhaar helpline", hi: "UIDAI आधार हेल्पलाइन" },
  "1909": { en: "TRAI DND (Do Not Disturb) service", hi: "TRAI DND सेवा" },
  "1915": { en: "National Consumer Helpline", hi: "राष्ट्रीय उपभोक्ता हेल्पलाइन" },
  "181": { en: "Women helpline", hi: "महिला हेल्पलाइन" },
  "1098": { en: "Childline", hi: "चाइल्डलाइन" },
};

export function checkPhone(raw: string, lang: Locale): IdResult {
  const trimmed = raw.trim();
  const plus = trimmed.startsWith("+") || trimmed.startsWith("00");
  let d = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("00")) d = d.slice(2);
  const findings: IdFinding[] = [];

  if (d.length < 3) {
    return { level: "medium", summary: T(lang, "Enter a full phone number.", "पूरा फ़ोन नंबर डालें।"), findings: [] };
  }

  if (HELPLINES[d]) {
    findings.push({ level: "low", text: T(lang, `${d} is the official ${HELPLINES[d].en}.`, `${d} आधिकारिक ${HELPLINES[d].hi} है।`) });
    return finalize(findings, lang);
  }

  // International number (not India)
  if (plus && !d.startsWith("91")) {
    const code = ["855", "856", "234", "880", "977", "971"].find((c) => d.startsWith(c)) ?? ["92", "84", "95", "63", "62", "60", "44"].find((c) => d.startsWith(c)) ?? (d.startsWith("1") ? "1" : "");
    const country = code ? FOREIGN_RISK[code] : T(lang, "another country", "किसी दूसरे देश");
    findings.push({
      level: "high",
      text: T(lang, `This is an international number (${country}). Indian banks, police and government never call you from foreign numbers.`, `यह अंतरराष्ट्रीय नंबर (${country}) है। भारतीय बैंक, पुलिस और सरकार विदेशी नंबर से कॉल नहीं करते।`),
    });
    return finalize(findings, lang);
  }

  let n = d;
  if (n.startsWith("91") && n.length === 12) n = n.slice(2);
  if (n.startsWith("0") && n.length === 11) n = n.slice(1);

  if (/^1600\d{6}$/.test(n)) {
    findings.push({
      level: "low",
      text: T(
        lang,
        "1600-series: reserved by TRAI for service/transaction calls from RBI, SEBI, IRDAI or PFRDA-regulated entities and government. Likely genuine — still never share OTP or PIN.",
        "1600-सीरीज़: TRAI ने RBI, SEBI, IRDAI या PFRDA से विनियमित संस्थाओं और सरकार की सेवा/लेन-देन कॉल के लिए तय की है। संभवतः असली — फिर भी OTP या PIN न बताएं।",
      ),
    });
  } else if (/^140\d{7}$/.test(n)) {
    findings.push({
      level: "info",
      text: T(lang, "140-series: a registered promotional (telemarketing) number. It's advertising, not your bank's service line. Block via the TRAI DND app or 1909.", "140-सीरीज़: रजिस्टर्ड प्रचार (टेलीमार्केटिंग) नंबर। यह विज्ञापन है, बैंक की सेवा लाइन नहीं। TRAI DND ऐप या 1909 से रोकें।"),
    });
  } else if (/^1800\d{6,7}$/.test(n)) {
    findings.push({ level: "info", text: T(lang, "1800 toll-free number. Confirm it's listed on the company's official website before trusting it — scammers post fake toll-free numbers too.", "1800 टोल-फ़्री नंबर। भरोसा करने से पहले कंपनी की आधिकारिक वेबसाइट पर जांचें — ठग नकली टोल-फ़्री नंबर भी डालते हैं।") });
  } else if (/^[6-9]\d{9}$/.test(n)) {
    findings.push({
      level: "medium",
      text: T(lang, "Regular Indian mobile number. Banks, RBI, police, TRAI and couriers don't make official service calls from personal mobiles — if the caller claims to be one, hang up.", "साधारण भारतीय मोबाइल नंबर। बैंक, RBI, पुलिस, TRAI और कूरियर निजी मोबाइल से आधिकारिक कॉल नहीं करते — कॉलर ख़ुद को इनमें से कोई बताए तो फ़ोन काट दें।"),
    });
  } else if (/^[1-9]\d{9}$/.test(n)) {
    findings.push({ level: "info", text: T(lang, "Indian landline number. Verify it on the organisation's official website before sharing anything.", "भारतीय लैंडलाइन नंबर। कुछ भी साझा करने से पहले संस्था की आधिकारिक वेबसाइट पर जांचें।") });
  } else {
    findings.push({ level: "medium", text: T(lang, "Unusual number format. Spoofed or VoIP numbers often look like this — be careful.", "असामान्य नंबर फ़ॉर्मेट। नकली या VoIP नंबर अक्सर ऐसे दिखते हैं — सावधान रहें।") });
  }

  return finalize(findings, lang);
}

function finalize(findings: IdFinding[], lang: Locale): IdResult {
  const level: Level = findings.some((f) => f.level === "high")
    ? "high"
    : findings.some((f) => f.level === "medium")
      ? "medium"
      : findings.some((f) => f.level === "low")
        ? "low"
        : "info";
  const summary = {
    high: T(lang, "High risk — strong signs of fraud.", "उच्च जोखिम — धोखाधड़ी के स्पष्ट संकेत।"),
    medium: T(lang, "Be careful — verify before you trust or pay.", "सावधान — भरोसा या भुगतान करने से पहले जांचें।"),
    low: T(lang, "Looks like an official format — still verify and never share OTP/PIN.", "आधिकारिक फ़ॉर्मेट लगता है — फिर भी जांचें और OTP/PIN न बताएं।"),
    info: T(lang, "No strong warning signs from the format alone — verify officially.", "सिर्फ़ फ़ॉर्मेट से कोई बड़ा संकेत नहीं — आधिकारिक रूप से जांचें।"),
  }[level];
  return { level, summary, findings };
}
