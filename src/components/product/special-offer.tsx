"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const bonuses = [
  { name: "Travel Pouch Included", wasPrice: "$14.99" },
  { name: "3 Vibration Modes Unlocked", wasPrice: "$19.99" },
  { name: "5 Heat Levels Included", wasPrice: "$14.99" },
];

export default function SpecialOffer() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-gold">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-2">
              Limited Time
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight mb-4">
              Special Offer Today!
            </h2>
            <p className="text-slate text-[15px] leading-relaxed mb-5">
              Try <BrandName tm /> NOW Risk-Free at an All Time Low Price.
            </p>

            <p className="text-base font-bold text-heading mb-4">Act Now and You&apos;ll Get:</p>
            <div className="inline-block text-left space-y-3">
              {[
                <>50% OFF <BrandName tm /></>,
                "$50 Worth of Free Bonuses Included",
                "30 Day Money Back Guarantee",
                "FREE Shipping Worldwide",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-[15px] text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-sm font-bold tracking-[0.15em] uppercase text-heading mb-5">
                What&apos;s Included:
              </p>

              <div className="w-full rounded-2xl overflow-hidden mb-8">
                <Image
                  src=""
                  alt="Slumbor DreamWave Mask special offer"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="flex items-center gap-4 justify-center md:justify-start">
                <span className="text-2xl text-muted line-through font-medium">$139.99</span>
                <span className="text-4xl md:text-5xl font-black text-gold">$69.99</span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight mb-8">
                Bonuses Today:
              </h3>

              <div className="space-y-6 mb-10">
                {bonuses.map((bonus, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-surface-raised border border-white/8 shadow-sm">
                    <div>
                      <p className="text-base font-bold text-heading mb-1">{bonus.name}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted line-through">{bonus.wasPrice}</span>
                        <span className="text-sm font-black text-gold uppercase">Free Today!</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-gold/5 border border-gold/10 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold mx-auto mb-3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <p className="text-sm font-black text-heading mb-1">30-DAY GUARANTEE</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-muted line-through">$19.95</span>
                    <span className="text-xs font-black text-gold">FREE TODAY!</span>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-gold/5 border border-gold/10 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold mx-auto mb-3"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                  <p className="text-sm font-black text-heading mb-1">FREE SHIPPING</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-muted line-through">$4.95</span>
                    <span className="text-xs font-black text-gold">FREE TODAY!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
