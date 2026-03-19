"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/landing/Button";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    description: "Perfect for small projects and freelancers",
    color: "from-blue-500 to-cyan-500",
    popular: false,
    features: [
      "10,000 emails per month",
      "2 team members",
      "Basic analytics",
      "Email templates",
      "24/7 email support",
      "API access",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 99,
    description: "For growing businesses and teams",
    color: "from-indigo-500 to-purple-500",
    popular: true,
    features: [
      "100,000 emails per month",
      "10 team members",
      "Advanced analytics",
      "Custom templates",
      "Priority support",
      "API access",
      "Custom integrations",
      "Dedicated IP address",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    description: "For large organizations with custom needs",
    color: "from-violet-500 to-pink-500",
    popular: false,
    features: [
      "Unlimited emails",
      "Unlimited team members",
      "Enterprise analytics",
      "White-label solution",
      "24/7 phone support",
      "Advanced API access",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
    ],
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const getPrice = (price: number | null) => {
    if (price === null) return null;
    return isYearly ? Math.floor(price * 12 * 0.8) : price;
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
            className="inline-flex items-center gap-s-8 px-s-16 py-s-8 bg-indigo-950/50 border border-indigo-500/30 rounded-full mb-s-24"
          >
            <Zap className="w-s-14 h-s-14 text-indigo-400" />
            <span className="text-s-12 font-bold text-indigo-300 uppercase tracking-wider">
              Pricing
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-s-48 sm:text-s-64 font-extrabold mb-s-24 leading-tight"
          >
            Simple,{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-s-18 text-gray-400 mb-s-48 leading-s-28"
          >
            Choose the perfect plan for your needs. All plans include a 14-day
            free trial.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="inline-flex items-center gap-s-16 bg-gray-900/60 border border-gray-800 rounded-full px-s-20 py-s-10"
          >
            <span
              className={`text-s-14 font-bold transition-colors duration-300 ${!isYearly ? "text-white" : "text-gray-500"}`}
            >
              Monthly
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              aria-pressed={isYearly}
              aria-label="Toggle billing period"
              className="relative w-s-48 h-s-26 bg-gray-800 rounded-full p-s-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className={`w-s-20 h-s-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md ${isYearly ? "ml-auto" : ""}`}
              />
            </button>

            <div className="flex items-center gap-s-10">
              <span
                className={`text-s-14 font-bold transition-colors duration-300 ${isYearly ? "text-white" : "text-gray-500"}`}
              >
                Yearly
              </span>
              <div className="bg-green-500/15 border border-green-500/30 px-s-12 py-s-4 rounded-full">
                <span className="text-s-11 font-extrabold text-green-400 tracking-wide">
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-s-24 items-start"
          >
            {plans.map((plan, index) => {
              const price = getPrice(plan.price);

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.5 }}
                  whileHover={{
                    y: plan.popular ? 0 : -6,
                    transition: { duration: 0.25 },
                  }}
                  className={`relative flex flex-col rounded-s-24 border transition-all ${
                    plan.popular
                      ? "border-indigo-500/60 bg-gradient-to-b from-indigo-950/60 to-gray-950/80 shadow-2xl shadow-indigo-500/20 scale-[1.03] z-10"
                      : "border-gray-800 bg-gradient-to-b from-gray-900/60 to-gray-950/60 hover:border-gray-700"
                  }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-s-16 left-1/2 -translate-x-1/2">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.6,
                          type: "spring",
                          stiffness: 300,
                        }}
                        className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-s-12 font-bold px-s-20 py-s-8 rounded-full shadow-lg shadow-indigo-500/40"
                      >
                        Most Popular
                      </motion.span>
                    </div>
                  )}

                  {/* Card header */}
                  <div className="p-s-32 pb-0">
                    {/* Icon dot */}
                    <div
                      className={`w-s-40 h-s-40 rounded-s-10 bg-gradient-to-br ${plan.color} flex items-center justify-center mb-s-20`}
                    >
                      <Zap className="w-s-20 h-s-20 text-white" />
                    </div>

                    <h2 className="text-s-22 font-bold text-white mb-s-8">
                      {plan.name}
                    </h2>
                    <p className="text-s-14 text-gray-400 mb-s-24">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-s-32">
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
                              <span className="text-s-16 font-bold text-gray-400">
                                $
                              </span>
                              <span className="text-s-56 font-extrabold text-white leading-none">
                                {price}
                              </span>
                              <div className="flex flex-col ml-s-4">
                                <span className="text-s-13 text-gray-400">
                                  /mo
                                </span>
                                {isYearly && (
                                  <span className="text-s-11 text-gray-500">
                                    billed yearly
                                  </span>
                                )}
                              </div>
                            </>
                          ) : (
                            <span className="text-s-40 font-extrabold text-white">
                              Custom
                            </span>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mx-s-32 border-t border-gray-800 mb-s-24" />

                  {/* Features */}
                  <div className="px-s-32 flex-1 space-y-s-14 pb-s-32">
                    {plan.features.map((feature, fi) => (
                      <div key={fi} className="flex items-start gap-s-12">
                        <div
                          className={`w-s-20 h-s-20 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-s-1`}
                        >
                          <Check className="w-s-11 h-s-11 text-white" />
                        </div>
                        <span className="text-s-14 text-gray-300 leading-s-20">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <div className="p-s-32 pt-0">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        size="lg"
                        onClick={() =>
                          (window.location.href =
                            plan.price === null ? "/contact" : "/auth")
                        }
                        className={`w-full py-s-18 ${
                          plan.popular
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/30"
                            : "border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.price === null
                          ? "Contact Sales"
                          : "Start Free Trial"}
                        <ArrowRight className="ml-s-8 w-s-18 h-s-18" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Footer note ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pb-s-80 text-center text-s-14 text-gray-500 px-s-16"
      >
        All plans include API access, detailed analytics, and dedicated support.
        <br />
        No credit card required to get started.
      </motion.div>
    </div>
  );
}
