"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "@/lib/data";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TextGradient from "@/components/ui/text-gradient";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Help Center
            </p>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-heading tracking-tight mb-4">
              Frequently Asked{" "}
              <TextGradient variant="gold">Questions</TextGradient>
            </h1>
            <p className="text-foreground">
              Can&apos;t find what you&apos;re looking for? Email us at{" "}
              <a
                href="mailto:shopslumbor@gmail.com"
                className="text-gold hover:underline"
              >
                shopslumbor@gmail.com
              </a>
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqData.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                >
                  <span className="font-semibold text-heading text-sm pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gold text-xl flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-5 pb-5 text-sm text-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
