"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

const features = [
  {
    title: "Contoured 3D cups",
    body: "Soft cups that wrap your eyes without pressing into them. For the people who feel crushed by other masks.",
  },
  {
    title: "Five heat settings",
    body: "From a gentle 35°C warmth to a deep 55°C heat. Dial in exactly what your nervous system needs tonight.",
  },
  {
    title: "Adjustable strap",
    body: "Sits lightly on your hair without pulling. Doesn't slip when you turn over in the night.",
  },
  {
    title: "Six pulse modes",
    body: "Soft rhythmic pressure that mimics human touch. Your body recognizes the rhythm and starts to let go.",
  },
];

function Callout({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-xs">
      <h3 className="font-heading text-[22px] font-medium text-heading leading-snug mb-1.5">
        {title}
      </h3>
      <p className="text-[15px] text-foreground/80 leading-relaxed">{body}</p>
    </div>
  );
}

export default function FeaturesLove() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              The details
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-heading tracking-tight">
              Every part of it earns its place.
            </h2>
          </div>
        </ScrollReveal>

        {/* Desktop: callouts flanking the product, lines pointing in */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-8">
          <ScrollReveal className="flex flex-col items-end gap-16 text-right">
            <div className="flex items-start gap-4">
              <Callout {...features[0]} />
              <span className="mt-3 h-px w-10 bg-gold/40" />
            </div>
            <div className="flex items-start gap-4">
              <Callout {...features[1]} />
              <span className="mt-3 h-px w-10 bg-gold/40" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative h-80 w-80 overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-gold-light via-surface to-gold-light">
              <Image
                src=""
                alt="The SleepWave Pro eye mask"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="flex flex-col items-start gap-16 text-left">
            <div className="flex items-start gap-4">
              <span className="mt-3 h-px w-10 bg-gold/40" />
              <Callout {...features[2]} />
            </div>
            <div className="flex items-start gap-4">
              <span className="mt-3 h-px w-10 bg-gold/40" />
              <Callout {...features[3]} />
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile: product, then 2x2 callout grid below */}
        <div className="md:hidden">
          <ScrollReveal>
            <div className="relative mx-auto mb-10 aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-gold-light via-surface to-gold-light">
              <Image
                src=""
                alt="The SleepWave Pro eye mask"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.05}>
                <Callout {...f} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
