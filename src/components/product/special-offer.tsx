"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const offerLines = [
  "50% off the SleepWave Pro",
  "The 14-Night Sleep Reset Workbook, a $29 value, free",
  "A full 180-night money-back guarantee",
  "Free US shipping",
];

export default function SpecialOffer() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-gold">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              Limited-time offer
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-5">
              Everything you need to finally sleep.
            </h2>
            <p className="text-[15px] md:text-base text-foreground leading-relaxed max-w-xl mx-auto mb-6">
              <span className="text-gold font-semibold">Special offer today.</span> Try
              the SleepWave Pro risk-free at the lowest price it has ever been.
            </p>
            <div className="inline-flex flex-col items-start gap-2.5 text-left">
              {offerLines.map((line) => (
                <span key={line} className="inline-flex items-center gap-2.5 text-sm md:text-[15px] text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                  {line}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-3xl overflow-hidden border border-white/8 shadow-lg w-full">
            <Image
              src="/products/what-you-get-v3.webp"
              alt="Everything you get with SleepWave Pro: the mask, the 14-Night Sleep Reset Workbook, free shipping, and the guarantee"
              width={1600}
              height={686}
              className="w-full h-auto object-cover"
            />
          </div>
        </ScrollReveal>

        {/* Price reveal */}
        <ScrollReveal>
          <div className="mt-14 text-center">
            <div className="flex items-end justify-center gap-4">
              <span className="text-2xl text-lavender line-through leading-none mb-1">
                $197.98
              </span>
              <span className="font-heading text-5xl md:text-6xl font-medium text-gold leading-none">
                $69.99
              </span>
            </div>
            <p className="mt-4 text-[15px] text-foreground/80">
              Everything above, one charge, one mask, and <BrandName tm /> ships it free.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
