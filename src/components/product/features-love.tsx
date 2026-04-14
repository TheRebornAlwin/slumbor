"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

const features = [
  {
    title: "5 Adjustable Heat Levels",
    description: "from a gentle warmth to a deep soothing heat — find the exact temperature that helps you drift off",
  },
  {
    title: "3 Vibration Massage Modes",
    description: "constant, pulsing, or wave patterns to release tension from your eyes and temples",
  },
  {
    title: "Wireless, Rechargeable & Portable",
    description: "use it at home, while traveling, or anywhere you need to unwind. USB-C charging.",
  },
  {
    title: "Ultra-Long Battery Life",
    description: "up to 4 full sessions per charge — your nightly ritual is always ready when you are",
  },
];

export default function FeaturesLove() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal className="min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gold tracking-tight mb-8">
              Features You&apos;ll Love
            </h2>
            <div className="flex flex-col items-center md:items-start space-y-5">
              {features.map((f, i) => (
                <div key={i} className="inline-flex items-start gap-3 max-w-[90%] md:max-w-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <p className="text-[15px] text-slate leading-relaxed">
                    <span className="font-bold text-heading">{f.title}</span> — {f.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src=""
                alt="DreamWave Mask features"
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
