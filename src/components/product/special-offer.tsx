"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

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
              One simple price, a genuine bonus to help you build the routine, and a
              full six months to decide for yourself whether it works.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-3xl overflow-hidden border border-white/8 shadow-lg max-w-4xl mx-auto">
            <Image
              src="/products/what-you-get.webp"
              alt="Everything you get with SleepWave Pro: the mask, the 14-Night Sleep Reset Workbook, free shipping, and the guarantee"
              width={1600}
              height={900}
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
              Everything above. One charge. One mask. <BrandName tm /> ships it free.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
