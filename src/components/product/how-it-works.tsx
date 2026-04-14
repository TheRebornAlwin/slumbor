"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const steps = [
  {
    step: 1,
    image: "",
    description: "Place the DreamWave Mask over your eyes and lie back",
  },
  {
    step: 2,
    image: "",
    description: "Select your heat and vibration intensity",
  },
  {
    step: 3,
    image: "",
    description: "Feel the tension melt away as you drift into deep sleep...",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background section-glow-purple">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight">
              How to Use <BrandName tm />
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {steps.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="min-w-0">
              <div className="text-center">
                <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full overflow-hidden mx-auto border-2 border-white/10 shadow-sm">
                  <Image
                    src={s.image}
                    alt={`Step ${s.step}`}
                    width={250}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm sm:text-base font-black text-heading uppercase tracking-wide mt-5 mb-2">
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
