"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.7, ease, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Device Mockup ─── */

function DeviceMockup({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  const frameColor = onDark ? "rgba(255, 255, 255, 0.25)" : "var(--color-text-primary)";
  const notchColor = onDark ? "rgba(255, 255, 255, 0.2)" : "var(--color-text-primary)";
  const bgColor = onDark ? "rgba(255, 255, 255, 0.06)" : "var(--color-bg-secondary)";

  return (
    <div
      className="device-mockup"
      style={{
        borderRadius: "40px",
        border: `6px solid ${frameColor}`,
        background: bgColor,
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
          background: notchColor,
          zIndex: 10,
        }}
      />
      {children}
    </div>
  );
}

/* ─── Section Background Per Category ─── */

function getSectionBg(category: string, idx: number): { bg: string; isDark: boolean } {
  if (category === "android") {
    // deep navy / cool gray (light first)
    return idx % 2 === 0
      ? { bg: "#eef1f5", isDark: false }
      : { bg: "#1c2a3a", isDark: true };
  }
  if (category === "web") {
    // deep purple / lavender
    return idx % 2 === 0
      ? { bg: "#2a1f3d", isDark: true }
      : { bg: "#f3f0f8", isDark: false };
  }
  // iOS: system dark / light
  return idx % 2 === 0
    ? { bg: "var(--color-bg-dark)", isDark: true }
    : { bg: "var(--color-bg-secondary)", isDark: false };
}

/* ─── Featured Projects ─── */

type Category = "ios" | "android" | "web";

interface FeaturedProject {
  slug: string;
  category: Category;
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  year: string;
  highlight?: string;
  achievements?: string[];
}

const featured: FeaturedProject[] = [
  // iOS
  {
    slug: "susa24",
    category: "ios",
    number: "01",
    title: "SUSA24",
    tagline: "범죄수사 사건 관리 및\n위치 데이터 시각화",
    description: "현장에서 실제로 쓰이는 앱을 만들었습니다.",
    tags: ["SwiftUI", "CoreData", "MapKit", "Swift 6", "Metal", "DWStore"],
    year: "2025",
    highlight: "🍎 Apple Showcase Spotlight Team",
    achievements: ["경북경찰청 · 포항북부경찰서 협업", "경북경찰청 기동대 테스트베드 준비 중", "포항시 VIP 대상 피칭", "Apple Developer Relations 리더십 정기 리뷰", "대중매체 보도", "안될공학 유튜브 출연"],
  },
  {
    slug: "naru",
    category: "ios",
    number: "02",
    title: "Naru",
    tagline: "몰입형 동화 앱\niPad + iPhone + HomeKit IoT",
    description: "물리적 공간까지 이야기 속으로.",
    tags: ["SwiftUI", "SwiftData", "MultipeerConnectivity", "HomeKit"],
    year: "2025",
    highlight: "📦 App Store 배포 예정",
    achievements: ["Apple Developer Relations 리더십 정기 리뷰", "LetSwift 2025 세션 소개"],
  },
  {
    slug: "synctank",
    category: "ios",
    number: "03",
    title: "SyncTank",
    tagline: "AI 컨텍스트 알림\niOS + macOS 실시간 싱크",
    description: "전 세계 200여 명이 참가한 국제 해커톤에서 정상에 섰습니다.",
    tags: ["SwiftUI", "MVVM", "Upstage LLM", "macOS"],
    year: "2025",
    highlight: "🏆 Junction ASIA 2025 국제 해커톤 우승",
    achievements: ["Upstage Track 우승", "Final 최종 우승", "ASIA 대표 Junction 2025 Finland 참가"],
  },
  // Android
  {
    slug: "collab",
    category: "android",
    number: "01",
    title: "CollaB",
    tagline: "IT 프로젝트 매칭 플랫폼\n팀 리드 · Android 개발",
    description: "기획부터 배포까지 이끌었습니다.",
    tags: ["Kotlin", "MVVM", "Retrofit2", "Firebase", "Room"],
    year: "2023–2024",
    highlight: "🏅 캡스톤디자인 장려상",
  },
  {
    slug: "startmatch",
    category: "android",
    number: "02",
    title: "STARTMATCH",
    tagline: "스타트업 인재 채용 플랫폼\nAndroid 프론트엔드",
    description: "스타트업과 인재를 연결합니다.",
    tags: ["Kotlin", "Spring Boot", "MVVM", "REST API"],
    year: "2023",
    highlight: "🏅 해커톤 인기상",
  },
  // Web
  {
    slug: "heilocal",
    category: "web",
    number: "01",
    title: "HeiLocal",
    tagline: "위치 기반 로컬 탐색\n웹서비스",
    description: "Junction 2025 핀란드 세계대회 출전작.",
    tags: ["React", "TypeScript", "Google Maps API"],
    year: "2025",
    highlight: "🌍 Junction Global Submission",
  },
  {
    slug: "safety-paris",
    category: "web",
    number: "02",
    title: "Safety Paris",
    tagline: "파리 올림픽 범죄 예방\n데이터 시각화 웹서비스",
    description: "안전한 올림픽을 위한 데이터.",
    tags: ["React", "Firebase", "Google Maps API", "Chart.js"],
    year: "2024",
  },
];

/* ─── More Projects ─── */

const moreProjects = [
  {
    name: "경조사실무팀",
    slug: "gyeongjo",
    platform: "iOS",
    year: "2025",
    desc: "한 명의 유저를 위한 직장 경조사 앱",
    tags: ["SwiftUI", "SwiftData", "MVVM"],
    context: "Apple Developer Academy C3",
  },
  {
    name: "Village of IoT",
    slug: "village-of-iot",
    platform: "IoT",
    year: "2022",
    desc: "IoT 스마트 빌리지 — 첫 프로젝트",
    tags: ["Python", "Pymodi"],
    context: "AI 혁신공유대학 금상 (1위)",
    badge: "🏆 금상 (1위)",
  },
];

const filterLabels: { key: Category; label: string }[] = [
  { key: "ios", label: "iOS" },
  { key: "android", label: "Android" },
  { key: "web", label: "Web" },
];

/* ─── Page ─── */

export default function PortfolioPage() {
  const [filter, setFilter] = useState<Category>("ios");
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });
  const scrollIndicatorOpacity = useTransform(headerScroll, [0, 0.5], [1, 0]);

  const filteredFeatured = featured.filter((p) => p.category === filter);

  return (
    <div>
      {/* ── Header ── */}
      <section
        ref={headerRef}
        style={{
          paddingTop: "calc(var(--nav-height) + 6vh)",
          paddingBottom: "var(--space-16)",
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

      {/* Scroll indicator — fixed, fades on scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "fixed",
          bottom: "var(--space-20)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          pointerEvents: "none",
          opacity: scrollIndicatorOpacity,
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

      {/* ── Featured Projects ── */}
      <div style={{ position: "relative", background: "var(--color-bg-dark)", paddingTop: "var(--space-16)" }}>
        {/* Floating Filter Pill */}
        <div
          style={{
            position: "sticky",
            top: "calc(var(--nav-height) + var(--space-5))",
            zIndex: 20,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
            marginBottom: "var(--space-6)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass cloud-shadow"
            style={{
              display: "inline-flex",
              gap: "var(--space-1)",
              padding: "4px",
              borderRadius: "980px",
              pointerEvents: "auto",
            }}
          >
            {filterLabels.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="transition-all filter-pill-btn"
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
          </motion.div>
        </div>

      <AnimatePresence mode="wait">
        {filteredFeatured.length > 0 && (
          <motion.div
            key={`featured-${filter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredFeatured.map((project, idx) => {
              const { bg, isDark } = getSectionBg(project.category, idx);
              return (
                <section
                  key={project.slug}
                  style={{
                    minHeight: "100vh",
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    padding: "var(--space-16) 0",
                  }}
                >
                  <div
                    className="section-container"
                    style={{ padding: "0 var(--content-padding)", width: "100%", maxWidth: "1140px" }}
                  >
                    <div
                      className="flex flex-col items-center md:flex-row md:items-center md:justify-center"
                      style={{ gap: "var(--space-2)" }}
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
                            {project.highlight && (
                              <span
                                style={{
                                  fontSize: "var(--font-caption)",
                                  color: isDark ? "var(--color-text-on-dark)" : "var(--color-text-primary)",
                                  background: "rgba(88, 86, 214, 0.15)",
                                  padding: "2px var(--space-3)",
                                  borderRadius: "var(--radius-sm)",
                                  fontWeight: 500,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {project.highlight}
                              </span>
                            )}
                          </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                          <h2
                            className="font-bold"
                            style={{
                              fontSize: "clamp(3rem, 8vw, 5.5rem)",
                              color: isDark ? "var(--color-text-on-dark)" : "var(--color-text-primary)",
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
                            className="font-semibold"
                            style={{
                              fontSize: "var(--font-title-3)",
                              color: isDark ? "var(--color-text-secondary-on-dark)" : "var(--color-text-tertiary)",
                              marginTop: "var(--space-3)",
                              letterSpacing: "-0.01em",
                              fontVariantNumeric: "tabular-nums",
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
                              color: isDark ? "var(--color-text-secondary-on-dark)" : "var(--color-text-secondary)",
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

                        {/* Achievement chips */}
                        {project.achievements && project.achievements.length > 0 && (
                          <Reveal delay={0.25}>
                            <div className="flex flex-wrap" style={{ marginTop: "var(--space-5)", gap: "var(--space-2)" }}>
                              {project.achievements.map((a) => (
                                <span
                                  key={a}
                                  style={{
                                    background: isDark ? "rgba(88, 86, 214, 0.2)" : "rgba(88, 86, 214, 0.08)",
                                    border: `1px solid ${isDark ? "rgba(88, 86, 214, 0.4)" : "rgba(88, 86, 214, 0.2)"}`,
                                    borderRadius: "var(--radius-sm)",
                                    padding: "3px var(--space-3)",
                                    fontSize: "var(--font-caption)",
                                    color: isDark ? "rgba(255,255,255,0.85)" : "var(--color-accent)",
                                    fontWeight: 500,
                                  }}
                                >
                                  {a}
                                </span>
                              ))}
                            </div>
                          </Reveal>
                        )}

                        {/* Tech tags */}
                        <Reveal delay={0.3}>
                          <div className="flex flex-wrap" style={{ marginTop: "var(--space-3)", gap: "var(--space-2)" }}>
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  background: isDark ? "rgba(255,255,255,0.06)" : "var(--color-accent-subtle)",
                                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "var(--color-separator)"}`,
                                  borderRadius: "980px",
                                  padding: "var(--space-1) var(--space-4)",
                                  fontSize: "var(--font-caption)",
                                  color: isDark ? "var(--color-text-secondary-on-dark)" : "var(--color-text-secondary)",
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
                        <DeviceMockup onDark={isDark}>
                          <div
                            style={{
                              textAlign: "center",
                              color: isDark ? "var(--color-text-secondary-on-dark)" : "var(--color-text-tertiary)",
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
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* ── More Projects ── */}
      {/* ── More Projects (always visible, all categories) ── */}
      <section style={{ paddingTop: "var(--space-24)", paddingBottom: "6rem", position: "relative" }}>
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)", maxWidth: "1140px" }}
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

          <div
            className="grid md:grid-cols-2"
            style={{ gap: "var(--space-6)" }}
          >
            {moreProjects.map((project, i) => (
              <Reveal key={project.name} delay={i * 0.08}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
                >
                  <div
                    className="cloud-shadow transition-all hover:scale-[1.02]"
                    style={{
                      background: "var(--color-bg)",
                      borderRadius: "var(--radius-xl)",
                      padding: "var(--space-6)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-3)",
                      height: "100%",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
                        <h3
                          className="font-semibold"
                          style={{ fontSize: "var(--font-headline)" }}
                        >
                          {project.name}
                        </h3>
                        <span
                          style={{
                            fontSize: "11px",
                            color: "var(--color-text-tertiary)",
                            border: "1px solid var(--color-separator)",
                            padding: "1px 8px",
                            borderRadius: "980px",
                            fontWeight: 500,
                          }}
                        >
                          {project.platform}
                        </span>
                      </div>
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

                    {project.badge && (
                      <span
                        style={{
                          fontSize: "var(--font-caption)",
                          color: "var(--color-accent)",
                          fontWeight: 600,
                        }}
                      >
                        {project.badge}
                      </span>
                    )}

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
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards & Achievements ── */}
      <section
        style={{
          background: "var(--color-bg-dark)",
          padding: "var(--space-24) 0",
        }}
      >
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)", maxWidth: "1140px" }}
        >
          {/* 수상 경력 */}
          <Reveal>
            <p
              style={{
                fontSize: "var(--font-subhead)",
                color: "var(--color-accent)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "var(--space-3)",
              }}
            >
              Awards
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: "var(--color-text-on-dark)",
                letterSpacing: "-0.03em",
                marginBottom: "var(--space-10)",
              }}
            >
              수상 경력
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            {[
              { year: "2025.11", title: "Apple Showcase Spotlight Team 선정", org: "Apple Developer Academy @ POSTECH" },
              { year: "2025.08", title: "트랙 우승 & 최종 우승", org: "Junction Asia 2025 국제 Hackathon" },
              { year: "2024.11", title: "우수상", org: "창의융합 인재나눔 축제 · ICT 솔루션(코딩) · 한국ICT윤리학회" },
              { year: "2024.08", title: "인기상", org: "KNU-KMU 연합 해커톤 · STARTMATCH" },
              { year: "2024.06", title: "장려상", org: "계명대 캡스톤디자인 · CollaB" },
              { year: "2023.11", title: "장려상", org: "제4차 산업혁명 인재나눔 축제 · ICT 솔루션(코딩) · 한국ICT윤리학회" },
              { year: "2023.03", title: "성적우수 장학상", org: "부운장학회 (전국 100인 선발)" },
              { year: "2022.07", title: "금상 (1위)", org: "AI 혁신공유대학 경진대회 · PyModi IoT" },
            ].map((award, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div
                  className="flex flex-col sm:flex-row sm:items-center"
                  style={{ gap: "var(--space-3)" }}
                >
                  <span
                    style={{
                      fontSize: "var(--font-footnote)",
                      color: "var(--color-text-secondary-on-dark)",
                      fontVariantNumeric: "tabular-nums",
                      flexShrink: 0,
                      minWidth: "72px",
                    }}
                  >
                    {award.year}
                  </span>
                  <div className="flex flex-wrap items-center" style={{ gap: "var(--space-2)" }}>
                    <span
                      style={{
                        background: "var(--color-accent)",
                        color: "white",
                        fontSize: "var(--font-footnote)",
                        fontWeight: 600,
                        padding: "3px 12px",
                        borderRadius: "980px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {award.title}
                    </span>
                    <span
                      style={{
                        fontSize: "var(--font-subhead)",
                        color: "var(--color-text-secondary-on-dark)",
                      }}
                    >
                      {award.org}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 연사 및 강연 */}
          <Reveal>
            <div style={{ marginTop: "var(--space-20)" }}>
              <p
                style={{
                  fontSize: "var(--font-subhead)",
                  color: "var(--color-accent)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: "var(--space-3)",
                }}
              >
                Speaking
              </p>
              <h3
                className="font-bold"
                style={{
                  fontSize: "var(--font-title-1)",
                  color: "var(--color-text-on-dark)",
                  letterSpacing: "-0.02em",
                  marginBottom: "var(--space-8)",
                }}
              >
                연사 및 강연
              </h3>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            {[
              {
                year: "2025.11",
                title: "LetSwift 2025 세션 스피커",
                desc: "한국 iOS 대형 컨퍼런스 — \"Home, Home, SweetHome\"",
              },
              {
                year: "2025.11",
                title: "멋쟁이사자처럼 본사 강연",
                desc: "13기 대학생 대상 — \"AI가 코드를 쓰는 시대에 우리는 어떻게 성장할까\"",
              },
              {
                year: "2025.11",
                title: "POSTECH 체인지업그라운드 연사",
                desc: "예비 창업가 및 POSTECH 학생 대상 — 국제 Hackathon 경험 공유",
              },
            ].map((talk, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  style={{
                    borderLeft: "2px solid var(--color-accent)",
                    paddingLeft: "var(--space-5)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--font-caption)",
                      color: "var(--color-text-secondary-on-dark)",
                    }}
                  >
                    {talk.year}
                  </span>
                  <p
                    className="font-semibold"
                    style={{
                      fontSize: "var(--font-headline)",
                      color: "var(--color-text-on-dark)",
                      marginTop: "var(--space-1)",
                    }}
                  >
                    {talk.title}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-subhead)",
                      color: "var(--color-text-secondary-on-dark)",
                      marginTop: "var(--space-1)",
                    }}
                  >
                    {talk.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 교육 & 봉사 */}
          <div
            className="grid md:grid-cols-2"
            style={{ marginTop: "var(--space-20)", gap: "var(--space-12)" }}
          >
            <Reveal>
              <p
                style={{
                  fontSize: "var(--font-subhead)",
                  color: "var(--color-accent)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: "var(--space-4)",
                }}
              >
                Education
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {[
                  { period: "2025.03 – 2025.12", name: "Apple Developer Academy @ POSTECH" },
                  { period: "2023.01 – 2023.12", name: "멋쟁이사자처럼 대학 11기" },
                  { period: "2023.01 – 2023.02", name: "컴퓨터 알고리즘 국비 수강" },
                ].map((edu, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontSize: "var(--font-caption)",
                        color: "var(--color-text-secondary-on-dark)",
                      }}
                    >
                      {edu.period}
                    </p>
                    <p
                      className="font-medium"
                      style={{
                        fontSize: "var(--font-body)",
                        color: "var(--color-text-on-dark)",
                        marginTop: "2px",
                      }}
                    >
                      {edu.name}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p
                style={{
                  fontSize: "var(--font-subhead)",
                  color: "var(--color-accent)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: "var(--space-4)",
                }}
              >
                Volunteer
              </p>
              <div>
                <p
                  style={{
                    fontSize: "var(--font-caption)",
                    color: "var(--color-text-secondary-on-dark)",
                  }}
                >
                  코드클럽한국위원회
                </p>
                <p
                  className="font-medium"
                  style={{
                    fontSize: "var(--font-body)",
                    color: "var(--color-text-on-dark)",
                    marginTop: "2px",
                  }}
                >
                  멘토링 봉사 (8시간)
                </p>
              </div>
            </Reveal>
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
              href="mailto:ykm7003@gmail.com"
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
