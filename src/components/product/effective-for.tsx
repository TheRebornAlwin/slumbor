"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

const cards = [
  {
    label: "Screen-fried eyes",
    sub: "Dry, strained, burning by 4pm",
    alt: "A woman at a desk in dim evening light, rubbing her tired eyes",
  },
  {
    label: "End-of-day tension",
    sub: "The headache that stacks behind your eyes",
    alt: "A woman pressing a hand to her temple, evening light, tired posture",
  },
  {
    label: "Racing thoughts at bedtime",
    sub: "Exhausted, but wide awake at 11pm",
    alt: "A woman lying in bed at night, eyes open, looking at the ceiling",
  },
];

export default function EffectiveFor() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background section-glow-gold">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              Effective for
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-heading tracking-tight">
              Built for three kinds of tired.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <ScrollReveal key={c.label} delay={i * 0.1} className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-white/8 bg-surface-raised">
                <div className="relative aspect-square bg-gradient-to-br from-surface-raised via-surface to-surface-raised">
                  <Image
                    src=""
                    alt={c.alt}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-5 py-5 text-center">
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-soft-white">
                    {c.label}
                  </p>
                  <p className="mt-2 text-[13px] text-slate">{c.sub}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
