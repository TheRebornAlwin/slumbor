"use client";

import { useState, useEffect } from "react";

const KEY = "slumbor-offer-deadline";

// Per-visitor countdown. On the first visit we lock a deadline a few hours out
// (an organic, non-round window), persist it, and count down to it. If it ever
// runs out, a fresh window starts, so it never sits at zero. Hours + minutes
// only, never seconds, to keep it calm instead of scammy.
export default function OfferCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const now = Date.now();
    let deadline = parseInt(localStorage.getItem(KEY) || "0", 10);

    const freshWindow = () =>
      Date.now() + (3 * 60 + Math.floor(Math.random() * 150)) * 60 * 1000; // 3h–5h30m

    if (!deadline || deadline <= now) {
      deadline = freshWindow();
      localStorage.setItem(KEY, String(deadline));
    }

    const tick = () => {
      let left = deadline - Date.now();
      if (left <= 0) {
        deadline = freshWindow();
        localStorage.setItem(KEY, String(deadline));
        left = deadline - Date.now();
      }
      setRemaining(left);
    };

    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  if (remaining === null) return null;

  const totalMinutes = Math.floor(remaining / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const label = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div className="flex items-center gap-1.5 text-xs text-gold/90 justify-center md:justify-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span>
        Discount ends in <span className="font-semibold">{label}</span>
      </span>
    </div>
  );
}
