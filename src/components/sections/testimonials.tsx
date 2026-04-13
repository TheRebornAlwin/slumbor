"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import TextGradient from "@/components/ui/text-gradient";

const testimonials = [
  {
    name: "Marcus T.",
    role: "Software Developer",
    text: "My mind was constantly racing from staring at screens all day. The first few sessions felt different, but now I can't imagine not having it. The tension just melts away and I drift off effortlessly.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    role: "Office Manager",
    text: "After three weeks of using this nightly, my sleep quality is about 70% better. I fall asleep faster and wake up actually feeling rested. This thing actually works.",
    rating: 5,
  },
  {
    name: "Brandon C.",
    role: "Freelance Designer",
    text: "I've spent hundreds on sleep supplements and gadgets. This device gives me more nightly relief than anything else I've tried. It's now the cornerstone of my bedtime routine.",
    rating: 5,
  },
  {
    name: "Lisa T.",
    role: "Registered Nurse",
    text: "I work long shifts and the stress builds up, making it impossible to wind down. This has been an absolute godsend. The relaxation is immediate.",
    rating: 5,
  },
  {
    name: "James R.",
    role: "Construction Worker",
    text: "The warmth and vibration around my eyes just dissolves the tension. Nothing else has worked like this for me. Even on the lowest setting it's deeply relaxing.",
    rating: 5,
  },
  {
    name: "Amanda G.",
    role: "Wellness Coach",
    text: "I recommend relaxation tools to my clients regularly. Having a portable, affordable option like this is excellent. The multiple modes give real versatility for different relaxation needs.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-36 px-6 section-gradient-warm">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Real Results
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading tracking-tight mb-4">
              What our{" "}
              <TextGradient variant="gold">customers</TextGradient> are saying
            </h2>
            <p className="text-slate max-w-2xl mx-auto">
              Don't just take our word for it. Here's what real people
              experience with the DreamWave Mask.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="min-w-0">
              <GlassmorphismCard className="h-full">
                <div className="flex text-warm text-sm mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <p className="text-slate text-sm leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-heading text-sm">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </GlassmorphismCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
