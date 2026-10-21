import type { Bilingual, Locale } from "../site";

export const CONTENT_UPDATED = "2026-10-19";

export type ScamText = {
  name: string;
  title: string; // SEO title (≤ 60 chars)
  short: string; // card blurb
  answer: string; // 40–60 word direct answer, quoted by search & AI engines
  howItWorks: string[];
  redFlags: string[];
  whatToDo: string[];
  example: string;
  faq: { q: string; a: string }[];
};

export type Scam = {
  slug: string;
  icon: string;
  accent: string; // tailwind-free hex used for gradients
  reportTo: string[]; // resource ids from resources.ts
  content: Bilingual<ScamText>;
};

export const scams: Scam[] = [
  {
    slug: "digital-arrest-scam",
    icon: "👮",
    accent: "#f43f5e",
    reportTo: ["ncrp", "chakshu"],
    content: {
      en: {
        name: "Digital Arrest Scam",
        title: "Digital Arrest Scam: How It Works & How to Stay Safe",
        short: "Fake CBI, ED, police or customs officers on video call claim you are 'under digital arrest' and demand money.",
        answer:
          "A digital arrest scam is a fraud where criminals pose as CBI, ED, police, customs or TRAI officers on a video call, claim your Aadhaar or a parcel is linked to a crime, and keep you 'under digital arrest' until you transfer money. No Indian law allows arrest over a video call — disconnect and call 1930.",
        howItWorks: [
          "You get a call or IVR message saying your SIM will be blocked, or a parcel in your name contains drugs or fake passports.",
          "The call is 'transferred' to a fake police station or CBI officer on Skype/WhatsApp video, often with uniforms, logos and a fake office background.",
          "They show forged arrest warrants or Supreme Court/RBI letters and say you are under 'digital arrest' — you must stay on camera and tell no one.",
          "To 'verify' your funds or 'clear your name', you are told to move savings, FDs or loan money into a 'safe RBI account' which is actually a mule account.",
        ],
        redFlags: [
          "Anyone claiming you are under arrest over a phone or video call",
          "Being told to stay on video, not to disconnect, and not to tell family",
          "Requests to transfer money for 'verification' or to a 'secret supervision account'",
          "Official-looking documents sent over WhatsApp",
          "Extreme urgency and threats of jail, sealing of accounts or media exposure",
        ],
        whatToDo: [
          "Disconnect the call immediately — real agencies never arrest anyone over video.",
          "Do not transfer any money or share bank, Aadhaar or OTP details.",
          "Tell a family member right away; isolation is the scammer's main weapon.",
          "Report the number on Sanchar Saathi Chakshu and file a complaint on cybercrime.gov.in.",
          "If you already paid, call 1930 within the first hour and inform your bank to freeze the transaction.",
        ],
        example:
          "This is Mumbai Cyber Crime Branch. A FedEx parcel booked with your Aadhaar contains 5 passports and MDMA. An FIR has been registered. Stay on this video call — you are under digital arrest. Do not inform anyone or you will be arrested immediately.",
        faq: [
          {
            q: "Is 'digital arrest' legal in India?",
            a: "No. There is no provision called 'digital arrest' in Indian law. Police, CBI, ED or customs never arrest or interrogate people over video calls and never ask for money to close a case.",
          },
          {
            q: "I paid money in a digital arrest scam. Can I get it back?",
            a: "Call 1930 immediately and file a complaint on cybercrime.gov.in with transaction IDs. If reported quickly, the receiving accounts can be frozen and the money may be returned through a court or bank process.",
          },
        ],
      },
      hi: {
        name: "डिजिटल अरेस्ट स्कैम",
        title: "डिजिटल अरेस्ट स्कैम: कैसे होता है और कैसे बचें",
        short: "नकली CBI, ED, पुलिस या कस्टम अधिकारी वीडियो कॉल पर कहते हैं कि आप 'डिजिटल अरेस्ट' में हैं और पैसे मांगते हैं।",
        answer:
          "डिजिटल अरेस्ट स्कैम एक धोखाधड़ी है जिसमें ठग CBI, ED, पुलिस, कस्टम या TRAI अधिकारी बनकर वीडियो कॉल करते हैं, कहते हैं कि आपका आधार या पार्सल किसी अपराध से जुड़ा है, और पैसे ट्रांसफर करने तक आपको 'डिजिटल अरेस्ट' में रखते हैं। भारतीय कानून में वीडियो कॉल पर गिरफ़्तारी जैसा कुछ नहीं है — कॉल काटें और 1930 पर कॉल करें।",
        howItWorks: [
          "आपको कॉल या IVR मैसेज आता है कि आपकी SIM बंद होगी, या आपके नाम के पार्सल में ड्रग्स या नकली पासपोर्ट हैं।",
          "कॉल को नकली पुलिस स्टेशन या CBI अधिकारी को Skype/WhatsApp वीडियो पर 'ट्रांसफर' किया जाता है — वर्दी, लोगो और नकली ऑफ़िस के साथ।",
          "वे जाली अरेस्ट वारंट या सुप्रीम कोर्ट/RBI के पत्र दिखाते हैं और कहते हैं कि आप 'डिजिटल अरेस्ट' में हैं — कैमरे पर रहें और किसी को न बताएं।",
          "पैसों के 'वेरिफ़िकेशन' के नाम पर आपकी बचत, FD या लोन की रकम एक 'सुरक्षित RBI खाते' में डलवाई जाती है जो असल में ठगों का खाता होता है।",
        ],
        redFlags: [
          "फ़ोन या वीडियो कॉल पर कोई कहे कि आप गिरफ़्तार हैं",
          "वीडियो पर बने रहने, कॉल न काटने और परिवार को न बताने को कहना",
          "'वेरिफ़िकेशन' या 'गुप्त निगरानी खाते' में पैसे भेजने की मांग",
          "WhatsApp पर भेजे गए सरकारी जैसे दिखने वाले दस्तावेज़",
          "जेल, खाते सील करने या मीडिया में बदनामी की धमकी और भारी जल्दबाज़ी",
        ],
        whatToDo: [
          "तुरंत कॉल काटें — असली एजेंसियां वीडियो पर किसी को गिरफ़्तार नहीं करतीं।",
          "कोई पैसा ट्रांसफर न करें और बैंक, आधार या OTP की जानकारी न दें।",
          "तुरंत परिवार के किसी सदस्य को बताएं; अकेला रखना ही ठगों का हथियार है।",
          "नंबर की शिकायत संचार साथी चक्षु पर करें और cybercrime.gov.in पर शिकायत दर्ज करें।",
          "अगर पैसे दे चुके हैं, तो पहले घंटे में 1930 पर कॉल करें और बैंक को सूचित करें।",
        ],
        example:
          "यह मुंबई साइबर क्राइम ब्रांच है। आपके आधार से बुक FedEx पार्सल में 5 पासपोर्ट और MDMA मिले हैं। FIR दर्ज हो चुकी है। इस वीडियो कॉल पर बने रहें — आप डिजिटल अरेस्ट में हैं। किसी को बताया तो तुरंत गिरफ़्तार कर लिए जाएंगे।",
        faq: [
          {
            q: "क्या भारत में 'डिजिटल अरेस्ट' कानूनी है?",
            a: "नहीं। भारतीय कानून में 'डिजिटल अरेस्ट' नाम का कोई प्रावधान नहीं है। पुलिस, CBI, ED या कस्टम कभी वीडियो कॉल पर गिरफ़्तारी या पूछताछ नहीं करते और केस बंद करने के लिए पैसे नहीं मांगते।",
          },
          {
            q: "मैंने डिजिटल अरेस्ट स्कैम में पैसे दे दिए। क्या वापस मिल सकते हैं?",
            a: "तुरंत 1930 पर कॉल करें और ट्रांज़ैक्शन ID के साथ cybercrime.gov.in पर शिकायत करें। जल्दी शिकायत होने पर पैसा पाने वाले खाते फ्रीज़ हो सकते हैं और कोर्ट या बैंक प्रक्रिया से पैसा वापस मिल सकता है।",
          },
        ],
      },
    },
  },
  {
    slug: "upi-fraud",
    icon: "💸",
    accent: "#f59e0b",
    reportTo: ["ncrp", "npci", "rbiCms"],
    content: {
      en: {
        name: "UPI Fraud (Collect Request & QR Code Scam)",
        title: "UPI Fraud: Collect Request, QR Code & Wrong Transfer Scams",
        short: "Scammers trick you into entering your UPI PIN to 'receive' money — but a PIN is only ever needed to send money.",
        answer:
          "UPI fraud happens when scammers trick you into approving a payment — usually by sending a 'collect request', a QR code or a link while claiming you will receive money. Remember: you never need to scan a QR code or enter your UPI PIN to receive money. Entering your PIN always sends money out.",
        howItWorks: [
          "A 'buyer' on OLX/Facebook Marketplace says they will pay you and sends a QR code or collect request instead.",
          "Someone claims they sent money 'by mistake' and asks you to return it via a request they send.",
          "Fake cashback, refund or prize messages ask you to 'approve' a request to receive money.",
          "Screen-sharing apps or fake 'customer support' guide you to enter your PIN while they watch.",
        ],
        redFlags: [
          "Being asked to enter your UPI PIN or scan a QR to RECEIVE money",
          "Collect requests from unknown people or with notes like 'refund' or 'cashback'",
          "Urgent 'sent by mistake, please return' calls after a fake SMS credit alert",
          "Requests to install AnyDesk, TeamViewer or other screen-sharing apps",
          "Fake bank SMS showing a credit that never appears in your actual bank app",
        ],
        whatToDo: [
          "Never enter your UPI PIN to receive money — decline unknown collect requests.",
          "Check your actual bank balance in the bank app, not SMS screenshots.",
          "If you were cheated, call 1930 and your bank immediately, and raise a complaint in your UPI app.",
          "File a complaint at cybercrime.gov.in with the UTR/transaction ID and the scammer's UPI ID.",
          "Escalate unresolved disputes to the RBI Ombudsman (cms.rbi.org.in) after 30 days.",
        ],
        example:
          "Hi, I am interested in your sofa listed on OLX. I am in the army and will pay ₹15,000 advance. I have sent a request on PhonePe, please accept and enter PIN to receive the payment.",
        faq: [
          {
            q: "Do I need a UPI PIN to receive money?",
            a: "No. A UPI PIN is only required to send money or check your balance. If anyone asks you to enter a PIN or scan a QR code to receive money, it is a scam.",
          },
          {
            q: "How do I get money back after UPI fraud?",
            a: "Immediately call 1930, report the transaction in your UPI app and bank, and file a complaint on cybercrime.gov.in. Under RBI rules, reporting unauthorised transactions within 3 working days limits your liability.",
          },
        ],
      },
      hi: {
        name: "UPI फ्रॉड (कलेक्ट रिक्वेस्ट और QR कोड स्कैम)",
        title: "UPI फ्रॉड: कलेक्ट रिक्वेस्ट, QR कोड और गलत ट्रांसफर स्कैम",
        short: "ठग आपसे पैसे 'पाने' के लिए UPI PIN डलवाते हैं — जबकि PIN सिर्फ़ पैसे भेजने के लिए होता है।",
        answer:
          "UPI फ्रॉड तब होता है जब ठग आपसे भुगतान मंज़ूर करवा लेते हैं — आमतौर पर 'कलेक्ट रिक्वेस्ट', QR कोड या लिंक भेजकर और कहकर कि आपको पैसे मिलेंगे। याद रखें: पैसे पाने के लिए कभी QR स्कैन या UPI PIN डालने की ज़रूरत नहीं होती। PIN डालने से हमेशा पैसा जाता है।",
        howItWorks: [
          "OLX/Facebook मार्केटप्लेस पर 'ख़रीदार' कहता है कि वह भुगतान करेगा और QR कोड या कलेक्ट रिक्वेस्ट भेजता है।",
          "कोई कहता है कि उसने 'गलती से' पैसे भेज दिए और अपनी भेजी रिक्वेस्ट से लौटाने को कहता है।",
          "नकली कैशबैक, रिफंड या इनाम के मैसेज पैसे 'पाने' के लिए रिक्वेस्ट मंज़ूर करने को कहते हैं।",
          "स्क्रीन-शेयरिंग ऐप या नकली 'कस्टमर सपोर्ट' देखते हुए आपसे PIN डलवाते हैं।",
        ],
        redFlags: [
          "पैसे पाने के लिए UPI PIN डालने या QR स्कैन करने को कहना",
          "अनजान लोगों से 'रिफंड' या 'कैशबैक' नोट वाली कलेक्ट रिक्वेस्ट",
          "नकली क्रेडिट SMS के बाद 'गलती से भेजा, लौटा दो' वाले कॉल",
          "AnyDesk, TeamViewer जैसे स्क्रीन-शेयरिंग ऐप इंस्टॉल करवाना",
          "बैंक ऐप में न दिखने वाला नकली क्रेडिट SMS",
        ],
        whatToDo: [
          "पैसे पाने के लिए कभी UPI PIN न डालें — अनजान कलेक्ट रिक्वेस्ट अस्वीकार करें।",
          "SMS या स्क्रीनशॉट नहीं, बैंक ऐप में असली बैलेंस देखें।",
          "ठगी हुई हो तो तुरंत 1930 और बैंक को कॉल करें और UPI ऐप में शिकायत करें।",
          "UTR/ट्रांज़ैक्शन ID और ठग की UPI ID के साथ cybercrime.gov.in पर शिकायत करें।",
          "30 दिन में हल न हो तो RBI लोकपाल (cms.rbi.org.in) पर शिकायत करें।",
        ],
        example:
          "नमस्ते, OLX पर आपका सोफ़ा पसंद आया। मैं आर्मी में हूं और ₹15,000 एडवांस दूंगा। PhonePe पर रिक्वेस्ट भेजी है, पेमेंट पाने के लिए स्वीकार करके PIN डालें।",
        faq: [
          { q: "क्या पैसे पाने के लिए UPI PIN चाहिए?", a: "नहीं। UPI PIN सिर्फ़ पैसे भेजने या बैलेंस देखने के लिए होता है। पैसे पाने के लिए PIN या QR स्कैन मांगा जाए तो यह स्कैम है।" },
          {
            q: "UPI फ्रॉड के बाद पैसे कैसे वापस पाएं?",
            a: "तुरंत 1930 पर कॉल करें, UPI ऐप और बैंक में ट्रांज़ैक्शन की शिकायत करें और cybercrime.gov.in पर शिकायत दर्ज करें। RBI नियमों के अनुसार 3 कार्य-दिवसों में शिकायत करने पर आपकी देनदारी सीमित रहती है।",
          },
        ],
      },
    },
  },
  {
    slug: "kyc-update-scam",
    icon: "🏦",
    accent: "#0ea5e9",
    reportTo: ["ncrp", "chakshu", "rbiCms"],
    content: {
      en: {
        name: "KYC Update & Account Block Scam",
        title: "KYC Update Scam SMS: 'Your Account Will Be Blocked' Fraud",
        short: "SMS says your bank account, PAN or SIM will be blocked unless you update KYC via a link or APK file.",
        answer:
          "A KYC update scam is a phishing message claiming your bank account, PAN, wallet or SIM will be blocked today unless you update KYC through a link, phone number or APK file. Banks never send KYC links by SMS or WhatsApp. Open only your bank's official app or visit the branch.",
        howItWorks: [
          "You receive an SMS/WhatsApp: 'Dear customer, your SBI/HDFC account will be suspended today. Update PAN/KYC: bit.ly/…'.",
          "The link opens a fake bank login page or asks you to install an 'SBI YONO KYC.apk' file.",
          "You enter your customer ID, password, card details and OTP — which go straight to the scammer.",
          "Malicious APKs can read all your SMS, so they capture future OTPs and empty the account.",
        ],
        redFlags: [
          "Threat that your account/SIM will be blocked 'today' or 'within 24 hours'",
          "Links using shorteners (bit.ly, tinyurl) or odd domains like .xyz, .top, .online",
          "Requests to download an .apk file outside the Play Store",
          "Sender is a 10-digit mobile number instead of an official bank sender ID",
          "The website is not on your bank's official .bank.in domain (RBI-mandated for all banks)",
          "Spelling mistakes and generic greetings like 'Dear customer'",
        ],
        whatToDo: [
          "Do not click the link or install any APK file.",
          "Check KYC status only in your bank's official app or at the branch.",
          "If you entered details, immediately change your net-banking password and call your bank to block cards.",
          "If an APK was installed, switch off mobile data, uninstall it, and get the phone checked.",
          "Report the SMS on Sanchar Saathi Chakshu and forward details to 1930/cybercrime.gov.in if money was lost.",
        ],
        example:
          "Dear Customer, Your SBI YONO account will be blocked today. Please update your PAN card immediately by clicking: http://sbi-kyc-update.xyz/login",
        faq: [
          { q: "Do banks send KYC update links by SMS?", a: "No. Indian banks do not send links asking you to update KYC, PAN or Aadhaar. KYC is updated only through the bank's official app, website or at the branch." },
          { q: "I installed an APK from a KYC message. What now?", a: "Turn on airplane mode, uninstall the app, change banking passwords from another device, call your bank to block cards and UPI, and call 1930 if money was debited." },
        ],
      },
      hi: {
        name: "KYC अपडेट और अकाउंट ब्लॉक स्कैम",
        title: "KYC अपडेट स्कैम SMS: 'आपका खाता ब्लॉक होगा' फ्रॉड",
        short: "SMS कहता है कि लिंक या APK से KYC अपडेट न करने पर आपका बैंक खाता, PAN या SIM बंद हो जाएगा।",
        answer:
          "KYC अपडेट स्कैम एक फ़िशिंग मैसेज है जो कहता है कि लिंक, फ़ोन नंबर या APK फ़ाइल से KYC अपडेट न करने पर आपका बैंक खाता, PAN, वॉलेट या SIM आज बंद हो जाएगा। बैंक कभी SMS या WhatsApp पर KYC लिंक नहीं भेजते। सिर्फ़ बैंक का आधिकारिक ऐप खोलें या शाखा जाएं।",
        howItWorks: [
          "SMS/WhatsApp आता है: 'प्रिय ग्राहक, आपका SBI/HDFC खाता आज बंद होगा। PAN/KYC अपडेट करें: bit.ly/…'।",
          "लिंक नकली बैंक लॉगिन पेज खोलता है या 'SBI YONO KYC.apk' इंस्टॉल करने को कहता है।",
          "आप कस्टमर ID, पासवर्ड, कार्ड और OTP डालते हैं — जो सीधे ठग के पास जाते हैं।",
          "नकली APK आपके सारे SMS पढ़ सकता है, जिससे आगे के OTP भी चुराकर खाता खाली कर देता है।",
        ],
        redFlags: [
          "'आज' या '24 घंटे में' खाता/SIM बंद होने की धमकी",
          "bit.ly, tinyurl जैसे छोटे लिंक या .xyz, .top, .online जैसे अजीब डोमेन",
          "Play Store के बाहर से .apk फ़ाइल डाउनलोड करवाना",
          "बैंक की आधिकारिक ID के बजाय 10 अंकों के मोबाइल नंबर से मैसेज",
          "वेबसाइट आपके बैंक के आधिकारिक .bank.in डोमेन पर नहीं है (RBI ने सभी बैंकों के लिए अनिवार्य किया)",
          "वर्तनी की गलतियां और 'प्रिय ग्राहक' जैसा सामान्य संबोधन",
        ],
        whatToDo: [
          "लिंक पर क्लिक न करें और कोई APK इंस्टॉल न करें।",
          "KYC की स्थिति सिर्फ़ बैंक के आधिकारिक ऐप या शाखा में जांचें।",
          "जानकारी डाल दी हो तो तुरंत नेट-बैंकिंग पासवर्ड बदलें और कार्ड ब्लॉक करवाएं।",
          "APK इंस्टॉल हुआ हो तो मोबाइल डेटा बंद करें, ऐप हटाएं और फ़ोन की जांच करवाएं।",
          "SMS की शिकायत संचार साथी चक्षु पर करें; पैसा गया हो तो 1930/cybercrime.gov.in पर शिकायत करें।",
        ],
        example: "प्रिय ग्राहक, आपका SBI YONO खाता आज ब्लॉक कर दिया जाएगा। कृपया तुरंत अपना PAN कार्ड अपडेट करें: http://sbi-kyc-update.xyz/login",
        faq: [
          { q: "क्या बैंक SMS पर KYC अपडेट लिंक भेजते हैं?", a: "नहीं। भारतीय बैंक KYC, PAN या आधार अपडेट के लिंक नहीं भेजते। KYC सिर्फ़ बैंक के आधिकारिक ऐप, वेबसाइट या शाखा से अपडेट होता है।" },
          { q: "मैंने KYC मैसेज से APK इंस्टॉल कर लिया। अब क्या करूं?", a: "एयरप्लेन मोड चालू करें, ऐप हटाएं, दूसरे डिवाइस से बैंकिंग पासवर्ड बदलें, बैंक को कॉल करके कार्ड और UPI ब्लॉक करवाएं और पैसे कटे हों तो 1930 पर कॉल करें।" },
        ],
      },
    },
  },
  {
    slug: "part-time-job-scam",
    icon: "💼",
    accent: "#a855f7",
    reportTo: ["ncrp", "chakshu"],
    content: {
      en: {
        name: "Part-Time Job & Task Scam",
        title: "Part-Time Job Scam on WhatsApp & Telegram: 'Like & Earn' Fraud",
        short: "Earn ₹3,000/day by liking YouTube videos or rating hotels — until you are asked to 'invest' in prepaid tasks.",
        answer:
          "The part-time job or task scam offers easy money for liking YouTube videos, rating hotels or reviewing products on WhatsApp or Telegram. You are paid small amounts at first, then asked to deposit money for 'prepaid' or 'merchant' tasks that show fake profits you can never withdraw. Real jobs never ask you to pay.",
        howItWorks: [
          "An unknown WhatsApp/Telegram message or SMS offers work-from-home income of ₹2,000–₹8,000 a day.",
          "The first few simple tasks (liking videos, Google reviews) pay ₹50–₹150 to build trust.",
          "You are added to a Telegram group where 'members' post screenshots of big earnings.",
          "Next you must deposit money for 'prepaid tasks'; a fake dashboard shows profits, but withdrawal needs more 'tax' or 'upgrade' fees — until you stop paying.",
        ],
        redFlags: [
          "Unsolicited job offers with very high pay for very simple work",
          "Recruiter refuses phone/video interviews and uses Telegram only",
          "Any request to pay a deposit, registration or 'task unlock' fee",
          "Profits visible on a website but withdrawal is blocked for more fees",
          "Payments go to individual UPI IDs or random bank accounts",
        ],
        whatToDo: [
          "Stop paying immediately — no further payment will unlock your money.",
          "Do not share Aadhaar, PAN or bank details with the 'HR' or 'mentor'.",
          "Save screenshots of chats, UPI IDs, bank accounts and the task website URL.",
          "Call 1930 and file a complaint on cybercrime.gov.in with all transaction IDs.",
          "Report the WhatsApp number in the app and on Sanchar Saathi Chakshu.",
        ],
        example:
          "Hello! I'm Priya from Amazon HR. We are hiring part-time. Just like YouTube videos and earn ₹150 per task, ₹3000–₹8000 daily. Interested? Reply YES and join our Telegram for tasks.",
        faq: [
          { q: "Are 'like YouTube videos and earn money' jobs real?", a: "No. These are task scams. Genuine companies do not pay strangers to like videos or post reviews, and never ask you to deposit money to unlock tasks or earnings." },
          { q: "The website shows my profit but I can't withdraw. Should I pay the tax?", a: "No. The balance is fake. Every 'tax', 'VIP upgrade' or 'credit score' fee is another layer of the scam. Stop paying and report to 1930 immediately." },
        ],
      },
      hi: {
        name: "पार्ट-टाइम जॉब और टास्क स्कैम",
        title: "WhatsApp-Telegram पार्ट-टाइम जॉब स्कैम: 'लाइक करो, कमाओ' फ्रॉड",
        short: "YouTube वीडियो लाइक करके ₹3,000/दिन कमाएं — जब तक प्रीपेड टास्क में 'निवेश' न मांगा जाए।",
        answer:
          "पार्ट-टाइम जॉब या टास्क स्कैम WhatsApp या Telegram पर YouTube वीडियो लाइक करने, होटल रेटिंग या रिव्यू के बदले आसान कमाई का लालच देता है। पहले थोड़े पैसे मिलते हैं, फिर 'प्रीपेड' टास्क के लिए पैसे जमा कराए जाते हैं जिनका नकली मुनाफ़ा कभी निकाला नहीं जा सकता। असली नौकरी में कभी पैसे नहीं देने पड़ते।",
        howItWorks: [
          "अनजान WhatsApp/Telegram मैसेज या SMS घर से ₹2,000–₹8,000 रोज़ कमाने का ऑफ़र देता है।",
          "शुरुआती आसान टास्क (वीडियो लाइक, Google रिव्यू) पर भरोसा जीतने के लिए ₹50–₹150 मिलते हैं।",
          "आपको Telegram ग्रुप में जोड़ा जाता है जहां 'सदस्य' बड़ी कमाई के स्क्रीनशॉट डालते हैं।",
          "फिर 'प्रीपेड टास्क' के लिए पैसे जमा कराए जाते हैं; नकली डैशबोर्ड पर मुनाफ़ा दिखता है, पर निकालने के लिए और 'टैक्स' या 'अपग्रेड' फ़ीस मांगी जाती है।",
        ],
        redFlags: [
          "बहुत आसान काम के लिए बहुत ज़्यादा कमाई का बिन मांगा ऑफ़र",
          "रिक्रूटर फ़ोन/वीडियो इंटरव्यू से बचता है और सिर्फ़ Telegram पर बात करता है",
          "डिपॉज़िट, रजिस्ट्रेशन या 'टास्क अनलॉक' फ़ीस की मांग",
          "वेबसाइट पर मुनाफ़ा दिखता है पर निकासी के लिए और फ़ीस",
          "भुगतान निजी UPI ID या अलग-अलग बैंक खातों में",
        ],
        whatToDo: [
          "तुरंत भुगतान बंद करें — और पैसे देने से आपका पैसा नहीं निकलेगा।",
          "'HR' या 'मेंटर' को आधार, PAN या बैंक जानकारी न दें।",
          "चैट, UPI ID, बैंक खाते और टास्क वेबसाइट के स्क्रीनशॉट सहेजें।",
          "1930 पर कॉल करें और सभी ट्रांज़ैक्शन ID के साथ cybercrime.gov.in पर शिकायत करें।",
          "WhatsApp नंबर की ऐप में और संचार साथी चक्षु पर रिपोर्ट करें।",
        ],
        example: "नमस्ते! मैं Amazon HR से प्रिया हूं। हम पार्ट-टाइम भर्ती कर रहे हैं। बस YouTube वीडियो लाइक करें और ₹150 प्रति टास्क, रोज़ ₹3000–₹8000 कमाएं। रुचि हो तो YES लिखें और टास्क के लिए हमारा Telegram जॉइन करें।",
        faq: [
          { q: "क्या 'YouTube वीडियो लाइक करो, पैसे कमाओ' वाली नौकरी असली है?", a: "नहीं। ये टास्क स्कैम हैं। असली कंपनियां अनजान लोगों को वीडियो लाइक करने के पैसे नहीं देतीं और टास्क अनलॉक करने के लिए कभी पैसे जमा नहीं करवातीं।" },
          { q: "वेबसाइट पर मुनाफ़ा दिख रहा है पर निकाल नहीं पा रहा। क्या टैक्स भर दूं?", a: "नहीं। बैलेंस नकली है। हर 'टैक्स', 'VIP अपग्रेड' या 'क्रेडिट स्कोर' फ़ीस स्कैम का अगला हिस्सा है। भुगतान रोकें और तुरंत 1930 पर शिकायत करें।" },
        ],
      },
    },
  },
  {
    slug: "stock-trading-investment-scam",
    icon: "📈",
    accent: "#22c55e",
    reportTo: ["ncrp", "sebiCheck", "sebi", "sachet"],
    content: {
      en: {
        name: "Stock Market & Investment Scam",
        title: "Stock Trading & Investment Scam on WhatsApp Groups (India)",
        short: "WhatsApp 'stock tips' groups push a fake trading app with huge returns, IPO allotments and blocked withdrawals.",
        answer:
          "Stock market investment scams lure people into WhatsApp or Telegram 'VIP stock tips' groups run by fake SEBI-registered advisers, then move them to a fake trading app showing huge profits. When you try to withdraw, you are asked for taxes or fees and the money is lost. Invest only through SEBI-registered brokers.",
        howItWorks: [
          "You are added to a WhatsApp group or see a social-media ad featuring a famous investor or 'professor'.",
          "Daily free tips seem to work; other members (often scammers) share profit screenshots.",
          "You are told to install a special app or website for 'institutional accounts', 'block trades' or guaranteed IPO allotment.",
          "The app shows big gains, but withdrawals need a 'service fee', 'tax' or higher deposit — then the app disappears.",
        ],
        redFlags: [
          "Guaranteed or very high returns (e.g. 5% daily, 300% monthly)",
          "Trading apps not available on official stores or not linked to a SEBI-registered broker",
          "Deposits to personal or company bank accounts instead of your own demat account",
          "Use of celebrity photos, deepfake videos or fake SEBI certificates",
          "Pressure to invest quickly before a 'limited slot' closes",
        ],
        whatToDo: [
          "Verify any adviser or broker on the SEBI website before investing, and check their UPI ID on SEBI Check — registered entities use UPI IDs ending in @valid.",
          "Never transfer money to a personal account for trading; real brokers settle via your demat account.",
          "Stop all payments and save chats, app links and bank details.",
          "Report on cybercrime.gov.in/1930 and to SEBI SCORES; check unregistered schemes on RBI Sachet.",
          "Warn the group's other members — many may still be paying.",
        ],
        example:
          "Welcome to Stock Market VIP Club 📈 Our SEBI-registered expert gives 3 sure-shot tips daily. Download our institutional trading app to get IPO allotment and 30% weekly returns. Limited seats!",
        faq: [
          { q: "How do I check if a stock adviser is SEBI registered?", a: "Search the adviser's name and registration number in the intermediaries list on sebi.gov.in. Also check that the trading app belongs to a registered stockbroker and that money only moves through your own demat/trading account." },
          { q: "Can I get money back from a fake trading app?", a: "Report immediately on 1930 and cybercrime.gov.in with all bank transfers. Fast reporting allows police to freeze receiving accounts; delays make recovery much harder." },
        ],
      },
      hi: {
        name: "शेयर बाज़ार और निवेश स्कैम",
        title: "WhatsApp ग्रुप शेयर ट्रेडिंग और निवेश स्कैम (भारत)",
        short: "WhatsApp 'स्टॉक टिप्स' ग्रुप नकली ट्रेडिंग ऐप पर भारी मुनाफ़ा, IPO अलॉटमेंट दिखाते हैं — और निकासी रोक देते हैं।",
        answer:
          "शेयर बाज़ार निवेश स्कैम में लोगों को नकली SEBI-रजिस्टर्ड सलाहकारों के WhatsApp या Telegram 'VIP स्टॉक टिप्स' ग्रुप में जोड़ा जाता है, फिर नकली ट्रेडिंग ऐप पर भारी मुनाफ़ा दिखाया जाता है। निकासी के समय टैक्स या फ़ीस मांगी जाती है और पैसा डूब जाता है। सिर्फ़ SEBI-रजिस्टर्ड ब्रोकर से निवेश करें।",
        howItWorks: [
          "आपको WhatsApp ग्रुप में जोड़ा जाता है या किसी मशहूर निवेशक/'प्रोफ़ेसर' वाला सोशल-मीडिया विज्ञापन दिखता है।",
          "रोज़ाना मुफ़्त टिप्स सही लगती हैं; अन्य सदस्य (अक्सर ठग ही) मुनाफ़े के स्क्रीनशॉट डालते हैं।",
          "'इंस्टीट्यूशनल अकाउंट', 'ब्लॉक ट्रेड' या पक्के IPO अलॉटमेंट के लिए एक ख़ास ऐप या वेबसाइट इंस्टॉल कराई जाती है।",
          "ऐप पर बड़ा मुनाफ़ा दिखता है, पर निकासी के लिए 'सर्विस फ़ीस', 'टैक्स' या और जमा मांगा जाता है — फिर ऐप गायब।",
        ],
        redFlags: [
          "पक्का या बहुत ज़्यादा रिटर्न (जैसे 5% रोज़, 300% महीना)",
          "आधिकारिक स्टोर पर न मिलने वाले या SEBI-रजिस्टर्ड ब्रोकर से न जुड़े ट्रेडिंग ऐप",
          "अपने डीमैट खाते के बजाय निजी या कंपनी बैंक खातों में जमा",
          "सेलिब्रिटी फ़ोटो, डीपफ़ेक वीडियो या नकली SEBI प्रमाणपत्र",
          "'सीमित सीट' के नाम पर जल्दी निवेश का दबाव",
        ],
        whatToDo: [
          "निवेश से पहले SEBI वेबसाइट पर सलाहकार या ब्रोकर की जांच करें और SEBI Check पर उनकी UPI ID जांचें — रजिस्टर्ड संस्थाएं @valid वाली UPI ID इस्तेमाल करती हैं।",
          "ट्रेडिंग के लिए किसी निजी खाते में पैसे न भेजें; असली ब्रोकर आपके डीमैट खाते से ही लेन-देन करते हैं।",
          "सभी भुगतान रोकें और चैट, ऐप लिंक और बैंक विवरण सहेजें।",
          "cybercrime.gov.in/1930 और SEBI SCORES पर शिकायत करें; अपंजीकृत योजनाएं RBI सचेत पर जांचें।",
          "ग्रुप के बाकी सदस्यों को सावधान करें — कई अब भी भुगतान कर रहे होंगे।",
        ],
        example: "स्टॉक मार्केट VIP क्लब में स्वागत है 📈 हमारे SEBI-रजिस्टर्ड एक्सपर्ट रोज़ 3 पक्की टिप्स देते हैं। IPO अलॉटमेंट और हर हफ़्ते 30% रिटर्न के लिए हमारा इंस्टीट्यूशनल ट्रेडिंग ऐप डाउनलोड करें। सीमित सीटें!",
        faq: [
          { q: "स्टॉक सलाहकार SEBI रजिस्टर्ड है या नहीं, कैसे जांचें?", a: "sebi.gov.in पर इंटरमीडियरी सूची में सलाहकार का नाम और रजिस्ट्रेशन नंबर खोजें। यह भी देखें कि ट्रेडिंग ऐप किसी रजिस्टर्ड ब्रोकर का है और पैसा सिर्फ़ आपके डीमैट/ट्रेडिंग खाते से जाता है।" },
          { q: "क्या नकली ट्रेडिंग ऐप से पैसा वापस मिल सकता है?", a: "सभी बैंक ट्रांसफ़र के साथ तुरंत 1930 और cybercrime.gov.in पर शिकायत करें। जल्दी शिकायत से पुलिस पैसा पाने वाले खाते फ्रीज़ कर सकती है; देरी से वसूली बहुत मुश्किल हो जाती है।" },
        ],
      },
    },
  },
  {
    slug: "courier-parcel-scam",
    icon: "📦",
    accent: "#f97316",
    reportTo: ["ncrp", "chakshu"],
    content: {
      en: {
        name: "Courier & Parcel Scam (FedEx / India Post)",
        title: "FedEx, DHL & India Post Parcel Scam: Fake Courier Calls & SMS",
        short: "'Your parcel is held — pay ₹25 redelivery fee' or 'your parcel has drugs' calls and SMS.",
        answer:
          "Courier and parcel scams use fake FedEx, DHL, Blue Dart or India Post messages saying your parcel is on hold for an incomplete address or small customs fee, or that it contains illegal items. The link steals card details, and the 'illegal items' call leads to a digital arrest scam. Track parcels only on the courier's official website.",
        howItWorks: [
          "SMS says 'India Post: your package is held due to incomplete address, update within 12 hours' with a link.",
          "The fake site asks for a small fee (₹25–₹50) and captures your card number, CVV and OTP.",
          "Alternatively, an IVR call says a FedEx parcel in your name was seized with drugs and transfers you to 'police'.",
          "The 'police' then run a digital arrest scam to extract large sums.",
        ],
        redFlags: [
          "Parcel messages when you are not expecting any delivery",
          "Small 'redelivery' or 'customs' fees requested through a link",
          "Look-alike domains such as indiapost-track.top or fedex-in.help",
          "Calls pressing '1' to talk to customer care, then transfer to 'police'",
          "Claims that your Aadhaar was used to send illegal goods",
        ],
        whatToDo: [
          "Track parcels only on the courier's official website or app using the tracking number.",
          "Never pay redelivery or customs fees through SMS links.",
          "Hang up on calls about drugs in your parcel; the police do not call this way.",
          "If you shared card details, block the card immediately in your bank app.",
          "Report the SMS/call on Sanchar Saathi Chakshu and call 1930 if money was lost.",
        ],
        example:
          "IndiaPost: Your package has arrived at the warehouse but cannot be delivered due to incomplete address. Please update within 12 hours: https://indiapost.in-track.top/IN",
        faq: [
          { q: "Does India Post send SMS links asking for address updates?", a: "India Post does not ask you to pay fees or update addresses through random links. Check delivery status only on the official India Post website with your tracking number." },
          { q: "I got a call that my FedEx parcel has drugs. Is it real?", a: "No. This is the first step of the digital arrest scam. Courier companies and police do not handle such cases over phone or video calls. Hang up and report the number." },
        ],
      },
      hi: {
        name: "कूरियर और पार्सल स्कैम (FedEx / इंडिया पोस्ट)",
        title: "FedEx, DHL, इंडिया पोस्ट पार्सल स्कैम: नकली कूरियर कॉल और SMS",
        short: "'आपका पार्सल रुका है — ₹25 री-डिलीवरी फ़ीस दें' या 'आपके पार्सल में ड्रग्स हैं' वाले कॉल और SMS।",
        answer:
          "कूरियर और पार्सल स्कैम में नकली FedEx, DHL, Blue Dart या इंडिया पोस्ट मैसेज आते हैं कि अधूरे पते या छोटी कस्टम फ़ीस के कारण पार्सल रुका है, या उसमें अवैध सामान है। लिंक कार्ड की जानकारी चुराता है और 'अवैध सामान' वाला कॉल डिजिटल अरेस्ट स्कैम में बदल जाता है। पार्सल सिर्फ़ कूरियर की आधिकारिक वेबसाइट पर ट्रैक करें।",
        howItWorks: [
          "SMS आता है 'India Post: अधूरे पते के कारण पैकेज रुका है, 12 घंटे में अपडेट करें' और साथ में लिंक।",
          "नकली साइट छोटी फ़ीस (₹25–₹50) मांगती है और कार्ड नंबर, CVV और OTP चुरा लेती है।",
          "या फिर IVR कॉल कहता है कि आपके नाम का FedEx पार्सल ड्रग्स के साथ पकड़ा गया और कॉल 'पुलिस' को ट्रांसफ़र होता है।",
          "फिर 'पुलिस' डिजिटल अरेस्ट स्कैम से बड़ी रकम ऐंठती है।",
        ],
        redFlags: [
          "कोई डिलीवरी अपेक्षित न होने पर भी पार्सल के मैसेज",
          "लिंक के ज़रिए छोटी 'री-डिलीवरी' या 'कस्टम' फ़ीस",
          "indiapost-track.top या fedex-in.help जैसे मिलते-जुलते डोमेन",
          "कस्टमर केयर के लिए '1' दबाने के बाद 'पुलिस' को ट्रांसफ़र",
          "आपके आधार से अवैध सामान भेजे जाने का दावा",
        ],
        whatToDo: [
          "ट्रैकिंग नंबर से सिर्फ़ कूरियर की आधिकारिक वेबसाइट या ऐप पर पार्सल ट्रैक करें।",
          "SMS लिंक से कभी री-डिलीवरी या कस्टम फ़ीस न भरें।",
          "पार्सल में ड्रग्स वाले कॉल काट दें; पुलिस इस तरह कॉल नहीं करती।",
          "कार्ड की जानकारी दे दी हो तो बैंक ऐप में तुरंत कार्ड ब्लॉक करें।",
          "SMS/कॉल की शिकायत संचार साथी चक्षु पर करें और पैसा गया हो तो 1930 पर कॉल करें।",
        ],
        example: "IndiaPost: आपका पैकेज वेयरहाउस पहुंच गया है पर अधूरे पते के कारण डिलीवर नहीं हो सकता। कृपया 12 घंटे में अपडेट करें: https://indiapost.in-track.top/IN",
        faq: [
          { q: "क्या इंडिया पोस्ट पता अपडेट करने के लिए SMS लिंक भेजता है?", a: "इंडिया पोस्ट किसी अनजान लिंक से फ़ीस या पता अपडेट नहीं मांगता। डिलीवरी की स्थिति सिर्फ़ आधिकारिक इंडिया पोस्ट वेबसाइट पर ट्रैकिंग नंबर से देखें।" },
          { q: "कॉल आया कि मेरे FedEx पार्सल में ड्रग्स हैं। क्या यह सच है?", a: "नहीं। यह डिजिटल अरेस्ट स्कैम का पहला कदम है। कूरियर कंपनियां और पुलिस ऐसे मामले फ़ोन या वीडियो कॉल पर नहीं निपटाते। कॉल काटें और नंबर की शिकायत करें।" },
        ],
      },
    },
  },
  {
    slug: "electricity-bill-scam",
    icon: "⚡",
    accent: "#eab308",
    reportTo: ["ncrp", "chakshu"],
    content: {
      en: {
        name: "Electricity Bill Disconnection Scam",
        title: "Electricity Bill Scam SMS: 'Power Will Be Cut Tonight' Fraud",
        short: "'Your electricity will be disconnected at 9:30 PM tonight — call this officer' messages.",
        answer:
          "The electricity bill scam is an SMS or WhatsApp message claiming your power connection will be disconnected tonight because the last bill was not updated, and asking you to call an 'electricity officer'. The caller makes you pay a small amount via a link or install a screen-sharing app, then empties your account. Power companies never send such threats from mobile numbers.",
        howItWorks: [
          "SMS from a 10-digit number: 'Dear consumer, your electricity will be disconnected tonight at 9:30 PM. Contact officer 98XXXXXXXX'.",
          "The 'officer' asks you to pay ₹10–₹50 to 'update' the bill via a link or app.",
          "You are asked to install AnyDesk, TeamViewer or a fake 'bill update' APK.",
          "With remote access or the APK, the scammer captures OTPs and drains your bank account.",
        ],
        redFlags: [
          "Disconnection threat 'tonight' sent from a personal mobile number",
          "Asking you to call or WhatsApp an individual 'officer'",
          "Requests to install screen-sharing apps or APK files",
          "No consumer number, bill amount or official sender ID in the message",
        ],
        whatToDo: [
          "Check your bill status only on your electricity board's official website/app or via your registered consumer number.",
          "Never install apps or share screens at a caller's request.",
          "If you installed a remote-access app, uninstall it and change banking passwords from another device.",
          "Report the number on Sanchar Saathi Chakshu; call 1930 if money was debited.",
        ],
        example:
          "Dear Consumer your electricity power will be disconnected tonight at 9:30 pm from electricity office because your previous month bill was not update. Please immediately contact our electricity officer 98XXXXXX21. Thank you",
        faq: [
          { q: "Do electricity boards send disconnection SMS from mobile numbers?", a: "No. Official disconnection notices come with your consumer number and through official channels. Threats of disconnection 'tonight' from a personal mobile number are scams." },
          { q: "I installed AnyDesk on the caller's request. What should I do?", a: "Disconnect the internet, uninstall AnyDesk, call your bank to block cards and UPI, change passwords from a different device and call 1930 if money was taken." },
        ],
      },
      hi: {
        name: "बिजली बिल कनेक्शन कटने का स्कैम",
        title: "बिजली बिल स्कैम SMS: 'आज रात बिजली कट जाएगी' फ्रॉड",
        short: "'आज रात 9:30 बजे आपकी बिजली काट दी जाएगी — इस अधिकारी को कॉल करें' वाले मैसेज।",
        answer:
          "बिजली बिल स्कैम एक SMS या WhatsApp मैसेज है जो कहता है कि पिछला बिल अपडेट न होने के कारण आज रात आपकी बिजली काट दी जाएगी और 'बिजली अधिकारी' को कॉल करने को कहता है। कॉलर लिंक से छोटी रकम भरवाता है या स्क्रीन-शेयरिंग ऐप इंस्टॉल करवाकर खाता खाली कर देता है। बिजली कंपनियां मोबाइल नंबर से ऐसी धमकी नहीं भेजतीं।",
        howItWorks: [
          "10 अंकों के नंबर से SMS: 'प्रिय उपभोक्ता, आज रात 9:30 बजे आपकी बिजली कट जाएगी। अधिकारी से संपर्क करें 98XXXXXXXX'।",
          "'अधिकारी' बिल 'अपडेट' करने के लिए लिंक या ऐप से ₹10–₹50 भरने को कहता है।",
          "आपसे AnyDesk, TeamViewer या नकली 'बिल अपडेट' APK इंस्टॉल करवाया जाता है।",
          "रिमोट एक्सेस या APK से ठग OTP चुराकर बैंक खाता खाली कर देता है।",
        ],
        redFlags: [
          "निजी मोबाइल नंबर से 'आज रात' बिजली काटने की धमकी",
          "किसी व्यक्तिगत 'अधिकारी' को कॉल या WhatsApp करने को कहना",
          "स्क्रीन-शेयरिंग ऐप या APK इंस्टॉल करवाना",
          "मैसेज में उपभोक्ता नंबर, बिल राशि या आधिकारिक सेंडर ID न होना",
        ],
        whatToDo: [
          "बिल की स्थिति सिर्फ़ बिजली बोर्ड की आधिकारिक वेबसाइट/ऐप या अपने उपभोक्ता नंबर से जांचें।",
          "कॉलर के कहने पर कभी ऐप इंस्टॉल न करें या स्क्रीन शेयर न करें।",
          "रिमोट-एक्सेस ऐप इंस्टॉल किया हो तो उसे हटाएं और दूसरे डिवाइस से बैंकिंग पासवर्ड बदलें।",
          "नंबर की शिकायत संचार साथी चक्षु पर करें; पैसा कटा हो तो 1930 पर कॉल करें।",
        ],
        example: "प्रिय उपभोक्ता, पिछले महीने का बिल अपडेट न होने के कारण आज रात 9:30 बजे बिजली कार्यालय से आपकी बिजली काट दी जाएगी। कृपया तुरंत हमारे बिजली अधिकारी 98XXXXXX21 से संपर्क करें। धन्यवाद",
        faq: [
          { q: "क्या बिजली बोर्ड मोबाइल नंबर से कनेक्शन काटने का SMS भेजते हैं?", a: "नहीं। आधिकारिक नोटिस आपके उपभोक्ता नंबर के साथ आधिकारिक माध्यम से आते हैं। निजी मोबाइल नंबर से 'आज रात' कनेक्शन काटने की धमकी स्कैम है।" },
          { q: "मैंने कॉलर के कहने पर AnyDesk इंस्टॉल कर लिया। क्या करूं?", a: "इंटरनेट बंद करें, AnyDesk हटाएं, बैंक को कॉल करके कार्ड और UPI ब्लॉक करवाएं, दूसरे डिवाइस से पासवर्ड बदलें और पैसे गए हों तो 1930 पर कॉल करें।" },
        ],
      },
    },
  },
  {
    slug: "sextortion-video-call-scam",
    icon: "📹",
    accent: "#ec4899",
    reportTo: ["ncrp", "stopncii", "ncw"],
    content: {
      en: {
        name: "Sextortion & Video Call Blackmail Scam",
        title: "Sextortion Video Call Scam: What to Do If You're Blackmailed",
        short: "A video call from a stranger is recorded and morphed, then used to blackmail you for money.",
        answer:
          "In a sextortion scam, a stranger video-calls you on WhatsApp or befriends you on social media, records or morphs an intimate-looking clip, and threatens to send it to your contacts or 'YouTube' unless you pay. Paying never ends the demands. Do not pay, stop responding, keep evidence and report on cybercrime.gov.in.",
        howItWorks: [
          "A friendly profile (often of an attractive woman) chats with you on Instagram, Facebook or a dating app, or video-calls unexpectedly.",
          "During the call an explicit video plays; your face is screen-recorded and edited into a clip.",
          "The scammer sends the clip with screenshots of your contact list and threatens to share it.",
          "Fake 'police officers' or 'YouTube officials' may follow up demanding more money to 'delete' the video.",
        ],
        redFlags: [
          "Video calls from unknown numbers, especially late at night",
          "New online friends who quickly push for video calls or intimate chat",
          "Threats to send a video to family, colleagues or upload it online",
          "Follow-up calls from 'CBI' or 'YouTube' asking for money to remove the video",
        ],
        whatToDo: [
          "Do not pay — payment marks you as a target and the demands continue.",
          "Stop all communication, but do not delete the chats; take screenshots and save numbers and UPI IDs.",
          "Make your social-media friend lists private and warn close contacts if needed.",
          "File a complaint on cybercrime.gov.in (women and children can report anonymously in the special category).",
          "Use StopNCII.org to help block intimate images from spreading on major platforms.",
        ],
        example:
          "I have recorded your video call. Look at this clip. If you don't pay ₹25,000 in 1 hour I will send it to all your Facebook friends and family. I have your contact list.",
        faq: [
          { q: "Should I pay the sextortion blackmailer?", a: "No. Paying almost always leads to more demands. Scammers rarely follow through when victims stop responding and report the account. Keep evidence and file a complaint." },
          { q: "Where can I report sextortion in India?", a: "Report on cybercrime.gov.in under 'Report Women/Child Related Crime' (anonymous option available), call 1930, and for women also contact 181 or the National Commission for Women." },
        ],
      },
      hi: {
        name: "सेक्सटॉर्शन और वीडियो कॉल ब्लैकमेल स्कैम",
        title: "सेक्सटॉर्शन वीडियो कॉल स्कैम: ब्लैकमेल हो रहे हों तो क्या करें",
        short: "किसी अजनबी के वीडियो कॉल को रिकॉर्ड और एडिट करके पैसों के लिए ब्लैकमेल किया जाता है।",
        answer:
          "सेक्सटॉर्शन स्कैम में कोई अजनबी WhatsApp पर वीडियो कॉल करता है या सोशल मीडिया पर दोस्ती करता है, आपत्तिजनक-सी क्लिप रिकॉर्ड या एडिट करता है और पैसे न देने पर उसे आपके संपर्कों या 'YouTube' पर भेजने की धमकी देता है। पैसे देने से मांगें बंद नहीं होतीं। पैसे न दें, जवाब देना बंद करें, सबूत रखें और cybercrime.gov.in पर शिकायत करें।",
        howItWorks: [
          "एक दोस्ताना प्रोफ़ाइल (अक्सर किसी आकर्षक महिला की) Instagram, Facebook या डेटिंग ऐप पर चैट करती है या अचानक वीडियो कॉल करती है।",
          "कॉल के दौरान अश्लील वीडियो चलाया जाता है; आपका चेहरा स्क्रीन-रिकॉर्ड करके क्लिप बनाई जाती है।",
          "ठग आपकी संपर्क सूची के स्क्रीनशॉट के साथ क्लिप भेजकर उसे फैलाने की धमकी देता है।",
          "फिर नकली 'पुलिस अधिकारी' या 'YouTube अधिकारी' वीडियो 'हटाने' के लिए और पैसे मांगते हैं।",
        ],
        redFlags: [
          "अनजान नंबरों से वीडियो कॉल, ख़ासकर देर रात",
          "नए ऑनलाइन दोस्त जो जल्दी वीडियो कॉल या निजी बातचीत पर ज़ोर दें",
          "वीडियो परिवार, सहकर्मियों को भेजने या ऑनलाइन डालने की धमकी",
          "'CBI' या 'YouTube' से वीडियो हटाने के लिए पैसे मांगने वाले कॉल",
        ],
        whatToDo: [
          "पैसे न दें — भुगतान से आप निशाना बन जाते हैं और मांगें जारी रहती हैं।",
          "बातचीत बंद करें, पर चैट डिलीट न करें; स्क्रीनशॉट लें और नंबर व UPI ID सहेजें।",
          "सोशल-मीडिया फ्रेंड लिस्ट को प्राइवेट करें और ज़रूरत हो तो करीबियों को सावधान करें।",
          "cybercrime.gov.in पर शिकायत करें (महिलाएं और बच्चे विशेष श्रेणी में गुमनाम शिकायत कर सकते हैं)।",
          "बड़े प्लेटफ़ॉर्म पर निजी तस्वीरें फैलने से रोकने के लिए StopNCII.org का उपयोग करें।",
        ],
        example: "मैंने तुम्हारा वीडियो कॉल रिकॉर्ड कर लिया है। यह क्लिप देखो। 1 घंटे में ₹25,000 नहीं दिए तो तुम्हारे सभी Facebook दोस्तों और परिवार को भेज दूंगा। मेरे पास तुम्हारी कॉन्टैक्ट लिस्ट है।",
        faq: [
          { q: "क्या सेक्सटॉर्शन ब्लैकमेलर को पैसे दे दूं?", a: "नहीं। पैसे देने से लगभग हमेशा और मांगें होती हैं। जवाब न देने और शिकायत करने पर ठग शायद ही धमकी पूरी करते हैं। सबूत रखें और शिकायत दर्ज करें।" },
          { q: "भारत में सेक्सटॉर्शन की शिकायत कहां करें?", a: "cybercrime.gov.in पर 'महिला/बाल संबंधित अपराध' में शिकायत करें (गुमनाम विकल्प उपलब्ध), 1930 पर कॉल करें, और महिलाएं 181 या राष्ट्रीय महिला आयोग से भी संपर्क कर सकती हैं।" },
        ],
      },
    },
  },
  {
    slug: "loan-app-scam",
    icon: "📱",
    accent: "#14b8a6",
    reportTo: ["ncrp", "sachet", "rbiCms"],
    content: {
      en: {
        name: "Instant Loan App Scam",
        title: "Instant Loan App Scam: Harassment, Hidden Fees & Blackmail",
        short: "Instant loan apps take full phone access, charge huge hidden fees, then harass and blackmail your contacts.",
        answer:
          "Instant loan app scams offer quick loans with no documents, but the apps are unregistered, demand access to your contacts and photos, deduct huge hidden fees, and then harass you and your contacts with abusive calls and morphed photos to extort repeated payments. Borrow only from RBI-regulated banks and NBFCs listed on their apps.",
        howItWorks: [
          "Ads on social media promise instant loans with no CIBIL check.",
          "The app asks for permission to read contacts, gallery, SMS and location.",
          "You receive much less than the sanctioned amount, with a 7-day repayment term and huge interest.",
          "Recovery agents threaten you, message your contacts and circulate morphed photos until you pay again and again.",
        ],
        redFlags: [
          "Loan approval without any document or credit check",
          "App asks for contacts, photos and SMS permissions",
          "Lender name not linked to an RBI-registered bank or NBFC",
          "Very short tenure (7–14 days) and unclear fees",
          "APK download links instead of official app stores",
        ],
        whatToDo: [
          "Check the lender's NBFC partner on the RBI website before borrowing.",
          "Revoke app permissions and uninstall the app; keep proof of repayments.",
          "Do not pay extortion demands beyond the actual loan; save abusive messages.",
          "Report on cybercrime.gov.in and inform your contacts that morphed images are fake.",
          "Complain to RBI Sachet or the RBI Ombudsman about the app.",
        ],
        example:
          "Congratulations! ₹50,000 loan approved instantly without CIBIL. Download EasyCash app now: bit.ly/xxxx. Disbursal in 5 minutes.",
        faq: [
          { q: "How can I check if a loan app is legitimate?", a: "Legitimate digital lenders must disclose the RBI-regulated bank or NBFC they partner with. Verify that entity on the RBI website, and avoid apps that ask for contacts or gallery access." },
          { q: "Loan app agents are sending my photos to contacts. What should I do?", a: "Do not panic or pay extra. Save evidence, file a complaint on cybercrime.gov.in and at your local police station, and tell your contacts that the images are fake." },
        ],
      },
      hi: {
        name: "इंस्टेंट लोन ऐप स्कैम",
        title: "इंस्टेंट लोन ऐप स्कैम: उत्पीड़न, छिपी फ़ीस और ब्लैकमेल",
        short: "इंस्टेंट लोन ऐप फ़ोन का पूरा एक्सेस लेते हैं, भारी छिपी फ़ीस काटते हैं, फिर आपके संपर्कों को परेशान और ब्लैकमेल करते हैं।",
        answer:
          "इंस्टेंट लोन ऐप स्कैम बिना दस्तावेज़ के जल्दी लोन देने का वादा करते हैं, पर ये ऐप अपंजीकृत होते हैं, संपर्क और फ़ोटो का एक्सेस मांगते हैं, भारी छिपी फ़ीस काटते हैं और फिर आपको व आपके संपर्कों को गाली-गलौज और एडिट की गई फ़ोटो से बार-बार पैसे के लिए परेशान करते हैं। सिर्फ़ RBI-विनियमित बैंक और NBFC से लोन लें।",
        howItWorks: [
          "सोशल मीडिया विज्ञापन बिना CIBIL जांच के तुरंत लोन का वादा करते हैं।",
          "ऐप संपर्क, गैलरी, SMS और लोकेशन पढ़ने की अनुमति मांगता है।",
          "मंज़ूर राशि से बहुत कम पैसा मिलता है, 7 दिन में चुकाना होता है और ब्याज बहुत ज़्यादा।",
          "रिकवरी एजेंट धमकाते हैं, संपर्कों को मैसेज करते हैं और एडिट की गई फ़ोटो फैलाते हैं जब तक आप बार-बार भुगतान न करें।",
        ],
        redFlags: [
          "बिना किसी दस्तावेज़ या क्रेडिट जांच के लोन मंज़ूरी",
          "ऐप संपर्क, फ़ोटो और SMS की अनुमति मांगे",
          "ऋणदाता RBI-पंजीकृत बैंक या NBFC से न जुड़ा हो",
          "बहुत कम अवधि (7–14 दिन) और अस्पष्ट शुल्क",
          "आधिकारिक ऐप स्टोर के बजाय APK डाउनलोड लिंक",
        ],
        whatToDo: [
          "लोन लेने से पहले RBI वेबसाइट पर ऋणदाता के NBFC पार्टनर की जांच करें।",
          "ऐप की अनुमतियां हटाएं और ऐप अनइंस्टॉल करें; भुगतान के सबूत रखें।",
          "असली लोन से ज़्यादा वसूली की मांग पूरी न करें; धमकी भरे मैसेज सहेजें।",
          "cybercrime.gov.in पर शिकायत करें और संपर्कों को बताएं कि एडिट की गई तस्वीरें नकली हैं।",
          "ऐप की शिकायत RBI सचेत या RBI लोकपाल पर करें।",
        ],
        example: "बधाई हो! बिना CIBIL के ₹50,000 का लोन तुरंत मंज़ूर। अभी EasyCash ऐप डाउनलोड करें: bit.ly/xxxx. 5 मिनट में पैसा खाते में।",
        faq: [
          { q: "कैसे जांचें कि लोन ऐप असली है?", a: "असली डिजिटल ऋणदाता को बताना होता है कि वह किस RBI-विनियमित बैंक या NBFC के साथ काम करता है। उस संस्था को RBI वेबसाइट पर जांचें और संपर्क या गैलरी एक्सेस मांगने वाले ऐप से बचें।" },
          { q: "लोन ऐप एजेंट मेरी फ़ोटो संपर्कों को भेज रहे हैं। क्या करूं?", a: "घबराएं नहीं और अतिरिक्त भुगतान न करें। सबूत सहेजें, cybercrime.gov.in और स्थानीय थाने में शिकायत करें, और संपर्कों को बताएं कि तस्वीरें नकली हैं।" },
        ],
      },
    },
  },
  {
    slug: "fake-customer-care-scam",
    icon: "☎️",
    accent: "#6366f1",
    reportTo: ["ncrp", "chakshu", "nch"],
    content: {
      en: {
        name: "Fake Customer Care Number Scam",
        title: "Fake Customer Care Number Scam on Google: How to Avoid It",
        short: "Fake helpline numbers on Google, Maps or social media 'help' with refunds — by stealing your money.",
        answer:
          "In the fake customer care scam, fraudsters list fake helpline numbers on Google search, Google Maps or social media for banks, airlines, food delivery and e-commerce brands. When you call for a refund or complaint, they ask you to share screen, install an app or enter your UPI PIN, and steal money. Always take helpline numbers from the official app or website.",
        howItWorks: [
          "You search 'Zomato refund customer care number' or 'bank helpline' and call the first number you see.",
          "The 'agent' sounds professional and promises a quick refund.",
          "They send a link, collect request or ask you to install a screen-sharing app 'to process the refund'.",
          "You end up approving a payment or revealing OTPs, and money leaves your account.",
        ],
        redFlags: [
          "Helpline numbers that are ordinary 10-digit mobile numbers (genuine bank service calls come from 1600-series numbers)",
          "Agents asking for your UPI PIN, OTP, card number or CVV for a 'refund'",
          "Requests to install AnyDesk, TeamViewer, QuickSupport or similar",
          "Refunds that require you to scan a QR or accept a collect request",
        ],
        whatToDo: [
          "Get helpline numbers only from the official app, website or your card/passbook.",
          "Never share OTP, PIN or screen with a 'support agent'.",
          "If money was taken, call 1930 and your bank immediately.",
          "Report the fake number on Sanchar Saathi Chakshu and flag it on Google Maps.",
        ],
        example:
          "Thank you for calling Swiggy Customer Care. To process your ₹450 refund, please download the RustDesk app and share the 9-digit code, then enter your UPI PIN to receive the amount.",
        faq: [
          { q: "Can I trust customer care numbers shown on Google?", a: "Not always. Scammers edit business listings and post fake numbers. Always use the support section inside the official app or website." },
          { q: "Do companies need my UPI PIN to give a refund?", a: "No. Refunds are credited automatically to your source account. Nobody needs your UPI PIN, OTP or screen access to send you money." },
        ],
      },
      hi: {
        name: "नकली कस्टमर केयर नंबर स्कैम",
        title: "Google पर नकली कस्टमर केयर नंबर स्कैम: कैसे बचें",
        short: "Google, Maps या सोशल मीडिया पर नकली हेल्पलाइन नंबर रिफंड में 'मदद' करते हैं — आपका पैसा चुराकर।",
        answer:
          "नकली कस्टमर केयर स्कैम में ठग बैंक, एयरलाइन, फ़ूड डिलीवरी और ई-कॉमर्स ब्रांड के नकली हेल्पलाइन नंबर Google सर्च, Google Maps या सोशल मीडिया पर डाल देते हैं। रिफंड या शिकायत के लिए कॉल करने पर वे स्क्रीन शेयर, ऐप इंस्टॉल या UPI PIN डलवाकर पैसा चुरा लेते हैं। हेल्पलाइन नंबर हमेशा आधिकारिक ऐप या वेबसाइट से लें।",
        howItWorks: [
          "आप 'Zomato रिफंड कस्टमर केयर नंबर' या 'बैंक हेल्पलाइन' खोजते हैं और पहले दिखे नंबर पर कॉल करते हैं।",
          "'एजेंट' पेशेवर लगता है और जल्दी रिफंड का वादा करता है।",
          "वह 'रिफंड प्रोसेस' करने के लिए लिंक, कलेक्ट रिक्वेस्ट भेजता है या स्क्रीन-शेयरिंग ऐप इंस्टॉल करवाता है।",
          "आप भुगतान मंज़ूर कर देते हैं या OTP बता देते हैं, और पैसा खाते से निकल जाता है।",
        ],
        redFlags: [
          "हेल्पलाइन नंबर जो साधारण 10 अंकों के मोबाइल नंबर हों (असली बैंक सेवा कॉल 1600-सीरीज़ नंबरों से आते हैं)",
          "'रिफंड' के लिए UPI PIN, OTP, कार्ड नंबर या CVV मांगना",
          "AnyDesk, TeamViewer, QuickSupport जैसे ऐप इंस्टॉल करवाना",
          "रिफंड के लिए QR स्कैन या कलेक्ट रिक्वेस्ट स्वीकार करवाना",
        ],
        whatToDo: [
          "हेल्पलाइन नंबर सिर्फ़ आधिकारिक ऐप, वेबसाइट या कार्ड/पासबुक से लें।",
          "किसी 'सपोर्ट एजेंट' को OTP, PIN या स्क्रीन न दें।",
          "पैसा गया हो तो तुरंत 1930 और बैंक को कॉल करें।",
          "नकली नंबर की शिकायत संचार साथी चक्षु पर करें और Google Maps पर रिपोर्ट करें।",
        ],
        example: "Swiggy कस्टमर केयर में कॉल करने के लिए धन्यवाद। ₹450 रिफंड के लिए RustDesk ऐप डाउनलोड करके 9 अंकों का कोड बताएं, फिर राशि पाने के लिए UPI PIN डालें।",
        faq: [
          { q: "क्या Google पर दिखे कस्टमर केयर नंबर भरोसेमंद हैं?", a: "हमेशा नहीं। ठग बिज़नेस लिस्टिंग बदलकर नकली नंबर डाल देते हैं। हमेशा आधिकारिक ऐप या वेबसाइट के सपोर्ट सेक्शन का उपयोग करें।" },
          { q: "क्या रिफंड के लिए कंपनी को मेरा UPI PIN चाहिए?", a: "नहीं। रिफंड अपने आप मूल खाते में आता है। आपको पैसे भेजने के लिए किसी को UPI PIN, OTP या स्क्रीन एक्सेस की ज़रूरत नहीं होती।" },
        ],
      },
    },
  },
  {
    slug: "e-challan-scam",
    icon: "🚦",
    accent: "#ef4444",
    reportTo: ["ncrp", "chakshu", "echallan"],
    content: {
      en: {
        name: "Fake e-Challan (Traffic Fine) Scam",
        title: "Fake e-Challan SMS Scam: How to Check a Traffic Challan",
        short: "SMS or WhatsApp says you have a pending traffic fine — the link leads to a fake payment page or a malicious app.",
        answer:
          "A fake e-challan scam is an SMS or WhatsApp message claiming you have an unpaid traffic fine and must pay through a link, often within hours. The link opens a look-alike payment page that steals card details or installs a malicious APK. Check challans only on the official echallan.parivahan.gov.in website or the mParivahan app using your vehicle number.",
        howItWorks: [
          "You receive a message like 'Your vehicle has a pending challan of ₹500. Pay today to avoid court action' with a link.",
          "The link uses a look-alike domain (e.g. echallan-parivahan.info) or asks you to download an 'e-Challan.apk'.",
          "The fake page asks for card details and OTP, or the APK reads your SMS and steals future OTPs.",
          "Money is debited and the scammer may take over your banking or WhatsApp.",
        ],
        redFlags: [
          "Challan message from a 10-digit mobile number or WhatsApp",
          "Link not on parivahan.gov.in (e.g. .info, .top, .xyz or extra words)",
          "Asks to install an APK file to 'view challan'",
          "Threat of licence suspension or court case 'today'",
        ],
        whatToDo: [
          "Don't click the link — check challans on echallan.parivahan.gov.in or the mParivahan app with your vehicle number.",
          "Never install an APK file sent by SMS or WhatsApp.",
          "If you paid or shared card details, block the card and call 1930 immediately.",
          "Report the message on Sanchar Saathi Chakshu.",
        ],
        example:
          "Dear Vehicle Owner, your vehicle MH12XX1234 has a pending traffic challan of Rs.500. Pay within 24 hrs to avoid court proceedings: https://echallan-parivahan.info/pay",
        faq: [
          { q: "How do I check if a traffic challan is real?", a: "Go to echallan.parivahan.gov.in or open the mParivahan app and search with your vehicle number, challan number or DL number. A genuine challan will appear there." },
          { q: "Do traffic police send challan links on WhatsApp?", a: "Official e-challan notices come from the government's Parivahan system. Treat challan links from personal numbers or WhatsApp as suspicious and verify on the official website instead." },
        ],
      },
      hi: {
        name: "नकली ई-चालान (ट्रैफ़िक जुर्माना) स्कैम",
        title: "नकली ई-चालान SMS स्कैम: ट्रैफ़िक चालान कैसे जांचें",
        short: "SMS या WhatsApp कहता है कि आपका ट्रैफ़िक जुर्माना बाकी है — लिंक नकली पेमेंट पेज या ख़तरनाक ऐप पर ले जाता है।",
        answer:
          "नकली ई-चालान स्कैम एक SMS या WhatsApp मैसेज है जो कहता है कि आपका ट्रैफ़िक जुर्माना बाकी है और लिंक से तुरंत भरना होगा। लिंक नकली पेमेंट पेज खोलता है जो कार्ड की जानकारी चुराता है या ख़तरनाक APK इंस्टॉल करवाता है। चालान सिर्फ़ आधिकारिक echallan.parivahan.gov.in वेबसाइट या mParivahan ऐप पर वाहन नंबर से जांचें।",
        howItWorks: [
          "मैसेज आता है: 'आपके वाहन पर ₹500 का चालान बाकी है। कोर्ट कार्रवाई से बचने के लिए आज भरें' और साथ में लिंक।",
          "लिंक मिलता-जुलता डोमेन (जैसे echallan-parivahan.info) इस्तेमाल करता है या 'e-Challan.apk' डाउनलोड करवाता है।",
          "नकली पेज कार्ड और OTP मांगता है, या APK आपके SMS पढ़कर आगे के OTP चुरा लेता है।",
          "पैसा कट जाता है और ठग आपकी बैंकिंग या WhatsApp पर कब्ज़ा कर सकता है।",
        ],
        redFlags: [
          "10 अंकों के मोबाइल नंबर या WhatsApp से चालान का मैसेज",
          "लिंक parivahan.gov.in पर नहीं (जैसे .info, .top, .xyz या अतिरिक्त शब्द)",
          "'चालान देखने' के लिए APK फ़ाइल इंस्टॉल करवाना",
          "'आज ही' लाइसेंस निलंबन या कोर्ट केस की धमकी",
        ],
        whatToDo: [
          "लिंक पर क्लिक न करें — echallan.parivahan.gov.in या mParivahan ऐप पर वाहन नंबर से चालान जांचें।",
          "SMS या WhatsApp से आई APK फ़ाइल कभी इंस्टॉल न करें।",
          "भुगतान कर दिया या कार्ड की जानकारी दे दी हो तो कार्ड ब्लॉक करें और तुरंत 1930 पर कॉल करें।",
          "मैसेज की शिकायत संचार साथी चक्षु पर करें।",
        ],
        example: "प्रिय वाहन मालिक, आपके वाहन MH12XX1234 पर Rs.500 का ट्रैफ़िक चालान बाकी है। कोर्ट कार्रवाई से बचने के लिए 24 घंटे में भरें: https://echallan-parivahan.info/pay",
        faq: [
          { q: "कैसे जांचें कि ट्रैफ़िक चालान असली है?", a: "echallan.parivahan.gov.in पर जाएं या mParivahan ऐप खोलें और वाहन नंबर, चालान नंबर या DL नंबर से खोजें। असली चालान वहां दिखेगा।" },
          { q: "क्या ट्रैफ़िक पुलिस WhatsApp पर चालान लिंक भेजती है?", a: "आधिकारिक ई-चालान सरकार के परिवहन सिस्टम से आते हैं। निजी नंबर या WhatsApp से आए चालान लिंक को संदिग्ध मानें और आधिकारिक वेबसाइट पर जांचें।" },
        ],
      },
    },
  },
  {
    slug: "aeps-aadhaar-fingerprint-fraud",
    icon: "🖐️",
    accent: "#0ea5e9",
    reportTo: ["ncrp", "uidai", "rbiCms"],
    content: {
      en: {
        name: "AePS / Aadhaar Fingerprint Fraud",
        title: "AePS Fraud: Money Withdrawn via Aadhaar Fingerprint — What to Do",
        short: "Money vanishes from your bank account without any OTP — withdrawn using your cloned or misused Aadhaar fingerprint.",
        answer:
          "AePS fraud happens when criminals withdraw money from your bank account through the Aadhaar Enabled Payment System using your Aadhaar number and a cloned or misused fingerprint — no OTP is needed. Protect yourself by locking your Aadhaar biometrics on myAadhaar or the mAadhaar app and unlocking them only when you need them.",
        howItWorks: [
          "Fraudsters collect Aadhaar numbers and fingerprints from leaked documents, property registry papers or fake 'survey' or 'scheme' camps.",
          "They make a fake fingerprint (for example with silicone) from the captured print.",
          "Using an AePS micro-ATM, they withdraw cash from your Aadhaar-linked bank account.",
          "You only notice when you see small withdrawals in your passbook or SMS, often with no OTP alert.",
        ],
        redFlags: [
          "Withdrawals marked 'AePS' that you didn't make",
          "Someone asks for your thumbprint for a 'free scheme', ration or SIM",
          "Sharing Aadhaar photocopies without masking the number",
          "Biometrics unlocked permanently on your Aadhaar",
        ],
        whatToDo: [
          "Lock your Aadhaar biometrics on myAadhaar or the mAadhaar app; unlock only when needed.",
          "Check your Aadhaar authentication history on myAadhaar for unknown use.",
          "Inform your bank in writing and call 1930 for any unauthorised AePS withdrawal.",
          "Use a masked Aadhaar (only last 4 digits visible) when sharing copies.",
        ],
        example:
          "Free government scheme registration camp today! Bring Aadhaar card and give thumb impression to get ₹5,000 subsidy in your bank account.",
        faq: [
          { q: "Can money be withdrawn using only my Aadhaar number?", a: "Not with the number alone — AePS also needs your fingerprint. But fraudsters clone fingerprints, so lock your biometrics on myAadhaar to block AePS misuse." },
          { q: "How do I lock Aadhaar biometrics?", a: "Log in to myAadhaar (myaadhaar.uidai.gov.in) or the mAadhaar app with your Aadhaar-linked mobile OTP and choose 'Lock/Unlock Biometrics'. You can unlock temporarily whenever you need to use them." },
        ],
      },
      hi: {
        name: "AePS / आधार फ़िंगरप्रिंट फ्रॉड",
        title: "AePS फ्रॉड: आधार फ़िंगरप्रिंट से पैसे निकाले गए — क्या करें",
        short: "बिना किसी OTP के बैंक खाते से पैसे गायब — आपके क्लोन या दुरुपयोग किए गए आधार फ़िंगरप्रिंट से निकाले गए।",
        answer:
          "AePS फ्रॉड तब होता है जब अपराधी आपके आधार नंबर और क्लोन किए गए फ़िंगरप्रिंट से आधार आधारित भुगतान प्रणाली (AePS) के ज़रिए आपके बैंक खाते से पैसे निकाल लेते हैं — इसमें OTP नहीं लगता। बचाव के लिए myAadhaar या mAadhaar ऐप पर अपने आधार बायोमेट्रिक लॉक रखें और ज़रूरत पर ही अनलॉक करें।",
        howItWorks: [
          "ठग लीक दस्तावेज़ों, रजिस्ट्री कागज़ों या नकली 'सर्वे'/'योजना' कैंप से आधार नंबर और फ़िंगरप्रिंट जुटाते हैं।",
          "वे पकड़े गए निशान से नकली फ़िंगरप्रिंट (जैसे सिलिकॉन से) बनाते हैं।",
          "AePS माइक्रो-ATM से आपके आधार-लिंक्ड बैंक खाते से नकद निकालते हैं।",
          "आपको तब पता चलता है जब पासबुक या SMS में छोटी-छोटी निकासी दिखती है, अक्सर बिना OTP अलर्ट के।",
        ],
        redFlags: [
          "'AePS' वाली निकासी जो आपने नहीं की",
          "'मुफ़्त योजना', राशन या SIM के लिए कोई आपका अंगूठा लगवाए",
          "बिना नंबर छिपाए आधार की फ़ोटोकॉपी देना",
          "आधार बायोमेट्रिक हमेशा अनलॉक रहना",
        ],
        whatToDo: [
          "myAadhaar या mAadhaar ऐप पर आधार बायोमेट्रिक लॉक करें; ज़रूरत पर ही अनलॉक करें।",
          "myAadhaar पर ऑथेंटिकेशन इतिहास में अनजान उपयोग देखें।",
          "अनधिकृत AePS निकासी पर बैंक को लिखित सूचना दें और 1930 पर कॉल करें।",
          "कॉपी देते समय मास्क्ड आधार (सिर्फ़ आख़िरी 4 अंक दिखें) इस्तेमाल करें।",
        ],
        example: "आज मुफ़्त सरकारी योजना पंजीकरण कैंप! आधार कार्ड लाएं और अंगूठा लगाकर अपने बैंक खाते में ₹5,000 सब्सिडी पाएं।",
        faq: [
          { q: "क्या सिर्फ़ आधार नंबर से पैसे निकल सकते हैं?", a: "सिर्फ़ नंबर से नहीं — AePS में फ़िंगरप्रिंट भी लगता है। लेकिन ठग फ़िंगरप्रिंट क्लोन करते हैं, इसलिए myAadhaar पर बायोमेट्रिक लॉक करके AePS दुरुपयोग रोकें।" },
          { q: "आधार बायोमेट्रिक कैसे लॉक करें?", a: "myAadhaar (myaadhaar.uidai.gov.in) या mAadhaar ऐप में आधार से जुड़े मोबाइल OTP से लॉगिन करें और 'Lock/Unlock Biometrics' चुनें। ज़रूरत पड़ने पर अस्थायी रूप से अनलॉक कर सकते हैं।" },
        ],
      },
    },
  },
  {
    slug: "ai-voice-clone-scam",
    icon: "🎙️",
    accent: "#8b5cf6",
    reportTo: ["ncrp", "chakshu"],
    content: {
      en: {
        name: "AI Voice-Clone & Deepfake Call Scam",
        title: "AI Voice Clone Scam: 'Your Son Is in Trouble' Calls Explained",
        short: "A caller uses an AI copy of a relative's voice — or a deepfake video — to claim an emergency and demand money urgently.",
        answer:
          "In an AI voice-clone scam, criminals copy a family member's voice from social-media videos and call you claiming an emergency — an accident, arrest or kidnapping — and demand urgent money by UPI. Deepfake video calls work the same way. Hang up and call the person back on their own saved number, and agree on a family code word.",
        howItWorks: [
          "Scammers collect a few seconds of a person's voice from Instagram reels, YouTube or WhatsApp voice notes.",
          "AI tools generate a realistic copy of that voice saying anything they type.",
          "You get a call: 'Papa/Mummy, I've been arrested/had an accident — please send money now, don't tell anyone.'",
          "A fake 'police officer' or 'doctor' may join the call and give a UPI ID for immediate payment.",
        ],
        redFlags: [
          "Panic call from a relative using an unknown number",
          "Pressure to pay immediately and keep it secret",
          "Caller avoids answering personal questions",
          "Video call with odd lip-sync, blurring or a frozen face",
        ],
        whatToDo: [
          "Hang up and call your family member back on the number saved in your phone.",
          "Ask a question only the real person would know, or use a family code word.",
          "Never send money on the basis of a voice or video call alone.",
          "Report the number on Chakshu; if you paid, call 1930 immediately.",
        ],
        example: "Mummy, it's me! I hit someone with the car and the police have caught me. Please send ₹50,000 to this officer's UPI right now, don't tell Papa.",
        faq: [
          { q: "Can scammers really copy my voice?", a: "Yes. AI voice-cloning tools can imitate a voice from a short recording. Keep social-media accounts private and be cautious about posting voice clips publicly." },
          { q: "How do I protect my family from voice-clone scams?", a: "Agree on a secret family code word, always call back on a saved number before sending money, and tell elderly relatives about this scam." },
        ],
      },
      hi: {
        name: "AI आवाज़-क्लोन और डीपफ़ेक कॉल स्कैम",
        title: "AI वॉयस क्लोन स्कैम: 'आपका बेटा मुसीबत में है' वाले कॉल",
        short: "कॉलर किसी रिश्तेदार की AI से बनी आवाज़ — या डीपफ़ेक वीडियो — से इमरजेंसी बताकर तुरंत पैसे मांगता है।",
        answer:
          "AI वॉयस-क्लोन स्कैम में ठग सोशल मीडिया वीडियो से परिवार के किसी सदस्य की आवाज़ कॉपी करके कॉल करते हैं और दुर्घटना, गिरफ़्तारी या अपहरण जैसी इमरजेंसी बताकर UPI से तुरंत पैसे मांगते हैं। डीपफ़ेक वीडियो कॉल भी ऐसे ही होते हैं। फ़ोन काटें और व्यक्ति को उसके सेव किए नंबर पर वापस कॉल करें, और परिवार का एक कोड वर्ड तय करें।",
        howItWorks: [
          "ठग इंस्टाग्राम रील, YouTube या WhatsApp वॉयस नोट से किसी की कुछ सेकंड की आवाज़ जुटाते हैं।",
          "AI टूल उस आवाज़ की असली जैसी नकल बनाते हैं जो कुछ भी बोल सकती है।",
          "कॉल आता है: 'पापा/मम्मी, मैं गिरफ़्तार हो गया/एक्सीडेंट हो गया — अभी पैसे भेजो, किसी को मत बताना।'",
          "नकली 'पुलिस अधिकारी' या 'डॉक्टर' कॉल में जुड़कर तुरंत भुगतान के लिए UPI ID देता है।",
        ],
        redFlags: [
          "अनजान नंबर से किसी रिश्तेदार का घबराहट भरा कॉल",
          "तुरंत भुगतान और बात छिपाने का दबाव",
          "कॉलर निजी सवालों के जवाब देने से बचता है",
          "वीडियो कॉल में होंठ-आवाज़ मेल न खाना, धुंधलापन या जमा हुआ चेहरा",
        ],
        whatToDo: [
          "फ़ोन काटें और परिवार के सदस्य को आपके फ़ोन में सेव नंबर पर वापस कॉल करें।",
          "ऐसा सवाल पूछें जो सिर्फ़ असली व्यक्ति जानता हो, या परिवार का कोड वर्ड इस्तेमाल करें।",
          "सिर्फ़ आवाज़ या वीडियो कॉल के आधार पर कभी पैसे न भेजें।",
          "नंबर की शिकायत चक्षु पर करें; पैसे भेज दिए हों तो तुरंत 1930 पर कॉल करें।",
        ],
        example: "मम्मी, मैं हूं! मेरी गाड़ी से किसी को टक्कर लग गई और पुलिस ने पकड़ लिया है। अभी इस अधिकारी के UPI पर ₹50,000 भेजो, पापा को मत बताना।",
        faq: [
          { q: "क्या ठग सच में मेरी आवाज़ कॉपी कर सकते हैं?", a: "हां। AI वॉयस-क्लोनिंग टूल छोटी रिकॉर्डिंग से आवाज़ की नकल कर सकते हैं। सोशल मीडिया अकाउंट प्राइवेट रखें और सार्वजनिक रूप से आवाज़ वाले क्लिप डालते समय सावधान रहें।" },
          { q: "परिवार को वॉयस-क्लोन स्कैम से कैसे बचाएं?", a: "परिवार का एक गुप्त कोड वर्ड तय करें, पैसे भेजने से पहले हमेशा सेव नंबर पर वापस कॉल करें और घर के बुज़ुर्गों को इस स्कैम के बारे में बताएं।" },
        ],
      },
    },
  },
  {
    slug: "lottery-prize-scam",
    icon: "🎁",
    accent: "#d946ef",
    reportTo: ["ncrp", "chakshu"],
    content: {
      en: {
        name: "KBC Lottery & Prize Scam",
        title: "KBC Lottery Scam & Fake Prize Messages: Don't Pay to Win",
        short: "'You won ₹25 lakh in KBC lottery' — pay a small processing fee or GST to claim it.",
        answer:
          "Lottery and prize scams claim you have won a KBC lottery, lucky draw, iPhone or car and ask you to pay a 'processing fee', 'GST' or 'RBI clearance charge' to claim it. Genuine prizes never require advance payment, and you cannot win a lottery you never entered. Ignore and report such messages.",
        howItWorks: [
          "You get a WhatsApp voice note or image with KBC logos and a 'lottery number'.",
          "You are told to contact a 'manager' on WhatsApp to claim ₹25 lakh.",
          "To release the prize you must pay a fee, GST, income tax or 'RBI charge'.",
          "Each payment leads to a new fee until you stop.",
        ],
        redFlags: [
          "Winning a lottery or contest you never entered",
          "Payment demanded before receiving a prize",
          "Use of celebrity photos, KBC/RBI logos and fake certificates",
          "Prize managers who only talk on WhatsApp from +92 or random numbers",
        ],
        whatToDo: [
          "Do not reply or pay any fee.",
          "Block the number and report it in WhatsApp and on Sanchar Saathi Chakshu.",
          "If you paid, call 1930 and file a complaint on cybercrime.gov.in.",
          "Warn elderly family members — they are frequent targets.",
        ],
        example:
          "Congratulations! Your WhatsApp number has won ₹25,00,000 in KBC Lucky Draw 2026. Lottery No. 8888. Contact Mr. Rana Pratap Singh on WhatsApp to claim. Pay ₹12,500 GST to release amount.",
        faq: [
          { q: "Is the KBC WhatsApp lottery real?", a: "No. KBC does not run lotteries on WhatsApp and never asks winners to pay fees. Such messages are scams." },
          { q: "Why do prize scammers ask for GST or tax first?", a: "Asking for 'taxes' makes the scam look official. Real prize taxes are deducted from the prize amount, never paid in advance to a stranger's account." },
        ],
      },
      hi: {
        name: "KBC लॉटरी और इनाम स्कैम",
        title: "KBC लॉटरी स्कैम और नकली इनाम मैसेज: जीतने के लिए पैसे न दें",
        short: "'आपने KBC लॉटरी में ₹25 लाख जीते' — इनाम पाने के लिए छोटी प्रोसेसिंग फ़ीस या GST भरें।",
        answer:
          "लॉटरी और इनाम स्कैम दावा करते हैं कि आपने KBC लॉटरी, लकी ड्रॉ, iPhone या कार जीती है और इनाम पाने के लिए 'प्रोसेसिंग फ़ीस', 'GST' या 'RBI क्लियरेंस चार्ज' मांगते हैं। असली इनाम के लिए कभी पहले भुगतान नहीं करना पड़ता, और जिस लॉटरी में आपने भाग ही नहीं लिया उसे आप जीत नहीं सकते। ऐसे मैसेज अनदेखा करें और रिपोर्ट करें।",
        howItWorks: [
          "आपको KBC लोगो वाला WhatsApp वॉइस नोट या तस्वीर और 'लॉटरी नंबर' मिलता है।",
          "₹25 लाख पाने के लिए WhatsApp पर एक 'मैनेजर' से संपर्क करने को कहा जाता है।",
          "इनाम जारी करने के लिए फ़ीस, GST, इनकम टैक्स या 'RBI चार्ज' भरना होता है।",
          "हर भुगतान के बाद नई फ़ीस आती है जब तक आप रुक न जाएं।",
        ],
        redFlags: [
          "ऐसी लॉटरी या प्रतियोगिता जीतना जिसमें आपने भाग नहीं लिया",
          "इनाम मिलने से पहले भुगतान की मांग",
          "सेलिब्रिटी फ़ोटो, KBC/RBI लोगो और नकली प्रमाणपत्र",
          "+92 या अनजान नंबरों से सिर्फ़ WhatsApp पर बात करने वाले 'मैनेजर'",
        ],
        whatToDo: [
          "जवाब न दें और कोई फ़ीस न भरें।",
          "नंबर ब्लॉक करें और WhatsApp व संचार साथी चक्षु पर रिपोर्ट करें।",
          "भुगतान कर दिया हो तो 1930 पर कॉल करें और cybercrime.gov.in पर शिकायत करें।",
          "घर के बुज़ुर्गों को सावधान करें — वे अक्सर निशाना बनते हैं।",
        ],
        example: "बधाई हो! आपके WhatsApp नंबर ने KBC लकी ड्रॉ 2026 में ₹25,00,000 जीते हैं। लॉटरी नं. 8888। इनाम के लिए WhatsApp पर श्री राणा प्रताप सिंह से संपर्क करें। राशि जारी करने के लिए ₹12,500 GST भरें।",
        faq: [
          { q: "क्या KBC WhatsApp लॉटरी असली है?", a: "नहीं। KBC WhatsApp पर लॉटरी नहीं चलाता और विजेताओं से कभी फ़ीस नहीं मांगता। ऐसे मैसेज स्कैम हैं।" },
          { q: "इनाम स्कैमर पहले GST या टैक्स क्यों मांगते हैं?", a: "'टैक्स' मांगने से स्कैम आधिकारिक लगता है। असली इनाम का टैक्स इनाम की राशि से काटा जाता है, किसी अजनबी के खाते में पहले नहीं भरा जाता।" },
        ],
      },
    },
  },
];

export function getScam(slug: string): Scam | undefined {
  return scams.find((s) => s.slug === slug);
}

export function scamText(scam: Scam, lang: Locale): ScamText {
  return scam.content[lang];
}
