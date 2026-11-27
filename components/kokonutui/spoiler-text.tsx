'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpoilerTextProps {
  children: React.ReactNode;
  revealText?: string;
  className?: string;
  defaultRevealed?: boolean;
}

export function SpoilerText({
  children,
  revealText = 'Click to reveal cause of death',
  className = '',
  defaultRevealed = false,
}: SpoilerTextProps) {
  const [isRevealed, setIsRevealed] = useState(defaultRevealed);

  return (
    <div
      onClick={() => setIsRevealed((prev) => !prev)}
      className={`relative inline-block rounded-md transition-all duration-300 cursor-pointer group ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsRevealed((prev) => !prev);
        }
      }}
      aria-expanded={isRevealed}
    >
      {/* Content Layer */}
      <div
        className={`transition-all duration-300 ${
          isRevealed
            ? 'filter-none opacity-100 select-text'
            : 'filter blur-[5px] opacity-25 select-none pointer-events-none'
        }`}
      >
        {children}
      </div>

      {/* Mask Overlay when Hidden */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center bg-surface-2/80 dark:bg-palette-ink-8/80 backdrop-blur-[2px] rounded-md border border-dashed border-rule/80 px-2 py-1 text-[11px] font-mono text-ink-mute group-hover:text-ink-strong group-hover:border-ink/40 transition-colors"
          >
            <span className="flex items-center gap-1.5 tracking-tight">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500/80 animate-ping" />
              <span>{revealText}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
