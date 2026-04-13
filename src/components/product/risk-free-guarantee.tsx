"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

const guaranteeBullets = [
  "Iron-clad 30-day money back guarantee",
  "Starts when you receive the product, not when you order",
  "Full refund if you\u2019re not completely satisfied",
  "Friendly customer care team ready to help",
  "24/7/365 email support",
];

export default function RiskFreeGuarantee() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight mb-4">
              Try It 100% Risk-Free for 30 Days
            </h2>

            <p className="text-slate leading-relaxed mb-6">
              Zero risk. If you don&apos;t love it, we&apos;ll make it right.
            </p>

            <div className="space-y-3 max-w-md mx-auto text-left mb-6">
              {guaranteeBullets.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-slate">
              Contact us anytime at{" "}
              <a href="mailto:shopslumbor@gmail.com" className="text-gold hover:underline font-semibold">
                shopslumbor@gmail.com
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
