/**
 * Offline scam-pattern engine. Runs on both server and client with zero cost,
 * so the scanner keeps working even when the free AI quota is exhausted.
 */
import type { Bilingual, Locale } from "./site";

export type Verdict = "SAFE" | "SUSPICIOUS" | "DANGEROUS";

export type Signal = { id: string; weight: number; label: string; scam?: string };

export type RuleResult = {
  score: number;
  verdict: Verdict;
  signals: Signal[];
  scamType: string | null;
  urls: string[];
};

type Rule = { id: string; weight: number; re: RegExp; label: Bilingual; scam?: string };

const RULES: Rule[] = [
  {
    id: "otp_request",
    weight: 45,
    re: /((share|send|tell|forward|batao|batana|bhejo|bata do|provide)\b.{0,30}(otp|one[- ]time password|verification code|ओटीपी))|((otp|ओटीपी).{0,30}(share|send|batao|bhejo|bata|बताएं|भेजें))/i,
    label: { en: "Asks you to share an OTP / verification code", hi: "OTP / वेरिफ़िकेशन कोड साझा करने को कहा गया" },
  },
  {
    id: "pin_to_receive",
    weight: 62,
    re: /((upi )?pin\b.{0,50}(receive|get|credit|claim|paane|पाने|प्राप्त))|((receive|get|claim)\b.{0,50}\b(enter|type|daal|डालें)\b.{0,15}\bpin)|(scan.{0,30}(qr|code).{0,40}(receive|get) (money|payment|amount))/i,
    label: { en: "Asks for UPI PIN or QR scan to 'receive' money — a PIN only sends money", hi: "पैसे 'पाने' के लिए UPI PIN या QR स्कैन — PIN से सिर्फ़ पैसा जाता है" },
    scam: "upi-fraud",
  },
  {
    id: "collect_request",
    weight: 22,
    re: /(collect request|payment request|request (sent|bheja)|accept (the )?request)/i,
    label: { en: "Mentions a UPI collect/payment request", hi: "UPI कलेक्ट/पेमेंट रिक्वेस्ट का ज़िक्र" },
    scam: "upi-fraud",
  },
  {
    id: "kyc",
    weight: 22,
    re: /(\bre-?kyc\b|\bkyc\b|केवाईसी|pan\s?(card)?.{0,20}(update|link|expire)|aadhaar.{0,20}(update|link))/i,
    label: { en: "KYC / PAN / Aadhaar update request", hi: "KYC / PAN / आधार अपडेट का अनुरोध" },
    scam: "kyc-update-scam",
  },
  {
    id: "block_threat",
    weight: 22,
    re: /((account|a\/c|khata|खाता|sim|card|wallet|yono|net ?banking|number|connection).{0,50}(block|blocked|suspend|deactivat|band ho|बंद|ब्लॉक|freeze|frozen|closed?|terminate))/i,
    label: { en: "Threatens to block or suspend your account/SIM", hi: "खाता/SIM बंद करने की धमकी" },
    scam: "kyc-update-scam",
  },
  {
    id: "urgency",
    weight: 14,
    re: /(\btoday\b|tonight|immediately|urgent|asap|within \d+ ?(hours?|hrs|minutes?|mins)|24 ?(hours?|hrs)|last (chance|warning|reminder)|\bturant\b|\babhi\b|तुरंत|आज रात|आज ही|घंटे में)/i,
    label: { en: "Creates urgency or a deadline", hi: "जल्दबाज़ी या समय-सीमा का दबाव" },
  },
  {
    id: "digital_arrest",
    weight: 55,
    re: /(digital(ly)? arrest|डिजिटल अरेस्ट|((cbi|\bed\b|enforcement directorate|narcotics|\bncb\b|customs|cyber ?cell|crime branch|\btrai\b|police|mumbai police|delhi police)\b.{0,80}\b(arrest|warrant|\bfir\b|money laundering|video call|investigation|supervision)))/i,
    label: { en: "Impersonates police/CBI/ED or threatens arrest", hi: "पुलिस/CBI/ED बनकर गिरफ़्तारी की धमकी" },
    scam: "digital-arrest-scam",
  },
  {
    id: "parcel_illegal",
    weight: 40,
    re: /((parcel|courier|package|fedex|dhl|पार्सल).{0,90}(drugs?|mdma|passports?|seized|illegal|narcotics|ड्रग्स))/i,
    label: { en: "Claims a parcel in your name has illegal items", hi: "आपके नाम के पार्सल में अवैध सामान का दावा" },
    scam: "courier-parcel-scam",
  },
  {
    id: "parcel_fee",
    weight: 26,
    re: /((parcel|package|shipment|delivery|india ?post|indiapost|पार्सल|पैकेज).{0,90}(held|on hold|address|redeliver|re-deliver|fee|incomplete|undeliver|रुका|अधूरे))/i,
    label: { en: "Parcel held / address update / delivery fee", hi: "पार्सल रुका / पता अपडेट / डिलीवरी फ़ीस" },
    scam: "courier-parcel-scam",
  },
  {
    id: "job_offer",
    weight: 38,
    re: /((part[- ]?time|work from home|\bwfh\b|daily (income|earning)|earn (₹|rs|inr|\d)|पार्ट-टाइम|घर से)|like (youtube|videos?)|(youtube|google|hotel|product)\s?(like|review|rating)s?\b.{0,30}(task|earn|₹|rs)|prepaid task|merchant task|telegram.{0,30}(task|job|group))/i,
    label: { en: "Easy part-time job / task-based earning offer", hi: "आसान पार्ट-टाइम जॉब / टास्क से कमाई का ऑफ़र" },
    scam: "part-time-job-scam",
  },
  {
    id: "investment",
    weight: 42,
    re: /((guaranteed|assured|sure[- ]?shot|fixed|पक्का|पक्की)\s.{0,30}(returns?|profit|tips?)|\d{1,3}\s?% (daily|weekly|monthly|per day|per week|returns?)|ipo allotment|block trades?|institutional (account|trading|app)|vip (group|club)|stock (market )?tips|crypto.{0,30}(double|returns?|profit))/i,
    label: { en: "Promises guaranteed or unrealistic investment returns", hi: "पक्के या अवास्तविक निवेश रिटर्न का वादा" },
    scam: "stock-trading-investment-scam",
  },
  {
    id: "lottery",
    weight: 34,
    re: /((you (have )?won|winner|lottery|lucky draw|jackpot|\bkbc\b|kaun banega|congratulations.{0,40}(won|selected|prize|reward)|इनाम|लॉटरी|जीते))/i,
    label: { en: "Lottery, prize or lucky-draw claim", hi: "लॉटरी, इनाम या लकी ड्रॉ का दावा" },
    scam: "lottery-prize-scam",
  },
  {
    id: "high_income",
    weight: 20,
    re: /(₹|rs\.?|inr)\s?\d[\d,]*(\s?(-|–|to)\s?(₹|rs\.?)?\s?\d[\d,]*)?\s?(per day|daily|\/day|a day|प्रतिदिन|रोज़|रोज)|(रोज़|रोज|daily|per day)\s?(₹|rs\.?)\s?\d/i,
    label: { en: "Promises a high daily income", hi: "रोज़ाना ज़्यादा कमाई का वादा" },
    scam: "part-time-job-scam",
  },
  {
    id: "join_group",
    weight: 14,
    re: /(join|जॉइन|जुड़ें).{0,25}(telegram|whatsapp group|vip group)|(telegram|whatsapp group).{0,25}(join|जॉइन|जुड़ें)/i,
    label: { en: "Pushes you to join a Telegram/WhatsApp group", hi: "Telegram/WhatsApp ग्रुप जॉइन करने का दबाव" },
  },
  {
    id: "fake_platform",
    weight: 22,
    re: /(download|install|डाउनलोड).{0,40}(trading|investment|institutional|इंस्टीट्यूशनल|ट्रेडिंग).{0,20}(app|ऐप|platform)/i,
    label: { en: "Asks you to install a special trading/investment app", hi: "ख़ास ट्रेडिंग/निवेश ऐप इंस्टॉल करवाना" },
    scam: "stock-trading-investment-scam",
  },
  {
    id: "upfront_fee",
    weight: 28,
    re: /((processing|registration|gst|tax|clearance|activation|unlock|security|refundable|service|release|withdrawal)\s(fee|charge|charges|amount|deposit))|(pay|भरें|bharo|jama).{0,30}(gst|tax|fee|फ़ीस|शुल्क)/i,
    label: { en: "Asks for an upfront fee, tax or deposit", hi: "पहले फ़ीस, टैक्स या जमा राशि की मांग" },
  },
  {
    id: "electricity",
    weight: 38,
    re: /((electricity|bijli|बिजली|power).{0,70}(disconnect|cut|कट|काट|katega|kat jayegi|band|बंद))/i,
    label: { en: "Electricity disconnection threat", hi: "बिजली कनेक्शन काटने की धमकी" },
    scam: "electricity-bill-scam",
  },
  {
    id: "echallan",
    weight: 34,
    re: /((e-?challan|traffic (fine|challan)|challan|चालान).{0,80}(pending|unpaid|pay|due|court|भरें|बाकी))/i,
    label: { en: "Traffic e-challan payment demand via message", hi: "मैसेज से ट्रैफ़िक ई-चालान भुगतान की मांग" },
    scam: "e-challan-scam",
  },
  {
    id: "family_emergency",
    weight: 34,
    re: /((mummy|mumma|papa|maa|dad|mom|मम्मी|पापा).{0,80}(accident|arrested|police|hospital|kidnap|एक्सीडेंट|पुलिस|गिरफ़्तार))|((accident|arrested|hospital|पुलिस ने पकड़).{0,60}(send|transfer|भेज).{0,30}(money|₹|rs|upi|पैसे))/i,
    label: { en: "'Family emergency' asking for urgent money (possible voice-clone scam)", hi: "'परिवार की इमरजेंसी' में तुरंत पैसे की मांग (संभावित वॉयस-क्लोन स्कैम)" },
    scam: "ai-voice-clone-scam",
  },
  {
    id: "biometric_camp",
    weight: 22,
    re: /((thumb|finger ?print|biometric|अंगूठा|फ़िंगरप्रिंट).{0,60}(scheme|subsidy|camp|registration|योजना|सब्सिडी|कैंप))/i,
    label: { en: "Asks for thumbprint/biometrics for a 'scheme' (AePS fraud risk)", hi: "'योजना' के लिए अंगूठा/बायोमेट्रिक मांगना (AePS फ्रॉड जोखिम)" },
    scam: "aeps-aadhaar-fingerprint-fraud",
  },
  {
    id: "remote_app",
    weight: 40,
    re: /(anydesk|teamviewer|quick ?support|rustdesk|airdroid|screen ?shar(e|ing))/i,
    label: { en: "Asks to install a screen-sharing / remote-access app", hi: "स्क्रीन-शेयरिंग / रिमोट-एक्सेस ऐप इंस्टॉल करवाना" },
    scam: "fake-customer-care-scam",
  },
  {
    id: "apk",
    weight: 40,
    re: /(\.apk\b|download.{0,25}\bapk\b|install.{0,25}\bapk\b)/i,
    label: { en: "Asks you to install an APK file outside the Play Store", hi: "Play Store के बाहर से APK फ़ाइल इंस्टॉल करवाना" },
    scam: "kyc-update-scam",
  },
  {
    id: "loan",
    weight: 26,
    re: /((instant|pre-?approved)\s.{0,20}loan|loan\b.{0,40}\b(approved|without cibil|no cibil|no documents?|in \d+ minutes))/i,
    label: { en: "Instant / pre-approved loan offer", hi: "तुरंत / प्री-अप्रूव्ड लोन का ऑफ़र" },
    scam: "loan-app-scam",
  },
  {
    id: "sextortion",
    weight: 50,
    re: /((video|recording|clip|photos?|वीडियो).{0,70}(viral|leak|upload|send|भेज).{0,50}(family|friends|contacts|relatives|youtube|परिवार|दोस्तों))|(recorded your (video|call))/i,
    label: { en: "Threatens to leak a video or photos (blackmail)", hi: "वीडियो या फ़ोटो लीक करने की धमकी (ब्लैकमेल)" },
    scam: "sextortion-video-call-scam",
  },
  {
    id: "refund_care",
    weight: 20,
    re: /((customer care|helpline|support (team|executive)|कस्टमर केयर).{0,50}(refund|cashback|रिफंड))/i,
    label: { en: "'Customer care' offering a refund", hi: "'कस्टमर केयर' रिफंड का ऑफ़र" },
    scam: "fake-customer-care-scam",
  },
  {
    id: "reward_points",
    weight: 24,
    re: /(reward points?.{0,40}(expir|redeem)|redeem.{0,20}points|cashback.{0,40}(claim|credited|link))/i,
    label: { en: "Reward points / cashback expiring — claim via link", hi: "रिवॉर्ड पॉइंट / कैशबैक — लिंक से क्लेम करें" },
    scam: "kyc-update-scam",
  },
  {
    id: "secrecy",
    weight: 30,
    re: /((don'?t|do not|never) (tell|inform|share (this )?with|disconnect)|kisi ko (mat|na) bata|किसी को (न|मत) बता|कॉल न काटें)/i,
    label: { en: "Tells you to keep it secret or stay on the call", hi: "किसी को न बताने या कॉल पर बने रहने को कहना" },
    scam: "digital-arrest-scam",
  },
  {
    id: "money_request",
    weight: 16,
    re: /((transfer|pay|send|deposit|bhejo|jama karo|भेजें|जमा).{0,30}(₹|rs\.?\s?\d|inr|rupees|\d{3,}))/i,
    label: { en: "Requests a money transfer", hi: "पैसे ट्रांसफर करने की मांग" },
  },
  {
    id: "generic_greeting",
    weight: 8,
    re: /(dear (customer|user|consumer|sir\/madam|beneficiary|valued)|प्रिय (ग्राहक|उपभोक्ता))/i,
    label: { en: "Generic greeting like 'Dear customer'", hi: "'प्रिय ग्राहक' जैसा सामान्य संबोधन" },
  },
  {
    id: "aadhaar_misuse",
    weight: 26,
    re: /(aadhaa?r|आधार).{0,50}(misuse|used|linked to|illegal|crime|दुरुपयोग)/i,
    label: { en: "Claims your Aadhaar was misused", hi: "आपके आधार के दुरुपयोग का दावा" },
    scam: "digital-arrest-scam",
  },
  {
    id: "foreign_number",
    weight: 18,
    re: /\+\s?(92|84|855|856|95|63|60|62|234|880|977)[\s-]?\d{3,}/,
    label: { en: "Contact number with a foreign country code", hi: "विदेशी कंट्री कोड वाला संपर्क नंबर" },
  },
  {
    id: "sensitive_data",
    weight: 30,
    re: /((share|send|enter|provide|update|bhejo|बताएं).{0,40}(cvv|card number|atm pin|net ?banking password|login password|mpin|debit card details))/i,
    label: { en: "Asks for card, CVV, MPIN or banking password", hi: "कार्ड, CVV, MPIN या बैंकिंग पासवर्ड मांगना" },
  },
];

const SAFE_OTP = /(is (your|the) (otp|one[- ]time password|verification code)|otp (for|to) (login|verify|your)|your .{0,30} code is)/i;
const SAFE_WARNING = /(do not|don'?t|never) share (it|this|the otp|otp|code)|किसी के साथ साझा न करें/i;

const SHORTENERS = new Set([
  "bit.ly", "tinyurl.com", "t.co", "goo.gl", "cutt.ly", "is.gd", "rb.gy", "shorturl.at", "tiny.cc", "ow.ly", "rebrand.ly",
  "t.ly", "s.id", "v.gd", "shorte.st", "bitly.ws", "u.to", "clck.ru", "qr.ae", "wa.link", "linktr.ee",
]);

const RISKY_TLDS = new Set([
  "xyz", "top", "online", "site", "click", "live", "buzz", "icu", "rest", "cyou", "sbs", "cfd", "tk", "ml", "ga", "cf", "gq",
  "work", "loan", "support", "help", "monster", "quest", "bond", "shop", "store", "vip", "win", "fun", "life", "info", "cc", "su", "lat",
]);

const BRANDS = [
  "sbi", "yono", "hdfc", "icici", "axisbank", "kotak", "pnb", "canara", "baroda", "paytm", "phonepe", "gpay", "googlepay", "bhim",
  "amazon", "flipkart", "indiapost", "fedex", "dhl", "bluedart", "irctc", "npci", "rbi", "uidai", "aadhaar", "aadhar", "incometax",
  "epfo", "bses", "airtel", "vodafone", "kbc", "whatsapp", "sebi", "licindia", "nsdl", "parivahan", "echallan",
];

const BANKING_BRANDS = new Set([
  "sbi", "yono", "hdfc", "icici", "axisbank", "kotak", "pnb", "canara", "baroda", "paytm", "phonepe", "gpay", "googlepay", "bhim",
  "npci", "rbi", "uidai", "aadhaar", "aadhar", "incometax", "epfo", "nsdl",
]);

const OFFICIAL_DOMAINS = [
  "sbi.co.in", "onlinesbi.sbi", "sbi", "hdfcbank.com", "icicibank.com", "axisbank.com", "kotak.com", "pnbindia.in", "canarabank.com",
  "bankofbaroda.in", "paytm.com", "phonepe.com", "pay.google.com", "bhimupi.org.in", "amazon.in", "amazon.com", "flipkart.com",
  "indiapost.gov.in", "fedex.com", "dhl.com", "bluedart.com", "irctc.co.in", "npci.org.in", "rbi.org.in", "uidai.gov.in",
  "incometax.gov.in", "epfindia.gov.in", "airtel.in", "jio.com", "myvi.in", "whatsapp.com", "sebi.gov.in", "licindia.in",
  "gov.in", "nic.in", "google.com", "youtube.com", "cyber-kavach.vercel.app",
  // RBI-mandated exclusive domains: only verified banks (.bank.in) / NBFCs (.fin.in) can register them
  "bank.in", "fin.in", "parivahan.gov.in",
];

const URL_RE = /\b((?:https?:\/\/|www\.)[^\s<>"')]+|(?:[a-z0-9-]+\.)+(?:[a-z]{2,24})(?:\/[^\s<>"')]*)?)/gi;

export function extractUrls(text: string): string[] {
  const found = new Set<string>();
  for (const m of text.matchAll(URL_RE)) {
    const raw = m[0].replace(/[.,;:!?]+$/, "");
    // Skip plain e-mail addresses and decimal numbers like 1.5
    if (/^\d+(\.\d+)+$/.test(raw)) continue;
    const idx = m.index ?? 0;
    if (idx > 0 && text[idx - 1] === "@") continue;
    if (!/[a-z]/i.test(raw.split(".").pop() || "")) continue;
    found.add(raw);
  }
  return [...found].slice(0, 10);
}

function hostOf(raw: string): string | null {
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `http://${raw}`);
    return u.hostname.toLowerCase();
  } catch {
    return null;
  }
}

function isOfficial(host: string): boolean {
  return OFFICIAL_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`));
}

type UrlFinding = { id: string; weight: number; label: Bilingual; scam?: string };

export function analyzeUrl(raw: string): UrlFinding[] {
  const out: UrlFinding[] = [];
  const host = hostOf(raw);
  if (!host) return out;
  const official = isOfficial(host);
  const tld = host.split(".").pop() || "";

  if (SHORTENERS.has(host)) {
    out.push({ id: "url_short", weight: 22, label: { en: `Shortened link hides the real destination (${host})`, hi: `छोटा लिंक असली पता छिपाता है (${host})` } });
  }
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    out.push({ id: "url_ip", weight: 35, label: { en: "Link points to a raw IP address instead of a domain", hi: "लिंक डोमेन के बजाय सीधे IP पते पर जाता है" } });
  }
  if (host.includes("xn--")) {
    out.push({ id: "url_puny", weight: 35, label: { en: "Look-alike characters in the domain (punycode)", hi: "डोमेन में मिलते-जुलते अक्षर (punycode)" } });
  }
  if (!official && RISKY_TLDS.has(tld)) {
    out.push({ id: "url_tld", weight: 24, label: { en: `Domain ends in .${tld}, common in scam sites`, hi: `डोमेन .${tld} पर ख़त्म होता है, जो स्कैम साइटों में आम है` } });
  }
  if (!official) {
    const compact = host
      .replace(/[-.]/g, "")
      .replace(/0/g, "o")
      .replace(/1/g, "i")
      .replace(/3/g, "e")
      .replace(/5/g, "s")
      .replace(/rn/g, "m");
    const brand = BRANDS.find((b) => compact.includes(b) || compact.replace(/i/g, "l").includes(b));
    if (brand) {
      out.push({
        id: "url_brand",
        weight: 45,
        label: { en: `Uses the name "${brand.toUpperCase()}" but is not its official website (${host})`, hi: `"${brand.toUpperCase()}" का नाम इस्तेमाल करता है पर आधिकारिक वेबसाइट नहीं है (${host})` },
        scam: ["fedex", "dhl", "bluedart", "indiapost"].includes(brand)
          ? "courier-parcel-scam"
          : ["parivahan", "echallan"].includes(brand)
            ? "e-challan-scam"
            : brand === "kbc"
            ? "lottery-prize-scam"
            : BANKING_BRANDS.has(brand)
              ? "kyc-update-scam"
              : undefined,
      });
    }
  }
  if (/^http:\/\//i.test(raw) && !official) {
    out.push({ id: "url_http", weight: 8, label: { en: "Not using a secure https connection", hi: "सुरक्षित https कनेक्शन नहीं" } });
  }
  if (raw.includes("@") && /^https?:\/\//i.test(raw)) {
    out.push({ id: "url_at", weight: 25, label: { en: "Contains '@', a trick to disguise the real website", hi: "'@' है, जो असली वेबसाइट छिपाने की चाल है" } });
  }
  if ((host.match(/-/g) || []).length >= 2 || host.split(".").length >= 5) {
    out.push({ id: "url_complex", weight: 10, label: { en: "Unusually long or hyphenated domain name", hi: "असामान्य रूप से लंबा या हाइफ़न वाला डोमेन" } });
  }
  if (/\.apk(\?|$)/i.test(raw)) {
    out.push({ id: "url_apk", weight: 40, label: { en: "Link downloads an Android APK file", hi: "लिंक Android APK फ़ाइल डाउनलोड करता है" }, scam: "kyc-update-scam" });
  }
  if (!official && host.includes("bank") && !out.some((f) => f.id === "url_brand")) {
    out.push({
      id: "url_not_bankin",
      weight: 22,
      label: {
        en: `Looks like a bank site but isn't on the official .bank.in domain (${host})`,
        hi: `बैंक साइट जैसा लगता है पर आधिकारिक .bank.in डोमेन पर नहीं है (${host})`,
      },
    });
  }
  if (!official && /(login|verify|secure|update|kyc|reward|claim|refund|signin|account)/.test(host)) {
    out.push({
      id: "url_phish_words",
      weight: 12,
      label: { en: "Domain uses phishing words like 'login', 'verify' or 'kyc'", hi: "डोमेन में 'login', 'verify' या 'kyc' जैसे फ़िशिंग शब्द" },
    });
  }
  if (official && out.length === 0) {
    out.push({ id: "url_official", weight: -15, label: { en: `Link goes to a known official domain (${host})`, hi: `लिंक ज्ञात आधिकारिक डोमेन पर जाता है (${host})` } });
  }
  return out;
}

export function verdictFor(score: number): Verdict {
  if (score >= 60) return "DANGEROUS";
  if (score >= 28) return "SUSPICIOUS";
  return "SAFE";
}

export function runRules(input: string, lang: Locale = "en"): RuleResult {
  const text = input.normalize("NFKC").slice(0, 8000);
  const signals: Signal[] = [];

  for (const rule of RULES) {
    if (rule.re.test(text)) signals.push({ id: rule.id, weight: rule.weight, label: rule.label[lang], scam: rule.scam });
  }

  const urls = extractUrls(text);
  const seen = new Set<string>();
  for (const url of urls) {
    for (const f of analyzeUrl(url)) {
      if (seen.has(f.id) && f.id !== "url_brand") continue;
      seen.add(f.id);
      signals.push({ id: f.id, weight: f.weight, label: f.label[lang], scam: f.scam });
    }
  }
  if (urls.length > 0 && signals.some((s) => s.weight >= 14 && !s.id.startsWith("url_"))) {
    signals.push({
      id: "link_with_pressure",
      weight: 14,
      label: lang === "hi" ? "दबाव वाले मैसेज के साथ लिंक भेजा गया" : "Combines a link with pressure tactics",
    });
  }

  if (SAFE_OTP.test(text) && SAFE_WARNING.test(text) && urls.length === 0) {
    signals.push({
      id: "standard_otp",
      weight: -30,
      label: lang === "hi" ? "सामान्य OTP मैसेज जिसमें 'साझा न करें' चेतावनी है" : "Standard OTP message with a 'do not share' warning",
    });
  }

  const raw = signals.reduce((sum, s) => sum + s.weight, 0);
  // Diminishing returns so many weak signals don't instantly max out the score
  const score = Math.max(0, Math.min(100, Math.round(raw <= 60 ? raw : 60 + (raw - 60) * 0.5)));

  const typeWeights = new Map<string, number>();
  for (const s of signals) if (s.scam && s.weight > 0) typeWeights.set(s.scam, (typeWeights.get(s.scam) || 0) + s.weight);
  const scamType = score >= 28 ? [...typeWeights.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null : null;

  return {
    score,
    verdict: verdictFor(score),
    signals: signals.filter((s) => s.weight > 0).sort((a, b) => b.weight - a.weight).concat(signals.filter((s) => s.weight <= 0)),
    scamType,
    urls,
  };
}
