"use client";

import { cn } from "@/lib/utils";

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassmorphismCard({
  children,
  className,
  hover = true,
}: GlassmorphismCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6",
        hover && "glass-card-hover transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
