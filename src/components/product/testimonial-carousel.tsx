"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/scroll-reveal";

const testimonials = [
  {
    text: "I used to lie awake for at least an hour every single night. The first night I tried the DreamWave Mask I was out in fifteen minutes. The warmth is so soothing and the gentle vibration melts away all the tension from the day. I genuinely cannot sleep without it now.",
    name: "Amanda E.",
    location: "Ontario, Canada",
  },
  {
    text: "I was skeptical because I have tried everything. Melatonin, magnesium, sleep apps, even prescription sleep aids. Nothing worked consistently. This mask does something different. The heat relaxes my eyes and the vibration turns my brain off. I fall asleep before the auto shutoff kicks in every time.",
    name: "Jessica M.",
    location: "Austin, United States",
  },
  {
    text: "My dark circles and puffiness have genuinely improved since I started using this every night. I used to wake up looking like I hadn't slept in days even after eight hours. Now my under eyes are visibly less puffy. My coworkers asked if I changed my skincare routine.",
    name: "Yasmin R.",
    location: "Houston, United States",
  },
  {
    text: "I work night shifts and sleeping during the day has always been impossible for me. This mask blocks out the light and the heat and vibration actually relax me enough to fall asleep within minutes. Best purchase I have made in years.",
    name: "Tyler B.",
    location: "Denver, United States",
  },
  {
    text: "I bought this for my husband who scrolls his phone for two hours before falling asleep. He was skeptical but now he puts the mask on instead and is asleep in ten minutes. He even asked me to order a second one for travel.",
    name: "Sarah L.",
    location: "Toronto, Canada",
  },
  {
    text: "As a nurse working twelve hour shifts, my eyes are exhausted by the time I get home. The heated mask is like a spa treatment for my face every single night. The different vibration modes are great because some nights I need gentle and some nights I need more pressure.",
    name: "Lisa M.",
    location: "New York, United States",
  },
  {
    text: "I have spent hundreds on sleep supplements over the past few years. This seventy dollar mask has done more for my sleep than all of them combined. No grogginess in the morning, no dependency, just genuine relaxation that puts me to sleep naturally.",
    name: "Brandon C.",
    location: "Portland, United States",
  },
  {
    text: "I stare at screens all day for work and my eyes are always strained and tired by bedtime. Putting this on is like an instant reset. The warmth spreads across my eyes and I can literally feel my whole body relaxing. My sleep quality has improved dramatically.",
    name: "Jenna K.",
    location: "Vancouver, Canada",
  },
  {
    text: "Honestly did not think an eye mask could change my sleep this much. I was wrong. The combination of heat and vibration does something that just blocking light cannot do. My brain actually turns off. I use the wave mode on medium heat and I am out within ten minutes.",
    name: "David R.",
    location: "Chicago, United States",
  },
  {
    text: "I suffer from terrible anxiety at night and my mind races the second I lie down. This mask gives me something to focus on other than my thoughts. The gentle warmth and pulsing vibration calm my nervous system down. I fall asleep so much faster now.",
    name: "Priya S.",
    location: "Calgary, Canada",
  },
  {
    text: "I travel constantly for work and hotel sleep is always terrible. I now bring this mask everywhere. Put it on, set the heat to level three, and I am asleep in a strange bed faster than I fall asleep at home without it. Game changer for business travel.",
    name: "Carlos M.",
    location: "Miami, United States",
  },
  {
    text: "After having my baby I forgot what real sleep felt like. Even when she sleeps through the night now I still could not fall asleep. This mask helps me make the most of the hours I get. I put it on and I am out. The fifteen minute auto shutoff is perfect.",
    name: "Rachel W.",
    location: "Seattle, United States",
  },
  {
    text: "Bought one for myself and immediately ordered two more for my parents. My mom has had insomnia for years and she texted me saying she slept through the night for the first time in months. My dad uses his for eye strain after reading. Best gifts I have ever given.",
    name: "Kevin T.",
    location: "Ottawa, Canada",
  },
  {
    text: "I am a software developer and my eyes are destroyed by the end of every workday. This mask has become my nightly ritual. Fifteen minutes of heat therapy before bed and my eyes feel completely refreshed. I fall asleep faster and wake up without that heavy tired feeling.",
    name: "Michelle P.",
    location: "Nashville, United States",
  },
  {
    text: "I tried those expensive weighted sleep masks and they just felt uncomfortable and heavy. This is completely different. The heat is perfectly gentle and the vibration is so soothing without being intrusive. The memory foam fits my face perfectly. Worth every penny.",
    name: "James H.",
    location: "Edmonton, Canada",
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    if (index < 0) setCurrent(testimonials.length - 1);
    else if (index >= testimonials.length) setCurrent(0);
    else setCurrent(index);
  };

  const t = testimonials[current];
  const initial = t.name.charAt(0).toUpperCase();

  return (
    <section className="py-20 md:py-28 px-6 bg-surface section-glow-purple">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight">
              Join Our 5,000+ Happy Sleepers!
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="rounded-2xl border border-white/8 bg-surface-raised shadow-sm p-8 md:p-10 min-h-[280px] flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center"
              >
                <div className="flex text-gold text-lg mb-6">
                  {"★★★★★"}
                </div>

                <p className="text-slate leading-relaxed text-[15px] md:text-base mb-8 max-w-xl">
                  {t.text}
                </p>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-gold">{initial}</span>
                  </div>
                  <div>
                    <p className="font-bold text-heading text-sm">
                      {t.name}{" "}
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gold inline-block"><polyline points="20 6 9 17 4 12"/></svg>
                    </p>
                    <p className="text-xs text-muted">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-10 h-10 rounded-full bg-surface-raised border border-white/10 shadow-sm flex items-center justify-center text-foreground hover:border-gold hover:text-gold transition-colors cursor-pointer"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-10 h-10 rounded-full bg-surface-raised border border-white/10 shadow-sm flex items-center justify-center text-foreground hover:border-gold hover:text-gold transition-colors cursor-pointer"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                i === current ? "bg-gold scale-110" : "bg-white/20 hover:bg-white/30"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
