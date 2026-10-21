import "../globals.css";
import { SiteShell, rootMetadata } from "@/components/SiteShell";

export { viewport } from "@/components/SiteShell";
export const metadata = rootMetadata("hi");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="hi">{children}</SiteShell>;
}
