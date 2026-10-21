import { LettersPage, lettersMeta } from "@/components/pages/ResourcePages";

export const metadata = lettersMeta("hi");

export default function Page() {
  return <LettersPage lang="hi" />;
}
