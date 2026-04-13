"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

export default function CostCallout() {
  return (
    <section className="py-16 md:py-20 px-6">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-gold to-gold-dark text-navy text-center py-14 md:py-16 px-6 md:px-12 shadow-lg shadow-gold/20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold leading-tight mb-4">
            Sleep supplements cost $30-60 every single month.
          </h2>
          <p className="text-lg md:text-xl opacity-90 font-medium">
            The DreamWave Mask costs <span className="font-bold underline underline-offset-4">$69.99 once</span> — and you can use it every single night.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
