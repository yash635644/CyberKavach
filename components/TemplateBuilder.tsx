"use client";

import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { templates } from "@/lib/content/templates";
import type { Locale } from "@/lib/site";

export function TemplateBuilder({ lang, initial }: { lang: Locale; initial?: string }) {
  const [id, setId] = useState(initial && templates.some((t) => t.id === initial) ? initial : templates[0].id);
  const [letterLang, setLetterLang] = useState<Locale>(lang);
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const hi = lang === "hi";
  const tpl = templates.find((t) => t.id === id)!;
  const text = useMemo(() => tpl.build(values, letterLang), [tpl, values, letterLang]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  }

  function download() {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tpl.id}-${letterLang}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const field = "w-full rounded-xl border border-line bg-ink/70 px-3.5 py-3 text-base text-slate-100 placeholder:text-slate-400 focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/20";

  return (
    <div>
      {/* Template picker */}
      <div role="tablist" aria-label={hi ? "पत्र चुनें" : "Choose a letter"} className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {templates.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={t.id === id}
            onClick={() => setId(t.id)}
            className={`flex min-h-[44px] shrink-0 snap-start items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
              t.id === id ? "border-cyan bg-cyan text-ink" : "border-line bg-white/[0.03] text-slate-300 hover:text-white"
            }`}
          >
            <Icon name={t.icon} className="h-4 w-4" />
            {t.title[lang]}
          </button>
        ))}
      </div>

      <p className="mt-4 rounded-2xl border border-cyan/25 bg-cyan/[0.06] px-4 py-3 text-sm leading-relaxed text-slate-200">
        <strong className="text-cyan">{hi ? "कब उपयोग करें: " : "When to use: "}</strong>
        {tpl.when[lang]}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <form className="glass space-y-4 rounded-3xl p-4 sm:p-6" onSubmit={(e) => e.preventDefault()}>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-amber-200">
            <Icon name="lock" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {hi
              ? "यह पत्र आपके डिवाइस पर ही बनता है — कुछ भी भेजा या सेव नहीं होता। PIN, OTP, CVV या पूरा कार्ड नंबर कभी न लिखें।"
              : "This letter is created on your device only — nothing is sent or saved. Never include PINs, OTPs, CVV or full card numbers."}
          </p>
          {tpl.fields.map((fl) => (
            <label key={fl.name} className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">
                {fl.label[lang]}
                {fl.required && <span className="text-rose-300"> *</span>}
              </span>
              {fl.type === "textarea" ? (
                <textarea
                  rows={3}
                  maxLength={1500}
                  value={values[fl.name] || ""}
                  placeholder={fl.placeholder}
                  onChange={(e) => setValues((s) => ({ ...s, [fl.name]: e.target.value }))}
                  className={field}
                />
              ) : (
                <input
                  value={values[fl.name] || ""}
                  maxLength={200}
                  placeholder={fl.placeholder}
                  autoComplete={fl.name === "name" ? "name" : fl.name === "phone" ? "tel" : "off"}
                  onChange={(e) => setValues((s) => ({ ...s, [fl.name]: e.target.value }))}
                  className={field}
                />
              )}
            </label>
          ))}
        </form>

        {/* Preview + actions */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-lg font-bold text-white">{hi ? "आपका पत्र" : "Your letter"}</h2>
            <div className="flex rounded-full border border-line p-1" role="group" aria-label={hi ? "पत्र की भाषा" : "Letter language"}>
              {(["en", "hi"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={letterLang === l}
                  onClick={() => setLetterLang(l)}
                  className={`min-h-[36px] rounded-full px-3 text-xs font-semibold ${letterLang === l ? "bg-white/10 text-white" : "text-slate-400"}`}
                >
                  {l === "en" ? "English" : "हिंदी"}
                </button>
              ))}
            </div>
          </div>
          <pre
            id="letter-preview"
            className="mt-3 max-h-[60vh] overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-line bg-[#fbfaf7] p-5 font-sans text-[14px] leading-relaxed text-slate-900 shadow-xl"
          >
            {text}
          </pre>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <button type="button" onClick={copy} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan to-violet px-3 text-sm font-bold text-white">
              <Icon name="file-check" className="h-4 w-4" /> {copied ? (hi ? "कॉपी हुआ" : "Copied!") : hi ? "कॉपी" : "Copy"}
            </button>
            <button type="button" onClick={download} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-line px-3 text-sm font-semibold text-slate-200 hover:border-cyan/50">
              <Icon name="arrow-right" className="h-4 w-4 rotate-90" /> {hi ? "डाउनलोड" : "Download"}
            </button>
            <button type="button" onClick={() => window.print()} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-line px-3 text-sm font-semibold text-slate-200 hover:border-cyan/50">
              <Icon name="inbox" className="h-4 w-4" /> {hi ? "प्रिंट" : "Print"}
            </button>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            {hi
              ? "यह एक सामान्य प्रारूप है, कानूनी सलाह नहीं। अपनी स्थिति के अनुसार बदलें और एक प्रति अपने पास रखें।"
              : "This is a general format, not legal advice. Edit it to fit your situation and keep a signed copy for your records."}
          </p>
        </div>
      </div>
    </div>
  );
}
