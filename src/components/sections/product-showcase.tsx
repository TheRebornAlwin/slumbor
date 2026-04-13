"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TextGradient from "@/components/ui/text-gradient";
import MagneticButton from "@/components/ui/magnetic-button";
import { heroProduct } from "@/lib/data";

export default function ProductShowcase() {
  return (
    <section className="py-24 md:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <ScrollReveal className="min-w-0">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-gold/10">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-light/20 to-transparent z-10 pointer-events-none" />
              <Image
                src={heroProduct.images[0]}
                alt={heroProduct.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="min-w-0 text-center md:text-left">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Featured Product
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading tracking-tight mb-4">
              Meet the{" "}
              <TextGradient variant="gold">{heroProduct.title}</TextGradient>
            </h2>
            <p className="text-slate leading-relaxed mb-6">
              {heroProduct.description}
            </p>

            <div className="space-y-4 mb-8 max-w-md mx-auto md:mx-0 md:max-w-none">
              {heroProduct.features.slice(0, 3).map((feature, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold-light/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gold"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-heading text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
              <span className="text-3xl font-bold text-gold">
                ${heroProduct.price.toFixed(2)}
              </span>
              <span className="text-lg text-muted line-through">
                ${heroProduct.compareAtPrice.toFixed(2)}
              </span>
              <span className="px-3 py-1 rounded-full bg-gold-light text-gold-dark text-xs font-bold">
                SAVE{" "}
                {Math.round(
                  ((heroProduct.compareAtPrice - heroProduct.price) /
                    heroProduct.compareAtPrice) *
                    100
                )}
                %
              </span>
            </div>

            <div className="flex justify-center md:justify-start">
              <MagneticButton
                variant="primary"
                size="lg"
                href="/products/dreamwave-mask/"
              >
                Get Yours Now
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
