"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type {
  FocusArea,
  SystemStatus,
  WorkspaceMemory,
  WorkspaceModule,
  WorkspaceOverlay,
  WorkspaceState,
} from "@/features/workspace/workspace-types";

const STORAGE_KEY = "anuragos.workspace.memory.v2";
const RECENT_DEPLOYMENT_LIMIT = 3;

const defaultMemory: WorkspaceMemory = {
  lastOpenedModule: "deployments",
  recentlyViewedDeploymentIds: [],
  currentFocusArea: "enterprise-systems",
};

const initialState: WorkspaceState = {
  bootState: "complete",
  activeModule: "deployments",
  activeOverlay: "none",
  activeInspector: "none",
  selectedDeploymentId: null,
  selectedCareerEventId: null,
  currentFocusArea: "enterprise-systems",
  systemStatus: "module.deployments.active",
  memory: defaultMemory,
  hydrated: false,
};

type WorkspaceAction =
  | { type: "hydrate"; memory: WorkspaceMemory }
  | { type: "setModule"; module: WorkspaceModule }
  | { type: "setOverlay"; overlay: WorkspaceOverlay }
  | { type: "clearOverlay" }
  | { type: "selectDeployment"; deploymentId: string | null }
  | { type: "selectCareerEvent"; careerEventId: string | null }
  | { type: "resetWorkspace" };

type WorkspaceContextValue = {
  state: WorkspaceState;
  setActiveModule: (module: WorkspaceModule) => void;
  setActiveOverlay: (overlay: WorkspaceOverlay) => void;
  clearOverlay: () => void;
  selectDeployment: (deploymentId: string | null) => void;
  selectCareerEvent: (careerEventId: string | null) => void;
  resetWorkspace: () => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

const focusByModule: Record<WorkspaceModule, FocusArea> = {
  overview: "overview",
  deployments: "enterprise-systems",
  career: "career-journey",
  aiLab: "ai-systems",
  resume: "career-journey",
  contact: "contact-ready",
  terminal: "terminal",
};

const statusByModule: Record<WorkspaceModule, SystemStatus> = {
  overview: "workspace.ready",
  deployments: "module.deployments.active",
  career: "module.career.active",
  aiLab: "module.aiLab.active",
  resume: "module.resume.active",
  contact: "module.contact.active",
  terminal: "module.terminal.active",
};

const statusByOverlay: Partial<Record<WorkspaceOverlay, SystemStatus>> = {
  launchpad: "launchpad.open",
  commandPalette: "command.palette.open",
  recruiterMode: "mode.recruiter.active",
  terminalDrawer: "terminal.drawer.open",
};

const focusByDeploymentId: Record<string, FocusArea> = {
  "energy-crm-platform": "enterprise-systems",
  "multi-tenant-crm-platform": "distributed-systems",
  "pdf-rag-system": "ai-systems",
  "ai-ticket-assistant": "ai-systems",
  agrimart: "enterprise-systems",
  "ai-resume-analyzer": "ai-systems",
};

function isWorkspaceModule(value: unknown): value is WorkspaceModule {
  return (
    value === "overview" ||
    value === "deployments" ||
    value === "career" ||
    value === "aiLab" ||
    value === "resume" ||
    value === "contact" ||
    value === "terminal"
  );
}

function isFocusArea(value: unknown): value is FocusArea {
  return (
    value === "overview" ||
    value === "enterprise-systems" ||
    value === "distributed-systems" ||
    value === "ai-systems" ||
    value === "career-journey" ||
    value === "recruiter-evaluation" ||
    value === "contact-ready" ||
    value === "terminal"
  );
}

function parseMemory(rawValue: string | null): WorkspaceMemory {
  if (!rawValue) {
    return defaultMemory;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<WorkspaceMemory>;
    const lastOpenedModule = isWorkspaceModule(parsed.lastOpenedModule)
      ? parsed.lastOpenedModule
      : defaultMemory.lastOpenedModule;
    const currentFocusArea = isFocusArea(parsed.currentFocusArea)
      ? parsed.currentFocusArea
      : focusByModule[lastOpenedModule];
    const recentlyViewedDeploymentIds = Array.isArray(parsed.recentlyViewedDeploymentIds)
      ? parsed.recentlyViewedDeploymentIds
          .filter((deploymentId): deploymentId is string => typeof deploymentId === "string")
          .slice(0, RECENT_DEPLOYMENT_LIMIT)
      : [];

    return {
      lastOpenedModule,
      recentlyViewedDeploymentIds,
      currentFocusArea,
    };
  } catch {
    return defaultMemory;
  }
}

function buildMemory(
  state: WorkspaceState,
  updates: Partial<WorkspaceMemory> = {},
): WorkspaceMemory {
  return {
    lastOpenedModule: updates.lastOpenedModule ?? state.memory.lastOpenedModule,
    recentlyViewedDeploymentIds:
      updates.recentlyViewedDeploymentIds ?? state.memory.recentlyViewedDeploymentIds,
    currentFocusArea: updates.currentFocusArea ?? state.memory.currentFocusArea,
  };
}

function workspaceReducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  switch (action.type) {
    case "hydrate": {
      const restoredModule = action.memory.lastOpenedModule;
      const restoredFocus = action.memory.currentFocusArea;

      return {
        ...state,
        activeModule: restoredModule,
        currentFocusArea: restoredFocus,
        systemStatus: statusByModule[restoredModule],
        memory: action.memory,
        hydrated: true,
      };
    }

    case "setModule": {
      const currentFocusArea = focusByModule[action.module];
      const memory = buildMemory(state, {
        lastOpenedModule: action.module,
        currentFocusArea,
      });

      return {
        ...state,
        activeModule: action.module,
        activeOverlay: "none",
        currentFocusArea,
        systemStatus: statusByModule[action.module],
        memory,
      };
    }

    case "setOverlay": {
      const systemStatus = statusByOverlay[action.overlay] ?? statusByModule[state.activeModule];
      const currentFocusArea =
        action.overlay === "recruiterMode" ? "recruiter-evaluation" : state.currentFocusArea;

      return {
        ...state,
        activeOverlay: action.overlay,
        currentFocusArea,
        systemStatus,
      };
    }

    case "clearOverlay":
      return {
        ...state,
        activeOverlay: "none",
        currentFocusArea: state.memory.currentFocusArea,
        systemStatus: statusByModule[state.activeModule],
      };

    case "selectDeployment": {
      const recentlyViewedDeploymentIds = action.deploymentId
        ? [
            action.deploymentId,
            ...state.memory.recentlyViewedDeploymentIds.filter(
              (deploymentId) => deploymentId !== action.deploymentId,
            ),
          ].slice(0, RECENT_DEPLOYMENT_LIMIT)
        : state.memory.recentlyViewedDeploymentIds;
      const currentFocusArea = action.deploymentId
        ? (focusByDeploymentId[action.deploymentId] ?? state.currentFocusArea)
        : focusByModule.deployments;
      const memory = buildMemory(state, {
        recentlyViewedDeploymentIds,
        currentFocusArea,
      });

      return {
        ...state,
        selectedDeploymentId: action.deploymentId,
        activeInspector: action.deploymentId ? "deployment" : "none",
        currentFocusArea,
        systemStatus: action.deploymentId
          ? "inspector.deployment.open"
          : statusByModule.deployments,
        memory,
      };
    }

    case "selectCareerEvent":
      return {
        ...state,
        selectedCareerEventId: action.careerEventId,
        activeInspector: action.careerEventId ? "careerEvent" : "none",
        systemStatus: statusByModule.career,
      };

    case "resetWorkspace":
      return {
        ...initialState,
        hydrated: true,
      };

    default:
      return state;
  }
}

export function WorkspaceStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(workspaceReducer, initialState);

  useEffect(() => {
    const memory = parseMemory(window.localStorage.getItem(STORAGE_KEY));
    dispatch({ type: "hydrate", memory });
  }, []);

  useEffect(() => {
    if (!state.hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.memory));
  }, [state.hydrated, state.memory]);

  const setActiveModule = useCallback((module: WorkspaceModule) => {
    dispatch({ type: "setModule", module });
  }, []);

  const setActiveOverlay = useCallback((overlay: WorkspaceOverlay) => {
    dispatch({ type: "setOverlay", overlay });
  }, []);

  const clearOverlay = useCallback(() => {
    dispatch({ type: "clearOverlay" });
  }, []);

  const selectDeployment = useCallback((deploymentId: string | null) => {
    dispatch({ type: "selectDeployment", deploymentId });
  }, []);

  const selectCareerEvent = useCallback((careerEventId: string | null) => {
    dispatch({ type: "selectCareerEvent", careerEventId });
  }, []);

  const resetWorkspace = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "resetWorkspace" });
  }, []);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      state,
      setActiveModule,
      setActiveOverlay,
      clearOverlay,
      selectDeployment,
      selectCareerEvent,
      resetWorkspace,
    }),
    [
      state,
      setActiveModule,
      setActiveOverlay,
      clearOverlay,
      selectDeployment,
      selectCareerEvent,
      resetWorkspace,
    ],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspaceState() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspaceState must be used within WorkspaceStateProvider");
  }

  return context;
}
