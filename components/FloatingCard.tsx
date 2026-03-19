"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export function FloatingCard({
  children,
  delay = 0,
  className = "",
  yOffset = 20,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className={cn(className)}
    >
      <motion.div
        animate={{
          y: [0, -yOffset, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
