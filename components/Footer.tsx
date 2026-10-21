import Link from "next/link";
import { ShieldMark } from "./Logo";
import { ArrowBox } from "./ExploreMore";
import { getDictionary } from "@/lib/i18n";
import { SECTIONS } from "@/lib/nav";
import { CREATOR, CREATOR_LINKS, SISTER_SITES, localePath, type Locale } from "@/lib/site";

export function Footer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const hi = lang === "hi";
  const year = 2026;

  return (
    <footer className="relative mt-16 border-t border-line bg-ink-2/60 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:mt-24 lg:pb-0">
      {/* ---------- Brand + link columns ---------- */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 pt-12 sm:grid-cols-4 sm:px-6 sm:pt-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 sm:col-span-4 lg:col-span-1">
          <Link prefetch={false} href={localePath(lang, "/")} className="inline-flex items-center gap-2.5">
            <ShieldMark className="h-9 w-9" />
            <span className="font-display text-xl font-bold text-white">
              Cyber<span className="text-cyan">Kavach</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{t.footer.tagline}</p>
          <a
            href="tel:1930"
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-4 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-rose-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
            </span>
            {hi ? "साइबर हेल्पलाइन 1930" : "Cyber helpline 1930"}
          </a>
        </div>

        {SECTIONS.map((section) => (
          <nav key={section.id} aria-label={section.title[lang]}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{section.title[lang]}</h2>
            <ul className="space-y-1">
              {section.items.map((it) => (
                <li key={it.key}>
                  <Link prefetch={false}
                    href={localePath(lang, it.href)}
                    className="inline-flex min-h-[36px] items-center text-sm leading-snug text-slate-300 transition hover:text-cyan"
                  >
                    {it.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* ---------- More from the creator (link boxes) ---------- */}
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{hi ? "निर्माता के और प्रोजेक्ट" : "More from the creator"}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {SISTER_SITES.map((s) => (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener"
                className="glass group flex h-full items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-cyan/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 font-display text-lg font-bold text-white ring-1 ring-line">
                  {s.name[0]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white group-hover:text-cyan">{s.name}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">{s.desc[lang]}</span>
                </span>
                <ArrowBox external />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Disclaimer + credit (centred on phones & tablets) ---------- */}
      <div className="mt-12 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-6 text-center text-xs leading-relaxed text-slate-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <p className="max-w-2xl">{t.footer.disclaimer}</p>
          <p className="shrink-0">
            © {year} Cyber Kavach
            <span className="mx-1.5 hidden sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="block sm:inline">
              {t.footer.madeBy}{" "}
              <a href={CREATOR_LINKS.portfolio} target="_blank" rel="noopener me" className="font-semibold text-slate-300 hover:text-cyan">
                {CREATOR}
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
