"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.3,
  className,
}: ScrollRevealProps) {
  const offsets = {
    up: { y: 24 },
    down: { y: -24 },
    left: { y: 16 },
    right: { y: 16 },
  };

  const offset = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, y: offset.y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
