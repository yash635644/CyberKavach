"use client";

import { useMemo, useState } from "react";
import { Icon } from "./Icon";

export type ServiceItem = {
  id: string;
  url: string;
  category: string;
  icon: string;
  org: string;
  name: string;
  desc: string;
  phone?: string;
  isNew?: boolean;
  android?: string;
};
type Cat = { id: string; icon: string; title: string };
type Labels = { search: string; all: string; noResults: string; open: string; getApp: string; newBadge: string; call: string };

const CAT_STYLE: Record<string, string> = {
  report: "text-rose-300 bg-rose-500/10 border-rose-500/30",
  verify: "text-cyan bg-cyan/10 border-cyan/30",
  protect: "text-green-300 bg-safe/10 border-safe/30",
  learn: "text-violet-300 bg-violet/10 border-violet/30",
};

export function ServicesDirectory({ items, categories, labels, initialCategory = "all" }: { items: ServiceItem[]; categories: Cat[]; labels: Labels; initialCategory?: string }) {
  const [cat, setCat] = useState(initialCategory);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter(
      (s) => (cat === "all" || s.category === cat) && (!needle || `${s.name} ${s.desc} ${s.org} ${s.phone ?? ""}`.toLowerCase().includes(needle)),
    );
  }, [items, cat, q]);

  return (
    <div>
      {/* Sticky search + filter bar — thumb-reachable while scrolling on phones */}
      <div className="sticky top-[calc(3.5rem+env(safe-area-inset-top))] z-30 -mx-4 border-b border-line bg-ink/90 px-4 py-3 backdrop-blur-xl sm:top-[calc(4rem+env(safe-area-inset-top))] sm:-mx-6 sm:px-6">
        <label className="relative block">
          <span className="sr-only">{labels.search}</span>
          <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={labels.search}
            className="h-12 w-full rounded-2xl border border-line bg-ink-2 pl-12 pr-4 text-base text-slate-100 placeholder:text-slate-400 focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/20"
          />
        </label>
        <div role="tablist" aria-label="Categories" className="no-scrollbar -mx-4 mt-3 flex snap-x gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ id: "all", icon: "grid", title: labels.all }, ...categories].map((c) => (
            <button
              key={c.id}
              role="tab"
              type="button"
              aria-selected={cat === c.id}
              onClick={() => setCat(c.id)}
              className={`flex h-10 shrink-0 snap-start items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
                cat === c.id ? "border-cyan bg-cyan text-ink" : "border-line bg-white/[0.03] text-slate-300 hover:text-white"
              }`}
            >
              <Icon name={c.icon} className="h-4 w-4" />
              {c.title}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-400" aria-live="polite">
        {filtered.length} / {items.length}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-slate-400">{labels.noResults}</p>
      ) : (
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <li key={s.id} className="glass flex flex-col rounded-2xl p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${CAT_STYLE[s.category]}`}>
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{s.org}</p>
                  <h3 className="mt-0.5 font-semibold leading-snug text-white">
                    {s.name}
                    {s.isNew && <span className="ml-2 inline-block rounded-full bg-violet/25 px-2 py-0.5 align-middle text-[10px] font-bold uppercase text-violet-200">{labels.newBadge}</span>}
                  </h3>
                </div>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{s.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white/[0.06] px-4 text-sm font-semibold text-cyan ring-1 ring-line transition hover:bg-white/10"
                >
                  {labels.open} <Icon name="external" className="h-3.5 w-3.5" />
                </a>
                {s.phone && (
                  <a href={`tel:${s.phone}`} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-rose-500/15 px-4 text-sm font-bold text-rose-200 ring-1 ring-rose-500/30">
                    <Icon name="phone" className="h-3.5 w-3.5" /> {s.phone}
                  </a>
                )}
                {s.android && (
                  <a
                    href={s.android}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-slate-300 ring-1 ring-line transition hover:text-white"
                  >
                    <Icon name="smartphone" className="h-3.5 w-3.5" /> {labels.getApp}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
