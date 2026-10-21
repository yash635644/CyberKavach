import { CONTENT_UPDATED, scams } from "@/lib/content/scams";
import { homeFaq } from "@/lib/content/faq";
import { resources } from "@/lib/content/resources";
import { helplines, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

// Full plain-text version of the guides so AI assistants can quote accurately and cite the source page.
export function GET() {
  const scamText = scams
    .map((s) => {
      const c = s.content.en;
      return `## ${c.name}
Source: ${absoluteUrl(`/scams/${s.slug}`)}

${c.answer}

### How it works
${c.howItWorks.map((x, i) => `${i + 1}. ${x}`).join("\n")}

### Red flags
${c.redFlags.map((x) => `- ${x}`).join("\n")}

### What to do
${c.whatToDo.map((x, i) => `${i + 1}. ${x}`).join("\n")}

### Example message
"${c.example}"

### FAQ
${c.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}
`;
    })
    .join("\n---\n\n");

  const body = `# Cyber Kavach — Complete Scam Safety Guide for India
Last reviewed: ${CONTENT_UPDATED}
Website: ${absoluteUrl("/")}
Free AI scam checker for SMS, WhatsApp, links and screenshots: ${absoluteUrl("/")}

## Emergency helplines (India)
${helplines.map((h) => `- ${h.number} — ${h.label.en}: ${h.note.en}`).join("\n")}

## Official reporting portals
${resources.map((r) => `- ${r.name.en} (${r.url}): ${r.desc.en}`).join("\n")}

## Frequently asked questions
${homeFaq.en.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}

---

${scamText}`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
