"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Zap } from "lucide-react";
import { plans } from "@/lib/pricing";
import { PricingCard } from "@/components/pricing/PricingCard";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const handleSelectPlan = (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    window.location.href = plan?.price === null ? "/contact" : "/auth";
  };

  return (
    <div className="text-white min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-s-120 pb-s-80 px-s-16 sm:px-s-32 lg:px-s-48">
        <div className="max-w-s-800 mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-s-8 px-s-16 py-s-8 bg-accent/15 border border-accent/30 rounded-full mb-s-24 shadow-accent-glow"
          >
            <Zap className="w-s-14 h-s-14 text-accent" />
            <span className="text-s-12 font-bold text-accent uppercase tracking-wider">
              Pricing Options
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-s-48 sm:text-s-64 font-extrabold mb-s-24 leading-tight text-text-primary"
          >
            Simple,{" "}
            <span className="gradient-text">
              Transparent Pricing
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-s-18 text-text-secondary mb-s-48 leading-s-28"
          >
            Choose the perfect plan for your needs. All plans include a 14-day
            free trial and dedicated support.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="inline-flex items-center gap-s-16 bg-bg-card border border-border rounded-full px-s-20 py-s-10 shadow-lg"
          >
            <span
              className={`text-s-14 font-bold transition-colors duration-300 ${!isYearly ? "text-text-primary" : "text-text-muted"}`}
            >
              Monthly
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              aria-pressed={isYearly}
              aria-label="Toggle billing period"
              className="relative w-s-48 h-s-26 bg-bg-elevated rounded-full p-s-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className={`w-s-20 h-s-20 rounded-full bg-gradient-to-br from-accent to-accent-dim shadow-md ${isYearly ? "ml-auto" : ""}`}
              />
            </button>

            <div className="flex items-center gap-s-10">
              <span
                className={`text-s-14 font-bold transition-colors duration-300 ${isYearly ? "text-text-primary" : "text-text-muted"}`}
              >
                Yearly
              </span>
              <div className="bg-success/15 border border-success/30 px-s-12 py-s-4 rounded-full">
                <span className="text-s-11 font-extrabold text-success tracking-wide">
                  20% OFF
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="pb-s-80 px-s-16 sm:px-s-32 lg:px-s-48">
        <div className="max-w-s-1200 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-s-24 items-stretch">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isYearly={isYearly}
                index={index}
                onSelect={handleSelectPlan}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer note ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pb-s-80 text-center text-s-14 text-text-muted px-s-16"
      >
        All plans include API access, detailed analytics, and dedicated support.
        <br />
        No credit card required to get started with our evaluation period.
      </motion.div>
    </div>
  );
}
