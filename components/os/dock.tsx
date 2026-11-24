'use client';

import React from 'react';
import Image from 'next/image';
import { useWindowManager } from '@/lib/os/window-context';
import { WindowId, INITIAL_WINDOWS } from '@/lib/os/types';

interface DockItemProps {
  id: WindowId;
  label: string;
  iconPath: string;
}

const DOCK_ICON_MAP: Record<WindowId, string> = {
  works: '/images/Gallery.avif',
  about: '/images/Note.avif',
  journal: '/images/Mail.avif',
  terminal: '/icons/dock/terminal.svg',
};

function DockItem({ id, label, iconPath }: DockItemProps) {
  const { toggleWindow, windows, activeWindowId } = useWindowManager();
  const win = windows[id];
  const isOpen = win?.isOpen && !win?.isMinimized;
  const isActive = activeWindowId === id;

  return (
    <div className="relative flex flex-col items-center group">
      {/* Apple Tooltip — Origin-aware, upward reveal, frosted material, zero layout jump */}
      <div className="absolute -top-11 px-2.5 py-1 rounded-lg text-xs font-sans font-medium tracking-tight bg-surface-0/90 dark:bg-palette-ink-9/90 text-ink-strong border border-rule/50 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)] pointer-events-none opacity-0 translate-y-1.5 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-150 ease-out whitespace-nowrap z-50">
        {label}
        {/* Subtle tooltip bottom pointer */}
        <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-surface-0/90 dark:bg-palette-ink-9/90 border-r border-b border-rule/50 dark:border-white/10" />
      </div>

      {/* Dock Icon Button — No zoom magnification, no borders, stable touch target */}
      <button
        onClick={() => toggleWindow(id)}
        className="relative w-12 h-12 flex items-center justify-center p-0.5 rounded-2xl transition-transform duration-100 ease-out active:scale-90 outline-none"
        aria-label={`Open ${label}`}
      >
        <Image
          src={iconPath}
          alt={label}
          width={48}
          height={48}
          className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none"
        />
      </button>

      {/* Apple Running indicator dot */}
      <span
        className={`w-1 h-1 rounded-full transition-opacity duration-150 mt-0.5 ${
          isOpen ? 'bg-ink-strong dark:bg-white opacity-90' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export function Dock() {
  const { openWindow } = useWindowManager();
  const items = Object.values(INITIAL_WINDOWS);

  return (
    <footer
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-end gap-2 px-3.5 py-2 rounded-2xl bg-surface-0/70 dark:bg-palette-ink-9/70 backdrop-blur-2xl border border-rule/50 dark:border-white/10 shadow-[0_20px_48px_-8px_rgba(0,0,0,0.35)] select-none"
    >
      {/* Apple Finder Icon */}
      <div className="relative flex flex-col items-center group">
        <div className="absolute -top-11 px-2.5 py-1 rounded-lg text-xs font-sans font-medium tracking-tight bg-surface-0/90 dark:bg-palette-ink-9/90 text-ink-strong border border-rule/50 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)] pointer-events-none opacity-0 translate-y-1.5 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-150 ease-out whitespace-nowrap z-50">
          Finder
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-surface-0/90 dark:bg-palette-ink-9/90 border-r border-b border-rule/50 dark:border-white/10" />
        </div>
        <button
          onClick={() => openWindow('works')}
          className="w-12 h-12 p-0.5 rounded-2xl flex items-center justify-center transition-transform duration-100 ease-out active:scale-90 outline-none"
          aria-label="Finder"
        >
          <Image
            src="/images/es0axIAu0guUZSRBu6xvsteey8w.avif"
            alt="Finder"
            width={48}
            height={48}
            className="w-full h-full object-contain drop-shadow-md pointer-events-none"
          />
        </button>
        <span className="w-1 h-1 rounded-full bg-ink-strong dark:bg-white opacity-90 mt-0.5" />
      </div>

      <div className="w-px h-8 bg-rule/50 mx-0.5 self-center" />

      {/* Main Apps mapped to authentic Apple AVIF icons */}
      {items.map((item) => (
        <DockItem
          key={item.id}
          id={item.id as WindowId}
          label={item.label}
          iconPath={DOCK_ICON_MAP[item.id as WindowId] || '/images/Gallery.avif'}
        />
      ))}

      <div className="w-px h-8 bg-rule/50 mx-0.5 self-center" />

      {/* Trash with real Apple Bin.avif */}
      <div className="relative flex flex-col items-center group">
        <div className="absolute -top-11 px-2.5 py-1 rounded-lg text-xs font-sans font-medium tracking-tight bg-surface-0/90 dark:bg-palette-ink-9/90 text-ink-strong border border-rule/50 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)] pointer-events-none opacity-0 translate-y-1.5 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-150 ease-out whitespace-nowrap z-50">
          Trash
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-surface-0/90 dark:bg-palette-ink-9/90 border-r border-b border-rule/50 dark:border-white/10" />
        </div>
        <button
          className="w-12 h-12 p-0.5 rounded-2xl flex items-center justify-center transition-transform duration-100 ease-out active:scale-90 opacity-90 hover:opacity-100 outline-none"
          aria-label="Trash"
        >
          <Image
            src="/images/Bin.avif"
            alt="Trash"
            width={48}
            height={48}
            className="w-full h-full object-contain drop-shadow-md pointer-events-none"
          />
        </button>
        <span className="w-1 h-1 rounded-full opacity-0 mt-0.5" />
      </div>
    </footer>
  );
}
