"use client";

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0A0F1C] via-[#16233f] to-[#0A0F1C] text-center py-2.5 px-4 sm:px-6 text-xs sm:text-sm font-medium border-b border-gold/10">
      <span className="inline-flex items-baseline justify-center gap-1.5 tracking-wide text-foreground/80">
        <span>Free US shipping on every order.</span>
        <span className="text-gold font-semibold">180-day full refund.</span>
      </span>
    </div>
  );
}
