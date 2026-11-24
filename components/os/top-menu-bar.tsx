'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '@/lib/os/window-context';
import { WindowId } from '@/lib/os/types';
import { ThemeToggle } from '@/components/theme-toggle';

export function TopMenuBar() {
  const { windows, activeWindowId, toggleWindow, openWindow } = useWindowManager();
  const [mounted, setMounted] = useState(false);
  const [timeStr, setTimeStr] = useState<string>('');
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const appleMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const timeFormatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);
      setTimeStr(timeFormatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  // Close Apple menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (appleMenuRef.current && !appleMenuRef.current.contains(e.target as Node)) {
        setAppleMenuOpen(false);
      }
    };
    if (appleMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [appleMenuOpen]);

  const menuItems: { id: WindowId; label: string }[] = [
    { id: 'works', label: 'Works' },
    { id: 'about', label: 'About' },
    { id: 'journal', label: 'Journal' },
    { id: 'terminal', label: 'Terminal' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] h-9 border-b border-rule/40 bg-surface-0/75 backdrop-blur-xl px-3 flex items-center justify-between text-xs font-mono select-none">
      {/* Left: Apple Icon & System Menu */}
      <div className="flex items-center gap-1 sm:gap-2">
        <div ref={appleMenuRef} className="relative">
          <button
            onClick={() => setAppleMenuOpen(!appleMenuOpen)}
            className={`px-2 py-1 rounded text-ink-strong hover:bg-ink/10 transition-colors duration-fast active:scale-95 flex items-center justify-center ${
              appleMenuOpen ? 'bg-ink/15' : ''
            }`}
            title="Apple System Menu"
            aria-label="Apple Menu"
          >
            {/* Apple Logo SVG */}
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 170 170"
            >
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.71-7.92-12.03-14.52-5.46-8.39-9.82-17.84-13.08-28.36-3.26-10.51-4.89-20.76-4.89-30.73 0-14.42 3.65-26.04 10.95-34.85 7.3-8.81 16.48-13.32 27.54-13.54 4.58 0 9.8 1.17 15.66 3.51 5.86 2.34 9.61 3.59 11.26 3.75 1.76-.23 5.75-1.54 11.97-3.92 6.22-2.38 11.51-3.41 15.87-3.09 12.08.75 21.73 5.17 28.94 13.25-10.51 6.38-15.66 15.22-15.45 26.51.21 8.81 3.54 16.22 9.99 22.23 6.45 6.01 14.19 9.55 23.23 10.62-2.24 6.74-4.89 13.43-7.95 20.07zM119.22 31.84c0-7.3 2.66-14.18 7.98-20.64 5.32-6.46 11.97-10.52 19.95-12.2-1.06 7.42-3.83 14.24-8.31 20.46-4.48 6.22-10.87 10.36-19.17 12.43-.11-.05-.45.1-.45-.05z" />
            </svg>
          </button>

          {/* Apple Dropdown Menu (Origin-Aware Emil Rule) */}
          <AnimatePresence>
            {appleMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
                style={{ transformOrigin: 'top left' }}
                className="absolute top-8 left-0 w-48 py-1.5 rounded-xl bg-surface-0/90 dark:bg-palette-ink-9/90 backdrop-blur-2xl border border-rule/60 dark:border-white/10 shadow-2xl z-[110] text-xs font-mono"
              >
                <button
                  onClick={() => {
                    openWindow('about');
                    setAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-fast flex items-center justify-between"
                >
                  <span>About This Folio</span>
                </button>
                <button
                  onClick={() => {
                    openWindow('works');
                    setAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-fast"
                >
                  <span>Selected Projects</span>
                </button>
                <button
                  onClick={() => {
                    openWindow('terminal');
                    setAppleMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-fast"
                >
                  <span>Open Terminal...</span>
                </button>

                <div className="h-px bg-rule/40 dark:bg-white/10 my-1 mx-2" />

                <div className="px-3 py-1 text-[10px] text-ink-faint flex items-center justify-between">
                  <span>Version</span>
                  <span>macOS Folio 2.0</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => toggleWindow('about')}
          className="px-2 py-1 rounded font-display font-bold text-ink-strong tracking-tight hover:bg-ink/10 transition-colors duration-fast active:scale-95 hidden xs:block"
          title="Creative Technologist"
        >
          anhnd<span className="text-accent">.</span>
        </button>

        <div className="h-3.5 w-px bg-rule/50 mx-1 hidden sm:block" />

        {/* Quick App launcher tabs in menu bar */}
        <nav aria-label="Quick launch" className="hidden sm:flex items-center gap-0.5">
          {menuItems.map((item) => {
            const win = windows[item.id];
            const isActive = activeWindowId === item.id;
            const isOpen = win?.isOpen && !win?.isMinimized;

            return (
              <button
                key={item.id}
                onClick={() => toggleWindow(item.id)}
                className={`px-2 py-0.5 rounded transition-all duration-fast flex items-center gap-1.5 active:scale-95 ${
                  isActive
                    ? 'bg-ink/15 text-ink-strong font-medium shadow-sm'
                    : isOpen
                    ? 'text-ink-strong hover:bg-ink/10'
                    : 'text-ink-mute hover:text-ink-strong hover:bg-ink/5'
                }`}
              >
                {isOpen && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right: Status Pill, Time, Theme */}
      <div className="flex items-center gap-3">
        {/* Availability status */}
        <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-ok/10 text-ok border border-ok/20 text-[11px]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ok opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-ok" />
          </span>
          <span>Available for work</span>
        </div>

        {/* Live Clock (HCMC GMT+7) */}
        <div className="text-ink-mute text-[11px] tabular-nums tracking-tight">
          {mounted && timeStr ? (
            <span>
              {timeStr} <span className="text-ink-faint hidden sm:inline">(GMT+7)</span>
            </span>
          ) : (
            <span>HCMC</span>
          )}
        </div>

        <div className="h-3.5 w-px bg-rule/50" />

        <ThemeToggle />
      </div>
    </header>
  );
}

