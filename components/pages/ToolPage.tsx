import Link from "next/link";
import { ExploreMore } from "../ExploreMore";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../Breadcrumbs";
import { JsonLd } from "../JsonLd";
import { Icon } from "../Icon";
import { Scanner } from "../Scanner";
import { IdChecker } from "../IdChecker";
import { QrChecker } from "../QrChecker";
import { getDictionary } from "@/lib/i18n";
import { getTool, tools } from "@/lib/content/tools";
import { getScam, scams, CONTENT_UPDATED } from "@/lib/content/scams";
import { absoluteUrl, localePath, type Locale } from "@/lib/site";
import { breadcrumbLd, buildMetadata, faqLd, graph, orgId } from "@/lib/seo";
import type { ScamInfo } from "@/lib/advice";

export function toolMeta(slug: string, lang: Locale) {
  const tool = getTool(slug);
  if (!tool) return {};
  const c = tool.content[lang];
  return buildMetadata({ lang, path: `/${slug}`, title: c.title, description: c.description });
}

const SAFE_EXAMPLE = "482913 is your OTP for login to HDFC Bank NetBanking. Valid for 5 mins. Do not share it with anyone. -HDFC Bank";

export function ToolPage({ slug, lang }: { slug: string; lang: Locale }) {
  const tool = getTool(slug);
  if (!tool) notFound();
  const c = tool.content[lang];
  const t = getDictionary(lang);
  const hi = lang === "hi";
  const url = absoluteUrl(localePath(lang, `/${slug}`));

  const scamMeta: Record<string, ScamInfo> = Object.fromEntries(scams.map((x) => [x.slug, { name: x.content[lang].name, whatToDo: x.content[lang].whatToDo }]));
  const examples = [
    getScam("kyc-update-scam")!.content[lang].example,
    getScam("digital-arrest-scam")!.content[lang].example,
    getScam("part-time-job-scam")!.content[lang].example,
    SAFE_EXAMPLE,
  ];
  const others = tools.filter((x) => x.slug !== slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <JsonLd
        data={graph(
          {
            "@type": "WebApplication",
            "@id": `${url}#tool`,
            name: c.h1,
            url,
            description: c.description,
            applicationCategory: "SecurityApplication",
            operatingSystem: "Any (web browser)",
            isAccessibleForFree: true,
            inLanguage: hi ? "hi-IN" : "en-IN",
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
            publisher: { "@id": orgId },
            dateModified: CONTENT_UPDATED,
          },
          {
            "@type": "HowTo",
            name: c.stepsTitle,
            inLanguage: hi ? "hi-IN" : "en-IN",
            step: c.steps.map(([name, text], i) => ({ "@type": "HowToStep", position: i + 1, name, text })),
          },
          faqLd(c.faq),
          breadcrumbLd([
            { name: t.common.home, path: localePath(lang, "/") },
            { name: c.nav, path: localePath(lang, `/${slug}`) },
          ]),
        )}
      />
      <Breadcrumbs items={[{ name: t.common.home, href: localePath(lang, "/") }, { name: c.nav }]} />

      <header className="fade-up mt-5 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-xs font-semibold text-cyan">
          <Icon name={tool.icon} className="h-3.5 w-3.5" /> {t.hero.badge}
        </span>
        <h1 className="mt-4 font-display text-[28px] font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{c.h1}</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg">{c.intro}</p>
      </header>

      {/* The tool itself — first thing on the page */}
      <section id="scanner" className="fade-up mt-6 max-w-3xl scroll-mt-20 [animation-delay:120ms]">
        {tool.mode === "qr" ? (
          <QrChecker lang={lang} />
        ) : tool.mode === "upi" || tool.mode === "phone" ? (
          <IdChecker kind={tool.mode} lang={lang} />
        ) : (
          <Scanner lang={lang} t={t.scanner} r={t.result} scamMeta={scamMeta} examples={examples} initialMode={tool.mode} />
        )}
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <section className="rounded-3xl border border-cyan/30 bg-cyan/[0.06] p-5 sm:p-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">{hi ? "संक्षिप्त उत्तर" : "Quick answer"}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-100 sm:text-lg">{c.answer}</p>
          </section>

          <section className="reveal mt-10">
            <h2 className="font-display text-2xl font-bold text-white">{c.stepsTitle}</h2>
            <ol className="mt-5 space-y-3">
              {c.steps.map(([title, text], i) => (
                <li key={title} className="glass flex gap-4 rounded-2xl p-4 sm:p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-violet font-display font-bold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="reveal mt-10">
            <h2 className="font-display text-2xl font-bold text-white">{c.flagsTitle}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {c.flags.map((f) => (
                <li key={f} className="flex gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/[0.05] p-4 text-sm leading-relaxed text-slate-200">
                  <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section className="reveal mt-10">
            <h2 className="font-display text-2xl font-bold text-white">FAQ</h2>
            <div className="mt-5 space-y-3">
              {c.faq.map((f) => (
                <details key={f.q} className="glass rounded-2xl px-5 py-4" open>
                  <summary className="flex min-h-[28px] items-center justify-between gap-4 font-semibold text-white">
                    <h3 className="text-base">{f.q}</h3>
                    <Icon name="chevron-down" className="chev h-5 w-5 shrink-0 text-slate-400 transition" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-600/25 to-transparent p-5">
            <p className="font-display text-lg font-bold text-white">{t.home.goldenTitle}</p>
            <a href="tel:1930" className="btn-shine mt-4 flex items-center justify-center gap-2 rounded-2xl bg-rose-500 py-3 font-display text-2xl font-bold text-white">
              <Icon name="phone" className="h-6 w-6" /> 1930
            </a>
            <Link prefetch={false} href={localePath(lang, "/help")} className="mt-3 block text-center text-sm font-semibold text-rose-200 hover:underline">
              {t.home.goldenCta} →
            </Link>
          </div>
          <nav aria-label={hi ? "अन्य चेकर" : "Other checkers"} className="glass rounded-3xl p-5">
            <p className="font-display text-lg font-bold text-white">{hi ? "अन्य मुफ़्त चेकर" : "More free checkers"}</p>
            <ul className="mt-3 space-y-1">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link prefetch={false}
                    href={localePath(lang, `/${o.slug}`)}
                    className="flex min-h-[44px] items-center gap-3 rounded-xl px-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    <Icon name={o.icon} className="h-4 w-4 shrink-0 text-cyan" />
                    {o.content[lang].nav}
                  </Link>
                </li>
              ))}
              <li>
                <Link prefetch={false} href={localePath(lang, "/services")} className="flex min-h-[44px] items-center gap-3 rounded-xl px-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
                  <Icon name="landmark" className="h-4 w-4 shrink-0 text-cyan" />
                  {t.nav.services}
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
      <ExploreMore lang={lang} page="tool" tool={slug} />
    </div>
  );
}
