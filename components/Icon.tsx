// Small inline stroke-icon set (Lucide-style, 24×24). No icon font or library download needed.
const P: Record<string, React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />,
  scan: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  shield: <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />,
  book: (
    <>
      <path d="M4 19.5V5a2 2 0 0 1 2-2h14v15H6.5A2.5 2.5 0 0 0 4 20.5Z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v4H6.5" />
    </>
  ),
  siren: (
    <>
      <path d="M7 18v-6a5 5 0 0 1 10 0v6" />
      <path d="M5 21h14v-3H5zM12 3v2M4.2 6.2l1.4 1.4M19.8 6.2l-1.4 1.4" />
    </>
  ),
  landmark: <path d="M3 21h18M5 21V10m4 11V10m6 11V10m4 11V10M2 10l10-6 10 6H2Z" />,
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  brain: (
    <>
      <path d="M9.5 3A3.5 3.5 0 0 0 6 6.5v.2A3.5 3.5 0 0 0 4 13a3.5 3.5 0 0 0 3 5.5A3 3 0 0 0 12 20V4.5A2.5 2.5 0 0 0 9.5 3Z" />
      <path d="M14.5 3A3.5 3.5 0 0 1 18 6.5v.2a3.5 3.5 0 0 1 2 6.3 3.5 3.5 0 0 1-3 5.5A3 3 0 0 1 12 20" />
    </>
  ),
  "search-check": (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3M8 11l2 2 4-4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  graduation: (
    <>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6" />
    </>
  ),
  "file-check": (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" />
      <path d="M14 3v6h6M9 15l2 2 4-4" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  bank: <path d="M3 21h18M4 18h16M6 18v-7m4 7v-7m4 7v-7m4 7v-7M12 3 3 8h18l-9-5Z" />,
  wallet: (
    <>
      <path d="M20 7V5a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6" />
      <path d="M17 13h.01" />
    </>
  ),
  chart: <path d="M3 3v18h18M7 15l4-4 3 3 6-6" />,
  alert: (
    <>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  umbrella: <path d="M22 12a10 10 0 0 0-20 0h20ZM12 12v7a2 2 0 0 0 4 0M12 2v2" />,
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H6" />
    </>
  ),
  "user-shield": (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-1a6 6 0 0 1 9-5.2M18 13l-4 1.5V17c0 2.2 1.7 3.6 4 4 2.3-.4 4-1.8 4-4v-2.5L18 13Z" />
    </>
  ),
  inbox: <path d="M22 12h-6l-2 3h-4l-2-3H2M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6l3.5-7Z" />,
  "badge-check": (
    <>
      <path d="M12 2 14.5 4.5 18 4l.5 3.5L22 10l-2.5 2.5L20 16l-3.5.5L14 20l-2-2-2 2-2.5-3.5L4 16l.5-3.5L2 10l3.5-2.5L6 4l3.5.5L12 2Z" />
      <path d="m9 11 2 2 4-4" />
    </>
  ),
  smartphone: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  sim: (
    <>
      <path d="M6 2h9l4 4v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" />
      <rect x="8" y="11" width="8" height="7" rx="1" />
    </>
  ),
  bug: (
    <>
      <rect x="7" y="6" width="10" height="14" rx="5" />
      <path d="M12 20v-9M3 13h4m10 0h4M5 7l3 2m11-2-3 2M5 19l3-2m11 2-3-2M9 6l-1-3m7 3 1-3" />
    </>
  ),
  "phone-off": <path d="M10.7 13.3a16 16 0 0 0 3.4 2.6l1.3-1.3a1.5 1.5 0 0 1 1.6-.4 11 11 0 0 0 3.2.7A1.5 1.5 0 0 1 22 16.4v3.1a1.5 1.5 0 0 1-1.6 1.5A19 19 0 0 1 3 3.6 1.5 1.5 0 0 1 4.5 2h3.1A1.5 1.5 0 0 1 9 3.2a11 11 0 0 0 .7 3.2 1.5 1.5 0 0 1-.4 1.6L8 9.3M22 2 2 22" />,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z" />,
  fingerprint: <path d="M12 11v3a8 8 0 0 1-1 4M8 11a4 4 0 0 1 8 0v1a12 12 0 0 1-.8 4.3M5 9a7 7 0 0 1 14 0v3c0 1.4-.2 2.8-.5 4M5 13v1a11 11 0 0 0 .9 4.4M17.3 20.2c.3-.8.6-1.6.8-2.5" />,
  "bell-off": <path d="M8.7 3A6 6 0 0 1 18 8c0 3 .6 5 1.3 6.4M17 17H3s3-2 3-9c0-.6.1-1.1.2-1.6M10.3 21a1.9 1.9 0 0 0 3.4 0M2 2l20 20" />,
  "image-off": (
    <>
      <path d="M2 2l20 20M10.4 5H19a2 2 0 0 1 2 2v8.6M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-.6.2-1.1.6-1.4" />
      <path d="m21 15-3.1-3.1M13 13.5 6 21" />
    </>
  ),
  megaphone: <path d="m3 11 15-6v14L3 13v-2ZM11.6 16.8a3 3 0 1 1-5.8-1.6M21 9v4" />,
  users: (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-1a6 6 0 0 1 12 0v1M16 3.1a4 4 0 0 1 0 7.8M22 21v-1a6 6 0 0 0-4-5.7" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  "arrow-right": <path d="M5 12h14m-6-6 6 6-6 6" />,
  external: <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />,
  sparkles: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />,
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  languages: <path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" />,
};

export function Icon({ name, className = "h-5 w-5", strokeWidth = 2 }: { name: string; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name] ?? P.shield}
    </svg>
  );
}
