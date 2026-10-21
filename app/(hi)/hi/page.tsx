import { HomePage } from "@/components/pages/HomePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  lang: "hi",
  path: "/",
  title: "फ्रॉड मैसेज चेकर – SMS, WhatsApp, लिंक, UPI जांचें | साइबर कवच",
  description: "भारत के लिए मुफ़्त स्कैम चेकर। कोई भी SMS, WhatsApp मैसेज, लिंक या स्क्रीनशॉट पेस्ट करें और KYC, UPI, डिजिटल अरेस्ट, जॉब और बैंक फ्रॉड पर तुरंत AI नतीजा पाएं — साथ में 1930 सहायता और सभी आधिकारिक शिकायत पोर्टल।",
  absoluteTitle: true,
});

export default function Page() {
  return <HomePage lang="hi" />;
}
