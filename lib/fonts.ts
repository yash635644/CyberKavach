import { Inter, Sora } from "next/font/google";

// Mobile-first font strategy:
// - "optional": if a font isn't ready almost immediately, the metric-matched fallback is kept — no late
//   re-render, so the largest text paints at first paint on slow networks. Repeat visits get the brand fonts.
// - Hindi uses the excellent Devanagari fonts already built into phones and PCs (Noto Sans Devanagari on
//   Android, Kohinoor on iOS, Nirmala UI on Windows) — saves ~120 KB per Hindi page view.
export const display = Sora({ subsets: ["latin"], weight: ["700", "800"], variable: "--nf-display", display: "optional" });
export const body = Inter({ subsets: ["latin"], variable: "--nf-body", display: "optional" });

export const fontVars = `${display.variable} ${body.variable}`;
