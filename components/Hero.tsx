"use client";

import { Button } from "./ui/landing/Button";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Mail,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { FloatingCard } from "./FloatingCard";
import { Card } from "./ui/landing/Card";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center ">
      <div className="relative z-10 max-w-7xl mx-auto px-s-16 sm:px-s-24 lg:px-s-32 py-s-80">
        <div className="text-center mb-s-48">
          {/* Beta Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-s-32"
          >
            <div className="inline-flex items-center gap-s-8 px-s-1 py-s-8 bg-indigo-950/50 border border-indigo-500/30 rounded-full backdrop-blur-sm">
              <Sparkles className="w-s-16 h-s-16 text-indigo-400" />
              <span className="text-s-14 text-indigo-300 font-medium">
                NOW IN TESTING
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-s-48 sm:text-s-60 lg:text-s-72 xl:text-s-96 font-bold mb-s-24 leading-tight"
          >
            <span className="text-white">Your SMTP. </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Absolute
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Control.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-s-18 sm:text-s-20 text-gray-400 max-w-3xl mx-auto mb-s-40 leading-relaxed"
          >
            Send high-performance transactional emails through your own
            <br className="hidden sm:block" />
            AWS SES, Postmark, or custom SMTP servers. Complete privacy,
            <br className="hidden sm:block" />
            zero markup.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-s-16 justify-center items-center mb-s-32"
          >
            <Button
              size="lg"
              onClick={() => (window.location.href = "/auth")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-s-32 py-s-24 shadow-2xl shadow-purple-500/30 group text-white"
            >
              Start Sending Free
              <ArrowRight className="ml-s-8 w-s-20 h-s-20 group-hover:translate-x-s-4 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => (window.location.href = "/docs")}
              className="border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white px-s-32 py-s-24"
            >
              View Documentation
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-s-24 text-s-14 text-gray-500"
          >
            <div className="flex items-center gap-s-8">
              <CheckCircle2 className="w-s-16 h-s-16 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-s-8">
              <CheckCircle2 className="w-s-16 h-s-16 text-green-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-s-8">
              <CheckCircle2 className="w-s-16 h-s-16 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </div>

        {/* 3D Floating Cards - Email Dashboard Mockup */}
        <div className="relative mt-s-80 max-w-6xl mx-auto">
          {/* Main Dashboard Card */}
          <FloatingCard delay={1} yOffset={15} className="relative">
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Card className="p-s-32 bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-gray-800 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between mb-s-24">
                  <div className="flex items-center gap-s-12">
                    <div className="w-s-48 h-s-48 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-s-8 flex items-center justify-center">
                      <Mail className="w-s-24 h-s-24 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold flex items-center">
                        Email Dashboard
                      </div>
                      <div className="text-s-14 text-gray-400">
                        Real-time analytics
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-s-8 items-center">
                    <div className="w-s-12 h-s-12 rounded-full bg-green-500 animate-pulse" />
                    <div className="text-s-14 text-gray-400">Live</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-s-24">
                  <div className="bg-gray-950/50 rounded-s-8 p-s-16 border border-gray-800">
                    <div className="text-gray-400 text-s-14 mb-s-4">
                      Delivered
                    </div>
                    <div className="text-s-24 font-bold text-white">98.7%</div>
                    <div className="text-s-12 text-green-500">↑ 2.4%</div>
                  </div>
                  <div className="bg-gray-950/50 rounded-s-8 p-s-16 border border-gray-800">
                    <div className="text-gray-400 text-s-14 mb-s-4">
                      Open Rate
                    </div>
                    <div className="text-s-24 font-bold text-white">45.2%</div>
                    <div className="text-s-12 text-green-500">↑ 5.1%</div>
                  </div>
                  <div className="bg-gray-950/50 rounded-s-8 p-s-16 border border-gray-800">
                    <div className="text-gray-400 text-s-14 mb-s-4">
                      Click Rate
                    </div>
                    <div className="text-s-24 font-bold text-white">12.8%</div>
                    <div className="text-s-12 text-green-500">↑ 1.8%</div>
                  </div>
                </div>

                <div className="mt-s-24 h-s-128 bg-gradient-to-t from-indigo-950/30 to-purple-950/30 rounded-s-8 border border-indigo-900/30 flex items-end p-s-16 gap-s-8">
                  {[65, 80, 55, 90, 70, 85, 95, 75, 88, 92].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t"
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          </FloatingCard>

          {/* Floating Feature Cards */}
          <FloatingCard
            delay={1.3}
            yOffset={20}
            className="absolute -left-s-80 top-s-80 hidden lg:block"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-s-24 bg-gray-900/80 border-gray-800 backdrop-blur-xl shadow-xl w-s-256">
                <div className="flex items-center gap-s-12 mb-s-12">
                  <div className="w-s-40 h-s-40 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-s-8 flex items-center justify-center">
                    <BarChart3 className="w-s-20 h-s-20 text-white" />
                  </div>
                  <div className="text-white font-semibold">Analytics</div>
                </div>
                <div className="text-s-14 text-gray-400">
                  Track every metric that matters to your business
                </div>
              </Card>
            </motion.div>
          </FloatingCard>

          <FloatingCard
            delay={1.5}
            yOffset={25}
            className="absolute -right-s-80 top-s-128 hidden lg:block"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateZ: -2 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-s-24 bg-gray-900/80 border-gray-800 backdrop-blur-xl shadow-xl w-s-256">
                <div className="flex items-center gap-s-12 mb-s-12">
                  <div className="w-s-40 h-s-40 bg-gradient-to-br from-green-500 to-emerald-500 rounded-s-8 flex items-center justify-center">
                    <Shield className="w-s-20 h-s-20 text-white" />
                  </div>
                  <div className="text-white font-semibold">Security</div>
                </div>
                <div className="text-s-14 text-gray-400">
                  Enterprise-grade encryption and compliance
                </div>
              </Card>
            </motion.div>
          </FloatingCard>

          <FloatingCard
            delay={1.7}
            yOffset={18}
            className="absolute -left-s-64 bottom-s-50 hidden lg:block"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateZ: -3 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-s-24 bg-gray-900/80 border-gray-800 backdrop-blur-xl shadow-xl w-s-256">
                <div className="flex items-center gap-s-12 mb-s-12">
                  <div className="w-s-40 h-s-40 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-s-8 flex items-center justify-center">
                    <Zap className="w-s-20 h-s-20 text-white" />
                  </div>
                  <div className="text-white font-semibold">Performance</div>
                </div>
                <div className="text-s-14 text-gray-400">
                  Lightning-fast delivery with 99.9% uptime
                </div>
              </Card>
            </motion.div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
}
