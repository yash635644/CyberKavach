import { SiteMapPage, siteMapMeta } from "@/components/pages/SiteMapPage";

export const metadata = siteMapMeta("hi");

export default function Page() {
  return <SiteMapPage lang="hi" />;
}
