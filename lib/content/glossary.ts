import type { Bilingual } from "../site";

/** Plain-language cyber-safety glossary. Definitions are general awareness explanations, not legal definitions. */
export type GlossaryTerm = { id: string; term: Bilingual; def: Bilingual; link?: string };

export const glossary: GlossaryTerm[] = [
  {
    id: "phishing",
    term: { en: "Phishing", hi: "फ़िशिंग" },
    def: {
      en: "A trick where criminals pretend to be a trusted bank, company or government office — usually through a fake website, email or message — to steal passwords, card details or OTPs.",
      hi: "एक धोखा जिसमें अपराधी किसी भरोसेमंद बैंक, कंपनी या सरकारी दफ़्तर का रूप लेकर — आमतौर पर नकली वेबसाइट, ईमेल या मैसेज से — पासवर्ड, कार्ड की जानकारी या OTP चुराते हैं।",
    },
    link: "/link-checker",
  },
  {
    id: "smishing",
    term: { en: "Smishing", hi: "स्मिशिंग" },
    def: {
      en: "Phishing through SMS. A text message (for example a fake KYC, electricity-bill or parcel alert) pushes you to click a link or call a number.",
      hi: "SMS के ज़रिए फ़िशिंग। नकली KYC, बिजली बिल या पार्सल अलर्ट जैसा मैसेज आपको लिंक पर क्लिक करने या किसी नंबर पर कॉल करने को कहता है।",
    },
    link: "/scam-message-checker",
  },
  {
    id: "vishing",
    term: { en: "Vishing", hi: "विशिंग" },
    def: {
      en: "Voice phishing: a phone call in which the caller poses as a bank officer, police or customer care to get OTPs, PINs or a money transfer.",
      hi: "वॉयस फ़िशिंग: फ़ोन कॉल जिसमें कॉलर बैंक अधिकारी, पुलिस या कस्टमर केयर बनकर OTP, PIN या पैसे ट्रांसफ़र करवाता है।",
    },
    link: "/fraud-number-checker",
  },
  {
    id: "quishing",
    term: { en: "Quishing (QR code phishing)", hi: "क्विशिंग (QR कोड फ़िशिंग)" },
    def: {
      en: "A scam using a QR code that opens a fake website or a UPI payment screen. Scanning a UPI QR code and entering your PIN always sends money — it never receives it.",
      hi: "QR कोड से होने वाला स्कैम जो नकली वेबसाइट या UPI भुगतान स्क्रीन खोलता है। UPI QR स्कैन करके PIN डालने से हमेशा पैसा जाता है — कभी आता नहीं।",
    },
    link: "/qr-code-scam-checker",
  },
  {
    id: "spoofing",
    term: { en: "Spoofing", hi: "स्पूफ़िंग" },
    def: {
      en: "Faking the caller ID, email address, sender name or website so that a message appears to come from someone you trust.",
      hi: "कॉलर ID, ईमेल पता, भेजने वाले का नाम या वेबसाइट को नकली बनाना ताकि मैसेज किसी भरोसेमंद व्यक्ति से आया लगे।",
    },
  },
  {
    id: "mule-account",
    term: { en: "Mule account", hi: "म्यूल खाता" },
    def: {
      en: "A bank account used by criminals to receive and move stolen money, often opened or rented in someone else's name. Lending or selling your bank account for 'commission' can make you part of a crime.",
      hi: "अपराधियों द्वारा चोरी का पैसा लेने और आगे भेजने के लिए इस्तेमाल किया जाने वाला बैंक खाता, अक्सर किसी और के नाम पर खुला या किराये पर लिया गया। 'कमीशन' के लिए अपना खाता देना या बेचना आपको अपराध में शामिल कर सकता है।",
    },
  },
  {
    id: "sim-swap",
    term: { en: "SIM swap fraud", hi: "SIM स्वैप फ्रॉड" },
    def: {
      en: "Criminals get a duplicate SIM for your mobile number, so they receive your OTPs and calls. A sudden loss of network for a long time is a warning sign — contact your operator and bank immediately.",
      hi: "अपराधी आपके मोबाइल नंबर की डुप्लीकेट SIM निकलवा लेते हैं, जिससे आपके OTP और कॉल उन्हें मिलने लगते हैं। लंबे समय तक अचानक नेटवर्क चले जाना चेतावनी है — तुरंत ऑपरेटर और बैंक से संपर्क करें।",
    },
  },
  {
    id: "digital-arrest",
    term: { en: "Digital arrest", hi: "डिजिटल अरेस्ट" },
    def: {
      en: "A scam in which fraudsters posing as police, CBI, ED or customs keep a victim on a video call and demand money. There is no such thing as 'digital arrest' in Indian law.",
      hi: "एक स्कैम जिसमें पुलिस, CBI, ED या कस्टम बने ठग पीड़ित को वीडियो कॉल पर रखकर पैसे मांगते हैं। भारतीय कानून में 'डिजिटल अरेस्ट' जैसा कुछ नहीं है।",
    },
    link: "/scams/digital-arrest-scam",
  },
  {
    id: "sextortion",
    term: { en: "Sextortion", hi: "सेक्सटॉर्शन" },
    def: {
      en: "Blackmail using intimate or morphed images or videos, with threats to share them unless money is paid. Do not pay; save evidence and report.",
      hi: "निजी या एडिट की गई तस्वीरों/वीडियो से ब्लैकमेल, पैसे न देने पर उन्हें फैलाने की धमकी। पैसे न दें; सबूत सहेजें और शिकायत करें।",
    },
    link: "/scams/sextortion-video-call-scam",
  },
  {
    id: "deepfake",
    term: { en: "Deepfake", hi: "डीपफ़ेक" },
    def: {
      en: "A fake video, image or voice made with AI to look or sound like a real person. Used in investment ads with celebrity faces and in 'family emergency' voice-clone calls.",
      hi: "AI से बनाया नकली वीडियो, फ़ोटो या आवाज़ जो किसी असली व्यक्ति जैसा दिखे या सुनाई दे। सेलिब्रिटी चेहरों वाले निवेश विज्ञापनों और 'परिवार की इमरजेंसी' वाले वॉयस-क्लोन कॉल में इस्तेमाल होता है।",
    },
    link: "/scams/ai-voice-clone-scam",
  },
  {
    id: "malware",
    term: { en: "Malware", hi: "मैलवेयर" },
    def: {
      en: "Harmful software that can steal data, read your SMS (including OTPs), show fake screens or lock your device. Often spread through APK files sent on WhatsApp or SMS.",
      hi: "नुकसानदेह सॉफ़्टवेयर जो डेटा चुरा सकता है, आपके SMS (OTP सहित) पढ़ सकता है, नकली स्क्रीन दिखा सकता है या डिवाइस लॉक कर सकता है। अक्सर WhatsApp या SMS पर भेजी APK फ़ाइलों से फैलता है।",
    },
  },
  {
    id: "apk-fraud",
    term: { en: "APK fraud", hi: "APK फ्रॉड" },
    def: {
      en: "Getting a victim to install an Android app file (.apk) from outside the Play Store — e.g. a fake 'KYC', 'e-challan' or 'bill update' app — that then steals OTPs and banking data.",
      hi: "Play Store के बाहर से Android ऐप फ़ाइल (.apk) — जैसे नकली 'KYC', 'ई-चालान' या 'बिल अपडेट' ऐप — इंस्टॉल करवाना, जो फिर OTP और बैंकिंग डेटा चुराती है।",
    },
    link: "/scams/kyc-update-scam",
  },
  {
    id: "remote-access",
    term: { en: "Remote-access scam", hi: "रिमोट-एक्सेस स्कैम" },
    def: {
      en: "A caller convinces you to install screen-sharing apps like AnyDesk or TeamViewer, then watches or controls your phone to steal money. Never install such apps on a stranger's request.",
      hi: "कॉलर आपसे AnyDesk या TeamViewer जैसे स्क्रीन-शेयरिंग ऐप इंस्टॉल करवाकर आपका फ़ोन देखता या चलाता है और पैसा चुराता है। किसी अनजान के कहने पर ऐसे ऐप कभी इंस्टॉल न करें।",
    },
    link: "/scams/fake-customer-care-scam",
  },
  {
    id: "otp",
    term: { en: "OTP (One-Time Password)", hi: "OTP (वन-टाइम पासवर्ड)" },
    def: {
      en: "A short code sent to your phone or email to approve a login or payment. Anyone who has your OTP can act as you — no genuine bank, company or officer will ever ask for it.",
      hi: "लॉगिन या भुगतान मंज़ूर करने के लिए फ़ोन या ईमेल पर आने वाला छोटा कोड। जिसके पास आपका OTP है वह आपकी तरह काम कर सकता है — कोई असली बैंक, कंपनी या अधिकारी इसे कभी नहीं मांगता।",
    },
  },
  {
    id: "upi-pin",
    term: { en: "UPI PIN", hi: "UPI PIN" },
    def: {
      en: "The secret 4- or 6-digit number that authorises payments from your bank account through UPI. You need it only to send money or check your balance — never to receive money.",
      hi: "UPI से आपके बैंक खाते से भुगतान मंज़ूर करने वाला गुप्त 4 या 6 अंकों का नंबर। यह सिर्फ़ पैसे भेजने या बैलेंस देखने के लिए चाहिए — पैसे पाने के लिए कभी नहीं।",
    },
    link: "/scams/upi-fraud",
  },
  {
    id: "collect-request",
    term: { en: "UPI collect request", hi: "UPI कलेक्ट रिक्वेस्ट" },
    def: {
      en: "A request from someone asking you to pay them, which appears in your UPI app. Approving it with your PIN sends money out of your account — scammers disguise these as 'refunds' or 'payments to you'.",
      hi: "किसी व्यक्ति की ओर से भुगतान मांगने वाली रिक्वेस्ट जो आपके UPI ऐप में दिखती है। PIN से मंज़ूर करने पर पैसा आपके खाते से जाता है — ठग इसे 'रिफंड' या 'आपको भुगतान' बताकर भेजते हैं।",
    },
    link: "/upi-id-checker",
  },
  {
    id: "aeps",
    term: { en: "AePS (Aadhaar Enabled Payment System)", hi: "AePS (आधार आधारित भुगतान प्रणाली)" },
    def: {
      en: "A system that lets people withdraw cash or check balances at micro-ATMs using their Aadhaar number and fingerprint. Locking your Aadhaar biometrics on myAadhaar helps prevent misuse.",
      hi: "एक प्रणाली जिससे लोग आधार नंबर और फ़िंगरप्रिंट से माइक्रो-ATM पर पैसे निकाल या बैलेंस देख सकते हैं। myAadhaar पर आधार बायोमेट्रिक लॉक करने से दुरुपयोग रोकने में मदद मिलती है।",
    },
    link: "/scams/aeps-aadhaar-fingerprint-fraud",
  },
  {
    id: "two-factor",
    term: { en: "Two-factor authentication (2FA)", hi: "टू-फ़ैक्टर ऑथेंटिकेशन (2FA)" },
    def: {
      en: "A second check after your password — such as a code or app approval — so a stolen password alone isn't enough. Turn it on for email, WhatsApp (two-step verification) and social media.",
      hi: "पासवर्ड के बाद एक दूसरी जांच — जैसे कोड या ऐप से मंज़ूरी — ताकि सिर्फ़ चोरी हुआ पासवर्ड काफ़ी न हो। ईमेल, WhatsApp (टू-स्टेप वेरिफ़िकेशन) और सोशल मीडिया पर इसे चालू करें।",
    },
  },
  {
    id: "identity-theft",
    term: { en: "Identity theft", hi: "पहचान की चोरी" },
    def: {
      en: "Using someone's personal details — Aadhaar, PAN, photos or documents — to take loans, open accounts or SIMs, or commit fraud in their name. Under the IT Act this is an offence (Section 66C).",
      hi: "किसी के निजी विवरण — आधार, PAN, फ़ोटो या दस्तावेज़ — का उपयोग करके उसके नाम पर लोन, खाते या SIM लेना या धोखाधड़ी करना। IT एक्ट के तहत यह अपराध है (धारा 66C)।",
    },
  },
  {
    id: "ponzi",
    term: { en: "Ponzi scheme", hi: "पोंज़ी स्कीम" },
    def: {
      en: "A fraud that pays 'returns' to earlier investors using money from new investors, until it collapses. Promises of guaranteed high returns are the main warning sign. Report illegal schemes on RBI Sachet.",
      hi: "एक धोखाधड़ी जो पुराने निवेशकों को नए निवेशकों के पैसे से 'रिटर्न' देती है, जब तक कि वह ढह न जाए। पक्के ऊंचे रिटर्न का वादा मुख्य चेतावनी है। अवैध योजनाओं की शिकायत RBI सचेत पर करें।",
    },
    link: "/scams/stock-trading-investment-scam",
  },
  {
    id: "golden-hour",
    term: { en: "Golden hour", hi: "गोल्डन आवर" },
    def: {
      en: "The first hour after an online financial fraud. Reporting on 1930 or cybercrime.gov.in quickly gives the best chance that banks can hold the money before it is withdrawn.",
      hi: "ऑनलाइन वित्तीय धोखाधड़ी के बाद का पहला घंटा। 1930 या cybercrime.gov.in पर जल्दी शिकायत करने से बैंकों द्वारा पैसा निकाले जाने से पहले रोकने की सबसे अच्छी संभावना होती है।",
    },
    link: "/help",
  },
  {
    id: "ncrp",
    term: { en: "NCRP (cybercrime.gov.in)", hi: "NCRP (cybercrime.gov.in)" },
    def: {
      en: "The National Cyber Crime Reporting Portal run by I4C under the Ministry of Home Affairs, where citizens file complaints about any cyber crime, including financial fraud.",
      hi: "गृह मंत्रालय के तहत I4C द्वारा संचालित राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल, जहां नागरिक वित्तीय धोखाधड़ी सहित किसी भी साइबर अपराध की शिकायत करते हैं।",
    },
    link: "/report",
  },
  {
    id: "i4c",
    term: { en: "I4C", hi: "I4C" },
    def: {
      en: "The Indian Cyber Crime Coordination Centre under the Ministry of Home Affairs. It coordinates action on cyber crime and runs the 1930 helpline and cybercrime.gov.in.",
      hi: "गृह मंत्रालय के तहत भारतीय साइबर अपराध समन्वय केंद्र। यह साइबर अपराध पर कार्रवाई का समन्वय करता है और 1930 हेल्पलाइन व cybercrime.gov.in चलाता है।",
    },
    link: "/services",
  },
  {
    id: "cert-in",
    term: { en: "CERT-In", hi: "CERT-In" },
    def: {
      en: "The Indian Computer Emergency Response Team under MeitY — India's national agency for responding to cyber-security incidents such as hacking and ransomware.",
      hi: "MeitY के तहत भारतीय कंप्यूटर आपातकालीन प्रतिक्रिया दल — हैकिंग और रैनसमवेयर जैसी साइबर-सुरक्षा घटनाओं पर प्रतिक्रिया देने वाली भारत की राष्ट्रीय एजेंसी।",
    },
    link: "/cyber-security-upsc",
  },
  {
    id: "chakshu",
    term: { en: "Chakshu", hi: "चक्षु" },
    def: {
      en: "A facility on the Department of Telecommunications' Sanchar Saathi portal and app for reporting suspected fraud calls, SMS and WhatsApp messages.",
      hi: "दूरसंचार विभाग के संचार साथी पोर्टल और ऐप की सुविधा, जिससे संदिग्ध फ्रॉड कॉल, SMS और WhatsApp मैसेज की शिकायत की जाती है।",
    },
    link: "/services",
  },
];
