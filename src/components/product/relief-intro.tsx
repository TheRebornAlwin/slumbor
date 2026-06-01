"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const painPoints = [
  "Eyes burning by 4pm, headache by 7pm, can't switch off by 11pm",
  "Lying there exhausted but somehow wide awake",
  "Tried melatonin, tried supplements, tried apps, still here",
  "Waking up feeling like a truck ran over you",
];

export default function ReliefIntro() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-purple">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-heading tracking-tight mb-4">
            Give your nervous system the off-switch it&apos;s been begging for.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-slate text-lg mb-6">Sound familiar?</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-col items-center md:items-start space-y-3 mb-8">
            {painPoints.map((point, i) => (
              <p key={i} className="text-sm text-foreground max-w-[90%] md:max-w-none">
                <span className="text-gold mr-2">&#8226;</span>{point}
              </p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-slate leading-relaxed">
            <span className="font-medium text-heading">You don&apos;t have to keep grinding through it.</span>{" "}
            <BrandName tm /> is built for exactly this. Warmth, a slow pulse, and quiet
            sound that walk your body down into sleep.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
