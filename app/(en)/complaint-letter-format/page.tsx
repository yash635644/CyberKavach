import { LettersPage, lettersMeta } from "@/components/pages/ResourcePages";

export const metadata = lettersMeta("en");

export default function Page() {
  return <LettersPage lang="en" />;
}
