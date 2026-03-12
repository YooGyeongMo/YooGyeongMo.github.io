"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { CloudCard } from "@/components/ui/CloudCard";
import {
  PuzzlePieceIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  ArrowsRightLeftIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* ─── Data ─── */

const categories = [
  { title: "Algorithms", description: "문제 풀이에서 배운 개념과 접근법", href: "/til?category=algorithms", Icon: PuzzlePieceIcon },
  { title: "Swift", description: "Swift 언어 깊이 파기", href: "/til?category=swift", Icon: CommandLineIcon },
  { title: "iOS", description: "UIKit, SwiftUI, 아키텍처", href: "/til?category=ios", Icon: DevicePhoneMobileIcon },
  { title: "CS", description: "자료구조, OS, 네트워크", href: "/til?category=cs", Icon: CpuChipIcon },
  { title: "Reactive", description: "Combine, RxSwift", href: "/til?category=reactive", Icon: ArrowsRightLeftIcon },
  { title: "WWDC", description: "WWDC 세션 정리", href: "/til?category=wwdc", Icon: PlayIcon },
];

/* ─── Page ─── */

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(heroProgress, [0, 0.5], [0, -60]);

  return (
    <div>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            textAlign: "center",
            padding: "0 var(--content-padding)",
            paddingTop: "15vh",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            style={{
              fontSize: "var(--font-title-3)",
              color: "var(--color-text-secondary)",
              letterSpacing: "-0.01em",
              marginBottom: "var(--space-5)",
              fontWeight: 500,
            }}
          >
            과거엔 배우, 현재엔 개발자
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="font-bold"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
            }}
          >
            &lsquo;배우&rsquo;는 개발자
            <br />
            <span style={{ color: "var(--color-accent)" }}>유경모</span>
            <span style={{ fontWeight: 400 }}>{" "}입니다.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            style={{
              marginTop: "var(--space-6)",
              fontSize: "clamp(1.0625rem, 1.5vw, 1.375rem)",
              color: "var(--color-text-secondary)",
              maxWidth: "520px",
              lineHeight: 1.7,
            }}
          >
            카메라 앞의 감정을 코드 위의 경험으로 바꿉니다.
            <br />
            사용자의 마음을 읽고, 경험을 설계합니다.
          </motion.p>

          {/* CTA Buttons — About + Portfolio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center"
            style={{ marginTop: "var(--space-8)", gap: "var(--space-4)" }}
          >
            <Link
              href="/about"
              className="font-medium text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: "var(--color-accent)",
                borderRadius: "980px",
                padding: "var(--space-3) var(--space-10)",
                fontSize: "var(--font-body)",
                display: "inline-block",
              }}
            >
              이야기 보기
            </Link>
            <Link
              href="/portfolio"
              className="font-medium transition-all hover:scale-105 active:scale-95 cloud-shadow"
              style={{
                background: "var(--color-bg)",
                borderRadius: "980px",
                padding: "var(--space-3) var(--space-10)",
                fontSize: "var(--font-body)",
                display: "inline-block",
              }}
            >
              만든 것들
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{ position: "absolute", bottom: "var(--space-20)" }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{
                width: "24px",
                height: "40px",
                borderRadius: "12px",
                border: "2px solid var(--color-text-tertiary)",
                display: "flex",
                justifyContent: "center",
                paddingTop: "8px",
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                style={{
                  width: "4px",
                  height: "8px",
                  borderRadius: "2px",
                  background: "var(--color-text-tertiary)",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TIL Categories ── */}
      <section style={{ background: "var(--color-bg-secondary)" }}>
        <div
          className="section-container"
          style={{ padding: "var(--space-16) var(--content-padding)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.7, ease }}
          >
            <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
              <h2
                className="font-bold tracking-tight"
                style={{ fontSize: "var(--font-title-1)" }}
              >
                Today I Learned
              </h2>
              <p
                style={{
                  marginTop: "var(--space-2)",
                  fontSize: "var(--font-callout)",
                  color: "var(--color-text-secondary)",
                }}
              >
                매일의 학습을 기록합니다
              </p>
            </div>
          </motion.div>

          <div
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            style={{ maxWidth: "960px", margin: "0 auto" }}
          >
            {categories.map((cat, i) => (
              <Link key={cat.href} href={cat.href}>
                <CloudCard delay={i * 0.06}>
                  <cat.Icon
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "var(--color-accent)",
                      strokeWidth: 1.5,
                    }}
                  />
                  <h3
                    className="font-semibold"
                    style={{ fontSize: "var(--font-headline)", marginTop: "var(--space-3)" }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    style={{
                      marginTop: "var(--space-2)",
                      fontSize: "var(--font-footnote)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {cat.description}
                  </p>
                </CloudCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
