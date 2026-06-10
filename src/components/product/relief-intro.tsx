"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const painPoints = [
  {
    title: "Wired all evening",
    body: "Eyes burning by 4pm, headache by 7pm, still can't switch off by 11pm.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Exhausted but awake",
    body: "Lying there completely drained, and your brain still won't power down.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    title: "Tried everything",
    body: "Melatonin, supplements, sleep apps. Still staring at the ceiling.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    ),
  },
  {
    title: "Rough mornings",
    body: "Waking up groggy and heavy, like a truck ran over you in the night.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
        <line x1="23" y1="22" x2="1" y2="22" />
        <polyline points="8 6 12 2 16 6" />
      </svg>
    ),
  },
];

export default function ReliefIntro() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-purple">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              Sound familiar?
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-heading tracking-tight">
              Give your nervous system the off-switch it&apos;s been begging for.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 mb-10">
          {painPoints.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.08} className="min-w-0">
              <div className="h-full flex items-start gap-4 p-5 md:p-6 rounded-2xl bg-background/40 border border-white/8 text-left">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center text-slate">
                  {p.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-heading mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">{p.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="flex items-start gap-4 rounded-2xl border border-gold/20 bg-gold/[0.06] p-6 md:p-7 text-left">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <p className="text-[15px] md:text-base text-foreground leading-relaxed">
              <span className="font-semibold text-heading">You don&apos;t have to keep grinding through it.</span>{" "}
              <BrandName tm /> is built for exactly this: warmth and a slow pulse that
              walk your body down into sleep, in the kind of quiet that lets it work.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
