import type { Bilingual } from "../site";

export type HelpStep = { title: Bilingual; detail: Bilingual; href?: string; tel?: string; urgent?: boolean };
export type HelpSituation = { id: string; icon: string; label: Bilingual; steps: HelpStep[] };

const call1930: HelpStep = {
  urgent: true,
  tel: "1930",
  title: { en: "Call 1930 right now", hi: "अभी 1930 पर कॉल करें" },
  detail: {
    en: "The National Cyber Crime Helpline can alert banks to freeze the money before it is withdrawn. Keep transaction IDs (UTR), amounts, times and the scammer's UPI ID/account ready.",
    hi: "राष्ट्रीय साइबर अपराध हेल्पलाइन बैंकों को पैसा निकाले जाने से पहले फ्रीज़ करने के लिए सूचित कर सकती है। ट्रांज़ैक्शन ID (UTR), राशि, समय और ठग की UPI ID/खाता तैयार रखें।",
  },
};

const fileNcrp: HelpStep = {
  href: "https://cybercrime.gov.in",
  title: { en: "File a complaint on cybercrime.gov.in", hi: "cybercrime.gov.in पर शिकायत दर्ज करें" },
  detail: {
    en: "Choose 'Report Cyber Crime' → financial fraud. Upload screenshots, bank statements and chat records. Note the acknowledgement number.",
    hi: "'Report Cyber Crime' → वित्तीय धोखाधड़ी चुनें। स्क्रीनशॉट, बैंक स्टेटमेंट और चैट अपलोड करें। पावती नंबर नोट करें।",
  },
};

const evidence: HelpStep = {
  title: { en: "Save all evidence — don't delete chats", hi: "सारे सबूत सहेजें — चैट डिलीट न करें" },
  detail: {
    en: "Take screenshots of messages, call logs, profile pages, payment receipts, UPI IDs, websites and app names. Evidence is needed for police and bank claims.",
    hi: "मैसेज, कॉल लॉग, प्रोफ़ाइल, भुगतान रसीद, UPI ID, वेबसाइट और ऐप के नाम के स्क्रीनशॉट लें। पुलिस और बैंक दावों के लिए सबूत ज़रूरी हैं।",
  },
};

const recoveryScam: HelpStep = {
  title: { en: "Beware of 'recovery agents'", hi: "'रिकवरी एजेंट' से सावधान" },
  detail: {
    en: "Anyone who calls promising to recover your money for a fee is another scammer. Police and banks never charge to recover funds.",
    hi: "फ़ीस लेकर पैसा वापस दिलाने का वादा करने वाला भी ठग है। पुलिस और बैंक पैसा वापस दिलाने के लिए कोई शुल्क नहीं लेते।",
  },
};

export const helpSituations: HelpSituation[] = [
  {
    id: "money-lost",
    icon: "💸",
    label: { en: "I lost money (UPI, card or net banking)", hi: "मेरे पैसे चले गए (UPI, कार्ड या नेट बैंकिंग)" },
    steps: [
      call1930,
      {
        urgent: true,
        title: { en: "Block cards, UPI and net banking", hi: "कार्ड, UPI और नेट बैंकिंग ब्लॉक करें" },
        detail: {
          en: "Use your bank app or the customer-care number printed on your card/passbook (not one from Google). Ask the bank to raise a fraud dispute in writing.",
          hi: "बैंक ऐप या कार्ड/पासबुक पर छपे कस्टमर केयर नंबर का उपयोग करें (Google वाला नहीं)। बैंक से लिखित में फ्रॉड विवाद दर्ज करवाएं।",
        },
      },
      fileNcrp,
      evidence,
      {
        title: { en: "Report within 3 working days", hi: "3 कार्य-दिवसों में शिकायत करें" },
        detail: {
          en: "Under RBI rules, prompt reporting of unauthorised electronic transactions limits your liability. If the bank doesn't respond in 30 days, complain to the RBI Ombudsman.",
          hi: "RBI नियमों के अनुसार अनधिकृत इलेक्ट्रॉनिक लेन-देन की जल्दी शिकायत से आपकी देनदारी सीमित रहती है। बैंक 30 दिन में जवाब न दे तो RBI लोकपाल से शिकायत करें।",
        },
        href: "https://cms.rbi.org.in",
      },
      recoveryScam,
    ],
  },
  {
    id: "shared-details",
    icon: "🔑",
    label: { en: "I shared OTP, password or card details", hi: "मैंने OTP, पासवर्ड या कार्ड की जानकारी दे दी" },
    steps: [
      {
        urgent: true,
        title: { en: "Change passwords and MPIN immediately", hi: "तुरंत पासवर्ड और MPIN बदलें" },
        detail: {
          en: "Change net-banking password, UPI PIN, email password and any account where you reused that password. Use a different, trusted device if possible.",
          hi: "नेट-बैंकिंग पासवर्ड, UPI PIN, ईमेल पासवर्ड और जहां वही पासवर्ड इस्तेमाल किया हो, सब बदलें। हो सके तो दूसरे भरोसेमंद डिवाइस से करें।",
        },
      },
      {
        urgent: true,
        title: { en: "Block your card and freeze UPI", hi: "कार्ड ब्लॉक करें और UPI रोकें" },
        detail: {
          en: "Block the card in your bank app and request a new one. Check recent transactions for anything you don't recognise.",
          hi: "बैंक ऐप में कार्ड ब्लॉक करें और नया मंगवाएं। हाल के लेन-देन में कोई अनजान ट्रांज़ैक्शन देखें।",
        },
      },
      {
        title: { en: "Turn on extra protection", hi: "अतिरिक्त सुरक्षा चालू करें" },
        detail: {
          en: "Enable two-step verification on WhatsApp, email and social media, and set transaction limits in your bank app.",
          hi: "WhatsApp, ईमेल और सोशल मीडिया पर टू-स्टेप वेरिफ़िकेशन चालू करें और बैंक ऐप में लेन-देन सीमा सेट करें।",
        },
      },
      { ...call1930, urgent: false, title: { en: "If any money was debited, call 1930", hi: "पैसे कटे हों तो 1930 पर कॉल करें" } },
      {
        href: "https://sancharsaathi.gov.in/sfc/",
        title: { en: "Report the caller on Chakshu", hi: "कॉलर की शिकायत चक्षु पर करें" },
        detail: { en: "Report the number that asked for your details so it can be investigated and blocked.", hi: "जिस नंबर ने जानकारी मांगी उसकी शिकायत करें ताकि जांच और ब्लॉक हो सके।" },
      },
    ],
  },
  {
    id: "app-installed",
    icon: "📲",
    label: { en: "I installed an app / gave screen access", hi: "मैंने कोई ऐप इंस्टॉल किया / स्क्रीन एक्सेस दिया" },
    steps: [
      {
        urgent: true,
        title: { en: "Disconnect from the internet", hi: "इंटरनेट बंद करें" },
        detail: {
          en: "Turn on airplane mode immediately so the scammer loses remote access and can't read new OTPs.",
          hi: "तुरंत एयरप्लेन मोड चालू करें ताकि ठग का रिमोट एक्सेस बंद हो जाए और वह नए OTP न पढ़ सके।",
        },
      },
      {
        urgent: true,
        title: { en: "Uninstall the app", hi: "ऐप अनइंस्टॉल करें" },
        detail: {
          en: "Remove AnyDesk/TeamViewer/unknown APKs. If an app can't be removed, check Settings → Security → Device admin apps and revoke it first.",
          hi: "AnyDesk/TeamViewer/अनजान APK हटाएं। अगर ऐप न हटे तो पहले सेटिंग्स → सिक्योरिटी → डिवाइस एडमिन ऐप में जाकर अनुमति हटाएं।",
        },
      },
      {
        title: { en: "Secure banking from another device", hi: "दूसरे डिवाइस से बैंकिंग सुरक्षित करें" },
        detail: {
          en: "Call your bank to block cards/UPI and change all banking and email passwords from a different phone or computer.",
          hi: "बैंक को कॉल करके कार्ड/UPI ब्लॉक करवाएं और दूसरे फ़ोन या कंप्यूटर से सभी बैंकिंग और ईमेल पासवर्ड बदलें।",
        },
      },
      {
        title: { en: "Factory reset if unsure", hi: "संदेह हो तो फ़ैक्टरी रीसेट करें" },
        detail: {
          en: "Back up photos and contacts, then factory-reset the phone if malicious apps keep coming back.",
          hi: "फ़ोटो और संपर्क का बैकअप लें, फिर नुकसानदेह ऐप बार-बार आएं तो फ़ोन फ़ैक्टरी रीसेट करें।",
        },
      },
      { ...call1930, urgent: false, title: { en: "If money was debited, call 1930", hi: "पैसे कटे हों तो 1930 पर कॉल करें" } },
    ],
  },
  {
    id: "blackmail",
    icon: "🛑",
    label: { en: "I'm being blackmailed or threatened", hi: "मुझे ब्लैकमेल किया जा रहा है या धमकाया जा रहा है" },
    steps: [
      {
        urgent: true,
        title: { en: "Don't pay and stop replying", hi: "पैसे न दें और जवाब देना बंद करें" },
        detail: {
          en: "Payment almost always leads to more demands. Block the account after saving evidence.",
          hi: "भुगतान से लगभग हमेशा और मांगें होती हैं। सबूत सहेजने के बाद अकाउंट ब्लॉक करें।",
        },
      },
      evidence,
      {
        href: "https://cybercrime.gov.in",
        title: { en: "Report on cybercrime.gov.in", hi: "cybercrime.gov.in पर शिकायत करें" },
        detail: {
          en: "Use 'Report Women/Child Related Crime' — an anonymous option is available. Men can report under 'Report Other Cyber Crime'.",
          hi: "'महिला/बाल संबंधित अपराध' विकल्प का उपयोग करें — गुमनाम शिकायत संभव है। पुरुष 'अन्य साइबर अपराध' में शिकायत कर सकते हैं।",
        },
      },
      {
        href: "https://stopncii.org",
        title: { en: "Stop images spreading with StopNCII", hi: "StopNCII से तस्वीरें फैलने से रोकें" },
        detail: {
          en: "StopNCII.org creates a digital fingerprint of the image on your device so major platforms can block it — the image itself is never uploaded.",
          hi: "StopNCII.org आपके डिवाइस पर ही तस्वीर का डिजिटल फ़िंगरप्रिंट बनाता है ताकि बड़े प्लेटफ़ॉर्म उसे ब्लॉक कर सकें — तस्वीर अपलोड नहीं होती।",
        },
      },
      {
        tel: "181",
        title: { en: "Get support: 181 (women) or 112", hi: "सहायता लें: 181 (महिलाएं) या 112" },
        detail: { en: "If you feel unsafe or threatened physically, call 112 immediately.", hi: "अगर आप असुरक्षित महसूस करें या शारीरिक धमकी हो, तो तुरंत 112 पर कॉल करें।" },
      },
    ],
  },
  {
    id: "identity",
    icon: "🪪",
    label: { en: "My Aadhaar, PAN or SIM is being misused", hi: "मेरे आधार, PAN या SIM का दुरुपयोग हो रहा है" },
    steps: [
      {
        urgent: true,
        href: "https://myaadhaar.uidai.gov.in",
        title: { en: "Lock Aadhaar biometrics", hi: "आधार बायोमेट्रिक लॉक करें" },
        detail: {
          en: "Lock biometrics on myAadhaar or the mAadhaar app, and check your authentication history for unknown use. UIDAI helpline: 1947.",
          hi: "myAadhaar या mAadhaar ऐप पर बायोमेट्रिक लॉक करें और अनजान उपयोग के लिए ऑथेंटिकेशन इतिहास देखें। UIDAI हेल्पलाइन: 1947।",
        },
      },
      {
        href: "https://tafcop.sancharsaathi.gov.in/",
        title: { en: "Check SIMs issued in your name", hi: "अपने नाम पर जारी SIM जांचें" },
        detail: {
          en: "On Sanchar Saathi (TAFCOP), see all mobile numbers linked to your ID and request disconnection of ones that aren't yours.",
          hi: "संचार साथी (TAFCOP) पर अपनी ID से जुड़े सभी मोबाइल नंबर देखें और जो आपके नहीं हैं उन्हें बंद करवाएं।",
        },
      },
      {
        title: { en: "Check your credit report", hi: "अपनी क्रेडिट रिपोर्ट जांचें" },
        detail: {
          en: "Look for loans or credit cards you didn't apply for in your free annual credit report from a credit bureau, and dispute them.",
          hi: "क्रेडिट ब्यूरो की मुफ़्त वार्षिक क्रेडिट रिपोर्ट में ऐसे लोन या कार्ड देखें जिनके लिए आपने आवेदन नहीं किया, और विवाद दर्ज करें।",
        },
      },
      fileNcrp,
    ],
  },
  {
    id: "account-hacked",
    icon: "🔓",
    label: { en: "My WhatsApp, email or social media was hacked", hi: "मेरा WhatsApp, ईमेल या सोशल मीडिया हैक हो गया" },
    steps: [
      {
        urgent: true,
        title: { en: "Warn your contacts", hi: "अपने संपर्कों को सावधान करें" },
        detail: {
          en: "Tell friends and family through another channel not to send money or OTPs to 'you'. Hackers often ask contacts for urgent money.",
          hi: "दूसरे माध्यम से दोस्तों और परिवार को बताएं कि 'आपके' नाम पर पैसे या OTP न भेजें। हैकर अक्सर संपर्कों से तुरंत पैसे मांगते हैं।",
        },
      },
      {
        urgent: true,
        title: { en: "Recover the account", hi: "अकाउंट वापस पाएं" },
        detail: {
          en: "For WhatsApp, re-register your number to log the hacker out. For email/social media, use the official 'forgot password' / 'hacked account' recovery flow.",
          hi: "WhatsApp के लिए अपना नंबर दोबारा रजिस्टर करें ताकि हैकर लॉग आउट हो जाए। ईमेल/सोशल मीडिया के लिए आधिकारिक 'पासवर्ड भूल गए' / 'हैक्ड अकाउंट' प्रक्रिया अपनाएं।",
        },
      },
      {
        title: { en: "Turn on two-step verification", hi: "टू-स्टेप वेरिफ़िकेशन चालू करें" },
        detail: {
          en: "Set a WhatsApp PIN and enable 2-factor authentication on email and social accounts. Never share 6-digit codes received by SMS.",
          hi: "WhatsApp PIN सेट करें और ईमेल व सोशल अकाउंट पर 2-फ़ैक्टर ऑथेंटिकेशन चालू करें। SMS से आए 6 अंकों के कोड कभी साझा न करें।",
        },
      },
      fileNcrp,
    ],
  },
];
