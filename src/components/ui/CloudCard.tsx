"use client";

import { motion } from "framer-motion";

interface CloudCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function CloudCard({ children, className = "", delay = 0 }: CloudCardProps) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.3 },
      }}
      className={`cloud-shadow transition-shadow hover:cloud-shadow-hover ${className}`}
      style={{
        background: "var(--color-bg-secondary)",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-8)",
      }}
    >
      {children}
    </motion.div>
  );
}
