"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const revealTransition = { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const };

/* ─── Reveal (whileInView) ─── */

function Reveal({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={revealTransition}
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

const projectData: Record<
  string,
  {
    title: string;
    tagline: string;
    description: string;
    tags: string[];
    features: { title: string; desc: string }[];
    overview: string;
  }
> = {
  susa24: {
    title: "SUSA24",
    tagline: "범죄수사 사건 관리 및 위치 데이터 시각화",
    description: "현장에서 실제로 쓰이는 앱을 만들었습니다.",
    overview:
      "수사관들이 현장에서 사건을 관리하고, 용의자의 위치 데이터를 지도 위에 시각화할 수 있는 iOS 앱입니다. TCA에서 영감받은 커스텀 아키텍처와 Swift 6 Strict Concurrency를 적용했습니다.",
    tags: [
      "SwiftUI",
      "UIKit",
      "CoreData",
      "MapKit",
      "Swift 6",
      "Metal",
      "AVFoundation",
    ],
    features: [
      {
        title: "커스텀 상태관리 — DWStore",
        desc: "TCA에서 영감받은 단방향 데이터 플로우 아키텍처. State, Action, Reducer, Effect로 구성된 예측 가능한 상태 관리 시스템을 직접 설계했습니다.",
      },
      {
        title: "실시간 지도 시각화",
        desc: "NMapsMap + CoreData 기반으로 수백 개의 위치 데이터를 실시간 렌더링. 위치 타입별 필터링과 커스텀 핀 컴포넌트로 직관적인 데이터 탐색이 가능합니다.",
      },
      {
        title: "Swift 6 Strict Concurrency",
        desc: "Swift 6의 Strict Concurrency Checking을 전면 적용. @MainActor, Sendable, structured concurrency로 데이터 레이스를 컴파일 타임에 방지합니다.",
      },
      {
        title: "Liquid Glass Effect",
        desc: "Metal shader를 활용한 커스텀 글래스모피즘 이펙트. SwiftUI Canvas와 결합하여 동적인 시각 효과를 구현했습니다.",
      },
      {
        title: "카메라 & 증거 촬영",
        desc: "AVFoundation 기반 커스텀 카메라. 현장 증거 사진을 촬영하고 사건에 첨부할 수 있습니다. 파일 시스템 기반 이미지 저장으로 CoreData 비대화를 방지했습니다.",
      },
      {
        title: "좌표 기반 네비게이션",
        desc: "AppCoordinator 패턴으로 중앙 집중식 화면 전환 관리. NavigationPath 기반 push/pop/popToRoot을 지원합니다.",
      },
    ],
  },
};

/* ─── Component ─── */

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const project = projectData[slug] || projectData.susa24;

  return (
    <div>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "var(--color-bg-dark)",
          textAlign: "center",
          padding: "0 var(--content-padding)",
          paddingTop: "calc(var(--nav-height) + 10vh)",
        }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "var(--space-8)" }}
          >
            <Link
              href="/portfolio"
              style={{
                fontSize: "var(--font-subhead)",
                color: "var(--color-accent)",
                textDecoration: "none",
              }}
            >
              &larr; Portfolio
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-bold"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              color: "var(--color-text-on-dark)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
            }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              marginTop: "var(--space-6)",
              fontSize: "var(--font-title-3)",
              color: "var(--color-text-secondary-on-dark)",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.5,
            }}
          >
            {project.tagline}.
            <br />
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* ── Overview + Device ── */}
      <section style={{ padding: "var(--space-24) 0" }}>
        <div
          className="section-container flex flex-col items-center md:flex-row md:items-center"
          style={{
            padding: "0 var(--content-padding)",
            gap: "var(--space-16)",
          }}
        >
          <Reveal style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "var(--font-footnote)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "var(--space-4)",
              }}
            >
              Overview
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.25,
              }}
            >
              수사 현장의 데이터를
              <br />
              지도 위에 펼치다.
            </h2>
            <p
              style={{
                marginTop: "var(--space-6)",
                fontSize: "var(--font-body)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                maxWidth: "460px",
              }}
            >
              {project.overview}
            </p>
          </Reveal>

          <Reveal
            style={{
              display: "flex",
              justifyContent: "center",
              flexShrink: 0,
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
                <p
                  style={{ fontSize: "2rem", marginBottom: "var(--space-2)" }}
                >
                  ◈
                </p>
                앱 스크린샷 추가
              </div>
            </DeviceMockup>
          </Reveal>
        </div>
      </section>

      {/* ── Features (Alternating sections) ── */}
      {project.features.map((feature, i) => (
        <section
          key={feature.title}
          style={{
            background:
              i % 2 === 0 ? "var(--color-bg-secondary)" : "var(--color-bg)",
            padding: "var(--space-20) 0",
          }}
        >
          <div
            className="section-container"
            style={{
              padding: "0 var(--content-padding)",
              maxWidth: "720px",
            }}
          >
            <Reveal>
              <p
                style={{
                  fontSize: "var(--font-caption)",
                  color: "var(--color-accent)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  marginBottom: "var(--space-3)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className="font-bold"
                style={{
                  fontSize: "var(--font-title-2)",
                  letterSpacing: "-0.02em",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  marginTop: "var(--space-4)",
                  fontSize: "var(--font-body)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {feature.desc}
              </p>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ── Tech Stack ── */}
      <section
        style={{
          background: "var(--color-bg-dark)",
          padding: "var(--space-20) 0",
          textAlign: "center",
        }}
      >
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)" }}
        >
          <Reveal>
            <h3
              className="font-bold"
              style={{
                fontSize: "var(--font-title-2)",
                color: "var(--color-text-on-dark)",
                letterSpacing: "-0.02em",
                marginBottom: "var(--space-8)",
              }}
            >
              Tech Stack
            </h3>
          </Reveal>
          <Reveal>
            <div
              className="flex flex-wrap justify-center"
              style={{ gap: "var(--space-3)" }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid var(--color-separator-on-dark)",
                    borderRadius: "980px",
                    padding: "var(--space-2) var(--space-5)",
                    fontSize: "var(--font-subhead)",
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

      {/* ── Back ── */}
      <section style={{ padding: "var(--space-16) 0", textAlign: "center" }}>
        <Link
          href="/portfolio"
          style={{
            fontSize: "var(--font-body)",
            color: "var(--color-accent)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          &larr; 다른 프로젝트 보기
        </Link>
      </section>
    </div>
  );
}
