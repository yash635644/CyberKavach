import { HomePage } from "@/components/pages/HomePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  lang: "en",
  path: "/",
  title: "Free Scam Checker India – SMS, WhatsApp, Link & UPI | Cyber Kavach",
  description: "Free scam checker for India. Paste any SMS, WhatsApp message, link or screenshot and get an instant AI verdict on KYC, UPI, digital arrest, job and bank fraud — plus 1930 help and every official complaint portal. No login.",
  absoluteTitle: true,
});

export default function Page() {
  return <HomePage lang="en" />;
}
