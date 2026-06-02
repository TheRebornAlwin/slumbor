"use client";

import ScrollReveal from "@/components/ui/scroll-reveal";

const guaranteeBullets = [
  "180-night full refund, starting the day it arrives",
  "Sleep better in 14 nights, or we make it right",
  "2-year warranty: free replacement if it ever stops working",
  "No restocking fee, no questions about why",
  "Keep both bonus guides either way",
  "Real humans answer your email within 24 hours",
];

export default function RiskFreeGuarantee() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-4">
              The worst that happens? You sleep on it for six months.
            </h2>

            <p className="text-slate leading-relaxed mb-8 max-w-md mx-auto">
              Then you send it back and we refund every cent, and you still keep the
              bonus. If you&apos;ve made it this far, you&apos;re tired of being sold to,
              so here&apos;s the honest version.
            </p>

            <div className="space-y-3 max-w-md mx-auto text-left mb-8">
              {guaranteeBullets.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>

            <p className="text-foreground/80 leading-relaxed mb-4 max-w-md mx-auto">
              We built this because we needed it ourselves. We stand behind it.
            </p>

            <p className="text-sm text-slate">
              Questions? Email us anytime at{" "}
              <a href="mailto:shopslumbor@gmail.com" className="text-gold hover:underline font-medium">
                shopslumbor@gmail.com
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
