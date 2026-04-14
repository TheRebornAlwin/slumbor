"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const discoveryBullets = [
  "Combines heat therapy and micro-vibration for deep relaxation",
  "Signals your brain it's time to wind down and sleep",
  "Reduces puffiness and dark circles while you rest",
  "Compact and rechargeable — use it every single night",
];

export default function DiscoverSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background section-glow-gold">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal className="min-w-0">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 sm:gap-0">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-heading tracking-tight mb-4">
                  Before<br />
                  <span className="text-muted"><BrandName tm /></span>
                </h3>
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-b from-white/5 to-white/2 border border-white/10 overflow-hidden">
                  <Image
                    src=""
                    alt="Before Slumbor"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center px-2 mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>

              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-heading font-bold tracking-tight mb-4">
                  After<br />
                  <span className="text-gold"><BrandName tm /></span>
                </h3>
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-b from-gold/5 to-gold/10 border border-gold/20 overflow-hidden">
                  <Image
                    src=""
                    alt="After Slumbor"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gold tracking-tight mb-6">
              Discover the Easiest Way to Fall Asleep Faster
            </h2>
            <p className="text-slate leading-relaxed mb-5">
              <span className="font-bold text-heading">Introducing</span>{" "}<BrandName tm className="text-heading" />,
              a premium heated eye mask for people who are done lying awake at night
              and waking up exhausted.
            </p>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {discoveryBullets.map((point, i) => (
                <p key={i} className="text-sm text-foreground max-w-[90%] md:max-w-none">
                  <span className="text-gold mr-2">&#8226;</span>{point}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
