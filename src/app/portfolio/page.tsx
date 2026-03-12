"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Scroll Reveal ─── */

function Reveal({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 50%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y, ...style }}>
      {children}
    </motion.div>
  );
}

/* ─── Device Mockup ─── */

function DeviceMockup({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: "280px",
        height: "580px",
        borderRadius: "44px",
        border: "8px solid var(--color-text-primary)",
        background: "var(--color-bg-secondary)",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100px",
          height: "28px",
          borderRadius: "14px",
          background: "var(--color-text-primary)",
          zIndex: 10,
        }}
      />
      {children}
    </div>
  );
}

/* ─── Page ─── */

export default function PortfolioPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 var(--content-padding)",
        }}
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: "var(--font-callout)",
              color: "var(--color-text-tertiary)",
              letterSpacing: "0.04em",
              marginBottom: "var(--space-5)",
            }}
          >
            PORTFOLIO
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-bold"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            만들어온 것들.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              marginTop: "var(--space-4)",
              fontSize: "var(--font-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            문제를 정의하고, 코드로 풀어냈습니다.
          </motion.p>
        </div>
      </section>

      {/* ── Project 1: SUSA24 (Dark section, Apple style) ── */}
      <section
        style={{
          background: "var(--color-bg-dark)",
          padding: "var(--space-24) 0",
          overflow: "hidden",
        }}
      >
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)" }}
        >
          <Reveal>
            <p
              style={{
                fontSize: "var(--font-footnote)",
                color: "var(--color-accent)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Project 01
            </p>
          </Reveal>

          <Reveal>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--color-text-on-dark)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginTop: "var(--space-4)",
              }}
            >
              SUSA24
            </h2>
          </Reveal>

          <Reveal>
            <p
              style={{
                marginTop: "var(--space-4)",
                fontSize: "var(--font-title-3)",
                color: "var(--color-text-secondary-on-dark)",
                maxWidth: "520px",
                lineHeight: 1.5,
              }}
            >
              범죄수사 사건 관리 및 위치 데이터 시각화.
              <br />
              현장에서 실제로 쓰이는 앱을 만들었습니다.
            </p>
          </Reveal>

          {/* Device + Features */}
          <div
            className="flex flex-col items-center md:flex-row md:items-start md:justify-between"
            style={{
              marginTop: "var(--space-16)",
              gap: "var(--space-12)",
            }}
          >
            {/* Device Mockup */}
            <Reveal style={{ display: "flex", justifyContent: "center", flex: 1 }}>
              <DeviceMockup>
                <div
                  style={{
                    textAlign: "center",
                    color: "var(--color-text-tertiary)",
                    fontSize: "var(--font-footnote)",
                    padding: "var(--space-4)",
                  }}
                >
                  <p style={{ fontSize: "2rem", marginBottom: "var(--space-2)" }}>
                    ◈
                  </p>
                  앱 스크린샷 추가
                </div>
              </DeviceMockup>
            </Reveal>

            {/* Feature List */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-8)",
                justifyContent: "center",
                minHeight: "400px",
              }}
            >
              {[
                {
                  title: "커스텀 상태관리",
                  desc: "TCA에서 영감받은 DWStore 아키텍처. 단방향 데이터 플로우로 예측 가능한 상태 관리.",
                },
                {
                  title: "지도 시각화",
                  desc: "NMapsMap + CoreData 기반 실시간 위치 데이터 렌더링. 필터별 핀 분류.",
                },
                {
                  title: "Swift 6 Concurrency",
                  desc: "Strict Concurrency 환경에서 @MainActor, Sendable 완전 적용.",
                },
                {
                  title: "Liquid Glass",
                  desc: "Metal shader 기반 커스텀 글래스모피즘 이펙트.",
                },
              ].map((feature) => (
                <Reveal key={feature.title}>
                  <div
                    style={{
                      borderLeft: "2px solid var(--color-accent)",
                      paddingLeft: "var(--space-6)",
                    }}
                  >
                    <h4
                      className="font-semibold"
                      style={{
                        fontSize: "var(--font-headline)",
                        color: "var(--color-text-on-dark)",
                      }}
                    >
                      {feature.title}
                    </h4>
                    <p
                      style={{
                        marginTop: "var(--space-2)",
                        fontSize: "var(--font-subhead)",
                        color: "var(--color-text-secondary-on-dark)",
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <Reveal>
            <div
              className="flex flex-wrap justify-center"
              style={{
                marginTop: "var(--space-16)",
                gap: "var(--space-3)",
              }}
            >
              {[
                "SwiftUI",
                "UIKit",
                "CoreData",
                "MapKit",
                "Swift 6",
                "Metal",
                "AVFoundation",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid var(--color-separator-on-dark)",
                    borderRadius: "980px",
                    padding: "var(--space-2) var(--space-5)",
                    fontSize: "var(--font-footnote)",
                    color: "var(--color-text-secondary-on-dark)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Project 2: Coming Soon (Light section) ── */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg-secondary)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Reveal>
            <p
              style={{
                fontSize: "var(--font-footnote)",
                color: "var(--color-accent)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Project 02
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "var(--font-title-1)",
                letterSpacing: "-0.02em",
                marginTop: "var(--space-4)",
              }}
            >
              Coming Soon.
            </h2>
            <p
              style={{
                marginTop: "var(--space-4)",
                fontSize: "var(--font-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              다음 프로젝트를 준비하고 있습니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              함께 만들어갈
              <br />
              이야기가 있다면.
            </h2>
            <a
              href="mailto:contact@example.com"
              className="inline-block font-medium text-white transition-all hover:scale-105 active:scale-95"
              style={{
                marginTop: "var(--space-8)",
                background: "var(--color-accent)",
                borderRadius: "980px",
                padding: "var(--space-3) var(--space-10)",
                fontSize: "var(--font-body)",
              }}
            >
              연락하기
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
