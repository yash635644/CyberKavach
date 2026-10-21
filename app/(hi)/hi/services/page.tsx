import { ServicesPage, servicesMeta } from "@/components/pages/ServicesPage";

export const metadata = servicesMeta("hi");

export default function Page() {
  return <ServicesPage lang="hi" />;
}
