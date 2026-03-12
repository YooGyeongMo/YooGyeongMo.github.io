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
      viewport={{ once: false, margin: "-40px" }}
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
    description: "경북경찰청·포항북부경찰서 협업. Apple Showcase Spotlight Team 선정.",
    overview:
      "경북경찰청, 포항북부경찰서와 협업하여 수사관들이 현장에서 사건을 관리하고 위치 데이터를 시각화하는 iOS 앱입니다. 경북경찰청 기동대 테스트베드 준비 중이며, 대중매체(안될공학 등)에 보도되었습니다. TCA에서 영감받은 커스텀 아키텍처와 Swift 6 Strict Concurrency를 적용했습니다.",
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
  synctank: {
    title: "SyncTank",
    tagline: "AI 컨텍스트 알림 — iOS + macOS 실시간 싱크",
    description: "Junction Asia 2025 Upstage Track 우승 & Final 우승. Asia 대표 세계대회 참전권 획득.",
    overview:
      "회의 중 논의된 맥락을 AI가 분석하여 관련 알림만 필터링해주는 크로스플랫폼 앱입니다. Junction Asia 2025 국제 해커톤에서 Upstage Track 우승과 Final 우승을 동시에 달성했으며, Asia 대표로 Junction 2025 세계대회 참전권을 획득했습니다. iOS와 macOS 간 실시간 동기화로 어떤 디바이스에서든 끊김 없는 경험을 제공합니다.",
    tags: ["SwiftUI", "MVVM", "Upstage LLM", "macOS", "WebSocket", "Swift Concurrency"],
    features: [
      {
        title: "AI 컨텍스트 필터링",
        desc: "Upstage LLM을 활용하여 회의 내용의 맥락을 분석하고, 사용자에게 관련된 알림만 선별적으로 전달합니다.",
      },
      {
        title: "iOS + macOS 실시간 싱크",
        desc: "WebSocket 기반의 실시간 통신으로 iPhone과 Mac 간 알림 상태를 즉시 동기화합니다.",
      },
      {
        title: "MVVM 아키텍처",
        desc: "SwiftUI의 선언적 UI와 MVVM 패턴으로 깔끔한 데이터 바인딩을 구현했습니다.",
      },
      {
        title: "Junction Asia 2025 우승",
        desc: "핀란드 헬싱키 Junction 2025 세계대회 본선 진출. 48시간 해커톤에서 실용성과 기술 완성도를 인정받았습니다.",
      },
    ],
  },
  naru: {
    title: "Naru",
    tagline: "몰입형 동화 앱 — iPad + iPhone + HomeKit IoT",
    description: "물리적 공간까지 이야기 속으로. App Store 배포 예정.",
    overview:
      "아이들이 동화를 읽을 때 iPad의 이야기가 현실 공간으로 확장되는 몰입형 경험 앱입니다. HomeKit IoT 기기와 연동하여 조명, 사운드가 이야기에 맞춰 변합니다. App Store 배포를 준비하고 있습니다.",
    tags: ["SwiftUI", "SwiftData", "MultipeerConnectivity", "HomeKit", "AVFoundation"],
    features: [
      {
        title: "HomeKit IoT 연동",
        desc: "HomeKit 프레임워크를 통해 스마트 조명, 스피커 등 IoT 기기를 동화 장면에 맞춰 제어합니다.",
      },
      {
        title: "MultipeerConnectivity",
        desc: "근처 iPhone, iPad 간 P2P 통신으로 여러 아이가 동시에 같은 동화를 경험할 수 있습니다.",
      },
      {
        title: "SwiftData 기반 콘텐츠 관리",
        desc: "동화 콘텐츠와 사용자 진행 상황을 SwiftData로 관리합니다. CloudKit 동기화로 디바이스 간 읽기 진행률이 자동 공유됩니다.",
      },
      {
        title: "인터랙티브 사운드스케이프",
        desc: "AVFoundation으로 장면별 배경음과 효과음을 실시간 믹싱합니다. 페이지 전환에 맞춰 자연스러운 크로스페이드를 구현했습니다.",
      },
    ],
  },
  gyeongjo: {
    title: "경조사실무팀",
    tagline: "한 명의 유저를 위한 직장 경조사 관리 앱",
    description: "한 명의 유저를 위해 만들었습니다.",
    overview:
      "실제 직장인 한 명의 경조사 관리 문제를 깊이 파고들어 만든 iOS 앱입니다. Apple Developer Academy C3 과정에서 SwiftUI와 SwiftData를 활용하여 개발했습니다.",
    tags: ["SwiftUI", "SwiftData", "MVVM"],
    features: [
      {
        title: "SwiftData 기반 데이터 관리",
        desc: "SwiftData로 경조사 일정, 참여 내역, 부조 기록을 로컬에서 관리합니다.",
      },
      {
        title: "MVVM 아키텍처",
        desc: "SwiftUI + MVVM 패턴으로 뷰와 비즈니스 로직을 분리하여 유지보수성을 확보했습니다.",
      },
      {
        title: "Apple Developer Academy",
        desc: "Apple Developer Academy @POSTECH Challenge 3 과정에서 팀 프로젝트로 기획부터 개발까지 진행했습니다.",
      },
    ],
  },
  heilocal: {
    title: "HeiLocal",
    tagline: "위치 기반 로컬 탐색 웹서비스",
    description: "Junction 2025 핀란드 세계대회 Submission.",
    overview:
      "여행자가 현지인처럼 로컬 명소를 탐색할 수 있는 위치 기반 웹 앱입니다. Junction Asia 2025 우승 후 핀란드 헬싱키 세계대회에 진출하여 Submission까지 완료했습니다.",
    tags: ["React", "TypeScript", "Google Maps API", "REST API"],
    features: [
      {
        title: "Google Maps API 연동",
        desc: "Google Maps API를 활용하여 로컬 명소를 지도 위에 시각화하고 탐색 경로를 제공합니다.",
      },
      {
        title: "위치 기반 추천",
        desc: "사용자 위치를 기반으로 주변 로컬 명소를 추천하고 거리순으로 정렬합니다.",
      },
      {
        title: "핀란드 세계대회",
        desc: "Junction 2025 Global Hackathon에서 세계 개발자들과 경쟁했습니다.",
      },
    ],
  },
  collab: {
    title: "CollaB",
    tagline: "IT 프로젝트 매칭 플랫폼",
    description: "팀 리드로 이끈 Android 프로젝트.",
    overview:
      "IT 분야 사이드 프로젝트 팀원을 매칭해주는 Android 앱입니다. 기획부터 배포까지 팀 리드로 프로젝트를 이끌며 Android 개발을 담당했습니다.",
    tags: ["Kotlin", "MVVM", "Retrofit2", "Firebase", "Room"],
    features: [
      {
        title: "프로젝트 매칭 시스템",
        desc: "기술 스택, 역할, 일정 기반으로 프로젝트와 팀원을 매칭합니다.",
      },
      {
        title: "Firebase 인증 & 실시간 채팅",
        desc: "Firebase Auth로 소셜 로그인을 구현하고, Firestore 기반 실시간 채팅을 제공합니다.",
      },
      {
        title: "MVVM + Retrofit2",
        desc: "MVVM 아키텍처와 Retrofit2로 클린한 네트워크 레이어를 구성했습니다.",
      },
    ],
  },
  startmatch: {
    title: "STARTMATCH",
    tagline: "스타트업 인재 채용 플랫폼",
    description: "스타트업과 인재를 연결합니다.",
    overview:
      "스타트업이 필요한 인재를 찾고, 구직자가 스타트업을 탐색할 수 있는 채용 매칭 플랫폼입니다. Android 프론트엔드를 담당했습니다.",
    tags: ["Kotlin", "Spring Boot", "MVVM", "REST API"],
    features: [
      {
        title: "매칭 알고리즘",
        desc: "스타트업의 요구사항과 구직자의 역량을 분석하여 최적의 매칭을 제공합니다.",
      },
      {
        title: "Spring Boot 백엔드 연동",
        desc: "Spring Boot REST API와 연동하여 채용 공고 조회, 지원, 관리 기능을 구현했습니다.",
      },
    ],
  },
  "safety-paris": {
    title: "Safety Paris",
    tagline: "파리 올림픽 범죄 예방 웹서비스",
    description: "안전한 올림픽을 위한 데이터 시각화.",
    overview:
      "2024 파리 올림픽 기간 중 범죄 발생 데이터를 지도 위에 시각화하여 여행자에게 안전 정보를 제공하는 웹서비스입니다. 4인 팀 프로젝트로 개발했습니다.",
    tags: ["React", "Firebase", "Google Maps API", "Chart.js"],
    features: [
      {
        title: "범죄 데이터 시각화",
        desc: "Google Maps API 위에 범죄 발생 지점을 히트맵으로 시각화하여 위험 지역을 직관적으로 파악할 수 있습니다.",
      },
      {
        title: "Firebase 실시간 데이터",
        desc: "Firebase Realtime Database로 범죄 신고 데이터를 실시간으로 수집하고 반영합니다.",
      },
    ],
  },
  "village-of-iot": {
    title: "Village of IoT",
    tagline: "IoT 스마트 빌리지",
    description: "첫 프로젝트, 개발의 시작.",
    overview:
      "Python과 Pymodi를 활용하여 IoT 센서 기반 스마트 빌리지를 구현한 첫 프로젝트입니다. 센서 데이터를 수집하고 자동화된 환경 제어를 구현했습니다.",
    tags: ["Python", "Pymodi", "IoT", "Raspberry Pi"],
    features: [
      {
        title: "IoT 센서 연동",
        desc: "온도, 습도, 조도 센서를 Pymodi로 연결하여 실시간 환경 데이터를 수집합니다.",
      },
      {
        title: "자동화 제어",
        desc: "수집된 센서 데이터를 기반으로 조명, 환기 등 환경을 자동으로 제어합니다.",
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
