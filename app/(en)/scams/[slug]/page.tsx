import type { Metadata } from "next";
import { ScamPage } from "@/components/pages/ScamPages";
import { getScam, scams } from "@/lib/content/scams";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return scams.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const scam = getScam(slug);
  if (!scam) return {};
  const c = scam.content["en"];
  return buildMetadata({
    lang: "en",
    path: `/scams/${slug}`,
    title: c.title,
    description: c.answer.length > 158 ? `${c.answer.slice(0, 155).trimEnd()}…` : c.answer,
    type: "article",
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ScamPage lang="en" slug={slug} />;
}
