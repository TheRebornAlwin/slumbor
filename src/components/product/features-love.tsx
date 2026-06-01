"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

const features = [
  {
    title: "15 adjustable settings",
    description: "dial the warmth, pulse, and sound to exactly what your nervous system needs tonight",
  },
  {
    title: "3 designed modes",
    description: "Wind Down, Migraine Relief, and Deep Sleep, each tuned for a different end-of-day need",
  },
  {
    title: "Built-in sound, or your own",
    description: "quiet wind-down tracks over a Bluetooth speaker, or stream whatever puts you under",
  },
  {
    title: "A motor quieter than the music",
    description: "so the music is what you hear, not the device. And it shuts down silently, no voice prompts",
  },
];

export default function FeaturesLove() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal className="min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-gold tracking-tight mb-8">
              Features you&apos;ll love
            </h2>
            <div className="flex flex-col items-center md:items-start space-y-5">
              {features.map((f, i) => (
                <div key={i} className="inline-flex items-start gap-3 max-w-[90%] md:max-w-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <p className="text-[15px] text-slate leading-relaxed">
                    <span className="font-medium text-heading">{f.title}</span>: {f.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src=""
                alt="SleepWave Pro features"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
