import type { Metadata } from "next";
import { ToolPage, toolMeta } from "@/components/pages/ToolPage";
import { tools } from "@/lib/content/tools";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((t) => ({ tool: t.slug }));
}

type Props = { params: Promise<{ tool: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool } = await params;
  return toolMeta(tool, "hi");
}

export default async function Page({ params }: Props) {
  const { tool } = await params;
  return <ToolPage slug={tool} lang="hi" />;
}
