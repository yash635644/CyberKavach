import Link from "next/link";
import { Icon } from "./Icon";
import { relatedFor, type PageKey } from "@/lib/nav";
import { localePath, type Locale } from "@/lib/site";

/** Small square arrow "box" used on every navigational card. */
export function ArrowBox({ external = false, className = "" }: { external?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.04] text-slate-300 transition group-hover:border-cyan/50 group-hover:bg-cyan/10 group-hover:text-cyan ${className}`}
    >
      <Icon name={external ? "external" : "arrow-right"} className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </span>
  );
}

/** Context-aware internal links at the end of every page — keeps the whole site interconnected. */
export function ExploreMore({ lang, page, scam, tool, className = "" }: { lang: Locale; page: PageKey; scam?: string; tool?: string; className?: string }) {
  const items = relatedFor(page, { scam, tool });
  if (!items.length) return null;
  return (
    <nav aria-labelledby={`explore-${page}`} className={`@container mt-16 ${className}`}>
      <h2 id={`explore-${page}`} className="font-display text-xl font-bold text-white sm:text-2xl">
        {lang === "hi" ? "आगे क्या देखें" : "Explore more"}
      </h2>
      <ul className="mt-5 grid gap-3 @lg:grid-cols-2 @4xl:grid-cols-4">
        {items.map((it) => (
          <li key={it.key}>
            <Link prefetch={false}
              href={localePath(lang, it.href)}
              className="glass group flex h-full items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-cyan/40 active:scale-[0.99]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/25">
                <Icon name={it.icon} className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-snug text-white group-hover:text-cyan">{it.label[lang]}</span>
                <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-slate-400">{it.desc[lang]}</span>
              </span>
              <ArrowBox />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
