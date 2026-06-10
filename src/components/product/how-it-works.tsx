"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

const steps = [
  {
    step: 1,
    image: "https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTr6e3ihWxU8chn5GMEuj1fatpV2ABrdT9zw7IP",
    description: "Slip the mask on. Adjust the strap until it feels held, not tight.",
  },
  {
    step: 2,
    image: "",
    description: "Press the button. Choose warmth, or pulse, or both. Dial it to what tonight needs.",
  },
  {
    step: 3,
    image: "",
    description: "Lie back. Breathe out. Most people are asleep before the timer ends.",
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
                <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full overflow-hidden mx-auto border-2 border-white/10 shadow-sm">
                  <Image
                    src={s.image}
                    alt={`Step ${s.step}`}
                    width={250}
                    height={250}
                    className="w-full h-full object-cover"
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
