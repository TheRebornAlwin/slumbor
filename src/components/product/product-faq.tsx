"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/scroll-reveal";

const faqItems = [
  {
    question: "How long does it last on a charge?",
    answer:
      "You will get up to four sessions out of a single charge, and it tops back up in about an hour and a half over USB-C, so it tends to just live on your nightstand and stay ready whenever you need it.",
  },
  {
    question: "Does it actually help with headaches, or just sleep?",
    answer:
      "It helps with both, honestly. The warmth and the slow pulse loosen the tension that builds up behind your eyes and temples after a long day on screens, so a lot of people reach for it the moment a tension headache starts, and not only at bedtime.",
  },
  {
    question: "Is the pulse going to feel like too much on my eyes?",
    answer:
      "Not at all. The pulse is built to sit gently around your sinuses and temples rather than push on your eyes, so most people describe it as feeling like a warm hand resting softly over their face while they fall asleep.",
  },
  {
    question: "How long do I wear it each night?",
    answer:
      "About fifteen to twenty minutes is all it takes, and there is an auto shutoff so you do not have to think about it. You put it on, you lie back, and most people are asleep before it finishes the session.",
  },
  {
    question: "What if it breaks?",
    answer:
      "It is covered by a two-year warranty, so if it ever stops working, just send us a quick email at shopslumbor@gmail.com and we will get a free replacement out to you. There is no fine print and nothing to argue about.",
  },
  {
    question: "What if it doesn't work for me?",
    answer:
      "Then you send it back, simple as that. You have a full 180 nights to try it, and if you are not sleeping better, email us at shopslumbor@gmail.com for a refund of every cent. You keep the bonus workbook either way, and there is no restocking fee and no questions about why.",
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
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-heading tracking-tight">
              FAQs
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
