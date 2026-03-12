"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { TilCategory } from "@/lib/til";

function TilInner({ categories }: { categories: TilCategory[] }) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || categories[0]?.slug || "algorithms"
  );
  const active = categories.find((c) => c.slug === activeCategory) || categories[0];

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categories.some((c) => c.slug === cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams, categories]);

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
          maxWidth: "1060px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "var(--space-16)" }}
        >
          <h1
            className="font-bold"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Today I Learned
          </h1>
          <p
            style={{
              marginTop: "var(--space-3)",
              fontSize: "var(--font-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            매일 배운 것을 기록합니다.
          </p>
        </motion.div>

        {/* Layout: Sidebar + Content */}
        <div
          className="flex flex-col md:flex-row"
          style={{ gap: "var(--space-12)" }}
        >
          {/* Sidebar */}
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="til-sidebar"
            style={{
              minWidth: "220px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
                position: "sticky",
                top: "calc(var(--nav-height) + var(--space-8))",
                padding: "var(--space-2) var(--space-3)",
              }}
            >
              {categories.map((cat) => {
                const isActive = cat.slug === activeCategory;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className="transition-colors"
                    style={{
                      textAlign: "left",
                      padding: "var(--space-3) var(--space-5)",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "var(--font-body)",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive
                        ? "var(--color-accent)"
                        : "var(--color-text-secondary)",
                      background: isActive
                        ? "var(--color-accent-subtle)"
                        : "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {cat.title}
                    {cat.posts.length > 0 && (
                      <span
                        style={{
                          fontSize: "var(--font-footnote)",
                          color: isActive
                            ? "var(--color-accent)"
                            : "var(--color-text-tertiary)",
                        }}
                      >
                        {cat.posts.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.nav>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category Header */}
                <div
                  style={{
                    paddingBottom: "var(--space-6)",
                    borderBottom: "1px solid var(--color-separator)",
                    marginBottom: "var(--space-8)",
                  }}
                >
                  <h2
                    className="font-bold"
                    style={{
                      fontSize: "var(--font-title-1)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {active.title}
                  </h2>
                  <p
                    style={{
                      marginTop: "var(--space-2)",
                      fontSize: "var(--font-callout)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {active.description}
                  </p>
                </div>

                {/* Post List */}
                {active.posts.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-2)",
                    }}
                  >
                    {active.posts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/til/${activeCategory}/${post.slug}`}
                        className="transition-colors"
                        style={{
                          display: "block",
                          padding: "var(--space-6)",
                          borderRadius: "var(--radius-md)",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--color-bg-secondary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <div
                          className="flex items-start justify-between"
                          style={{ gap: "var(--space-4)" }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h3
                              className="font-semibold"
                              style={{
                                fontSize: "var(--font-headline)",
                              }}
                            >
                              {post.title}
                            </h3>
                            <div
                              className="flex flex-wrap"
                              style={{
                                marginTop: "var(--space-3)",
                                gap: "var(--space-2)",
                              }}
                            >
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  style={{
                                    fontSize: "var(--font-footnote)",
                                    color: "var(--color-accent)",
                                    background: "var(--color-accent-subtle)",
                                    padding: "3px var(--space-3)",
                                    borderRadius: "var(--radius-sm)",
                                    fontWeight: 500,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p
                            style={{
                              fontSize: "var(--font-subhead)",
                              color: "var(--color-text-tertiary)",
                              flexShrink: 0,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {post.date}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "var(--space-20) 0",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "var(--font-body)",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      아직 작성된 글이 없습니다.
                    </p>
                    <p
                      style={{
                        marginTop: "var(--space-3)",
                        fontSize: "var(--font-subhead)",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      곧 학습 기록이 추가될 예정입니다.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TilContent({ categories }: { categories: TilCategory[] }) {
  return (
    <Suspense>
      <TilInner categories={categories} />
    </Suspense>
  );
}
