"use client";

import { useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/site";

type Labels = { name: string; email: string; message: string; submit: string; sending: string; ok: string; fail: string };

export function FeedbackForm({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "fail">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else setStatus("fail");
    } catch {
      setStatus("fail");
    }
  }

  const field = "w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-slate-100 placeholder:text-slate-400 focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/20";

  return (
    <form onSubmit={onSubmit} action={FORMSPREE_ENDPOINT} method="POST" className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">{labels.name}</span>
          <input name="name" required maxLength={100} placeholder={labels.name} className={field} autoComplete="name" />
        </label>
        <label className="block">
          <span className="sr-only">{labels.email}</span>
          <input name="email" type="email" required maxLength={200} placeholder={labels.email} className={field} autoComplete="email" />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">{labels.message}</span>
        <textarea name="message" required maxLength={3000} rows={4} placeholder={labels.message} className={field} />
      </label>
      {/* Honeypot field to reduce spam (Formspree convention) */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-gradient-to-r from-cyan to-violet px-6 py-3 font-semibold text-white transition hover:brightness-110 disabled:opacity-70"
      >
        {status === "sending" ? labels.sending : labels.submit}
      </button>
      {status === "ok" && <p role="status" className="text-center text-sm text-green-300">{labels.ok}</p>}
      {status === "fail" && <p role="alert" className="text-center text-sm text-rose-300">{labels.fail}</p>}
    </form>
  );
}
