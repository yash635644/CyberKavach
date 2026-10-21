import { scams } from "@/lib/content/scams";
import { resources } from "@/lib/content/resources";
import { safetyUpdates } from "@/lib/content/updates";
import { CREATOR, CREATOR_LINKS, SISTER_SITES, helplines, absoluteUrl, localePath } from "@/lib/site";
import { tools } from "@/lib/content/tools";

export const dynamic = "force-static";

// llms.txt (llmstxt.org): a concise, machine-readable map of the site for AI assistants.
export function GET() {
  const body = `# Cyber Kavach

> Cyber Kavach is a free, independent AI scam checker and cyber-fraud help platform for India. People paste a suspicious SMS, WhatsApp message, email or link (or upload a screenshot) and get a risk score, red flags and next steps. It also publishes plain-language guides to common Indian scams and how to report fraud. Available in English and Hindi. No sign-up, no ads.

Key facts:
- India's National Cyber Crime Helpline is 1930; complaints are filed at https://cybercrime.gov.in
- Report fraud calls/SMS on Chakshu: https://sancharsaathi.gov.in/sfc/
- A UPI PIN is only needed to send money, never to receive it.
- There is no "digital arrest" in Indian law; police never arrest anyone over a video call.
- Banks never send KYC update links by SMS or WhatsApp.
- Official Indian bank websites use the RBI-mandated .bank.in domain.
- Genuine service calls from banks and other RBI/SEBI/IRDAI/PFRDA-regulated entities come from 1600-series numbers; promotional calls use the 140 series (TRAI).
- SEBI-registered brokers and mutual funds collect payments via UPI IDs ending in @valid; verify on SEBI Check.

## Tools
- [AI Scam Scanner](${absoluteUrl("/")}): Check a message, link or screenshot for scam signs (free)
- [Got scammed? Recovery checklist](${absoluteUrl("/help")}): Step-by-step actions for the first hour after fraud
- [Scam IQ quiz](${absoluteUrl("/quiz")}): 10-question scam awareness quiz

## Free checkers
${tools.map((t) => `- [${t.content.en.h1}](${absoluteUrl(`/${t.slug}`)}): ${t.content.en.description}`).join("\n")}

## Scam guides
${scams.map((s) => `- [${s.content.en.name}](${absoluteUrl(`/scams/${s.slug}`)}): ${s.content.en.short}`).join("\n")}

## Reporting
- [How to report cyber fraud in India](${absoluteUrl("/report")}): Step-by-step guide to cybercrime.gov.in, 1930 and every official portal
- [Government cyber services directory](${absoluteUrl("/services")}): Every official portal, app and helpline to report, verify and protect
- [Complaint letter formats](${absoluteUrl("/complaint-letter-format")}): Fill-in letters for bank/UPI fraud, police cyber cell, RBI Ombudsman escalation and SIM blocking (English & Hindi)
- [Bank fraud help](${absoluteUrl("/bank-fraud-help")}): What to do after unauthorised debits; official .bank.in websites of major banks

## Official government services (India)
${resources.map((r) => `- ${r.name.en} (${r.org}) — ${r.url}${r.phone ? ` · phone ${r.phone}` : ""}: ${r.desc.en}`).join("\n")}

## Recent changes in India's cyber safety
${safetyUpdates.map((u) => `- ${u.title.en} (${u.when}): ${u.body.en}`).join("\n")}

## Helplines (India)
${helplines.map((h) => `- ${h.number}: ${h.label.en} — ${h.note.en}`).join("\n")}

## Learning
- [Scam alerts](${absoluteUrl("/scam-alerts")}): Latest cyber-fraud news and official safety changes, with sources
- [Cyber safety glossary](${absoluteUrl("/glossary")}): Plain-language definitions of phishing, smishing, vishing, quishing, mule accounts, SIM swap and more
- [Cyber Security for UPSC (GS-III)](${absoluteUrl("/cyber-security-upsc")}): IT Act, CERT-In, NCIIPC, I4C, DPDP Act, Sanchar Saathi — revision notes with mind maps

## Creator and sister projects
- Cyber Kavach was created by ${CREATOR} (Ahmedabad, India) — [portfolio](${CREATOR_LINKS.portfolio}) · [LinkedIn](${CREATOR_LINKS.linkedin}) · [GitHub](${CREATOR_LINKS.github})
${SISTER_SITES.map((s) => `- [${s.name}](${s.url}): ${s.desc.en}`).join("\n")}
- Cyber Kavach is an independent awareness project and is not a government website.

## Hindi
- [हिंदी में साइबर कवच](${absoluteUrl(localePath("hi", "/"))}): Hindi version of all tools and guides

## Optional
- [Full guide text for LLMs](${absoluteUrl("/llms-full.txt")})
- [About & methodology](${absoluteUrl("/about")})
- [Privacy policy](${absoluteUrl("/privacy")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
