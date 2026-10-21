"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { checkPhone, checkUpi, type IdResult } from "@/lib/idcheck";
import type { Locale } from "@/lib/site";

const LEVEL_STYLE = {
  high: { box: "border-danger/40 bg-danger/10", text: "text-rose-300", icon: "alert" },
  medium: { box: "border-warn/40 bg-warn/10", text: "text-amber-300", icon: "alert" },
  low: { box: "border-safe/40 bg-safe/10", text: "text-green-300", icon: "badge-check" },
  info: { box: "border-cyan/30 bg-cyan/10", text: "text-cyan", icon: "info" },
} as const;

export function IdChecker({ kind, lang }: { kind: "upi" | "phone"; lang: Locale }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<IdResult | null>(null);
  const hi = lang === "hi";

  const copy =
    kind === "upi"
      ? {
          label: hi ? "UPI ID डालें" : "Enter the UPI ID",
          placeholder: "e.g. refund.support@ybl",
          button: hi ? "UPI ID जांचें" : "Check UPI ID",
          official: [
            { href: "https://cybercrime.gov.in/Webform/suspect_search_repository.aspx", label: hi ? "I4C संदिग्ध सूची में खोजें" : "Search I4C suspect registry" },
            { href: "https://siportal.sebi.gov.in/intermediary/sebi-check", label: hi ? "SEBI Check (निवेश भुगतान)" : "SEBI Check (investment payments)" },
          ],
        }
      : {
          label: hi ? "फ़ोन नंबर डालें" : "Enter the phone number",
          placeholder: "e.g. +92 300 1234567 or 1600123456",
          button: hi ? "नंबर जांचें" : "Check number",
          official: [
            { href: "https://cybercrime.gov.in/Webform/suspect_search_repository.aspx", label: hi ? "I4C संदिग्ध सूची में खोजें" : "Search I4C suspect registry" },
            { href: "https://sancharsaathi.gov.in/sfc/", label: hi ? "चक्षु पर फ्रॉड कॉल की शिकायत" : "Report fraud call on Chakshu" },
          ],
        };

  function run(e?: React.FormEvent) {
    e?.preventDefault();
    if (!value.trim()) return;
    setResult(kind === "upi" ? checkUpi(value, lang) : checkPhone(value, lang));
  }

  const style = result ? LEVEL_STYLE[result.level] : null;

  return (
    <div className="glow-border glass rounded-3xl p-4 sm:p-6">
      <form onSubmit={run} className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="mb-2 block text-sm font-semibold text-slate-300">{copy.label}</span>
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setResult(null);
            }}
            inputMode={kind === "phone" ? "tel" : "email"}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={120}
            placeholder={copy.placeholder}
            className="h-14 w-full rounded-2xl border border-line bg-ink/70 px-4 font-mono text-base text-slate-100 placeholder:text-slate-400 focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/20"
          />
        </label>
        <button
          type="submit"
          className="btn-shine inline-flex h-14 items-center justify-center gap-2 self-end rounded-2xl bg-gradient-to-r from-cyan to-violet px-6 font-display font-bold text-white sm:w-auto max-sm:w-full"
        >
          <Icon name="search-check" className="h-5 w-5" /> {copy.button}
        </button>
      </form>

      {result && style && (
        <div className="pop mt-5" aria-live="polite">
          <p className={`flex items-center gap-2 rounded-2xl border px-4 py-3 font-semibold ${style.box} ${style.text}`}>
            <Icon name={style.icon} className="h-5 w-5 shrink-0" /> {result.summary}
          </p>
          {result.findings.length > 0 && (
            <ul className="mt-3 space-y-2">
              {result.findings.map((f, i) => (
                <li key={i} className="flex gap-3 rounded-xl border border-line bg-white/[0.02] px-3.5 py-2.5 text-sm text-slate-200">
                  <Icon name={LEVEL_STYLE[f.level].icon} className={`mt-0.5 h-4 w-4 shrink-0 ${LEVEL_STYLE[f.level].text}`} />
                  <span className="min-w-0 break-words">{f.text}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-sm font-semibold text-slate-300">{hi ? "आधिकारिक रूप से जांचें:" : "Verify officially:"}</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {copy.official.map((o) => (
              <a
                key={o.href}
                href={o.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-between gap-2 rounded-xl border border-line px-4 text-sm font-semibold text-cyan transition hover:border-cyan/50"
              >
                {o.label} <Icon name="external" className="h-4 w-4 shrink-0" />
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">
            {hi
              ? "यह जांच फ़ॉर्मेट और पैटर्न पर आधारित है, किसी डेटाबेस पर नहीं। हम आपका डाला गया नंबर/ID सेव नहीं करते।"
              : "This check is based on format and patterns, not a database lookup. Nothing you enter is stored or sent anywhere."}
          </p>
        </div>
      )}
    </div>
  );
}
