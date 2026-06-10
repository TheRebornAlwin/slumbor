"use client";

import { cn } from "@/lib/utils";

interface TextGradientProps {
  children: React.ReactNode;
  variant?: "gold" | "warm" | "aurora";
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function TextGradient({
  children,
  variant = "gold",
  className,
  as: Component = "span",
}: TextGradientProps) {
  const gradients = {
    gold: "from-[#F0D5AE] via-gold to-[#CFA05A]",
    warm: "from-gold via-[#F0D5AE] to-gold",
    aurora: "from-gold via-lavender to-[#F0D5AE]",
  };

  return (
    <Component
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradients[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}
