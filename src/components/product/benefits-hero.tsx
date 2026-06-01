"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const benefits = [
  "Loosen the tension that stacks up behind your eyes",
  "Quiet the screen-fatigue headache before it lands",
  "Give your racing mind one simple thing to follow",
  "Fall asleep without forcing it, supplements, or a phone",
  "Wake up without that heavy-eyed, run-over feeling",
];

const conditions = [
  { label: "SCREEN-FRIED\nEYES" },
  { label: "END-OF-DAY\nTENSION" },
  { label: "RACING\nTHOUGHTS" },
];

export default function BenefitsHero() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <ScrollReveal className="min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-6">
              The benefits:
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              By the time you sit down at night, your nervous system has been
              running flat-out for fourteen hours. Tension behind the eyes. Sinus
              pressure that won&apos;t quit. A brain that picks now to rehearse every
              awkward thing you said this week.
            </p>
            <p className="text-slate leading-relaxed mb-8">
              Tonight can go differently. With{" "}
              <BrandName tm className="text-heading" /> your body finally gets
              the off-switch it&apos;s been asking for:
            </p>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="inline-flex items-center gap-3 max-w-[90%] md:max-w-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-[15px] font-medium text-heading">{benefit}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-medium text-gold tracking-tight mb-8">
                Effective for
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
                  <p key={i} className="text-xs sm:text-sm font-medium text-heading uppercase leading-tight tracking-wide whitespace-pre-line text-center">
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
