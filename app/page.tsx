import { Link } from "next-view-transitions";
import { getAllPosts } from "@/lib/posts";
import { Hero } from "@/components/hero";

function formatDate(iso: string): string {
  return iso?.slice(0, 10);
}

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 4);

  return (
    <div className="grid gap-space-9">
      <Hero />

      <section aria-labelledby="latest-heading" className="grid gap-space-4">
        <div className="flex items-baseline justify-between border-b border-rule pb-space-2">
          <h2
            id="latest-heading"
            className="uppercase-eyebrow text-ink-mute"
          >
            Latest
          </h2>
          <Link
            href="/blog"
            className="text-sm text-ink-mute link-underline"
          >
            All writing
          </Link>
        </div>

        <ul className="divide-y divide-rule">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group grid grid-cols-[6.5rem_1fr] gap-x-6 py-space-4 sm:grid-cols-[8rem_3.5rem_1fr]"
              >
                <time
                  dateTime={p.date}
                  className="font-mono text-xs text-ink-faint"
                >
                  {formatDate(p.date)}
                </time>
                <span className="hidden font-mono text-xs text-ink-faint sm:block">
                  {p.readingTimeMinutes} min
                </span>
                <span className="block">
                  <span className="block font-display text-h3 text-ink-strong transition-colors duration-fast ease-out-quart group-hover:text-accent">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-ink-mute">
                    {p.summary}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="elsewhere-heading"
        className="grid gap-space-3 sm:max-w-[60ch]"
      >
        <h2 id="elsewhere-heading" className="uppercase-eyebrow">
          Elsewhere
        </h2>
        <p className="text-ink">
          <a className="link-underline" href="https://github.com/ducanh">github</a>
          <span className="px-2 text-ink-faint" aria-hidden="true">·</span>
          <a className="link-underline" href="/rss.xml">rss</a>
          <span className="px-2 text-ink-faint" aria-hidden="true">·</span>
          <a className="link-underline" href="mailto:hello@example.com">email</a>
        </p>
      </section>
    </div>
  );
}
