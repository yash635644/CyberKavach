/**
 * Complaint letter templates (generated entirely in the visitor's browser — nothing is sent or stored).
 * Only verified, current references are cited:
 *  - RBI circular RBI/2017-18/15 (DBR.No.Leg.BC.78/09.07.005/2017-18) dated 6 July 2017,
 *    "Customer Protection – Limiting Liability of Customers in Unauthorised Electronic Banking Transactions"
 *  - Reserve Bank – Integrated Ombudsman Scheme, 2021 (complain to the bank first; escalate after 30 days)
 *  - National Cyber Crime Reporting Portal (cybercrime.gov.in) and helpline 1930
 * These are general formats for awareness, not legal advice.
 */
import type { Locale } from "../site";

export type Field = { name: string; label: Record<Locale, string>; placeholder?: string; type?: "text" | "date" | "textarea"; required?: boolean };
export type Template = {
  id: string;
  icon: string;
  title: Record<Locale, string>;
  when: Record<Locale, string>;
  fields: Field[];
  build: (v: Record<string, string>, lang: Locale) => string;
};

const f = (v: Record<string, string>, k: string, fallback = "[__________]") => (v[k] && v[k].trim()) || fallback;

const common: Field[] = [
  { name: "name", label: { en: "Your full name", hi: "आपका पूरा नाम" }, required: true },
  { name: "phone", label: { en: "Your mobile number", hi: "आपका मोबाइल नंबर" } },
  { name: "address", label: { en: "Your address (city, state)", hi: "आपका पता (शहर, राज्य)" } },
];

const incident: Field[] = [
  { name: "date", label: { en: "Date & time of fraud", hi: "धोखाधड़ी की तारीख और समय" }, placeholder: "e.g. 18-10-2026, 4:30 PM" },
  { name: "amount", label: { en: "Amount lost (₹)", hi: "गई राशि (₹)" }, placeholder: "e.g. 25,000" },
  { name: "utr", label: { en: "Transaction IDs / UTR numbers", hi: "ट्रांज़ैक्शन ID / UTR नंबर" }, placeholder: "e.g. 412345678901" },
  { name: "story", label: { en: "What happened (short)", hi: "क्या हुआ (संक्षेप में)" }, type: "textarea", placeholder: "e.g. I received a call from someone claiming to be bank staff…" },
];

const today = (lang: Locale) => new Date().toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "2-digit", month: "long", year: "numeric" });

export const templates: Template[] = [
  {
    id: "bank-unauthorised-transaction",
    icon: "bank",
    title: { en: "Bank / UPI fraud complaint letter", hi: "बैंक / UPI फ्रॉड शिकायत पत्र" },
    when: {
      en: "Send to your bank's branch or grievance cell as soon as possible after an unauthorised debit. Reporting within 3 working days protects your rights under RBI's customer-protection rules.",
      hi: "अनधिकृत डेबिट के बाद जितनी जल्दी हो सके अपने बैंक की शाखा या शिकायत सेल को भेजें। 3 कार्य-दिवसों के भीतर शिकायत करने से RBI के ग्राहक-सुरक्षा नियमों के तहत आपके अधिकार सुरक्षित रहते हैं।",
    },
    fields: [
      ...common,
      { name: "bank", label: { en: "Bank name & branch", hi: "बैंक का नाम और शाखा" }, required: true },
      { name: "account", label: { en: "Account number (last 4 digits only)", hi: "खाता नंबर (सिर्फ़ आख़िरी 4 अंक)" }, placeholder: "XXXX1234" },
      ...incident,
      { name: "ncrp", label: { en: "Cybercrime complaint / 1930 acknowledgement no. (if any)", hi: "साइबर क्राइम शिकायत / 1930 पावती नंबर (यदि हो)" } },
    ],
    build: (v, lang) =>
      lang === "hi"
        ? `सेवा में,
शाखा प्रबंधक / शिकायत निवारण अधिकारी,
${f(v, "bank")}

दिनांक: ${today(lang)}

विषय: अनधिकृत इलेक्ट्रॉनिक लेन-देन / साइबर धोखाधड़ी की शिकायत — खाता संख्या ${f(v, "account", "XXXX____")}

महोदय/महोदया,

मैं, ${f(v, "name")}, आपके बैंक का खाताधारक हूं। मेरे खाते से ${f(v, "date")} को ₹${f(v, "amount")} का अनधिकृत लेन-देन हुआ है, जिसे मैंने अधिकृत नहीं किया।

लेन-देन विवरण (UTR / ट्रांज़ैक्शन ID): ${f(v, "utr")}

घटना का विवरण:
${f(v, "story")}

मैंने इस धोखाधड़ी की सूचना राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 / cybercrime.gov.in पर दी है। पावती संख्या: ${f(v, "ncrp", "[यदि उपलब्ध हो]")}

अतः आपसे अनुरोध है कि:
1. मेरे खाते/कार्ड/UPI पर तुरंत रोक लगाई जाए ताकि आगे कोई नुकसान न हो।
2. इस लेन-देन पर विवाद (डिस्प्यूट) दर्ज कर लाभार्थी खाते में राशि रोकने की कार्रवाई की जाए।
3. भारतीय रिज़र्व बैंक के परिपत्र दिनांक 6 जुलाई 2017 (ग्राहक संरक्षण — अनधिकृत इलेक्ट्रॉनिक बैंकिंग लेन-देन में ग्राहकों की सीमित देनदारी) के अनुसार मेरी शिकायत का निपटारा कर राशि वापस की जाए।
4. इस शिकायत की लिखित पावती और शिकायत संख्या दी जाए।

संलग्न: लेन-देन के स्क्रीनशॉट / बैंक स्टेटमेंट, साइबर शिकायत की पावती, पहचान पत्र की प्रति।

भवदीय,
${f(v, "name")}
मोबाइल: ${f(v, "phone")}
पता: ${f(v, "address")}`
        : `To,
The Branch Manager / Grievance Redressal Officer,
${f(v, "bank")}

Date: ${today(lang)}

Subject: Complaint regarding unauthorised electronic transaction / cyber fraud — Account No. ${f(v, "account", "XXXX____")}

Dear Sir/Madam,

I, ${f(v, "name")}, hold an account with your bank. On ${f(v, "date")}, an amount of ₹${f(v, "amount")} was debited from my account through a transaction that I did not authorise.

Transaction details (UTR / Transaction ID): ${f(v, "utr")}

What happened:
${f(v, "story")}

I have reported this fraud to the National Cyber Crime Helpline 1930 / cybercrime.gov.in. Acknowledgement number: ${f(v, "ncrp", "[if available]")}

I request you to:
1. Immediately block my account/card/UPI access to prevent further loss.
2. Register a dispute for the above transaction(s) and take action to hold the amount in the beneficiary account.
3. Resolve my complaint and reverse the amount in line with the RBI circular dated 6 July 2017 on "Customer Protection – Limiting Liability of Customers in Unauthorised Electronic Banking Transactions".
4. Provide a written acknowledgement and complaint reference number.

Enclosures: Screenshots / bank statement of the transaction(s), cyber complaint acknowledgement, copy of ID proof.

Yours faithfully,
${f(v, "name")}
Mobile: ${f(v, "phone")}
Address: ${f(v, "address")}`,
  },
  {
    id: "police-cyber-complaint",
    icon: "shield",
    title: { en: "Police / cyber cell complaint letter", hi: "पुलिस / साइबर सेल शिकायत पत्र" },
    when: {
      en: "Use this for a written complaint at your nearest police station or cyber crime police station — ideally after filing on cybercrime.gov.in, so you can quote the acknowledgement number.",
      hi: "नज़दीकी थाने या साइबर क्राइम थाने में लिखित शिकायत के लिए इसका उपयोग करें — बेहतर है कि पहले cybercrime.gov.in पर शिकायत करें ताकि पावती नंबर लिख सकें।",
    },
    fields: [
      ...common,
      { name: "station", label: { en: "Police station / cyber cell name", hi: "थाना / साइबर सेल का नाम" }, required: true },
      ...incident,
      { name: "suspect", label: { en: "Scammer's phone numbers, UPI IDs, accounts, links", hi: "ठग के फ़ोन नंबर, UPI ID, खाते, लिंक" }, type: "textarea" },
      { name: "ncrp", label: { en: "cybercrime.gov.in acknowledgement no.", hi: "cybercrime.gov.in पावती नंबर" } },
    ],
    build: (v, lang) =>
      lang === "hi"
        ? `सेवा में,
थाना प्रभारी,
${f(v, "station")}

दिनांक: ${today(lang)}

विषय: ऑनलाइन धोखाधड़ी / साइबर अपराध की शिकायत एवं FIR दर्ज करने हेतु प्रार्थना-पत्र

महोदय/महोदया,

मैं, ${f(v, "name")}, निवासी ${f(v, "address")}, निवेदन करता/करती हूं कि दिनांक ${f(v, "date")} को मेरे साथ ऑनलाइन धोखाधड़ी हुई, जिसमें मुझे ₹${f(v, "amount")} का नुकसान हुआ।

घटना का विवरण:
${f(v, "story")}

लेन-देन विवरण (UTR / ट्रांज़ैक्शन ID): ${f(v, "utr")}

संदिग्ध विवरण (फ़ोन नंबर / UPI ID / खाता / लिंक):
${f(v, "suspect")}

मैंने राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (cybercrime.gov.in) / 1930 पर शिकायत दर्ज की है। पावती संख्या: ${f(v, "ncrp", "[यदि उपलब्ध हो]")}

अतः आपसे निवेदन है कि मेरी शिकायत पर FIR दर्ज कर उचित कानूनी कार्रवाई करें तथा मेरी राशि वापस दिलाने में सहायता करें।

संलग्न: लेन-देन के स्क्रीनशॉट, बैंक स्टेटमेंट, चैट/कॉल के स्क्रीनशॉट, पहचान पत्र की प्रति।

प्रार्थी,
${f(v, "name")}
मोबाइल: ${f(v, "phone")}`
        : `To,
The Station House Officer,
${f(v, "station")}

Date: ${today(lang)}

Subject: Complaint of online fraud / cyber crime and request to register an FIR

Respected Sir/Madam,

I, ${f(v, "name")}, resident of ${f(v, "address")}, wish to report that on ${f(v, "date")} I was the victim of an online fraud in which I lost ₹${f(v, "amount")}.

Details of the incident:
${f(v, "story")}

Transaction details (UTR / Transaction ID): ${f(v, "utr")}

Suspect details (phone numbers / UPI IDs / bank accounts / links):
${f(v, "suspect")}

I have also filed a complaint on the National Cyber Crime Reporting Portal (cybercrime.gov.in) / helpline 1930. Acknowledgement number: ${f(v, "ncrp", "[if available]")}

I request you to kindly register an FIR, take appropriate legal action against the culprits, and help in recovering my money.

Enclosures: Transaction screenshots, bank statement, chat/call screenshots, copy of ID proof.

Yours faithfully,
${f(v, "name")}
Mobile: ${f(v, "phone")}`,
  },
  {
    id: "rbi-ombudsman-escalation",
    icon: "landmark",
    title: { en: "RBI Ombudsman escalation (complaint text)", hi: "RBI लोकपाल शिकायत (टेक्स्ट)" },
    when: {
      en: "Use only if you already complained to your bank and it did not reply within 30 days, rejected your complaint, or you are not satisfied. File online at cms.rbi.org.in within one year of the bank's reply — paste this text into the form.",
      hi: "सिर्फ़ तब उपयोग करें जब आप बैंक से शिकायत कर चुके हैं और बैंक ने 30 दिनों में जवाब नहीं दिया, शिकायत ख़ारिज की, या आप संतुष्ट नहीं हैं। बैंक के जवाब के एक साल के भीतर cms.rbi.org.in पर ऑनलाइन शिकायत करें — यह टेक्स्ट फ़ॉर्म में पेस्ट करें।",
    },
    fields: [
      { name: "name", label: { en: "Your full name", hi: "आपका पूरा नाम" }, required: true },
      { name: "bank", label: { en: "Bank / wallet / NBFC name", hi: "बैंक / वॉलेट / NBFC का नाम" }, required: true },
      { name: "bankref", label: { en: "Bank complaint reference no. & date", hi: "बैंक शिकायत संदर्भ नंबर और तारीख" } },
      ...incident,
      { name: "response", label: { en: "Bank's response (or 'no reply in 30 days')", hi: "बैंक का जवाब (या '30 दिन में कोई जवाब नहीं')" }, type: "textarea" },
    ],
    build: (v, lang) =>
      lang === "hi"
        ? `मैंने ${f(v, "bank")} से अनधिकृत इलेक्ट्रॉनिक लेन-देन की शिकायत की थी (संदर्भ: ${f(v, "bankref")})।

लेन-देन: दिनांक ${f(v, "date")}, राशि ₹${f(v, "amount")}, UTR/ट्रांज़ैक्शन ID: ${f(v, "utr")}।

घटना: ${f(v, "story")}

बैंक का जवाब: ${f(v, "response")}

मैंने यह लेन-देन अधिकृत नहीं किया और धोखाधड़ी की सूचना तुरंत बैंक तथा 1930 / cybercrime.gov.in पर दी। मेरा अनुरोध है कि RBI के परिपत्र दिनांक 6 जुलाई 2017 (अनधिकृत इलेक्ट्रॉनिक बैंकिंग लेन-देन में ग्राहकों की सीमित देनदारी) के अनुसार मेरी शिकायत की जांच कर राशि वापस करने का निर्देश दिया जाए।

— ${f(v, "name")}`
        : `I complained to ${f(v, "bank")} about an unauthorised electronic transaction (bank reference: ${f(v, "bankref")}).

Transaction: dated ${f(v, "date")}, amount ₹${f(v, "amount")}, UTR/Transaction ID: ${f(v, "utr")}.

What happened: ${f(v, "story")}

Bank's response: ${f(v, "response")}

I did not authorise this transaction and reported the fraud promptly to the bank and to 1930 / cybercrime.gov.in. I request that my complaint be examined and the bank be directed to refund the amount in line with the RBI circular dated 6 July 2017 on "Customer Protection – Limiting Liability of Customers in Unauthorised Electronic Banking Transactions".

— ${f(v, "name")}`,
  },
  {
    id: "telecom-sim-block",
    icon: "sim",
    title: { en: "SIM block / SIM-swap complaint to telecom operator", hi: "SIM ब्लॉक / SIM-स्वैप शिकायत (टेलीकॉम ऑपरेटर)" },
    when: {
      en: "Send to your mobile operator if your SIM suddenly stopped working (possible SIM swap), your phone was lost, or a number was issued in your name without consent. Also check your connections on Sanchar Saathi.",
      hi: "अगर आपकी SIM अचानक बंद हो गई (संभावित SIM स्वैप), फ़ोन खो गया, या बिना सहमति आपके नाम पर नंबर जारी हुआ, तो मोबाइल ऑपरेटर को भेजें। संचार साथी पर भी अपने कनेक्शन जांचें।",
    },
    fields: [
      ...common,
      { name: "operator", label: { en: "Operator (Jio / Airtel / Vi / BSNL)", hi: "ऑपरेटर (Jio / Airtel / Vi / BSNL)" }, required: true },
      { name: "number", label: { en: "Affected mobile number", hi: "प्रभावित मोबाइल नंबर" }, required: true },
      { name: "date", label: { en: "When did the problem start?", hi: "समस्या कब शुरू हुई?" } },
      { name: "story", label: { en: "What happened (short)", hi: "क्या हुआ (संक्षेप में)" }, type: "textarea" },
    ],
    build: (v, lang) =>
      lang === "hi"
        ? `सेवा में,
नोडल अधिकारी / ग्राहक सेवा,
${f(v, "operator")}

दिनांक: ${today(lang)}

विषय: मोबाइल नंबर ${f(v, "number")} को तुरंत ब्लॉक करने / अनधिकृत SIM जारी होने की शिकायत

महोदय/महोदया,

मैं, ${f(v, "name")}, मोबाइल नंबर ${f(v, "number")} का पंजीकृत उपयोगकर्ता हूं। ${f(v, "date")} से:
${f(v, "story")}

मुझे आशंका है कि मेरे नंबर पर अनधिकृत रूप से डुप्लीकेट SIM जारी की गई है / इसका दुरुपयोग हो रहा है। अनुरोध है कि:
1. इस नंबर पर तुरंत रोक लगाई जाए।
2. बताया जाए कि क्या कोई डुप्लीकेट/रिप्लेसमेंट SIM जारी हुई है, और किस स्टोर से।
3. मेरी पहचान सत्यापित करके मुझे नई SIM जारी की जाए।

मैंने संबंधित धोखाधड़ी की सूचना बैंक और 1930 / cybercrime.gov.in पर भी दी है।

भवदीय,
${f(v, "name")}
संपर्क: ${f(v, "phone")}
पता: ${f(v, "address")}`
        : `To,
The Nodal Officer / Customer Care,
${f(v, "operator")}

Date: ${today(lang)}

Subject: Request to immediately block mobile number ${f(v, "number")} / complaint of unauthorised SIM issue

Dear Sir/Madam,

I, ${f(v, "name")}, am the registered user of mobile number ${f(v, "number")}. Since ${f(v, "date")}:
${f(v, "story")}

I suspect that a duplicate SIM has been issued for my number without my consent / that it is being misused. I request you to:
1. Immediately block this number.
2. Inform me whether any duplicate/replacement SIM was issued, and from which outlet.
3. Issue me a new SIM after verifying my identity.

I have also reported the related fraud to my bank and to 1930 / cybercrime.gov.in.

Yours faithfully,
${f(v, "name")}
Contact: ${f(v, "phone")}
Address: ${f(v, "address")}`,
  },
];
