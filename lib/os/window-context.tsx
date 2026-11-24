'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  WindowId,
  WindowState,
  WindowContextValue,
  INITIAL_WINDOWS,
} from './types';

const WindowContext = createContext<WindowContextValue | null>(null);

function createInitialState(): Record<WindowId, WindowState> {
  const result = {} as Record<WindowId, WindowState>;
  const entries = Object.entries(INITIAL_WINDOWS) as [WindowId, typeof INITIAL_WINDOWS[WindowId]][];

  for (const [id, config] of entries) {
    result[id] = {
      ...config,
      isOpen: !!config.initiallyOpen,
      isMinimized: false,
      isMaximized: false,
      zIndex: config.initiallyOpen ? 10 : 1,
      position: { ...config.defaultPosition },
      size: { ...config.defaultSize },
    };
  }

  return result;
}

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(createInitialState);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>('works');
  const [topZIndex, setTopZIndex] = useState<number>(10);

  const focusWindow = useCallback((id: WindowId) => {
    setTopZIndex((prevTop) => {
      const nextZ = prevTop + 1;
      setWindows((prev) => {
        if (!prev[id]) return prev;
        return {
          ...prev,
          [id]: {
            ...prev[id],
            zIndex: nextZ,
            isMinimized: false,
          },
        };
      });
      setActiveWindowId(id);
      return nextZ;
    });
  }, []);

  const openWindow = useCallback(
    (id: WindowId) => {
      setTopZIndex((prevTop) => {
        const nextZ = prevTop + 1;
        setWindows((prev) => {
          if (!prev[id]) return prev;
          return {
            ...prev,
            [id]: {
              ...prev[id],
              isOpen: true,
              isMinimized: false,
              zIndex: nextZ,
            },
          };
        });
        setActiveWindowId(id);
        return nextZ;
      });
    },
    []
  );

  const closeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        if (!prev[id]) return prev;
        const next = {
          ...prev,
          [id]: {
            ...prev[id],
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
          },
        };

        // Determine next active window
        if (activeWindowId === id) {
          const remainingOpen = Object.values(next).filter(
            (w) => w.isOpen && !w.isMinimized && w.id !== id
          );
          if (remainingOpen.length > 0) {
            remainingOpen.sort((a, b) => b.zIndex - a.zIndex);
            setActiveWindowId(remainingOpen[0].id);
          } else {
            setActiveWindowId(null);
          }
        }

        return next;
      });
    },
    [activeWindowId]
  );

  const minimizeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        if (!prev[id]) return prev;
        const next = {
          ...prev,
          [id]: {
            ...prev[id],
            isMinimized: true,
          },
        };

        // Transfer active focus to next highest window
        if (activeWindowId === id) {
          const remainingOpen = Object.values(next).filter(
            (w) => w.isOpen && !w.isMinimized && w.id !== id
          );
          if (remainingOpen.length > 0) {
            remainingOpen.sort((a, b) => b.zIndex - a.zIndex);
            setActiveWindowId(remainingOpen[0].id);
          } else {
            setActiveWindowId(null);
          }
        }

        return next;
      });
    },
    [activeWindowId]
  );

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMaximized: !prev[id].isMaximized,
        },
      };
    });
  }, []);

  const toggleWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        const target = prev[id];
        if (!target) return prev;

        if (!target.isOpen) {
          // Open and focus
          openWindow(id);
          return prev;
        }

        if (target.isMinimized) {
          // Unminimize and focus
          focusWindow(id);
          return prev;
        }

        if (activeWindowId === id) {
          // Already active, minimize it
          minimizeWindow(id);
          return prev;
        }

        // Open but not active -> focus it
        focusWindow(id);
        return prev;
      });
    },
    [activeWindowId, focusWindow, openWindow, minimizeWindow]
  );

  const updateWindowPosition = useCallback((id: WindowId, position: { x: number; y: number }) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          position,
        },
      };
    });
  }, []);

  const updateWindowSize = useCallback((id: WindowId, size: { width: number; height: number }) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          size,
        },
      };
    });
  }, []);

  const value = useMemo<WindowContextValue>(
    () => ({
      windows,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      toggleWindow,
      updateWindowPosition,
      updateWindowSize,
    }),
    [
      windows,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      toggleWindow,
      updateWindowPosition,
      updateWindowSize,
    ]
  );

  return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>;
}

export function useWindowManager(): WindowContextValue {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowProvider');
  }
  return context;
}

