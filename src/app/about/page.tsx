"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const revealTransition = { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const };

/* ─── Life Journey Data ─── */

const journey = [
  {
    year: "2018",
    title: "배우",
    description: "카메라 앞에서 감정을 전달하던 시절. 대사 한 줄, 표정 하나에 진심을 담았습니다.",
  },
  {
    year: "2020",
    title: "전환",
    description: "코드라는 새로운 언어를 만났습니다. 화면 너머의 세계가 열렸습니다.",
  },
  {
    year: "2022",
    title: "연사",
    description: "무대 위에서 기술을 이야기했습니다. 사람들 앞에 서는 건 여전히 익숙합니다.",
  },
  {
    year: "2023",
    title: "Apple",
    description: "Apple로부터 직접 피드백을 받았습니다. 더 깊이 파고들 이유가 생겼습니다.",
  },
  {
    year: "2024",
    title: "해커톤",
    description: "48시간, 팀과 함께 문제를 풀었습니다. 한계는 늘 팀에서 넓어졌습니다.",
  },
  {
    year: "Now",
    title: "개발자",
    description: "매일 성장하는 iOS 개발자. 어제보다 나은 코드를 씁니다.",
  },
];

/* ─── Skills Radar Data ─── */

const skillCategories = [
  { label: "Swift", value: 0.9 },
  { label: "iOS\nFramework", value: 0.85 },
  { label: "Architecture", value: 0.75 },
  { label: "Concurrency", value: 0.7 },
  { label: "Reactive", value: 0.65 },
  { label: "Tools", value: 0.7 },
];

/* ─── Reveal (whileInView — always reaches full opacity) ─── */

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

/* ─── Radar Chart ─── */

function RadarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const cx = 200;
  const cy = 200;
  const levels = 4;
  const maxR = 150;
  const count = skillCategories.length;

  function getPoint(index: number, radius: number) {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  }

  const gridPolygons = Array.from({ length: levels }, (_, level) => {
    const r = (maxR / levels) * (level + 1);
    return Array.from({ length: count }, (_, i) => {
      const p = getPoint(i, r);
      return `${p.x},${p.y}`;
    }).join(" ");
  });

  const dataPoints = skillCategories
    .map((s, i) => {
      const p = getPoint(i, maxR * s.value);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  const axes = Array.from({ length: count }, (_, i) => {
    const p = getPoint(i, maxR);
    return { x1: cx, y1: cy, x2: p.x, y2: p.y };
  });

  const labels = skillCategories.map((s, i) => {
    const p = getPoint(i, maxR + 30);
    return { ...s, x: p.x, y: p.y };
  });

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "var(--space-6) 0",
      }}
    >
      <svg viewBox="0 0 400 400" width="360" height="360">
        {gridPolygons.map((points, i) => (
          <motion.polygon
            key={i}
            points={points}
            fill="none"
            stroke="var(--color-separator)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}
        {axes.map((axis, i) => (
          <motion.line
            key={i}
            x1={axis.x1}
            y1={axis.y1}
            x2={axis.x2}
            y2={axis.y2}
            stroke="var(--color-separator)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
          />
        ))}
        <motion.polygon
          points={dataPoints}
          fill="var(--color-accent)"
          fillOpacity="0.15"
          stroke="var(--color-accent)"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        {skillCategories.map((s, i) => {
          const p = getPoint(i, maxR * s.value);
          return (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="5"
              fill="var(--color-accent)"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
            />
          );
        })}
        {labels.map((label, i) => (
          <motion.text
            key={i}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--color-text-secondary)"
            fontSize="11"
            fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
          >
            {label.label.split("\n").map((line, j) => (
              <tspan key={j} x={label.x} dy={j === 0 ? 0 : 14}>
                {line}
              </tspan>
            ))}
          </motion.text>
        ))}
      </svg>
    </div>
  );
}

/* ─── Life Journey (Album-style horizontal scroll) ─── */

function LifeJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${journey.length * 40}vh`, position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            x,
            display: "flex",
            gap: "var(--space-8)",
            paddingLeft: "8vw",
            paddingRight: "40vw",
          }}
        >
          {journey.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                minWidth: "340px",
                maxWidth: "380px",
                background: "var(--color-bg)",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
              }}
              className="cloud-shadow"
            >
              {/* Photo area — album style */}
              <div
                style={{
                  width: "100%",
                  height: "240px",
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
                {/* Gradient overlay for album feel */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60px",
                    background:
                      "linear-gradient(transparent, var(--color-bg))",
                    zIndex: 1,
                  }}
                />
                <span style={{ opacity: 0.5 }}>사진 추가</span>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "var(--space-5) var(--space-6) var(--space-6)",
                }}
              >
                <p
                  style={{
                    fontSize: "var(--font-caption)",
                    color: "var(--color-accent)",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  {item.year}
                </p>
                <h3
                  className="font-bold"
                  style={{
                    fontSize: "var(--font-title-2)",
                    marginTop: "var(--space-1)",
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
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Page ─── */

export default function AboutPage() {
  return (
    <div>
      {/* ── Intro (rauno.me — big, bold, left-aligned) ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "0 var(--content-padding)",
        }}
      >
        <div
          className="section-container"
          style={{ padding: "0", maxWidth: "780px" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "var(--font-subhead)",
              color: "var(--color-text-tertiary)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "var(--space-6)",
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
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
            }}
          >
            <span style={{ color: "var(--color-accent)" }}>유경모</span>는
            <br />
            iOS 개발자입니다.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              marginTop: "var(--space-8)",
              fontSize: "var(--font-title-3)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "560px",
            }}
          >
            과거엔 배우로 카메라 앞에 섰고, 지금은 개발자로 사용자 앞에 섭니다.
            무대가 바뀌었을 뿐, 사람의 마음을 움직이는 일을 합니다.
          </motion.p>
        </div>
      </section>

      {/* ── Life Journey (Album-style) ── */}
      <section>
        <div
          className="section-container"
          style={{
            padding: "0 var(--content-padding) var(--space-2)",
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
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
              }}
            >
              지나온 길
            </h2>
          </Reveal>
        </div>
        <LifeJourney />
      </section>

      {/* ── Philosophy (Dark) ── */}
      <section
        style={{
          background: "var(--color-bg-dark)",
          padding: "var(--space-20) 0",
        }}
      >
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)", maxWidth: "680px" }}
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
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                color: "var(--color-text-on-dark)",
                letterSpacing: "-0.03em",
                lineHeight: 1.25,
              }}
            >
              AI가 코드를 쓰는 시대,
              <br />
              <span style={{ color: "var(--color-accent)" }}>진짜 의사결정</span>
              은
              <br />
              개발자의 몫입니다.
            </h3>
          </Reveal>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-6)",
              marginTop: "var(--space-10)",
            }}
          >
            {[
              {
                keyword: "문제 정의",
                text: "코드를 쓰기 전에, 무엇을 풀어야 하는지 먼저 묻습니다.",
              },
              {
                keyword: "현장의 목소리",
                text: "실제 사용자를 만나고, 그들의 이야기에서 답을 찾습니다.",
              },
              {
                keyword: "기본기",
                text: "도구는 바뀌어도 본질은 바뀌지 않습니다. 기본기가 답입니다.",
              },
            ].map((item, i) => (
              <Reveal key={item.keyword} delay={0.15 + i * 0.08}>
                <div
                  style={{
                    borderLeft: "2px solid var(--color-accent)",
                    paddingLeft: "var(--space-5)",
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
                      lineHeight: 1.6,
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

      {/* ── Skills ── */}
      <section style={{ padding: "var(--space-16) 0" }}>
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)", maxWidth: "640px" }}
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
              Skills
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Skills
            </h2>
          </Reveal>

          <RadarChart />

          <Reveal>
            <p
              style={{
                textAlign: "center",
                fontSize: "var(--font-footnote)",
                color: "var(--color-text-tertiary)",
                marginTop: "var(--space-2)",
              }}
            >
              Swift, UIKit, SwiftUI, CoreData, SwiftData, Combine, RxSwift, GCD,
              async/await, Actor, MVC, MVVM, Clean Architecture, TCA, Xcode, Git,
              Tuist, Fastlane, C++, Python
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        style={{
          background: "var(--color-bg-secondary)",
          padding: "var(--space-16) 0",
        }}
      >
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)", textAlign: "center" }}
        >
          <Reveal>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                letterSpacing: "-0.03em",
              }}
            >
              함께 이야기해요.
            </h2>
            <div
              style={{
                marginTop: "var(--space-6)",
                display: "flex",
                justifyContent: "center",
                gap: "var(--space-4)",
              }}
            >
              <a
                href="https://github.com/YooGyeongMo"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-all hover:scale-105"
                style={{
                  background: "var(--color-accent)",
                  color: "white",
                  borderRadius: "980px",
                  padding: "var(--space-3) var(--space-8)",
                  fontSize: "var(--font-subhead)",
                }}
              >
                GitHub
              </a>
              <a
                href="mailto:contact@example.com"
                className="font-medium transition-all hover:scale-105 cloud-shadow"
                style={{
                  background: "var(--color-bg)",
                  borderRadius: "980px",
                  padding: "var(--space-3) var(--space-8)",
                  fontSize: "var(--font-subhead)",
                }}
              >
                Email
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
