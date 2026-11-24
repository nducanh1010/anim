'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useWindowManager } from '@/lib/os/window-context';
import { WindowId } from '@/lib/os/types';

interface WindowFrameProps {
  id: WindowId;
  children: React.ReactNode;
  dragConstraintsRef?: React.RefObject<HTMLDivElement | null>;
}

export function WindowFrame({ id, children, dragConstraintsRef }: WindowFrameProps) {
  const {
    windows,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
  } = useWindowManager();

  const win = windows[id];
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isMounted = Boolean(win && win.isOpen && !win.isMinimized);
  const isActive = activeWindowId === id;
  const isMaximized = win?.isMaximized ?? false;
  const isExpanded = isMaximized || isMobile;

  return (
    <AnimatePresence mode="wait">
      {isMounted && win && (
        <motion.div
          key={id}
          ref={windowRef}
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: 'spring',
              duration: 0.45,
              bounce: 0.15, // Apple's spring approach (Emil Kowalski)
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 10,
            transition: {
              duration: 0.16,
              ease: [0.32, 0.72, 0, 1], // Emil Kowalski iOS drawer curve
            },
          }}
          drag={!isExpanded}
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0.05}
          dragConstraints={dragConstraintsRef}
          onPointerDown={() => focusWindow(id)}
          style={{
            zIndex: win.zIndex,
            position: 'absolute',
            top: isExpanded ? 8 : win.position.y,
            left: isExpanded ? 8 : win.position.x,
            width: isExpanded ? 'calc(100% - 16px)' : win.size.width,
            height: isExpanded ? 'calc(100% - 16px)' : win.size.height,
            maxWidth: 'calc(100vw - 16px)',
            maxHeight: 'calc(100dvh - 3.5rem)',
          }}
          className={`pointer-events-auto flex flex-col rounded-xl overflow-hidden transition-shadow duration-fast ${
            isActive
              ? 'shadow-[0_24px_64px_-12px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.12)]'
              : 'shadow-[0_12px_36px_-8px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.06)] opacity-95'
          } bg-surface-0/90 dark:bg-palette-ink-9/90 backdrop-blur-2xl border border-rule/80 dark:border-white/10`}
        >
          {/* Title Bar (Drag Handle) */}
          <TitleBar
            id={id}
            title={win.title}
            isActive={isActive}
            isMaximized={isMaximized}
            onDragStart={(e) => dragControls.start(e)}
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
            onMaximize={() => maximizeWindow(id)}
          />

          {/* Window Content Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 text-ink selection:bg-accent/20">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface TitleBarProps {
  id: WindowId;
  title: string;
  isActive: boolean;
  isMaximized: boolean;
  onDragStart: (e: React.PointerEvent<HTMLDivElement>) => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

function TitleBar({
  title,
  isActive,
  isMaximized,
  onDragStart,
  onClose,
  onMinimize,
  onMaximize,
}: TitleBarProps) {
  return (
    <div
      onPointerDown={onDragStart}
      onDoubleClick={onMaximize}
      className={`h-10 px-3.5 flex items-center justify-between border-b select-none cursor-grab active:cursor-grabbing transition-colors duration-fast ${
        isActive
          ? 'bg-ink/5 dark:bg-white/5 border-rule/70 dark:border-white/10'
          : 'bg-transparent border-rule/40 dark:border-white/5'
      }`}
    >
      {/* Left: Traffic Lights (Clean Apple circles, no hover symbols) */}
      <div className="flex items-center gap-2 py-1">
        {/* Close (Red) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={`w-3 h-3 rounded-full transition-all duration-fast active:scale-90 ${
            isActive ? 'bg-[#ff5f57]' : 'bg-ink/20 dark:bg-white/20 hover:bg-[#ff5f57]'
          }`}
          aria-label="Close window"
        />

        {/* Minimize (Yellow) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          className={`w-3 h-3 rounded-full transition-all duration-fast active:scale-90 ${
            isActive ? 'bg-[#febc2e]' : 'bg-ink/20 dark:bg-white/20 hover:bg-[#febc2e]'
          }`}
          aria-label="Minimize window"
        />

        {/* Maximize (Green) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMaximize();
          }}
          className={`w-3 h-3 rounded-full transition-all duration-fast active:scale-90 ${
            isActive ? 'bg-[#28c840]' : 'bg-ink/20 dark:bg-white/20 hover:bg-[#28c840]'
          }`}
          aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
        />
      </div>

      {/* Center: Title */}
      <div className="flex items-center justify-center flex-1 mx-3 truncate">
        <span
          className={`text-xs font-mono tracking-tight truncate ${
            isActive ? 'text-ink-strong font-medium' : 'text-ink-mute'
          }`}
        >
          {title}
        </span>
      </div>

      {/* Right spacer for symmetrical centering */}
      <div className="w-12 flex justify-end">
        {isMaximized && (
          <span className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">
            Expanded
          </span>
        )}
      </div>
    </div>
  );
}
