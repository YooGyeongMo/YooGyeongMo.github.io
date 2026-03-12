"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { CloudCard } from "@/components/ui/CloudCard";

export default function PortfolioPage() {
  return (
    <div
      className="section-container"
      style={{
        paddingTop: "calc(var(--nav-height) + var(--space-16))",
        paddingBottom: "var(--space-24)",
      }}
    >
      <SectionHeading
        title="Portfolio"
        subtitle="만들어온 것들"
      />

      <div
        className="grid gap-5 md:grid-cols-2"
        style={{ maxWidth: "720px", margin: "0 auto" }}
      >
        <CloudCard delay={0}>
          <p
            style={{
              fontSize: "var(--font-caption)",
              color: "var(--color-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            iphone
          </p>
          <h3
            className="font-semibold"
            style={{
              fontSize: "var(--font-title-3)",
              marginTop: "var(--space-3)",
            }}
          >
            SUSA24-iOS
          </h3>
          <p
            style={{
              marginTop: "var(--space-2)",
              fontSize: "var(--font-subhead)",
              color: "var(--color-text-secondary)",
            }}
          >
            범죄수사 사건 관리 및 위치 데이터 시각화 앱.
            SwiftUI, CoreData, 커스텀 상태관리 아키텍처.
          </p>
          <div
            className="flex flex-wrap"
            style={{ marginTop: "var(--space-4)", gap: "var(--space-2)" }}
          >
            {["SwiftUI", "CoreData", "MapKit", "Swift 6"].map((tag) => (
              <span
                key={tag}
                style={{
                  background: "var(--color-bg)",
                  borderRadius: "980px",
                  padding: "var(--space-1) var(--space-3)",
                  fontSize: "var(--font-caption)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </CloudCard>

        <CloudCard delay={0.1}>
          <p
            style={{
              fontSize: "var(--font-caption)",
              color: "var(--color-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            ellipsis
          </p>
          <h3
            className="font-semibold"
            style={{
              fontSize: "var(--font-title-3)",
              marginTop: "var(--space-3)",
            }}
          >
            Coming Soon
          </h3>
          <p
            style={{
              marginTop: "var(--space-2)",
              fontSize: "var(--font-subhead)",
              color: "var(--color-text-secondary)",
            }}
          >
            더 많은 프로젝트가 추가될 예정입니다.
          </p>
        </CloudCard>
      </div>
    </div>
  );
}
