"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const included = [
  {
    name: "The SleepWave Pro",
    detail: "warmth, pulse, and sound, in one mask",
    was: "$139.99",
    now: "$69.99",
  },
  {
    name: "The 7-Minute Wind-Down",
    detail: "a guided audio session that walks you into sleep",
    was: "$29",
    now: "Free",
  },
  {
    name: "Free US shipping",
    detail: "no surprise add-ons at checkout",
    was: "$9.99",
    now: "Free",
  },
  {
    name: "180-night sleep guarantee",
    detail: "sleep better in 14 nights or every cent back",
    was: "",
    now: "Included",
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
            <div>
              <div className="w-full rounded-2xl overflow-hidden mb-8 border border-white/8 bg-gradient-to-br from-gold-light via-surface to-gold-light aspect-[4/3]">
                <Image
                  src=""
                  alt="The SleepWave Pro with the 7-Minute Wind-Down audio guide"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-4 justify-center md:justify-start">
                <span className="text-2xl text-lavender line-through">$139.99</span>
                <span className="text-4xl md:text-5xl font-medium text-gold">$69.99</span>
              </div>
              <p className="text-sm text-foreground/80 mt-3 text-center md:text-left">
                That&apos;s <span className="text-heading">$178 of mask, audio guide, and
                shipping</span> for $69.99. <BrandName tm /> ships with tracking, no add-ons.
              </p>
            </div>

            <div className="space-y-3">
              {included.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-surface-raised border border-white/8"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12" /></svg>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[15px] font-medium text-heading">{item.name}</p>
                      <span className="flex items-baseline gap-2 flex-shrink-0">
                        {item.was && (
                          <span className="text-xs text-lavender line-through">{item.was}</span>
                        )}
                        <span className="text-sm font-medium text-gold">{item.now}</span>
                      </span>
                    </div>
                    <p className="text-[13px] text-slate mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
