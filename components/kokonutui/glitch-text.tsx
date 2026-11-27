'use client';

import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function GlitchText({ text, className = '', speed = 3000 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      const timeout = setTimeout(() => {
        setIsGlitching(false);
      }, 350);
      return () => clearTimeout(timeout);
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div
      className={`relative inline-block select-none cursor-default font-display group ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {/* Base Text */}
      <span className="relative z-10 text-ink-strong">{text}</span>

      {/* Red Channel Split Layer */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 text-red-500/80 transition-opacity duration-75 pointer-events-none select-none ${
          isGlitching ? 'opacity-90 animate-pulse' : 'opacity-0'
        }`}
        style={{
          clipPath: isGlitching
            ? 'polygon(0 15%, 100% 15%, 100% 45%, 0 45%)'
            : 'none',
          transform: isGlitching ? 'translate(-2px, -1px)' : 'none',
        }}
      >
        {text}
      </span>

      {/* Cyan Channel Split Layer */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 text-cyan-400/80 transition-opacity duration-75 pointer-events-none select-none ${
          isGlitching ? 'opacity-90' : 'opacity-0'
        }`}
        style={{
          clipPath: isGlitching
            ? 'polygon(0 55%, 100% 55%, 100% 85%, 0 85%)'
            : 'none',
          transform: isGlitching ? 'translate(2px, 1px)' : 'none',
        }}
      >
        {text}
      </span>
    </div>
  );
}
