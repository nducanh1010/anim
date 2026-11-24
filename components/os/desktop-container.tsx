'use client';

import React, { useRef } from 'react';
import { WindowProvider } from '@/lib/os/window-context';
import { DesktopCanvas } from './desktop-canvas';
import { WindowFrame } from './window-frame';
import { WorksView } from './views/works-view';
import { AboutView } from './views/about-view';
import { JournalView } from './views/journal-view';
import { TerminalView } from './views/terminal-view';
import { Dock } from './dock';
import { Post } from '@/lib/posts';

interface DesktopContainerProps {
  posts: Post[];
}

export function DesktopContainer({ posts }: DesktopContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <WindowProvider>
      <div
        ref={containerRef}
        className="fixed inset-0 z-40 w-screen h-dvh overflow-hidden bg-surface-0"
      >
        <DesktopCanvas>
          {/* Windows rendered within container boundaries */}
          <WindowFrame id="works" dragConstraintsRef={containerRef}>
            <WorksView />
          </WindowFrame>

          <WindowFrame id="about" dragConstraintsRef={containerRef}>
            <AboutView />
          </WindowFrame>

          <WindowFrame id="journal" dragConstraintsRef={containerRef}>
            <JournalView posts={posts} />
          </WindowFrame>

          <WindowFrame id="terminal" dragConstraintsRef={containerRef}>
            <TerminalView />
          </WindowFrame>
        </DesktopCanvas>

        {/* Apple macOS Dock with Emil Magnification Physics */}
        <Dock />
      </div>
    </WindowProvider>
  );
}
