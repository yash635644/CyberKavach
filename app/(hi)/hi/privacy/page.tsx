import { LegalPage, legalMeta } from "@/components/pages/InfoPages";

export const metadata = legalMeta("privacy", "hi");

export default function Page() {
  return <LegalPage lang="hi" kind="privacy" />;
}
