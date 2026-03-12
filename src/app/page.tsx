"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CloudCard } from "@/components/ui/CloudCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const categories = [
  {
    title: "Algorithms",
    description: "문제 풀이에서 배운 개념과 접근법",
    href: "/til/algorithms",
    symbol: "function",
  },
  {
    title: "Swift",
    description: "Swift 언어 깊이 파기",
    href: "/til/swift",
    symbol: "swift",
  },
  {
    title: "iOS",
    description: "UIKit, SwiftUI, 아키텍처",
    href: "/til/ios",
    symbol: "iphone",
  },
  {
    title: "CS",
    description: "자료구조, OS, 네트워크",
    href: "/til/cs",
    symbol: "cpu",
  },
];

export default function Home() {
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      {/* Hero */}
      <section
        className="flex flex-col items-center justify-center text-center"
        style={{
          minHeight: "calc(100vh - var(--nav-height))",
          padding: "var(--space-16) var(--content-padding)",
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontSize: "var(--font-title-3)",
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-6)",
              letterSpacing: "-0.01em",
            }}
          >
            과거엔 배우, 현재엔 개발자
          </motion.p>

          <h1
            className="font-bold"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            &lsquo;배우&rsquo;는 개발자
            <br />
            <span style={{ color: "var(--color-accent)" }}>유경모</span>입니다.
          </h1>

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              marginTop: "var(--space-8)",
              fontSize: "var(--font-body)",
              color: "var(--color-text-secondary)",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            매일 배우고, 기록하고, 성장합니다.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex items-center"
          style={{ marginTop: "var(--space-12)", gap: "var(--space-4)" }}
        >
          <Link
            href="/portfolio"
            className="font-medium text-white transition-transform hover:scale-105"
            style={{
              background: "var(--color-accent)",
              borderRadius: "980px",
              padding: "var(--space-3) var(--space-8)",
              fontSize: "var(--font-subhead)",
            }}
          >
            Portfolio
          </Link>
          <Link
            href="/til"
            className="glass cloud-shadow font-medium transition-transform hover:scale-105"
            style={{
              borderRadius: "980px",
              padding: "var(--space-3) var(--space-8)",
              fontSize: "var(--font-subhead)",
            }}
          >
            Today I Learned
          </Link>
        </motion.div>
      </section>

      {/* TIL Categories */}
      <section
        className="section-container"
        style={{ padding: "var(--space-24) var(--content-padding)" }}
      >
        <SectionHeading
          title="Today I Learned"
          subtitle="매일의 학습을 기록합니다"
        />
        <div
          className="grid gap-5 md:grid-cols-2"
          style={{ maxWidth: "720px", margin: "0 auto" }}
        >
          {categories.map((cat, i) => (
            <Link key={cat.href} href={cat.href}>
              <CloudCard delay={i * 0.1}>
                <p
                  style={{
                    fontSize: "var(--font-caption)",
                    color: "var(--color-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {cat.symbol}
                </p>
                <h3
                  className="font-semibold"
                  style={{
                    fontSize: "var(--font-title-3)",
                    marginTop: "var(--space-3)",
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  style={{
                    marginTop: "var(--space-2)",
                    fontSize: "var(--font-subhead)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {cat.description}
                </p>
              </CloudCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
