// Notify Bing / Yandex / other IndexNow engines about every URL in the live sitemap.
// Usage (after each deploy):  npm run indexnow
// Free; ChatGPT search and Copilot use Bing's index, so this helps AI visibility too.
import { readdirSync } from "node:fs";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://cyber-kavach.vercel.app").replace(/\/$/, "");
const keyFile = readdirSync(new URL("../public/", import.meta.url)).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("IndexNow key file missing in /public");
const key = keyFile.replace(".txt", "");

const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("No URLs found in sitemap");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation: `${SITE}/${keyFile}`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${res.status}`);
