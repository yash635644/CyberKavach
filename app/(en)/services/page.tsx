import { ServicesPage, servicesMeta } from "@/components/pages/ServicesPage";

export const metadata = servicesMeta("en");

export default function Page() {
  return <ServicesPage lang="en" />;
}
