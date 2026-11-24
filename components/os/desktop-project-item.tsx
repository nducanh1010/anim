'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface DesktopProjectItemProps {
  id: string;
  title: string;
  filename: string;
  image: string;
  defaultPosition: { x: number; y: number };
  dragConstraintsRef?: React.RefObject<HTMLDivElement | null>;
  onOpen: () => void;
}

export function DesktopProjectItem({
  title,
  filename,
  image,
  defaultPosition,
  dragConstraintsRef,
  onOpen,
}: DesktopProjectItemProps) {
  const lastClickRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDraggingRef.current) return;

    const now = Date.now();
    // Double click detection (~320ms window)
    if (now - lastClickRef.current < 320) {
      onOpen();
    }
    lastClickRef.current = now;
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDraggingRef.current) {
      onOpen();
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={dragConstraintsRef}
      onDragStart={() => {
        isDraggingRef.current = true;
      }}
      onDragEnd={() => {
        // Small delay to prevent drag release from triggering onClick
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 80);
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{
        position: 'absolute',
        left: defaultPosition.x,
        top: defaultPosition.y,
        touchAction: 'none',
        userSelect: 'none',
      }}
      className="z-10 flex flex-col items-center group cursor-grab active:cursor-grabbing select-none"
      title={`${title} (Double-click to open)`}
    >
      {/* Photo Frame / Mac Image Preview File with pure CSS hover to eliminate transform fighting */}
      <div className="relative w-28 h-20 sm:w-32 sm:h-24 rounded-lg overflow-hidden bg-surface-1/95 p-1 border border-rule/70 dark:border-white/20 shadow-[0_6px_16px_rgba(0,0,0,0.18)] group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.28)] group-hover:scale-[1.02] transition-all duration-150 ease-out pointer-events-none">
        <div className="relative w-full h-full rounded overflow-hidden bg-surface-2 pointer-events-none">
          <Image
            src={image}
            alt={title}
            fill
            draggable={false}
            className="object-cover pointer-events-none select-none"
            sizes="130px"
          />
        </div>
      </div>

      {/* Mac Desktop File Label */}
      <div className="mt-1.5 px-2 py-0.5 rounded-md bg-surface-0/85 dark:bg-palette-ink-9/85 backdrop-blur-md border border-rule/40 text-[11px] font-mono text-ink-strong shadow-sm group-hover:bg-accent group-hover:text-white transition-colors duration-fast truncate max-w-[124px] pointer-events-none">
        {filename}
      </div>
    </motion.div>
  );
}
