"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type {
  AppDefinition,
  OSAction,
  OSState,
  OSWindow,
  OSWindowId,
  OSWindowPosition,
  OSWindowSize,
  WallpaperStyle,
  MatrixColor,
  OSPreferences,
} from "@/features/os/os-types";

/* ------------------------------------------------------------------ */
/* App Registry                                                        */
/* ------------------------------------------------------------------ */

export const APP_REGISTRY: AppDefinition[] = [
  {
    id: "deployments",
    label: "Deployments",
    icon: "🚀",
    defaultSize: { width: 900, height: 600 },
    minSize: { width: 600, height: 400 },
  },
  {
    id: "career",
    label: "Career Journey",
    icon: "📈",
    defaultSize: { width: 800, height: 560 },
    minSize: { width: 500, height: 400 },
  },
  {
    id: "ai-lab",
    label: "AI Lab",
    icon: "🧪",
    defaultSize: { width: 800, height: 540 },
    minSize: { width: 500, height: 380 },
  },
  {
    id: "engineering-graph",
    label: "Engineering Graph",
    icon: "🕸️",
    defaultSize: { width: 800, height: 600 },
    minSize: { width: 500, height: 400 },
  },
  {
    id: "resume",
    label: "Resume",
    icon: "📄",
    defaultSize: { width: 760, height: 580 },
    minSize: { width: 480, height: 400 },
  },
  {
    id: "contact",
    label: "Contact",
    icon: "✉️",
    defaultSize: { width: 520, height: 440 },
    minSize: { width: 400, height: 340 },
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: "⌨️",
    defaultSize: { width: 700, height: 460 },
    minSize: { width: 500, height: 300 },
  },
  {
    id: "settings",
    label: "Settings",
    icon: "⚙️",
    defaultSize: { width: 520, height: 420 },
    minSize: { width: 400, height: 340 },
  },
];

export function getAppDefinition(appId: string): AppDefinition | undefined {
  return APP_REGISTRY.find((app) => app.id === appId);
}

/* ------------------------------------------------------------------ */
/* Initial State                                                       */
/* ------------------------------------------------------------------ */

const PREFERENCES_STORAGE_KEY = "anuragos-preferences";

const defaultPreferences: OSPreferences = {
  showDesktopIcons: true,
  restoreSession: true,
  fastBoot: false,
  reduceMotion: false,
  terminalAutoScroll: true,
  wallpaper: "rain",
  matrixColor: "cyan",
};

const initialState: OSState = {
  bootPhase: "idle",
  windows: [],
  activeWindowId: null,
  nextZIndex: 10,
  commandPaletteOpen: false,
  recruiterModeOpen: false,
  launchpadOpen: false,
  systemGuideOpen: true,
  wallpaper: "rain",
  matrixColor: "cyan",
  preferences: defaultPreferences,
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

let windowCounter = 0;

function generateWindowId(appId: string): string {
  windowCounter += 1;
  return `${appId}-${windowCounter}`;
}

function getSpawnPosition(existingWindows: OSWindow[]): OSWindowPosition {
  const base = { x: 80, y: 60 };
  const offset = (existingWindows.length % 8) * 28;
  return { x: base.x + offset, y: base.y + offset };
}

/* ------------------------------------------------------------------ */
/* Reducer                                                             */
/* ------------------------------------------------------------------ */

function osReducer(state: OSState, action: OSAction): OSState {
  switch (action.type) {
    case "BOOT_COMPLETE":
      return { ...state, bootPhase: "ready" };

    case "OPEN_WINDOW": {
      const appDef = getAppDefinition(action.appId);
      if (!appDef) return state;

      // Check if a window for this app already exists
      const existingWindow = state.windows.find(
        (w) => w.appId === action.appId && !w.minimized,
      );
      if (existingWindow) {
        // Focus it instead
        return {
          ...state,
          activeWindowId: existingWindow.id,
          preferences: { ...state.preferences, lastActiveAppId: action.appId },
          windows: state.windows.map((w) =>
            w.id === existingWindow.id
              ? { ...w, zIndex: state.nextZIndex, minimized: false }
              : w,
          ),
          nextZIndex: state.nextZIndex + 1,
        };
      }

      // Restore minimized window
      const minimizedWindow = state.windows.find(
        (w) => w.appId === action.appId && w.minimized,
      );
      if (minimizedWindow) {
        return {
          ...state,
          activeWindowId: minimizedWindow.id,
          preferences: { ...state.preferences, lastActiveAppId: action.appId },
          windows: state.windows.map((w) =>
            w.id === minimizedWindow.id
              ? { ...w, minimized: false, zIndex: state.nextZIndex }
              : w,
          ),
          nextZIndex: state.nextZIndex + 1,
        };
      }

      const newWindow: OSWindow = {
        id: generateWindowId(action.appId),
        appId: action.appId,
        title: action.title ?? appDef.label,
        position: getSpawnPosition(state.windows),
        size: appDef.defaultSize,
        minimized: false,
        maximized: false,
        zIndex: state.nextZIndex,
      };

      return {
        ...state,
        windows: [...state.windows, newWindow],
        activeWindowId: newWindow.id,
        preferences: { ...state.preferences, lastActiveAppId: action.appId },
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "CLOSE_WINDOW":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.windowId),
        activeWindowId:
          state.activeWindowId === action.windowId
            ? (state.windows
                .filter((w) => w.id !== action.windowId)
                .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null)
            : state.activeWindowId,
      };

    case "MINIMIZE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.windowId ? { ...w, minimized: true } : w,
        ),
        activeWindowId:
          state.activeWindowId === action.windowId
            ? (state.windows
                .filter((w) => w.id !== action.windowId && !w.minimized)
                .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null)
            : state.activeWindowId,
      };

    case "MAXIMIZE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.windowId
            ? { ...w, maximized: !w.maximized, zIndex: state.nextZIndex }
            : w,
        ),
        activeWindowId: action.windowId,
        nextZIndex: state.nextZIndex + 1,
      };

    case "FOCUS_WINDOW": {
      const targetWindow = state.windows.find(w => w.id === action.windowId);
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.windowId
            ? { ...w, zIndex: state.nextZIndex }
            : w,
        ),
        activeWindowId: action.windowId,
        preferences: targetWindow ? { ...state.preferences, lastActiveAppId: targetWindow.appId } : state.preferences,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "MOVE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.windowId ? { ...w, position: action.position } : w,
        ),
      };

    case "RESIZE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.windowId ? { ...w, size: action.size } : w,
        ),
      };

    case "TOGGLE_COMMAND_PALETTE":
      return {
        ...state,
        commandPaletteOpen: !state.commandPaletteOpen,
        recruiterModeOpen: false,
        launchpadOpen: false,
      };

    case "TOGGLE_RECRUITER_MODE":
      return {
        ...state,
        recruiterModeOpen: !state.recruiterModeOpen,
        commandPaletteOpen: false,
        launchpadOpen: false,
      };

    case "TOGGLE_LAUNCHPAD":
      return {
        ...state,
        launchpadOpen: !state.launchpadOpen,
        commandPaletteOpen: false,
        recruiterModeOpen: false,
      };

    case "TOGGLE_SYSTEM_GUIDE":
      return {
        ...state,
        systemGuideOpen: !state.systemGuideOpen,
      };


    case "SET_WALLPAPER": {
      const newPrefs = { ...state.preferences, wallpaper: action.wallpaper };
      return { ...state, wallpaper: action.wallpaper, preferences: newPrefs };
    }

    case "SET_MATRIX_COLOR": {
      const newPrefs = { ...state.preferences, matrixColor: action.color };
      return { ...state, matrixColor: action.color, preferences: newPrefs };
    }

    case "UPDATE_PREFERENCES": {
      const newPrefs = { ...state.preferences, ...action.payload };
      return {
        ...state,
        preferences: newPrefs,
        wallpaper: newPrefs.wallpaper,
        matrixColor: newPrefs.matrixColor,
      };
    }

    case "CLOSE_ALL_OVERLAYS":
      return {
        ...state,
        commandPaletteOpen: false,
        recruiterModeOpen: false,
        launchpadOpen: false,
      };

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

type OSContextValue = {
  state: OSState;
  openApp: (appId: string, title?: string) => void;
  closeWindow: (windowId: OSWindowId) => void;
  minimizeWindow: (windowId: OSWindowId) => void;
  maximizeWindow: (windowId: OSWindowId) => void;
  focusWindow: (windowId: OSWindowId) => void;
  moveWindow: (windowId: OSWindowId, position: OSWindowPosition) => void;
  resizeWindow: (windowId: OSWindowId, size: OSWindowSize) => void;
  toggleCommandPalette: () => void;
  toggleRecruiterMode: () => void;
  toggleLaunchpad: () => void;
  toggleSystemGuide: () => void;
  setWallpaper: (wallpaper: WallpaperStyle) => void;
  setMatrixColor: (color: MatrixColor) => void;
  updatePreferences: (payload: Partial<OSPreferences>) => void;
  closeAllOverlays: () => void;
  completeBoot: () => void;
};

const OSContext = createContext<OSContextValue | null>(null);

export function OSProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(osReducer, initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<OSPreferences>;
        dispatch({ type: "UPDATE_PREFERENCES", payload: parsed });
      }
    } catch (e) {
      console.error("Failed to load OS preferences", e);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(state.preferences));
    } catch (e) {
      console.error("Failed to save OS preferences", e);
    }
  }, [state.preferences, hydrated]);

  const openApp = useCallback(
    (appId: string, title?: string) =>
      dispatch({ type: "OPEN_WINDOW", appId, title }),
    [],
  );
  const closeWindow = useCallback(
    (windowId: OSWindowId) => dispatch({ type: "CLOSE_WINDOW", windowId }),
    [],
  );
  const minimizeWindow = useCallback(
    (windowId: OSWindowId) => dispatch({ type: "MINIMIZE_WINDOW", windowId }),
    [],
  );
  const maximizeWindow = useCallback(
    (windowId: OSWindowId) => dispatch({ type: "MAXIMIZE_WINDOW", windowId }),
    [],
  );
  const focusWindow = useCallback(
    (windowId: OSWindowId) => dispatch({ type: "FOCUS_WINDOW", windowId }),
    [],
  );
  const moveWindow = useCallback(
    (windowId: OSWindowId, position: OSWindowPosition) =>
      dispatch({ type: "MOVE_WINDOW", windowId, position }),
    [],
  );
  const resizeWindow = useCallback(
    (windowId: OSWindowId, size: OSWindowSize) =>
      dispatch({ type: "RESIZE_WINDOW", windowId, size }),
    [],
  );
  const toggleCommandPalette = useCallback(
    () => dispatch({ type: "TOGGLE_COMMAND_PALETTE" }),
    [],
  );
  const toggleRecruiterMode = useCallback(
    () => dispatch({ type: "TOGGLE_RECRUITER_MODE" }),
    [],
  );
  const toggleLaunchpad = useCallback(
    () => dispatch({ type: "TOGGLE_LAUNCHPAD" }),
    [],
  );
  const toggleSystemGuide = useCallback(
    () => dispatch({ type: "TOGGLE_SYSTEM_GUIDE" }),
    [],
  );
  const setWallpaper = useCallback(
    (wallpaper: WallpaperStyle) => dispatch({ type: "SET_WALLPAPER", wallpaper }),
    [],
  );
  const setMatrixColor = useCallback(
    (color: MatrixColor) => dispatch({ type: "SET_MATRIX_COLOR", color }),
    [],
  );
  const updatePreferences = useCallback(
    (payload: Partial<OSPreferences>) => dispatch({ type: "UPDATE_PREFERENCES", payload }),
    [],
  );
  const closeAllOverlays = useCallback(
    () => dispatch({ type: "CLOSE_ALL_OVERLAYS" }),
    [],
  );
  const completeBoot = useCallback(
    () => dispatch({ type: "BOOT_COMPLETE" }),
    [],
  );

  const value = useMemo<OSContextValue>(
    () => ({
      state,
      openApp,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      moveWindow,
      resizeWindow,
      toggleCommandPalette,
      toggleRecruiterMode,
      toggleLaunchpad,
      toggleSystemGuide,
      setWallpaper,
      setMatrixColor,
      updatePreferences,
      closeAllOverlays,
      completeBoot,
    }),
    [
      state,
      openApp,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      moveWindow,
      resizeWindow,
      toggleCommandPalette,
      toggleRecruiterMode,
      toggleLaunchpad,
      toggleSystemGuide,
      setWallpaper,
      setMatrixColor,
      updatePreferences,
      closeAllOverlays,
      completeBoot,
    ],
  );

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error("useOS must be used within OSProvider");
  }
  return context;
}
