"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

const features = [
  {
    title: "Contoured 3D cups",
    body: "The cups arch over your eyes instead of pressing on them. No weight on your eyelids, so it stays comfortable the whole time you wear it.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Five heat settings",
    body: "Choose a light warmth or a deeper heat, whatever your face needs that night. The warmth is what tells your body it is safe to wind down.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    ),
  },
  {
    title: "Adjustable strap",
    body: "Loosen or tighten it to your head in seconds. It stays put when you roll over and never pulls at your hair.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    title: "Six pulse modes",
    body: "A soft, steady pulse around your eyes, like a slow massage. Your body reads the rhythm as a cue to calm down.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

export default function FeaturesLove() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              The details
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-heading tracking-tight">
              Every part of it earns its place.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.08} className="min-w-0">
              <div className="h-full p-7 md:p-8 rounded-2xl bg-surface border border-white/8 shadow-sm hover:shadow-md hover:border-gold/20 transition-all duration-300 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-gold/5 flex items-center justify-center mb-5 text-gold mx-auto sm:mx-0">
                  {f.icon}
                </div>
                <h3 className="font-heading text-xl font-medium text-heading mb-2">
                  {f.title}
                </h3>
                <p className="text-[15px] text-foreground/80 leading-relaxed">
                  {f.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
