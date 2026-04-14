"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/magnetic-button";
import TextGradient from "@/components/ui/text-gradient";
import FloatingElement from "@/components/ui/floating-element";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-light/30 via-surface to-background" />

      {/* God ray */}
      <div className="absolute inset-0 god-ray" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-warm/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-40 w-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text column - on mobile: tag first, then image slot, then rest */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left min-w-0 order-1 md:order-1"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-light/60 text-gold-dark text-xs font-semibold tracking-[0.15em] uppercase">
              Heated Vibration Technology
            </div>

            {/* Mobile-only image: shows between tag and headline */}
            <div className="flex justify-center md:hidden mb-6">
              <FloatingElement>
                <div className="relative">
                  <div className="absolute inset-0 bg-gold/10 rounded-3xl blur-2xl scale-110" />
                  <div className="relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl shadow-gold/15">
                    <Image
                      src=""
                      alt="DreamWave Mask"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </FloatingElement>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-heading leading-tight tracking-tight mb-6">
              Your sleepless nights{" "}
              <TextGradient variant="gold">
                don&apos;t stand a chance
              </TextGradient>
            </h1>
            <p className="text-lg text-slate leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
              The gentle warmth and soothing vibrations melt away the tension
              around your eyes and you can actually feel yourself drifting off.
              It&apos;s not like anything else you&apos;ve tried.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <MagneticButton
                variant="primary"
                size="lg"
                href="/products/dreamwave-mask/"
              >
                Shop Now
              </MagneticButton>
              <MagneticButton variant="secondary" size="lg" href="/shop/">
                Learn More
              </MagneticButton>
            </div>

            <div className="flex items-center gap-3 mt-8 justify-center md:justify-start">
              <div className="flex text-warm text-sm">
                {"★★★★★"}
              </div>
              <span className="text-sm text-slate">
                Trusted by <span className="font-semibold text-heading">10,000+</span> customers
              </span>
            </div>
          </motion.div>

          {/* Desktop-only image column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex justify-center min-w-0 order-2"
          >
            <FloatingElement>
              <div className="relative">
                <div className="absolute inset-0 bg-gold/10 rounded-3xl blur-2xl scale-110" />
                <div className="relative w-96 h-96 rounded-3xl overflow-hidden shadow-2xl shadow-gold/15">
                  <Image
                    src=""
                    alt="DreamWave Mask"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </FloatingElement>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
