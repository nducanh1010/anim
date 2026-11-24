'use client';

import React from 'react';
import { Link } from 'next-view-transitions';
import { Post } from '@/lib/posts';

interface JournalViewProps {
  posts: Post[];
}

export function JournalView({ posts }: JournalViewProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between border-b border-rule/50 pb-3">
        <div>
          <h2 className="font-display font-semibold text-base text-ink-strong tracking-tight">
            Journal & Essays
          </h2>
          <p className="text-xs text-ink-mute font-mono">
            Thoughts on craft, motion physics, and frontend architecture
          </p>
        </div>
        <span className="text-xs font-mono text-ink-faint">
          {posts.length} entries
        </span>
      </div>

      <div className="divide-y divide-rule/40">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="py-3.5 group transition-colors duration-fast"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
            >
              <div className="flex-1">
                <h3 className="font-display font-medium text-sm text-ink-strong group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="mt-1 text-xs text-ink-mute line-clamp-2">
                  {post.summary}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-ink-faint shrink-0 mt-1 sm:mt-0">
                <span>{post.readingTimeMinutes} min</span>
                <span>{post.date}</span>
                <span className="text-accent group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

