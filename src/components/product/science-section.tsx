"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import BrandName from "@/components/ui/brand-name";

const scienceBullets = [
  "Gentle heat relaxes the muscles around your eyes and temples",
  "Micro-vibrations release tension carried from the day",
  "Together they activate your parasympathetic nervous system",
  "Same heat therapy principles used in professional spa treatments",
];

export default function ScienceSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal className="min-w-0">
            <div className="text-center">
              <Image
                src="https://xp3x50z315.ufs.sh/f/4WAjKEfnI5pfVjxSwuCcDRq1IaUousEkQV5YgOpbLT7hxeNm"
                alt="The science behind the DreamWave Mask"
                width={500}
                height={500}
                className="w-full h-auto object-contain mx-auto"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight mb-4">
              How Does It Work?
            </h2>
            <p className="text-slate leading-relaxed mb-6">
              <BrandName tm className="text-heading" /> uses{" "}
              <span className="font-bold text-heading">heat therapy combined with micro-vibration massage</span>{" "}
              to trigger your body&apos;s natural wind-down response and help you drift into deep sleep.
            </p>
            <div className="flex flex-col items-center md:items-start space-y-3">
              {scienceBullets.map((point, i) => (
                <p key={i} className="text-sm text-foreground max-w-[90%] md:max-w-none">
                  <span className="text-gold mr-2">&#8226;</span>{point}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
