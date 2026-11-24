'use client';

import React from 'react';
import { useWindowManager } from '@/lib/os/window-context';
import { WindowId } from '@/lib/os/types';

interface DesktopIconProps {
  id: WindowId;
  label: string;
  iconName: string;
}

export function DesktopIcon({ id, label, iconName }: DesktopIconProps) {
  const { toggleWindow, windows, activeWindowId } = useWindowManager();
  const win = windows[id];
  const isOpen = win?.isOpen && !win?.isMinimized;
  const isActive = activeWindowId === id;

  const handleClick = () => {
    toggleWindow(id);
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`group flex flex-col items-center justify-center w-20 p-2 rounded-xl transition-all duration-fast select-none outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95 ${
        isActive
          ? 'bg-ink/15 ring-1 ring-ink/20 shadow-sm'
          : 'hover:bg-ink/8 hover:translate-y-[-2px]'
      }`}
      aria-label={`Open ${label}`}
    >
      {/* Icon Graphic */}
      <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-fast group-hover:scale-105">
        {iconName === 'folder' && (
          <svg
            className="w-11 h-11 drop-shadow-md text-accent"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.5 5.5C2.5 4.39543 3.39543 3.5 4.5 3.5H9.08579C9.61627 3.5 10.125 3.71071 10.5 4.08579L12.4142 6H19.5C20.6046 6 21.5 6.89543 21.5 8V18.5C21.5 19.6046 20.6046 20.5 19.5 20.5H4.5C3.39543 20.5 2.5 19.6046 2.5 18.5V5.5Z" />
          </svg>
        )}

        {iconName === 'file-text' && (
          <div className="w-9 h-11 bg-surface-1 rounded border border-rule/60 shadow-md flex flex-col p-1.5 gap-1">
            <div className="w-4 h-1 bg-ink/40 rounded-full" />
            <div className="w-full h-0.5 bg-ink/20 rounded-full" />
            <div className="w-full h-0.5 bg-ink/20 rounded-full" />
            <div className="w-4/5 h-0.5 bg-ink/20 rounded-full" />
          </div>
        )}

        {iconName === 'book-open' && (
          <div className="w-10 h-10 rounded-lg bg-surface-1 border border-rule/60 shadow-md flex items-center justify-center text-ink-strong">
            <svg
              className="w-6 h-6 text-signature"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
        )}

        {iconName === 'terminal' && (
          <div className="w-10 h-10 rounded-lg bg-palette-ink-9 border border-rule/40 shadow-md flex items-center justify-center text-accent">
            <span className="font-mono text-xs font-bold">&gt;_</span>
          </div>
        )}

        {/* Indicator dot if window is currently open */}
        {isOpen && (
          <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-accent ring-2 ring-surface-0" />
        )}
      </div>

      {/* Label */}
      <span className="mt-1.5 text-xs font-mono text-ink-strong tracking-tight text-center truncate max-w-[76px] px-1 rounded group-hover:text-accent transition-colors">
        {label}
      </span>
    </button>
  );
}

