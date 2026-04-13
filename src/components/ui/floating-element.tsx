"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}

export default function FloatingElement({
  children,
  className,
  amplitude = 20,
  duration = 6,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{ y: [-amplitude / 2, amplitude / 2, -amplitude / 2] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
