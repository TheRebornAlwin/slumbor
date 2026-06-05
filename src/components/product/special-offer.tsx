"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const bonuses = [
  {
    title: "The 14-Night Sleep Reset Workbook",
    detail:
      "A guided 14-night tracking system to prove the guarantee to yourself, night by night.",
    was: "$29",
  },
  {
    title: "Free US Shipping",
    detail: "Ships free across the US. No hidden protection upsell at checkout.",
    was: "$9.99",
  },
  {
    title: "180-Night Guarantee + 2-Year Warranty",
    detail:
      "180 nights to send it back, and a free replacement if it ever stops working.",
    was: "$19",
  },
];

export default function SpecialOffer() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-gold">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              What you get tonight
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-4">
              Everything you need to fall asleep tonight.
            </h2>
            <p className="text-slate text-[15px] leading-relaxed max-w-md mx-auto">
              One clean price. A real bonus to help you build the ritual. And six
              months to decide it works.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: product + workbook bundle visual */}
            <div className="w-full rounded-2xl overflow-hidden border border-white/8 bg-gradient-to-br from-gold-light via-surface to-gold-light aspect-[4/3]">
              <Image
                src=""
                alt="The SleepWave Pro with the 14-Night Sleep Reset Workbook"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: bonus cards */}
            <div className="space-y-3">
              {bonuses.map((b, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-5 flex items-start gap-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12" /></svg>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[15px] font-medium text-heading">{b.title}</p>
                      <span className="flex items-baseline gap-2 flex-shrink-0">
                        <span className="text-xs text-lavender line-through">{b.was}</span>
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-gold">
                          Free
                        </span>
                      </span>
                    </div>
                    <p className="text-[13px] text-slate mt-1">{b.detail}</p>
                  </div>
                </div>
              ))}
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
              Everything above. One charge. One mask. <BrandName tm /> ships it free.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
