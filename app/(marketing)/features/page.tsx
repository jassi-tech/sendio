"use client";

import { motion } from "motion/react";
import {
  Mail,
  BarChart3,
  Shield,
  Zap,
  Users,
  Settings,
  MessageSquare,
  Globe,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/landing/Button";

const features = [
  {
    icon: Mail,
    title: "Smart Email Management",
    description:
      "Organize and manage all your project emails in one beautiful, intuitive interface.",
    details: ["Unified inbox", "Smart filters", "Thread grouping"],
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10 text-blue-400",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track open rates, click-throughs, and engagement with powerful analytics tools.",
    details: ["Live dashboards", "Delivery tracking", "Event webhooks"],
    color: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-500/10 text-purple-400",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption and security protocols to keep your data safe.",
    details: [
      "End-to-end encryption",
      "Zero-knowledge arch",
      "Compliance ready",
    ],
    color: "from-green-500 to-emerald-500",
    iconBg: "bg-green-500/10 text-green-400",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Send thousands of emails per second with our optimized delivery system.",
    details: ["Sub-second delivery", "Global CDN", "99.9% uptime SLA"],
    color: "from-yellow-500 to-orange-500",
    iconBg: "bg-yellow-500/10 text-yellow-400",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work seamlessly with your team on email campaigns and client communications.",
    details: ["Role-based access", "Team billing", "Activity logs"],
    color: "from-indigo-500 to-blue-500",
    iconBg: "bg-indigo-500/10 text-indigo-400",
  },
  {
    icon: Settings,
    title: "Custom Integrations",
    description:
      "Connect with your favorite tools and services via our powerful API.",
    details: ["RESTful endpoints", "Webhook support", "Rate limiting"],
    color: "from-red-500 to-pink-500",
    iconBg: "bg-red-500/10 text-red-400",
  },
  {
    icon: MessageSquare,
    title: "Template Library",
    description:
      "Access hundreds of professional email templates for every occasion.",
    details: ["Visual builder", "Template versioning", "A/B testing"],
    color: "from-teal-500 to-cyan-500",
    iconBg: "bg-teal-500/10 text-teal-400",
  },
  {
    icon: Globe,
    title: "Global Delivery",
    description:
      "Reach customers worldwide with our distributed email infrastructure.",
    details: ["180+ countries", "Multi-region routing", "ISP relationships"],
    color: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-500/10 text-violet-400",
  },
  {
    icon: Lock,
    title: "GDPR Compliant",
    description:
      "Fully compliant with GDPR and other international privacy regulations.",
    details: ["Auto-management", "Bulk imports", "Compliance rules"],
    color: "from-slate-500 to-gray-500",
    iconBg: "bg-slate-500/10 text-slate-400",
  },
];

export default function FeaturesPage() {
  return (
    <div className="text-white min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-s-120 pb-s-80 px-s-16 sm:px-s-32 lg:px-s-48">
        <div className="max-w-s-800 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-s-8 px-s-16 py-s-8 bg-indigo-950/50 border border-indigo-500/30 rounded-full mb-s-24"
          >
            <Zap className="w-s-14 h-s-14 text-indigo-400" />
            <span className="text-s-12 font-bold text-indigo-300 uppercase tracking-wider">
              Powerful Features
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-s-48 sm:text-s-64 font-extrabold mb-s-24 leading-tight"
          >
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              send emails reliably
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-s-18 text-gray-400 max-w-s-640 mx-auto leading-s-28"
          >
            Built with developers in mind. From encryption to analytics, we've
            got all the tools you need to send transactional emails at scale.
          </motion.p>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-s-80 px-s-16 sm:px-s-32 lg:px-s-48">
        <div className="max-w-s-1280 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-s-24"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group bg-gradient-to-br from-gray-900/60 to-gray-950/60 border border-gray-800 hover:border-gray-700 rounded-s-16 p-s-32 flex flex-col transition-all"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-s-56 h-s-56 bg-gradient-to-br ${feature.color} rounded-s-12 flex items-center justify-center mb-s-24 flex-shrink-0`}
                >
                  <feature.icon className="w-s-28 h-s-28 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-s-18 font-bold text-white mb-s-12 group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-s-14 text-gray-400 leading-s-22 mb-s-24">
                  {feature.description}
                </p>

                {/* Detail bullets */}
                <ul className="mt-auto space-y-s-8">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-s-10">
                      <div className="w-s-5 h-s-5 rounded-full bg-indigo-500 flex-shrink-0" />
                      <span className="text-s-13 text-gray-500">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-s-80 px-s-16 sm:px-s-32 lg:px-s-48">
        <div className="max-w-s-900 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-s-32 blur-s-48" />

            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 rounded-s-32 p-s-48 sm:p-s-64 text-center backdrop-blur-sm">
              <h2 className="text-s-40 sm:text-s-52 font-extrabold mb-s-20">
                Ready to get started?
              </h2>
              <p className="text-s-18 text-gray-400 mb-s-40 max-w-s-560 mx-auto leading-s-28">
                Join thousands of developers who trust MailX for their
                transactional emails.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-s-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={() => (window.location.href = "/auth")}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-s-32 py-s-20 shadow-2xl shadow-purple-500/30 group text-white"
                  >
                    Start Free Trial
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
                    View Pricing
                  </Button>
                </motion.div>
              </div>

              <p className="mt-s-24 text-s-13 text-gray-500">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
