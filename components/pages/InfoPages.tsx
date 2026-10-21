import Link from "next/link";
import { ExploreMore } from "../ExploreMore";
import { Breadcrumbs } from "../Breadcrumbs";
import { JsonLd } from "../JsonLd";
import { HelpWizard } from "../HelpWizard";
import { Quiz } from "../Quiz";
import { FeedbackForm } from "../FeedbackForm";
import { getDictionary } from "@/lib/i18n";
import { resources } from "@/lib/content/resources";
import { Icon } from "../Icon";
import { NotGovtNotice } from "../NotGovtNotice";
import { helpSituations } from "@/lib/content/help";
import { quiz } from "@/lib/content/quiz";
import { CONTENT_UPDATED } from "@/lib/content/scams";
import { CONTACT_EMAIL, CREATOR, CREATOR_LINKS, SISTER_SITES, SITE_NAME, SITE_URL, absoluteUrl, helplines, localePath, type Locale } from "@/lib/site";
import { breadcrumbLd, buildMetadata, faqLd, graph, orgId, personId } from "@/lib/seo";

function PageHeader({ lang, crumb, title, intro, path }: { lang: Locale; crumb: string; title: string; intro?: string; path: string }) {
  const t = getDictionary(lang);
  return (
    <>
      <JsonLd data={graph(breadcrumbLd([{ name: t.common.home, path: localePath(lang, "/") }, { name: crumb, path: localePath(lang, path) }]))} />
      <Breadcrumbs items={[{ name: t.common.home, href: localePath(lang, "/") }, { name: crumb }]} />
      <header className="fade-up mt-6 max-w-3xl">
        <h1 className="font-display text-[28px] font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{title}</h1>
        {intro && <p className="mt-3 text-base leading-relaxed text-slate-300 sm:mt-4 sm:text-lg">{intro}</p>}
      </header>
    </>
  );
}

/* =========================== REPORT =========================== */

const reportCopy = {
  en: {
    crumb: "Report Fraud",
    title: "How to Report Cyber Fraud in India: 1930 & Online Complaint",
    desc: "Lost money to an online scam? Call 1930 and file on cybercrime.gov.in. Step-by-step guide to reporting cyber fraud in India, documents needed, and every official portal.",
    answer:
      "To report cyber fraud in India, call the National Cyber Crime Helpline 1930 immediately, then file a complaint at cybercrime.gov.in under 'Report Cyber Crime'. Add transaction IDs, the scammer's UPI ID or account, and screenshots. Also inform your bank to block cards and raise a dispute within 3 working days.",
    stepsTitle: "Filing a complaint on cybercrime.gov.in",
    steps: [
      ["Call 1930 first (for money loss)", "Calling within the first hour gives the best chance of freezing the scammer's account through the Citizen Financial Cyber Fraud Reporting system."],
      ["Open cybercrime.gov.in", "Click 'File a Complaint' → 'Report Cyber Crime'. Women/child related crimes have a separate (and anonymous) option."],
      ["Log in with your mobile number", "Enter your name, mobile number and the OTP. Use your own phone — the OTP comes from the official portal."],
      ["Describe the incident", "Select the category (e.g. online financial fraud), date, time and a clear description of what happened in your own words."],
      ["Add suspect and transaction details", "Enter the scammer's phone numbers, UPI IDs, bank account numbers, websites, and every transaction ID (UTR), amount and date."],
      ["Upload evidence and submit", "Attach screenshots, bank statements and chat exports (max file sizes apply). Submit and save the acknowledgement number for follow-up."],
    ],
    docsTitle: "Keep these ready",
    docs: [
      "Transaction IDs / UTR numbers, dates and amounts",
      "Bank statement or app screenshots of the debits",
      "Scammer's phone numbers, UPI IDs, account numbers, links",
      "Screenshots of chats, SMS, call logs and profiles",
      "Your ID proof (Aadhaar/PAN) for police follow-up",
    ],
    dirTitle: "Official complaint portals",
    faq: [
      { q: "What is the cyber crime complaint number in India?", a: "The National Cyber Crime Helpline number is 1930. You can also report online at cybercrime.gov.in, which is run by the Indian Cyber Crime Coordination Centre (I4C) under the Ministry of Home Affairs." },
      { q: "Can I file a cyber crime complaint online without going to the police station?", a: "Yes. You can file a complaint online at cybercrime.gov.in. It is forwarded to the police of the concerned state. Visiting your local cyber cell later with the acknowledgement number can help follow-up." },
      { q: "How do I report a fraud call or SMS?", a: "Report suspected fraud calls, SMS and WhatsApp messages on the Chakshu facility of the Sanchar Saathi portal (sancharsaathi.gov.in/sfc). If money was lost, also call 1930." },
    ],
  },
  hi: {
    crumb: "शिकायत करें",
    title: "भारत में साइबर फ्रॉड की शिकायत कैसे करें: कदम-दर-कदम गाइड",
    desc: "ऑनलाइन ठगी में पैसे गए? 1930 पर कॉल करें और cybercrime.gov.in पर शिकायत करें। ज़रूरी दस्तावेज़ और सभी आधिकारिक पोर्टल की पूरी जानकारी।",
    answer:
      "भारत में साइबर फ्रॉड की शिकायत के लिए तुरंत राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर कॉल करें, फिर cybercrime.gov.in पर 'Report Cyber Crime' में शिकायत दर्ज करें। ट्रांज़ैक्शन ID, ठग की UPI ID या खाता और स्क्रीनशॉट जोड़ें। बैंक को भी 3 कार्य-दिवसों में सूचित करके कार्ड ब्लॉक और विवाद दर्ज करवाएं।",
    stepsTitle: "cybercrime.gov.in पर शिकायत दर्ज करना",
    steps: [
      ["पहले 1930 पर कॉल करें (पैसे गए हों तो)", "पहले घंटे में कॉल करने से नागरिक वित्तीय साइबर फ्रॉड रिपोर्टिंग सिस्टम के ज़रिए ठग का खाता फ्रीज़ होने की सबसे अच्छी संभावना होती है।"],
      ["cybercrime.gov.in खोलें", "'File a Complaint' → 'Report Cyber Crime' पर क्लिक करें। महिला/बाल अपराध के लिए अलग (और गुमनाम) विकल्प है।"],
      ["मोबाइल नंबर से लॉगिन करें", "नाम, मोबाइल नंबर और OTP डालें। अपना फ़ोन इस्तेमाल करें — OTP आधिकारिक पोर्टल से आता है।"],
      ["घटना का विवरण दें", "श्रेणी (जैसे ऑनलाइन वित्तीय धोखाधड़ी), तारीख, समय और जो हुआ उसका साफ़ विवरण अपने शब्दों में लिखें।"],
      ["संदिग्ध और लेन-देन की जानकारी जोड़ें", "ठग के फ़ोन नंबर, UPI ID, बैंक खाता नंबर, वेबसाइट और हर ट्रांज़ैक्शन ID (UTR), राशि व तारीख डालें।"],
      ["सबूत अपलोड करें और जमा करें", "स्क्रीनशॉट, बैंक स्टेटमेंट और चैट जोड़ें। जमा करें और आगे की कार्रवाई के लिए पावती नंबर सहेजें।"],
    ],
    docsTitle: "ये तैयार रखें",
    docs: [
      "ट्रांज़ैक्शन ID / UTR नंबर, तारीख और राशि",
      "डेबिट के बैंक स्टेटमेंट या ऐप स्क्रीनशॉट",
      "ठग के फ़ोन नंबर, UPI ID, खाता नंबर, लिंक",
      "चैट, SMS, कॉल लॉग और प्रोफ़ाइल के स्क्रीनशॉट",
      "पुलिस कार्रवाई के लिए अपना पहचान पत्र (आधार/PAN)",
    ],
    dirTitle: "आधिकारिक शिकायत पोर्टल",
    faq: [
      { q: "भारत में साइबर क्राइम शिकायत नंबर क्या है?", a: "राष्ट्रीय साइबर अपराध हेल्पलाइन नंबर 1930 है। आप cybercrime.gov.in पर ऑनलाइन भी शिकायत कर सकते हैं, जिसे गृह मंत्रालय का भारतीय साइबर अपराध समन्वय केंद्र (I4C) चलाता है।" },
      { q: "क्या थाने गए बिना ऑनलाइन साइबर क्राइम शिकायत हो सकती है?", a: "हां। cybercrime.gov.in पर ऑनलाइन शिकायत कर सकते हैं। यह संबंधित राज्य की पुलिस को भेजी जाती है। बाद में पावती नंबर के साथ स्थानीय साइबर सेल जाने से कार्रवाई में मदद मिलती है।" },
      { q: "फ्रॉड कॉल या SMS की शिकायत कैसे करें?", a: "संदिग्ध फ्रॉड कॉल, SMS और WhatsApp मैसेज की शिकायत संचार साथी पोर्टल की चक्षु सुविधा (sancharsaathi.gov.in/sfc) पर करें। पैसे गए हों तो 1930 पर भी कॉल करें।" },
    ],
  },
};

export const reportMeta = (lang: Locale) =>
  buildMetadata({ lang, path: "/report", title: reportCopy[lang].title, description: reportCopy[lang].desc, type: "article" });

export function ReportPage({ lang }: { lang: Locale }) {
  const c = reportCopy[lang];
  const url = absoluteUrl(localePath(lang, "/report"));
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={graph(
          {
            "@type": "HowTo",
            "@id": `${url}#howto`,
            name: c.stepsTitle,
            description: c.answer,
            inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
            totalTime: "PT20M",
            supply: c.docs.map((d) => ({ "@type": "HowToSupply", name: d })),
            step: c.steps.map(([name, text], i) => ({ "@type": "HowToStep", position: i + 1, name, text })),
          },
          faqLd(c.faq),
        )}
      />
      <PageHeader lang={lang} crumb={c.crumb} title={c.title} path="/report" />
      <NotGovtNotice lang={lang} className="mt-5 max-w-3xl" />

      <section className="fade-up mt-8 max-w-3xl rounded-3xl border border-cyan/30 bg-cyan/[0.06] p-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">{lang === "hi" ? "संक्षिप्त उत्तर" : "Quick answer"}</h2>
        <p className="mt-3 text-lg leading-relaxed text-slate-100">{c.answer}</p>
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_340px]">
        <section className="reveal">
          <h2 className="font-display text-2xl font-bold text-white">{c.stepsTitle}</h2>
          <ol className="mt-6 space-y-4">
            {c.steps.map(([title, text], i) => (
              <li key={title} className="glass flex gap-4 rounded-2xl p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-violet font-display font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan to-violet px-6 py-3.5 font-semibold text-white"
          >
            cybercrime.gov.in ↗
          </a>
        </section>
        <aside className="order-first space-y-5 lg:order-none lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-600/25 to-transparent p-5 sm:p-6">
            <a href="tel:1930" className="btn-shine flex items-center justify-center gap-2 rounded-2xl bg-rose-500 py-3 font-display text-2xl font-bold text-white">
              <Icon name="phone" className="h-6 w-6" /> 1930
            </a>
            <p className="mt-3 text-center text-sm text-rose-100/80">{helplines[0].note[lang]}</p>
          </div>
          <div className="glass rounded-3xl p-6">
            <h2 className="font-display text-lg font-bold text-white">{c.docsTitle}</h2>
            <ul className="mt-4 space-y-2.5">
              {c.docs.map((d) => (
                <li key={d} className="flex gap-2.5 text-sm text-slate-300">
                  <span className="text-cyan">✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="reveal font-display text-3xl font-bold text-white">{c.dirTitle}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resources
            .filter((r) => r.category === "report")
            .map((r) => (
              <li key={r.id} className="reveal">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group flex h-full gap-3 rounded-2xl p-4 transition hover:border-cyan/40 active:scale-[0.99]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300">
                    <Icon name={r.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">{r.org}</span>
                    <span className="mt-0.5 block font-semibold leading-snug text-white group-hover:text-cyan">
                      {r.name[lang]} <Icon name="external" className="inline h-3.5 w-3.5" />
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-400">{r.desc[lang]}</span>
                  </span>
                </a>
              </li>
            ))}
        </ul>
        <Link prefetch={false}
          href={localePath(lang, "/services")}
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-5 font-semibold text-cyan transition hover:bg-cyan/20"
        >
          <Icon name="landmark" className="h-5 w-5" />
          {lang === "hi" ? "सभी सरकारी साइबर सेवाएं देखें" : "See all government cyber services"}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="reveal font-display text-2xl font-bold text-white">FAQ</h2>
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
      <ExploreMore lang={lang} page="report" />
    </div>
  );
}

/* =========================== HELP =========================== */

const helpCopy = {
  en: {
    crumb: "Got Scammed?",
    title: "Scammed Online? What to Do in the First Hour (UPI & Bank)",
    intro: "Don't panic — act fast. Pick what happened and follow the checklist. Every minute counts when money is involved.",
    desc: "Lost money to a scam, shared your OTP or got blackmailed? Follow this free step-by-step recovery checklist for India: call 1930, block accounts, report and protect yourself.",
    labels: { choose: "What happened?", progress: "Your progress", back: "Choose a different situation", urgent: "Do now", open: "Open official site", call: "Call", done: "Great — you've completed every step. Keep your complaint number safe and follow up." },
  },
  hi: {
    crumb: "ठगी हो गई?",
    title: "ऑनलाइन ठगी हो गई? पहले घंटे में क्या करें",
    intro: "घबराएं नहीं — तुरंत कदम उठाएं। जो हुआ उसे चुनें और चेकलिस्ट का पालन करें। पैसों के मामले में हर मिनट कीमती है।",
    desc: "ठगी में पैसे गए, OTP बता दिया या ब्लैकमेल हो रहे हैं? भारत के लिए मुफ़्त रिकवरी चेकलिस्ट: 1930 पर कॉल करें, खाते ब्लॉक करें, शिकायत करें और सुरक्षित रहें।",
    labels: { choose: "क्या हुआ?", progress: "आपकी प्रगति", back: "दूसरी स्थिति चुनें", urgent: "अभी करें", open: "आधिकारिक साइट खोलें", call: "कॉल करें", done: "बहुत अच्छा — आपने सभी कदम पूरे कर लिए। शिकायत नंबर सुरक्षित रखें और फ़ॉलो-अप करें।" },
  },
};

export const helpMeta = (lang: Locale) => buildMetadata({ lang, path: "/help", title: helpCopy[lang].title, description: helpCopy[lang].desc });

export function HelpPage({ lang }: { lang: Locale }) {
  const c = helpCopy[lang];
  const situations = helpSituations.map((s) => ({
    id: s.id,
    icon: s.icon,
    label: s.label[lang],
    steps: s.steps.map((st) => ({ title: st.title[lang], detail: st.detail[lang], href: st.href, tel: st.tel, urgent: st.urgent })),
  }));
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader lang={lang} crumb={c.crumb} title={c.title} intro={c.intro} path="/help" />
      <NotGovtNotice lang={lang} className="mt-5" />
      <a
        href="tel:1930"
        className="btn-shine mt-8 flex items-center justify-between gap-4 rounded-3xl border border-rose-500/40 bg-gradient-to-r from-rose-600/30 to-orange-500/10 p-5 sm:p-6"
      >
        <span>
          <span className="block font-display text-lg font-bold text-white">{lang === "hi" ? "पैसे गए हैं? पहले यह करें:" : "Lost money? Do this first:"}</span>
          <span className="block text-sm text-rose-100/80">{helplines[0].label[lang]}</span>
        </span>
        <span className="rounded-2xl bg-rose-500 px-5 py-3 font-display text-2xl font-extrabold text-white">1930</span>
      </a>
      <div className="mt-10">
        <HelpWizard situations={situations} labels={c.labels} />
      </div>
      <ExploreMore lang={lang} page="help" />
    </div>
  );
}

/* =========================== QUIZ =========================== */

const quizCopy = {
  en: {
    crumb: "Scam Quiz",
    title: "Scam or Safe? Test Your Scam IQ",
    intro: "10 real-style messages. Can you spot which ones are frauds? Takes 2 minutes — then challenge your family.",
    desc: "Free scam awareness quiz for India: 10 real-style SMS and WhatsApp messages. Can you tell scam from safe? Share your Scam IQ with family.",
    labels: {
      question: "Message",
      scam: "Scam",
      safe: "Safe",
      correct: "Correct!",
      wrong: "Not quite.",
      next: "Next",
      finish: "See my score",
      result: "Your Scam IQ",
      levels: ["🛡️ Cyber Kavach champion!", "👍 Good — stay alert", "⚠️ Scammers could fool you — read our scam guides"] as [string, string, string],
      share: "Challenge family on WhatsApp",
      retry: "Try again",
      shareText: "I scored {score} on the Cyber Kavach Scam IQ quiz. Can you beat me?",
    },
  },
  hi: {
    crumb: "स्कैम क्विज़",
    title: "स्कैम या सुरक्षित? अपना स्कैम IQ जांचें",
    intro: "10 असली जैसे मैसेज। क्या आप पहचान सकते हैं कि कौन-से फ्रॉड हैं? 2 मिनट लगेंगे — फिर परिवार को चुनौती दें।",
    desc: "भारत के लिए मुफ़्त स्कैम जागरूकता क्विज़: 10 असली जैसे SMS और WhatsApp मैसेज। स्कैम और सुरक्षित में फ़र्क पहचानें और परिवार के साथ शेयर करें।",
    labels: {
      question: "मैसेज",
      scam: "स्कैम",
      safe: "सुरक्षित",
      correct: "सही!",
      wrong: "ग़लत।",
      next: "अगला",
      finish: "मेरा स्कोर देखें",
      result: "आपका स्कैम IQ",
      levels: ["🛡️ साइबर कवच चैंपियन!", "👍 अच्छा — सतर्क रहें", "⚠️ ठग आपको धोखा दे सकते हैं — हमारी स्कैम गाइड पढ़ें"] as [string, string, string],
      share: "WhatsApp पर परिवार को चुनौती दें",
      retry: "फिर से खेलें",
      shareText: "मैंने साइबर कवच स्कैम IQ क्विज़ में {score} स्कोर किया। क्या आप मुझे हरा सकते हैं?",
    },
  },
};

export const quizMeta = (lang: Locale) => buildMetadata({ lang, path: "/quiz", title: quizCopy[lang].title, description: quizCopy[lang].desc });

export function QuizPage({ lang }: { lang: Locale }) {
  const c = quizCopy[lang];
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={graph({
          "@type": "Quiz",
          name: c.title,
          about: { "@type": "Thing", name: "Online scams in India" },
          educationalLevel: "beginner",
          inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
          isAccessibleForFree: true,
          provider: { "@id": orgId },
        })}
      />
      <PageHeader lang={lang} crumb={c.crumb} title={c.title} intro={c.intro} path="/quiz" />
      <div className="glow-border glass mt-10 rounded-3xl p-6 sm:p-8">
        <Quiz
          items={quiz.map((q) => ({ message: q.message[lang], scam: q.scam, explain: q.explain[lang] }))}
          labels={c.labels}
          shareUrl={`${SITE_URL}${localePath(lang, "/quiz")}`}
        />
      </div>
      <ExploreMore lang={lang} page="quiz" />
    </div>
  );
}

/* =========================== ABOUT =========================== */

const aboutCopy = {
  en: {
    crumb: "About",
    title: "About Cyber Kavach",
    desc: "Cyber Kavach is a free, independent AI scam detection and cyber-fraud help platform for India, created by Yash Trivedi. Learn how it works and its limits.",
    intro: "Cyber Kavach (कवच means 'shield') is a free, independent public-awareness project that helps Indians check suspicious messages and act fast after fraud.",
    sections: [
      {
        h: "Our mission",
        p: [
          "Online fraud in India increasingly targets people who are new to digital payments — parents, grandparents, students and small businesses. Most scams succeed because victims act in a hurry and don't know what's normal.",
          "Cyber Kavach gives everyone a calm second opinion in seconds, explains the trick in plain English and Hindi, and points to the official way to report. It will always be free, with no sign-up and no ads.",
        ],
      },
      {
        h: "How the scanner works",
        p: [
          "Every scan runs through two engines. An offline pattern engine checks for known Indian scam tactics — KYC threats, UPI PIN requests, digital-arrest language, look-alike bank domains, shortened links, APK downloads and more. At the same time, Google's Gemini AI reads the content (or screenshot) and explains the risk.",
          "The two scores are combined into one risk score. If the AI is unavailable (for example, when the free quota is used up), the pattern engine still gives you a result — so the tool never stops working.",
        ],
      },
      {
        h: "Limitations",
        p: [
          "No tool is perfect. Scammers constantly change their scripts, and AI can make mistakes. A 'safe' result is not a guarantee. When in doubt, contact the organisation through its official app or website, and report fraud on cybercrime.gov.in or 1930.",
          "Cyber Kavach is not affiliated with any government agency, bank or the Indian Cyber Crime Coordination Centre (I4C). Our guides link to official portals so you can verify everything yourself.",
        ],
      },
    ],
    creator: "Created by",
    creatorText: "Designed and developed by Yash Trivedi as a public-good cyber safety project. Content is reviewed regularly against official advisories from I4C, RBI, DoT and CERT-In.",
    feedback: "Feedback & scam reports",
    feedbackText: "Seen a new scam we don't cover, or found a mistake? Tell us — it helps protect others.",
    form: { name: "Your name", email: "Email address", message: "Your suggestion, bug or a new scam you've seen…", submit: "Send feedback", sending: "Sending…", ok: "Thank you! Your feedback has been sent.", fail: "Couldn't send right now. Please try again later." },
  },
  hi: {
    crumb: "हमारे बारे में",
    title: "साइबर कवच के बारे में",
    desc: "साइबर कवच भारत के लिए एक मुफ़्त, स्वतंत्र AI स्कैम जांच और साइबर फ्रॉड सहायता प्लेटफ़ॉर्म है, जिसे यश त्रिवेदी ने बनाया है। जानें यह कैसे काम करता है।",
    intro: "साइबर कवच एक मुफ़्त, स्वतंत्र जन-जागरूकता प्रोजेक्ट है जो भारतीयों को संदिग्ध मैसेज जांचने और ठगी के बाद तुरंत कदम उठाने में मदद करता है।",
    sections: [
      {
        h: "हमारा उद्देश्य",
        p: [
          "भारत में ऑनलाइन ठगी ज़्यादातर उन लोगों को निशाना बनाती है जो डिजिटल भुगतान में नए हैं — माता-पिता, बुज़ुर्ग, छात्र और छोटे व्यापारी। ज़्यादातर स्कैम इसलिए सफल होते हैं क्योंकि लोग जल्दबाज़ी में कदम उठाते हैं।",
          "साइबर कवच हर किसी को सेकंडों में एक शांत दूसरी राय देता है, चाल को आसान हिंदी और अंग्रेज़ी में समझाता है और शिकायत का आधिकारिक तरीका बताता है। यह हमेशा मुफ़्त रहेगा — बिना साइन-अप और बिना विज्ञापन।",
        ],
      },
      {
        h: "स्कैनर कैसे काम करता है",
        p: [
          "हर स्कैन दो इंजन से गुज़रता है। ऑफ़लाइन पैटर्न इंजन ज्ञात भारतीय स्कैम तरीकों की जांच करता है — KYC धमकी, UPI PIN की मांग, डिजिटल अरेस्ट की भाषा, नकली बैंक डोमेन, छोटे लिंक, APK डाउनलोड आदि। साथ ही Google का Gemini AI सामग्री (या स्क्रीनशॉट) पढ़कर जोखिम समझाता है।",
          "दोनों स्कोर मिलाकर एक जोखिम स्कोर बनता है। AI उपलब्ध न हो (जैसे मुफ़्त सीमा ख़त्म होने पर), तब भी पैटर्न इंजन नतीजा देता है — इसलिए टूल कभी बंद नहीं होता।",
        ],
      },
      {
        h: "सीमाएं",
        p: [
          "कोई भी टूल पूर्ण नहीं है। ठग लगातार तरीके बदलते हैं और AI से गलती हो सकती है। 'सुरक्षित' नतीजा गारंटी नहीं है। संदेह हो तो संस्था से उसके आधिकारिक ऐप या वेबसाइट से संपर्क करें और cybercrime.gov.in या 1930 पर शिकायत करें।",
          "साइबर कवच किसी सरकारी एजेंसी, बैंक या I4C से संबद्ध नहीं है। हमारी गाइड आधिकारिक पोर्टल से जुड़ी हैं ताकि आप ख़ुद सब कुछ जांच सकें।",
        ],
      },
    ],
    creator: "निर्माता",
    creatorText: "यश त्रिवेदी द्वारा जनहित साइबर सुरक्षा प्रोजेक्ट के रूप में डिज़ाइन और विकसित। सामग्री की I4C, RBI, DoT और CERT-In की आधिकारिक सलाहों के आधार पर नियमित समीक्षा की जाती है।",
    feedback: "सुझाव और स्कैम रिपोर्ट",
    feedbackText: "कोई नया स्कैम देखा जो यहां नहीं है, या कोई गलती मिली? हमें बताएं — इससे दूसरों की सुरक्षा होती है।",
    form: { name: "आपका नाम", email: "ईमेल पता", message: "आपका सुझाव, समस्या या कोई नया स्कैम…", submit: "सुझाव भेजें", sending: "भेजा जा रहा है…", ok: "धन्यवाद! आपका सुझाव भेज दिया गया।", fail: "अभी नहीं भेजा जा सका। कृपया बाद में कोशिश करें।" },
  },
};

export const aboutMeta = (lang: Locale) => buildMetadata({ lang, path: "/about", title: aboutCopy[lang].title, description: aboutCopy[lang].desc });

export function AboutPage({ lang }: { lang: Locale }) {
  const c = aboutCopy[lang];
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={graph({
          "@type": "AboutPage",
          name: c.title,
          url: absoluteUrl(localePath(lang, "/about")),
          inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
          mainEntity: { "@id": orgId },
          about: { "@id": personId },
          dateModified: CONTENT_UPDATED,
        })}
      />
      <PageHeader lang={lang} crumb={c.crumb} title={c.title} intro={c.intro} path="/about" />
      <div className="prose-ck mt-6">
        {c.sections.map((s) => (
          <section key={s.h} className="reveal">
            <h2>{s.h}</h2>
            {s.p.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </section>
        ))}
      </div>
      <section className="reveal glass mt-10 flex items-center gap-5 rounded-3xl p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan to-violet font-display text-2xl font-bold text-white" aria-hidden="true">
          YT
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{c.creator}</p>
          <p className="font-display text-xl font-bold text-white">{CREATOR}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{c.creatorText}</p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a href={CREATOR_LINKS.portfolio} target="_blank" rel="noopener me" className="text-cyan hover:underline">
              Portfolio
            </a>
            <a href={CREATOR_LINKS.linkedin} target="_blank" rel="noopener me" className="text-cyan hover:underline">
              LinkedIn
            </a>
            <a href={CREATOR_LINKS.github} target="_blank" rel="noopener me" className="text-cyan hover:underline">
              GitHub
            </a>
          </p>
        </div>
      </section>
      <section className="reveal mt-10">
        <h2 className="font-display text-2xl font-bold text-white">{lang === "hi" ? "निर्माता के और प्रोजेक्ट" : "More from the creator"}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {SISTER_SITES.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener" className="glass group flex h-full flex-col rounded-2xl p-5 transition hover:border-cyan/40">
                <span className="flex items-center gap-2 font-display text-lg font-bold text-white group-hover:text-cyan">
                  {s.name} <Icon name="external" className="h-4 w-4" />
                </span>
                <span className="mt-1 text-sm leading-relaxed text-slate-400">{s.desc[lang]}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section id="feedback" className="reveal glass mt-10 scroll-mt-24 rounded-3xl p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold text-white">{c.feedback}</h2>
        <p className="mb-6 mt-2 text-slate-400">{c.feedbackText}</p>
        <FeedbackForm labels={c.form} />
      </section>
      <ExploreMore lang={lang} page="about" />
    </div>
  );
}

/* =========================== PRIVACY & TERMS =========================== */

const legal = {
  privacy: {
    en: {
      crumb: "Privacy Policy",
      title: "Privacy Policy",
      desc: "How Cyber Kavach handles your data: we don't store scanned messages, use no tracking cookies and no ads.",
      sections: [
        ["Summary", "Cyber Kavach does not require an account, does not use advertising or tracking cookies, and does not save the messages, links or screenshots you scan in any database."],
        ["What happens when you scan", "Your content is sent over an encrypted connection to our server, checked by our pattern engine, and sent to Google's Gemini API for AI analysis. The result is returned to your browser. Cyber Kavach does not keep a copy. Google processes the content under its Gemini API terms; when the free tier of the API is used, Google may use submitted content to improve its services. For this reason, never paste OTPs, PINs, passwords or full card numbers."],
        ["Screenshots", "Images are resized on your device before upload and are handled the same way as text: analysed and not stored by Cyber Kavach."],
        ["Feedback form", "If you send feedback, your name, email and message are delivered to us through Formspree so we can reply. We use them only to respond and improve Cyber Kavach."],
        ["Hosting logs", "Our hosting provider (Vercel) may keep standard technical logs such as IP address and request time for security and abuse prevention. We use IP addresses briefly in memory only to rate-limit abuse."],
        ["Your choices", "You can use every feature without giving personal data. To ask about any feedback you sent, contact us through the feedback form."],
        ["Children", "Cyber Kavach is a general awareness tool and does not knowingly collect personal data from children. Parents can use it together with their children."],
        [
          "Grievance & privacy contact",
          `Under the Digital Personal Data Protection Act, 2023, you may ask what personal data we hold about you or request its correction or erasure. Grievance contact: ${CREATOR}${CONTACT_EMAIL ? ` (${CONTACT_EMAIL})` : ""}, via ${CONTACT_EMAIL ? "email or " : ""}the feedback form on the About page. We aim to respond within 7 days.`,
        ],
        ["Not a government website", "Cyber Kavach is an independent project. It is not operated by, affiliated with, or endorsed by any government body, bank or regulator, and does not use official emblems or logos."],
        ["Changes", `We may update this policy and will change the date below. Last updated: ${CONTENT_UPDATED}.`],
      ],
    },
    hi: {
      crumb: "गोपनीयता नीति",
      title: "गोपनीयता नीति",
      desc: "साइबर कवच आपका डेटा कैसे संभालता है: हम स्कैन किए गए मैसेज सेव नहीं करते, कोई ट्रैकिंग कुकी या विज्ञापन नहीं।",
      sections: [
        ["सारांश", "साइबर कवच के लिए कोई अकाउंट नहीं चाहिए, यह विज्ञापन या ट्रैकिंग कुकी का उपयोग नहीं करता, और आपके स्कैन किए गए मैसेज, लिंक या स्क्रीनशॉट किसी डेटाबेस में सेव नहीं करता।"],
        ["स्कैन करने पर क्या होता है", "आपकी सामग्री एन्क्रिप्टेड कनेक्शन से हमारे सर्वर पर जाती है, पैटर्न इंजन से जांची जाती है और AI विश्लेषण के लिए Google के Gemini API को भेजी जाती है। नतीजा आपके ब्राउज़र को लौटता है। साइबर कवच कोई प्रति नहीं रखता। Google अपनी Gemini API शर्तों के तहत सामग्री प्रोसेस करता है; API के मुफ़्त टियर में Google भेजी गई सामग्री का उपयोग अपनी सेवाएं सुधारने के लिए कर सकता है। इसलिए OTP, PIN, पासवर्ड या पूरा कार्ड नंबर कभी पेस्ट न करें।"],
        ["स्क्रीनशॉट", "तस्वीरें अपलोड से पहले आपके डिवाइस पर छोटी की जाती हैं और टेक्स्ट की तरह ही संभाली जाती हैं: विश्लेषण होता है, साइबर कवच सेव नहीं करता।"],
        ["सुझाव फ़ॉर्म", "सुझाव भेजने पर आपका नाम, ईमेल और मैसेज Formspree के ज़रिए हमें मिलता है ताकि हम जवाब दे सकें। इसका उपयोग सिर्फ़ जवाब देने और सुधार के लिए होता है।"],
        ["होस्टिंग लॉग", "हमारा होस्टिंग प्रदाता (Vercel) सुरक्षा के लिए IP पता और समय जैसे सामान्य तकनीकी लॉग रख सकता है। हम दुरुपयोग रोकने के लिए IP पते का उपयोग थोड़े समय के लिए केवल मेमोरी में करते हैं।"],
        ["आपके विकल्प", "आप व्यक्तिगत जानकारी दिए बिना हर सुविधा का उपयोग कर सकते हैं। भेजे गए सुझाव के बारे में जानने के लिए सुझाव फ़ॉर्म से संपर्क करें।"],
        ["बच्चे", "साइबर कवच एक सामान्य जागरूकता टूल है और जानबूझकर बच्चों का व्यक्तिगत डेटा एकत्र नहीं करता। माता-पिता बच्चों के साथ इसका उपयोग कर सकते हैं।"],
        [
          "शिकायत और गोपनीयता संपर्क",
          `डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 के तहत आप पूछ सकते हैं कि हमारे पास आपका कौन-सा व्यक्तिगत डेटा है, या उसे सुधारने/मिटाने का अनुरोध कर सकते हैं। शिकायत संपर्क: ${CREATOR}${CONTACT_EMAIL ? ` (${CONTACT_EMAIL})` : ""}, ${CONTACT_EMAIL ? "ईमेल या " : ""}About पेज के सुझाव फ़ॉर्म से। हम 7 दिनों में जवाब देने का प्रयास करते हैं।`,
        ],
        ["सरकारी वेबसाइट नहीं", "साइबर कवच एक स्वतंत्र प्रोजेक्ट है। इसे कोई सरकारी संस्था, बैंक या नियामक नहीं चलाता, न ही इसका समर्थन करता है, और यह किसी आधिकारिक प्रतीक या लोगो का उपयोग नहीं करता।"],
        ["बदलाव", `हम यह नीति अपडेट कर सकते हैं और नीचे की तारीख बदल देंगे। अंतिम अपडेट: ${CONTENT_UPDATED}।`],
      ],
    },
  },
  terms: {
    en: {
      crumb: "Terms of Use",
      title: "Terms of Use",
      desc: "Terms for using Cyber Kavach, a free scam-awareness tool. Results are guidance, not legal or financial advice.",
      sections: [
        ["Free public-awareness tool", "Cyber Kavach is provided free of charge for awareness and guidance. It is not a government service and is not affiliated with I4C, the Ministry of Home Affairs, RBI, any bank or telecom operator."],
        ["No guarantee", "Risk scores and explanations are generated automatically and may be wrong. A 'safe' result does not guarantee that a message or link is legitimate. Always verify through official channels."],
        ["Not professional advice", "Content on this site is general information, not legal, financial or technical advice. For crimes, report on cybercrime.gov.in or call 1930 / 112."],
        ["Not a complaint authority", "Cyber Kavach does not register, accept or forward complaints and never charges any fee. To report a crime use cybercrime.gov.in, 1930 or the official portals we link to. Anyone asking for money to 'recover' your funds in our name is a fraudster."],
        ["Names, brands and logos", "Bank, company and government names are mentioned only to explain scams and official services. Cyber Kavach does not use the State Emblem of India or any official logo, and all trademarks belong to their owners."],
        ["Fair use", "Do not use the scanner to process other people's private data without consent, to overload the service, or to build automated tools on top of it."],
        ["Liability", "To the extent permitted by law, Cyber Kavach and its creator are not liable for losses arising from reliance on the results or content."],
        ["Updates", `These terms may change. Last updated: ${CONTENT_UPDATED}.`],
      ],
    },
    hi: {
      crumb: "उपयोग की शर्तें",
      title: "उपयोग की शर्तें",
      desc: "मुफ़्त स्कैम-जागरूकता टूल साइबर कवच के उपयोग की शर्तें। नतीजे मार्गदर्शन हैं, कानूनी या वित्तीय सलाह नहीं।",
      sections: [
        ["मुफ़्त जन-जागरूकता टूल", "साइबर कवच जागरूकता और मार्गदर्शन के लिए मुफ़्त है। यह सरकारी सेवा नहीं है और I4C, गृह मंत्रालय, RBI, किसी बैंक या टेलीकॉम कंपनी से संबद्ध नहीं है।"],
        ["कोई गारंटी नहीं", "जोखिम स्कोर और विवरण स्वचालित रूप से बनते हैं और गलत हो सकते हैं। 'सुरक्षित' नतीजा इस बात की गारंटी नहीं कि मैसेज या लिंक असली है। हमेशा आधिकारिक माध्यम से पुष्टि करें।"],
        ["पेशेवर सलाह नहीं", "इस साइट की सामग्री सामान्य जानकारी है, कानूनी, वित्तीय या तकनीकी सलाह नहीं। अपराध की शिकायत cybercrime.gov.in या 1930 / 112 पर करें।"],
        ["शिकायत प्राधिकरण नहीं", "साइबर कवच शिकायत दर्ज, स्वीकार या आगे नहीं भेजता और कभी कोई शुल्क नहीं लेता। अपराध की शिकायत cybercrime.gov.in, 1930 या हमारे दिए आधिकारिक पोर्टल पर करें। हमारे नाम पर पैसा 'वापस दिलाने' के लिए भुगतान मांगने वाला ठग है।"],
        ["नाम, ब्रांड और लोगो", "बैंक, कंपनी और सरकारी नाम सिर्फ़ स्कैम और आधिकारिक सेवाएं समझाने के लिए दिए गए हैं। साइबर कवच भारत के राजकीय प्रतीक या किसी आधिकारिक लोगो का उपयोग नहीं करता; सभी ट्रेडमार्क उनके मालिकों के हैं।"],
        ["उचित उपयोग", "बिना अनुमति दूसरों का निजी डेटा प्रोसेस करने, सेवा पर अधिक भार डालने या इस पर स्वचालित टूल बनाने के लिए स्कैनर का उपयोग न करें।"],
        ["दायित्व", "कानून की अनुमति की सीमा तक, नतीजों या सामग्री पर भरोसे से हुए नुकसान के लिए साइबर कवच और इसके निर्माता उत्तरदायी नहीं हैं।"],
        ["अपडेट", `ये शर्तें बदल सकती हैं। अंतिम अपडेट: ${CONTENT_UPDATED}।`],
      ],
    },
  },
};

export const legalMeta = (kind: "privacy" | "terms", lang: Locale) =>
  buildMetadata({ lang, path: `/${kind}`, title: legal[kind][lang].title, description: legal[kind][lang].desc });

export function LegalPage({ lang, kind }: { lang: Locale; kind: "privacy" | "terms" }) {
  const c = legal[kind][lang];
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader lang={lang} crumb={c.crumb} title={c.title} path={`/${kind}`} />
      <div className="prose-ck mt-4">
        {c.sections.map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
        <p>
          <Link prefetch={false} href={localePath(lang, "/")}>← {SITE_NAME}</Link>
        </p>
      </div>
      <ExploreMore lang={lang} page={kind} />
    </div>
  );
}
