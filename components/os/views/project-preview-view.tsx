'use client';

import React from 'react';
import Image from 'next/image';
import { useWindowManager } from '@/lib/os/window-context';

interface ProjectPreviewViewProps {
  id: string;
  title: string;
  filename: string;
  image: string;
  year: string;
  category: string;
  description: string;
  tags: string[];
}

export function ProjectPreviewView({
  title,
  filename,
  image,
  year,
  category,
  description,
  tags,
}: ProjectPreviewViewProps) {
  const { openWindow } = useWindowManager();

  return (
    <div className="flex flex-col h-full bg-surface-0 select-none overflow-y-auto">
      {/* Top Preview Media Container */}
      <div className="relative w-full aspect-video sm:h-64 bg-palette-ink-9/5 dark:bg-white/5 border-b border-rule/50 flex items-center justify-center p-3">
        <div className="relative w-full h-full rounded-md overflow-hidden shadow-inner bg-surface-1">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
            priority
          />
        </div>
      </div>

      {/* Project Metadata & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-sans font-semibold tracking-tight text-ink-strong">
              {title}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono text-ink-mute bg-surface-1 border border-rule/40">
              {year}
            </span>
          </div>

          <p className="text-xs font-sans text-accent font-medium">
            {category} • {filename}
          </p>

          <p className="text-xs sm:text-sm font-sans text-ink leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[11px] font-sans bg-surface-1 text-ink-mute border border-rule/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-rule/40 flex items-center justify-between">
          <span className="text-[11px] font-mono text-ink-mute">
            macOS Quick Look Preview
          </span>
          <button
            onClick={() => openWindow('works')}
            className="px-3 py-1.5 rounded-lg text-xs font-sans font-medium bg-ink-strong text-surface-0 hover:opacity-90 active:scale-95 transition-all duration-100 shadow-sm"
          >
            Open All Works →
          </button>
        </div>
      </div>
    </div>
  );
}

