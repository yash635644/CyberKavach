"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Gauge } from "./Gauge";
import { runRules } from "@/lib/detector";
import { nextStepsFor, summaryFor, type ScanResponse, type ScamInfo } from "@/lib/advice";
import type { Dictionary } from "@/lib/i18n";
import { SITE_URL, localePath, type Locale } from "@/lib/site";

type Mode = "text" | "url" | "image";
type Props = {
  lang: Locale;
  t: Dictionary["scanner"];
  r: Dictionary["result"];
  scamMeta: Record<string, ScamInfo>;
  examples: string[];
  initialMode?: Mode;
};

const MAX = 6000;

async function resizeImage(file: File): Promise<{ data: string; mimeType: string; preview: string }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const preview = canvas.toDataURL("image/jpeg", 0.82);
  return { data: preview.split(",")[1], mimeType: "image/jpeg", preview };
}

const VERDICT_STYLE = {
  SAFE: "border-safe/40 bg-safe/10 text-green-300",
  SUSPICIOUS: "border-warn/40 bg-warn/10 text-amber-300",
  DANGEROUS: "border-danger/40 bg-danger/10 text-rose-300",
} as const;

export function Scanner({ lang, t, r, scamMeta, examples, initialMode = "text" }: Props) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<{ data: string; mimeType: string; preview: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => setStep((s) => Math.min(s + 1, t.scanningSteps.length - 1)), 900);
    return () => clearInterval(id);
  }, [loading, t.scanningSteps.length]);

  const onFile = useCallback(async (file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    setError(null);
    try {
      setImage(await resizeImage(file));
      setMode("image");
    } catch {
      setError(t.errorGeneric);
    }
  }, [t.errorGeneric]);

  // Paste a screenshot from the clipboard anywhere on the page while in image mode
  useEffect(() => {
    if (mode !== "image") return;
    const onPaste = (e: ClipboardEvent) => {
      const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith("image/"));
      if (item) onFile(item.getAsFile());
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [mode, onFile]);

  const localFallback = (content: string): ScanResponse => {
    const rules = runRules(content, lang);
    const info = rules.scamType ? scamMeta[rules.scamType] : undefined;
    return {
      score: rules.score,
      verdict: rules.verdict,
      scamType: rules.scamType,
      summary: summaryFor(rules.verdict, info, lang),
      redFlags: rules.signals.filter((s) => s.weight > 0).map((s) => s.label),
      nextSteps: nextStepsFor(rules.verdict, info, lang),
      engine: "rules",
    };
  };

  async function scan() {
    const content = mode === "text" ? text.trim() : mode === "url" ? url.trim() : "";
    if ((mode !== "image" && !content) || (mode === "image" && !image)) {
      setError(t.errorEmpty);
      return;
    }
    setError(null);
    setResult(null);
    setStep(0);
    setLoading(true);
    const started = Date.now();

    let out: ScanResponse | null = null;
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          text: mode === "url" ? `Link to check: ${content}` : content || undefined,
          image: mode === "image" && image ? { data: image.data, mimeType: image.mimeType } : undefined,
        }),
      });
      if (res.status === 429) {
        setError(t.errorRate);
      } else if (res.ok) {
        out = (await res.json()) as ScanResponse;
      } else if (mode === "image") {
        const body = await res.json().catch(() => ({}));
        setError(body.error || t.errorGeneric);
      } else {
        out = localFallback(content);
      }
    } catch {
      if (mode !== "image") out = localFallback(content);
      else setError(t.errorGeneric);
    }

    // Keep the scanning animation visible briefly so results don't "flash"
    const wait = Math.max(0, 1400 - (Date.now() - started));
    await new Promise((res) => setTimeout(res, wait));
    setLoading(false);
    if (out) {
      setResult(out);
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }

  function reset() {
    setResult(null);
    setText("");
    setUrl("");
    setImage(null);
    setError(null);
  }

  const shareText = result
    ? `${r.shareText.replace("{verdict}", r[result.verdict]).replace("{score}", String(result.score))} ${SITE_URL}${localePath(lang, "/")}`
    : "";

  async function copyReport() {
    if (!result) return;
    const report = [
      `${r.verdict}: ${r[result.verdict]} (${result.score}/100)`,
      result.summary,
      "",
      `${r.redFlags}:`,
      ...result.redFlags.map((f) => `• ${f}`),
      "",
      `${r.nextSteps}:`,
      ...result.nextSteps.map((s, i) => `${i + 1}. ${s}`),
      "",
      `— Cyber Kavach ${SITE_URL}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  }

  const tabs: { id: Mode; label: string; icon: React.ReactNode }[] = [
    {
      id: "text",
      label: t.tabText,
      icon: <path d="M4 5h16v11H8l-4 4V5Z" strokeLinejoin="round" />,
    },
    {
      id: "url",
      label: t.tabUrl,
      icon: <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" strokeLinecap="round" />,
    },
    {
      id: "image",
      label: t.tabImage,
      icon: (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="2" />
          <path d="m21 16-5-5-9 9" strokeLinejoin="round" />
        </>
      ),
    },
  ];

  const scamLink = result?.scamType && scamMeta[result.scamType] ? result.scamType : null;

  return (
    <div className="w-full">
      <div className={`glow-border glass relative overflow-hidden rounded-3xl p-4 shadow-2xl shadow-cyan-500/10 sm:p-6`}>
        {loading && <div className="scanline" aria-hidden="true" />}

        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white sm:text-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-cyan" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
            </span>
            {t.title}
          </h2>
          <span className="hidden rounded-full border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-slate-400 sm:inline">
            AI · {lang === "hi" ? "मुफ़्त" : "free"}
          </span>
        </div>

        <div role="tablist" aria-label={t.title} className="mb-4 grid grid-cols-3 gap-1 rounded-2xl border border-line bg-ink/60 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={mode === tab.id}
              onClick={() => {
                setMode(tab.id);
                setError(null);
              }}
              className={`flex h-11 items-center justify-center gap-1.5 rounded-xl px-1.5 text-[13px] font-semibold transition sm:gap-2 sm:text-sm ${
                mode === tab.id ? "bg-gradient-to-r from-cyan/90 to-sky/90 text-ink shadow" : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                {tab.icon}
              </svg>
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>

        {mode === "text" && (
          <div>
            <label htmlFor="scan-text" className="sr-only">
              {t.tabText}
            </label>
            <textarea
              id="scan-text"
              value={text}
              maxLength={MAX}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.textPlaceholder}
              rows={5}
              className="min-h-[140px] w-full resize-y rounded-2xl border border-line bg-ink/70 p-4 text-base leading-relaxed text-slate-100 placeholder:text-slate-400 focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/20 sm:min-h-[160px]"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
              <span>{t.tryExample}</span>
              <span className="tabular-nums">
                {text.length}/{MAX}
                <span className="hidden sm:inline"> {t.chars}</span>
              </span>
            </div>
            {/* Swipeable chip row on phones, wraps on larger screens */}
            <div className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
              {t.examples.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setText(examples[i])}
                  className="h-9 shrink-0 rounded-full border border-line bg-white/[0.03] px-3.5 text-xs font-medium text-slate-300 transition hover:border-cyan/50 hover:text-white active:scale-95"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === "url" && (
          <div>
            <label htmlFor="scan-url" className="sr-only">
              {t.tabUrl}
            </label>
            <input
              id="scan-url"
              type="text"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              value={url}
              maxLength={2000}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && scan()}
              placeholder={t.urlPlaceholder}
              className="w-full rounded-2xl border border-line bg-ink/70 p-4 font-mono text-base text-slate-100 placeholder:text-slate-400 focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/20"
            />
            <p className="mt-2 text-xs text-slate-400">
              {lang === "hi" ? "लिंक खोलें नहीं — बस कॉपी करके यहां पेस्ट करें।" : "Don't open the link — just copy and paste it here."}
            </p>
          </div>
        )}

        {mode === "image" && (
          <div>
            {image ? (
              <div className="relative overflow-hidden rounded-2xl border border-line bg-ink/70 p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.preview} alt="" className="mx-auto max-h-72 rounded-xl object-contain" />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute right-3 top-3 rounded-full bg-ink/90 px-3 py-1 text-xs font-semibold text-slate-200 ring-1 ring-line hover:text-white"
                >
                  {t.removeImage}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  onFile(e.dataTransfer.files?.[0]);
                }}
                className={`flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-10 text-center transition ${
                  dragging ? "border-cyan bg-cyan/5" : "border-line bg-ink/50 hover:border-cyan/50"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-10 w-10 text-cyan" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-medium text-slate-200">{t.imageDrop}</span>
                <span className="text-xs text-slate-400">{t.imageHint}</span>
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </div>
        )}

        {error && (
          <p role="alert" className="mt-3 rounded-xl border border-danger/40 bg-danger/10 px-4 py-2.5 text-sm text-rose-200">
            {error}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={scan}
            disabled={loading}
            className="btn-shine inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan to-violet px-6 py-4 font-display text-base font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-80"
          >
            {loading ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
                  <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                {t.scanning}
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" strokeLinejoin="round" />
                  <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.scan}
              </>
            )}
          </button>
          {(text || url || image || result) && !loading && (
            <button type="button" onClick={reset} className="rounded-2xl border border-line px-5 py-4 text-sm font-semibold text-slate-300 transition hover:text-white">
              {t.clear}
            </button>
          )}
        </div>

        <div aria-live="polite" className="sr-only">
          {loading ? t.scanningSteps[step] : result ? `${r[result.verdict]} ${result.score}/100` : ""}
        </div>

        {loading && (
          <ol className="mt-5 grid gap-2 sm:grid-cols-2">
            {t.scanningSteps.map((s, i) => (
              <li
                key={s}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                  i < step ? "border-safe/30 text-green-300" : i === step ? "border-cyan/40 text-cyan" : "border-line text-slate-400"
                }`}
              >
                <span className="font-mono text-xs">{i < step ? "✓" : i === step ? "›" : "·"}</span>
                {s}
              </li>
            ))}
          </ol>
        )}

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-400">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          {t.privacy}
        </p>
      </div>

      {result && (
        <div ref={resultRef} className="pop mt-6 scroll-mt-24" id="scan-result">
          <div className="glass overflow-hidden rounded-3xl">
            <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[260px_1fr]">
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-ink/50 p-5">
                <Gauge score={result.score} verdict={result.verdict} label={r.risk} />
                <span className={`rounded-full border px-4 py-1.5 text-sm font-bold ${VERDICT_STYLE[result.verdict]}`}>{r[result.verdict]}</span>
                <span className="text-center font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  {result.engine === "ai" ? r.engineAi : r.engineRules}
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-lg leading-relaxed text-slate-100">{result.summary}</p>

                {scamLink && (
                  <Link prefetch={false}
                    href={localePath(lang, `/scams/${scamLink}`)}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-violet/40 bg-violet/10 px-3.5 py-1.5 text-sm font-medium text-violet-200 transition hover:bg-violet/20"
                  >
                    {r.likelyType}: {scamMeta[scamLink].name} →
                  </Link>
                )}

                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-400">{r.redFlags}</h3>
                {result.redFlags.length ? (
                  <ul className="mt-3 space-y-2">
                    {result.redFlags.map((f, i) => (
                      <li key={i} className="flex gap-3 rounded-xl border border-line bg-white/[0.02] px-3.5 py-2.5 text-sm text-slate-200">
                        <span className="mt-0.5 text-rose-400" aria-hidden="true">
                          ⚑
                        </span>
                        <span className="min-w-0 break-words">{f}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-slate-300">{r.noFlags}</p>
                )}

                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-400">{r.nextSteps}</h3>
                <ol className="mt-3 space-y-2">
                  {result.nextSteps.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-200">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan/15 font-mono text-xs text-cyan">{i + 1}</span>
                      <span className="min-w-0 break-words pt-0.5">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-line bg-ink/40 px-4 py-4 sm:flex sm:flex-wrap sm:items-center sm:gap-3 sm:px-7">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold sm:h-10 text-[#052e16] transition hover:brightness-110"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z" />
                </svg>
                {r.share}
              </a>
              <button
                type="button"
                onClick={copyReport}
                className="h-11 rounded-full border border-line px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan/50 hover:text-white sm:h-10"
              >
                {copied ? r.copied : r.copy}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  document.getElementById("scanner")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="h-11 rounded-full border border-line px-4 text-sm font-semibold text-slate-300 transition hover:text-white sm:h-10 sm:border-transparent"
              >
                {r.again}
              </button>
              <p className="col-span-2 w-full text-xs text-slate-400">{r.disclaimer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
