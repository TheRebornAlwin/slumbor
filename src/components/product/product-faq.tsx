"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/scroll-reveal";

const faqItems = [
  {
    question: "How does the heat and vibration help me sleep?",
    answer:
      "The gentle warmth relaxes the muscles around your eyes, temples, and forehead, while micro-vibrations release built-up tension from the day. Together, they activate your parasympathetic nervous system — your body's natural wind-down response — helping you fall asleep faster and more deeply.",
  },
  {
    question: "Is it safe to fall asleep wearing it?",
    answer:
      "Absolutely. The DreamWave Mask has a 15-minute auto-shutoff feature, so it gently powers down once you've drifted off. The materials are hypoallergenic and breathable, and the heat stays within a safe, comfortable range at all times.",
  },
  {
    question: "How long should I use it before bed?",
    answer:
      "Most people put it on as they lie down to sleep and are asleep before the 15-minute auto-shutoff even kicks in. You can also use it earlier in your wind-down routine — while reading, meditating, or just relaxing. There's no wrong time to use it.",
  },
  {
    question: "Will it help with dark circles and puffiness?",
    answer:
      "Yes. The gentle heat increases blood circulation around the eyes, which helps reduce fluid retention and puffiness. Many customers notice visibly less puffiness and lighter dark circles within the first week of nightly use.",
  },
  {
    question: "How is this different from a regular sleep mask?",
    answer:
      "A regular sleep mask just blocks light. The DreamWave Mask actively helps you fall asleep through controlled heat therapy and micro-vibration massage. It relaxes your muscles, reduces eye strain, and triggers your body's natural sleep response — something a fabric mask simply cannot do.",
  },
  {
    question: "What if it doesn't work for me?",
    answer:
      "We offer a 30-day money-back guarantee. If you are not satisfied for any reason, just email us at shopslumbor@gmail.com within 30 days of delivery and we will give you a full refund. No hassle, no questions.",
  },
  {
    question: "How long until I notice a difference?",
    answer:
      "Most people notice they fall asleep faster from the very first use. The relaxation effect is immediate — the warmth and vibration begin working the moment you put it on. For puffiness and dark circles, most customers see visible improvement within 5-7 days of nightly use.",
  },
  {
    question: "Can I adjust the intensity?",
    answer:
      "Yes. The DreamWave Mask has 5 heat levels (from gentle warmth to deep soothing heat) and 3 vibration modes (constant, pulsing, and wave). You can mix and match to find the exact combination that works best for you.",
  },
];

export default function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-background section-glow-gold">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">
              Common Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/8 bg-surface-raised overflow-hidden transition-all duration-300 hover:border-white/15">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer"
                >
                  <span className="text-[15px] font-semibold text-heading leading-snug text-center md:text-left">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gold"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6">
                        <p className="text-sm text-slate leading-relaxed text-center md:text-left">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
