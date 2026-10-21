export function ShieldMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ck-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path d="M32 4 8 13v17c0 15.5 10.2 26.4 24 30 13.8-3.6 24-14.5 24-30V13L32 4Z" fill="url(#ck-g)" />
      <path d="M32 9.5 13 16.6V30c0 12.6 8 21.6 19 24.8 11-3.2 19-12.2 19-24.8V16.6L32 9.5Z" fill="#050816" />
      <path d="m22 32 7 7 13-14" fill="none" stroke="url(#ck-g)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
