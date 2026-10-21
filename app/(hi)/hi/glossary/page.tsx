import { GlossaryPage, glossaryMeta } from "@/components/pages/ResourcePages";

export const metadata = glossaryMeta("hi");

export default function Page() {
  return <GlossaryPage lang="hi" />;
}
