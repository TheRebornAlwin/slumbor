"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const benefits = [
  "Loosen the tension that builds up behind your eyes after a long day",
  "Ease off a screen headache before it has the chance to settle in",
  "Let a racing mind slow down enough to actually drift off",
  "Fall asleep on your own, without supplements, apps, or your phone",
  "Wake up feeling clear instead of heavy and run down",
];

export default function BenefitsHero() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text */}
        <div className="text-center md:text-left order-1">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-6">
              What it actually does for you.
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              By the time you finally sit down at night, your nervous system has been
              running hard for fourteen hours straight. And your body knows it. The
              tension sits behind your eyes, the sinus pressure never quite lets up, and
              your brain picks this exact moment to start replaying every awkward thing
              you said all week.
            </p>
            <p className="text-slate leading-relaxed mb-8">
              Tonight can go differently. A few quiet minutes with{" "}
              <BrandName tm className="text-heading" /> give your body the off-switch it
              has been asking for, so you can:
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

        {/* Image */}
        <div className="order-2">
          <ScrollReveal delay={0.1}>
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/8 shadow-lg">
              <Image
                src="/products/benefits.webp"
                alt="SleepWave Pro heated eye mask"
                width={700}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
