import Link from "next/link";
import { Breadcrumbs } from "../Breadcrumbs";
import { JsonLd } from "../JsonLd";
import { Icon } from "../Icon";
import { ExploreMore, ArrowBox } from "../ExploreMore";
import { NotGovtNotice } from "../NotGovtNotice";
import { TemplateBuilder } from "../TemplateBuilder";
import { CyberNews } from "../CyberNews";
import { UpdatesGrid } from "../UpdatesGrid";
import { getDictionary } from "@/lib/i18n";
import { glossary } from "@/lib/content/glossary";
import { templates } from "@/lib/content/templates";
import { banks, BANKS_VERIFIED_ON } from "@/lib/content/banks";
import { CONTENT_UPDATED, scams } from "@/lib/content/scams";
import { absoluteUrl, localePath, type Locale } from "@/lib/site";
import { breadcrumbLd, buildMetadata, faqLd, graph, orgId } from "@/lib/seo";

const fmt = (iso: string, lang: Locale) => new Date(iso).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "long", year: "numeric" });

function Header({ lang, crumb, title, intro, path }: { lang: Locale; crumb: string; title: string; intro: string; path: string }) {
  const t = getDictionary(lang);
  return (
    <>
      <JsonLd data={graph(breadcrumbLd([{ name: t.common.home, path: localePath(lang, "/") }, { name: crumb, path: localePath(lang, path) }]))} />
      <Breadcrumbs items={[{ name: t.common.home, href: localePath(lang, "/") }, { name: crumb }]} />
      <header className="fade-up mt-5 max-w-3xl">
        <h1 className="font-display text-[28px] font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg">{intro}</p>
      </header>
    </>
  );
}

/* =========================== GLOSSARY =========================== */

const glossaryCopy = {
  en: {
    crumb: "Cyber Safety Glossary",
    title: "Cyber Safety Glossary: Scam & Cyber Crime Terms Explained",
    desc: "What is phishing, smishing, vishing, a mule account, SIM swap, digital arrest or quishing? Simple definitions of 25 cyber-fraud terms for Indians, in English and Hindi.",
    intro: "Plain-language meanings of the words you see in scam warnings and news — with links to the guide or tool for each.",
  },
  hi: {
    crumb: "साइबर सुरक्षा शब्दकोश",
    title: "साइबर सुरक्षा शब्दकोश: स्कैम और साइबर अपराध के शब्द आसान भाषा में",
    desc: "फ़िशिंग, स्मिशिंग, विशिंग, म्यूल खाता, SIM स्वैप, डिजिटल अरेस्ट या क्विशिंग क्या है? साइबर ठगी के 25 शब्दों की आसान परिभाषाएं, हिंदी और अंग्रेज़ी में।",
    intro: "स्कैम चेतावनियों और ख़बरों में दिखने वाले शब्दों के आसान अर्थ — हर शब्द से जुड़ी गाइड या टूल के लिंक के साथ।",
  },
};

export const glossaryMeta = (lang: Locale) => buildMetadata({ lang, path: "/glossary", title: glossaryCopy[lang].title, description: glossaryCopy[lang].desc });

export function GlossaryPage({ lang }: { lang: Locale }) {
  const c = glossaryCopy[lang];
  const url = absoluteUrl(localePath(lang, "/glossary"));
  const sorted = [...glossary].sort((a, b) => a.term[lang].localeCompare(b.term[lang], lang === "hi" ? "hi" : "en"));
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={graph({
          "@type": "DefinedTermSet",
          "@id": `${url}#terms`,
          name: c.title,
          url,
          inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
          hasDefinedTerm: sorted.map((g) => ({
            "@type": "DefinedTerm",
            name: g.term[lang],
            description: g.def[lang],
            url: `${url}#${g.id}`,
            inDefinedTermSet: `${url}#terms`,
          })),
        })}
      />
      <Header lang={lang} crumb={c.crumb} title={c.title} intro={c.intro} path="/glossary" />

      <nav aria-label="A–Z" className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {sorted.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="inline-flex min-h-[40px] shrink-0 items-center rounded-full border border-line px-3.5 text-sm text-slate-300 transition hover:border-cyan/50 hover:text-white">
            {g.term[lang].replace(/\s*\(.*\)$/, "")}
          </a>
        ))}
      </nav>

      <dl className="mt-8 grid gap-3 md:grid-cols-2">
        {sorted.map((g) => (
          <div key={g.id} id={g.id} className="glass scroll-mt-24 rounded-2xl p-5">
            <dt className="font-display text-lg font-bold text-white">{g.term[lang]}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-300">{g.def[lang]}</dd>
            {g.link && (
              <dd className="mt-3">
                <Link prefetch={false} href={localePath(lang, g.link)} className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-cyan hover:underline">
                  {lang === "hi" ? `${g.term.hi.replace(/\s*\(.*\)$/, "")} के बारे में और जानें` : `Learn more about ${g.term.en.replace(/\s*\(.*\)$/, "")}`} <Icon name="arrow-right" className="h-4 w-4" />
                </Link>
              </dd>
            )}
          </div>
        ))}
      </dl>
      <ExploreMore lang={lang} page="glossary" />
    </div>
  );
}

/* =========================== COMPLAINT LETTERS =========================== */

const lettersCopy = {
  en: {
    crumb: "Complaint Letter Formats",
    title: "Cyber Fraud Complaint Letter Formats (Bank, Police, RBI)",
    desc: "Free fill-in complaint letter formats for UPI/bank fraud to your bank, police cyber cell, RBI Ombudsman and telecom operator — in English and Hindi. Made on your device.",
    intro: "Fill in a few details and get a ready-to-send complaint letter in English or Hindi. Copy, download or print it — nothing you type leaves your device.",
    order: "Which letter, in what order?",
    steps: [
      ["Call 1930 and file on cybercrime.gov.in", "Do this first — within the golden hour if you can. Note the acknowledgement number."],
      ["Send the bank complaint letter", "Report the unauthorised transaction to your bank immediately; within 3 working days protects your rights under RBI's 2017 customer-protection circular."],
      ["Give the police / cyber cell letter", "Submit it at your local or cyber police station with your acknowledgement number and evidence."],
      ["Escalate to the RBI Ombudsman if needed", "Only after 30 days with no reply, a rejection or an unsatisfactory reply from the bank — file at cms.rbi.org.in within one year."],
    ] as [string, string][],
    faq: [
      { q: "How do I write a complaint letter to my bank for UPI fraud?", a: "Address it to the branch manager or grievance officer, give the date, amount and UTR/transaction ID, explain briefly what happened, mention your 1930/cybercrime.gov.in acknowledgement number, and ask the bank to block your account, raise a dispute and refund the amount under RBI's 6 July 2017 circular on limiting customer liability." },
      { q: "When can I complain to the RBI Ombudsman?", a: "Under the Reserve Bank – Integrated Ombudsman Scheme, 2021, you must first complain to your bank. If it does not reply within 30 days, rejects the complaint or you are not satisfied, you can file online at cms.rbi.org.in within one year of the bank's reply." },
      { q: "Is my information saved when I use these templates?", a: "No. The letter is generated in your browser only. Nothing you type is sent to Cyber Kavach or stored." },
    ],
  },
  hi: {
    crumb: "शिकायत पत्र प्रारूप",
    title: "साइबर फ्रॉड शिकायत पत्र प्रारूप (बैंक, पुलिस, RBI)",
    desc: "UPI/बैंक फ्रॉड के लिए बैंक, पुलिस साइबर सेल, RBI लोकपाल और टेलीकॉम ऑपरेटर को मुफ़्त शिकायत पत्र — हिंदी और अंग्रेज़ी में। आपके डिवाइस पर ही बनता है।",
    intro: "कुछ विवरण भरें और हिंदी या अंग्रेज़ी में भेजने के लिए तैयार शिकायत पत्र पाएं। कॉपी, डाउनलोड या प्रिंट करें — आपका लिखा कुछ भी आपके डिवाइस से बाहर नहीं जाता।",
    order: "कौन-सा पत्र, किस क्रम में?",
    steps: [
      ["1930 पर कॉल करें और cybercrime.gov.in पर शिकायत करें", "यह सबसे पहले करें — हो सके तो गोल्डन आवर में। पावती नंबर नोट करें।"],
      ["बैंक को शिकायत पत्र भेजें", "अनधिकृत लेन-देन की तुरंत बैंक को सूचना दें; 3 कार्य-दिवसों के भीतर सूचना RBI के 2017 के ग्राहक-सुरक्षा परिपत्र के तहत आपके अधिकार सुरक्षित रखती है।"],
      ["पुलिस / साइबर सेल को पत्र दें", "पावती नंबर और सबूतों के साथ स्थानीय या साइबर थाने में जमा करें।"],
      ["ज़रूरत हो तो RBI लोकपाल तक जाएं", "सिर्फ़ तब जब बैंक 30 दिनों में जवाब न दे, शिकायत ख़ारिज करे या जवाब संतोषजनक न हो — एक साल के भीतर cms.rbi.org.in पर शिकायत करें।"],
    ] as [string, string][],
    faq: [
      { q: "UPI फ्रॉड के लिए बैंक को शिकायत पत्र कैसे लिखें?", a: "पत्र शाखा प्रबंधक या शिकायत अधिकारी को लिखें, तारीख, राशि और UTR/ट्रांज़ैक्शन ID दें, संक्षेप में बताएं कि क्या हुआ, 1930/cybercrime.gov.in की पावती संख्या लिखें, और बैंक से खाता ब्लॉक करने, विवाद दर्ज करने और RBI के 6 जुलाई 2017 के ग्राहक देनदारी परिपत्र के अनुसार राशि लौटाने का अनुरोध करें।" },
      { q: "RBI लोकपाल से शिकायत कब कर सकते हैं?", a: "रिज़र्व बैंक – एकीकृत लोकपाल योजना, 2021 के तहत पहले बैंक से शिकायत करनी होती है। बैंक 30 दिनों में जवाब न दे, शिकायत ख़ारिज करे या आप संतुष्ट न हों, तो बैंक के जवाब के एक साल के भीतर cms.rbi.org.in पर ऑनलाइन शिकायत कर सकते हैं।" },
      { q: "क्या इन टेम्पलेट से मेरी जानकारी सेव होती है?", a: "नहीं। पत्र सिर्फ़ आपके ब्राउज़र में बनता है। आपका लिखा कुछ भी साइबर कवच को नहीं भेजा जाता और न ही सेव होता है।" },
    ],
  },
};

export const lettersMeta = (lang: Locale) => buildMetadata({ lang, path: "/complaint-letter-format", title: lettersCopy[lang].title, description: lettersCopy[lang].desc });

export function LettersPage({ lang }: { lang: Locale }) {
  const c = lettersCopy[lang];
  const url = absoluteUrl(localePath(lang, "/complaint-letter-format"));
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={graph(
          {
            "@type": "HowTo",
            "@id": `${url}#howto`,
            name: c.order,
            inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
            step: c.steps.map(([name, text], i) => ({ "@type": "HowToStep", position: i + 1, name, text })),
          },
          {
            "@type": "WebApplication",
            name: c.title,
            url,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any (web browser)",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
            publisher: { "@id": orgId },
          },
          faqLd(c.faq),
        )}
      />
      <Header lang={lang} crumb={c.crumb} title={c.title} intro={c.intro} path="/complaint-letter-format" />

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold text-white">{c.order}</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {c.steps.map(([title, text], i) => (
            <li key={title} className="glass flex gap-3 rounded-2xl p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-violet font-display text-sm font-bold text-white">{i + 1}</span>
              <span>
                <span className="block text-sm font-semibold text-white">{title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-400">{text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <TemplateBuilder lang={lang} />
      </section>

      <section className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-white">FAQ</h2>
        <div className="mt-5 space-y-3">
          {c.faq.map((f) => (
            <details key={f.q} className="glass rounded-2xl px-5 py-4" open>
              <summary className="font-semibold text-white">
                <h3 className="inline text-base">{f.q}</h3>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <ExploreMore lang={lang} page="letters" />
    </div>
  );
}

/* =========================== SCAM ALERTS =========================== */

const alertsCopy = {
  en: {
    crumb: "Scam Alerts",
    title: "Latest Scam Alerts in India & Cyber Safety Updates",
    desc: "Latest cyber-fraud news, new official safety rules (.bank.in, 1600 calls, @valid UPI, e-Zero FIR) and the scams to watch in India — updated regularly with sources.",
    intro: "Live cyber-fraud headlines, recent official changes that help you spot fakes, and the scams currently doing the rounds — every item links to its source.",
    news: "Latest headlines",
    official: "Official changes to know",
    watch: "Scams to watch right now",
    reviewed: "Guides last reviewed",
    tell: "Seen a new scam? Tell us — it helps protect others.",
  },
  hi: {
    crumb: "स्कैम अलर्ट",
    title: "भारत में ताज़ा स्कैम अलर्ट और साइबर सुरक्षा अपडेट",
    desc: "ताज़ा साइबर ठगी ख़बरें, नए आधिकारिक सुरक्षा नियम (.bank.in, 1600 कॉल, @valid UPI, e-ज़ीरो FIR) और भारत में अभी चल रहे स्कैम — स्रोतों के साथ नियमित अपडेट।",
    intro: "लाइव साइबर ठगी ख़बरें, नकली पहचानने में मदद करने वाले हाल के आधिकारिक बदलाव, और अभी चल रहे स्कैम — हर जानकारी अपने स्रोत से जुड़ी है।",
    news: "ताज़ा ख़बरें",
    official: "जानने लायक आधिकारिक बदलाव",
    watch: "अभी इन स्कैम से सावधान रहें",
    reviewed: "गाइड की अंतिम समीक्षा",
    tell: "कोई नया स्कैम देखा? हमें बताएं — इससे दूसरों की सुरक्षा होती है।",
  },
};

export const alertsMeta = (lang: Locale) => buildMetadata({ lang, path: "/scam-alerts", title: alertsCopy[lang].title, description: alertsCopy[lang].desc });

export function AlertsPage({ lang }: { lang: Locale }) {
  const c = alertsCopy[lang];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Header lang={lang} crumb={c.crumb} title={c.title} intro={c.intro} path="/scam-alerts" />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* min-w-0: lets the swipeable cards scroll inside the grid column instead of widening the page */}
        <section className="min-w-0">
          <h2 className="font-display text-2xl font-bold text-white">{c.official}</h2>
          <div className="mt-5">
            <UpdatesGrid lang={lang} />
          </div>
        </section>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="sr-only">{c.news}</h2>
          <CyberNews lang={lang} limit={8} />
        </aside>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold text-white">{c.watch}</h2>
        <p className="mt-2 text-sm text-slate-400">
          {c.reviewed}: <time dateTime={CONTENT_UPDATED}>{fmt(CONTENT_UPDATED, lang)}</time>
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {scams.map((s) => (
            <li key={s.slug}>
              <Link prefetch={false} href={localePath(lang, `/scams/${s.slug}`)} className="glass group flex h-full items-center gap-3 rounded-2xl p-4 transition hover:border-cyan/40">
                <span className="text-2xl" aria-hidden="true">
                  {s.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-white group-hover:text-cyan">{s.content[lang].name}</span>
                  <span className="mt-0.5 line-clamp-2 block text-xs text-slate-400">{s.content[lang].short}</span>
                </span>
                <ArrowBox />
              </Link>
            </li>
          ))}
        </ul>
        <Link prefetch={false} href={localePath(lang, "/about#feedback")} className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold text-cyan hover:border-cyan/50">
          <Icon name="megaphone" className="h-4 w-4" /> {c.tell}
        </Link>
      </section>
      <ExploreMore lang={lang} page="alerts" />
    </div>
  );
}

/* =========================== BANK FRAUD HELP =========================== */

const bankCopy = {
  en: {
    crumb: "Bank Fraud Help",
    title: "Bank Fraud Complaint: How to Report & Find Genuine Helplines",
    desc: "Money stolen from your bank account or UPI? What to do first, how to find your bank's genuine fraud helpline safely, and official .bank.in websites of major Indian banks.",
    intro: "If money left your account without your permission, act in this order. And never trust a 'customer care' number from Google search, social media or a stranger — take it only from your card, passbook, official app or the bank's official website below.",
    stepsTitle: "Do this immediately",
    steps: [
      ["Call 1930", "The National Cyber Crime Helpline can alert banks to hold the money. Keep UTR/transaction IDs ready."],
      ["Block cards, UPI and net banking", "Use your bank's official app, the number on the back of your debit card or passbook, or the official website below."],
      ["Report to your bank in writing", "Within 3 working days of the bank's alert, to protect your rights under RBI's 6 July 2017 customer-protection circular."],
      ["File on cybercrime.gov.in", "Add all transaction details and screenshots. Note the acknowledgement number."],
    ] as [string, string][],
    banksTitle: "Official websites of major banks",
    banksNote: "Each link was checked to open on the bank's official .bank.in domain. Use the site's 'Contact us' or 'Report fraud' section for the current helpline.",
    numberWarn: "We deliberately don't list phone numbers here — numbers change and fake 'helplines' are a common scam. Always confirm on the official source.",
    faq: [
      { q: "How do I find my bank's real customer care number?", a: "Take it from the back of your debit/credit card, your passbook, your bank's official app, or its official website (Indian banks now use the .bank.in domain). Never use numbers from search results, social media posts or messages." },
      { q: "Will the bank refund money lost to fraud?", a: "Under RBI's 6 July 2017 circular, if the fraud was due to a third-party breach (not your negligence) and you report it within 3 working days, your liability is zero. If you shared your OTP or PIN, the bank may hold you liable until you report it. Report as quickly as possible either way." },
      { q: "What if my bank doesn't resolve my fraud complaint?", a: "If the bank doesn't reply within 30 days, rejects the complaint or you are not satisfied, file a complaint with the RBI Ombudsman at cms.rbi.org.in within one year of the bank's reply." },
    ],
  },
  hi: {
    crumb: "बैंक फ्रॉड सहायता",
    title: "बैंक फ्रॉड शिकायत: कैसे करें और असली हेल्पलाइन कैसे पाएं",
    desc: "बैंक खाते या UPI से पैसे चोरी हुए? पहले क्या करें, अपने बैंक की असली फ्रॉड हेल्पलाइन सुरक्षित रूप से कैसे पाएं, और प्रमुख भारतीय बैंकों की आधिकारिक .bank.in वेबसाइटें।",
    intro: "अगर आपकी अनुमति के बिना खाते से पैसा गया है, तो इस क्रम में कदम उठाएं। और Google सर्च, सोशल मीडिया या किसी अजनबी के 'कस्टमर केयर' नंबर पर कभी भरोसा न करें — नंबर सिर्फ़ अपने कार्ड, पासबुक, आधिकारिक ऐप या नीचे दी आधिकारिक वेबसाइट से लें।",
    stepsTitle: "तुरंत यह करें",
    steps: [
      ["1930 पर कॉल करें", "राष्ट्रीय साइबर अपराध हेल्पलाइन बैंकों को पैसा रोकने के लिए सूचित कर सकती है। UTR/ट्रांज़ैक्शन ID तैयार रखें।"],
      ["कार्ड, UPI और नेट बैंकिंग ब्लॉक करें", "बैंक का आधिकारिक ऐप, डेबिट कार्ड या पासबुक पर दिया नंबर, या नीचे दी आधिकारिक वेबसाइट इस्तेमाल करें।"],
      ["बैंक को लिखित सूचना दें", "बैंक के अलर्ट के 3 कार्य-दिवसों के भीतर, ताकि RBI के 6 जुलाई 2017 के ग्राहक-सुरक्षा परिपत्र के तहत आपके अधिकार सुरक्षित रहें।"],
      ["cybercrime.gov.in पर शिकायत करें", "सभी लेन-देन विवरण और स्क्रीनशॉट जोड़ें। पावती नंबर नोट करें।"],
    ] as [string, string][],
    banksTitle: "प्रमुख बैंकों की आधिकारिक वेबसाइटें",
    banksNote: "हर लिंक जांचा गया है कि वह बैंक के आधिकारिक .bank.in डोमेन पर खुलता है। ताज़ा हेल्पलाइन के लिए साइट का 'Contact us' या 'Report fraud' सेक्शन देखें।",
    numberWarn: "हम जानबूझकर यहां फ़ोन नंबर नहीं देते — नंबर बदलते रहते हैं और नकली 'हेल्पलाइन' एक आम स्कैम है। हमेशा आधिकारिक स्रोत पर पुष्टि करें।",
    faq: [
      { q: "अपने बैंक का असली कस्टमर केयर नंबर कैसे पाएं?", a: "डेबिट/क्रेडिट कार्ड के पीछे, पासबुक, बैंक के आधिकारिक ऐप या उसकी आधिकारिक वेबसाइट से लें (भारतीय बैंक अब .bank.in डोमेन इस्तेमाल करते हैं)। सर्च नतीजों, सोशल मीडिया पोस्ट या मैसेज के नंबर कभी इस्तेमाल न करें।" },
      { q: "क्या बैंक धोखाधड़ी में गया पैसा लौटाएगा?", a: "RBI के 6 जुलाई 2017 के परिपत्र के अनुसार, अगर धोखाधड़ी किसी तीसरे पक्ष की गड़बड़ी से हुई (आपकी लापरवाही से नहीं) और आप 3 कार्य-दिवसों में सूचना देते हैं, तो आपकी देनदारी शून्य है। अगर आपने OTP या PIN साझा किया, तो सूचना देने तक नुकसान की ज़िम्मेदारी आप पर हो सकती है। दोनों ही स्थितियों में जितनी जल्दी हो सके सूचना दें।" },
      { q: "बैंक मेरी शिकायत हल न करे तो?", a: "अगर बैंक 30 दिनों में जवाब न दे, शिकायत ख़ारिज करे या आप संतुष्ट न हों, तो बैंक के जवाब के एक साल के भीतर cms.rbi.org.in पर RBI लोकपाल से शिकायत करें।" },
    ],
  },
};

export const bankMeta = (lang: Locale) => buildMetadata({ lang, path: "/bank-fraud-help", title: bankCopy[lang].title, description: bankCopy[lang].desc });

export function BankHelpPage({ lang }: { lang: Locale }) {
  const c = bankCopy[lang];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd data={graph(faqLd(c.faq))} />
      <Header lang={lang} crumb={c.crumb} title={c.title} intro={c.intro} path="/bank-fraud-help" />
      <NotGovtNotice lang={lang} className="mt-5 max-w-3xl" />

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold text-white">{c.stepsTitle}</h2>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {c.steps.map(([title, text], i) => (
            <li key={title} className={`flex gap-3 rounded-2xl border p-4 ${i === 0 ? "border-rose-500/40 bg-rose-500/[0.07]" : "glass"}`}>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold text-white ${i === 0 ? "bg-rose-500" : "bg-gradient-to-br from-cyan to-violet"}`}>{i + 1}</span>
              <span>
                <span className="block text-sm font-semibold text-white">{title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-400">{text}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="tel:1930" className="btn-shine inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-rose-500 px-5 font-display text-lg font-bold text-white">
            <Icon name="phone" className="h-5 w-5" /> 1930
          </a>
          <Link prefetch={false} href={localePath(lang, `/complaint-letter-format`)} className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-line px-5 text-sm font-semibold text-cyan hover:border-cyan/50">
            <Icon name="file-check" className="h-4 w-4" /> {templates[0].title[lang]}
          </Link>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold text-white">{c.banksTitle}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
          {c.banksNote} ({lang === "hi" ? "जांच तिथि" : "Checked"}: {fmt(BANKS_VERIFIED_ON, lang)})
        </p>
        <p className="mt-3 flex max-w-3xl items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] px-4 py-3 text-sm text-amber-100">
          <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" /> {c.numberWarn}
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {banks.map((b) => (
            <li key={b.url}>
              <a href={b.url} target="_blank" rel="noopener noreferrer" className="glass group flex h-full items-center gap-3 rounded-2xl p-4 transition hover:border-cyan/40">
                <Icon name="bank" className="h-5 w-5 shrink-0 text-cyan" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-white group-hover:text-cyan">{b.name}</span>
                  <span className="block truncate font-mono text-xs text-slate-400">{b.url.replace("https://", "")}</span>
                </span>
                <ArrowBox external />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-white">FAQ</h2>
        <div className="mt-5 space-y-3">
          {c.faq.map((f) => (
            <details key={f.q} className="glass rounded-2xl px-5 py-4" open>
              <summary className="font-semibold text-white">
                <h3 className="inline text-base">{f.q}</h3>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <ExploreMore lang={lang} page="bank" />
    </div>
  );
}
