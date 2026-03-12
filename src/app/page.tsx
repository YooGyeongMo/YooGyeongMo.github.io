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
    emoji: "⌘",
  },
  {
    title: "Swift",
    description: "Swift 언어 깊이 파기",
    href: "/til/swift",
    emoji: "⟡",
  },
  {
    title: "iOS",
    description: "UIKit, SwiftUI, 아키텍처",
    href: "/til/ios",
    emoji: "◈",
  },
  {
    title: "CS",
    description: "자료구조, OS, 네트워크",
    href: "/til/cs",
    emoji: "◇",
  },
];

export default function Home() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="text-6xl font-bold tracking-tight md:text-8xl">
            Demian YOO
          </h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-xl md:text-2xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            iOS Developer
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 text-lg"
            style={{ color: "var(--color-text-secondary)" }}
          >
            매일 배우고, 기록하고, 성장합니다.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 flex gap-4"
        >
          <Link
            href="/portfolio"
            className="rounded-full px-8 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
            style={{ background: "var(--color-accent)" }}
          >
            Portfolio
          </Link>
          <Link
            href="/til"
            className="glass cloud-shadow rounded-full px-8 py-3 text-sm font-medium transition-transform hover:scale-105"
          >
            Today I Learned
          </Link>
        </motion.div>
      </section>

      {/* TIL Categories */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          title="Today I Learned"
          subtitle="매일의 학습을 기록합니다"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat, i) => (
            <Link key={cat.href} href={cat.href}>
              <CloudCard delay={i * 0.1}>
                <span className="text-2xl">{cat.emoji}</span>
                <h3 className="mt-4 text-xl font-semibold">{cat.title}</h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
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
