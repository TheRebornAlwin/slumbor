"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/magnetic-button";
import FloatingElement from "@/components/ui/floating-element";

// Drop a real product photo here when it's ready; until then the warm
// light object below stands in as the centerpiece, fully intentional.
const HERO_IMAGE = "";

function WarmLight() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Breathing halo */}
      <div className="atmosphere-lamp absolute h-[125%] w-[125%] rounded-full" />

      {/* Soft concentric rings, like ripples in still air */}
      <div className="absolute h-full w-full rounded-full border border-gold/10" />
      <div className="absolute h-[82%] w-[82%] rounded-full border border-gold/15" />

      {/* The light itself */}
      <div className="relative h-72 w-72 overflow-hidden rounded-full md:h-96 md:w-96">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,#FBF1DF_0%,#E8C79A_22%,#C99B66_46%,#2A2238_78%,#161E33_100%)]" />
        {/* Inner shadow for depth */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_-24px_60px_rgba(10,15,28,0.7),inset_0_10px_40px_rgba(251,241,223,0.25)]" />
        {/* A single soft highlight, top-left */}
        <div className="absolute left-[24%] top-[20%] h-16 w-16 rounded-full bg-white/30 blur-2xl md:h-24 md:w-24" />
        {HERO_IMAGE && (
          <Image
            src={HERO_IMAGE}
            alt="The SleepWave Pro resting in warm light"
            width={500}
            height={500}
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:py-36">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="order-1 min-w-0 text-center md:text-left"
          >
            <div className="mb-6 inline-block text-xs font-medium uppercase tracking-[0.28em] text-gold">
              The Wind-Down Mask
            </div>

            {/* Mobile centerpiece, between eyebrow and headline */}
            <div className="mb-10 flex justify-center md:hidden">
              <FloatingElement>
                <div className="scale-90">
                  <WarmLight />
                </div>
              </FloatingElement>
            </div>

            <h1 className="mb-7 font-heading text-[2.6rem] font-normal leading-[1.08] tracking-[-0.01em] text-heading sm:text-5xl lg:text-[3.9rem]">
              Let the day{" "}
              <span className="italic text-gold">finally</span> leave your body.
            </h1>

            <p className="mx-auto mb-9 max-w-md text-lg leading-[1.7] text-foreground/80 md:mx-0">
              The kind of warm pressure that pulls your shoulders down from your
              ears. The kind of quiet that makes your brain stop rehearsing
              tomorrow.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <MagneticButton
                variant="primary"
                size="lg"
                href="/products/sleepwave-pro/"
              >
                Shop the SleepWave Pro
              </MagneticButton>
              <MagneticButton variant="secondary" size="lg" href="/shop/">
                Learn more
              </MagneticButton>
            </div>

            <div className="mt-9 flex items-center justify-center gap-3 md:justify-start">
              <div className="text-sm tracking-[0.2em] text-gold">★★★★★</div>
              <span className="text-sm text-foreground/60">
                Loved by thousands of tired humans
              </span>
            </div>
          </motion.div>

          {/* Desktop centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
            className="order-2 hidden min-w-0 justify-center md:flex"
          >
            <FloatingElement>
              <WarmLight />
            </FloatingElement>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
