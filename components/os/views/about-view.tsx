'use client';

import React from 'react';

export function AboutView() {
  const lines = [
    '# About — anhnd',
    '',
    'Creative Developer & Frontend Engineer based in Ho Chi Minh City (GMT+7).',
    'Obsessed with motion physics, tactile digital surfaces, and design engineering.',
    '',
    '## Philosophy',
    '— Good taste is trained: unseen details compound into interfaces people love.',
    '— Performance is aesthetic: 60/120fps physics beat heavy decoration.',
    '— Less, but better: clear intent, restrained palette, zero AI-slop.',
    '',
    '## Core Stack',
    '— Frameworks: React 19, Next.js 15 (App Router), TypeScript',
    '— Motion & Physics: Framer Motion, GSAP, Lenis Smooth Scroll',
    '— Creative & WebGL: Three.js, React Three Fiber, GLSL Shaders',
    '— Styling & Tokens: Tailwind CSS, OKLCH Color Systems',
    '',
    '## Connect',
    '— GitHub:   github.com/ducanh',
    '— Email:    ducanh.dev@example.com',
    '— Journal:  Check the Journal window',
    '',
    'STATUS: Open to select freelance engagements & high-craft collaborations.',
  ];

  return (
    <div className="font-mono text-xs leading-relaxed flex flex-col gap-1 select-text">
      {/* File status eyebrow */}
      <div className="flex items-center justify-between border-b border-rule/40 pb-2 mb-3 text-ink-mute text-[11px]">
        <span>FILE: About.txt</span>
        <span>UTF-8 | READ-ONLY</span>
      </div>

      {/* Editor Content with line numbers */}
      <div className="space-y-1">
        {lines.map((line, idx) => (
          <div key={idx} className="flex gap-4">
            <span className="w-6 text-right text-ink-faint select-none shrink-0 tabular-nums">
              {idx + 1}
            </span>
            <span
              className={`${
                line.startsWith('#')
                  ? 'text-accent font-semibold'
                  : line.startsWith('STATUS')
                  ? 'text-ok font-medium'
                  : 'text-ink'
              }`}
            >
              {line || '\u00A0'}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Action Footer */}
      <div className="mt-6 pt-3 border-t border-rule/40 flex items-center justify-between text-[11px] text-ink-mute">
        <span>Location: Ho Chi Minh City, VN</span>
        <a
          href="https://github.com/ducanh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          open github &rarr;
        </a>
      </div>
    </div>
  );
}

