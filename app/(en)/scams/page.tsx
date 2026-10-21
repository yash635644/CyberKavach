import { ScamsIndexPage } from "@/components/pages/ScamPages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  lang: "en",
  path: "/scams",
  title: "Online Scams in India: Complete Guide to Common Frauds (2026)",
  description: "How digital arrest, UPI, KYC, part-time job, investment, courier, loan app and other scams work in India — red flags, examples, and where to report.",
});

export default function Page() {
  return <ScamsIndexPage lang="en" />;
}
