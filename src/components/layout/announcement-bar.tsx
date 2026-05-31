"use client";

import { useState, useEffect } from "react";

const DISMISS_KEY = "slumbor_announcement_dismissed";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) === "1") {
      setVisible(false);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#06060c] via-[#0e0e1a] to-[#06060c] text-center py-2.5 px-4 sm:px-6 text-xs sm:text-sm font-medium border-b border-gold/10">
      <span className="tracking-wide text-foreground/80">
        Free US shipping on every order.
        <span className="text-gold font-semibold"> 180-day full refund.</span>
      </span>
      <button
        onClick={dismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors cursor-pointer"
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
