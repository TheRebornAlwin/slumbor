"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

export default function EMSComparison() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">The Difference</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading tracking-tight">
              DreamWave vs Everything Else
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <ScrollReveal delay={0.1} className="min-w-0">
            <div className="relative p-8 rounded-2xl bg-white/3 border border-white/8 h-full">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 text-muted text-xs font-bold">
                TRADITIONAL
              </div>
              <div className="mb-6 mt-4">
                <div className="w-full h-40 rounded-xl bg-white/3 flex items-center justify-center relative overflow-hidden">
                  <div className="relative w-48">
                    <div className="h-3 bg-white/10 rounded-full mb-2" />
                    <div className="text-center text-[10px] text-muted font-medium mb-3">SURFACE LEVEL</div>
                    <div className="space-y-2">
                      <div className="h-4 bg-white/5 rounded" />
                      <div className="h-4 bg-white/5 rounded" />
                      <div className="h-4 bg-white/3 rounded" />
                    </div>
                    <div className="text-center text-[10px] text-muted font-medium mt-2">DEEP RELAXATION</div>
                    <div className="absolute -top-4 left-8 flex gap-1">
                      <svg width="20" height="24" viewBox="0 0 20 24"><path d="M10 0 L10 10" stroke="#6b6b8a" strokeWidth="2" strokeDasharray="3 3"/><circle cx="10" cy="12" r="3" fill="#6b6b8a" opacity="0.4"/></svg>
                      <svg width="20" height="24" viewBox="0 0 20 24"><path d="M10 0 L10 10" stroke="#6b6b8a" strokeWidth="2" strokeDasharray="3 3"/><circle cx="10" cy="12" r="3" fill="#6b6b8a" opacity="0.4"/></svg>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-muted mb-2 text-center md:text-left">Regular Sleep Masks</h3>
              <p className="text-sm text-muted leading-relaxed mb-4 text-center md:text-left">
                Just blocks light. A basic sleep mask does nothing to relax your muscles, reduce puffiness, or help your brain wind down. You still lie there awake.
              </p>
              <div className="flex items-center gap-2 text-muted justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                <span className="text-xs font-medium">Doesn&apos;t help you fall asleep</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="min-w-0">
            <div className="relative p-8 rounded-2xl bg-gold/5 border-2 border-gold/20 h-full shadow-sm">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold text-navy text-xs font-bold">
                DREAMWAVE MASK
              </div>
              <div className="mb-6 mt-4">
                <div className="w-full h-40 rounded-xl bg-gold/5 flex items-center justify-center relative overflow-hidden">
                  <div className="relative w-48">
                    <div className="h-3 bg-gold/30 rounded-full mb-2" />
                    <div className="text-center text-[10px] text-gold font-medium mb-3">HEAT + VIBRATION</div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gold/15 rounded" />
                      <div className="h-4 bg-gold/20 rounded" />
                      <div className="h-4 bg-gold/25 rounded" />
                    </div>
                    <div className="text-center text-[10px] text-gold font-medium mt-2">DEEP RELAXATION</div>
                    <div className="absolute -top-4 left-8 flex gap-1">
                      <svg width="20" height="60" viewBox="0 0 20 60"><path d="M10 0 L10 50" stroke="#c9a84c" strokeWidth="2"/><polygon points="5,50 15,50 10,58" fill="#c9a84c"/></svg>
                      <svg width="20" height="60" viewBox="0 0 20 60"><path d="M10 0 L10 50" stroke="#c9a84c" strokeWidth="2"/><polygon points="5,50 15,50 10,58" fill="#c9a84c"/></svg>
                    </div>
                    <div className="absolute top-12 left-1/2 -translate-x-1/2">
                      <div className="w-8 h-8 rounded-full border-2 border-gold/30 animate-ping" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-heading mb-2 text-center md:text-left">Heat + Vibration Therapy</h3>
              <p className="text-sm text-slate leading-relaxed mb-4 text-center md:text-left">
                Actively relaxes your muscles. Gentle heat and micro-vibration work together to trigger your body&apos;s natural wind-down response, helping you fall asleep in minutes.
              </p>
              <div className="flex items-center gap-2 text-gold justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-xs font-bold">Triggers natural sleep response</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
