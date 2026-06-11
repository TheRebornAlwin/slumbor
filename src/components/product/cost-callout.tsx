"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

export default function CostCallout() {
  return (
    <section className="py-16 md:py-20 px-6">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold via-[#CFA05A] to-gold" />
          {/* Subtle shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/10" />
          <div className="relative text-[#0E1626] text-center py-14 md:py-16 px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium leading-tight mb-4">
              A bottle of melatonin runs out in three weeks.
            </h2>
            <p className="text-lg md:text-xl font-medium opacity-85">
              The SleepWave Pro costs <span className="font-semibold underline underline-offset-4">$69.99 once</span>, and you can use it every night for the rest of your life.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
