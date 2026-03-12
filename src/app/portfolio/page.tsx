"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

/* ─── Featured Projects ─── */

const featured = [
  {
    slug: "susa24",
    number: "01",
    title: "SUSA24",
    tagline: "범죄수사 사건 관리 및\n위치 데이터 시각화",
    description: "현장에서 실제로 쓰이는 앱을 만들었습니다.",
    tags: ["SwiftUI", "CoreData", "MapKit", "Swift 6", "Metal", "DWStore"],
    year: "2025",
  },
  {
    slug: "synctank",
    number: "02",
    title: "SyncTank",
    tagline: "AI 컨텍스트 알림\niOS + macOS 실시간 싱크",
    description: "Junction Asia 2025 우승.",
    tags: ["SwiftUI", "MVVM", "Upstage LLM", "macOS"],
    year: "2025",
    badge: "🏆 Junction Asia Winner",
  },
  {
    slug: "naru",
    number: "03",
    title: "Naru",
    tagline: "몰입형 동화 앱\niPad + iPhone + HomeKit IoT",
    description: "물리적 공간까지 이야기 속으로.",
    tags: ["SwiftUI", "SwiftData", "MultipeerConnectivity", "HomeKit"],
    year: "2025",
  },
];

/* ─── More Projects ─── */

type Category = "all" | "ios" | "android" | "web";

const moreProjects = [
  {
    name: "경조사실무팀",
    category: "ios" as Category,
    year: "2025",
    desc: "직장 경조사 플랫폼",
    tags: ["SwiftUI", "SwiftData", "MVVM"],
    context: "Apple Developer Academy C3",
  },
  {
    name: "HeiLocal",
    category: "ios" as Category,
    year: "2025",
    desc: "위치 기반 로컬 탐색",
    tags: ["Swift", "SwiftUI", "Google Maps"],
    context: "Junction 2025 핀란드 세계대회",
  },
  {
    name: "CollaB",
    category: "android" as Category,
    year: "2023–2024",
    desc: "IT 프로젝트 매칭 플랫폼",
    tags: ["Kotlin", "MVVM", "Retrofit2", "Firebase"],
    context: "팀 리드 · Android 개발",
  },
  {
    name: "STARTMATCH",
    category: "android" as Category,
    year: "2023",
    desc: "스타트업 인재 채용 플랫폼",
    tags: ["Kotlin", "Spring Boot", "MVVM"],
    context: "Android 프론트엔드",
  },
  {
    name: "Safety Paris",
    category: "web" as Category,
    year: "2024",
    desc: "파리 올림픽 범죄 예방 웹서비스",
    tags: ["React", "Firebase", "Google Maps API"],
    context: "4인 팀 프로젝트",
  },
  {
    name: "Village of IoT",
    category: "web" as Category,
    year: "2022",
    desc: "IoT 스마트 빌리지",
    tags: ["Python", "Pymodi"],
    context: "첫 프로젝트",
  },
];

const filterLabels: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ios", label: "iOS" },
  { key: "android", label: "Android" },
  { key: "web", label: "Web" },
];

/* ─── Page ─── */

export default function PortfolioPage() {
  const [filter, setFilter] = useState<Category>("all");
  const filtered =
    filter === "all"
      ? moreProjects
      : moreProjects.filter((p) => p.category === filter);

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

      {/* ── Featured Projects (Full-screen each) ── */}
      {featured.map((project, idx) => (
        <section
          key={project.slug}
          style={{
            minHeight: "100vh",
            background:
              idx % 2 === 0 ? "var(--color-bg-dark)" : "var(--color-bg-secondary)",
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
                  <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
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
                    {project.badge && (
                      <span
                        style={{
                          fontSize: "var(--font-caption)",
                          color: idx % 2 === 0 ? "var(--color-text-on-dark)" : "var(--color-text-primary)",
                          background: "rgba(88, 86, 214, 0.15)",
                          padding: "2px var(--space-3)",
                          borderRadius: "var(--radius-sm)",
                          fontWeight: 500,
                        }}
                      >
                        {project.badge}
                      </span>
                    )}
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h2
                    className="font-bold"
                    style={{
                      fontSize: "clamp(3rem, 8vw, 5.5rem)",
                      color: idx % 2 === 0 ? "var(--color-text-on-dark)" : "var(--color-text-primary)",
                      letterSpacing: "-0.04em",
                      lineHeight: 1.0,
                      marginTop: "var(--space-3)",
                    }}
                  >
                    {project.title}
                  </h2>
                </Reveal>

                <Reveal delay={0.15}>
                  <p
                    style={{
                      fontSize: "var(--font-caption)",
                      color: idx % 2 === 0 ? "var(--color-text-secondary-on-dark)" : "var(--color-text-tertiary)",
                      marginTop: "var(--space-2)",
                    }}
                  >
                    {project.year}
                  </p>
                </Reveal>

                <Reveal delay={0.2}>
                  <p
                    style={{
                      marginTop: "var(--space-5)",
                      fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
                      color: idx % 2 === 0 ? "var(--color-text-secondary-on-dark)" : "var(--color-text-secondary)",
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

                <Reveal delay={0.25}>
                  <div className="flex flex-wrap" style={{ marginTop: "var(--space-5)", gap: "var(--space-2)" }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: idx % 2 === 0 ? "rgba(255,255,255,0.06)" : "var(--color-accent-subtle)",
                          border: `1px solid ${idx % 2 === 0 ? "var(--color-separator-on-dark)" : "var(--color-separator)"}`,
                          borderRadius: "980px",
                          padding: "var(--space-1) var(--space-4)",
                          fontSize: "var(--font-caption)",
                          color: idx % 2 === 0 ? "var(--color-text-secondary-on-dark)" : "var(--color-text-secondary)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.3}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    style={{
                      display: "inline-block",
                      marginTop: "var(--space-6)",
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
              <Reveal delay={0.15}>
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
                    스크린샷 추가
                  </div>
                </DeviceMockup>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ── More Projects + Floating Filter ── */}
      <section style={{ padding: "var(--space-24) 0", position: "relative" }}>
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)" }}
        >
          <Reveal>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                letterSpacing: "-0.03em",
                marginBottom: "var(--space-10)",
              }}
            >
              More Projects
            </h2>
          </Reveal>

          {/* Floating filter pill */}
          <div
            style={{
              position: "sticky",
              top: "calc(var(--nav-height) + var(--space-4))",
              zIndex: 20,
              display: "flex",
              justifyContent: "center",
              marginBottom: "var(--space-8)",
            }}
          >
            <div
              className="glass cloud-shadow"
              style={{
                display: "inline-flex",
                gap: "var(--space-1)",
                padding: "4px",
                borderRadius: "980px",
              }}
            >
              {filterLabels.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="transition-all"
                  style={{
                    padding: "var(--space-2) var(--space-5)",
                    borderRadius: "980px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "var(--font-footnote)",
                    fontWeight: filter === f.key ? 600 : 400,
                    color:
                      filter === f.key
                        ? "white"
                        : "var(--color-text-secondary)",
                    background:
                      filter === f.key
                        ? "var(--color-accent)"
                        : "transparent",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "var(--space-6)" }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease }}
                  className="cloud-shadow"
                  style={{
                    background: "var(--color-bg)",
                    borderRadius: "var(--radius-xl)",
                    padding: "var(--space-6)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-3)",
                  }}
                >
                  <div
                    className="flex items-center justify-between"
                  >
                    <h3
                      className="font-semibold"
                      style={{ fontSize: "var(--font-headline)" }}
                    >
                      {project.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "var(--font-caption)",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      {project.year}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "var(--font-subhead)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {project.desc}
                  </p>

                  <p
                    style={{
                      fontSize: "var(--font-caption)",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {project.context}
                  </p>

                  <div
                    className="flex flex-wrap"
                    style={{ gap: "var(--space-1)", marginTop: "auto" }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "var(--font-caption)",
                          color: "var(--color-accent)",
                          background: "var(--color-accent-subtle)",
                          padding: "2px var(--space-2)",
                          borderRadius: "var(--radius-sm)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: "var(--space-20) 0",
          background: "var(--color-bg-secondary)",
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
