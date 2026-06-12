"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const offerItems = [
  {
    value: "50% OFF",
    label: "the SleepWave Pro",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
    ),
  },
  {
    value: "FREE",
    label: "$29 Sleep Reset Workbook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    ),
  },
  {
    value: "180 nights",
    label: "money-back guarantee",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
    ),
  },
  {
    value: "FREE",
    label: "US shipping",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    ),
  },
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
            <p className="text-[15px] md:text-base text-foreground leading-relaxed max-w-xl mx-auto mb-8">
              <span className="text-gold font-semibold">Special offer today.</span> Try
              the SleepWave Pro risk-free at the lowest price it has ever been.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
              {offerItems.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center gap-2 rounded-2xl bg-gold/5 border border-gold/15 p-4 md:p-5"
                >
                  <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    {item.icon}
                  </div>
                  <p className="font-heading text-lg md:text-xl font-semibold text-gold leading-none">
                    {item.value}
                  </p>
                  <p className="text-[11px] md:text-xs text-slate leading-tight">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-center w-full">
            <div className="rounded-3xl overflow-hidden border border-white/8 shadow-lg">
              <Image
                src="/products/what-you-get-left.webp"
                alt="The SleepWave Pro mask and the 14-Night Sleep Reset Workbook"
                width={960}
                height={1200}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden border border-white/8 shadow-lg">
              <Image
                src="/products/what-you-get-right.webp"
                alt="Everything included: free shipping, the bonus workbook, and the 180-night guarantee"
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div>
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
