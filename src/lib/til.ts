import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "content/til");

export interface TilPost {
  slug: string;
  category: string;
  title: string;
  date: string;
  tags: string[];
  content?: string;
}

export interface TilCategory {
  slug: string;
  title: string;
  description: string;
  posts: TilPost[];
}

/* ─── Category metadata ─── */

const categoryMeta: Record<string, { title: string; description: string }> = {
  algorithms: { title: "Algorithms", description: "문제 풀이에서 배운 개념과 접근법" },
  swift: { title: "Swift", description: "ARC, Concurrency, Protocol, 언어 깊이 파기" },
  ios: { title: "iOS", description: "UIKit, SwiftUI, 아키텍처, 라이프사이클" },
  cs: { title: "CS", description: "자료구조, 운영체제, 네트워크, 디자인 패턴" },
  reactive: { title: "Reactive", description: "Combine, RxSwift" },
  wwdc: { title: "WWDC", description: "WWDC 세션 정리" },
  tools: { title: "Tools", description: "Tuist, SPM, Fastlane, GitHub Actions" },
};

/* ─── Read all categories (scans content/til/ directory) ─── */

export function getAllCategories(): TilCategory[] {
  // Scan directories under content/til/
  const dirs = fs.existsSync(contentDir)
    ? fs.readdirSync(contentDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    : [];

  // Also include any predefined categories that don't have directories yet
  const allSlugs = Array.from(new Set([...Object.keys(categoryMeta), ...dirs]));

  return allSlugs.map((slug) => {
    const meta = categoryMeta[slug] || { title: slug, description: "" };
    const posts = getPostsByCategory(slug);
    return { slug, ...meta, posts };
  });
}

/* ─── Read posts for a category ─── */

export function getPostsByCategory(category: string): TilPost[] {
  const categoryDir = path.join(contentDir, category);

  if (!fs.existsSync(categoryDir)) return [];

  const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const filePath = path.join(categoryDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      const slug = filename.replace(/\.md$/, "");

      return {
        slug,
        category,
        title: (data.title as string) || slug,
        date: (data.date as string) || "",
        tags: (data.tags as string[]) || [],
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1)); // newest first
}

/* ─── Read a single post with rendered HTML content ─── */

export async function getPost(
  category: string,
  slug: string
): Promise<TilPost & { content: string }> {
  const filePath = path.join(contentDir, category, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content: rawContent } = matter(fileContent);

  const processed = await remark().use(html).process(rawContent);
  const content = processed.toString();

  return {
    slug,
    category,
    title: (data.title as string) || slug,
    date: (data.date as string) || "",
    tags: (data.tags as string[]) || [],
    content,
  };
}

/* ─── Get all post paths for static generation ─── */

export function getAllPostPaths(): { category: string; slug: string }[] {
  const categories = getAllCategories();
  const paths: { category: string; slug: string }[] = [];

  for (const cat of categories) {
    for (const post of cat.posts) {
      paths.push({ category: cat.slug, slug: post.slug });
    }
  }

  return paths;
}

/* ─── Get all category slugs for static generation ─── */

export function getAllCategorySlugs(): string[] {
  return getAllCategories().map((c) => c.slug);
}
