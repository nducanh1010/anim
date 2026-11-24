'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  category: 'Creative Dev' | 'Art Direction' | 'Design System' | 'Interaction';
  year: string;
  summary: string;
  role: string;
  image: string;
  link?: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'kinetic-type',
    title: 'Kinetic Motion & Micro-physics',
    category: 'Interaction',
    year: '2026',
    summary: 'Tactile UI component library featuring spring physics, magnetic cursors, and origin-aware popovers.',
    role: 'Lead Creative Dev',
    image: '/images/1.jpg',
    link: 'https://github.com/ducanh',
    tags: ['React 19', 'Framer Motion', 'Tailwind'],
  },
  {
    id: 'editorial-folio',
    title: 'Spatial Studio Portfolio',
    category: 'Creative Dev',
    year: '2025',
    summary: 'Interactive Desktop OS interface exploring non-traditional web layout architecture and window management.',
    role: 'Design & Code',
    image: '/images/2.jpg',
    link: 'https://github.com/ducanh',
    tags: ['Next.js 15', 'TypeScript', 'OKLCH'],
  },
  {
    id: 'fluid-canvas',
    title: 'Ripple & Generative Canvas',
    category: 'Creative Dev',
    year: '2025',
    summary: 'Custom WebGL fragment shaders simulating real-time fluid refraction and touch responsiveness.',
    role: 'Creative Technologist',
    image: '/images/3.jpg',
    link: 'https://github.com/ducanh',
    tags: ['Three.js', 'GLSL', 'WebGL'],
  },
  {
    id: 'fintech-checkout',
    title: 'Ultra-refined Checkout Surface',
    category: 'Design System',
    year: '2025',
    summary: 'Reduced cognitive load across multi-tier enterprise payment flow with zero-jank micro-interactions.',
    role: 'Frontend Architect',
    image: '/images/4.jpg',
    tags: ['Accessibility', 'React', 'Design Tokens'],
  },
];

export function WorksView() {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Creative Dev', 'Interaction', 'Design System'];
  const filteredProjects =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col gap-6">
      {/* View Header & Filter Bar */}
      <div className="flex items-center justify-between border-b border-rule/50 pb-3 flex-wrap gap-2">
        <div>
          <h2 className="font-display font-semibold text-base text-ink-strong tracking-tight">
            Selected Works
          </h2>
          <p className="text-xs text-ink-mute font-mono">
            {filteredProjects.length} items catalogued
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-surface-1/60 p-1 rounded-lg border border-rule/40 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-1 rounded-md transition-all duration-fast ${
                filter === cat
                  ? 'bg-surface-0 text-ink-strong shadow-sm font-medium'
                  : 'text-ink-mute hover:text-ink-strong'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="group relative flex flex-col rounded-xl overflow-hidden border border-rule/60 bg-surface-1/40 hover:bg-surface-1/80 transition-all duration-fast hover:border-rule hover:shadow-md"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2/60">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-medium ease-out-quart group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-2.5 right-2.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-surface-0/85 backdrop-blur-md text-ink-strong border border-rule/40 shadow-sm">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-ink-mute mb-1">
                  <span>{project.role}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="font-display font-semibold text-sm text-ink-strong group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs text-ink-mute leading-relaxed line-clamp-2">
                  {project.summary}
                </p>
              </div>

              {/* Tags & Action */}
              <div className="flex items-center justify-between pt-2 border-t border-rule/30 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {project.tags.map((t) => (
                    <span key={t} className="text-ink-faint">
                      #{t}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline flex items-center gap-0.5"
                  >
                    view &rarr;
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

