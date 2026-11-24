'use client';

import React, { useRef } from 'react';
import { WindowProvider } from '@/lib/os/window-context';
import { DesktopCanvas } from './desktop-canvas';
import { WindowFrame } from './window-frame';
import { WorksView } from './views/works-view';
import { AboutView } from './views/about-view';
import { JournalView } from './views/journal-view';
import { TerminalView } from './views/terminal-view';
import { ProjectPreviewView } from './views/project-preview-view';
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
          {/* Main Application Windows */}
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

          {/* Individual Project Detail Windows — can be open simultaneously */}
          <WindowFrame id="kinetic-type" dragConstraintsRef={containerRef}>
            <ProjectPreviewView
              id="kinetic-type"
              title="Kinetic Motion Library"
              filename="Kinetic_Type.jpg"
              image="/images/1.jpg"
              year="2026"
              category="Motion Design & Variable Typography"
              description="A real-time typography motion engine exploring dynamic optical weight scaling, velocity-aware springs, and GPU kinetic text deformation."
              tags={['Three.js', 'Framer Motion', 'Variable Fonts', 'WebGL']}
            />
          </WindowFrame>

          <WindowFrame id="spatial-studio" dragConstraintsRef={containerRef}>
            <ProjectPreviewView
              id="spatial-studio"
              title="Spatial Studio OS"
              filename="Spatial_Studio.png"
              image="/images/2.jpg"
              year="2025"
              category="VisionOS & Spatial Computing"
              description="Experimental spatial operating system interface exploring depth layering, glassmorphism material refraction, and gestural window manipulation."
              tags={['VisionOS', 'Spatial UI', 'SwiftUI', 'Depth Physics']}
            />
          </WindowFrame>

          <WindowFrame id="fluid-canvas" dragConstraintsRef={containerRef}>
            <ProjectPreviewView
              id="fluid-canvas"
              title="WebGL Fluid Simulation"
              filename="Fluid_Canvas.jpg"
              image="/images/3.jpg"
              year="2025"
              category="Interactive Shader Graphics"
              description="Navier-Stokes fluid dynamics simulation running in real-time GLSL fragment shaders, responsive to cursor velocity and multi-touch vortexes."
              tags={['GLSL', 'Shaders', 'WebAudio', 'Canvas API']}
            />
          </WindowFrame>

          <WindowFrame id="fintech-system" dragConstraintsRef={containerRef}>
            <ProjectPreviewView
              id="fintech-system"
              title="Fintech Surface System"
              filename="Fintech_System.png"
              image="/images/4.jpg"
              year="2024"
              category="Design System & Architecture"
              description="Multi-platform tokenized design system engineered for high-density financial transaction dashboards and tactile micro-interactions."
              tags={['Design Tokens', 'Tailwind CSS', 'TypeScript', 'OKLCH']}
            />
          </WindowFrame>
        </DesktopCanvas>

        {/* Apple macOS Dock with Emil Magnification Physics */}
        <Dock />
      </div>
    </WindowProvider>
  );
}
