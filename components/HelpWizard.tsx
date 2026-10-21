"use client";

import { useState } from "react";

type Step = { title: string; detail: string; href?: string; tel?: string; urgent?: boolean };
type Situation = { id: string; icon: string; label: string; steps: Step[] };

export function HelpWizard({
  situations,
  labels,
}: {
  situations: Situation[];
  labels: { choose: string; progress: string; back: string; urgent: string; open: string; call: string; done: string };
}) {
  const [active, setActive] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const current = situations.find((s) => s.id === active);

  if (!current) {
    return (
      <div>
        <h2 className="font-display text-xl font-bold text-white">{labels.choose}</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {situations.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => {
                  setActive(s.id);
                  setChecked({});
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="glass group flex w-full items-center gap-4 rounded-2xl p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan/40"
              >
                <span className="text-3xl" aria-hidden="true">
                  {s.icon}
                </span>
                <span className="flex-1 font-semibold text-white">{s.label}</span>
                <span className="text-cyan transition group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const done = current.steps.filter((_, i) => checked[`${current.id}-${i}`]).length;
  const pct = Math.round((done / current.steps.length) * 100);

  return (
    <div className="pop">
      <button type="button" onClick={() => setActive(null)} className="text-sm font-semibold text-slate-400 transition hover:text-white">
        ← {labels.back}
      </button>
      <h2 className="mt-4 flex items-center gap-3 font-display text-2xl font-bold text-white">
        <span aria-hidden="true">{current.icon}</span> {current.label}
      </h2>

      <div className="mt-5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>{labels.progress}</span>
          <span className="tabular-nums">
            {done}/{current.steps.length}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-gradient-to-r from-cyan to-safe transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        {done === current.steps.length && <p className="mt-3 text-sm font-semibold text-green-300">✓ {labels.done}</p>}
      </div>

      <ol className="mt-6 space-y-3">
        {current.steps.map((s, i) => {
          const key = `${current.id}-${i}`;
          const isDone = !!checked[key];
          return (
            <li key={key} className={`rounded-2xl border p-5 transition ${isDone ? "border-safe/30 bg-safe/[0.05]" : s.urgent ? "border-rose-500/40 bg-rose-500/[0.06]" : "border-line bg-white/[0.02]"}`}>
              <div className="flex items-start gap-4">
                <input
                  id={key}
                  type="checkbox"
                  checked={isDone}
                  onChange={(e) => setChecked((c) => ({ ...c, [key]: e.target.checked }))}
                  className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-cyan-400"
                />
                <div className="min-w-0 flex-1">
                  <label htmlFor={key} className={`cursor-pointer font-semibold ${isDone ? "text-slate-400 line-through" : "text-white"}`}>
                    {i + 1}. {s.title}
                    {s.urgent && !isDone && <span className="ml-2 rounded-full bg-rose-500/20 px-2 py-0.5 align-middle text-[11px] font-bold uppercase text-rose-300">{labels.urgent}</span>}
                  </label>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{s.detail}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.tel && (
                      <a href={`tel:${s.tel}`} className="rounded-full bg-rose-500 px-4 py-1.5 text-sm font-bold text-white">
                        📞 {labels.call} {s.tel}
                      </a>
                    )}
                    {s.href && (
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-4 py-1.5 text-sm font-semibold text-cyan transition hover:border-cyan/50">
                        {labels.open} ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
