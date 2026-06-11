"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

const signals = [
  {
    name: "Warmth",
    body: "Gentle heat around your eyes relaxes the blood vessels and tells your nervous system that the day is over and it is safe to wind down. Slowly, the tension behind your eyes starts to let go.",
  },
  {
    name: "Pulse",
    body: "A slow, rhythmic pressure that moves at the pace of a human touch. Your body reads that rhythm as a signal to calm down, the same way a swaddled baby settles in someone's arms.",
  },
  {
    name: "Silence",
    body: "There is no music, no beeping, and no voice announcing it is finished and pulling you back awake. Just warmth, a soft pulse, and a room quiet enough to fall asleep in. That silence is the third thing your nervous system has been missing.",
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
            <p className="text-slate leading-relaxed mb-8">
              No gimmicks, and nothing you have to take on faith. It really comes down
              to two signals your body was built to respond to, given the kind of quiet
              that actually lets them work.
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
              None of this is about forcing yourself to sleep. It is about giving your
              body permission to do what it already knows how to do.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
