"use client";

import { useEffect, useState } from "react";

const COLORS = { SAFE: "#22c55e", SUSPICIOUS: "#f59e0b", DANGEROUS: "#f43f5e" } as const;

export function Gauge({ score, verdict, label }: { score: number; verdict: keyof typeof COLORS; label: string }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      // rAF timestamps can be slightly earlier than performance.now() at start — clamp to avoid negatives
      const p = Math.min(1, Math.max(0, (now - start) / 1100));
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(score * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const color = COLORS[verdict];
  const arc = Math.PI * 80; // half circumference for r=80
  const angle = -90 + (shown / 100) * 180;

  return (
    <div className="relative mx-auto w-full max-w-[240px]" role="img" aria-label={`${label}: ${score}/100`}>
      <svg viewBox="0 0 200 116" className="w-full overflow-visible">
        <defs>
          <linearGradient id="gauge-track" x1="0" x2="1">
            <stop offset="0" stopColor="#22c55e" />
            <stop offset="0.5" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#f43f5e" />
          </linearGradient>
          <filter id="gauge-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="rgb(148 163 184 / .15)" strokeWidth="14" strokeLinecap="round" />
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gauge-track)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={arc}
          strokeDashoffset={arc - (shown / 100) * arc}
          filter="url(#gauge-glow)"
        />
        <g transform={`rotate(${angle} 100 100)`}>
          <line x1="100" y1="100" x2="100" y2="34" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="100" cy="100" r="7" fill="#fff" />
        <circle cx="100" cy="100" r="3" fill={color} />
      </svg>
      <div className="mt-1 text-center">
        <span className="font-display text-4xl font-extrabold tabular-nums" style={{ color }}>
          {shown}
        </span>
        <span className="text-lg text-slate-400">/100</span>
      </div>
    </div>
  );
}
