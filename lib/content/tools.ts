import type { Bilingual } from "../site";

export type ToolMode = "text" | "url" | "image" | "upi" | "phone" | "qr";

export type ToolText = {
  nav: string; // short label for cards
  title: string; // <title> (≤ ~65 chars)
  description: string; // meta description (≤ ~160 chars)
  h1: string;
  intro: string;
  answer: string; // answer-first block for snippets & AI engines
  stepsTitle: string;
  steps: [string, string][];
  flagsTitle: string;
  flags: string[];
  faq: { q: string; a: string }[];
};

export type Tool = { slug: string; mode: ToolMode; icon: string; content: Bilingual<ToolText> };

export const tools: Tool[] = [
  {
    slug: "scam-message-checker",
    mode: "text",
    icon: "inbox",
    content: {
      en: {
        nav: "SMS & WhatsApp message checker",
        title: "Scam Message Checker: Check SMS & WhatsApp Free (India)",
        description:
          "Free scam message checker for India. Paste any SMS, WhatsApp or email text and instantly see if it's a scam — KYC, UPI, job, parcel, electricity bill and digital arrest frauds. No login.",
        h1: "Free Scam Message Checker for SMS & WhatsApp",
        intro: "Got a message asking you to update KYC, pay a bill, claim a prize or call an 'officer'? Paste it below. Our AI and Indian scam-pattern engine tell you in seconds if it's fake — in English or Hindi.",
        answer:
          "To check if an SMS or WhatsApp message is a scam, paste the full text into the Cyber Kavach scam message checker. It looks for Indian fraud signs — urgent threats, KYC or account-block warnings, OTP or UPI PIN requests, fake links and prize offers — and gives a risk score with next steps. Never click links or share OTPs while checking.",
        stepsTitle: "How to check a message manually",
        steps: [
          ["Look at the sender", "Banks and companies send SMS from short sender IDs (like AX-SBIBNK), not from 10-digit mobile numbers."],
          ["Spot the pressure", "Threats like 'account blocked today', 'power cut tonight' or 'you are under arrest' are designed to make you panic."],
          ["Check what they want", "Any request for OTP, UPI PIN, card details, remote-access apps or a 'small fee' is a scam."],
          ["Inspect the link without opening it", "Official banks use the .bank.in domain; look-alike or shortened links are red flags. Paste them into our link checker."],
          ["Verify through official channels", "Open the official app or call the number printed on your card — never the number in the message."],
        ],
        flagsTitle: "Common scam message red flags",
        flags: [
          "Account, SIM, PAN or electricity 'will be blocked/cut today'",
          "Asks for OTP, UPI PIN, CVV or to install AnyDesk/APK files",
          "You 'won' a lottery, KBC prize or cashback you never entered",
          "Easy part-time job paying ₹2,000–₹8,000 a day",
          "Police, CBI or customs threatening 'digital arrest'",
          "Links with .xyz, .top, bit.ly or misspelt brand names",
        ],
        faq: [
          { q: "Is the scam message checker free?", a: "Yes. Cyber Kavach's scam message checker is completely free, needs no sign-up and does not store the messages you check." },
          { q: "Can it check Hindi or Hinglish messages?", a: "Yes. The checker understands English, Hindi and Hinglish scam messages and can reply in Hindi when you use the Hindi version of the site." },
          { q: "What should I do if the message is a scam?", a: "Don't reply, click or call back. Report the number on Sanchar Saathi Chakshu. If you already lost money, call 1930 immediately and file a complaint on cybercrime.gov.in." },
        ],
      },
      hi: {
        nav: "SMS और WhatsApp मैसेज चेकर",
        title: "फ्रॉड मैसेज चेकर: SMS और WhatsApp मैसेज मुफ़्त जांचें",
        description:
          "भारत के लिए मुफ़्त स्कैम मैसेज चेकर। कोई भी SMS, WhatsApp या ईमेल पेस्ट करें और तुरंत जानें कि यह फ्रॉड है या नहीं — KYC, UPI, जॉब, पार्सल, बिजली बिल और डिजिटल अरेस्ट।",
        h1: "मुफ़्त फ्रॉड मैसेज चेकर — SMS और WhatsApp",
        intro: "KYC अपडेट, बिल भरने, इनाम लेने या किसी 'अधिकारी' को कॉल करने वाला मैसेज आया है? नीचे पेस्ट करें। हमारा AI और भारतीय स्कैम पैटर्न इंजन सेकंडों में बताता है कि यह नकली है या नहीं।",
        answer:
          "कोई SMS या WhatsApp मैसेज फ्रॉड है या नहीं, यह जानने के लिए पूरा टेक्स्ट साइबर कवच के स्कैम मैसेज चेकर में पेस्ट करें। यह भारतीय ठगी के संकेत — धमकी, KYC/खाता बंद होने की चेतावनी, OTP या UPI PIN की मांग, नकली लिंक और इनाम — खोजकर जोखिम स्कोर और अगले कदम बताता है। जांच के दौरान लिंक न खोलें और OTP न बताएं।",
        stepsTitle: "मैसेज को ख़ुद कैसे जांचें",
        steps: [
          ["भेजने वाले को देखें", "बैंक और कंपनियां छोटे सेंडर ID (जैसे AX-SBIBNK) से SMS भेजती हैं, 10 अंकों के मोबाइल नंबर से नहीं।"],
          ["दबाव पहचानें", "'आज खाता बंद', 'आज रात बिजली कटेगी' या 'आप गिरफ़्तार हैं' जैसी धमकियां घबराहट पैदा करने के लिए होती हैं।"],
          ["देखें वे क्या मांग रहे हैं", "OTP, UPI PIN, कार्ड की जानकारी, रिमोट-एक्सेस ऐप या 'छोटी फ़ीस' की मांग स्कैम है।"],
          ["लिंक बिना खोले जांचें", "असली बैंक .bank.in डोमेन इस्तेमाल करते हैं; मिलते-जुलते या छोटे लिंक ख़तरे का संकेत हैं।"],
          ["आधिकारिक माध्यम से पुष्टि करें", "आधिकारिक ऐप खोलें या कार्ड पर छपे नंबर पर कॉल करें — मैसेज वाले नंबर पर कभी नहीं।"],
        ],
        flagsTitle: "फ्रॉड मैसेज के आम संकेत",
        flags: [
          "खाता, SIM, PAN या बिजली 'आज बंद/कट' हो जाएगी",
          "OTP, UPI PIN, CVV मांगना या AnyDesk/APK इंस्टॉल करवाना",
          "ऐसी लॉटरी, KBC इनाम या कैशबैक 'जीतना' जिसमें भाग नहीं लिया",
          "रोज़ ₹2,000–₹8,000 वाली आसान पार्ट-टाइम जॉब",
          "पुलिस, CBI या कस्टम की 'डिजिटल अरेस्ट' धमकी",
          ".xyz, .top, bit.ly या गलत वर्तनी वाले ब्रांड नाम के लिंक",
        ],
        faq: [
          { q: "क्या फ्रॉड मैसेज चेकर मुफ़्त है?", a: "हां। साइबर कवच का मैसेज चेकर पूरी तरह मुफ़्त है, साइन-अप नहीं चाहिए और जांचे गए मैसेज सेव नहीं होते।" },
          { q: "क्या यह हिंदी या हिंग्लिश मैसेज जांच सकता है?", a: "हां। चेकर हिंदी, अंग्रेज़ी और हिंग्लिश स्कैम मैसेज समझता है और हिंदी साइट पर हिंदी में जवाब देता है।" },
          { q: "मैसेज फ्रॉड निकले तो क्या करें?", a: "जवाब न दें, क्लिक या कॉल बैक न करें। नंबर की शिकायत संचार साथी चक्षु पर करें। पैसे गए हों तो तुरंत 1930 पर कॉल करें और cybercrime.gov.in पर शिकायत करें।" },
        ],
      },
    },
  },
  {
    slug: "link-checker",
    mode: "url",
    icon: "globe",
    content: {
      en: {
        nav: "Link & website safety checker",
        title: "Is This Link Safe? Free Phishing Link Checker (India)",
        description:
          "Check if a link or website is safe before you open it. Free phishing URL checker for India — detects fake bank sites, look-alike domains, shortened links and APK downloads.",
        h1: "Is This Link Safe? Free Phishing Link Checker",
        intro: "Received a link in an SMS, WhatsApp or email? Don't open it. Copy and paste it here — we check the domain for fake-bank look-alikes, risky extensions, shortened URLs and malware downloads.",
        answer:
          "To check if a link is safe without opening it, copy it and paste it into a link checker like Cyber Kavach. Warning signs include a brand name on a domain it doesn't own (for example sbi-kyc-update.xyz), unusual endings like .xyz or .top, shortened links (bit.ly), raw IP addresses and .apk downloads. Real Indian bank websites now end in .bank.in.",
        stepsTitle: "How to check a link manually",
        steps: [
          ["Long-press, don't tap", "On your phone, long-press the link and choose 'Copy link' so it never opens."],
          ["Read the domain from right to left", "In 'sbi.co.in.verify-kyc.xyz' the real site is verify-kyc.xyz — not SBI."],
          ["Check the ending", "Indian banks use .bank.in; government sites use .gov.in or .nic.in. Be wary of .xyz, .top, .online, .click."],
          ["Expand short links", "bit.ly, tinyurl and similar hide the destination — treat them as suspicious when they ask for login or payment."],
          ["Never install from a link", "An .apk download from a message can read your OTPs. Install apps only from the Play Store or App Store."],
        ],
        flagsTitle: "Phishing link red flags",
        flags: [
          "Bank or brand name inside a different domain (paytm-reward.top)",
          "Numbers swapped for letters (amaz0n, sb1)",
          "Shortened links asking you to log in or pay",
          "Links ending in .apk",
          "Raw IP addresses like http://45.12.3.9/login",
          "No https, or many hyphens and sub-domains",
        ],
        faq: [
          { q: "Is it safe to open a link to check it?", a: "No. Opening a phishing link can expose your details or download malware. Copy the link and paste it into the checker instead." },
          { q: "How do I know if a bank website is real?", a: "Under RBI's direction, Indian banks use the exclusive .bank.in domain. Type your bank's address yourself or use its official app instead of clicking links." },
          { q: "I already opened a suspicious link. What now?", a: "Don't enter any details. If you did, change passwords and call your bank to block cards. If an app was installed, uninstall it, switch off data and call 1930 if money was taken." },
        ],
      },
      hi: {
        nav: "लिंक और वेबसाइट सुरक्षा चेकर",
        title: "क्या यह लिंक सुरक्षित है? मुफ़्त फ़िशिंग लिंक चेकर",
        description: "लिंक या वेबसाइट खोलने से पहले जांचें कि वह सुरक्षित है या नहीं। नकली बैंक साइट, मिलते-जुलते डोमेन, छोटे लिंक और APK डाउनलोड पकड़ने वाला मुफ़्त चेकर।",
        h1: "क्या यह लिंक सुरक्षित है? मुफ़्त फ़िशिंग लिंक चेकर",
        intro: "SMS, WhatsApp या ईमेल में लिंक आया है? उसे खोलें नहीं। कॉपी करके यहां पेस्ट करें — हम नकली बैंक डोमेन, जोखिम वाले एक्सटेंशन, छोटे लिंक और मैलवेयर डाउनलोड की जांच करते हैं।",
        answer:
          "किसी लिंक को खोले बिना जांचने के लिए उसे कॉपी करके साइबर कवच जैसे लिंक चेकर में पेस्ट करें। ख़तरे के संकेत: किसी ब्रांड का नाम दूसरे डोमेन में (जैसे sbi-kyc-update.xyz), .xyz या .top जैसे अंत, छोटे लिंक (bit.ly), सीधे IP पते और .apk डाउनलोड। भारतीय बैंकों की असली वेबसाइट अब .bank.in पर ख़त्म होती है।",
        stepsTitle: "लिंक को ख़ुद कैसे जांचें",
        steps: [
          ["टैप न करें, देर तक दबाएं", "फ़ोन पर लिंक को देर तक दबाकर 'Copy link' चुनें ताकि वह खुले नहीं।"],
          ["डोमेन दाएं से बाएं पढ़ें", "'sbi.co.in.verify-kyc.xyz' में असली साइट verify-kyc.xyz है — SBI नहीं।"],
          ["अंत जांचें", "भारतीय बैंक .bank.in और सरकारी साइटें .gov.in या .nic.in इस्तेमाल करती हैं। .xyz, .top, .online, .click से सावधान रहें।"],
          ["छोटे लिंक से सावधान", "bit.ly, tinyurl असली पता छिपाते हैं — लॉगिन या भुगतान मांगें तो संदिग्ध मानें।"],
          ["लिंक से कभी इंस्टॉल न करें", "मैसेज से आया .apk आपके OTP पढ़ सकता है। ऐप सिर्फ़ Play Store या App Store से लें।"],
        ],
        flagsTitle: "फ़िशिंग लिंक के संकेत",
        flags: [
          "बैंक या ब्रांड का नाम किसी दूसरे डोमेन में (paytm-reward.top)",
          "अक्षरों की जगह अंक (amaz0n, sb1)",
          "लॉगिन या भुगतान मांगने वाले छोटे लिंक",
          ".apk पर ख़त्म होने वाले लिंक",
          "http://45.12.3.9/login जैसे सीधे IP पते",
          "https नहीं, या बहुत सारे हाइफ़न और सब-डोमेन",
        ],
        faq: [
          { q: "क्या जांचने के लिए लिंक खोलना सुरक्षित है?", a: "नहीं। फ़िशिंग लिंक खोलने से आपकी जानकारी चोरी हो सकती है या मैलवेयर आ सकता है। लिंक कॉपी करके चेकर में पेस्ट करें।" },
          { q: "कैसे पता करें कि बैंक की वेबसाइट असली है?", a: "RBI के निर्देश के अनुसार भारतीय बैंक विशेष .bank.in डोमेन इस्तेमाल करते हैं। लिंक पर क्लिक करने के बजाय पता ख़ुद टाइप करें या आधिकारिक ऐप इस्तेमाल करें।" },
          { q: "मैंने संदिग्ध लिंक खोल दिया। अब क्या करूं?", a: "कोई जानकारी न डालें। डाल दी हो तो पासवर्ड बदलें और बैंक को कॉल करके कार्ड ब्लॉक करवाएं। ऐप इंस्टॉल हुआ हो तो हटाएं, डेटा बंद करें और पैसे गए हों तो 1930 पर कॉल करें।" },
        ],
      },
    },
  },
  {
    slug: "upi-id-checker",
    mode: "upi",
    icon: "wallet",
    content: {
      en: {
        nav: "UPI ID fraud checker",
        title: "UPI ID Checker: Is This UPI ID Fake or Fraud? (Free)",
        description:
          "Check a UPI ID before you pay. Spot fake 'refund', 'support' and impersonation UPI IDs, learn the @valid rule for brokers, and search India's official suspect registry. Free.",
        h1: "UPI ID Fraud Checker — Check Before You Pay",
        intro: "About to pay someone you don't know, a 'customer care' agent or an investment 'expert'? Enter their UPI ID. We check its format, the payment app handle and impersonation words, and show you the official ways to verify it.",
        answer:
          "To check whether a UPI ID is fraudulent, look at who it really belongs to: your UPI app shows the registered name before you pay. Be suspicious of IDs containing words like refund, support, cashback or a company name on a personal handle. Search the ID in I4C's suspect registry on cybercrime.gov.in, and for investments verify it on SEBI Check — registered brokers and mutual funds use UPI IDs ending in @valid.",
        stepsTitle: "How to verify a UPI ID before paying",
        steps: [
          ["Check the name shown in your UPI app", "After entering the UPI ID, your app shows the account holder's name. If it doesn't match who you expect, stop."],
          ["Search the suspect registry", "I4C's suspect registry on cybercrime.gov.in lets you search UPI IDs already reported for fraud."],
          ["Investments: use SEBI Check", "SEBI-registered brokers and mutual funds collect money only through UPI IDs ending in @valid (e.g. name.brk@validbank)."],
          ["Never enter your PIN to receive", "If someone says you'll 'receive' money after entering your UPI PIN or scanning a QR — it's a scam."],
        ],
        flagsTitle: "Suspicious UPI ID signs",
        flags: [
          "Words like refund, cashback, reward, kyc, support or care in the ID",
          "A company or government name on a personal handle (amazonrefund@ybl)",
          "'Broker' or 'fund' asking payment to a non-@valid UPI ID",
          "Name in your app doesn't match the person or company",
          "Asked to pay a 'fee' to receive a prize, loan or job",
        ],
        faq: [
          { q: "How can I find out who owns a UPI ID?", a: "Enter the UPI ID in your payment app — it shows the registered account holder's name before you confirm. Do not proceed if the name looks wrong." },
          { q: "What is an @valid UPI ID?", a: "Since October 2025, SEBI-registered intermediaries such as brokers and mutual funds use special UPI IDs ending in @valid, shown with a green thumbs-up icon. You can verify them on SEBI Check." },
          { q: "Can I check if a UPI ID is reported for fraud?", a: "Yes. Search it in the suspect registry on cybercrime.gov.in run by I4C. If you were cheated, call 1930 and report it." },
        ],
      },
      hi: {
        nav: "UPI ID फ्रॉड चेकर",
        title: "UPI ID चेकर: क्या यह UPI ID नकली या फ्रॉड है? (मुफ़्त)",
        description: "भुगतान से पहले UPI ID जांचें। नकली 'रिफंड', 'सपोर्ट' और नकली नाम वाली UPI ID पहचानें, ब्रोकर के @valid नियम जानें और सरकारी संदिग्ध सूची में खोजें। मुफ़्त।",
        h1: "UPI ID फ्रॉड चेकर — भुगतान से पहले जांचें",
        intro: "किसी अनजान, 'कस्टमर केयर' एजेंट या निवेश 'एक्सपर्ट' को पैसे भेजने वाले हैं? उनकी UPI ID डालें। हम फ़ॉर्मेट, पेमेंट ऐप हैंडल और नकली शब्द जांचते हैं और पुष्टि के आधिकारिक तरीके बताते हैं।",
        answer:
          "UPI ID फ्रॉड है या नहीं, यह जानने के लिए देखें कि वह असल में किसकी है: भुगतान से पहले आपका UPI ऐप रजिस्टर्ड नाम दिखाता है। refund, support, cashback जैसे शब्द या निजी हैंडल पर कंपनी का नाम हो तो सावधान रहें। cybercrime.gov.in पर I4C की संदिग्ध सूची में ID खोजें, और निवेश के लिए SEBI Check पर जांचें — रजिस्टर्ड ब्रोकर और म्यूचुअल फ़ंड @valid वाली UPI ID इस्तेमाल करते हैं।",
        stepsTitle: "भुगतान से पहले UPI ID कैसे जांचें",
        steps: [
          ["UPI ऐप में दिखा नाम देखें", "UPI ID डालने के बाद ऐप खाताधारक का नाम दिखाता है। नाम अपेक्षित व्यक्ति/कंपनी का न हो तो रुकें।"],
          ["संदिग्ध सूची में खोजें", "cybercrime.gov.in पर I4C की संदिग्ध सूची में धोखाधड़ी के लिए रिपोर्ट की गई UPI ID खोजी जा सकती हैं।"],
          ["निवेश: SEBI Check इस्तेमाल करें", "SEBI-रजिस्टर्ड ब्रोकर और म्यूचुअल फ़ंड सिर्फ़ @valid वाली UPI ID (जैसे name.brk@validbank) से पैसा लेते हैं।"],
          ["पैसे पाने के लिए PIN कभी न डालें", "कोई कहे कि UPI PIN डालने या QR स्कैन करने से पैसे 'मिलेंगे' — यह स्कैम है।"],
        ],
        flagsTitle: "संदिग्ध UPI ID के संकेत",
        flags: [
          "ID में refund, cashback, reward, kyc, support या care जैसे शब्द",
          "निजी हैंडल पर कंपनी या सरकार का नाम (amazonrefund@ybl)",
          "'ब्रोकर' या 'फ़ंड' का बिना @valid वाली UPI ID पर पैसे मांगना",
          "ऐप में दिखा नाम व्यक्ति या कंपनी से मेल नहीं खाता",
          "इनाम, लोन या नौकरी पाने के लिए 'फ़ीस' मांगना",
        ],
        faq: [
          { q: "कैसे पता करें कि UPI ID किसकी है?", a: "अपने पेमेंट ऐप में UPI ID डालें — पुष्टि से पहले रजिस्टर्ड खाताधारक का नाम दिखता है। नाम ग़लत लगे तो आगे न बढ़ें।" },
          { q: "@valid UPI ID क्या है?", a: "अक्टूबर 2025 से SEBI-रजिस्टर्ड संस्थाएं जैसे ब्रोकर और म्यूचुअल फ़ंड @valid वाली विशेष UPI ID इस्तेमाल करती हैं, जिनके साथ हरा थम्स-अप आइकन दिखता है। SEBI Check पर इनकी पुष्टि की जा सकती है।" },
          { q: "क्या जांच सकते हैं कि UPI ID फ्रॉड के लिए रिपोर्ट हुई है?", a: "हां। I4C की cybercrime.gov.in पर संदिग्ध सूची में खोजें। ठगी हुई हो तो 1930 पर कॉल करके शिकायत करें।" },
        ],
      },
    },
  },
  {
    slug: "fraud-number-checker",
    mode: "phone",
    icon: "phone",
    content: {
      en: {
        nav: "Fraud phone number checker",
        title: "Fraud Number Check India: Is This Caller a Scammer?",
        description:
          "Check a phone number before you trust the caller. Learn what 1600, 140, +92 and regular mobile numbers mean, search India's suspect registry and report fraud calls on Chakshu. Free.",
        h1: "Fraud Phone Number Checker for India",
        intro: "Got a call from a 'bank', 'police', 'courier' or 'TRAI' officer? Enter the number. We explain what kind of number it is under TRAI's rules and show you how to check and report it officially.",
        answer:
          "To check if a phone number is a fraud in India, first look at its series: TRAI reserves 1600-series numbers for genuine service calls from banks, insurers and other regulated entities and government, while promotional calls use the 140 series. A 'bank officer' or 'police' calling from an ordinary 10-digit mobile or a foreign number is a red flag. Search the number in I4C's suspect registry and report fraud calls on Sanchar Saathi Chakshu.",
        stepsTitle: "How to check a caller's number",
        steps: [
          ["Look at the number series", "1600xxxxxx = regulated bank/insurer/government service calls. 140xxxxxxx = promotional calls. Regular mobiles and foreign numbers are never official bank lines."],
          ["Search the suspect registry", "I4C's registry on cybercrime.gov.in lists numbers already reported in cyber-fraud complaints."],
          ["Call back on the official number", "Hang up and call the number printed on your card or the company's official website — never the number that called you."],
          ["Report it on Chakshu", "Report suspected fraud calls on Sanchar Saathi; repeat offenders get disconnected."],
        ],
        flagsTitle: "Fraud call red flags",
        flags: [
          "'Bank', 'RBI', 'police' or 'TRAI' calling from a normal mobile number",
          "International codes like +92, +84, +855 or unknown foreign numbers",
          "Pre-recorded IVR saying your SIM/parcel/Aadhaar has a problem — 'press 1'",
          "Asked to switch to a WhatsApp video call",
          "Asked for OTP, PIN or to install an app",
        ],
        faq: [
          { q: "Are calls from 1600 numbers genuine?", a: "Under TRAI's framework, 1600-series numbers are allotted to entities regulated by RBI, SEBI, IRDAI and PFRDA and to government for service and transaction calls. Still, never share OTPs or PINs on any call." },
          { q: "What are 140 series numbers?", a: "140-series numbers are used for promotional (telemarketing) calls. You can block them by registering your preferences on the TRAI DND app or by contacting 1909." },
          { q: "How do I report a fraud call in India?", a: "Report it on Sanchar Saathi's Chakshu facility (sancharsaathi.gov.in/sfc). If you lost money, call 1930 and file a complaint on cybercrime.gov.in." },
        ],
      },
      hi: {
        nav: "फ्रॉड फ़ोन नंबर चेकर",
        title: "फ्रॉड नंबर चेक: क्या यह कॉलर ठग है? (भारत)",
        description: "कॉलर पर भरोसा करने से पहले नंबर जांचें। 1600, 140, +92 और साधारण मोबाइल नंबरों का मतलब जानें, संदिग्ध सूची में खोजें और चक्षु पर फ्रॉड कॉल की शिकायत करें। मुफ़्त।",
        h1: "फ्रॉड फ़ोन नंबर चेकर (भारत)",
        intro: "'बैंक', 'पुलिस', 'कूरियर' या 'TRAI' अधिकारी का कॉल आया? नंबर डालें। हम TRAI के नियमों के अनुसार बताते हैं कि यह किस तरह का नंबर है और आधिकारिक तरीके से जांचने और शिकायत करने का रास्ता दिखाते हैं।",
        answer:
          "भारत में कोई फ़ोन नंबर फ्रॉड है या नहीं, यह जानने के लिए पहले उसकी सीरीज़ देखें: TRAI ने बैंक, बीमा कंपनियों, अन्य विनियमित संस्थाओं और सरकार की असली सेवा कॉल के लिए 1600-सीरीज़ तय की है, और प्रचार कॉल 140 सीरीज़ से आते हैं। साधारण 10 अंकों के मोबाइल या विदेशी नंबर से 'बैंक अधिकारी' या 'पुलिस' का कॉल ख़तरे का संकेत है। I4C की संदिग्ध सूची में नंबर खोजें और संचार साथी चक्षु पर शिकायत करें।",
        stepsTitle: "कॉलर का नंबर कैसे जांचें",
        steps: [
          ["नंबर की सीरीज़ देखें", "1600xxxxxx = विनियमित बैंक/बीमा/सरकारी सेवा कॉल। 140xxxxxxx = प्रचार कॉल। साधारण मोबाइल और विदेशी नंबर कभी आधिकारिक बैंक लाइन नहीं होते।"],
          ["संदिग्ध सूची में खोजें", "cybercrime.gov.in पर I4C की सूची में साइबर ठगी शिकायतों में रिपोर्ट हुए नंबर हैं।"],
          ["आधिकारिक नंबर पर वापस कॉल करें", "फ़ोन काटें और कार्ड या कंपनी की आधिकारिक वेबसाइट पर दिए नंबर पर कॉल करें — जिस नंबर से कॉल आया उस पर नहीं।"],
          ["चक्षु पर शिकायत करें", "संदिग्ध फ्रॉड कॉल की शिकायत संचार साथी पर करें; बार-बार शिकायत वाले नंबर बंद किए जाते हैं।"],
        ],
        flagsTitle: "फ्रॉड कॉल के संकेत",
        flags: [
          "साधारण मोबाइल नंबर से 'बैंक', 'RBI', 'पुलिस' या 'TRAI' का कॉल",
          "+92, +84, +855 जैसे अंतरराष्ट्रीय कोड या अनजान विदेशी नंबर",
          "रिकॉर्डेड IVR कि आपकी SIM/पार्सल/आधार में समस्या है — '1 दबाएं'",
          "WhatsApp वीडियो कॉल पर आने को कहना",
          "OTP, PIN मांगना या ऐप इंस्टॉल करवाना",
        ],
        faq: [
          { q: "क्या 1600 नंबर से आने वाले कॉल असली होते हैं?", a: "TRAI के नियमों के अनुसार 1600-सीरीज़ नंबर RBI, SEBI, IRDAI और PFRDA से विनियमित संस्थाओं और सरकार को सेवा व लेन-देन कॉल के लिए दिए जाते हैं। फिर भी किसी भी कॉल पर OTP या PIN न बताएं।" },
          { q: "140 सीरीज़ नंबर क्या हैं?", a: "140-सीरीज़ नंबर प्रचार (टेलीमार्केटिंग) कॉल के लिए हैं। TRAI DND ऐप या 1909 से अपनी पसंद दर्ज करके इन्हें रोक सकते हैं।" },
          { q: "भारत में फ्रॉड कॉल की शिकायत कैसे करें?", a: "संचार साथी की चक्षु सुविधा (sancharsaathi.gov.in/sfc) पर शिकायत करें। पैसे गए हों तो 1930 पर कॉल करें और cybercrime.gov.in पर शिकायत दर्ज करें।" },
        ],
      },
    },
  },
  {
    slug: "screenshot-scam-checker",
    mode: "image",
    icon: "smartphone",
    content: {
      en: {
        nav: "Screenshot scam checker",
        title: "Screenshot Scam Checker: Upload a Chat or SMS Screenshot",
        description:
          "Upload a screenshot of a WhatsApp chat, SMS, payment request or website and our AI reads it to spot scam signs. Free, private, made for India.",
        h1: "Screenshot Scam Checker — Upload & Check",
        intro: "Can't copy the text? Upload or paste a screenshot of the WhatsApp chat, SMS, fake payment page or social-media ad. The image is resized on your phone and our AI reads it to look for scam patterns.",
        answer:
          "To check a screenshot for scams, upload it to the Cyber Kavach screenshot checker. The AI reads the visible text — messages, links, amounts and names — and looks for Indian fraud patterns such as fake payment confirmations, KYC threats, job and investment offers. Crop out OTPs and personal details before uploading.",
        stepsTitle: "Tips for the best result",
        steps: [
          ["Capture the full message", "Include the sender name or number, the message text and any link or amount."],
          ["Hide private details", "Crop or cover OTPs, account numbers and faces before uploading."],
          ["One conversation per image", "Long chats are best split into a few screenshots."],
          ["Check fake payment proofs", "Screenshots of 'payment successful' can be edited — always confirm the credit in your own bank app."],
        ],
        flagsTitle: "Screenshot scam red flags",
        flags: [
          "'Payment successful' screenshot but no money in your bank app",
          "Profit dashboards from unknown trading apps",
          "Official-looking letters or warrants sent on WhatsApp",
          "Ads using celebrity photos to promote investments",
          "QR codes sent to you 'to receive money'",
        ],
        faq: [
          { q: "Is my screenshot stored?", a: "No. Cyber Kavach does not save screenshots. The image is resized on your device and sent only for analysis. Avoid uploading OTPs or personal IDs." },
          { q: "Can a payment screenshot be fake?", a: "Yes. Fake 'payment successful' screenshots are easy to make. Always check the actual balance in your bank or UPI app before handing over goods." },
          { q: "What if the screenshot checker is busy?", a: "If the free AI limit is reached, paste the text from the screenshot into the message checker — the offline pattern engine still works." },
        ],
      },
      hi: {
        nav: "स्क्रीनशॉट स्कैम चेकर",
        title: "स्क्रीनशॉट स्कैम चेकर: चैट या SMS का स्क्रीनशॉट जांचें",
        description: "WhatsApp चैट, SMS, पेमेंट रिक्वेस्ट या वेबसाइट का स्क्रीनशॉट अपलोड करें और हमारा AI उसे पढ़कर स्कैम के संकेत बताता है। मुफ़्त, निजी, भारत के लिए।",
        h1: "स्क्रीनशॉट स्कैम चेकर — अपलोड करें और जांचें",
        intro: "टेक्स्ट कॉपी नहीं हो रहा? WhatsApp चैट, SMS, नकली पेमेंट पेज या सोशल-मीडिया विज्ञापन का स्क्रीनशॉट अपलोड या पेस्ट करें। तस्वीर आपके फ़ोन पर छोटी होती है और AI उसे पढ़कर स्कैम पैटर्न खोजता है।",
        answer:
          "स्क्रीनशॉट में स्कैम जांचने के लिए उसे साइबर कवच स्क्रीनशॉट चेकर में अपलोड करें। AI दिखने वाला टेक्स्ट — मैसेज, लिंक, राशि और नाम — पढ़ता है और नकली पेमेंट, KYC धमकी, जॉब और निवेश ऑफ़र जैसे भारतीय ठगी के पैटर्न खोजता है। अपलोड से पहले OTP और निजी जानकारी काट दें।",
        stepsTitle: "बेहतर नतीजे के लिए टिप्स",
        steps: [
          ["पूरा मैसेज कैप्चर करें", "भेजने वाले का नाम या नंबर, मैसेज और कोई लिंक या राशि शामिल करें।"],
          ["निजी जानकारी छिपाएं", "अपलोड से पहले OTP, खाता नंबर और चेहरे काटें या ढकें।"],
          ["एक तस्वीर में एक बातचीत", "लंबी चैट को कुछ स्क्रीनशॉट में बांटें।"],
          ["नकली पेमेंट प्रूफ़ जांचें", "'पेमेंट सफल' के स्क्रीनशॉट एडिट हो सकते हैं — हमेशा अपने बैंक ऐप में क्रेडिट जांचें।"],
        ],
        flagsTitle: "स्क्रीनशॉट स्कैम के संकेत",
        flags: [
          "'पेमेंट सफल' का स्क्रीनशॉट पर बैंक ऐप में पैसा नहीं",
          "अनजान ट्रेडिंग ऐप के मुनाफ़े वाले डैशबोर्ड",
          "WhatsApp पर भेजे गए सरकारी जैसे पत्र या वारंट",
          "निवेश के लिए सेलिब्रिटी फ़ोटो वाले विज्ञापन",
          "'पैसे पाने' के लिए भेजे गए QR कोड",
        ],
        faq: [
          { q: "क्या मेरा स्क्रीनशॉट सेव होता है?", a: "नहीं। साइबर कवच स्क्रीनशॉट सेव नहीं करता। तस्वीर आपके डिवाइस पर छोटी होकर सिर्फ़ विश्लेषण के लिए भेजी जाती है। OTP या पहचान पत्र अपलोड न करें।" },
          { q: "क्या पेमेंट का स्क्रीनशॉट नकली हो सकता है?", a: "हां। नकली 'पेमेंट सफल' स्क्रीनशॉट बनाना आसान है। सामान देने से पहले हमेशा अपने बैंक या UPI ऐप में असली बैलेंस देखें।" },
          { q: "स्क्रीनशॉट चेकर व्यस्त हो तो?", a: "मुफ़्त AI सीमा पूरी हो जाए तो स्क्रीनशॉट का टेक्स्ट मैसेज चेकर में पेस्ट करें — ऑफ़लाइन पैटर्न इंजन तब भी काम करता है।" },
        ],
      },
    },
  },
  {
    slug: "qr-code-scam-checker",
    mode: "qr",
    icon: "grid",
    content: {
      en: {
        nav: "QR code scam checker",
        title: "QR Code Scam Checker: See What a QR Does Before You Pay",
        description:
          "Upload or photograph a QR code and see exactly what it does before you scan it in a payment app — who gets paid, how much, or which website opens. Free, works on your phone.",
        h1: "QR Code Scam Checker — Know Before You Scan",
        intro: "Someone sent you a QR code 'to receive money', or the QR at a shop looks tampered? Take a photo or upload it. We decode it on your phone and show who gets paid, the amount, or the link it opens.",
        answer:
          "To check a QR code safely, decode it before using it in a payment app. A UPI QR code (upi://pay) always sends money from your account when you enter your UPI PIN — it can never be used to receive money. Check the payee name and UPI ID, and never scan a QR sent by a stranger who promises you a payment, refund or prize.",
        stepsTitle: "How to stay safe with QR codes",
        steps: [
          ["Never scan to receive money", "Receiving money never needs a QR scan or PIN. Anyone who asks you to scan a QR to 'receive' payment is a scammer."],
          ["Check the payee name", "Your UPI app shows the payee's registered name before you pay. If it doesn't match the shop or person, stop."],
          ["Watch for stickers", "Shopkeepers and customers: scammers sometimes paste their own QR sticker over a shop's genuine QR."],
          ["Be careful with QR links", "A QR can open a fake login or payment page. Don't enter passwords, card details or OTPs on a site opened from a QR."],
        ],
        flagsTitle: "QR code scam red flags",
        flags: [
          "A 'buyer' sends a QR so you can 'receive' payment",
          "QR promising a refund, cashback, prize or job bonus",
          "Payee name in your app differs from the shop or person",
          "Amount already filled in that you didn't agree to",
          "QR sticker that looks pasted over another one",
        ],
        faq: [
          { q: "Can scanning a QR code take money from my account?", a: "Scanning alone does not move money, but a UPI QR opens a payment screen — entering your UPI PIN sends money from your account. Never enter your PIN after scanning a QR from a stranger." },
          { q: "Is my QR image uploaded anywhere?", a: "No. Cyber Kavach reads the QR code entirely on your device. The image is not uploaded or stored." },
          { q: "Can a QR code open a fake website?", a: "Yes. A QR code can contain any link, including phishing pages that copy bank or government websites. Check the link shown in the result before opening it." },
        ],
      },
      hi: {
        nav: "QR कोड स्कैम चेकर",
        title: "QR कोड स्कैम चेकर: भुगतान से पहले जानें QR क्या करेगा",
        description: "QR कोड अपलोड करें या उसकी फ़ोटो लें और पेमेंट ऐप में स्कैन करने से पहले जानें कि वह क्या करेगा — किसे भुगतान होगा, कितना, या कौन-सी वेबसाइट खुलेगी। मुफ़्त।",
        h1: "QR कोड स्कैम चेकर — स्कैन से पहले जानें",
        intro: "किसी ने 'पैसे पाने' के लिए QR भेजा, या दुकान का QR छेड़छाड़ वाला लग रहा है? फ़ोटो लें या अपलोड करें। हम इसे आपके फ़ोन पर ही पढ़कर बताते हैं कि किसे भुगतान होगा, कितना, या कौन-सा लिंक खुलेगा।",
        answer:
          "QR कोड को सुरक्षित रूप से जांचने के लिए पेमेंट ऐप में इस्तेमाल करने से पहले उसे पढ़ें। UPI QR कोड (upi://pay) में UPI PIN डालने पर हमेशा आपके खाते से पैसा जाता है — इससे पैसा कभी आता नहीं। भुगतान पाने वाले का नाम और UPI ID देखें, और भुगतान, रिफंड या इनाम का वादा करने वाले अनजान व्यक्ति का QR कभी स्कैन न करें।",
        stepsTitle: "QR कोड से सुरक्षित कैसे रहें",
        steps: [
          ["पैसे पाने के लिए कभी स्कैन न करें", "पैसे पाने के लिए QR स्कैन या PIN की ज़रूरत नहीं होती। 'पैसे पाने' के लिए QR स्कैन करवाने वाला ठग है।"],
          ["भुगतान पाने वाले का नाम देखें", "भुगतान से पहले UPI ऐप पाने वाले का रजिस्टर्ड नाम दिखाता है। दुकान या व्यक्ति से मेल न खाए तो रुकें।"],
          ["स्टिकर पर ध्यान दें", "दुकानदार और ग्राहक: ठग कभी-कभी दुकान के असली QR पर अपना QR स्टिकर चिपका देते हैं।"],
          ["QR लिंक से सावधान", "QR नकली लॉगिन या पेमेंट पेज खोल सकता है। QR से खुली साइट पर पासवर्ड, कार्ड या OTP न डालें।"],
        ],
        flagsTitle: "QR कोड स्कैम के संकेत",
        flags: [
          "'ख़रीदार' भुगतान 'पाने' के लिए QR भेजता है",
          "रिफंड, कैशबैक, इनाम या जॉब बोनस का वादा करने वाला QR",
          "ऐप में दिखा नाम दुकान या व्यक्ति से अलग है",
          "पहले से भरी राशि जिस पर आपकी सहमति नहीं थी",
          "किसी दूसरे QR के ऊपर चिपका हुआ लगने वाला स्टिकर",
        ],
        faq: [
          { q: "क्या QR स्कैन करने से मेरे खाते से पैसे जा सकते हैं?", a: "सिर्फ़ स्कैन करने से पैसा नहीं जाता, लेकिन UPI QR भुगतान स्क्रीन खोलता है — UPI PIN डालने पर आपके खाते से पैसा जाता है। अनजान व्यक्ति के QR को स्कैन करके कभी PIN न डालें।" },
          { q: "क्या मेरी QR तस्वीर कहीं अपलोड होती है?", a: "नहीं। साइबर कवच QR कोड पूरी तरह आपके डिवाइस पर पढ़ता है। तस्वीर अपलोड या सेव नहीं होती।" },
          { q: "क्या QR कोड नकली वेबसाइट खोल सकता है?", a: "हां। QR कोड में कोई भी लिंक हो सकता है, जिसमें बैंक या सरकारी वेबसाइट की नकल करने वाले फ़िशिंग पेज भी शामिल हैं। खोलने से पहले नतीजे में दिखा लिंक जांचें।" },
        ],
      },
    },
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
