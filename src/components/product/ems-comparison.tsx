"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

export default function EMSComparison() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">The Difference</p>
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-heading tracking-tight">
              The old way vs the SleepWave Pro
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <ScrollReveal delay={0.1} className="min-w-0">
            <div className="relative p-8 rounded-2xl bg-white/3 border border-white/8 h-full">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 text-lavender text-xs font-medium">
                OLD WAY
              </div>
              <div className="mb-6 mt-4">
                <div className="w-full h-40 rounded-xl bg-white/3 flex items-center justify-center relative overflow-hidden">
                  <div className="relative w-48">
                    <div className="text-center text-[10px] text-lavender font-medium mb-3">STILL WIRED AT MIDNIGHT</div>
                    <div className="space-y-2">
                      <div className="h-4 bg-white/5 rounded" />
                      <div className="h-4 bg-white/5 rounded" />
                      <div className="h-4 bg-white/3 rounded" />
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#b04a4a]/50" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#b04a4a]/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#b04a4a]/50" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-heading font-medium text-lavender mb-2 text-center md:text-left">Pills, apps, and the wait-it-out method</h3>
              <p className="text-sm text-muted leading-relaxed mb-4 text-center md:text-left">
                Melatonin works once. Sleep apps need a phone in your hand. Hot showers fade in 20 minutes. None of it actually tells your nervous system the day is over.
              </p>
              <div className="flex items-center gap-2 text-muted justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                <span className="text-xs font-medium">Never reaches the signal your body needs</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="min-w-0">
            <div className="relative p-8 rounded-2xl bg-gold/5 border-2 border-gold/20 h-full shadow-sm">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold text-[#0E1626] text-xs font-medium">
                SLEEPWAVE PRO
              </div>
              <div className="mb-6 mt-4">
                <div className="w-full h-40 rounded-xl bg-gold/5 flex items-center justify-center relative overflow-hidden">
                  <div className="relative w-48">
                    <div className="text-center text-[10px] text-gold font-medium mb-3">WARMTH + PULSE</div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gold/15 rounded" />
                      <div className="h-4 bg-gold/20 rounded" />
                      <div className="h-4 bg-gold/25 rounded" />
                    </div>
                    <div className="text-center text-[10px] text-gold font-medium mt-3">NERVOUS SYSTEM, OFF</div>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2">
                      <div className="w-8 h-8 rounded-full border border-gold/30 animate-ping" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-heading font-medium text-heading mb-2 text-center md:text-left">Warmth and a slow pulse, in silence</h3>
              <p className="text-sm text-slate leading-relaxed mb-4 text-center md:text-left">
                Two signals your nervous system was built to respond to, delivered in 15 silent minutes a night. The last thing you do before sleep, instead of the thing you lie there fighting.
              </p>
              <div className="flex items-center gap-2 text-gold justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-xs font-medium">Signals your body actually responds to</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
