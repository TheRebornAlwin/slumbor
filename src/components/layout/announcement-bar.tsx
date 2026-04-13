"use client";

import { useState, useEffect } from "react";

const INITIAL_SECONDS = 3 * 3600 + 25 * 60;

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-navy text-gold text-center py-2 px-4 sm:px-6 text-xs sm:text-sm font-medium border-b border-gold/10">
      <span className="font-bold tracking-wide">
        LIMITED TIME: 50% OFF<span className="hidden sm:inline"> + FREE SHIPPING</span> — OFFER ENDS IN {pad(h)}:{pad(m)}:{pad(s)}
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/60 hover:text-gold transition-colors cursor-pointer"
        aria-label="Close announcement"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
