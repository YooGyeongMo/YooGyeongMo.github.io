"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CloudCard } from "@/components/ui/CloudCard";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
      <SectionHeading
        title="About Me"
        subtitle="안녕하세요, iOS 개발자 유경모입니다."
      />

      <CloudCard>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-6 text-lg leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <p>
            사용자 경험을 최우선으로 생각하는 iOS 개발자입니다.
          </p>
          <p>
            Apple의 Human Interface Guidelines를 깊이 이해하고,
            SwiftUI와 UIKit을 활용하여 직관적이고 아름다운 앱을 만듭니다.
          </p>
          <p>
            매일 배운 것을 기록하고, 코드로 증명합니다.
          </p>
        </motion.div>
      </CloudCard>
    </div>
  );
}
