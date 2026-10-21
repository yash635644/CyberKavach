import { LegalPage, legalMeta } from "@/components/pages/InfoPages";

export const metadata = legalMeta("terms", "hi");

export default function Page() {
  return <LegalPage lang="hi" kind="terms" />;
}
