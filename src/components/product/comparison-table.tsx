"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold mx-auto"><polyline points="20 6 9 17 4 12"/></svg>
);
const Cross = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted mx-auto"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const rows = [
  { label: "Price", dreamwave: "$69.99 one-time", supplements: "$30-60/month", mask: "$10-20" },
  { label: "Actually relaxes the muscles", dreamwave: true, supplements: false, mask: false },
  { label: "No recurring cost", dreamwave: true, supplements: false, mask: true },
  { label: "Drug-free", dreamwave: true, supplements: false, mask: true },
  { label: "Reduces puffiness and dark circles", dreamwave: true, supplements: false, mask: false },
  { label: "Usable every single night", dreamwave: true, supplements: true, mask: true },
  { label: "Heat and vibration therapy", dreamwave: true, supplements: false, mask: false },
  { label: "Works in 15 minutes", dreamwave: true, supplements: false, mask: false },
];

export default function ComparisonTable() {
  return (
    <section className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">Compare</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading tracking-tight">
              DreamWave Mask vs The Rest
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-2xl border border-white/8 overflow-hidden shadow-sm">
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr]">
              <div className="p-3 sm:p-4" />
              <div className="p-3 sm:p-4 bg-gold text-navy text-center text-xs sm:text-sm font-bold">
                DreamWave Mask
              </div>
              <div className="p-3 sm:p-4 text-center text-xs sm:text-sm font-bold text-heading">
                Sleep Supplements
              </div>
              <div className="p-3 sm:p-4 text-center text-xs sm:text-sm font-bold text-heading">
                Regular Eye Mask
              </div>
            </div>

            {rows.map((row, ri) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_1fr_1fr_1fr] ${ri % 2 === 0 ? "bg-white/2" : "bg-transparent"}`}
              >
                <div className="p-2.5 sm:p-4 text-[11px] sm:text-sm font-medium text-foreground flex items-center">
                  {row.label}
                </div>
                <div className="p-2.5 sm:p-4 bg-gold/5 flex items-center justify-center">
                  {typeof row.dreamwave === "boolean" ? (
                    row.dreamwave ? <Check /> : <Cross />
                  ) : (
                    <span className="text-gold font-bold text-[11px] sm:text-sm text-center">{row.dreamwave}</span>
                  )}
                </div>
                <div className="p-2.5 sm:p-4 flex items-center justify-center">
                  {typeof row.supplements === "boolean" ? (
                    row.supplements ? <Check /> : <Cross />
                  ) : (
                    <span className="text-slate text-[11px] sm:text-sm text-center">{row.supplements}</span>
                  )}
                </div>
                <div className="p-2.5 sm:p-4 flex items-center justify-center">
                  {typeof row.mask === "boolean" ? (
                    row.mask ? <Check /> : <Cross />
                  ) : (
                    <span className="text-slate text-[11px] sm:text-sm text-center">{row.mask}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
