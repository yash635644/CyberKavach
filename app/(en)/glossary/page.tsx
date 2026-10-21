import { GlossaryPage, glossaryMeta } from "@/components/pages/ResourcePages";

export const metadata = glossaryMeta("en");

export default function Page() {
  return <GlossaryPage lang="en" />;
}
