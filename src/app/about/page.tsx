"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CloudCard } from "@/components/ui/CloudCard";

export default function AboutPage() {
  return (
    <div
      className="section-container"
      style={{
        paddingTop: "calc(var(--nav-height) + var(--space-16))",
        paddingBottom: "var(--space-24)",
      }}
    >
      <SectionHeading
        title="About Me"
        subtitle="과거엔 배우, 현재엔 개발자."
      />

      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <CloudCard>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-body)",
              lineHeight: 1.7,
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-6)",
            }}
          >
            <p>
              안녕하세요, iOS 개발자 유경모입니다.
            </p>
            <p>
              사용자 경험을 최우선으로 생각합니다.
              Apple의 Human Interface Guidelines를 깊이 이해하고,
              SwiftUI와 UIKit으로 직관적이고 아름다운 앱을 만듭니다.
            </p>
            <p>
              매일 배운 것을 기록하고, 코드로 증명합니다.
            </p>
          </motion.div>
        </CloudCard>
      </div>
    </div>
  );
}
