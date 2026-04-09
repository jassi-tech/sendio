"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { plans } from "@/lib/pricing";
import { PricingCard } from "@/components/pricing/PricingCard";

export default function UpgradePage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const isYearly = billingCycle === "yearly";

  return (
    <div className="flex flex-col">
      <main className="flex-1 py-s-20 px-s-20">
        <div className="max-w-s-1400 mx-auto">
          {/* Header */}
          <div className="mb-s-80">
            <h1 className="text-s-48 font-black text-text-primary mb-s-16 tracking-tight">
              Choose your next level
            </h1>
            <p className="text-s-16 text-text-secondary max-w-s-600 mb-s-48">
              Upgrade your infrastructure to handle more scale and unlock
              advanced deliverability features.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center gap-s-32 mb-s-48">
              <span
                className={`text-s-16 font-semibold transition-colors ${!isYearly ? "text-text-primary" : "text-text-muted"}`}
              >
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(isYearly ? "monthly" : "yearly")}
                className="relative inline-flex h-s-40 w-s-72 items-center rounded-full bg-bg-card border border-border transition-colors hover:border-accent/40"
              >
                <div
                  className={`inline-block h-s-32 w-s-32 transform rounded-full bg-gradient-to-br from-accent to-accent-dim shadow-lg transition-transform ${isYearly ? "translate-x-s-36" : "translate-x-s-2"}`}
                />
              </button>
              <div className="flex items-center gap-s-12">
                <span
                  className={`text-s-16 font-semibold transition-colors ${isYearly ? "text-accent" : "text-text-muted"}`}
                >
                  Yearly
                </span>
                <div className="bg-success/15 border border-success/30 px-s-12 py-s-4 rounded-full">
                  <span className="text-s-11 font-extrabold text-success tracking-wide uppercase">
                    20% OFF
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-s-40 items-stretch mb-s-40 max-w-[1820px] mx-auto">
            {plans
              .filter((p) => p.id !== "free")
              .map((plan, idx) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  isYearly={isYearly}
                  index={idx}
                  ctaText="Purchase Plan"
                  onSelect={(pid) => {
                    const billing = isYearly ? "yearly" : "monthly";
                    router.push(
                      `/dashboard/upgrade/checkout?plan=${pid}&billing=${billing}`,
                    );
                  }}
                />
              ))}
          </div>

          {/* Footer Info */}
          <div className="border-2 border-border/40 rounded-s-20 p-s-32 bg-bg-card/50 text-center">
            <div className="flex items-center justify-center gap-s-12 mb-s-16">
              <div className="w-s-20 h-s-20 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <Check className="w-s-12 h-s-12" />
              </div>
              <p className="text-s-14 text-text-secondary">
                All plans include API access, detailed analytics, and dedicated
                support.{" "}
                <span className="text-accent font-semibold">
                  Cancel anytime.
                </span>
              </p>
            </div>
            <p className="text-s-12 text-text-muted">
              Need a custom plan?{" "}
              <button className="text-accent hover:underline font-semibold">
                Contact our sales team
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
