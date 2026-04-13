"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const bulletPoints = [
  "Lies awake for hours no matter how tired they are",
  "Has constantly puffy and strained eyes from screen time",
  "Wakes up exhausted even after 8 hours of sleep",
  "Wants to stop relying on sleep aids and melatonin",
  "Needs a nightly ritual to actually wind down",
];

const benefitBullets = [
  "Fall asleep naturally without supplements",
  "Wake up with rested, refreshed eyes",
  "Finally feel like sleep actually worked",
];

export default function PerfectFor() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-gold">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <ScrollReveal className="min-w-0">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gold tracking-tight mb-1">
                Perfect For
              </h2>
              <p className="text-xl md:text-2xl font-heading font-bold text-heading tracking-tight mb-8">
                People Who Are:
              </p>

              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://xp3x50z315.ufs.sh/f/4WAjKEfnI5pfeOS28Nm5SKDuf4CUMsBOTcyEJkPbFvgL8lq7"
                  alt="Perfect for people who struggle with sleep"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight mb-6">
              Who Is It For?
            </h2>
            <p className="text-slate leading-relaxed mb-5">
              If you are someone who:
            </p>
            <div className="flex flex-col items-center md:items-start space-y-3 mb-8">
              {bulletPoints.map((point, i) => (
                <p key={i} className="text-sm text-foreground max-w-[90%] md:max-w-none">
                  <span className="text-gold mr-2">&#8226;</span>{point}
                </p>
              ))}
            </div>
            <p className="text-slate leading-relaxed mb-5">
              Then <BrandName tm className="text-heading" /> is made for you.
            </p>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {benefitBullets.map((point, i) => (
                <div key={i} className="inline-flex items-start gap-3 max-w-[90%] md:max-w-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
