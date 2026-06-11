"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import TextGradient from "@/components/ui/text-gradient";
import BrandName from "@/components/ui/brand-name";

const values = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
    ),
    title: "The warmth that signals safety",
    description:
      "Gentle heat around the eyes tells your nervous system the day is over and it's safe to wind down. The tension behind your eyes starts to let go.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    ),
    title: "A pulse your body recognizes",
    description:
      "A slow, rhythmic pressure that mimics the pace of a human touch. Your body reads it as a calming signal, the way a swaddled baby settles.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>
    ),
    title: "Silence that lets you drift",
    description:
      "It stays quiet the whole way through, from the moment you put it on until you are already asleep. That quiet is a big part of why it works so well.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    title: "The ritual, not the gadget",
    description:
      "Something you reach for every night, not another device you forget in a drawer. The one part of the day that's just for letting go.",
  },
];

export default function WhySlumbor() {
  return (
    <section className="py-24 md:py-36 px-6 section-gradient-gold">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              Why <BrandName />
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-heading tracking-tight mb-4">
              Built for the version of you at{" "}
              <TextGradient variant="gold">11pm</TextGradient>.
            </h2>
            <p className="text-slate max-w-2xl mx-auto">
              You've tried melatonin, white noise, and sleep apps. Here's what your
              nervous system actually responds to.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="min-w-0">
              <GlassmorphismCard className="h-full text-center">
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gold-light/60 flex items-center justify-center text-gold">
                  {value.icon}
                </div>
                <h3 className="font-heading text-lg font-medium text-heading mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  {value.description}
                </p>
              </GlassmorphismCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
