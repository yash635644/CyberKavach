import Link from "next/link";
import { Breadcrumbs } from "../Breadcrumbs";
import { JsonLd } from "../JsonLd";
import { Icon } from "../Icon";
import { ArrowBox, ExploreMore } from "../ExploreMore";
import { getDictionary } from "@/lib/i18n";
import { SECTIONS, scamItems } from "@/lib/nav";
import { SISTER_SITES, localePath, type Locale } from "@/lib/site";
import { breadcrumbLd, buildMetadata, graph } from "@/lib/seo";

const copy = {
  en: { title: "Site Map — All Cyber Kavach Pages", desc: "Every page on Cyber Kavach in one place: scam checkers, scam guides, government cyber services, reporting help and learning resources.", guides: "All scam guides", sister: "Sister projects" },
  hi: { title: "साइट मैप — साइबर कवच के सभी पेज", desc: "साइबर कवच के सभी पेज एक जगह: स्कैम चेकर, स्कैम गाइड, सरकारी साइबर सेवाएं, शिकायत सहायता और सीखने के संसाधन।", guides: "सभी स्कैम गाइड", sister: "सहयोगी प्रोजेक्ट" },
};

export const siteMapMeta = (lang: Locale) => buildMetadata({ lang, path: "/site-map", title: copy[lang].title, description: copy[lang].desc });

export function SiteMapPage({ lang }: { lang: Locale }) {
  const c = copy[lang];
  const t = getDictionary(lang);
  const groups = [...SECTIONS.slice(0, 3), { id: "guides", title: { en: c.guides, hi: c.guides }, items: scamItems }, SECTIONS[3]];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd data={graph(breadcrumbLd([{ name: t.common.home, path: localePath(lang, "/") }, { name: c.title, path: localePath(lang, "/site-map") }]))} />
      <Breadcrumbs items={[{ name: t.common.home, href: localePath(lang, "/") }, { name: lang === "hi" ? "साइट मैप" : "Site Map" }]} />
      <h1 className="fade-up mt-5 font-display text-[28px] font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{c.title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{c.desc}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <section key={g.id} className="glass rounded-3xl p-5 sm:p-6">
            <h2 className="font-display text-lg font-bold text-cyan">{g.title[lang]}</h2>
            <ul className="mt-3 divide-y divide-line">
              {g.items.map((it) => (
                <li key={it.key}>
                  <Link prefetch={false} href={localePath(lang, it.href)} className="group flex min-h-[52px] items-center gap-3 py-2.5">
                    <Icon name={it.icon} className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-cyan" />
                    <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-slate-200 group-hover:text-white">{it.label[lang]}</span>
                    <ArrowBox className="h-8 w-8" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section className="glass rounded-3xl p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold text-cyan">{c.sister}</h2>
          <ul className="mt-3 divide-y divide-line">
            {SISTER_SITES.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener" className="group flex min-h-[52px] items-center gap-3 py-2.5">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-200 group-hover:text-white">{s.name}</span>
                    <span className="block text-xs text-slate-400">{s.desc[lang]}</span>
                  </span>
                  <ArrowBox external className="h-8 w-8" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <ExploreMore lang={lang} page="sitemap" />
    </div>
  );
}
