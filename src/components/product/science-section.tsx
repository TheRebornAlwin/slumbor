"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

const signals = [
  {
    name: "Warmth",
    body: "Gentle heat relaxes the muscles around your eyes and the tension starts to let go.",
  },
  {
    name: "Pulse",
    body: "A slow, soft rhythm your body reads as a signal to calm down.",
  },
  {
    name: "Silence",
    body: "No music, no beeping, just quiet. That quiet is the part that lets it work.",
  },
];

export default function ScienceSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-gold">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal className="min-w-0 md:order-last">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/8 shadow-lg">
              <Image
                src="/products/science.webp"
                alt="The science behind SleepWave Pro"
                width={700}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0 text-center md:text-left">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              The SlowWave Method
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-4">
              How warmth and a slow pulse walk your nervous system to sleep.
            </h2>
            <div className="space-y-5 mt-2">
              {signals.map((s, i) => (
                <div key={i} className="flex gap-4 text-left">
                  <span className="flex-shrink-0 mt-1 text-gold">&#8226;</span>
                  <p className="text-[15px] text-foreground leading-relaxed">
                    <span className="font-medium text-heading">{s.name}.</span>{" "}
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
