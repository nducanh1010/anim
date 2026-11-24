'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface DesktopProjectItemProps {
  id: string;
  title: string;
  filename: string;
  image: string;
  defaultPosition: { x: number; y: number };
  dragConstraintsRef?: React.RefObject<HTMLDivElement | null>;
  isOpen?: boolean;
  onToggle: () => void;
}

export function DesktopProjectItem({
  title,
  filename,
  image,
  defaultPosition,
  dragConstraintsRef,
  isOpen = false,
  onToggle,
}: DesktopProjectItemProps) {
  const isDraggingRef = useRef<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Do not toggle if the user was dragging the card
    if (isDraggingRef.current) return;
    onToggle();
  };

  const isHighlighted = isHovered || isOpen;

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
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 80);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: defaultPosition.x,
        top: defaultPosition.y,
        touchAction: 'none',
        userSelect: 'none',
      }}
      className={`flex flex-col items-center select-none cursor-grab active:cursor-grabbing p-1 ${
        isHighlighted ? 'z-30' : 'z-10'
      }`}
      title={`${title} (Click to open / close)`}
    >
      {/* 
        Image Frame:
        Scale is tied to the parent-level isHovered state (synchronized with text).
        Hovering over text keeps the image scaled (no transform reset).
        Clean border + bg with spring physics, no shadow jumps.
      */}
      <motion.div
        animate={{ scale: isHovered ? 1.15 : 1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
        className="relative p-0.5 rounded-[4px] border border-white/50 bg-black/25 pointer-events-none"
      >
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[3px] overflow-hidden pointer-events-none">
          <Image
            src={image}
            alt={title}
            fill
            draggable={false}
            className="object-cover pointer-events-none select-none"
            sizes="120px"
          />
        </div>
      </motion.div>

      {/* 
        Mac Desktop File Label:
        Synchronized with image hover.
        transform: none to prevent any font rasterization / subpixel jitter.
        Smooth background transition to macOS Finder blue rgb(2, 88, 208).
      */}
      <div
        className={`mt-1.5 px-1.5 py-0.5 rounded-[3px] text-[11px] font-sans font-medium text-white [text-shadow:rgba(0,0,0,0.6)_1px_1px_2px] text-center max-w-[124px] truncate pointer-events-none transition-colors duration-150 ${
          isHighlighted ? 'bg-[#0258d0]' : 'bg-transparent'
        }`}
        style={{ transform: 'none' }}
      >
        {filename}
      </div>
    </motion.div>
  );
}
