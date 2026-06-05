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
              className="inline-flex w-full sm:w-80 items-center justify-center rounded-full bg-gold px-9 py-4 text-base font-semibold tracking-[0.01em] text-[#0E1626] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-[#E5B889] hover:shadow-[0_10px_38px_rgba(212,165,116,0.32)]"
            >
              Try it tonight
            </a>
          </div>
          <p className="mt-5 text-sm text-lavender">
            Free US shipping. 180-night guarantee. Sleep better in 14 nights or full refund.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
