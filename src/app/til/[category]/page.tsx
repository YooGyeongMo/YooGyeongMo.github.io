import Link from "next/link";
import { getAllCategorySlugs, getPostsByCategory } from "@/lib/til";

const categoryMeta: Record<string, { title: string; description: string }> = {
  algorithms: { title: "Algorithms", description: "문제 풀이에서 배운 개념과 접근법" },
  swift: { title: "Swift", description: "ARC, Concurrency, Protocol, 언어 깊이 파기" },
  ios: { title: "iOS", description: "UIKit, SwiftUI, 아키텍처, 라이프사이클" },
  cs: { title: "CS", description: "자료구조, 운영체제, 네트워크, 디자인 패턴" },
  reactive: { title: "Reactive", description: "Combine, RxSwift" },
  wwdc: { title: "WWDC", description: "WWDC 세션 정리" },
  tools: { title: "Tools", description: "Tuist, SPM, Fastlane, GitHub Actions" },
};

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const meta = categoryMeta[category] || { title: category, description: "" };
  const posts = getPostsByCategory(category);

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "var(--nav-height)",
      }}
    >
      <div
        className="section-container"
        style={{
          padding: "var(--space-16) var(--content-padding) var(--space-24)",
          maxWidth: "720px",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            marginBottom: "var(--space-8)",
            fontSize: "var(--font-footnote)",
          }}
        >
          <Link
            href="/til"
            style={{
              color: "var(--color-accent)",
              textDecoration: "none",
            }}
          >
            Today I Learned
          </Link>
          <span style={{ color: "var(--color-text-tertiary)", margin: "0 var(--space-2)" }}>
            /
          </span>
          <span style={{ color: "var(--color-text-secondary)" }}>
            {meta.title}
          </span>
        </div>

        {/* Header */}
        <div
          style={{
            paddingBottom: "var(--space-6)",
            borderBottom: "1px solid var(--color-separator)",
            marginBottom: "var(--space-8)",
          }}
        >
          <h1
            className="font-bold"
            style={{
              fontSize: "var(--font-title-1)",
              letterSpacing: "-0.02em",
            }}
          >
            {meta.title}
          </h1>
          <p
            style={{
              marginTop: "var(--space-2)",
              fontSize: "var(--font-subhead)",
              color: "var(--color-text-secondary)",
            }}
          >
            {meta.description}
          </p>
        </div>

        {/* Posts or Empty State */}
        {posts.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/til/${category}/${post.slug}`}
                style={{
                  display: "block",
                  padding: "var(--space-5)",
                  borderRadius: "var(--radius-md)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-4)" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 className="font-medium" style={{ fontSize: "var(--font-body)" }}>
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap" style={{ marginTop: "var(--space-2)", gap: "var(--space-2)" }}>
                      {post.tags.map((tag) => (
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
                  <p style={{ fontSize: "var(--font-footnote)", color: "var(--color-text-tertiary)", flexShrink: 0 }}>
                    {post.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ padding: "var(--space-16) 0", textAlign: "center" }}>
            <p style={{ fontSize: "var(--font-subhead)", color: "var(--color-text-tertiary)" }}>
              아직 작성된 글이 없습니다.
            </p>
            <Link
              href="/til"
              style={{
                display: "inline-block",
                marginTop: "var(--space-6)",
                fontSize: "var(--font-subhead)",
                color: "var(--color-accent)",
                textDecoration: "none",
              }}
            >
              &larr; 돌아가기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}
