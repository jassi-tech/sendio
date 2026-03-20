"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/landing/Button";
import { Plan, getPrice } from "@/lib/pricing";

interface PricingCardProps {
  plan: Plan;
  isYearly: boolean;
  currentPlanId?: string;
  onSelect?: (planId: string) => void;
  index?: number;
  ctaText?: string;
}

export function PricingCard({
  plan,
  isYearly,
  currentPlanId,
  onSelect,
  index = 0,
  ctaText,
}: PricingCardProps) {
  const price = getPrice(plan.price, isYearly);
  const isCurrent = currentPlanId === plan.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{
        y: plan.popular ? 0 : -6,
        transition: { duration: 0.25 },
      }}
      className={`relative flex flex-col rounded-s-24 border transition-all h-full bg-[var(--color-border)] ${
        plan.popular
          ? "border-accent/60 shadow-2xl shadow-accent/20 scale-[1.03] z-10"
          : "border-border hover:border-text-muted"
      } ${isCurrent ? "ring-2 ring-accent ring-offset-s-4 ring-offset-bg-base" : ""}`}
    >
      {/* Popular badge */}
      {plan.popular && !isCurrent && (
        <div className="absolute -top-s-16 left-1/2 -translate-x-1/2">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 300,
            }}
            className="inline-block bg-gradient-to-r from-accent to-accent-dim text-white text-s-12 font-bold px-s-20 py-s-8 rounded-full shadow-lg shadow-accent/40 whitespace-nowrap"
          >
            Most Popular
          </motion.span>
        </div>
      )}

      {/* Current Plan badge */}
      {isCurrent && (
        <div className="absolute -top-s-16 left-1/2 -translate-x-1/2">
          <span className="inline-block bg-success text-white text-s-12 font-bold px-s-20 py-s-8 rounded-full shadow-lg shadow-success/40 whitespace-nowrap">
            Current Plan
          </span>
        </div>
      )}

      {/* Card header */}
      <div className="p-s-32 pb-0">
        {/* Icon dot */}
        <div
          className={`w-s-40 h-s-40 rounded-s-10 bg-gradient-to-br ${plan.color} flex items-center justify-center mb-s-20 shadow-lg`}
        >
          <Zap className="w-s-20 h-s-20 text-white" />
        </div>

        <h2 className="text-s-22 font-bold text-text-primary mb-s-8">
          {plan.name}
        </h2>
        <p className="text-s-14 text-text-secondary mb-s-24">
          {plan.description}
        </p>

        {/* Price */}
        <div className="mb-s-32 min-h-s-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={isYearly ? "yearly" : "monthly"}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="flex items-baseline gap-s-4"
            >
              {price !== null ? (
                <>
                  <span className="text-s-16 font-bold text-text-secondary">
                    $
                  </span>
                  <span className="text-s-56 font-extrabold text-text-primary leading-none">
                    {price}
                  </span>
                  <div className="flex flex-col ml-s-4">
                    <span className="text-s-13 text-text-secondary">
                      /mo
                    </span>
                    {isYearly && (
                      <span className="text-s-11 text-text-muted">
                        billed yearly
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <span className="text-s-40 font-extrabold text-text-primary">
                  Custom
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-s-32 border-t border-border mb-s-24" />

      {/* Features */}
      <div className="px-s-32 flex-1 space-y-s-14 pb-s-32">
        {plan.features.map((feature, fi) => (
          <div key={fi} className="flex items-start gap-s-12">
            <div
              className={`w-s-20 h-s-20 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-s-1 shadow-sm`}
            >
              <Check className="w-s-11 h-s-11 text-white" />
            </div>
            <span className="text-s-14 text-text-secondary leading-s-20">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div className="p-s-32 pt-0">
        <motion.div
          whileHover={{ scale: isCurrent ? 1 : 1.03 }}
          whileTap={{ scale: isCurrent ? 1 : 0.97 }}
        >
          <Button
            size="lg"
            onClick={() => onSelect?.(plan.id)}
            disabled={isCurrent}
            className={`w-full py-s-18 ${
              plan.popular
                ? "bg-gradient-to-r from-accent to-accent-dim hover:from-accent-dim hover:to-accent text-white shadow-xl shadow-accent/30"
                : "border-border text-text-secondary hover:bg-white/5 hover:text-text-primary"
            } ${isCurrent ? "opacity-50 cursor-not-allowed border-success text-success bg-success/5" : ""}`}
            variant={plan.popular ? "default" : "outline"}
          >
            {isCurrent ? (
              "Current Plan"
            ) : (
              <>
                {ctaText || (plan.price === null ? "Contact Sales" : "Start Free Trial")}
                <ArrowRight className="ml-s-8 w-s-18 h-s-18" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
