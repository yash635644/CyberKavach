import { ogCard } from "@/lib/og";
import { allOgParams, ogText } from "@/lib/og-content";

// Every share card is rendered once at build time and served from the CDN — zero runtime cost.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allOgParams();
}

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string; key: string }> }) {
  const { lang, key } = await params;
  // The OG renderer (Satori) cannot shape Devanagari (matras/conjuncts break), so Hindi pages share the
  // English card with a "Hindi version" badge. The preview's title/description text stays in Hindi.
  const text = ogText("en", key) ?? ogText("en", "home")!;
  return ogCard({ ...text, badge: lang === "hi" ? "Hindi version" : undefined });
}
