"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CloudCard } from "@/components/ui/CloudCard";

const categories = [
  {
    slug: "algorithms",
    title: "Algorithms",
    description: "문제 풀이에서 배운 개념과 접근법",
    count: 1,
  },
  {
    slug: "swift",
    title: "Swift",
    description: "ARC, Concurrency, Protocol, 언어 깊이 파기",
    count: 0,
  },
  {
    slug: "ios",
    title: "iOS",
    description: "UIKit, SwiftUI, 아키텍처, 라이프사이클",
    count: 0,
  },
  {
    slug: "cs",
    title: "CS",
    description: "자료구조, 운영체제, 네트워크, 디자인 패턴",
    count: 0,
  },
  {
    slug: "reactive",
    title: "Reactive",
    description: "Combine, RxSwift",
    count: 0,
  },
  {
    slug: "wwdc",
    title: "WWDC",
    description: "WWDC 세션 정리",
    count: 0,
  },
  {
    slug: "tools",
    title: "Tools",
    description: "Tuist, SPM, Fastlane, GitHub Actions",
    count: 0,
  },
];

export default function TilPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <SectionHeading
        title="Today I Learned"
        subtitle="매일 배운 것을 기록합니다"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <Link key={cat.slug} href={`/til/${cat.slug}`}>
            <CloudCard delay={i * 0.08}>
              <h3 className="text-xl font-semibold">{cat.title}</h3>
              <p
                className="mt-2 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {cat.description}
              </p>
              <p
                className="mt-4 text-xs"
                style={{ color: "var(--color-text-secondary)" }}
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
