"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import type { Dictionary } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/site";

/** App-style bottom tab bar for phones & tablets — the primary navigation on small screens. */
export function BottomNav({ lang, t }: { lang: Locale; t: Dictionary["nav"] }) {
  const pathname = usePathname() || "/";
  const neutral = lang === "hi" ? pathname.replace(/^\/hi(?=\/|$)/, "") || "/" : pathname;

  const items = [
    { href: "/", label: t.scan, icon: "scan", match: (p: string) => p === "/" },
    { href: "/scams", label: t.library, icon: "book", match: (p: string) => p.startsWith("/scams") },
    { href: "/help", label: t.sos, icon: "siren", sos: true, match: (p: string) => p === "/help" },
    { href: "/services", label: t.servicesShort, icon: "landmark", match: (p: string) => p.startsWith("/services") || p === "/report" },
    { href: "/quiz", label: t.quiz, icon: "brain", match: (p: string) => p === "/quiz" },
  ];

  return (
    <nav
      aria-label="Quick"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-5">
        {items.map((it) => {
          const active = it.match(neutral);
          if (it.sos) {
            return (
              <li key={it.href} className="flex justify-center">
                <Link
                  href={localePath(lang, it.href)}
                  aria-current={active ? "page" : undefined}
                  className="-mt-5 flex flex-col items-center gap-1"
                >
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/40 ring-4 ring-ink">
                    <span className="pulse-ring absolute inset-0 rounded-full bg-rose-500/40" aria-hidden="true" />
                    <Icon name="siren" className="relative h-6 w-6" />
                  </span>
                  <span className="text-[11px] font-bold text-rose-300">{it.label}</span>
                </Link>
              </li>
            );
          }
          return (
            <li key={it.href}>
              <Link
                href={localePath(lang, it.href)}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-[60px] flex-col items-center justify-center gap-1 px-1 text-[11px] font-medium transition-colors ${
                  active ? "text-cyan" : "text-slate-400 active:text-white"
                }`}
              >
                <span className={`flex h-8 w-12 items-center justify-center rounded-full transition ${active ? "bg-cyan/15" : ""}`}>
                  <Icon name={it.icon} className="h-[22px] w-[22px]" />
                </span>
                <span className="max-w-full truncate">{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
