"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import TextGradient from "@/components/ui/text-gradient";
import AnimatedCounter from "@/components/ui/animated-counter";
import BrandName from "@/components/ui/brand-name";
import MagneticButton from "@/components/ui/magnetic-button";

const stats = [
  { target: 10000, suffix: "+", label: "Happy Customers" },
  { target: 4.9, suffix: "/5", label: "Average Rating", isDecimal: true },
  { target: 30, suffix: " Day", label: "Money-Back Guarantee" },
];

export default function BrandStory() {
  return (
    <section className="py-24 md:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <ScrollReveal className="min-w-0 text-center md:text-left">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Our Story
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading tracking-tight mb-6">
              Built for people who are{" "}
              <TextGradient variant="gold">tired of restless nights</TextGradient>
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              We started <BrandName /> because we were frustrated. Frustrated by
              sleepless nights that never ended. Frustrated by expensive remedies that
              only worked temporarily. Frustrated by gadgets that promised
              everything and delivered nothing.
            </p>
            <p className="text-slate leading-relaxed mb-6">
              Heated vibration therapy has been used in wellness clinics and
              sleep centers for years, but it was always expensive and
              inaccessible. We made it our mission to bring that same
              professional-grade relaxation to everyone, at a price that makes
              sense.
            </p>
            <div className="flex justify-center md:justify-start">
              <MagneticButton variant="secondary" href="/about/">
                Read Our Full Story
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="min-w-0">
            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl font-bold text-gold mb-1">
                    {stat.isDecimal ? (
                      <span>
                        4.9{stat.suffix}
                      </span>
                    ) : (
                      <AnimatedCounter
                        target={stat.target}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  <p className="text-sm text-slate">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
