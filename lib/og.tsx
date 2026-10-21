import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * 1200×630 share card — the size WhatsApp, LinkedIn, X/Twitter, Facebook and Telegram all expect.
 * Fonts are bundled locally (WOFF) so Hindi titles render correctly and builds never depend on the network.
 */
export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "lib", "og-fonts");
let fontsPromise: Promise<{ name: string; data: Buffer; weight: 500 | 700 | 800; style: "normal" }[]> | null = null;
function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(join(fontDir, "Sora-800.woff")).then((data) => ({ name: "Sora", data, weight: 800 as const, style: "normal" as const })),
    readFile(join(fontDir, "Inter-500.woff")).then((data) => ({ name: "Inter", data, weight: 500 as const, style: "normal" as const })),
    readFile(join(fontDir, "NotoSansDevanagari-700.woff")).then((data) => ({ name: "Deva", data, weight: 700 as const, style: "normal" as const })),
  ]);
  return fontsPromise;
}

function Shield({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path d="M32 4 8 13v17c0 15.5 10.2 26.4 24 30 13.8-3.6 24-14.5 24-30V13L32 4Z" fill="url(#g)" />
      <path d="M32 9.5 13 16.6V30c0 12.6 8 21.6 19 24.8 11-3.2 19-12.2 19-24.8V16.6L32 9.5Z" fill="#050816" />
      <path d="m22 32 7 7 13-14" fill="none" stroke="url(#g)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export async function ogCard({ eyebrow, title, subtitle, accent = "#22d3ee", badge }: { eyebrow: string; title: string; subtitle: string; accent?: string; badge?: string }) {
  const fonts = await loadFonts();
  const titleSize = title.length > 60 ? 52 : title.length > 40 ? 60 : 68;
  // Cut long subtitles at a word boundary
  const sub = subtitle.length > 130 ? `${subtitle.slice(0, 130).replace(/\s+\S*$/, "")}…` : subtitle;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background: `radial-gradient(circle at 88% 8%, ${accent}66, transparent 45%), radial-gradient(circle at 8% 92%, rgba(34,211,238,.30), transparent 45%), #050816`,
          color: "#e8edf7",
          fontFamily: "Inter, Deva",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Shield size={62} />
          <div style={{ display: "flex", fontSize: 34, fontFamily: "Sora", fontWeight: 800 }}>
            Cyber<span style={{ color: "#22d3ee" }}>Kavach</span>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              fontSize: 22,
              padding: "8px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,.22)",
              color: "#cbd5e1",
              fontFamily: "Inter, Deva",
            }}
          >
            {badge ?? "100% free · India"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 26, fontFamily: "Sora, Deva", fontWeight: 800, color: accent, letterSpacing: 2, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: titleSize, fontFamily: "Sora, Deva", fontWeight: 800, lineHeight: 1.08, color: "#fff", maxWidth: 1050 }}>{title}</div>
          <div style={{ display: "flex", fontSize: 27, color: "#a5b4c8", maxWidth: 1000, lineHeight: 1.4 }}>{sub}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 23, color: "#94a3b8" }}>
          <span>cyber-kavach.vercel.app</span>
          <span style={{ display: "flex", color: "#fda4af", fontFamily: "Sora, Deva", fontWeight: 800 }}>Cyber helpline: 1930</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    },
  );
}
