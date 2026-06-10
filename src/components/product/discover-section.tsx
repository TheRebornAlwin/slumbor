"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const discoveryBullets = [
  "Made for screen-fried eyes and stressed-out nervous systems",
  "Uses warmth and a soft pulse the body responds to, in total silence",
  "Works in minutes, not weeks",
  "Compact enough to live on your nightstand forever",
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
              a heated eye mask for people who are done staring at the ceiling with a
              fried head and a brain that won&apos;t quit.
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
