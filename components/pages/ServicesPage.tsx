import Link from "next/link";
import { ExploreMore } from "../ExploreMore";
import { Breadcrumbs } from "../Breadcrumbs";
import { JsonLd } from "../JsonLd";
import { Icon } from "../Icon";
import { NotGovtNotice } from "../NotGovtNotice";
import { ServicesDirectory } from "../ServicesDirectory";
import { UpdatesGrid } from "../UpdatesGrid";
import { getDictionary } from "@/lib/i18n";
import { resources, serviceCategories } from "@/lib/content/resources";
import { CONTENT_UPDATED } from "@/lib/content/scams";
import { absoluteUrl, helplines, localePath, type Locale } from "@/lib/site";
import { breadcrumbLd, buildMetadata, faqLd, graph } from "@/lib/seo";

const copy = {
  en: {
    crumb: "Govt Cyber Services",
    title: "Government Cyber Safety Services in India (2026 Directory)",
    desc: "Every official Indian government cyber service in one place: 1930, cybercrime.gov.in, Sanchar Saathi, Chakshu, SEBI Check, e-Zero FIR, RBI Ombudsman, CEIR, Cyber Swachhta Kendra and more.",
    intro: "All official portals, apps and helplines to report cyber fraud, verify numbers and UPI IDs, protect your identity and devices, and stay aware — verified and explained in plain language.",
    helplines: "Emergency helplines",
    faq: [
      {
        q: "Which government app should I use to report fraud calls and SMS?",
        a: "Use the Sanchar Saathi app or website (sancharsaathi.gov.in) from the Department of Telecommunications. Its Chakshu feature lets you report suspected fraud calls, SMS and WhatsApp messages. If you lost money, call 1930 or file on cybercrime.gov.in instead.",
      },
      {
        q: "How can I check if a UPI ID or phone number is linked to fraud?",
        a: "Search the number, UPI ID or bank account in I4C's suspect registry on cybercrime.gov.in. For investment payments, verify the UPI ID or account on SEBI Check — registered brokers and mutual funds use UPI IDs ending in @valid.",
      },
      {
        q: "How do I know a call is really from my bank?",
        a: "Under TRAI's framework, service and transaction calls from banks and other RBI, SEBI, IRDAI or PFRDA-regulated entities come from 1600-series numbers, while promotional calls use the 140 series. A 'bank officer' calling from an ordinary 10-digit mobile number is a red flag.",
      },
    ],
  },
  hi: {
    crumb: "सरकारी साइबर सेवाएं",
    title: "भारत की सरकारी साइबर सुरक्षा सेवाएं (2026 सूची)",
    desc: "भारत की हर आधिकारिक सरकारी साइबर सेवा एक जगह: 1930, cybercrime.gov.in, संचार साथी, चक्षु, SEBI Check, e-ज़ीरो FIR, RBI लोकपाल, CEIR, साइबर स्वच्छता केंद्र और अधिक।",
    intro: "साइबर ठगी की शिकायत, नंबर और UPI ID की जांच, पहचान और डिवाइस की सुरक्षा, और जागरूकता के लिए सभी आधिकारिक पोर्टल, ऐप और हेल्पलाइन — जांचे हुए और आसान भाषा में।",
    helplines: "आपातकालीन हेल्पलाइन",
    faq: [
      {
        q: "फ्रॉड कॉल और SMS की शिकायत के लिए कौन-सा सरकारी ऐप इस्तेमाल करें?",
        a: "दूरसंचार विभाग का संचार साथी ऐप या वेबसाइट (sancharsaathi.gov.in) इस्तेमाल करें। इसकी चक्षु सुविधा से संदिग्ध फ्रॉड कॉल, SMS और WhatsApp मैसेज की शिकायत होती है। पैसे गए हों तो 1930 पर कॉल करें या cybercrime.gov.in पर शिकायत करें।",
      },
      {
        q: "कैसे जांचें कि कोई UPI ID या फ़ोन नंबर धोखाधड़ी से जुड़ा है?",
        a: "cybercrime.gov.in पर I4C की संदिग्ध सूची में नंबर, UPI ID या बैंक खाता खोजें। निवेश भुगतान के लिए SEBI Check पर UPI ID या खाता जांचें — रजिस्टर्ड ब्रोकर और म्यूचुअल फ़ंड @valid वाली UPI ID इस्तेमाल करते हैं।",
      },
      {
        q: "कैसे पता करें कि कॉल सच में मेरे बैंक से है?",
        a: "TRAI के नियमों के अनुसार बैंक और RBI, SEBI, IRDAI या PFRDA से विनियमित संस्थाओं की सेवा और लेन-देन कॉल 1600-सीरीज़ नंबरों से आते हैं, और प्रचार कॉल 140 सीरीज़ से। साधारण 10 अंकों के मोबाइल नंबर से 'बैंक अधिकारी' का कॉल ख़तरे का संकेत है।",
      },
    ],
  },
};

export const servicesMeta = (lang: Locale) => buildMetadata({ lang, path: "/services", title: copy[lang].title, description: copy[lang].desc });

export function ServicesPage({ lang }: { lang: Locale }) {
  const c = copy[lang];
  const t = getDictionary(lang);
  const s = t.sections;

  const items = resources.map((r) => ({
    id: r.id,
    url: r.url,
    category: r.category,
    icon: r.icon,
    org: r.org,
    name: r.name[lang],
    desc: r.desc[lang],
    phone: r.phone,
    isNew: r.isNew,
    android: r.app?.android,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: t.common.home, path: localePath(lang, "/") },
            { name: c.crumb, path: localePath(lang, "/services") },
          ]),
          {
            "@type": "ItemList",
            name: c.title,
            url: absoluteUrl(localePath(lang, "/services")),
            dateModified: CONTENT_UPDATED,
            itemListElement: resources.map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "GovernmentService",
                name: r.name[lang],
                description: r.desc[lang],
                url: r.url,
                provider: { "@type": "GovernmentOrganization", name: r.org },
                areaServed: { "@type": "Country", name: "India" },
                ...(r.phone ? { availableChannel: { "@type": "ServiceChannel", servicePhone: { "@type": "ContactPoint", telephone: r.phone } } } : {}),
              },
            })),
          },
          faqLd(c.faq),
        )}
      />
      <Breadcrumbs items={[{ name: t.common.home, href: localePath(lang, "/") }, { name: c.crumb }]} />
      <header className="fade-up mt-5 max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{c.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg">{c.intro}</p>
      </header>
      <NotGovtNotice lang={lang} className="mt-5 max-w-3xl" />

      {/* Helplines — horizontally swipeable on phones */}
      <section className="mt-8" aria-labelledby="hl">
        <h2 id="hl" className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          {c.helplines}
        </h2>
        <ul className="no-scrollbar -mx-4 mt-3 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
          {helplines.map((h) => (
            <li key={h.number} className="shrink-0 snap-start">
              <a
                href={`tel:${h.tel}`}
                className={`flex w-36 flex-col rounded-2xl border p-3.5 transition active:scale-[0.98] sm:w-auto ${h.primary ? "border-rose-500/40 bg-rose-500/10" : "border-line bg-white/[0.03]"}`}
              >
                <span className={`font-display text-2xl font-extrabold tabular-nums ${h.primary ? "text-rose-400" : "text-cyan"}`}>{h.number}</span>
                <span className="mt-1 text-xs leading-snug text-slate-300">{h.label[lang]}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <ServicesDirectory
          items={items}
          categories={serviceCategories.map((cat) => ({ id: cat.id, icon: cat.icon, title: cat.title[lang] }))}
          labels={{ search: s.searchServices, all: s.all, noResults: s.noResults, open: s.openSite, getApp: s.getApp, newBadge: s.newBadge, call: t.common.call }}
        />
      </section>

      <section className="mt-16">
        <h2 className="reveal font-display text-2xl font-bold text-white sm:text-3xl">{s.updatesTitle}</h2>
        <p className="reveal mt-2 text-slate-400">{s.updatesSub}</p>
        <div className="mt-6">
          <UpdatesGrid lang={lang} />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-white">FAQ</h2>
        <div className="mt-5 space-y-3">
          {c.faq.map((f) => (
            <details key={f.q} className="glass group rounded-2xl px-5 py-4">
              <summary className="flex min-h-[28px] items-center justify-between gap-4 font-semibold text-white">
                <h3 className="text-base">{f.q}</h3>
                <Icon name="chevron-down" className="chev h-5 w-5 shrink-0 text-slate-400 transition" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
        <Link prefetch={false} href={localePath(lang, "/report")} className="mt-8 inline-flex items-center gap-2 font-semibold text-cyan">
          {t.nav.report} <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </section>
      <ExploreMore lang={lang} page="services" />
    </div>
  );
}
