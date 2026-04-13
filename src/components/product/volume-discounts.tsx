"use client";

import { cn } from "@/lib/utils";

interface VolumeDiscountsProps {
  basePrice: number;
  selectedTier: number;
  onSelect: (tier: number) => void;
}

const tiers = [
  { qty: 1, discount: 0, label: "Buy 1", badge: "" },
  { qty: 2, discount: 10, label: "Buy 2", badge: "10% OFF" },
  { qty: 3, discount: 20, label: "Buy 3", badge: "20% OFF" },
];

export default function VolumeDiscounts({
  basePrice,
  selectedTier,
  onSelect,
}: VolumeDiscountsProps) {
  return (
    <div>
      <h4 className="text-sm font-bold text-heading mb-3">Buy More, Save More</h4>
      <div className="space-y-2.5">
        {tiers.map((tier, i) => {
          const unitPrice = basePrice * (1 - tier.discount / 100);
          const totalSavings = (basePrice - unitPrice) * tier.qty;
          const isSelected = selectedTier === i;

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 text-left cursor-pointer group",
                isSelected
                  ? "border-gold bg-gold-light shadow-[0_2px_12px_rgba(201,168,76,0.12)]"
                  : "border-white/8 hover:border-gold/40 hover:bg-gold-light/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected ? "border-gold" : "border-muted"
                  )}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-heading">
                    {tier.label}
                  </span>
                  {tier.badge && (
                    <span className="px-2.5 py-0.5 text-[10px] font-bold bg-gold text-navy rounded-full leading-normal">
                      {tier.badge}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-heading">
                  ${unitPrice.toFixed(2)}{" "}
                  <span className="text-xs font-normal text-muted">each</span>
                </p>
                {totalSavings > 0 && (
                  <p className="text-xs font-semibold text-gold">
                    Save ${totalSavings.toFixed(2)}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
