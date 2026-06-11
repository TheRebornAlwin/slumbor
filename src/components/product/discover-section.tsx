"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const discoveryBullets = [
  "Built for screen-tired eyes and a nervous system stuck in overdrive",
  "Uses gentle warmth and a soft pulse your body responds to, in complete silence",
  "Works in a matter of minutes, not weeks of waiting it out",
  "Small enough to live on your nightstand and become part of the routine",
];

export default function DiscoverSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background section-glow-gold">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal className="min-w-0">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/8 shadow-lg">
              <Image
                src="/products/before-after.webp"
                alt="Before and after Slumbor"
                width={700}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-gold tracking-tight mb-6">
              The cycle ends tonight.
            </h2>
            <p className="text-slate leading-relaxed mb-5">
              <span className="font-medium text-heading">Meet</span>{" "}<BrandName tm className="text-heading" />,
              a heated eye mask for anyone who is sick of staring at the ceiling with a
              fried head and a brain that won&apos;t shut up. It works with your body
              instead of fighting it. So winding down stops being the hardest part of
              your night and starts being the easiest.
            </p>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {discoveryBullets.map((point, i) => (
                <p key={i} className="flex gap-2 text-sm text-foreground max-w-[90%] md:max-w-none text-left">
                  <span className="text-gold flex-shrink-0">&#8226;</span>
                  <span>{point}</span>
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
