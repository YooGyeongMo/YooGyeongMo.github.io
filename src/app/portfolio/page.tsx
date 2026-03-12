"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const revealTransition = { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const };

/* ─── Reveal (whileInView) ─── */

function Reveal({
  children,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...revealTransition, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Device Mockup ─── */

function DeviceMockup({ children }: { children: React.ReactNode }) {
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
      {/* Dynamic Island */}
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

/* ─── Project Data ─── */

const projects = [
  {
    slug: "susa24",
    number: "01",
    title: "SUSA24",
    tagline: "범죄수사 사건 관리 및 위치 데이터 시각화",
    description: "현장에서 실제로 쓰이는 앱을 만들었습니다.",
    tags: ["SwiftUI", "UIKit", "CoreData", "MapKit", "Swift 6", "Metal", "AVFoundation"],
    features: [
      {
        title: "커스텀 상태관리",
        desc: "TCA에서 영감받은 DWStore 아키텍처.\n단방향 데이터 플로우로 예측 가능한 상태 관리.",
      },
      {
        title: "지도 시각화",
        desc: "NMapsMap + CoreData 기반 실시간 위치 데이터 렌더링.\n필터별 핀 분류.",
      },
      {
        title: "Swift 6 Concurrency",
        desc: "Strict Concurrency 환경에서\n@MainActor, Sendable 완전 적용.",
      },
      {
        title: "Liquid Glass",
        desc: "Metal shader 기반\n커스텀 글래스모피즘 이펙트.",
      },
    ],
    bg: "dark" as const,
  },
];

/* ─── Page ─── */

export default function PortfolioPage() {
  return (
    <div>
      {/* ── Navigation Bar: Product Carousel (Apple style) ── */}
      <section
        style={{
          paddingTop: "calc(var(--nav-height) + var(--space-8))",
          paddingBottom: "var(--space-8)",
          borderBottom: "1px solid var(--color-separator)",
        }}
      >
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-bold"
            style={{
              fontSize: "var(--font-large-title)",
              letterSpacing: "-0.03em",
              textAlign: "center",
            }}
          >
            Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              textAlign: "center",
              marginTop: "var(--space-2)",
              fontSize: "var(--font-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            문제를 정의하고, 코드로 풀어냈습니다.
          </motion.p>
        </div>
      </section>

      {/* ── Project Sections (apple.com/iphone style) ── */}
      {projects.map((project) => (
        <section
          key={project.slug}
          style={{
            background:
              project.bg === "dark"
                ? "var(--color-bg-dark)"
                : "var(--color-bg)",
            padding: "var(--space-24) 0",
            overflow: "hidden",
          }}
        >
          <div
            className="section-container"
            style={{ padding: "0 var(--content-padding)" }}
          >
            {/* Project Header */}
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
                  Project {project.number}
                </p>
              </Reveal>

              <Reveal>
                <h2
                  className="font-bold"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 5rem)",
                    color:
                      project.bg === "dark"
                        ? "var(--color-text-on-dark)"
                        : "var(--color-text-primary)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.05,
                    marginTop: "var(--space-3)",
                  }}
                >
                  {project.title}
                </h2>
              </Reveal>

              <Reveal>
                <p
                  style={{
                    marginTop: "var(--space-4)",
                    fontSize: "var(--font-title-3)",
                    color:
                      project.bg === "dark"
                        ? "var(--color-text-secondary-on-dark)"
                        : "var(--color-text-secondary)",
                    maxWidth: "520px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    lineHeight: 1.5,
                  }}
                >
                  {project.tagline}.
                  <br />
                  {project.description}
                </p>
              </Reveal>

              <Reveal>
                <div
                  style={{
                    marginTop: "var(--space-6)",
                    display: "flex",
                    justifyContent: "center",
                    gap: "var(--space-5)",
                  }}
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    style={{
                      fontSize: "var(--font-body)",
                      color: "var(--color-accent)",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    자세히 보기 &rarr;
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Device Mockup — Centered, Big */}
            <Reveal
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "var(--space-16)",
              }}
            >
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

            {/* Tech Stack Tags */}
            <Reveal>
              <div
                className="flex flex-wrap justify-center"
                style={{
                  marginTop: "var(--space-12)",
                  gap: "var(--space-3)",
                }}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background:
                        project.bg === "dark"
                          ? "rgba(255, 255, 255, 0.06)"
                          : "var(--color-bg-secondary)",
                      border: `1px solid ${
                        project.bg === "dark"
                          ? "var(--color-separator-on-dark)"
                          : "var(--color-separator)"
                      }`,
                      borderRadius: "980px",
                      padding: "var(--space-2) var(--space-5)",
                      fontSize: "var(--font-footnote)",
                      color:
                        project.bg === "dark"
                          ? "var(--color-text-secondary-on-dark)"
                          : "var(--color-text-secondary)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ── Coming Soon ── */}
      <section
        style={{
          padding: "var(--space-24) 0",
          background: "var(--color-bg-secondary)",
          textAlign: "center",
        }}
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
              marginTop: "var(--space-3)",
              fontSize: "var(--font-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            다음 프로젝트를 준비하고 있습니다.
          </p>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: "var(--space-20) 0",
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
                marginTop: "var(--space-6)",
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
