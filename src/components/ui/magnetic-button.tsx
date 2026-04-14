"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export default function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  disabled = false,
  type = "button",
}: MagneticButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-gold to-[#d4a040] text-[#08080f] hover:shadow-[0_4px_24px_rgba(226,184,85,0.35)]",
    secondary:
      "border-2 border-gold/60 text-gold hover:bg-gold hover:text-[#08080f] hover:shadow-[0_4px_24px_rgba(226,184,85,0.2)]",
    ghost: "text-gold hover:text-gold-dark hover:bg-gold-light/50",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
