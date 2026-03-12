import Link from "next/link";
import { getPost, getAllPostPaths } from "@/lib/til";

const categoryMeta: Record<string, string> = {
  algorithms: "Algorithms",
  swift: "Swift",
  ios: "iOS",
  cs: "CS",
  reactive: "Reactive",
  wwdc: "WWDC",
  tools: "Tools",
};

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = await getPost(category, slug);
  const categoryTitle = categoryMeta[category] || category;

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "var(--nav-height)",
      }}
    >
      <article
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
            style={{ color: "var(--color-accent)", textDecoration: "none" }}
          >
            Today I Learned
          </Link>
          <span style={{ color: "var(--color-text-tertiary)", margin: "0 var(--space-2)" }}>
            /
          </span>
          <Link
            href={`/til?category=${category}`}
            style={{ color: "var(--color-accent)", textDecoration: "none" }}
          >
            {categoryTitle}
          </Link>
        </div>

        {/* Header */}
        <header
          style={{
            paddingBottom: "var(--space-6)",
            borderBottom: "1px solid var(--color-separator)",
            marginBottom: "var(--space-10)",
          }}
        >
          <h1
            className="font-bold"
            style={{
              fontSize: "var(--font-title-1)",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </h1>

          <div
            className="flex items-center flex-wrap"
            style={{
              marginTop: "var(--space-4)",
              gap: "var(--space-3)",
            }}
          >
            <span
              style={{
                fontSize: "var(--font-footnote)",
                color: "var(--color-text-tertiary)",
              }}
            >
              {post.date}
            </span>

            <div className="flex flex-wrap" style={{ gap: "var(--space-2)" }}>
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
        </header>

        {/* Content */}
        <div
          className="til-content"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        {/* Back */}
        <div style={{ marginTop: "var(--space-16)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--color-separator)" }}>
          <Link
            href={`/til?category=${category}`}
            style={{
              fontSize: "var(--font-subhead)",
              color: "var(--color-accent)",
              textDecoration: "none",
            }}
          >
            &larr; {categoryTitle} 목록으로
          </Link>
        </div>
      </article>
    </div>
  );
}

export function generateStaticParams() {
  return getAllPostPaths().map(({ category, slug }) => ({ category, slug }));
}
