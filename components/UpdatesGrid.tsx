import { Icon } from "./Icon";
import { getDictionary } from "@/lib/i18n";
import { safetyUpdates } from "@/lib/content/updates";
import type { Locale } from "@/lib/site";

/** "What's new" cards — horizontal swipe carousel on phones, grid on tablet/desktop. */
export function UpdatesGrid({ lang, limit }: { lang: Locale; limit?: number }) {
  const t = getDictionary(lang).sections;
  const items = limit ? safetyUpdates.slice(0, limit) : safetyUpdates;
  return (
    <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-3">
      {items.map((u) => (
        <li key={u.id} className="glass flex w-[84%] shrink-0 snap-center flex-col rounded-3xl p-5 sm:w-auto">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/25 to-violet/25 text-cyan ring-1 ring-cyan/25">
              <Icon name={u.icon} className="h-5 w-5" />
            </span>
            <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-slate-400">{u.when}</span>
          </div>
          <h3 className="mt-4 font-display text-lg font-bold leading-snug text-white">{u.title[lang]}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{u.body[lang]}</p>
          <p className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/[0.07] px-3 py-2.5 text-sm text-amber-100">
            <span className="font-semibold text-amber-300">{t.updatesTip}: </span>
            {u.tip[lang]}
          </p>
          {u.href && (
            <a
              href={u.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[40px] items-center gap-1.5 self-start text-xs font-semibold text-cyan hover:underline"
            >
              {lang === "hi" ? "आधिकारिक स्रोत" : "Official source"}: {new URL(u.href).hostname.replace(/^www\./, "")}
              <Icon name="external" className="h-3.5 w-3.5" />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
