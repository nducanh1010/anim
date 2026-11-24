export type WindowId =
  | 'works'
  | 'about'
  | 'journal'
  | 'terminal'
  | 'kinetic-type'
  | 'spatial-studio'
  | 'fluid-canvas'
  | 'fintech-system'
  | (string & {});

export interface WindowConfig {
  id: WindowId;
  title: string;
  iconName: string;
  label: string;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
  initiallyOpen?: boolean;
}

export interface WindowState extends WindowConfig {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface WindowContextValue {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  toggleWindow: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, position: { x: number; y: number }) => void;
  updateWindowSize: (id: WindowId, size: { width: number; height: number }) => void;
}

export const INITIAL_WINDOWS: Record<WindowId, WindowConfig> = {
  works: {
    id: 'works',
    title: 'Works — Selected Projects',
    label: 'Works',
    iconName: 'folder',
    defaultPosition: { x: 480, y: 46 },
    defaultSize: { width: 780, height: 530 },
    minSize: { width: 480, height: 380 },
    initiallyOpen: true,
  },
  about: {
    id: 'about',
    title: 'About.txt',
    label: 'About.txt',
    iconName: 'file-text',
    defaultPosition: { x: 60, y: 110 },
    defaultSize: { width: 540, height: 460 },
    minSize: { width: 360, height: 320 },
    initiallyOpen: false,
  },
  journal: {
    id: 'journal',
    title: 'Journal — Notes & Writing',
    label: 'Journal',
    iconName: 'book-open',
    defaultPosition: { x: 220, y: 90 },
    defaultSize: { width: 720, height: 500 },
    minSize: { width: 440, height: 360 },
    initiallyOpen: false,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal — zsh',
    label: 'Terminal.app',
    iconName: 'terminal',
    defaultPosition: { x: 280, y: 140 },
    defaultSize: { width: 580, height: 360 },
    minSize: { width: 400, height: 280 },
    initiallyOpen: false,
  },
  'kinetic-type': {
    id: 'kinetic-type',
    title: 'Kinetic Type.jpg — Preview',
    label: 'Kinetic Type',
    iconName: 'image',
    defaultPosition: { x: 400, y: 70 },
    defaultSize: { width: 540, height: 500 },
    minSize: { width: 380, height: 340 },
    initiallyOpen: false,
  },
  'spatial-studio': {
    id: 'spatial-studio',
    title: 'Spatial Studio.png — Preview',
    label: 'Spatial Studio',
    iconName: 'image',
    defaultPosition: { x: 470, y: 110 },
    defaultSize: { width: 540, height: 500 },
    minSize: { width: 380, height: 340 },
    initiallyOpen: false,
  },
  'fluid-canvas': {
    id: 'fluid-canvas',
    title: 'Fluid Canvas.jpg — Preview',
    label: 'Fluid Canvas',
    iconName: 'image',
    defaultPosition: { x: 340, y: 130 },
    defaultSize: { width: 540, height: 500 },
    minSize: { width: 380, height: 340 },
    initiallyOpen: false,
  },
  'fintech-system': {
    id: 'fintech-system',
    title: 'Fintech System.png — Preview',
    label: 'Fintech System',
    iconName: 'image',
    defaultPosition: { x: 260, y: 90 },
    defaultSize: { width: 540, height: 500 },
    minSize: { width: 380, height: 340 },
    initiallyOpen: false,
  },
};

