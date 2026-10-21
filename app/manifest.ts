import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cyber Kavach — AI Scam Checker",
    short_name: "Cyber Kavach",
    description: "Free AI scam checker for SMS, WhatsApp messages, links and screenshots. Made for India.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#050816",
    lang: "en-IN",
    categories: ["security", "utilities", "education"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Check a message", url: "/#scanner" },
      { name: "I got scammed", url: "/help" },
      { name: "हिन्दी", url: "/hi" },
    ],
  };
}
