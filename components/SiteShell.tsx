import type { Metadata, Viewport } from "next";
import { Header, type MenuGroup } from "./Header";
import { PAGES, toolItems } from "@/lib/nav";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";
import { founderLd, graph, organizationLd, websiteLd } from "@/lib/seo";
import { BottomNav } from "./BottomNav";
import { fontVars } from "@/lib/fonts";
import { getDictionary } from "@/lib/i18n";
import { SITE_NAME, SITE_URL, CREATOR, type Locale } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // lets the bottom nav respect iPhone safe areas
};

export function rootMetadata(lang: Locale): Metadata {
  const title =
    lang === "hi"
      ? "साइबर कवच — मुफ़्त AI स्कैम चेकर | फ्रॉड मैसेज और लिंक जांचें"
      : "Cyber Kavach — Free AI Scam Checker for India | Check SMS, Links & Screenshots";
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${lang === "hi" ? "साइबर कवच" : SITE_NAME}` },
    applicationName: SITE_NAME,
    authors: [{ name: CREATOR }],
    creator: CREATOR,
    publisher: SITE_NAME,
    category: "security",
    formatDetection: { telephone: false },
    appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "black-translucent" },
    verification: {
      // Free: add these after verifying in Google Search Console / Bing Webmaster Tools
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
    },
  };
}

export function SiteShell({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  const t = getDictionary(lang);
  // Built on the server so the client menu does not bundle the full content library
  const menuGroups: MenuGroup[] = [
    { title: lang === "hi" ? "मुफ़्त चेकर" : "Free checkers", items: toolItems.map((i) => ({ href: i.href, label: i.label[lang], icon: i.icon })) },
    { title: lang === "hi" ? "सहायता" : "Get help", items: [PAGES.letters, PAGES.bank].map((i) => ({ href: i.href, label: i.label[lang], icon: i.icon })) },
    { title: lang === "hi" ? "सीखें" : "Learn", items: [PAGES.alerts, PAGES.glossary, PAGES.upsc, PAGES.sitemap].map((i) => ({ href: i.href, label: i.label[lang], icon: i.icon })) },
  ];
  return (
    <html lang={lang} className={fontVars}>
      <body className="min-h-dvh">
        {/* Site-wide entities: every page can reference the publisher (logo) and founder by @id */}
        <JsonLd data={graph(organizationLd(), websiteLd(lang), founderLd())} />
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="bg-grid absolute inset-0" />
          <div className="aurora -left-32 -top-40 h-[28rem] w-[28rem] bg-cyan/40" />
          <div className="aurora -right-40 top-20 h-[32rem] w-[32rem] bg-violet/40 [animation-delay:-5s]" />
          <div className="aurora bottom-[-12rem] left-1/3 h-[26rem] w-[26rem] bg-sky/25 [animation-delay:-9s]" />
        </div>
        <Header lang={lang} t={t.nav} menuGroups={menuGroups} />
        <main id="main" className="pt-[calc(3.5rem+env(safe-area-inset-top))] sm:pt-[calc(4rem+env(safe-area-inset-top))]">
          {children}
        </main>
        <Footer lang={lang} />
        <BottomNav lang={lang} t={t.nav} />
      </body>
    </html>
  );
}
