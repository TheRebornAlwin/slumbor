"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

const steps = [
  {
    step: 1,
    image: "/products/step1.webp",
    description: "Slip the mask on and adjust the strap until it feels held in place, not tight.",
  },
  {
    step: 2,
    image: "/products/step2.webp",
    description: "Press the button and choose warmth, pulse, or both, then dial it in to whatever tonight calls for.",
  },
  {
    step: 3,
    image: "/products/step3.webp",
    description: "Lie back and let your breath slow down. Most people are asleep before the timer even ends.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background section-glow-purple">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight">
              The 7-minute wind-down ritual.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8">
          {steps.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="min-w-0">
              <div className="text-center">
                <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full overflow-hidden mx-auto border-2 border-white/10 shadow-sm">
                  <Image
                    src={s.image}
                    alt={`Step ${s.step}`}
                    width={250}
                    height={250}
                    className="w-full h-full object-cover scale-[1.18]"
                  />
                </div>

                <p className="text-sm sm:text-base font-medium text-gold uppercase tracking-[0.18em] mt-5 mb-2">
                  Step {s.step}
                </p>

                <p className="text-xs sm:text-sm text-slate leading-relaxed italic">
                  {s.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
