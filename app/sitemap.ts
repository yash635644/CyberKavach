import type { MetadataRoute } from "next";
import { allPaths } from "@/lib/routes";
import { CONTENT_UPDATED } from "@/lib/content/scams";
import { absoluteUrl, localePath } from "@/lib/site";

const priority = (p: string) => (p === "/" ? 1 : p.startsWith("/scams") || p.endsWith("-checker") || p === "/report" || p === "/help" || p === "/services" ? 0.8 : p === "/privacy" || p === "/terms" ? 0.3 : 0.6);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);
  return allPaths.flatMap((p) => {
    const languages = { "en-IN": absoluteUrl(localePath("en", p)), "hi-IN": absoluteUrl(localePath("hi", p)) };
    return (["en", "hi"] as const).map((lang) => ({
      url: absoluteUrl(localePath(lang, p)),
      lastModified,
      changeFrequency: p === "/" || p.startsWith("/scams") ? ("weekly" as const) : ("monthly" as const),
      priority: lang === "en" ? priority(p) : Math.max(0.3, priority(p) - 0.1),
      alternates: { languages },
    }));
  });
}
