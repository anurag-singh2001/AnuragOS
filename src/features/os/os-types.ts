
export type OSWindowId = string;

export type OSWindowPosition = {
  x: number;
  y: number;
};

export type OSWindowSize = {
  width: number;
  height: number;
};

export type OSWindow = {
  id: OSWindowId;
  appId: string;
  title: string;
  position: OSWindowPosition;
  size: OSWindowSize;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
};

export type AppDefinition = {
  id: string;
  label: string;
  icon: string;
  defaultSize: OSWindowSize;
  minSize?: OSWindowSize;
};

export type DesktopShortcut = {
  id: string;
  label: string;
  icon: string;
  appId: string;
  meta?: string;
};

export type BootPhase = "idle" | "booting" | "ready";

export type WallpaperStyle = "rain" | "grid" | "void";
export type MatrixColor = "cyan" | "green" | "amber" | "red";

export interface OSPreferences {
  showDesktopIcons: boolean;
  restoreSession: boolean;
  fastBoot: boolean;
  reduceMotion: boolean;
  terminalAutoScroll: boolean;
  wallpaper: WallpaperStyle;
  matrixColor: MatrixColor;
  lastActiveAppId?: string;
}

export interface OSState {
  bootPhase: BootPhase;
  windows: OSWindow[];
  activeWindowId: OSWindowId | null;
  nextZIndex: number;
  commandPaletteOpen: boolean;
  recruiterModeOpen: boolean;
  launchpadOpen: boolean;
  systemGuideOpen: boolean;
  wallpaper: WallpaperStyle;
  matrixColor: MatrixColor;
  preferences: OSPreferences;
}

export type OSAction =
  | { type: "BOOT_COMPLETE" }
  | { type: "OPEN_WINDOW"; appId: string; title?: string }
  | { type: "CLOSE_WINDOW"; windowId: OSWindowId }
  | { type: "MINIMIZE_WINDOW"; windowId: OSWindowId }
  | { type: "MAXIMIZE_WINDOW"; windowId: OSWindowId }
  | { type: "FOCUS_WINDOW"; windowId: OSWindowId }
  | { type: "MOVE_WINDOW"; windowId: OSWindowId; position: OSWindowPosition }
  | { type: "RESIZE_WINDOW"; windowId: OSWindowId; size: OSWindowSize }
  | { type: "TOGGLE_COMMAND_PALETTE" }
  | { type: "TOGGLE_RECRUITER_MODE" }
  | { type: "TOGGLE_LAUNCHPAD" }
  | { type: "TOGGLE_SYSTEM_GUIDE" }
  | { type: "SET_WALLPAPER"; wallpaper: WallpaperStyle }
  | { type: "SET_MATRIX_COLOR"; color: MatrixColor }
  | { type: "UPDATE_PREFERENCES"; payload: Partial<OSPreferences> }
  | { type: "CLOSE_ALL_OVERLAYS" };
