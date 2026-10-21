"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { explainQr, type QrResult } from "@/lib/qr";
import type { Locale } from "@/lib/site";

const LEVEL_STYLE = {
  high: { box: "border-danger/40 bg-danger/10", text: "text-rose-300", icon: "alert" },
  medium: { box: "border-warn/40 bg-warn/10", text: "text-amber-300", icon: "alert" },
  low: { box: "border-safe/40 bg-safe/10", text: "text-green-300", icon: "badge-check" },
  info: { box: "border-cyan/30 bg-cyan/10", text: "text-cyan", icon: "info" },
} as const;

/** Decodes a QR code from an image entirely on the device (jsQR is loaded only when needed). */
async function decodeQr(file: File): Promise<string | null> {
  const { default: jsQR } = await import("jsqr");
  const bitmap = await createImageBitmap(file);
  for (const maxSide of [1600, 900, 500]) {
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.drawImage(bitmap, 0, 0, w, h);
    const img = ctx.getImageData(0, 0, w, h);
    const code = jsQR(img.data, w, h, { inversionAttempts: "attemptBoth" });
    if (code?.data) return code.data;
  }
  return null;
}

export function QrChecker({ lang }: { lang: Locale }) {
  const hi = lang === "hi";
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QrResult | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handle = useCallback(
    async (file?: File | null) => {
      if (!file || !file.type.startsWith("image/")) return;
      setError(null);
      setResult(null);
      setBusy(true);
      setPreview((old) => {
        if (old) URL.revokeObjectURL(old);
        return URL.createObjectURL(file);
      });
      try {
        const data = await decodeQr(file);
        if (!data) setError(hi ? "इस तस्वीर में QR कोड नहीं पढ़ा जा सका। QR को पास से, सीधा और साफ़ रोशनी में फ़ोटो लें।" : "Couldn't read a QR code in this image. Take a closer, straight, well-lit photo of the QR.");
        else setResult(explainQr(data, lang));
      } catch {
        setError(hi ? "तस्वीर खोलने में समस्या हुई। दूसरी तस्वीर आज़माएं।" : "Couldn't open this image. Try another one.");
      } finally {
        setBusy(false);
      }
    },
    [hi, lang],
  );

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith("image/"));
      if (item) handle(item.getAsFile());
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handle]);

  const style = result ? LEVEL_STYLE[result.level] : null;

  return (
    <div className="glow-border glass rounded-3xl p-4 sm:p-6">
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
          handle(e.dataTransfer.files?.[0]);
        }}
        className={`flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition ${
          dragging ? "border-cyan bg-cyan/5" : "border-line bg-ink/50 hover:border-cyan/50"
        }`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="max-h-56 rounded-xl object-contain" />
        ) : (
          <Icon name="grid" className="h-10 w-10 text-cyan" />
        )}
        <span className="text-sm font-semibold text-slate-200">
          {busy ? (hi ? "QR पढ़ा जा रहा है…" : "Reading QR…") : hi ? "QR की फ़ोटो लें या तस्वीर चुनें" : "Take a photo of the QR or choose an image"}
        </span>
        <span className="text-xs text-slate-400">{hi ? "आपके फ़ोन पर ही पढ़ा जाता है — कहीं अपलोड नहीं होता" : "Read on your phone only — nothing is uploaded"}</span>
      </button>
      {/* capture lets phones open the camera app directly; no live camera permission is used */}
      <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handle(e.target.files?.[0])} />

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      )}

      {result && style && (
        <div className="pop mt-5" aria-live="polite">
          <p className={`flex items-center gap-2 rounded-2xl border px-4 py-3 font-semibold ${style.box} ${style.text}`}>
            <Icon name={style.icon} className="h-5 w-5 shrink-0" /> {result.headline}
          </p>
          <dl className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line">
            {result.details.map((d) => (
              <div key={d.label} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:gap-4">
                <dt className="shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:w-40">{d.label}</dt>
                <dd className="min-w-0 break-all font-mono text-sm text-slate-100">{d.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-3 space-y-2">
            {result.findings.map((f, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-line bg-white/[0.02] px-3.5 py-2.5 text-sm text-slate-200">
                <Icon name={LEVEL_STYLE[f.level].icon} className={`mt-0.5 h-4 w-4 shrink-0 ${LEVEL_STYLE[f.level].text}`} />
                <span className="min-w-0 break-words">{f.text}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://cybercrime.gov.in/Webform/suspect_search_repository.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold text-cyan transition hover:border-cyan/50"
          >
            {hi ? "UPI ID को I4C संदिग्ध सूची में खोजें" : "Search the UPI ID in I4C's suspect registry"} <Icon name="external" className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}
