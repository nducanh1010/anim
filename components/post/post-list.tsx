import { Link } from "next-view-transitions";
import type { Post } from "@/lib/posts";

function formatDate(iso: string): string {
  // Render YYYY-MM-DD in en-CA (deterministic, locale-stable).
  return iso.slice(0, 10);
}

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-ink-mute text-base">
        No posts yet. I will write something here when I have something
        worth saying. In the meantime, the journal lives in a drawer.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-rule">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group grid grid-cols-[6.5rem_3.5rem_1fr] items-baseline gap-x-6 gap-y-2 py-5 transition-colors duration-fast ease-out-quart hover:text-accent"
          >
            <time
              dateTime={post.date}
              className="font-mono text-xs uppercase tracking-caps text-ink-faint"
            >
              {formatDate(post.date)}
            </time>
            <span className="font-mono text-xs text-ink-faint">
              {post.readingTimeMinutes} min
            </span>
            <span className="block">
              <span className="block font-display text-h3 text-ink-strong group-hover:text-accent transition-colors duration-fast ease-out-quart">
                {post.title}
              </span>
              <span className="mt-1 block text-ink-mute">
                {post.summary}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
