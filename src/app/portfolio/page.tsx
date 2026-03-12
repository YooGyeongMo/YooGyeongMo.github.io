"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { CloudCard } from "@/components/ui/CloudCard";

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <SectionHeading
        title="Portfolio"
        subtitle="만들어온 것들"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <CloudCard delay={0}>
          <span className="text-2xl">◈</span>
          <h3 className="mt-4 text-xl font-semibold">SUSA24-iOS</h3>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            범죄수사 사건 관리 및 위치 데이터 시각화 앱.
            SwiftUI, CoreData, 커스텀 상태관리 아키텍처.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["SwiftUI", "CoreData", "MapKit", "Swift 6"].map((tag) => (
              <span
                key={tag}
                className="glass rounded-full px-3 py-1 text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </CloudCard>

        <CloudCard delay={0.1}>
          <span className="text-2xl">⟡</span>
          <h3 className="mt-4 text-xl font-semibold">Coming Soon</h3>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            더 많은 프로젝트가 추가될 예정입니다.
          </p>
        </CloudCard>
      </div>
    </div>
  );
}
