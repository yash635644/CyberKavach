import Link from "next/link";
import { ExploreMore } from "../ExploreMore";
import { SCAM_TOOL } from "@/lib/nav";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../Breadcrumbs";
import { JsonLd } from "../JsonLd";
import { Icon } from "../Icon";
import { CyberNews } from "../CyberNews";
import { getDictionary } from "@/lib/i18n";
import { CONTENT_UPDATED, getScam, scams } from "@/lib/content/scams";
import { getResource } from "@/lib/content/resources";
import { CREATOR, CREATOR_LINKS, SITE_NAME, absoluteUrl, localePath, throvicMapUrl, type Locale } from "@/lib/site";
import { breadcrumbLd, faqLd, graph, orgId, personId } from "@/lib/seo";

const L = {
  en: {
    library: "Scam Library",
    libraryTitle: "Online Scams in India: The Complete Guide",
    libraryIntro:
      "Plain-language explainers for the frauds hitting Indian phones every day — how each scam works, the red flags to watch for, and exactly what to do and where to report. Reviewed regularly.",
    quick: "Quick answer",
    how: "How the scam works",
    flags: "Red flags to watch for",
    example: "Real-style example message",
    exampleNote: "Example for awareness. Names, numbers and links are illustrative.",
    scanSimilar: "Scan a similar message",
    todo: "What to do",
    faq: "Questions people ask",
    reportTo: "Where to report",
    emergency: "Lost money? Act now",
    emergencyText: "Call 1930 within the first hour and inform your bank.",
    more: "Other scams to know",
    updated: "Last reviewed",
  },
  hi: {
    library: "स्कैम लाइब्रेरी",
    libraryTitle: "भारत में ऑनलाइन स्कैम: पूरी गाइड",
    libraryIntro:
      "भारतीय फ़ोन पर रोज़ होने वाली धोखाधड़ी की आसान भाषा में जानकारी — हर स्कैम कैसे काम करता है, किन संकेतों पर ध्यान दें, और क्या करें व कहां शिकायत करें। नियमित रूप से समीक्षा की जाती है।",
    quick: "संक्षिप्त उत्तर",
    how: "स्कैम कैसे होता है",
    flags: "ख़तरे के संकेत",
    example: "उदाहरण मैसेज",
    exampleNote: "जागरूकता के लिए उदाहरण। नाम, नंबर और लिंक काल्पनिक हैं।",
    scanSimilar: "ऐसा मैसेज जांचें",
    todo: "क्या करें",
    faq: "लोग अक्सर पूछते हैं",
    reportTo: "शिकायत कहां करें",
    emergency: "पैसे गए? तुरंत कदम उठाएं",
    emergencyText: "पहले घंटे में 1930 पर कॉल करें और बैंक को सूचित करें।",
    more: "अन्य स्कैम जानें",
    updated: "अंतिम समीक्षा",
  },
};

const fmtDate = (lang: Locale) =>
  new Date(CONTENT_UPDATED).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { year: "numeric", month: "long", day: "numeric" });

export function ScamsIndexPage({ lang }: { lang: Locale }) {
  const l = L[lang];
  const t = getDictionary(lang);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: t.common.home, path: localePath(lang, "/") },
            { name: l.library, path: localePath(lang, "/scams") },
          ]),
          {
            "@type": "CollectionPage",
            name: l.libraryTitle,
            url: absoluteUrl(localePath(lang, "/scams")),
            inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: scams.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.content[lang].title, url: absoluteUrl(localePath(lang, `/scams/${s.slug}`)) })),
            },
          },
        )}
      />
      <Breadcrumbs items={[{ name: t.common.home, href: localePath(lang, "/") }, { name: l.library }]} />
      <header className="fade-up mt-6 max-w-3xl">
        <h1 className="font-display text-[28px] font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{l.libraryTitle}</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-300 sm:mt-4 sm:text-lg">{l.libraryIntro}</p>
        <p className="mt-3 text-sm text-slate-400">
          {l.updated}: <time dateTime={CONTENT_UPDATED}>{fmtDate(lang)}</time>
        </p>
      </header>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {scams.map((s) => (
          <li key={s.slug} className="reveal">
            <Link prefetch={false}
              href={localePath(lang, `/scams/${s.slug}`)}
              className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition duration-500 group-hover:opacity-50" style={{ background: s.accent }} aria-hidden="true" />
              <span className="text-3xl" aria-hidden="true">
                {s.icon}
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold text-white">{s.content[lang].name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{s.content[lang].short}</p>
              <span className="mt-4 text-sm font-semibold text-cyan transition group-hover:translate-x-1">{t.common.readMore} →</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12 max-w-3xl">
        <CyberNews lang={lang} />
      </div>
      <ExploreMore lang={lang} page="scams" />
    </div>
  );
}

export function ScamPage({ lang, slug }: { lang: Locale; slug: string }) {
  const scam = getScam(slug);
  if (!scam) notFound();
  const c = scam.content[lang];
  const l = L[lang];
  const t = getDictionary(lang);
  const url = absoluteUrl(localePath(lang, `/scams/${slug}`));
  // Rotate: show the next 5 guides after this one, so every guide gets equal internal links
  const idx = scams.findIndex((s) => s.slug === slug);
  const others = Array.from({ length: 5 }, (_, i) => scams[(idx + 1 + i) % scams.length]);

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={graph(
          {
            "@type": "Article",
            "@id": `${url}#article`,
            headline: c.title,
            description: c.answer,
            inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
            datePublished: "2026-01-15",
            dateModified: CONTENT_UPDATED,
            mainEntityOfPage: url,
            image: { "@type": "ImageObject", url: absoluteUrl(`/og/${lang}/${slug}`), width: 1200, height: 630 },
            author: { "@type": "Person", "@id": personId, name: CREATOR, url: CREATOR_LINKS.portfolio },
            publisher: { "@id": orgId },
            about: { "@type": "Thing", name: c.name },
          },
          faqLd(c.faq),
          breadcrumbLd([
            { name: t.common.home, path: localePath(lang, "/") },
            { name: l.library, path: localePath(lang, "/scams") },
            { name: c.name, path: localePath(lang, `/scams/${slug}`) },
          ]),
        )}
      />

      <Breadcrumbs
        items={[
          { name: t.common.home, href: localePath(lang, "/") },
          { name: l.library, href: localePath(lang, "/scams") },
          { name: c.name },
        ]}
      />

      <header className="fade-up relative mt-6 max-w-4xl">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl" style={{ background: scam.accent }} aria-hidden="true" />
        <span className="relative text-5xl" aria-hidden="true">
          {scam.icon}
        </span>
        <h1 className="relative mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{c.title}</h1>
        <p className="relative mt-3 text-sm text-slate-400">
          {l.updated}: <time dateTime={CONTENT_UPDATED}>{fmtDate(lang)}</time> · {SITE_NAME}
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          {/* Answer-first block: the passage search engines and AI assistants quote */}
          <section aria-labelledby="quick" className="fade-up rounded-3xl border border-cyan/30 bg-cyan/[0.06] p-6">
            <h2 id="quick" className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">
              {l.quick}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-100">{c.answer}</p>
          </section>

          <section className="reveal mt-12">
            <h2 className="font-display text-2xl font-bold text-white">{l.how}</h2>
            <ol className="relative mt-6 space-y-6 border-l border-line pl-6">
              {c.howItWorks.map((step, i) => (
                <li key={i} className="relative">
                  <span
                    className="absolute -left-[37px] flex h-6 w-6 items-center justify-center rounded-full border border-line bg-ink font-mono text-xs text-cyan"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="leading-relaxed text-slate-300">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="reveal mt-12">
            <h2 className="font-display text-2xl font-bold text-white">{l.flags}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {c.redFlags.map((f) => (
                <li key={f} className="flex gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/[0.05] p-4 text-sm leading-relaxed text-slate-200">
                  <span className="text-rose-400" aria-hidden="true">
                    ⚑
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section className="reveal mt-12">
            <h2 className="font-display text-2xl font-bold text-white">{l.example}</h2>
            <figure className="mt-5 max-w-xl">
              <div className="rounded-3xl rounded-tl-md border border-line bg-[#0b2a24] p-5 text-[15px] leading-relaxed text-emerald-50 shadow-xl">
                <blockquote>{c.example}</blockquote>
              </div>
              <figcaption className="mt-2 text-xs text-slate-400">{l.exampleNote}</figcaption>
            </figure>
            <Link prefetch={false}
              href={localePath(lang, SCAM_TOOL[slug] ? `/${SCAM_TOOL[slug]}` : "/#scanner")}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              🛡️ {l.scanSimilar}
            </Link>
          </section>

          <section className="reveal mt-12">
            <h2 className="font-display text-2xl font-bold text-white">{l.todo}</h2>
            <ol className="mt-5 space-y-3">
              {c.whatToDo.map((s, i) => (
                <li key={s} className="flex gap-4 rounded-2xl border border-line bg-white/[0.02] p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-safe/15 font-mono text-sm text-green-300">{i + 1}</span>
                  <span className="leading-relaxed text-slate-200">{s}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="reveal mt-12">
            <h2 className="font-display text-2xl font-bold text-white">{l.faq}</h2>
            <div className="mt-5 space-y-3">
              {c.faq.map((f) => (
                <details key={f.q} className="glass rounded-2xl px-5 py-4" open>
                  <summary className="flex items-center justify-between gap-4 font-semibold text-white">
                    <h3 className="text-base">{f.q}</h3>
                    <svg viewBox="0 0 24 24" className="chev h-5 w-5 shrink-0 text-slate-400 transition" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5 md:grid md:grid-cols-2 md:gap-5 md:space-y-0 lg:sticky lg:top-24 lg:block lg:space-y-5 lg:self-start">
          <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-600/25 to-transparent p-6">
            <h2 className="font-display text-lg font-bold text-white">{l.emergency}</h2>
            <p className="mt-2 text-sm text-rose-100/80">{l.emergencyText}</p>
            <a href="tel:1930" className="btn-shine mt-4 flex items-center justify-center rounded-2xl bg-rose-500 py-3 font-display text-xl font-bold text-white">
              📞 1930
            </a>
            <Link prefetch={false} href={localePath(lang, "/help")} className="mt-3 block text-center text-sm font-semibold text-rose-200 hover:underline">
              {t.home.goldenCta} →
            </Link>
          </div>

          <div className="glass rounded-3xl p-6">
            <h2 className="font-display text-lg font-bold text-white">{l.reportTo}</h2>
            <ul className="mt-4 space-y-3">
              {scam.reportTo.map((id) => {
                const r = getResource(id);
                if (!r) return null;
                return (
                  <li key={id}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="group block rounded-xl border border-line p-3 transition hover:border-cyan/40">
                      <span className="block text-sm font-semibold text-white group-hover:text-cyan">{r.name[lang]} ↗</span>
                      <span className="mt-1 block text-xs leading-relaxed text-slate-400">{r.desc[lang]}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <a
            href={throvicMapUrl(scam.content.en.name)}
            target="_blank"
            rel="noopener"
            className="glass group flex items-center gap-4 rounded-3xl p-5 transition hover:border-violet/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet/15 text-violet-200 ring-1 ring-violet/30">
              <Icon name="brain" className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-white group-hover:text-violet-200">{lang === "hi" ? "माइंड मैप में देखें" : "Explore as a mind map"}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">
                {lang === "hi" ? "Throvic पर जुड़े विषय, कानून और घटनाएं" : "Related laws, agencies & events on Throvic"}
              </span>
            </span>
            <Icon name="external" className="ml-auto h-4 w-4 shrink-0 text-slate-400" />
          </a>

          <div className="glass rounded-3xl p-6">
            <h2 className="font-display text-lg font-bold text-white">{l.more}</h2>
            <ul className="mt-4 space-y-2">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link prefetch={false} href={localePath(lang, `/scams/${s.slug}`)} className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
                    <span aria-hidden="true">{s.icon}</span>
                    {s.content[lang].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      <ExploreMore lang={lang} page="scam" scam={slug} />
    </article>
  );
}
