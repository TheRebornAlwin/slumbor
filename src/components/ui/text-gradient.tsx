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
    gold: "from-gold to-gold-dark",
    warm: "from-gold to-amber-400",
    aurora: "from-gold via-purple to-gold-dark",
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
