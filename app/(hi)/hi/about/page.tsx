import { AboutPage, aboutMeta } from "@/components/pages/InfoPages";

export const metadata = aboutMeta("hi");

export default function Page() {
  return <AboutPage lang="hi" />;
}
