"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ marginBottom: "var(--space-12)", textAlign: "center" }}
    >
      <h2
        className="font-bold tracking-tight"
        style={{ fontSize: "var(--font-title-1)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            marginTop: "var(--space-4)",
            fontSize: "var(--font-callout)",
            color: "var(--color-text-secondary)",
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
