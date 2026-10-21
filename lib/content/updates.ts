import type { Bilingual } from "../site";

/** Recent, verified changes in India's cyber-safety ecosystem — shown on home, /services and llms.txt. */
export type SafetyUpdate = { id: string; icon: string; when: string; title: Bilingual; body: Bilingual; tip: Bilingual; href?: string };

export const safetyUpdates: SafetyUpdate[] = [
  {
    id: "bank-in",
    icon: "globe",
    when: "2025",
    href: "https://www.rbi.org.in",
    title: { en: "Real bank websites end in .bank.in", hi: "असली बैंक वेबसाइट .bank.in पर ख़त्म होती हैं" },
    body: {
      en: "RBI directed banks to move their websites to the exclusive .bank.in domain (deadline 31 Oct 2025). Only verified banks can register it.",
      hi: "RBI ने बैंकों को अपनी वेबसाइट विशेष .bank.in डोमेन पर ले जाने का निर्देश दिया (समय-सीमा 31 अक्टूबर 2025)। इसे सिर्फ़ सत्यापित बैंक ही ले सकते हैं।",
    },
    tip: { en: "A 'bank' link ending in .xyz, .top or .com-something is a red flag.", hi: ".xyz, .top या अजीब .com वाला 'बैंक' लिंक ख़तरे का संकेत है।" },
  },
  {
    id: "1600",
    icon: "phone",
    when: "2026",
    href: "https://trai.gov.in",
    title: { en: "Genuine bank calls come from 1600-series numbers", hi: "असली बैंक कॉल 1600-सीरीज़ नंबरों से आते हैं" },
    body: {
      en: "TRAI reserves 1600xx numbers for service/transaction calls from RBI, SEBI, IRDAI and PFRDA-regulated entities and government. Promotional calls use the 140 series.",
      hi: "TRAI ने RBI, SEBI, IRDAI और PFRDA से विनियमित संस्थाओं और सरकार की सेवा/लेन-देन कॉल के लिए 1600xx नंबर तय किए हैं। प्रचार कॉल 140 सीरीज़ से आते हैं।",
    },
    tip: { en: "'Bank officer' calling from an ordinary 10-digit mobile number? Hang up.", hi: "साधारण 10 अंकों के मोबाइल से 'बैंक अधिकारी' का कॉल? फ़ोन काट दें।" },
  },
  {
    id: "valid-upi",
    icon: "badge-check",
    when: "Oct 2025",
    href: "https://siportal.sebi.gov.in/intermediary/sebi-check",
    title: { en: "@valid UPI IDs for brokers & mutual funds", hi: "ब्रोकर और म्यूचुअल फ़ंड के लिए @valid UPI ID" },
    body: {
      en: "SEBI-registered intermediaries collect money via UPI IDs ending in @valid (e.g. .brk@validbank) with a green thumbs-up icon. Verify any UPI ID or account on SEBI Check.",
      hi: "SEBI-रजिस्टर्ड संस्थाएं @valid वाली UPI ID (जैसे .brk@validbank) से पैसा लेती हैं और हरा थम्स-अप आइकन दिखता है। कोई भी UPI ID या खाता SEBI Check पर जांचें।",
    },
    tip: { en: "Investment 'expert' asking you to pay a personal UPI ID? It's a scam.", hi: "निवेश 'एक्सपर्ट' निजी UPI ID पर पैसे मांगे? यह स्कैम है।" },
  },
  {
    id: "ezero",
    icon: "file-check",
    when: "2025",
    href: "https://cybercrime.gov.in",
    title: { en: "e-Zero FIR for frauds above ₹10 lakh", hi: "₹10 लाख से अधिक की ठगी पर e-ज़ीरो FIR" },
    body: {
      en: "Complaints above ₹10 lakh on 1930 or cybercrime.gov.in are auto-registered as a Zero FIR (started in Delhi, being extended nationwide). Convert it to a regular FIR within 3 days.",
      hi: "1930 या cybercrime.gov.in पर ₹10 लाख से अधिक की शिकायत अपने आप ज़ीरो FIR बनती है (दिल्ली से शुरू, देशभर में विस्तार)। 3 दिन में इसे नियमित FIR में बदलवाएं।",
    },
    tip: { en: "Report big losses on 1930 immediately — the FIR follows automatically.", hi: "बड़ा नुकसान हो तो तुरंत 1930 पर शिकायत करें — FIR अपने आप दर्ज होगी।" },
  },
  {
    id: "sanchar-app",
    icon: "smartphone",
    when: "2026",
    href: "https://sancharsaathi.gov.in",
    title: { en: "Sanchar Saathi app: fraud help in your pocket", hi: "संचार साथी ऐप: जेब में फ्रॉड सहायता" },
    body: {
      en: "DoT's free Sanchar Saathi app lets you report fraud (Chakshu), see SIMs in your name, block a lost phone, verify a handset's IMEI and find genuine customer-care numbers.",
      hi: "DoT का मुफ़्त संचार साथी ऐप से फ्रॉड की शिकायत (चक्षु), अपने नाम के SIM देखना, खोया फ़ोन ब्लॉक करना, IMEI जांचना और असली कस्टमर-केयर नंबर पाना संभव है।",
    },
    tip: { en: "Use it to report a fraud number in under a minute.", hi: "एक मिनट से कम में फ्रॉड नंबर की शिकायत करें।" },
  },
  {
    id: "fri",
    icon: "shield",
    when: "May 2025",
    href: "https://sancharsaathi.gov.in",
    title: { en: "Banks now get a fraud-risk alert on numbers", hi: "बैंकों को अब नंबरों पर फ्रॉड-जोखिम अलर्ट मिलता है" },
    body: {
      en: "DoT's Financial Fraud Risk Indicator flags mobile numbers linked to fraud so banks and UPI apps can warn or block risky payments.",
      hi: "DoT का फ़ाइनेंशियल फ्रॉड रिस्क इंडिकेटर धोखाधड़ी से जुड़े मोबाइल नंबरों को चिह्नित करता है ताकि बैंक और UPI ऐप जोखिम भरे भुगतान पर चेतावनी दें या रोकें।",
    },
    tip: { en: "If your UPI app warns 'high risk' — stop and verify.", hi: "UPI ऐप 'हाई रिस्क' चेतावनी दे — रुकें और जांचें।" },
  },
];
