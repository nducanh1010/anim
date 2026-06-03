import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { PostBody } from "@/components/post-body";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return { title: `${post.title} · hien vu.`, description: post.summary };
  } catch {
    return { title: "Not found · hien vu." };
  }
}

function formatDate(iso: string): string {
  return iso.slice(0, 10);
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <article className="grid gap-space-7">
      <header className="grid gap-space-3">
        <p className="text-xs text-ink-faint">
          <Link href="/blog" className="link-underline">
            journal
          </Link>
          <span className="px-2 text-ink-faint" aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="px-2 text-ink-faint" aria-hidden="true">·</span>
          <span>{post.readingTimeMinutes} min</span>
        </p>
        <h1 className="text-h1 font-display font-semibold tracking-tight text-ink-strong">
          {post.title}
        </h1>
        <p className="text-ink-mute sm:max-w-[60ch]">{post.summary}</p>
      </header>

      <PostBody html={post.html} />
    </article>
  );
}
