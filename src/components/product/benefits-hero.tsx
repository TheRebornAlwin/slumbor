"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const benefits = [
  "Fall Asleep Faster — No More Lying Awake",
  "Visibly Reduce Puffiness and Dark Circles",
  "Release Eye Strain from Hours at Screens",
  "Wake Up Feeling Like You Actually Slept",
  "Your Nightly Wind-Down Ritual, Perfected",
];

const conditions = [
  { label: "TROUBLE\nFALLING ASLEEP" },
  { label: "EYE STRAIN\n& PUFFINESS" },
  { label: "RESTLESS\nSLEEP" },
];

export default function BenefitsHero() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <ScrollReveal className="min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight mb-6">
              The Benefits:
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              Lying awake for hours, waking up puffy and exhausted, and never
              feeling truly rested takes a toll on every part of your life. Your
              energy, your focus, your confidence.
            </p>
            <p className="text-slate leading-relaxed mb-8">
              Tonight, you can change that. With{" "}
              <BrandName tm className="text-heading" /> you can
              finally fall asleep naturally and wake up restored:
            </p>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="inline-flex items-center gap-3 max-w-[90%] md:max-w-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-[15px] font-semibold text-heading">{benefit}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gold tracking-tight mb-8">
                Effective For
              </h2>

              <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                <Image
                  src=""
                  alt="Effective for sleep issues, eye strain, and restless nights"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {conditions.map((cond, i) => (
                  <p key={i} className="text-xs sm:text-sm font-black text-heading uppercase leading-tight tracking-wide whitespace-pre-line text-center">
                    {cond.label}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
