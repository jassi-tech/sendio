"use client";

import { motion } from "motion/react";
import { ArrowRight, Zap, Users, Globe, TrendingUp } from "lucide-react";
import { Button } from "./ui/landing/Button";

const stats = [
  { icon: Users, value: "50K+", label: "Active Users" },
  { icon: Globe, value: "180+", label: "Countries" },
  { icon: Zap, value: "1B+", label: "Emails Sent" },
  { icon: TrendingUp, value: "99.9%", label: "Uptime" },
];

export function StatsSection() {
  return (
    <section className="relative py-s-80 px-s-16 sm:px-s-24 lg:px-s-32">
      <div className="max-w-s-1280 mx-auto">
        {/* ── Stats Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-s-32 mb-s-80"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              {/* Icon container */}
              <div className="inline-flex items-center justify-center w-s-64 h-s-64 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-s-16 mb-s-16 border border-indigo-500/30">
                <stat.icon className="w-s-32 h-s-32 text-indigo-400" />
              </div>

              {/* Value */}
              <div className="text-s-40 font-bold text-white mb-s-8">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-s-14 text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-s-32 blur-s-48" />

          <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 rounded-s-32 p-s-48 sm:p-s-64 text-center backdrop-blur-sm">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-s-8 px-s-16 py-s-8 bg-indigo-950/50 border border-indigo-500/30 rounded-full mb-s-24"
            >
              <Zap className="w-s-16 h-s-16 text-indigo-400" />
              <span className="text-s-13 text-indigo-300 font-medium tracking-wide">
                READY TO GET STARTED?
              </span>
            </motion.div>

            {/* Headline */}
            <h2 className="text-s-40 sm:text-s-52 lg:text-s-64 font-bold text-white mb-s-24 leading-tight">
              Start Sending Emails in{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Minutes
              </span>
            </h2>

            {/* Sub-copy */}
            <p className="text-s-18 text-gray-400 mb-s-40 max-w-s-640 mx-auto leading-s-28">
              Join thousands of developers who trust MailX for their
              transactional email needs.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-s-16 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => (window.location.href = "/auth")}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-s-32 py-s-20 shadow-2xl shadow-purple-500/30 group text-white"
                >
                  Create Free Account
                  <ArrowRight className="ml-s-8 w-s-20 h-s-20 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white px-s-32 py-s-20"
                >
                  Talk to Sales
                </Button>
              </motion.div>
            </div>

            {/* Footer note */}
            <div className="mt-s-32 text-s-13 text-gray-500">
              No credit card required • 14-day free trial • Cancel anytime
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
