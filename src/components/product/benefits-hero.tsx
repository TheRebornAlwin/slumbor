"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const benefits = [
  "Loosen the tension that stacks up behind your eyes",
  "Quiet the screen-fatigue headache before it lands",
  "Let your racing mind settle into the dark and the quiet",
  "Fall asleep without forcing it, supplements, or a phone",
  "Wake up without that heavy-eyed, run-over feeling",
];

export default function BenefitsHero() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-2xl mx-auto text-center md:text-left">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-6">
            The benefits:
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            By the time you sit down at night, your nervous system has been running
            flat-out for fourteen hours. Tension behind the eyes. Sinus pressure that
            won&apos;t quit. A brain that picks now to rehearse every awkward thing you
            said this week.
          </p>
          <p className="text-slate leading-relaxed mb-8">
            Tonight can go differently. With{" "}
            <BrandName tm className="text-heading" /> your body finally gets the
            off-switch it&apos;s been asking for:
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
      </div>
    </section>
  );
}
