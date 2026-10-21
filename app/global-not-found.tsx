import "./globals.css";
import type { Metadata } from "next";
import { fontVars } from "@/lib/fonts";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Page not found | Cyber Kavach",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVars}>
      <body className="flex min-h-dvh items-center justify-center px-6">
        <div className="bg-grid pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
        <main className="max-w-md text-center">
          <p className="font-mono text-sm text-cyan">404</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-white">This page doesn&apos;t exist</h1>
          <p className="mt-3 text-slate-400">
            If someone sent you this link, be careful — it may not be from Cyber Kavach. / यह पेज मौजूद नहीं है।
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full bg-gradient-to-r from-cyan to-violet px-5 py-2.5 font-semibold text-white">
              Check a message
            </Link>
            <Link href="/hi" className="rounded-full border border-line px-5 py-2.5 font-semibold text-slate-200">
              हिन्दी
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
