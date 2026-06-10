"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const bulletPoints = [
  "Can't fall asleep even when you're completely exhausted",
  "Stares at screens all day and pays for it by bedtime",
  "Gets a tension headache by the end of every workday",
  "Has tried melatonin, apps, and tea and still can't switch off",
  "Wakes up at 2am with a brain that won't stop",
];

const benefitBullets = [
  "Relief in the comfort of your own bed",
  "No supplements, no apps, no subscriptions",
  "Better sleep, fewer headaches, calmer mornings",
];

export default function PerfectFor() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-gold">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <ScrollReveal className="min-w-0">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/8 shadow-lg">
              <Image
                src="/products/who-its-for.webp"
                alt="Who SleepWave Pro is for"
                width={700}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-heading tracking-tight mb-6">
              Who is this for?
            </h2>
            <p className="text-slate leading-relaxed mb-5">
              If you&apos;re someone who:
            </p>
            <div className="flex flex-col items-center md:items-start space-y-3 mb-8">
              {bulletPoints.map((point, i) => (
                <p key={i} className="text-sm text-foreground max-w-[90%] md:max-w-none">
                  <span className="text-gold mr-2">&#8226;</span>{point}
                </p>
              ))}
            </div>
            <p className="text-slate leading-relaxed mb-5">
              Then <BrandName tm className="text-heading" /> is built exactly for you.
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
