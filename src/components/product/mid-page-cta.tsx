"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

export default function MidPageCTA() {
  return (
    <section className="px-6 py-20 md:py-28 bg-gradient-to-b from-background via-surface to-background">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl md:text-[40px] font-normal leading-tight text-heading">
            Tonight could be the night your brain finally lets go.
          </h2>
          <div className="mt-9 flex justify-center">
            <a
              href="#buy"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-gold px-10 py-4 text-base font-semibold tracking-[0.01em] text-[#0E1626] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-[#F2C87C] hover:shadow-[0_10px_38px_rgba(232,184,106,0.36)]"
            >
              Try it tonight
            </a>
          </div>
          <p className="mt-5 text-sm text-lavender">
            Free US shipping, a 180-night guarantee, and your money back if you are not
            sleeping better in 14 nights.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
