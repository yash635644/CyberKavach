import { Icon } from "./Icon";
import type { Locale } from "@/lib/site";

const FEED = "https://gathered.pages.dev/feed.xml";
// Whole-word matches only (e.g. "upi" must not match "stupid")
const KEYWORDS =
  /\b(cyber\w*|scam\w*|fraud\w*|phishing|hack(ed|er|ers|ing)?|ransomware|malware|digital arrest|upi|otp|deepfakes?|data breach|cert-in|i4c|sanchar saathi|online cheating|sextortion|mule accounts?)\b/i;

type Item = { title: string; link: string; date: string };

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

async function getCyberNews(limit: number): Promise<Item[]> {
  try {
    // Re-fetched at most every 6 hours (ISR) — free and fast; failures just hide the strip
    const res = await fetch(FEED, { next: { revalidate: 21600 }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => {
      const pick = (tag: string) => decode(m[1].match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1] ?? "");
      return { title: pick("title"), link: pick("link"), date: pick("pubDate"), description: pick("description") };
    });
    return items
      .filter((i) => i.link.startsWith("https://gathered.pages.dev/") && KEYWORDS.test(`${i.title} ${i.description}`))
      .slice(0, limit)
      .map(({ title, link, date }) => ({ title, link, date }));
  } catch {
    return [];
  }
}

/** Live cyber-crime headlines from the sister project Gathered (gathered.pages.dev). */
export async function CyberNews({ lang, limit = 4 }: { lang: Locale; limit?: number }) {
  const items = await getCyberNews(limit);
  const hi = lang === "hi";
  return (
    <section aria-labelledby="cyber-news" className="glass rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 id="cyber-news" className="flex items-center gap-2 font-display text-lg font-bold text-white">
          <span className="relative flex h-2.5 w-2.5">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-rose-400" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-400" />
          </span>
          {hi ? "ताज़ा साइबर ठगी ख़बरें" : "Latest cyber-fraud news"}
        </h2>
        <span className="text-xs text-slate-400">
          {hi ? "स्रोत" : "via"}{" "}
          <a href="https://gathered.pages.dev" target="_blank" rel="noopener" className="font-semibold text-slate-300 hover:text-cyan">
            Gathered
          </a>
        </span>
      </div>
      {items.length ? (
        <ul className="mt-4 divide-y divide-line">
          {items.map((n) => (
            <li key={n.link}>
              <a href={n.link} target="_blank" rel="noopener" className="group flex min-h-[48px] items-start gap-3 py-3">
                <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium leading-snug text-slate-200 group-hover:text-cyan">{n.title}</span>
                  {n.date && (
                    <time className="mt-0.5 block text-xs text-slate-400" dateTime={new Date(n.date).toISOString()}>
                      {new Date(n.date).toLocaleDateString(hi ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </time>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-slate-400">
          {hi ? "रोज़ की ख़बरें और करेंट अफ़ेयर्स " : "Daily news and current affairs on "}
          <a href="https://gathered.pages.dev/category/technology" target="_blank" rel="noopener" className="font-semibold text-cyan hover:underline">
            Gathered
          </a>
          {hi ? " पर पढ़ें।" : "."}
        </p>
      )}
    </section>
  );
}
