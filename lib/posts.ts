import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

export type PostFrontmatter = {
  title: string;
  date: string; // ISO 8601 (YYYY-MM-DD)
  summary: string;
  draft?: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  readingTimeMinutes: number;
};

export type PostWithHtml = Post & {
  html: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    // gray-matter parses YAML dates (YYYY-MM-DD) into JS Date objects.
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string") {
    return value.slice(0, 10);
  }
  throw new Error(
    `Post date must be a YYYY-MM-DD string or a parseable date, got: ${typeof value}`
  );
}

function validate(data: unknown, slug: string): PostFrontmatter {
  const d = data as Partial<PostFrontmatter>;
  if (!d.title || d.date == null || !d.summary) {
    throw new Error(
      `Post "${slug}" is missing required frontmatter. Need: title, date (YYYY-MM-DD), summary.`
    );
  }
  return {
    title: d.title,
    date: normalizeDate(d.date),
    summary: d.summary,
    draft: d.draft ?? false,
  };
}

async function readPostFile(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: validate(data, slug), content };
}

export async function getPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(POSTS_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter, content } = await readPostFile(slug);
      const rt = readingTime(content);
      return {
        ...frontmatter,
        slug,
        readingTimeMinutes: Math.max(1, Math.round(rt.minutes)),
      };
    })
  );
  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<PostWithHtml> {
  const { frontmatter, content } = await readPostFile(slug);
  const processed = await remark().use(html).process(content);
  const rt = readingTime(content);
  return {
    ...frontmatter,
    slug,
    readingTimeMinutes: Math.max(1, Math.round(rt.minutes)),
    html: processed.toString(),
  };
}
