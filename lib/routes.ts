import { scams } from "./content/scams";
import { tools } from "./content/tools";

/** Every indexable, locale-neutral path. Used by the sitemap and llms.txt. */
export const staticPaths = ["/", "/scams", "/scam-alerts", "/glossary", "/services", "/complaint-letter-format", "/bank-fraud-help", "/cyber-security-upsc", "/report", "/help", "/quiz", "/about", "/site-map", "/privacy", "/terms"];

export const allPaths = [staticPaths[0], ...tools.map((t) => `/${t.slug}`), staticPaths[1], ...scams.map((s) => `/scams/${s.slug}`), ...staticPaths.slice(2)];
