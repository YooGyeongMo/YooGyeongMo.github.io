"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { CloudCard } from "@/components/ui/CloudCard";

/* ─── Data ─── */

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
  {
    title: "Reactive",
    description: "Combine, RxSwift",
    href: "/til/reactive",
    symbol: "arrow.branch",
  },
  {
    title: "WWDC",
    description: "WWDC 세션 정리",
    href: "/til/wwdc",
    symbol: "play.rectangle",
  },
];

const values = [
  { number: "365+", label: "일의 학습 기록" },
  { number: "6", label: "개의 학습 카테고리" },
  { number: "∞", label: "성장에 대한 열정" },
];

/* ─── Scroll Text Reveal ─── */

function RevealText({
  children,
  className,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 40%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, ...style }}
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

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
      {/* ── Section 1: Hero ── */}
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
            justifyContent: "center",
            textAlign: "center",
            padding: "0 var(--content-padding)",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontSize: "var(--font-callout)",
              color: "var(--color-text-tertiary)",
              letterSpacing: "0.04em",
              marginBottom: "var(--space-6)",
            }}
          >
            과거엔 배우, 현재엔 개발자
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            <span style={{ color: "var(--color-text-secondary)", fontWeight: 400 }}>
              입니다.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              marginTop: "var(--space-8)",
              fontSize: "var(--font-title-3)",
              color: "var(--color-text-secondary)",
              fontWeight: 400,
              maxWidth: "520px",
            }}
          >
            매일 배우고, 기록하고, 성장합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex items-center"
            style={{ marginTop: "var(--space-12)", gap: "var(--space-4)" }}
          >
            <Link
              href="/portfolio"
              className="font-medium text-white transition-all hover:scale-105 active:scale-95"
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
              className="glass cloud-shadow font-medium transition-all hover:scale-105 active:scale-95"
              style={{
                borderRadius: "980px",
                padding: "var(--space-3) var(--space-8)",
                fontSize: "var(--font-subhead)",
              }}
            >
              Today I Learned
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              position: "absolute",
              bottom: "var(--space-10)",
            }}
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

      {/* ── Section 2: Philosophy (Sticky text reveal) ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg-secondary)",
        }}
      >
        <div
          className="section-container"
          style={{
            padding: "var(--space-24) var(--content-padding)",
            textAlign: "center",
          }}
        >
          <RevealText>
            <p
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.3,
                maxWidth: "720px",
                margin: "0 auto",
              }}
            >
              좋은 앱은
              <br />
              <span style={{ color: "var(--color-accent)" }}>
                좋은 경험
              </span>
              에서 시작됩니다.
            </p>
          </RevealText>

          <RevealText delay={0.1}>
            <p
              style={{
                marginTop: "var(--space-8)",
                fontSize: "var(--font-body)",
                color: "var(--color-text-secondary)",
                maxWidth: "480px",
                margin: "var(--space-8) auto 0",
                lineHeight: 1.7,
              }}
            >
              Apple의 Human Interface Guidelines를 깊이 이해하고,
              사용자가 자연스럽게 느끼는 인터페이스를 만듭니다.
            </p>
          </RevealText>
        </div>
      </section>

      {/* ── Section 3: Numbers ── */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="section-container"
          style={{ padding: "var(--space-24) var(--content-padding)" }}
        >
          <div
            className="grid md:grid-cols-3"
            style={{
              gap: "var(--space-8)",
              maxWidth: "720px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {values.map((v, i) => (
              <RevealText key={v.label} delay={i * 0.1}>
                <p
                  className="font-bold"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    letterSpacing: "-0.03em",
                    color: "var(--color-accent)",
                  }}
                >
                  {v.number}
                </p>
                <p
                  style={{
                    marginTop: "var(--space-2)",
                    fontSize: "var(--font-subhead)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {v.label}
                </p>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: TIL Categories ── */}
      <section
        style={{
          background: "var(--color-bg-secondary)",
        }}
      >
        <div
          className="section-container"
          style={{ padding: "var(--space-24) var(--content-padding)" }}
        >
          <RevealText>
            <div style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
              <h2
                className="font-bold tracking-tight"
                style={{ fontSize: "var(--font-title-1)" }}
              >
                Today I Learned
              </h2>
              <p
                style={{
                  marginTop: "var(--space-4)",
                  fontSize: "var(--font-callout)",
                  color: "var(--color-text-secondary)",
                }}
              >
                매일의 학습을 기록합니다
              </p>
            </div>
          </RevealText>

          <div
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            style={{ maxWidth: "820px", margin: "0 auto" }}
          >
            {categories.map((cat, i) => (
              <Link key={cat.href} href={cat.href}>
                <CloudCard delay={i * 0.06}>
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
                      fontSize: "var(--font-headline)",
                      marginTop: "var(--space-3)",
                    }}
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

      {/* ── Section 5: Portfolio CTA ── */}
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="section-container"
          style={{
            padding: "var(--space-24) var(--content-padding)",
            textAlign: "center",
          }}
        >
          <RevealText>
            <p
              style={{
                fontSize: "var(--font-callout)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "0.04em",
                marginBottom: "var(--space-4)",
              }}
            >
              PORTFOLIO
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              만들어온 것들을
              <br />
              확인해보세요.
            </h2>
          </RevealText>

          <RevealText delay={0.15}>
            <Link
              href="/portfolio"
              className="inline-block font-medium text-white transition-all hover:scale-105 active:scale-95"
              style={{
                marginTop: "var(--space-10)",
                background: "var(--color-accent)",
                borderRadius: "980px",
                padding: "var(--space-4) var(--space-10)",
                fontSize: "var(--font-body)",
              }}
            >
              Portfolio 보기
            </Link>
          </RevealText>
        </div>
      </section>
    </div>
  );
}
