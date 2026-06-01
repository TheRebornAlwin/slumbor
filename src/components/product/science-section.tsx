"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

const signals = [
  {
    name: "Warmth",
    body: "Gentle heat around the eyes opens the blood vessels and tells your parasympathetic nervous system the body is safe to wind down. The tension behind your eyes starts to let go.",
  },
  {
    name: "Pulse",
    body: "A slow, rhythmic pressure that mimics the pace of a human touch. Your body reads that rhythm as a calming signal, the same way a swaddled baby settles.",
  },
  {
    name: "Sound",
    body: "Quiet, meditative tones mask the motor and give your racing mind one simple thing to follow. Instead of rehearsing tomorrow, it just listens until it stops.",
  },
];

export default function ScienceSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-gold">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal className="min-w-0">
            <div className="text-center">
              <Image
                src=""
                alt="The SlowWave Method: warmth, pulse, and sound"
                width={500}
                height={500}
                className="w-full h-auto object-contain mx-auto"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0 text-center md:text-left">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              The SlowWave Method
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-4">
              How warmth, pulse, and quiet sound walk your nervous system to sleep.
            </h2>
            <p className="text-slate leading-relaxed mb-8">
              Stage 3 buyers don&apos;t take claims on faith, so here&apos;s the
              honest version. Three signals, delivered together, that your body was
              built to respond to.
            </p>
            <div className="space-y-5">
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
            <p className="text-foreground/80 leading-relaxed mt-8 italic">
              It&apos;s not about forcing sleep. It&apos;s about giving your body
              permission.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
