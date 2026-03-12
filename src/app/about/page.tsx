"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ─── Timeline Data ─── */

const timeline = [
  {
    year: "2018",
    title: "배우",
    description: "카메라 앞에서 감정을 전달하던 시절",
  },
  {
    year: "2020",
    title: "전환",
    description: "코드라는 새로운 언어를 만나다",
  },
  {
    year: "2022",
    title: "연사",
    description: "무대 위에서 기술을 이야기하다",
  },
  {
    year: "2023",
    title: "Apple",
    description: "Apple로부터 직접 피드백을 받다",
  },
  {
    year: "2024",
    title: "해커톤",
    description: "48시간, 팀과 함께 문제를 풀다",
  },
  {
    year: "Now",
    title: "개발자",
    description: "매일 성장하는 iOS 개발자",
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

/* ─── Scroll Reveal (wider trigger) ─── */

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
    offset: ["start 95%", "start 60%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y, ...style }}>
      {children}
    </motion.div>
  );
}

/* ─── Radar Chart ─── */

function RadarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  // Grid polygons
  const gridPolygons = Array.from({ length: levels }, (_, level) => {
    const r = (maxR / levels) * (level + 1);
    const points = Array.from({ length: count }, (_, i) => {
      const p = getPoint(i, r);
      return `${p.x},${p.y}`;
    }).join(" ");
    return points;
  });

  // Data polygon
  const dataPoints = skillCategories.map((s, i) => {
    const p = getPoint(i, maxR * s.value);
    return `${p.x},${p.y}`;
  }).join(" ");

  // Axis lines
  const axes = Array.from({ length: count }, (_, i) => {
    const p = getPoint(i, maxR);
    return { x1: cx, y1: cy, x2: p.x, y2: p.y };
  });

  // Labels
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
        padding: "var(--space-8) 0",
      }}
    >
      <svg viewBox="0 0 400 400" width="360" height="360">
        {/* Grid */}
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

        {/* Axes */}
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

        {/* Data area */}
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

        {/* Data points */}
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

        {/* Labels */}
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

/* ─── Horizontal Scroll Timeline ─── */

function HorizontalTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${timeline.length * 35}vh`, position: "relative" }}
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
            gap: "var(--space-6)",
            paddingLeft: "var(--content-padding)",
            paddingRight: "40vw",
          }}
        >
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              style={{
                minWidth: "280px",
                maxWidth: "320px",
                background: "var(--color-bg-secondary)",
                borderRadius: "var(--radius-xl)",
                padding: "var(--space-8)",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "360px",
              }}
              className="cloud-shadow"
            >
              <div
                style={{
                  width: "100%",
                  height: "160px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--font-footnote)",
                  color: "var(--color-text-tertiary)",
                  border: "1px dashed var(--color-text-tertiary)",
                }}
              >
                사진 추가
              </div>

              <div style={{ marginTop: "var(--space-6)" }}>
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
                  className="font-semibold"
                  style={{
                    fontSize: "var(--font-title-3)",
                    marginTop: "var(--space-1)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    marginTop: "var(--space-1)",
                    fontSize: "var(--font-subhead)",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
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
      {/* ── Intro ── */}
      <section
        style={{
          height: "100vh",
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
              fontSize: "var(--font-footnote)",
              color: "var(--color-text-tertiary)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "var(--space-5)",
            }}
          >
            About
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
            안녕하세요,
            <br />
            <span style={{ color: "var(--color-accent)" }}>유경모</span>
            입니다.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              marginTop: "var(--space-6)",
              fontSize: "var(--font-body)",
              color: "var(--color-text-secondary)",
              maxWidth: "420px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}
          >
            과거엔 배우, 현재엔 개발자.
            <br />
            무대가 바뀌었을 뿐,
            <br />
            사람의 마음을 움직이는 일을 합니다.
          </motion.p>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section>
        <div
          className="section-container"
          style={{ padding: "var(--space-8) var(--content-padding) var(--space-4)" }}
        >
          <Reveal>
            <p
              style={{
                fontSize: "var(--font-footnote)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "var(--space-2)",
              }}
            >
              Timeline
            </p>
            <h2
              className="font-bold"
              style={{ fontSize: "var(--font-title-1)", letterSpacing: "-0.02em" }}
            >
              지나온 길
            </h2>
          </Reveal>
        </div>
        <HorizontalTimeline />
      </section>

      {/* ── Philosophy (Dark) ── */}
      <section
        style={{
          background: "var(--color-bg-dark)",
          padding: "var(--space-16) 0",
        }}
      >
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)", maxWidth: "640px" }}
        >
          <Reveal>
            <p
              style={{
                fontSize: "var(--font-footnote)",
                color: "var(--color-text-secondary-on-dark)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "var(--space-6)",
              }}
            >
              Philosophy
            </p>
          </Reveal>

          <Reveal>
            <h3
              className="font-semibold"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                color: "var(--color-text-on-dark)",
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
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
            ].map((item) => (
              <Reveal key={item.keyword}>
                <div
                  style={{
                    borderLeft: "2px solid var(--color-accent)",
                    paddingLeft: "var(--space-5)",
                  }}
                >
                  <p
                    className="font-semibold"
                    style={{
                      fontSize: "var(--font-headline)",
                      color: "var(--color-text-on-dark)",
                    }}
                  >
                    {item.keyword}
                  </p>
                  <p
                    style={{
                      marginTop: "var(--space-1)",
                      fontSize: "var(--font-subhead)",
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

      {/* ── Skills Radar ── */}
      <section
        style={{ padding: "var(--space-16) 0" }}
      >
        <div
          className="section-container"
          style={{ padding: "0 var(--content-padding)", maxWidth: "640px" }}
        >
          <Reveal>
            <p
              style={{
                fontSize: "var(--font-footnote)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "var(--space-2)",
              }}
            >
              Skills
            </p>
            <h2
              className="font-bold"
              style={{ fontSize: "var(--font-title-1)", letterSpacing: "-0.02em" }}
            >
              강점
            </h2>
          </Reveal>

          <RadarChart />

          <Reveal>
            <p
              style={{
                textAlign: "center",
                fontSize: "var(--font-footnote)",
                color: "var(--color-text-tertiary)",
                marginTop: "var(--space-4)",
              }}
            >
              Swift, UIKit, SwiftUI, CoreData, SwiftData, Combine, RxSwift,
              GCD, async/await, Actor, MVC, MVVM, Clean Architecture, TCA,
              Xcode, Git, Tuist, Fastlane, C++, Python
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
              style={{ fontSize: "var(--font-title-1)", letterSpacing: "-0.02em" }}
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
