"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

const beforeItems = [
  "Lying awake for hours, unable to quiet your mind",
  "Tension building up behind your eyes throughout the day",
  "Spending $60+ per session on sleep therapies that barely help",
  "Relying on sleeping pills just to get through the night",
  "Waking up exhausted and dreading the day ahead",
];

const afterItems = [
  "Drifting off peacefully within minutes of lying down",
  "Getting through the day feeling rested and refreshed",
  "One-time investment that you can use every single night",
  "Natural, drug-free relaxation whenever you need it",
  "Waking up energized and ready for the day",
];

export default function BeforeAfter() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">The Transformation</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading tracking-tight">
              Life Before vs After the DreamWave Mask
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <ScrollReveal delay={0.1} className="min-w-0">
            <div className="p-8 rounded-2xl bg-surface border border-white/8 h-full">
              <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-500">Without It</h3>
              </div>
              <div className="space-y-3">
                {beforeItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-300 flex-shrink-0 mt-0.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    <span className="text-sm text-gray-500 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* After */}
          <ScrollReveal delay={0.2} className="min-w-0">
            <div className="p-8 rounded-2xl bg-gold/5 border-2 border-gold/20 h-full shadow-sm">
              <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-heading">With DreamWave Mask</h3>
              </div>
              <div className="space-y-3">
                {afterItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-sm text-heading leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
