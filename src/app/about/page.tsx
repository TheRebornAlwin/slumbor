"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TextGradient from "@/components/ui/text-gradient";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import BrandName from "@/components/ui/brand-name";

const values = [
  {
    title: "Premium Quality",
    description:
      "We use advanced heated vibration technology that meets the same standards as professional sleep therapy devices. No cheap knockoffs.",
  },
  {
    title: "Designed with Purpose",
    description:
      "Every feature exists for a reason. Gentle heat, soothing vibrations, total blackout design. All crafted around how people actually struggle with sleep.",
  },
  {
    title: "Customer First",
    description:
      "30-day money-back guarantee, free shipping, and a support team that actually responds. We built the experience we wanted as customers.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Our Story
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-heading tracking-tight mb-4">
              We bring{" "}
              <TextGradient variant="gold">real rest</TextGradient> to your
              everyday life
            </h1>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-24">
          <ScrollReveal className="min-w-0">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gold/20 to-surface border border-gold/10 flex items-center justify-center">
              <Image
                src=""
                alt="Slumbor"
                width={200}
                height={200}
                className="w-32 h-32 md:w-48 md:h-48"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="min-w-0">
            <h2 className="text-2xl font-bold font-heading text-heading mb-4">
              Born from restless nights
            </h2>
            <p className="text-foreground leading-relaxed mb-4">
              We started <BrandName /> because we were tired of the cycle. Toss and
              turn all night, drag through the day, try melatonin, scroll your
              phone, repeat. Sound familiar?
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              Heated eye therapy and gentle vibration have been used in sleep
              clinics for years, but the technology was always expensive and
              inaccessible. We wondered: why can't everyone have access to this?
            </p>
            <p className="text-foreground leading-relaxed">
              So we built the DreamWave Mask. A luxurious, weighted, heated
              vibrating eye mask that lulls you into deep sleep naturally. No
              pills. No side effects. Just real rest, on your terms.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold font-heading text-heading">What we stand for</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <GlassmorphismCard className="h-full text-center">
                <h3 className="text-lg font-bold font-heading text-heading mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {value.description}
                </p>
              </GlassmorphismCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
