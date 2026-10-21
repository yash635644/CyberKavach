import { LegalPage, legalMeta } from "@/components/pages/InfoPages";

export const metadata = legalMeta("terms", "en");

export default function Page() {
  return <LegalPage lang="en" kind="terms" />;
}
