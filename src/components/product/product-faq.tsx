"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/scroll-reveal";

const faqItems = [
  {
    question: "Will the shutdown noise wake me back up?",
    answer:
      "No. This was the single biggest complaint people had about other masks, the cheerful voice announcing 'goodbye' right as they drifted off. The SleepWave Pro just goes quiet. It powers down silently after 15 minutes.",
  },
  {
    question: "Is the pressure going to hurt my eyes?",
    answer:
      "No. The pulse is designed to wrap your sinuses and temples, not press your eyeballs back into your head. It's soft on purpose. Most people describe it as a hand resting gently over their eyes.",
  },
  {
    question: "Does it actually help with headaches, or just sleep?",
    answer:
      "Both. The warmth and slow pulse loosen the tension that stacks up behind your eyes and temples after a long day at screens. A lot of people reach for it the moment a tension headache starts, not just at bedtime.",
  },
  {
    question: "How long does it last on a charge?",
    answer:
      "Up to 4 sessions per charge. It tops up in about 1.5 hours over USB-C, so it's always ready on your nightstand.",
  },
  {
    question: "Can I use my own music, or am I stuck with the built-in tracks?",
    answer:
      "Either. There are quiet wind-down tracks built in, or you can pair it over Bluetooth and play whatever puts you under. The motor is quieter than the music, so the music is what you hear.",
  },
  {
    question: "What if it doesn't work for me?",
    answer:
      "You have 180 nights. Sleep better within 14 of them or email us at shopslumbor@gmail.com for a full refund. Keep the bonus audio guide either way. No restocking fee, no questions about why.",
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
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold mb-3">
              Common Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-heading tracking-tight">
              Frequently asked questions
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
