import type { Bilingual } from "../site";

export type ServiceCategory = "report" | "verify" | "protect" | "learn";

export type Resource = {
  id: string;
  url: string;
  category: ServiceCategory;
  icon: string; // Icon name from components/Icon
  org: string; // issuing body
  name: Bilingual;
  desc: Bilingual;
  phone?: string;
  isNew?: boolean;
  app?: { android?: string; ios?: string };
};

export const serviceCategories: { id: ServiceCategory; icon: string; title: Bilingual; desc: Bilingual }[] = [
  {
    id: "report",
    icon: "siren",
    title: { en: "Report & complain", hi: "शिकायत करें" },
    desc: { en: "File a cyber crime, fraud, banking or investment complaint.", hi: "साइबर अपराध, धोखाधड़ी, बैंकिंग या निवेश की शिकायत दर्ज करें।" },
  },
  {
    id: "verify",
    icon: "search-check",
    title: { en: "Check & verify", hi: "जांचें और पुष्टि करें" },
    desc: { en: "Verify numbers, UPI IDs, SIMs, phones and advisers before you trust them.", hi: "भरोसा करने से पहले नंबर, UPI ID, SIM, फ़ोन और सलाहकार की जांच करें।" },
  },
  {
    id: "protect",
    icon: "lock",
    title: { en: "Protect yourself", hi: "ख़ुद को सुरक्षित रखें" },
    desc: { en: "Free government tools to lock, block and clean your devices and identity.", hi: "डिवाइस और पहचान को लॉक, ब्लॉक और साफ़ करने के मुफ़्त सरकारी टूल।" },
  },
  {
    id: "learn",
    icon: "graduation",
    title: { en: "Learn & stay aware", hi: "सीखें और जागरूक रहें" },
    desc: { en: "Official awareness programmes, alerts and advisories.", hi: "आधिकारिक जागरूकता कार्यक्रम, अलर्ट और सलाह।" },
  },
];

export const resources: Resource[] = [
  /* ---------------- REPORT ---------------- */
  {
    id: "ncrp",
    category: "report",
    icon: "landmark",
    org: "I4C · MHA",
    url: "https://cybercrime.gov.in",
    phone: "1930",
    name: { en: "National Cyber Crime Reporting Portal", hi: "राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल" },
    desc: {
      en: "File a complaint for any cyber crime or online financial fraud. Call 1930 first if money was lost — it can freeze the scammer's account.",
      hi: "किसी भी साइबर अपराध या ऑनलाइन वित्तीय धोखाधड़ी की शिकायत करें। पैसे गए हों तो पहले 1930 पर कॉल करें — ठग का खाता फ्रीज़ हो सकता है।",
    },
  },
  {
    id: "ezerofir",
    category: "report",
    icon: "file-check",
    org: "I4C · MHA",
    url: "https://cybercrime.gov.in",
    isNew: true,
    name: { en: "e-Zero FIR (frauds above ₹10 lakh)", hi: "e-ज़ीरो FIR (₹10 लाख से अधिक की ठगी)" },
    desc: {
      en: "Financial cyber-fraud complaints above ₹10 lakh made on 1930 or cybercrime.gov.in are automatically registered as a Zero FIR. Visit the cyber police station within 3 days to convert it into a regular FIR. Launched in Delhi in 2025 and being extended nationwide.",
      hi: "1930 या cybercrime.gov.in पर ₹10 लाख से अधिक की वित्तीय साइबर ठगी की शिकायत अपने आप ज़ीरो FIR बन जाती है। 3 दिन में साइबर थाने जाकर इसे नियमित FIR में बदलवाएं। 2025 में दिल्ली से शुरू, देशभर में विस्तार हो रहा है।",
    },
  },
  {
    id: "chakshu",
    category: "report",
    icon: "eye",
    org: "DoT · Sanchar Saathi",
    url: "https://sancharsaathi.gov.in/sfc/",
    name: { en: "Chakshu — report fraud calls, SMS & WhatsApp", hi: "चक्षु — फ्रॉड कॉल, SMS और WhatsApp की शिकायत" },
    desc: {
      en: "Report suspected fraud communication (fake KYC, impersonation, phishing links) even if you didn't lose money. Lakhs of fraud numbers have been disconnected based on citizen reports.",
      hi: "पैसा न गया हो तब भी संदिग्ध फ्रॉड कॉल/मैसेज (नकली KYC, नकली अधिकारी, फ़िशिंग लिंक) की शिकायत करें। नागरिकों की शिकायतों पर लाखों फ्रॉड नंबर बंद हुए हैं।",
    },
    app: { android: "https://play.google.com/store/apps/details?id=com.dot.app.sancharsaathi" },
  },
  {
    id: "rbiCms",
    category: "report",
    icon: "bank",
    org: "Reserve Bank of India",
    url: "https://cms.rbi.org.in",
    name: { en: "RBI Ombudsman (CMS)", hi: "RBI लोकपाल (CMS)" },
    desc: {
      en: "Escalate if your bank, wallet or NBFC does not resolve a fraud or unauthorised-transaction complaint within 30 days. Free of cost.",
      hi: "अगर बैंक, वॉलेट या NBFC 30 दिनों में धोखाधड़ी/अनधिकृत लेन-देन की शिकायत हल न करे तो यहां शिकायत करें। बिल्कुल मुफ़्त।",
    },
  },
  {
    id: "npci",
    category: "report",
    icon: "wallet",
    org: "NPCI",
    url: "https://www.npci.org.in/what-we-do/upi/dispute-redressal-mechanism",
    name: { en: "NPCI UPI dispute redressal", hi: "NPCI UPI विवाद निवारण" },
    desc: {
      en: "Raise a UPI transaction dispute after first complaining in your UPI app and to your bank.",
      hi: "UPI ऐप और बैंक में पहले शिकायत करने के बाद UPI लेन-देन विवाद दर्ज करें।",
    },
  },
  {
    id: "sebi",
    category: "report",
    icon: "chart",
    org: "SEBI",
    url: "https://scores.sebi.gov.in",
    name: { en: "SEBI SCORES", hi: "SEBI SCORES" },
    desc: { en: "Complaints against stock brokers, investment advisers, mutual funds and investment fraud.", hi: "स्टॉक ब्रोकर, निवेश सलाहकार, म्यूचुअल फ़ंड और निवेश धोखाधड़ी की शिकायतें।" },
  },
  {
    id: "sachet",
    category: "report",
    icon: "alert",
    org: "Reserve Bank of India",
    url: "https://sachet.rbi.org.in",
    name: { en: "RBI Sachet", hi: "RBI सचेत" },
    desc: { en: "Report illegal deposit schemes, ponzi/chit-fund scams and unregistered lenders or loan apps.", hi: "अवैध जमा योजनाएं, पोंज़ी/चिट-फ़ंड स्कैम और अपंजीकृत ऋणदाता या लोन ऐप की शिकायत करें।" },
  },
  {
    id: "bimaBharosa",
    category: "report",
    icon: "umbrella",
    org: "IRDAI",
    url: "https://bimabharosa.irdai.gov.in",
    name: { en: "Bima Bharosa (insurance complaints)", hi: "बीमा भरोसा (बीमा शिकायतें)" },
    desc: { en: "Complain about fake insurance policies, mis-selling calls and insurance fraud.", hi: "नकली बीमा पॉलिसी, ग़लत तरीके से बेचने वाले कॉल और बीमा धोखाधड़ी की शिकायत करें।" },
  },
  {
    id: "nch",
    category: "report",
    icon: "cart",
    org: "Dept. of Consumer Affairs",
    url: "https://consumerhelpline.gov.in",
    phone: "1915",
    name: { en: "National Consumer Helpline", hi: "राष्ट्रीय उपभोक्ता हेल्पलाइन" },
    desc: { en: "Fake shopping websites, undelivered orders and refund disputes.", hi: "नकली शॉपिंग वेबसाइट, ऑर्डर न मिलना और रिफंड विवाद।" },
  },
  {
    id: "cert",
    category: "report",
    icon: "shield",
    org: "CERT-In · MeitY",
    url: "https://www.cert-in.org.in",
    name: { en: "CERT-In incident reporting", hi: "CERT-In घटना रिपोर्टिंग" },
    desc: { en: "Report hacking, ransomware, website defacement and other technical security incidents.", hi: "हैकिंग, रैनसमवेयर, वेबसाइट डिफ़ेसमेंट और अन्य तकनीकी सुरक्षा घटनाओं की रिपोर्ट करें।" },
  },
  {
    id: "ncw",
    category: "report",
    icon: "user-shield",
    org: "NCW",
    url: "https://www.ncw.gov.in",
    phone: "181",
    name: { en: "National Commission for Women", hi: "राष्ट्रीय महिला आयोग" },
    desc: { en: "Support for women facing online harassment, stalking, morphing or sextortion.", hi: "ऑनलाइन उत्पीड़न, स्टॉकिंग, फ़ोटो मॉर्फ़िंग या सेक्सटॉर्शन का सामना कर रही महिलाओं के लिए।" },
  },
  {
    id: "pgportal",
    category: "report",
    icon: "inbox",
    org: "DARPG",
    url: "https://pgportal.gov.in",
    name: { en: "CPGRAMS public grievance portal", hi: "CPGRAMS लोक शिकायत पोर्टल" },
    desc: { en: "Escalate if a government office does not act on your complaint.", hi: "अगर कोई सरकारी कार्यालय आपकी शिकायत पर कार्रवाई न करे तो यहां शिकायत करें।" },
  },

  /* ---------------- VERIFY ---------------- */
  {
    id: "suspect",
    category: "verify",
    icon: "search",
    org: "I4C · MHA",
    url: "https://cybercrime.gov.in/Webform/suspect_search_repository.aspx",
    name: { en: "Check a suspect number, UPI ID or account", hi: "संदिग्ध नंबर, UPI ID या खाता जांचें" },
    desc: {
      en: "Search I4C's national suspect registry for phone numbers, UPI IDs, bank accounts and websites already reported for fraud.",
      hi: "I4C की राष्ट्रीय संदिग्ध सूची में धोखाधड़ी के लिए पहले से रिपोर्ट किए गए फ़ोन नंबर, UPI ID, बैंक खाते और वेबसाइट खोजें।",
    },
  },
  {
    id: "sebiCheck",
    category: "verify",
    icon: "badge-check",
    org: "SEBI",
    url: "https://siportal.sebi.gov.in/intermediary/sebi-check",
    isNew: true,
    name: { en: "SEBI Check & @valid UPI handles", hi: "SEBI Check और @valid UPI हैंडल" },
    desc: {
      en: "Before paying a broker or mutual fund, verify their UPI ID or bank account on SEBI Check. Registered intermediaries use UPI IDs ending in @valid (e.g. name.brk@validbank) and show a green thumbs-up icon in your UPI app.",
      hi: "ब्रोकर या म्यूचुअल फ़ंड को भुगतान से पहले SEBI Check पर उनकी UPI ID या बैंक खाता जांचें। रजिस्टर्ड संस्थाएं @valid वाली UPI ID (जैसे name.brk@validbank) इस्तेमाल करती हैं और UPI ऐप में हरा थम्स-अप आइकन दिखता है।",
    },
  },
  {
    id: "sancharSaathi",
    category: "verify",
    icon: "smartphone",
    org: "DoT",
    url: "https://sancharsaathi.gov.in",
    name: { en: "Sanchar Saathi portal & app", hi: "संचार साथी पोर्टल और ऐप" },
    desc: {
      en: "One place to report fraud (Chakshu), see SIMs in your name, block a lost phone, check if a handset is genuine (IMEI), and find genuine customer-care numbers of banks.",
      hi: "एक ही जगह फ्रॉड की शिकायत (चक्षु), अपने नाम के SIM देखें, खोया फ़ोन ब्लॉक करें, हैंडसेट असली है या नहीं (IMEI) जांचें और बैंकों के असली कस्टमर-केयर नंबर पाएं।",
    },
    app: { android: "https://play.google.com/store/apps/details?id=com.dot.app.sancharsaathi" },
  },
  {
    id: "tafcop",
    category: "verify",
    icon: "sim",
    org: "DoT · Sanchar Saathi",
    url: "https://tafcop.sancharsaathi.gov.in/",
    name: { en: "Know mobile connections in your name (TAFCOP)", hi: "आपके नाम के मोबाइल कनेक्शन (TAFCOP)" },
    desc: { en: "See every SIM issued on your ID and mark unknown ones as 'Not my number' to get them disconnected.", hi: "आपकी ID पर जारी हर SIM देखें और अनजान नंबर को 'मेरा नंबर नहीं' चुनकर बंद करवाएं।" },
  },
  {
    id: "echallan",
    category: "verify",
    icon: "file-check",
    org: "MoRTH · Parivahan",
    url: "https://echallan.parivahan.gov.in",
    name: { en: "e-Challan — check a traffic challan", hi: "ई-चालान — ट्रैफ़िक चालान जांचें" },
    desc: {
      en: "Verify whether a traffic fine is genuine by searching your vehicle, challan or DL number. Pay only here or in the mParivahan app — never through SMS links.",
      hi: "वाहन, चालान या DL नंबर से जांचें कि ट्रैफ़िक जुर्माना असली है या नहीं। भुगतान सिर्फ़ यहीं या mParivahan ऐप में करें — SMS लिंक से कभी नहीं।",
    },
  },
  {
    id: "csk",
    category: "protect",
    icon: "bug",
    org: "CERT-In",
    url: "https://www.csk.gov.in/security-tools.html",
    name: { en: "Cyber Swachhta Kendra — free bot & malware removal", hi: "साइबर स्वच्छता केंद्र — मुफ़्त बॉट और मैलवेयर हटाने के टूल" },
    desc: {
      en: "Free government-endorsed tools to scan and clean malware and botnet infections from Windows PCs and Android phones.",
      hi: "Windows PC और Android फ़ोन से मैलवेयर और बॉटनेट संक्रमण हटाने के मुफ़्त सरकारी-समर्थित टूल।",
    },
  },

  /* ---------------- PROTECT ---------------- */
  {
    id: "ceir",
    category: "protect",
    icon: "phone-off",
    org: "DoT · CEIR",
    url: "https://www.ceir.gov.in",
    name: { en: "CEIR — block a lost or stolen phone", hi: "CEIR — खोया/चोरी फ़ोन ब्लॉक करें" },
    desc: { en: "Block your lost phone's IMEI on all networks so it can't be misused, and unblock it if recovered.", hi: "खोए फ़ोन का IMEI सभी नेटवर्क पर ब्लॉक करें ताकि दुरुपयोग न हो, मिलने पर अनब्लॉक करें।" },
  },
  {
    id: "uidai",
    category: "protect",
    icon: "fingerprint",
    org: "UIDAI",
    url: "https://myaadhaar.uidai.gov.in",
    phone: "1947",
    name: { en: "myAadhaar — lock biometrics", hi: "myAadhaar — बायोमेट्रिक लॉक करें" },
    desc: { en: "Lock your Aadhaar biometrics to stop AePS fraud, and check your authentication history for misuse.", hi: "AePS धोखाधड़ी रोकने के लिए आधार बायोमेट्रिक लॉक करें और दुरुपयोग के लिए ऑथेंटिकेशन इतिहास देखें।" },
  },
  {
    id: "dnd",
    category: "protect",
    icon: "bell-off",
    org: "TRAI",
    url: "https://trai.gov.in",
    phone: "1909",
    name: { en: "TRAI DND — stop spam calls & SMS", hi: "TRAI DND — स्पैम कॉल और SMS रोकें" },
    desc: {
      en: "Register Do-Not-Disturb preferences via 1909 or the TRAI DND app. Promotional calls now come only from 140-series numbers; genuine bank/insurance service calls use 1600-series numbers.",
      hi: "1909 या TRAI DND ऐप से डू-नॉट-डिस्टर्ब चुनें। प्रचार कॉल अब सिर्फ़ 140-सीरीज़ नंबरों से आते हैं; असली बैंक/बीमा सेवा कॉल 1600-सीरीज़ नंबरों से आते हैं।",
    },
  },
  {
    id: "stopncii",
    category: "protect",
    icon: "image-off",
    org: "StopNCII.org",
    url: "https://stopncii.org",
    name: { en: "StopNCII.org", hi: "StopNCII.org" },
    desc: { en: "Free tool to stop intimate images being shared on major social platforms — the image never leaves your device.", hi: "बड़े सोशल प्लेटफ़ॉर्म पर निजी तस्वीरें फैलने से रोकने का मुफ़्त टूल — तस्वीर आपके डिवाइस से बाहर नहीं जाती।" },
  },

  /* ---------------- LEARN ---------------- */
  {
    id: "cyberdost",
    category: "learn",
    icon: "megaphone",
    org: "I4C · MHA",
    url: "https://x.com/Cyberdost",
    name: { en: "CyberDost (I4C awareness)", hi: "साइबर दोस्त (I4C जागरूकता)" },
    desc: { en: "The Home Ministry's official awareness handle with alerts on new scams and safety tips.", hi: "गृह मंत्रालय का आधिकारिक जागरूकता हैंडल — नए स्कैम के अलर्ट और सुरक्षा टिप्स।" },
  },
  {
    id: "cyberaware",
    category: "learn",
    icon: "book",
    org: "I4C · MHA",
    url: "https://www.cybercrime.gov.in/Webform/CyberAware.aspx",
    name: { en: "Cyber Awareness (cybercrime.gov.in)", hi: "साइबर जागरूकता (cybercrime.gov.in)" },
    desc: { en: "Official handbooks, posters and videos on staying safe online, from I4C.", hi: "I4C की ओर से ऑनलाइन सुरक्षा पर आधिकारिक पुस्तिकाएं, पोस्टर और वीडियो।" },
  },
  {
    id: "rbikehtahai",
    category: "learn",
    icon: "bank",
    org: "Reserve Bank of India",
    url: "https://rbikehtahai.rbi.org.in",
    name: { en: "RBI Kehta Hai", hi: "RBI कहता है" },
    desc: { en: "RBI's public awareness campaign on safe digital banking, KYC fraud and your rights as a bank customer.", hi: "सुरक्षित डिजिटल बैंकिंग, KYC धोखाधड़ी और बैंक ग्राहक के अधिकारों पर RBI का जागरूकता अभियान।" },
  },
  {
    id: "isea",
    category: "learn",
    icon: "graduation",
    org: "MeitY · ISEA",
    url: "https://www.staysafeonline.in",
    name: { en: "Stay Safe Online (ISEA, MeitY)", hi: "स्टे सेफ़ ऑनलाइन (ISEA, MeitY)" },
    desc: { en: "Free cyber-hygiene lessons, quizzes and material for students, parents, seniors and teachers.", hi: "छात्रों, अभिभावकों, बुज़ुर्गों और शिक्षकों के लिए मुफ़्त साइबर सुरक्षा पाठ, क्विज़ और सामग्री।" },
  },
  {
    id: "certAdvisories",
    category: "learn",
    icon: "alert",
    org: "CERT-In · MeitY",
    url: "https://www.cert-in.org.in",
    name: { en: "CERT-In advisories", hi: "CERT-In सलाह" },
    desc: { en: "Official alerts on new vulnerabilities, malware campaigns and how to stay protected.", hi: "नई कमज़ोरियों, मैलवेयर अभियानों और सुरक्षा उपायों पर आधिकारिक अलर्ट।" },
  },
  {
    id: "nodal",
    category: "learn",
    icon: "users",
    org: "I4C · MHA",
    url: "https://cybercrime.gov.in/Webform/Crime_NodalGrivanceList.aspx",
    name: { en: "State cyber nodal & grievance officers", hi: "राज्य साइबर नोडल और शिकायत अधिकारी" },
    desc: { en: "Contact list of state/UT nodal officers to follow up on a pending cyber crime complaint.", hi: "लंबित साइबर अपराध शिकायत पर फ़ॉलो-अप के लिए राज्य/UT नोडल अधिकारियों की सूची।" },
  },
];

export function getResource(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}
