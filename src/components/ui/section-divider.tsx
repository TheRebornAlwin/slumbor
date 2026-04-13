"use client";

import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "aurora" | "ray" | "gradient";
  className?: string;
}

export default function SectionDivider({
  variant = "aurora",
  className,
}: SectionDividerProps) {
  if (variant === "gradient") {
    return (
      <div
        className={cn("h-24 w-full section-gradient-gold", className)}
      />
    );
  }

  if (variant === "ray") {
    return (
      <div className={cn("flex justify-center py-8", className)}>
        <div className="h-px w-full max-w-xl bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>
    );
  }

  return (
    <div className={cn("flex justify-center py-8", className)}>
      <div
        className="h-px w-full max-w-xl animate-shimmer"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, #d4a853, #e5c06e, #d4a853, transparent)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}
