"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";

const tabs = ["Details", "Shipping", "Our Guarantee"];

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex justify-center md:justify-start border-b border-white/8">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={cn(
              "px-5 py-3.5 text-sm font-medium transition-colors relative cursor-pointer",
              active === i ? "text-gold" : "text-muted hover:text-foreground"
            )}
          >
            {tab}
            {active === i && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="py-6 text-sm text-slate leading-relaxed text-center md:text-left">
        {active === 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2.5 text-left max-w-md mx-auto md:mx-0"
          >
            {product.specs.map((spec, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold mt-0.5 flex-shrink-0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{spec}</span>
              </li>
            ))}
          </motion.ul>
        )}

        {active === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <p>
              Due to extremely high demand, orders may take 1-2 weeks to arrive. We ship
              worldwide with tracking included on every order.
            </p>
            <p>
              Free shipping on all orders. No minimum purchase required.
            </p>
            <p>
              Need help? Email us at{" "}
              <a
                href="mailto:shopslumbor@gmail.com"
                className="text-gold hover:underline font-medium"
              >
                shopslumbor@gmail.com
              </a>
            </p>
          </motion.div>
        )}

        {active === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <p>
              We truly believe the DreamWave Mask is the best sleep tool
              at this price, and we back that up with a risk-free, ironclad{" "}
              <strong className="text-heading">30-day money back guarantee</strong>.
            </p>
            <p>
              If you don&apos;t have a positive experience for any reason, we
              will do whatever it takes to make sure you are 100% satisfied with
              your purchase.
            </p>
            <p>
              Contact our friendly support team at{" "}
              <a
                href="mailto:shopslumbor@gmail.com"
                className="text-gold hover:underline font-medium"
              >
                shopslumbor@gmail.com
              </a>{" "}
              and we&apos;ll make it right.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
