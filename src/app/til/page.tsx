"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CloudCard } from "@/components/ui/CloudCard";

const categories = [
  {
    slug: "algorithms",
    title: "Algorithms",
    description: "문제 풀이에서 배운 개념과 접근법",
    symbol: "function",
    count: 1,
  },
  {
    slug: "swift",
    title: "Swift",
    description: "ARC, Concurrency, Protocol, 언어 깊이 파기",
    symbol: "swift",
    count: 0,
  },
  {
    slug: "ios",
    title: "iOS",
    description: "UIKit, SwiftUI, 아키텍처, 라이프사이클",
    symbol: "iphone",
    count: 0,
  },
  {
    slug: "cs",
    title: "CS",
    description: "자료구조, 운영체제, 네트워크, 디자인 패턴",
    symbol: "cpu",
    count: 0,
  },
  {
    slug: "reactive",
    title: "Reactive",
    description: "Combine, RxSwift",
    symbol: "arrow.triangle.branch",
    count: 0,
  },
  {
    slug: "wwdc",
    title: "WWDC",
    description: "WWDC 세션 정리",
    symbol: "play.rectangle",
    count: 0,
  },
  {
    slug: "tools",
    title: "Tools",
    description: "Tuist, SPM, Fastlane, GitHub Actions",
    symbol: "wrench.and.screwdriver",
    count: 0,
  },
];

export default function TilPage() {
  return (
    <div
      className="section-container"
      style={{
        paddingTop: "calc(var(--nav-height) + var(--space-16))",
        paddingBottom: "var(--space-24)",
      }}
    >
      <SectionHeading
        title="Today I Learned"
        subtitle="매일 배운 것을 기록합니다"
      />

      <div
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        style={{ maxWidth: "820px", margin: "0 auto" }}
      >
        {categories.map((cat, i) => (
          <Link key={cat.slug} href={`/til/${cat.slug}`}>
            <CloudCard delay={i * 0.06}>
              <p
                style={{
                  fontSize: "var(--font-caption)",
                  color: "var(--color-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {cat.symbol}
              </p>
              <h3
                className="font-semibold"
                style={{
                  fontSize: "var(--font-headline)",
                  marginTop: "var(--space-3)",
                }}
              >
                {cat.title}
              </h3>
              <p
                style={{
                  marginTop: "var(--space-2)",
                  fontSize: "var(--font-footnote)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {cat.description}
              </p>
              <p
                style={{
                  marginTop: "var(--space-4)",
                  fontSize: "var(--font-caption)",
                  color: "var(--color-text-tertiary)",
                }}
              >
                {cat.count > 0 ? `${cat.count}개의 글` : "준비 중"}
              </p>
            </CloudCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
