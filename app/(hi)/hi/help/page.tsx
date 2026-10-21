import { HelpPage, helpMeta } from "@/components/pages/InfoPages";

export const metadata = helpMeta("hi");

export default function Page() {
  return <HelpPage lang="hi" />;
}
