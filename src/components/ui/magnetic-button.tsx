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
    "inline-flex items-center justify-center rounded-full font-semibold tracking-[0.01em] transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-gold text-[#0E1626] shadow-[0_6px_28px_rgba(212,165,116,0.22)] hover:bg-[#E5B889] hover:shadow-[0_10px_38px_rgba(212,165,116,0.32)]",
    secondary:
      "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10 hover:shadow-[0_6px_28px_rgba(212,165,116,0.14)]",
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
