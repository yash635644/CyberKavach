import { ScamsIndexPage } from "@/components/pages/ScamPages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  lang: "hi",
  path: "/scams",
  title: "भारत में ऑनलाइन स्कैम: आम धोखाधड़ी की पूरी गाइड (2026)",
  description: "भारत में डिजिटल अरेस्ट, UPI, KYC, पार्ट-टाइम जॉब, निवेश, कूरियर, लोन ऐप और अन्य स्कैम कैसे होते हैं — संकेत, उदाहरण और शिकायत कहां करें।",
});

export default function Page() {
  return <ScamsIndexPage lang="hi" />;
}
