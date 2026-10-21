import { QuizPage, quizMeta } from "@/components/pages/InfoPages";

export const metadata = quizMeta("hi");

export default function Page() {
  return <QuizPage lang="hi" />;
}
