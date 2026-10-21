import { SiteMapPage, siteMapMeta } from "@/components/pages/SiteMapPage";

export const metadata = siteMapMeta("en");

export default function Page() {
  return <SiteMapPage lang="en" />;
}
