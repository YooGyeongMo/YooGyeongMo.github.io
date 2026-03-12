"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* ─── Reveal ─── */

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
      transition={{ duration: 0.7, ease, delay }}
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
        width: "260px",
        height: "540px",
        borderRadius: "40px",
        border: "6px solid var(--color-text-primary)",
        background: "var(--color-bg-secondary)",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90px",
          height: "24px",
          borderRadius: "12px",
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
    tagline: "범죄수사 사건 관리 및\n위치 데이터 시각화",
    description: "현장에서 실제로 쓰이는 앱을 만들었습니다.",
    tags: ["SwiftUI", "UIKit", "CoreData", "MapKit", "Swift 6", "Metal"],
    bg: "dark" as const,
  },
];

/* ─── Page ─── */

export default function PortfolioPage() {
  return (
    <div>
      {/* ── Header ── */}
      <section
        style={{
          paddingTop: "calc(var(--nav-height) + 6vh)",
          paddingBottom: "var(--space-6)",
        }}
      >
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: "var(--font-subhead)",
              color: "var(--color-text-tertiary)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "var(--space-4)",
            }}
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-bold"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
            }}
          >
            만들어온 것들.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              marginTop: "var(--space-4)",
              fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
              color: "var(--color-text-secondary)",
              maxWidth: "440px",
              lineHeight: 1.6,
            }}
          >
            문제를 정의하고, 코드로 풀어냈습니다.
          </motion.p>
        </div>
      </section>

      {/* ── Projects (One per viewport) ── */}
      {projects.map((project) => (
        <section
          key={project.slug}
          style={{
            minHeight: "100vh",
            background:
              project.bg === "dark" ? "var(--color-bg-dark)" : "var(--color-bg)",
            display: "flex",
            alignItems: "center",
            padding: "var(--space-16) 0",
          }}
        >
          <div
            className="section-container"
            style={{ padding: "0 var(--content-padding)", width: "100%" }}
          >
            <div
              className="flex flex-col items-center md:flex-row md:items-center"
              style={{ gap: "clamp(40px, 8vw, 80px)" }}
            >
              {/* Text */}
              <div style={{ flex: 1 }}>
                <Reveal>
                  <p
                    style={{
                      fontSize: "var(--font-subhead)",
                      color: "var(--color-accent)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Project {project.number}
                  </p>
                </Reveal>

                <Reveal delay={0.1}>
                  <h2
                    className="font-bold"
                    style={{
                      fontSize: "clamp(3rem, 8vw, 5.5rem)",
                      color:
                        project.bg === "dark"
                          ? "var(--color-text-on-dark)"
                          : "var(--color-text-primary)",
                      letterSpacing: "-0.04em",
                      lineHeight: 1.0,
                      marginTop: "var(--space-3)",
                    }}
                  >
                    {project.title}
                  </h2>
                </Reveal>

                <Reveal delay={0.2}>
                  <p
                    style={{
                      marginTop: "var(--space-6)",
                      fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
                      color:
                        project.bg === "dark"
                          ? "var(--color-text-secondary-on-dark)"
                          : "var(--color-text-secondary)",
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                      maxWidth: "400px",
                    }}
                  >
                    {project.tagline}.
                    {"\n"}
                    {project.description}
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <div
                    className="flex flex-wrap"
                    style={{
                      marginTop: "var(--space-6)",
                      gap: "var(--space-2)",
                    }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background:
                            project.bg === "dark"
                              ? "rgba(255,255,255,0.06)"
                              : "var(--color-bg-secondary)",
                          border: `1px solid ${
                            project.bg === "dark"
                              ? "var(--color-separator-on-dark)"
                              : "var(--color-separator)"
                          }`,
                          borderRadius: "980px",
                          padding: "var(--space-1) var(--space-4)",
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

                <Reveal delay={0.35}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    style={{
                      display: "inline-block",
                      marginTop: "var(--space-8)",
                      fontSize: "var(--font-body)",
                      color: "var(--color-accent)",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    자세히 보기 &rarr;
                  </Link>
                </Reveal>
              </div>

              {/* Device */}
              <Reveal delay={0.2}>
                <DeviceMockup>
                  <div
                    style={{
                      textAlign: "center",
                      color: "var(--color-text-tertiary)",
                      fontSize: "var(--font-footnote)",
                      padding: "var(--space-4)",
                    }}
                  >
                    <p style={{ fontSize: "2rem", marginBottom: "var(--space-2)" }}>◈</p>
                    앱 스크린샷 추가
                  </div>
                </DeviceMockup>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ── Coming Soon ── */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg-secondary)",
        }}
      >
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "var(--font-subhead)",
                color: "var(--color-accent)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Project 02
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                letterSpacing: "-0.03em",
                marginTop: "var(--space-3)",
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
          </div>
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
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
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
