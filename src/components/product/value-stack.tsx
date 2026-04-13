"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

const bonuses = [
  {
    label: "Premium Sleep Mask Pouch Included",
    originalPrice: "$12.99",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gold">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "16 Adjustable Vibration Levels",
    originalPrice: "$9.99",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gold">
        <rect x="4" y="14" width="3" height="6" rx="1" fill="currentColor" opacity="0.3"/>
        <rect x="8.5" y="11" width="3" height="9" rx="1" fill="currentColor" opacity="0.5"/>
        <rect x="13" y="7" width="3" height="13" rx="1" fill="currentColor" opacity="0.7"/>
        <rect x="17.5" y="3" width="3" height="17" rx="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "5 Relaxation Modes",
    originalPrice: "$14.99",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gold">
        <path d="M2 12 C5 8, 7 16, 10 12 C13 8, 15 16, 18 12 C20 9, 22 14, 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.2"/>
      </svg>
    ),
  },
  {
    label: "USB-C Fast Charging Cable",
    originalPrice: "$7.99",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gold">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Free Worldwide Shipping",
    originalPrice: "$9.99",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gold">
        <rect x="1" y="6" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 9h4l3 3v4h-7V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "30-Day Money-Back Guarantee",
    originalPrice: "Priceless",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gold">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5"/>
        <polyline points="9 12 11 14 15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function ValueStack() {
  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-b from-surface to-surface/50">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">Total Value</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading tracking-tight mb-3">
              Everything You Get Today
            </h2>
            <p className="text-slate text-sm">All of this is included with your DreamWave Mask</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-2xl border border-white/8 bg-surface shadow-sm overflow-hidden">
            <div className="divide-y divide-white/5">
              {bonuses.map((bonus, i) => (
                <div key={i} className="flex items-center justify-between px-5 sm:px-6 py-4 gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gold/5 flex items-center justify-center flex-shrink-0">
                      {bonus.icon}
                    </div>
                    <span className="text-sm font-medium text-heading">{bonus.label}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm text-gray-400 line-through">{bonus.originalPrice}</span>
                    <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full">FREE</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
