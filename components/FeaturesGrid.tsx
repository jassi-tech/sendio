"use client";
import { Card } from "./ui/landing/Card";
import { Lock, Server, Code } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Lock,
    title: "AES-256 Encryption",
    description:
      "Your SMTP credentials never leave our server unencrypted. We use industry-standard GCM encryption.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Server,
    title: "Bring Your Own Senders",
    description:
      "Connect unlimited sender profiles. Routing is handled via clean API keys for different environments.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Code,
    title: "Developer First",
    description:
      "A robust REST API that fits into any stack. Simple POST requests to queue and send your emails.",
    color: "from-purple-500 to-pink-500",
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative py-s-80 px-s-16 sm:px-s-24 lg:px-s-32">
      <div className="max-w-s-1280 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-s-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="p-s-32 bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-gray-800 backdrop-blur-sm hover:border-gray-700 transition-all h-full group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-s-64 h-s-64 bg-gradient-to-br ${feature.color} rounded-s-12 flex items-center justify-center mb-s-24`}
                >
                  <feature.icon className="w-s-32 h-s-32 text-white" />
                </motion.div>

                <h3 className="text-s-20 font-bold text-white mb-s-12 group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-s-15 text-gray-400 leading-s-24">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
