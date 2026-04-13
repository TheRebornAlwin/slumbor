"use client";

export default function BrandName({ className = "", tm = false }: { className?: string; tm?: boolean }) {
  return (
    <span className={`tracking-[0.08em] uppercase font-heading font-semibold ${className}`}>
      SLUMBOR
      {tm && <span className="text-[0.5em] align-super ml-0.5">™</span>}
    </span>
  );
}
