import Link from "next/link";
import { Scanner } from "../Scanner";
import { JsonLd } from "../JsonLd";
import { Icon } from "../Icon";
import { UpdatesGrid } from "../UpdatesGrid";
import { getDictionary } from "@/lib/i18n";
import { scams, getScam } from "@/lib/content/scams";
import { homeFaq } from "@/lib/content/faq";
import { serviceCategories, resources } from "@/lib/content/resources";
import { tools } from "@/lib/content/tools";
import { helplines, localePath, type Locale } from "@/lib/site";
import { faqLd, graph, webAppLd } from "@/lib/seo";
import type { ScamInfo } from "@/lib/advice";

const SAFE_EXAMPLE = "482913 is your OTP for login to HDFC Bank NetBanking. Valid for 5 mins. Do not share it with anyone. -HDFC Bank";

export function HomePage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const s = t.sections;
  const hi = lang === "hi";
  const scamMeta: Record<string, ScamInfo> = Object.fromEntries(
    scams.map((x) => [x.slug, { name: x.content[lang].name, whatToDo: x.content[lang].whatToDo }]),
  );
  const examples = [
    getScam("kyc-update-scam")!.content[lang].example,
    getScam("digital-arrest-scam")!.content[lang].example,
    getScam("part-time-job-scam")!.content[lang].example,
    SAFE_EXAMPLE,
  ];
  const faq = homeFaq[lang];

  const quick = [
    { href: "/help", icon: "siren", title: hi ? "ठगी हो गई?" : "Got scammed?", sub: hi ? "पहले घंटे की चेकलिस्ट" : "First-hour checklist", tone: "rose" },
    { href: "/report", icon: "file-check", title: hi ? "शिकायत करें" : "Report fraud", sub: hi ? "कदम-दर-कदम गाइड" : "Step-by-step guide", tone: "cyan" },
    { href: "/services", icon: "landmark", title: hi ? "सरकारी सेवाएं" : "Govt services", sub: hi ? `${resources.length}+ आधिकारिक टूल` : `${resources.length}+ official tools`, tone: "violet" },
    { href: "/scams", icon: "book", title: hi ? "स्कैम जानें" : "Learn scams", sub: hi ? `${scams.length} गाइड` : `${scams.length} guides`, tone: "amber" },
  ];
  const tone: Record<string, string> = {
    rose: "border-rose-500/30 bg-rose-500/10 text-rose-300",
    cyan: "border-cyan/30 bg-cyan/10 text-cyan",
    violet: "border-violet/30 bg-violet/10 text-violet-300",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  };

  const trust = hi
    ? ["साइन-अप नहीं", "कुछ सेव नहीं होता", "हिंदी + English", "हमेशा मुफ़्त"]
    : ["No sign-up", "Nothing stored", "Hindi + English", "Free forever"];

  return (
    <>
      <JsonLd data={graph(webAppLd(lang), faqLd(faq))} />

      {/* ================= HERO + SCANNER ================= */}
      <section id="scanner" className="relative mx-auto max-w-6xl scroll-mt-16 px-4 pb-10 pt-5 sm:px-6 sm:pt-10 lg:pb-16 lg:pt-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-x-12 lg:gap-y-8">
          {/* 1. Headline (first on every screen) */}
          {/* No entrance animation on the headline: it is the LCP element and must paint immediately */}
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-xs font-semibold text-cyan">
              <Icon name="sparkles" className="h-3.5 w-3.5" />
              {t.hero.badge}
            </span>
            <h1 className="mt-4 font-display text-[34px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.hero.title1} <span className="text-gradient">{t.hero.title2}</span>
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:mt-5 sm:text-lg">{t.hero.subtitle}</p>
          </div>

          {/* 2. Scanner (right after the headline on phones) */}
          <div className="fade-up [animation-delay:120ms] lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <Scanner lang={lang} t={t.scanner} r={t.result} scamMeta={scamMeta} examples={examples} />
          </div>

          {/* 3. Trust + stats */}
          <div className="fade-up [animation-delay:200ms] lg:col-start-1 lg:row-start-2 lg:self-start">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-300">
              {trust.map((x) => (
                <li key={x} className="flex items-center gap-1.5">
                  <Icon name="badge-check" className="h-4 w-4 text-safe" />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-6 hidden flex-wrap gap-3 lg:flex">
              <Link prefetch={false}
                href={localePath(lang, "/help")}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-5 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
              >
                <Icon name="siren" className="h-4 w-4" /> {t.hero.ctaHelp}
              </Link>
              <a href="tel:1930" className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold text-slate-200 transition hover:border-cyan/50">
                <Icon name="phone" className="h-4 w-4" /> 1930
              </a>
            </div>
          </div>
        </div>

        {/* Quick actions — app-style tiles, most useful on phones */}
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-12">
          {quick.map((q) => (
            <li key={q.href}>
              <Link prefetch={false}
                href={localePath(lang, q.href)}
                className="glass group flex h-full flex-col gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${tone[q.tone]}`}>
                  <Icon name={q.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold leading-tight text-white">{q.title}</span>
                  <span className="mt-0.5 block text-xs text-slate-400">{q.sub}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= TICKER ================= */}
      <div className="relative overflow-hidden border-y border-line bg-ink-2/60 py-3" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...scams, ...scams].map((x, i) => (
            <span key={i} className="flex items-center gap-2 text-sm text-slate-400">
              <Icon name="alert" className="h-4 w-4 text-rose-400" /> {x.content[lang].name}
            </span>
          ))}
        </div>
      </div>

      {/* ================= WHAT'S NEW ================= */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="reveal flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-200">
              <Icon name="sparkles" className="h-3.5 w-3.5" /> {s.newBadge}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-4xl">{s.updatesTitle}</h2>
            <p className="mt-2 max-w-2xl text-slate-400">{s.updatesSub}</p>
          </div>
        </div>
        <div className="mt-8">
          <UpdatesGrid lang={lang} />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <h2 className="reveal font-display text-2xl font-bold text-white sm:text-center sm:text-4xl">{t.home.howTitle}</h2>
        <ol className="mt-8 grid gap-3 sm:mt-12 sm:gap-5 md:grid-cols-3">
          {t.home.how.map((step, i) => (
            <li key={step.t} className="reveal glass group relative flex gap-4 overflow-hidden rounded-3xl p-5 transition hover:-translate-y-1 md:block md:p-6">
              <span className="font-mono text-3xl font-bold text-cyan/40 transition group-hover:text-cyan/70 md:text-5xl md:text-white/5">0{i + 1}</span>
              <div>
                <h3 className="font-display text-lg font-semibold text-white md:mt-2 md:text-xl">{step.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{step.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ================= FREE CHECKERS (one page per search intent) ================= */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="reveal font-display text-2xl font-bold text-white sm:text-4xl">{hi ? "सभी मुफ़्त स्कैम चेकर" : "All free scam checkers"}</h2>
        <p className="reveal mt-2 max-w-2xl text-slate-400">
          {hi ? "मैसेज, लिंक, UPI ID, फ़ोन नंबर या स्क्रीनशॉट — जो भी संदिग्ध लगे, जांचें।" : "Message, link, UPI ID, phone number or screenshot — check whatever looks suspicious."}
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tools.map((tl) => (
            <li key={tl.slug} className="reveal">
              <Link prefetch={false}
                href={localePath(lang, `/${tl.slug}`)}
                className="glass group flex h-full flex-col gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-cyan/40 active:scale-[0.98]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/25">
                  <Icon name={tl.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold leading-snug text-white group-hover:text-cyan">{tl.content[lang].nav}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= TRENDING SCAMS ================= */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="reveal flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-4xl">{t.home.scamsTitle}</h2>
            <p className="mt-2 text-slate-400">{t.home.scamsSub}</p>
          </div>
          <Link prefetch={false} href={localePath(lang, "/scams")} className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-cyan hover:underline sm:inline-flex">
            {t.home.viewAll} <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {scams.slice(0, 6).map((x) => (
            <li key={x.slug} className="reveal">
              <Link prefetch={false}
                href={localePath(lang, `/scams/${x.slug}`)}
                className="glass group relative flex h-full items-start gap-4 overflow-hidden rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 active:scale-[0.99] sm:flex-col sm:p-6"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition duration-500 group-hover:opacity-50" style={{ background: x.accent }} aria-hidden="true" />
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-2xl ring-1 ring-line" aria-hidden="true">
                  {x.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold leading-snug text-white sm:text-lg">{x.content[lang].name}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-400 sm:line-clamp-none">{x.content[lang].short}</p>
                  <span className="mt-3 hidden items-center gap-1 text-sm font-semibold text-cyan transition group-hover:translate-x-1 sm:inline-flex">
                    {t.common.readMore} <Icon name="arrow-right" className="h-4 w-4" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link prefetch={false}
          href={localePath(lang, "/scams")}
          className="mt-5 flex h-12 items-center justify-center gap-2 rounded-2xl border border-line font-semibold text-cyan sm:hidden"
        >
          {t.home.viewAll} <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </section>

      {/* ================= GOLDEN HOUR ================= */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="reveal relative overflow-hidden rounded-[2rem] border border-rose-500/30 bg-gradient-to-br from-rose-600/25 via-orange-500/10 to-transparent p-6 sm:p-12">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rose-500/20 blur-3xl" aria-hidden="true" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto] md:gap-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{t.home.goldenTitle}</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-rose-100/80">{t.home.goldenText}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              <a href="tel:1930" className="btn-shine inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-rose-500 px-6 font-display text-xl font-bold text-white shadow-lg shadow-rose-500/30">
                <Icon name="phone" className="h-5 w-5" /> 1930
              </a>
              <Link prefetch={false}
                href={localePath(lang, "/help")}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t.home.goldenCta} <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GOVT SERVICES ================= */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="reveal font-display text-2xl font-bold text-white sm:text-4xl">{s.servicesTitle}</h2>
        <p className="reveal mt-2 max-w-2xl text-slate-400">{s.servicesSub}</p>
        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {serviceCategories.map((c) => {
            const count = resources.filter((r) => r.category === c.id).length;
            return (
              <li key={c.id} className="reveal">
                <Link prefetch={false}
                  href={localePath(lang, "/services")}
                  className="glass group flex h-full flex-col rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-cyan/30 active:scale-[0.98] sm:p-5"
                >
                  <span className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/25">
                      <Icon name={c.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-slate-400">{count}</span>
                  </span>
                  <span className="mt-4 font-semibold leading-tight text-white">{c.title[lang]}</span>
                  <span className="mt-1 hidden text-sm leading-relaxed text-slate-400 sm:block">{c.desc[lang]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link prefetch={false}
          href={localePath(lang, "/services")}
          className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-6 font-semibold text-white transition hover:brightness-110"
        >
          {s.servicesCta} <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </section>

      {/* ================= HELPLINES ================= */}
      <section id="helplines" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6">
        <h2 className="reveal font-display text-2xl font-bold text-white sm:text-4xl">{t.home.helplinesTitle}</h2>
        <p className="reveal mt-2 text-slate-400">{t.home.helplinesSub}</p>
        <ul className="no-scrollbar -mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {helplines.map((h) => (
            <li key={h.number} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <a
                href={`tel:${h.tel}`}
                className={`glass flex h-full items-start gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5 active:scale-[0.99] ${h.primary ? "border-rose-500/40" : ""}`}
              >
                <span className={`font-display text-3xl font-extrabold tabular-nums ${h.primary ? "text-rose-400" : "text-cyan"}`}>{h.number}</span>
                <span className="min-w-0">
                  <span className="block font-semibold text-white">{h.label[lang]}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-400">{h.note[lang]}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= QUIZ TEASER ================= */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Link prefetch={false} href={localePath(lang, "/quiz")} className="reveal glass group relative flex items-center gap-5 overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1 sm:p-8">
          <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-violet/30 blur-3xl transition group-hover:bg-violet/50" aria-hidden="true" />
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet/15 text-violet-200 ring-1 ring-violet/30">
            <Icon name="brain" className="h-7 w-7" />
          </span>
          <span className="relative min-w-0">
            <span className="block font-display text-xl font-bold text-white sm:text-2xl">{t.home.quizTitle}</span>
            <span className="mt-1 block text-sm text-slate-400 sm:text-base">{t.home.quizText}</span>
          </span>
          <Icon name="arrow-right" className="relative ml-auto hidden h-6 w-6 shrink-0 text-violet-300 sm:block" />
        </Link>
      </section>

      {/* ================= FAQ ================= */}
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h2 className="reveal font-display text-2xl font-bold text-white sm:text-center sm:text-4xl">{t.home.faqTitle}</h2>
        <div className="mt-8 space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="reveal glass group rounded-2xl px-5 py-4 open:border-cyan/30">
              <summary className="flex min-h-[28px] items-center justify-between gap-4 font-semibold text-white">
                <h3 className="text-[15px] sm:text-base">{f.q}</h3>
                <Icon name="chevron-down" className="chev h-5 w-5 shrink-0 text-slate-400 transition" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
