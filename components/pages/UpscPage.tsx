import Link from "next/link";
import { ExploreMore } from "../ExploreMore";
import { Breadcrumbs } from "../Breadcrumbs";
import { JsonLd } from "../JsonLd";
import { Icon } from "../Icon";
import { CyberNews } from "../CyberNews";
import { getDictionary } from "@/lib/i18n";
import { CONTENT_UPDATED, scams } from "@/lib/content/scams";
import { absoluteUrl, localePath, throvicMapUrl, type Locale } from "@/lib/site";
import { breadcrumbLd, buildMetadata, faqLd, graph, orgId } from "@/lib/seo";

type Row = { term: string; detail: string; map: string };

const copy = {
  en: {
    crumb: "Cyber Security for UPSC",
    title: "Cyber Security for UPSC (GS-III): Laws, Agencies & Notes",
    desc: "Cyber security notes for UPSC GS Paper III: IT Act 2000, CERT-In, NCIIPC, I4C, 1930 helpline, DPDP Act 2023, Sanchar Saathi, digital arrest scams — with mind maps and daily current affairs.",
    intro:
      "A quick revision hub for UPSC, State PSC and other exam aspirants: the laws, institutions and citizen-facing systems behind India's cyber security — linked to interactive mind maps on Throvic and daily current affairs on Gathered.",
    syllabusTitle: "Where it appears in the syllabus",
    syllabus:
      "UPSC Mains GS Paper III (Internal Security) includes 'challenges to internal security through communication networks, role of media and social networking sites in internal security challenges, basics of cyber security; money-laundering and its prevention'. Cyber fraud, data protection and digital public infrastructure also appear in Prelims current affairs.",
    lawsTitle: "Key laws & policies",
    laws: [
      { term: "Information Technology Act, 2000 (amended 2008)", detail: "Core cyber law. Sec 43/66 (hacking, data theft), 66C (identity theft), 66D (cheating by personation using a computer), 67 (obscene content), 69A (blocking), 70A (NCIIPC), 70B (CERT-In), 79 (intermediary safe harbour).", map: "Information Technology Act, 2000" },
      { term: "Digital Personal Data Protection Act, 2023", detail: "India's data-protection law; DPDP Rules notified in November 2025 with phased compliance. Creates the Data Protection Board of India.", map: "Digital Personal Data Protection Act, 2023" },
      { term: "Bharatiya Nyaya Sanhita, 2023", detail: "Replaced the IPC from 1 July 2024; its organised-crime provision expressly covers cyber-crimes.", map: "Bharatiya Nyaya Sanhita" },
      { term: "Telecommunications Act, 2023", detail: "Replaced the Indian Telegraph Act framework; underpins measures against SIM fraud and spoofed calls.", map: "Telecommunications Act, 2023" },
      { term: "National Cyber Security Policy, 2013", detail: "First national policy framework for protecting cyberspace and building cyber-security capacity.", map: "National Cyber Security Policy 2013" },
    ] as Row[],
    agenciesTitle: "Institutions & citizen systems",
    agencies: [
      { term: "CERT-In (MeitY)", detail: "National nodal agency for cyber-incident response under Sec 70B of the IT Act; issues advisories and the 2022 incident-reporting directions.", map: "CERT-In" },
      { term: "NCIIPC (under NTRO)", detail: "Protects Critical Information Infrastructure (power, banking, telecom etc.) under Sec 70A.", map: "National Critical Information Infrastructure Protection Centre" },
      { term: "I4C (MHA)", detail: "Indian Cyber Crime Coordination Centre — runs cybercrime.gov.in, the 1930 financial-fraud helpline (CFCFRMS), the Suspect Registry, Samanvaya and Cyber Commando training.", map: "Indian Cyber Crime Coordination Centre" },
      { term: "Sanchar Saathi & Chakshu (DoT)", detail: "Citizen portal/app to report fraud communication, check SIMs in one's name and block lost phones; feeds the Financial Fraud Risk Indicator.", map: "Sanchar Saathi" },
      { term: "RBI measures", detail: "Exclusive .bank.in domain for banks, MuleHunter.AI to detect mule accounts, and the Integrated Ombudsman for unresolved complaints.", map: "Reserve Bank of India cyber security" },
    ] as Row[],
    issuesTitle: "Current issues to revise",
    issues: [
      "Digital arrest and investment scams run from scam compounds abroad",
      "Mule accounts and SIM-box / spoofed international calls",
      "Deepfakes and AI voice cloning — misinformation and fraud",
      "Data protection vs. surveillance — DPDP Act debates",
      "Global cooperation — the Budapest Convention (India not a signatory) and the UN convention against cybercrime",
    ],
    practiceTitle: "Practice questions (Mains style)",
    practice: [
      "Discuss how organised cyber-fraud networks pose a challenge to India's internal security. Evaluate the institutional response.",
      "'Citizen awareness is the first line of cyber defence.' Examine in the context of digital-payment frauds in India.",
      "Critically analyse the role of the Digital Personal Data Protection Act, 2023 in strengthening India's cyber-security ecosystem.",
    ],
    mapsTitle: "Explore as mind maps on Throvic",
    newsTitle: "Daily current affairs on Gathered",
    newsCta: "UPSC current affairs on Gathered",
    scamsTitle: "Case studies: scams explained",
    faq: [
      { q: "Is cyber security part of the UPSC syllabus?", a: "Yes. GS Paper III (Internal Security) explicitly includes 'basics of cyber security' and 'challenges to internal security through communication networks'. Cyber fraud and data protection also appear in Prelims current affairs." },
      { q: "Which agency is India's nodal agency for cyber incidents?", a: "CERT-In (Indian Computer Emergency Response Team) under MeitY is the national nodal agency for cyber-incident response under Section 70B of the IT Act, 2000." },
      { q: "What is I4C?", a: "The Indian Cyber Crime Coordination Centre under the Ministry of Home Affairs coordinates action against cyber crime. It runs the National Cyber Crime Reporting Portal (cybercrime.gov.in) and the 1930 financial-fraud helpline." },
    ],
  },
  hi: {
    crumb: "UPSC के लिए साइबर सुरक्षा",
    title: "UPSC के लिए साइबर सुरक्षा (GS-III): कानून, संस्थाएं और करेंट अफ़ेयर्स",
    desc: "UPSC GS पेपर III के लिए साइबर सुरक्षा नोट्स: IT एक्ट 2000, CERT-In, NCIIPC, I4C, 1930 हेल्पलाइन, DPDP एक्ट 2023, संचार साथी, डिजिटल अरेस्ट — माइंड मैप और रोज़ के करेंट अफ़ेयर्स के साथ।",
    intro:
      "UPSC, राज्य PSC और अन्य परीक्षार्थियों के लिए त्वरित रिवीज़न: भारत की साइबर सुरक्षा के कानून, संस्थाएं और नागरिक प्रणालियां — Throvic के इंटरैक्टिव माइंड मैप और Gathered के रोज़ के करेंट अफ़ेयर्स से जुड़ी।",
    syllabusTitle: "सिलेबस में कहां आता है",
    syllabus:
      "UPSC मेन्स GS पेपर III (आंतरिक सुरक्षा) में 'संचार नेटवर्क के माध्यम से आंतरिक सुरक्षा को चुनौतियां, आंतरिक सुरक्षा चुनौतियों में मीडिया और सोशल नेटवर्किंग साइटों की भूमिका, साइबर सुरक्षा की बुनियादी बातें; मनी-लॉन्ड्रिंग और उसकी रोकथाम' शामिल है। साइबर ठगी, डेटा संरक्षण और डिजिटल पब्लिक इंफ्रास्ट्रक्चर प्रीलिम्स करेंट अफ़ेयर्स में भी आते हैं।",
    lawsTitle: "प्रमुख कानून और नीतियां",
    laws: [
      { term: "सूचना प्रौद्योगिकी अधिनियम, 2000 (संशोधन 2008)", detail: "मुख्य साइबर कानून। धारा 43/66 (हैकिंग, डेटा चोरी), 66C (पहचान की चोरी), 66D (कंप्यूटर से प्रतिरूपण द्वारा धोखा), 67 (अश्लील सामग्री), 69A (ब्लॉकिंग), 70A (NCIIPC), 70B (CERT-In), 79 (इंटरमीडियरी सुरक्षा)।", map: "Information Technology Act, 2000" },
      { term: "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023", detail: "भारत का डेटा संरक्षण कानून; DPDP नियम नवंबर 2025 में अधिसूचित, चरणबद्ध अनुपालन। भारतीय डेटा संरक्षण बोर्ड का गठन।", map: "Digital Personal Data Protection Act, 2023" },
      { term: "भारतीय न्याय संहिता, 2023", detail: "1 जुलाई 2024 से IPC की जगह; संगठित अपराध के प्रावधान में साइबर अपराध स्पष्ट रूप से शामिल।", map: "Bharatiya Nyaya Sanhita" },
      { term: "दूरसंचार अधिनियम, 2023", detail: "भारतीय टेलीग्राफ़ अधिनियम ढांचे की जगह; SIM फ्रॉड और नकली कॉल के ख़िलाफ़ उपायों का आधार।", map: "Telecommunications Act, 2023" },
      { term: "राष्ट्रीय साइबर सुरक्षा नीति, 2013", detail: "साइबरस्पेस की सुरक्षा और क्षमता निर्माण के लिए पहला राष्ट्रीय नीति ढांचा।", map: "National Cyber Security Policy 2013" },
    ] as Row[],
    agenciesTitle: "संस्थाएं और नागरिक प्रणालियां",
    agencies: [
      { term: "CERT-In (MeitY)", detail: "IT एक्ट की धारा 70B के तहत साइबर घटनाओं के लिए राष्ट्रीय नोडल एजेंसी; सलाह और 2022 के घटना-रिपोर्टिंग निर्देश जारी करती है।", map: "CERT-In" },
      { term: "NCIIPC (NTRO के अधीन)", detail: "धारा 70A के तहत महत्वपूर्ण सूचना अवसंरचना (बिजली, बैंकिंग, दूरसंचार आदि) की सुरक्षा।", map: "National Critical Information Infrastructure Protection Centre" },
      { term: "I4C (गृह मंत्रालय)", detail: "भारतीय साइबर अपराध समन्वय केंद्र — cybercrime.gov.in, 1930 वित्तीय ठगी हेल्पलाइन (CFCFRMS), संदिग्ध रजिस्ट्री, समन्वय और साइबर कमांडो प्रशिक्षण चलाता है।", map: "Indian Cyber Crime Coordination Centre" },
      { term: "संचार साथी और चक्षु (DoT)", detail: "फ्रॉड संचार की शिकायत, अपने नाम के SIM जांचने और खोया फ़ोन ब्लॉक करने का नागरिक पोर्टल/ऐप; फ़ाइनेंशियल फ्रॉड रिस्क इंडिकेटर को डेटा देता है।", map: "Sanchar Saathi" },
      { term: "RBI के उपाय", detail: "बैंकों के लिए विशेष .bank.in डोमेन, म्यूल खाते पकड़ने के लिए MuleHunter.AI और अनसुलझी शिकायतों के लिए एकीकृत लोकपाल।", map: "Reserve Bank of India cyber security" },
    ] as Row[],
    issuesTitle: "रिवीज़न के लिए वर्तमान मुद्दे",
    issues: [
      "विदेश के स्कैम कंपाउंड से चलने वाले डिजिटल अरेस्ट और निवेश स्कैम",
      "म्यूल खाते और SIM-बॉक्स / नकली अंतरराष्ट्रीय कॉल",
      "डीपफ़ेक और AI वॉयस क्लोनिंग — भ्रामक जानकारी और ठगी",
      "डेटा संरक्षण बनाम निगरानी — DPDP एक्ट पर बहस",
      "वैश्विक सहयोग — बुडापेस्ट कन्वेंशन (भारत हस्ताक्षरकर्ता नहीं) और साइबर अपराध पर संयुक्त राष्ट्र कन्वेंशन",
    ],
    practiceTitle: "अभ्यास प्रश्न (मेन्स शैली)",
    practice: [
      "चर्चा कीजिए कि संगठित साइबर-ठगी नेटवर्क भारत की आंतरिक सुरक्षा के लिए कैसे चुनौती हैं। संस्थागत प्रतिक्रिया का मूल्यांकन कीजिए।",
      "'नागरिक जागरूकता साइबर रक्षा की पहली पंक्ति है।' भारत में डिजिटल भुगतान धोखाधड़ी के संदर्भ में परीक्षण कीजिए।",
      "भारत के साइबर सुरक्षा तंत्र को मज़बूत करने में डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 की भूमिका का आलोचनात्मक विश्लेषण कीजिए।",
    ],
    mapsTitle: "Throvic पर माइंड मैप देखें",
    newsTitle: "Gathered पर रोज़ के करेंट अफ़ेयर्स",
    newsCta: "Gathered पर UPSC करेंट अफ़ेयर्स",
    scamsTitle: "केस स्टडी: स्कैम की व्याख्या",
    faq: [
      { q: "क्या साइबर सुरक्षा UPSC सिलेबस में है?", a: "हां। GS पेपर III (आंतरिक सुरक्षा) में 'साइबर सुरक्षा की बुनियादी बातें' और 'संचार नेटवर्क के माध्यम से आंतरिक सुरक्षा को चुनौतियां' स्पष्ट रूप से शामिल हैं। साइबर ठगी और डेटा संरक्षण प्रीलिम्स करेंट अफ़ेयर्स में भी आते हैं।" },
      { q: "भारत में साइबर घटनाओं की नोडल एजेंसी कौन-सी है?", a: "MeitY के तहत CERT-In (भारतीय कंप्यूटर आपातकालीन प्रतिक्रिया दल) IT एक्ट 2000 की धारा 70B के तहत साइबर घटनाओं की राष्ट्रीय नोडल एजेंसी है।" },
      { q: "I4C क्या है?", a: "गृह मंत्रालय के तहत भारतीय साइबर अपराध समन्वय केंद्र साइबर अपराध के ख़िलाफ़ कार्रवाई का समन्वय करता है। यह राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (cybercrime.gov.in) और 1930 हेल्पलाइन चलाता है।" },
    ],
  },
};

export const upscMeta = (lang: Locale) => buildMetadata({ lang, path: "/cyber-security-upsc", title: copy[lang].title, description: copy[lang].desc, type: "article" });

function TermList({ rows, lang }: { rows: Row[]; lang: Locale }) {
  return (
    <ul className="mt-5 space-y-3">
      {rows.map((r) => (
        <li key={r.term} className="glass rounded-2xl p-4 sm:p-5">
          <h3 className="font-semibold text-white">{r.term}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{r.detail}</p>
          <a href={throvicMapUrl(r.map)} target="_blank" rel="noopener" className="mt-2 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-violet-300 hover:underline">
            <Icon name="brain" className="h-4 w-4" /> {lang === "hi" ? "माइंड मैप" : "Mind map"}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function UpscPage({ lang }: { lang: Locale }) {
  const c = copy[lang];
  const t = getDictionary(lang);
  const url = absoluteUrl(localePath(lang, "/cyber-security-upsc"));
  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={graph(
          {
            "@type": "LearningResource",
            "@id": `${url}#notes`,
            name: c.title,
            description: c.desc,
            url,
            inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
            educationalLevel: "Competitive examination",
            learningResourceType: "Revision notes",
            teaches: ["Cyber security in India", "IT Act 2000", "CERT-In", "I4C", "DPDP Act 2023"],
            isAccessibleForFree: true,
            dateModified: CONTENT_UPDATED,
            publisher: { "@id": orgId },
          },
          faqLd(c.faq),
          breadcrumbLd([
            { name: t.common.home, path: localePath(lang, "/") },
            { name: c.crumb, path: localePath(lang, "/cyber-security-upsc") },
          ]),
        )}
      />
      <Breadcrumbs items={[{ name: t.common.home, href: localePath(lang, "/") }, { name: c.crumb }]} />
      <header className="fade-up mt-5 max-w-3xl">
        <h1 className="font-display text-[28px] font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{c.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg">{c.intro}</p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <section className="rounded-3xl border border-cyan/30 bg-cyan/[0.06] p-5 sm:p-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">{c.syllabusTitle}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-100">{c.syllabus}</p>
          </section>

          <section className="reveal mt-10">
            <h2 className="font-display text-2xl font-bold text-white">{c.lawsTitle}</h2>
            <TermList rows={c.laws} lang={lang} />
          </section>

          <section className="reveal mt-10">
            <h2 className="font-display text-2xl font-bold text-white">{c.agenciesTitle}</h2>
            <TermList rows={c.agencies} lang={lang} />
          </section>

          <section className="reveal mt-10">
            <h2 className="font-display text-2xl font-bold text-white">{c.issuesTitle}</h2>
            <ul className="mt-5 space-y-2">
              {c.issues.map((x) => (
                <li key={x} className="flex gap-3 text-slate-200">
                  <Icon name="arrow-right" className="mt-1 h-4 w-4 shrink-0 text-cyan" />
                  {x}
                </li>
              ))}
            </ul>
          </section>

          <section className="reveal mt-10">
            <h2 className="font-display text-2xl font-bold text-white">{c.practiceTitle}</h2>
            <ol className="mt-5 space-y-3">
              {c.practice.map((q, i) => (
                <li key={q} className="glass flex gap-4 rounded-2xl p-4">
                  <span className="font-mono text-sm text-violet-300">Q{i + 1}</span>
                  <span className="text-sm leading-relaxed text-slate-200">{q}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="reveal mt-10">
            <h2 className="font-display text-2xl font-bold text-white">{c.scamsTitle}</h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {scams.map((s) => (
                <li key={s.slug}>
                  <Link prefetch={false} href={localePath(lang, `/scams/${s.slug}`)} className="flex min-h-[48px] items-center gap-3 rounded-xl border border-line px-3 text-sm text-slate-200 transition hover:border-cyan/40 hover:text-white">
                    <span aria-hidden="true">{s.icon}</span>
                    {s.content[lang].name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mx-auto mt-12">
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
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <CyberNews lang={lang} limit={5} />
          <a
            href="https://gathered.pages.dev/upsc-current-affairs"
            target="_blank"
            rel="noopener"
            className="glass flex items-center justify-between gap-3 rounded-2xl p-4 font-semibold text-cyan transition hover:border-cyan/40"
          >
            <span className="flex items-center gap-2">
              <Icon name="book" className="h-5 w-5" /> {c.newsCta}
            </span>
            <Icon name="external" className="h-4 w-4" />
          </a>
          <a
            href={throvicMapUrl("Cyber security in India")}
            target="_blank"
            rel="noopener"
            className="glass flex items-center justify-between gap-3 rounded-2xl p-4 font-semibold text-violet-300 transition hover:border-violet/40"
          >
            <span className="flex items-center gap-2">
              <Icon name="brain" className="h-5 w-5" /> {c.mapsTitle}
            </span>
            <Icon name="external" className="h-4 w-4" />
          </a>
        </aside>
      </div>
      <ExploreMore lang={lang} page="upsc" />
    </article>
  );
}
