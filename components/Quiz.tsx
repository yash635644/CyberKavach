"use client";

import { useState } from "react";

type Item = { message: string; scam: boolean; explain: string };
type Labels = {
  question: string;
  scam: string;
  safe: string;
  correct: string;
  wrong: string;
  next: string;
  finish: string;
  result: string;
  levels: [string, string, string];
  share: string;
  retry: string;
  shareText: string;
};

export function Quiz({ items, labels, shareUrl }: { items: Item[]; labels: Labels; shareUrl: string }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const item = items[index];

  function choose(isScam: boolean) {
    if (answer !== null) return;
    setAnswer(isScam);
    if (isScam === item.scam) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= items.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setAnswer(null);
  }

  if (finished) {
    const level = score >= 9 ? labels.levels[0] : score >= 6 ? labels.levels[1] : labels.levels[2];
    const text = `${labels.shareText.replace("{score}", `${score}/${items.length}`)} ${shareUrl}`;
    return (
      <div className="pop text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">{labels.result}</p>
        <p className="mt-3 font-display text-7xl font-extrabold text-gradient">
          {score}/{items.length}
        </p>
        <p className="mt-3 text-xl font-semibold text-white">{level}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] px-5 py-2.5 font-semibold text-[#052e16] transition hover:brightness-110"
          >
            {labels.share}
          </a>
          <button
            type="button"
            onClick={() => {
              setIndex(0);
              setScore(0);
              setAnswer(null);
              setFinished(false);
            }}
            className="rounded-full border border-line px-5 py-2.5 font-semibold text-slate-200 transition hover:border-cyan/50"
          >
            {labels.retry}
          </button>
        </div>
      </div>
    );
  }

  const correct = answer !== null && answer === item.scam;

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>
          {labels.question} {index + 1}/{items.length}
        </span>
        <span className="tabular-nums">✓ {score}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan to-violet transition-all duration-500" style={{ width: `${((index + (answer !== null ? 1 : 0)) / items.length) * 100}%` }} />
      </div>

      <div key={index} className="pop mt-8">
        <div className="max-w-xl rounded-3xl rounded-tl-md border border-line bg-[#0b2a24] p-5 text-[15px] leading-relaxed text-emerald-50 shadow-xl">{item.message}</div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => choose(true)}
            disabled={answer !== null}
            className={`rounded-2xl border px-4 py-4 font-display text-lg font-bold transition ${
              answer === null ? "border-rose-500/40 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20" : item.scam ? "border-rose-500 bg-rose-500/25 text-white" : "border-line text-slate-400"
            }`}
          >
            🚩 {labels.scam}
          </button>
          <button
            type="button"
            onClick={() => choose(false)}
            disabled={answer !== null}
            className={`rounded-2xl border px-4 py-4 font-display text-lg font-bold transition ${
              answer === null ? "border-safe/40 bg-safe/10 text-green-200 hover:bg-safe/20" : !item.scam ? "border-safe bg-safe/25 text-white" : "border-line text-slate-400"
            }`}
          >
            ✅ {labels.safe}
          </button>
        </div>

        {answer !== null && (
          <div className={`pop mt-5 rounded-2xl border p-5 ${correct ? "border-safe/40 bg-safe/[0.07]" : "border-rose-500/40 bg-rose-500/[0.07]"}`} role="status">
            <p className={`font-bold ${correct ? "text-green-300" : "text-rose-300"}`}>{correct ? labels.correct : labels.wrong}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-200">{item.explain}</p>
            <button type="button" onClick={next} className="mt-4 rounded-full bg-gradient-to-r from-cyan to-violet px-5 py-2 text-sm font-bold text-white">
              {index + 1 >= items.length ? labels.finish : labels.next} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
