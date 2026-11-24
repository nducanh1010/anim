
'use client';

import React, { useRef } from 'react';
import { TopMenuBar } from './top-menu-bar';
import { DesktopIcon } from './desktop-icon';
import { DesktopProjectItem } from './desktop-project-item';
import { INITIAL_WINDOWS, WindowId } from '@/lib/os/types';
import { useWindowManager } from '@/lib/os/window-context';

interface DesktopCanvasProps {
  children?: React.ReactNode;
}

const DESKTOP_PROJECTS = [
  {
    id: 'kinetic-type',
    title: 'Kinetic Motion Library',
    filename: 'Kinetic_Type.jpg',
    image: '/images/1.jpg',
    defaultPosition: { x: 140, y: 30 },
  },
  {
    id: 'editorial-folio',
    title: 'Spatial Studio OS',
    filename: 'Spatial_Studio.png',
    image: '/images/2.jpg',
    defaultPosition: { x: 300, y: 55 },
  },
  {
    id: 'fluid-canvas',
    title: 'WebGL Fluid Simulation',
    filename: 'Fluid_Canvas.jpg',
    image: '/images/3.jpg',
    defaultPosition: { x: 140, y: 185 },
  },
  {
    id: 'fintech-checkout',
    title: 'Fintech Surface System',
    filename: 'Fintech_System.png',
    image: '/images/4.jpg',
    defaultPosition: { x: 300, y: 210 },
  },
];

export function DesktopCanvas({ children }: DesktopCanvasProps) {
  const { windows, openWindow, closeWindow } = useWindowManager();
  const iconList = Object.values(INITIAL_WINDOWS).filter((w) =>
    ['works', 'about', 'journal', 'terminal'].includes(w.id)
  );
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-screen h-dvh overflow-hidden select-none bg-surface-0 flex flex-col">
      {/* Top Menu Bar */}
      <TopMenuBar />

      {/* Studio Wallpaper Ground */}
      <div
        ref={canvasRef}
        className="relative flex-1 w-full h-[calc(100dvh-2.25rem)] mt-9 overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 30%, oklch(99% 0.008 80) 0%, oklch(95% 0.012 80) 100%)',
        }}
      >
        {/* Subtle grid pattern for precision feel */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--ink) 1px, transparent 1px), linear-gradient(to bottom, var(--ink) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* System Desktop Icons (Left side) */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex flex-row sm:flex-col gap-4 sm:gap-5 flex-wrap">
          {iconList.map((item) => (
            <DesktopIcon
              key={item.id}
              id={item.id as WindowId}
              label={item.label}
              iconName={item.iconName}
            />
          ))}
        </div>

        {/* Draggable Desktop Project Items (ByChudy concept) */}
        <div className="hidden md:block">
          {DESKTOP_PROJECTS.map((proj) => {
            const isWinOpen =
              windows[proj.id as WindowId]?.isOpen &&
              !windows[proj.id as WindowId]?.isMinimized;
            return (
              <DesktopProjectItem
                key={proj.id}
                id={proj.id}
                title={proj.title}
                filename={proj.filename}
                image={proj.image}
                defaultPosition={proj.defaultPosition}
                dragConstraintsRef={canvasRef}
                isOpen={isWinOpen}
                onToggle={() => {
                  if (isWinOpen) {
                    closeWindow(proj.id as WindowId);
                  } else {
                    openWindow(proj.id as WindowId);
                  }
                }}
              />
            );
          })}
        </div>

        {/* Windows Layer (rendered as children) */}
        <div className="absolute inset-0 pointer-events-none">
          {children}
        </div>
      </div>
    </div>
  );
}

