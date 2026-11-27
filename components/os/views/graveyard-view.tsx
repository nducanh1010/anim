'use client';

import React, { useState } from 'react';
import { GlitchText } from '@/components/kokonutui/glitch-text';
import { SpoilerText } from '@/components/kokonutui/spoiler-text';
import { GRAVEYARD_PROJECTS, GraveyardProject } from '@/lib/os/graveyard-data';

export function GraveyardView() {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'No PMF', 'Scope Creep', 'Overengineering', 'Economic Death'];
  const filtered =
    filter === 'All'
      ? GRAVEYARD_PROJECTS
      : GRAVEYARD_PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col gap-6 selection:bg-red-500/20">
      {/* Graveyard Header & Kokonut UI Glitch Title */}
      <div className="flex flex-col gap-3 border-b border-rule/50 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-ink-mute">💀</span>
              <GlitchText
                text="This is the graveyard"
                className="text-xl sm:text-2xl font-bold tracking-tight"
                speed={2800}
              />
            </div>
            <p className="mt-1 text-xs text-ink-mute font-mono">
              Where ambitious side-projects rest in peace after colliding with reality.
            </p>
          </div>

          <div className="text-right">
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-red-500/10 text-red-500 border border-red-500/20">
              {filtered.length} casualties archived
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs font-mono">
          <span className="text-ink-mute text-[11px] mr-1">Cause:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-1 rounded-md transition-all duration-fast ${
                filter === cat
                  ? 'bg-ink-strong text-surface-0 shadow-sm font-medium'
                  : 'bg-surface-1/60 hover:bg-surface-1 text-ink-mute hover:text-ink-strong border border-rule/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cemetery Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item: GraveyardProject) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-xl p-4 sm:p-5 bg-surface-1/30 hover:bg-surface-1/60 border border-rule/60 hover:border-rule transition-all duration-fast shadow-sm"
          >
            {/* Project Header Info */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-display font-semibold text-base text-ink-strong flex items-center gap-2">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-red-500/80 font-medium">
                    {item.era}
                  </span>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-2 text-ink-mute border border-rule/50 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              {/* The Vision (Ambition) */}
              <div className="mt-2.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-ink-mute block mb-1">
                  The Vision:
                </span>
                <p className="text-xs text-ink/90 leading-relaxed font-sans">
                  {item.vision}
                </p>
              </div>

              {/* Post-Mortem Analysis (Why it failed) with Kokonut SpoilerText */}
              <div className="mt-3.5 pt-3 border-t border-rule/40">
                <span className="text-[10px] uppercase font-mono tracking-wider text-red-500/90 font-semibold flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Why this idea failed (Post-Mortem):
                </span>

                <SpoilerText
                  revealText="Click to uncover autopsy"
                  className="w-full text-xs"
                >
                  <div className="p-2.5 rounded-lg bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 text-xs text-ink/90 leading-relaxed">
                    <p className="mb-2">{item.failReason}</p>
                    <div className="pt-2 border-t border-red-500/15 text-[11px] text-ink-mute font-mono">
                      <strong className="text-ink-strong">Lesson:</strong> {item.lessons}
                    </div>
                  </div>
                </SpoilerText>
              </div>
            </div>

            {/* Bottom Meta & Stack */}
            <div className="mt-4 pt-3 border-t border-rule/30 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-ink-mute">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 rounded bg-surface-2/60 border border-rule/30"
                  >
                    #{tech}
                  </span>
                ))}
              </div>
              <p className="text-[11px] font-mono italic text-ink-mute/80 pt-1">
                {item.epitaph}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
