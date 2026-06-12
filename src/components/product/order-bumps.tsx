"use client";

import { cn } from "@/lib/utils";

export interface AddOn {
  id: string;
  title: string;
  description: string;
  price: number;
  was?: number;
  badge?: string;
  image: string;
}

// Mini upsells / order bumps. High-margin, believable, low-friction add-ons that
// lift average order value without distracting from the main purchase.
export const ADDONS: AddOn[] = [
  {
    id: "addon-case",
    title: "Protective travel case",
    description: "A firm zip case so it survives your nightstand drawer, your bag, and every hotel trip.",
    price: 14.99,
    was: 24,
    badge: "Most added",
    image: "/products/p1.webp",
  },
  {
    id: "addon-warranty",
    title: "3-Year Protection Plan",
    description: "Extends your coverage to 3 full years, accidental damage included. One free replacement, no questions.",
    price: 9.99,
    image: "/products/p1.webp",
  },
  {
    id: "addon-gift",
    title: "Make it a gift",
    description: "A clean gift box and a handwritten note, ready to give to whoever needs the sleep more than you.",
    price: 5.99,
    image: "/products/p1.webp",
  },
];

interface OrderBumpsProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export default function OrderBumps({ selected, onToggle }: OrderBumpsProps) {
  return (
    <div>
      <h4 className="text-sm font-bold text-heading mb-3">
        Add to your order
      </h4>
      <div className="space-y-2.5">
        {ADDONS.map((addon) => {
          const isSelected = selected.includes(addon.id);
          return (
            <label
              key={addon.id}
              className={cn(
                "flex items-start gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-300 text-left",
                isSelected
                  ? "border-gold bg-gold-light shadow-[0_2px_12px_rgba(232,184,106,0.12)]"
                  : "border-white/8 hover:border-gold/40 hover:bg-gold-light/50"
              )}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(addon.id)}
                className="sr-only"
              />
              <div
                className={cn(
                  "mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all",
                  isSelected ? "border-gold bg-gold" : "border-muted"
                )}
              >
                {isSelected && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0E1626" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold text-heading">
                    {addon.title}
                  </span>
                  <span className="flex items-baseline gap-1.5 flex-shrink-0">
                    {addon.was && (
                      <span className="text-xs text-lavender line-through">
                        ${addon.was.toFixed(2)}
                      </span>
                    )}
                    <span className="text-sm font-bold text-gold">
                      +${addon.price.toFixed(2)}
                    </span>
                  </span>
                </div>
                {addon.badge && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-gold/15 text-gold rounded-full uppercase tracking-wide">
                    {addon.badge}
                  </span>
                )}
                <p className="text-xs text-slate leading-snug mt-1">
                  {addon.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
