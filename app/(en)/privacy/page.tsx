import { LegalPage, legalMeta } from "@/components/pages/InfoPages";

export const metadata = legalMeta("privacy", "en");

export default function Page() {
  return <LegalPage lang="en" kind="privacy" />;
}
