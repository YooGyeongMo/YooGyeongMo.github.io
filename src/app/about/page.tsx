"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* ─── Life Journey Data ─── */

const journey = [
  {
    year: "2018",
    title: "배우",
    desc: "카메라 앞에서 감정을 전달하던 시절.\n대사 한 줄, 표정 하나에 진심을 담았습니다.",
    projects: [],
  },
  {
    year: "2020",
    title: "전환",
    desc: "코드라는 새로운 언어를 만났습니다.\n화면 너머의 세계가 열렸습니다.",
    projects: [],
  },
  {
    year: "2022",
    title: "첫 프로젝트",
    desc: "Python으로 IoT 스마트 빌리지를 만들며\n개발의 재미를 알았습니다.",
    projects: ["Village of IoT"],
  },
  {
    year: "2023",
    title: "Android",
    desc: "Kotlin으로 STARTMATCH, CollaB를 만들며\n팀 리드로 프로젝트를 이끌었습니다.",
    projects: ["STARTMATCH", "CollaB"],
  },
  {
    year: "2024",
    title: "확장",
    desc: "React로 Safety Paris를 만들고,\nApple Developer Academy에 합류했습니다.",
    projects: ["Safety Paris", "Apple Developer Academy"],
  },
  {
    year: "2025",
    title: "iOS 개발자",
    desc: "SUSA24, Naru, SyncTank을 만들며\nJunction Asia 우승, 핀란드 세계대회까지.",
    projects: ["SUSA24", "Naru", "SyncTank", "HeiLocal"],
  },
];

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

/* ─── Skills Grid ─── */

/* ─── Vertical Timeline ─── */

function VerticalTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        padding: "0 var(--content-padding)",
        maxWidth: "720px",
        margin: "0 auto",
      }}
    >
      {/* Background track */}
      <div
        style={{
          position: "absolute",
          left: "var(--content-padding)",
          top: 0,
          bottom: 0,
          width: "2px",
          background: "var(--color-separator)",
        }}
      />
      {/* Drawing line */}
      <motion.div
        style={{
          position: "absolute",
          left: "var(--content-padding)",
          top: 0,
          width: "2px",
          height: lineHeight,
          background: "var(--color-accent)",
          zIndex: 1,
        }}
      />

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-10)" }}>
        {journey.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "var(--space-6)",
              position: "relative",
            }}
          >
            {/* Dot + Year */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
                minWidth: "48px",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease }}
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "var(--color-accent)",
                  border: "3px solid var(--color-bg)",
                  zIndex: 2,
                  marginLeft: "-7px",
                  position: "relative",
                  left: "1px",
                }}
              />
              <span
                style={{
                  fontSize: "var(--font-caption)",
                  color: "var(--color-accent)",
                  fontWeight: 600,
                  marginTop: "var(--space-2)",
                  whiteSpace: "nowrap",
                }}
              >
                {item.year}
              </span>
            </div>

            {/* Card */}
            <div
              className="cloud-shadow"
              style={{
                flex: 1,
                background: "var(--color-bg)",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
              }}
            >
              {/* Photo area */}
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  background: "var(--color-bg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--font-footnote)",
                  color: "var(--color-text-tertiary)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "40px",
                    background: "linear-gradient(transparent, var(--color-bg))",
                    zIndex: 1,
                  }}
                />
                <span style={{ opacity: 0.4 }}>사진 추가</span>
              </div>

              <div style={{ padding: "var(--space-4) var(--space-5) var(--space-5)" }}>
                <h3
                  className="font-bold"
                  style={{
                    fontSize: "var(--font-title-3)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    marginTop: "var(--space-2)",
                    fontSize: "var(--font-subhead)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.7,
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.desc}
                </p>

                {item.projects.length > 0 && (
                  <div
                    className="flex flex-wrap"
                    style={{ marginTop: "var(--space-3)", gap: "var(--space-2)" }}
                  >
                    {item.projects.map((p) => (
                      <span
                        key={p}
                        style={{
                          fontSize: "var(--font-caption)",
                          color: "var(--color-accent)",
                          background: "var(--color-accent-subtle)",
                          padding: "2px var(--space-3)",
                          borderRadius: "var(--radius-sm)",
                          fontWeight: 500,
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ─── */

export default function AboutPage() {
  const introRef = useRef<HTMLElement>(null);
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end start"],
  });
  const scrollIndicatorOpacity = useTransform(introProgress, [0, 0.5], [1, 0]);

  return (
    <div>
      {/* ── Intro ── */}
      <section
        ref={introRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start",
          padding: "0 var(--content-padding)",
          paddingTop: "calc(var(--nav-height) + 8vh)",
          position: "relative",
        }}
      >
        <div className="section-container" style={{ padding: "0", maxWidth: "820px" }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "var(--font-subhead)",
              color: "var(--color-text-tertiary)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "var(--space-5)",
            }}
          >
            About
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-bold"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
            }}
          >
            배우의 감각으로
            <br />
            코드를 씁니다.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              marginTop: "var(--space-8)",
              fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "560px",
            }}
          >
            카메라 앞에서 사용자 앞으로.
            <br />
            대사를 외우던 습관은 코드를 읽는 습관이 되었고,
            <br />
            감정을 전달하던 감각은 경험을 설계하는 감각이 되었습니다.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-semibold"
            style={{
              marginTop: "var(--space-6)",
              fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
              color: "var(--color-text-tertiary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              maxWidth: "560px",
            }}
          >
            iOS 개발자{" "}
            <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>유경모</span>
            <span style={{ color: "var(--color-text-secondary)" }}>입니다.</span>
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ position: "absolute", bottom: "var(--space-20)", left: "50%", transform: "translateX(-50%)", opacity: scrollIndicatorOpacity }}
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
      </section>

      {/* ── Life Journey (Vertical Timeline) ── */}
      <section style={{ padding: "var(--space-16) 0" }}>
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            padding: "0 var(--content-padding)",
            marginBottom: "var(--space-10)",
          }}
        >
          <Reveal>
            <p
              style={{
                fontSize: "var(--font-subhead)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: "var(--space-2)",
              }}
            >
              Life Journey
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                letterSpacing: "-0.03em",
              }}
            >
              걸어온 길
            </h2>
          </Reveal>
        </div>
        <VerticalTimeline />
      </section>

      {/* ── Philosophy (Dark) ── */}
      <section
        style={{
          background: "var(--color-bg-dark)",
          padding: "var(--space-24) 0",
        }}
      >
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)", maxWidth: "720px" }}
        >
          <Reveal>
            <p
              style={{
                fontSize: "var(--font-subhead)",
                color: "var(--color-text-secondary-on-dark)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: "var(--space-6)",
              }}
            >
              Philosophy
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3
              className="font-bold"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: "var(--color-text-on-dark)",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              AI가 코드를 쓰는 시대,
              <br />
              <span style={{ color: "var(--color-accent)" }}>진짜 의사결정</span>은
              <br />
              개발자의 몫입니다.
            </h3>
          </Reveal>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-8)",
              marginTop: "var(--space-12)",
            }}
          >
            {[
              { keyword: "문제 정의", text: "코드를 쓰기 전에, 무엇을 풀어야 하는지 먼저 묻습니다." },
              { keyword: "현장의 목소리", text: "실제 사용자를 만나고, 그들의 이야기에서 답을 찾습니다." },
              { keyword: "기본기", text: "도구는 바뀌어도 본질은 바뀌지 않습니다. 기본기가 답입니다." },
            ].map((item, i) => (
              <Reveal key={item.keyword} delay={0.15 + i * 0.08}>
                <div
                  style={{
                    borderLeft: "2px solid var(--color-accent)",
                    paddingLeft: "var(--space-6)",
                  }}
                >
                  <p
                    className="font-semibold"
                    style={{
                      fontSize: "var(--font-title-3)",
                      color: "var(--color-text-on-dark)",
                    }}
                  >
                    {item.keyword}
                  </p>
                  <p
                    style={{
                      marginTop: "var(--space-2)",
                      fontSize: "var(--font-body)",
                      color: "var(--color-text-secondary-on-dark)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
