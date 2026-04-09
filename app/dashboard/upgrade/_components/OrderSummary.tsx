"use client";

import { Check } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plan } from "@/lib/pricing";

const GST_RATE = 0.18;

interface OrderSummaryProps {
  selectedPlan: Plan;
  isYearly: boolean;
  discountedBase: number;
  gstAmount: number;
  finalPrice: number;
  discount: number;
  appliedPromo: any;
  showPromoInput: boolean;
  promoCode: string;
  setPromoCode: (val: string) => void;
  setShowPromoInput: (val: boolean) => void;
  setAppliedPromo: (val: any) => void;
}

export function OrderSummary({
  selectedPlan,
  isYearly,
  discountedBase,
  gstAmount,
  finalPrice,
  discount,
  appliedPromo,
  showPromoInput,
  promoCode,
  setPromoCode,
  setShowPromoInput,
  setAppliedPromo,
}: OrderSummaryProps) {
  const renewalDate = new Date(
    Date.now() + (isYearly ? 365 : 30) * 24 * 60 * 60 * 1000,
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="border-r border-border/40 p-s-48 flex flex-col bg-bg-base/30">
      {/* Header */}
      <div className="mb-s-32">
        <p className="text-s-11 font-bold uppercase tracking-widest text-text-muted mb-s-8">
          Order Summary
        </p>
        <span className="text-s-40 font-black text-text-primary leading-none">
          ₹{finalPrice.toFixed(2)}
        </span>
        <p className="text-s-12 text-text-muted mt-s-6">
          incl. 18% GST · billed {isYearly ? "yearly" : "monthly"}
        </p>
      </div>

      {/* Plan Card */}
      <div
        className={`relative rounded-s-12 p-s-20 mb-s-32 bg-gradient-to-br ${selectedPlan.color} overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-s-11 font-bold uppercase tracking-widest text-white/60 mb-s-4">
              {isYearly ? "Yearly" : "Monthly"}
            </p>
            <p className="text-s-18 font-black text-white">
              {selectedPlan.name} Plan
            </p>
            <p className="text-s-12 text-white/70 mt-s-4">
              {selectedPlan.features[0]}
            </p>
          </div>
          <div className="w-s-48 h-s-48 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
            <Check className="w-s-22 h-s-22 text-white" />
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="space-y-s-14 mb-s-24">
        <div className="flex justify-between text-s-13">
          <span className="text-text-secondary">{selectedPlan.name} Plan</span>
          <span className="font-semibold text-text-primary">
            ₹{discountedBase.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-s-13">
          <span className="text-text-secondary">GST (18%)</span>
          <span className="font-semibold text-text-primary">
            ₹{gstAmount.toFixed(2)}
          </span>
        </div>
        {appliedPromo && (
          <div className="flex justify-between text-s-13 text-success font-medium bg-success/5 px-s-12 py-s-10 rounded-s-8 border border-success/20">
            <span>Promo: {appliedPromo.code}</span>
            <span>−₹{discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Promo Code */}
      {!showPromoInput && !appliedPromo && (
        <button
          onClick={() => setShowPromoInput(true)}
          className="text-s-12 text-accent hover:text-accent-dim font-semibold transition-colors mb-s-24 text-left"
        >
          + Have a promo code?
        </button>
      )}
      {showPromoInput && !appliedPromo && (
        <div className="flex gap-s-8 mb-s-24">
          <Input
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPromoCode(e.target.value.toUpperCase())
            }
            className="flex-1 text-s-12 py-s-8"
          />
          <Button
            size="sm"
            onClick={() => {
              if (promoCode === "SAVE20") {
                setAppliedPromo({
                  code: "SAVE20",
                  type: "percentage",
                  value: 20,
                });
                setShowPromoInput(false);
              } else {
                alert("Invalid promo code");
              }
            }}
          >
            Apply
          </Button>
        </div>
      )}

      {/* Total */}
      <div className="mt-auto border-t border-border/40 pt-s-20">
        <div className="flex justify-between items-center mb-s-6">
          <span className="text-s-15 font-bold text-text-primary">
            Total due today
          </span>
          <span className="text-s-24 font-black text-accent">
            ₹{finalPrice.toFixed(2)}
          </span>
        </div>
        <p className="text-s-11 text-text-muted">Next renewal: {renewalDate}</p>
      </div>
    </div>
  );
}
