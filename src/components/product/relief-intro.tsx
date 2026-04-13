"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const painPoints = [
  "Lying awake for hours no matter how tired you are",
  "Waking up with puffy eyes and dark circles every morning",
  "Never feeling truly rested even after a full night",
  "Relying on sleep aids and supplements that leave you groggy",
];

export default function ReliefIntro() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-purple">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-heading tracking-tight mb-4">
            Give Yourself the Rest You Deserve
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
            <span className="font-bold text-heading">Tonight can be different.</span>{" "}
            <BrandName tm /> helps you wind down naturally and wake up feeling like
            you actually slept.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
