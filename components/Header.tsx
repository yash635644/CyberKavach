"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShieldMark } from "./Logo";
import { Icon } from "./Icon";
import type { Dictionary } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/site";

export type MenuGroup = { title: string; items: { href: string; label: string; icon: string }[] };

export function Header({ lang, t, menuGroups = [] }: { lang: Locale; t: Dictionary["nav"]; menuGroups?: MenuGroup[] }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the full-screen menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const neutral = lang === "hi" ? pathname.replace(/^\/hi(?=\/|$)/, "") || "/" : pathname;
  const otherLang: Locale = lang === "hi" ? "en" : "hi";

  const links = [
    { href: "/#scanner", label: t.scanner, icon: "scan" },
    { href: "/scams", label: t.scams, icon: "book" },
    { href: "/services", label: t.services, icon: "landmark" },
    { href: "/report", label: t.report, icon: "file-check" },
    { href: "/quiz", label: t.quiz, icon: "brain" },
    { href: "/about", label: t.about, icon: "info" },
  ];

  const isActive = (href: string) => !href.includes("#") && (neutral === href || neutral.startsWith(`${href}/`));

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 ${
        scrolled || open ? "border-b border-line bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-cyan focus:px-3 focus:py-2 focus:text-ink">
        {t.skip}
      </a>
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6" aria-label="Main">
        <Link href={localePath(lang, "/")} className="flex shrink-0 items-center gap-2" aria-label="CyberKavach home" onClick={() => setOpen(false)}>
          <ShieldMark className="h-8 w-8" />
          <span className="font-display text-[17px] font-bold tracking-tight text-white sm:text-lg">
            Cyber<span className="text-cyan">Kavach</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={localePath(lang, l.href)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white ${
                  isActive(l.href) ? "bg-white/5 text-white" : "text-slate-300"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={localePath(otherLang, neutral)}
            hrefLang={otherLang === "hi" ? "hi-IN" : "en-IN"}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-3 text-sm font-medium text-slate-200 transition hover:border-cyan/60 hover:text-white"
          >
            <Icon name="languages" className="h-4 w-4 text-cyan" />
            {/* System font: avoids downloading the Devanagari web font on English pages just for this label */}
            <span style={{ fontFamily: "system-ui, sans-serif" }}>{t.switchLang}</span>
          </a>
          <Link
            href={localePath(lang, "/help")}
            className="hidden h-10 items-center rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-4 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:brightness-110 lg:inline-flex"
          >
            {t.help}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-slate-200 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "x" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </header>

      {/* Full-screen menu sheet (phones & tablets). Rendered outside <header>: its backdrop-filter
          would otherwise become the containing block and clip this fixed panel. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="sheet-in fixed inset-x-0 bottom-0 top-[calc(3.5rem+env(safe-area-inset-top))] z-40 overflow-y-auto bg-ink px-4 pb-32 pt-4 sm:top-[calc(4rem+env(safe-area-inset-top))] lg:hidden"
      >
        <ul className="mx-auto grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
          {[...links, { href: "/help", label: t.help, icon: "siren" }].map((l) => (
            <li key={l.href}>
              <Link
                href={localePath(lang, l.href)}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`flex h-full min-h-[92px] flex-col justify-between gap-3 rounded-2xl border p-4 transition active:scale-[0.98] ${
                  l.href === "/help" ? "border-rose-500/40 bg-rose-500/10 text-rose-100" : isActive(l.href) ? "border-cyan/40 bg-cyan/10 text-white" : "border-line bg-white/[0.03] text-slate-100"
                }`}
              >
                <Icon name={l.icon} className={`h-6 w-6 ${l.href === "/help" ? "text-rose-400" : "text-cyan"}`} />
                <span className="text-[15px] font-semibold leading-tight">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="tel:1930"
          className="mx-auto mt-4 flex max-w-xl items-center justify-between rounded-2xl bg-gradient-to-r from-rose-600 to-orange-500 p-4 text-white"
        >
          <span className="text-sm font-semibold">{lang === "hi" ? "साइबर ठगी हेल्पलाइन" : "Cyber fraud helpline"}</span>
          <span className="flex items-center gap-2 font-display text-2xl font-extrabold">
            <Icon name="phone" className="h-5 w-5" /> 1930
          </span>
        </a>
        {menuGroups.map((g) => (
          <div key={g.title} className="mx-auto mt-6 max-w-xl">
            <p className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{g.title}</p>
            <ul className="mt-2 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white/[0.02]">
              {g.items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={localePath(lang, it.href)}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(it.href) ? "page" : undefined}
                    className="group flex min-h-[52px] items-center gap-3 px-4 text-[15px] text-slate-200 active:bg-white/5"
                  >
                    <Icon name={it.icon} className="h-5 w-5 shrink-0 text-cyan" />
                    <span className="min-w-0 flex-1 leading-snug">{it.label}</span>
                    <Icon name="arrow-right" className="h-4 w-4 shrink-0 text-slate-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <ul className="mx-auto mt-6 flex max-w-xl flex-wrap gap-x-5 gap-y-2 px-1 text-sm text-slate-400">
          <li>
            <Link href={localePath(lang, "/privacy")} onClick={() => setOpen(false)}>
              {lang === "hi" ? "गोपनीयता" : "Privacy"}
            </Link>
          </li>
          <li>
            <Link href={localePath(lang, "/terms")} onClick={() => setOpen(false)}>
              {lang === "hi" ? "शर्तें" : "Terms"}
            </Link>
          </li>
          <li>
            <Link href={localePath(lang, "/about#feedback")} onClick={() => setOpen(false)}>
              {lang === "hi" ? "सुझाव" : "Feedback"}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
