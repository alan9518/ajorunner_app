import { create } from "zustand";
// import { ActivityType, RoutePoint, Run } from "../types";
import { generateFakeRun } from "../utils/fakeRun";
import { calculateRunStats } from "../utils/stats";

type ActivityType = "Run" | "Walk";

export type RoutePoint = {
  latitude: number;
  longitude: number;
  timestamp: number;
  accuracy: number | null;
  speed: number | null;
  heading: number | null;
  altitude: number | null;
};

export type RunStatus =
  | "idle"
  | "running"
  | "paused"
  | "completed"
  | "syncing"
  | "synced"
  | "failed";

export interface Run {
  id: string;

  activityType: ActivityType;

  startedAt: number | null;
  endedAt?: number | null;

  status: RunStatus;

  route: RoutePoint[];

  stats: {
    distanceMeters: number;
    durationMs: number;
    avgPace: number;
    avgSpeed: number;
    maxAltitude: number;
  };

  createdAt: number;
  updatedAt: number;

  synced: boolean;
}

interface ActivityState {
  // Domain state
  currentRun: Run | null;
  completedRuns: Run[];

  // UI state
  showModal: boolean;
  selectedActivity: ActivityType; // Replacing from old HomeStore

  // Actions
  setShowModal: (show: boolean) => void;
  setSelectedActivity: (activity: ActivityType) => void;

  // Run lifecycle
  startRun: () => void;
  pauseRun: () => void;
  resumeRun: () => void;
  finishRun: () => void;
  addRoutePoint: (point: RoutePoint) => void;
  clearCurrentRun: () => void;

  // Utilities
  loadFakeRun: () => void;
}

const createInitialRun = (activityType: ActivityType): Run => ({
  id: Math.random().toString(36).substring(2, 9),
  activityType,
  startedAt: Date.now(),
  endedAt: null,
  status: "running",
  route: [],
  stats: {
    distanceMeters: 0,
    durationMs: 0,
    avgPace: 0,
    avgSpeed: 0,
    maxAltitude: 0,
  },
  createdAt: Date.now(),
  updatedAt: Date.now(),
  synced: false,
});

export const useActivityStore = create<ActivityState>((set, get) => ({
  currentRun: null,
  completedRuns: [],
  showModal: false,
  selectedActivity: "Run",

  setShowModal: (show) => set({ showModal: show }),
  setSelectedActivity: (activity) => set({ selectedActivity: activity }),

  startRun: () => {
    const { selectedActivity } = get();
    set({ currentRun: createInitialRun(selectedActivity) });
  },

  pauseRun: () => {
    set((state) => {
      if (!state.currentRun) return state;
      return {
        currentRun: {
          ...state.currentRun,
          status: "paused",
          updatedAt: Date.now(),
        },
      };
    });
  },

  resumeRun: () => {
    set((state) => {
      if (!state.currentRun) return state;
      return {
        currentRun: {
          ...state.currentRun,
          status: "running",
          updatedAt: Date.now(),
        },
      };
    });
  },

  finishRun: () => {
    set((state) => {
      if (!state.currentRun) return state;

      const finishedRun: Run = {
        ...state.currentRun,
        status: "completed",
        endedAt: Date.now(),
        updatedAt: Date.now(),
        stats: calculateRunStats(state.currentRun.route), // Final calc
      };

      return {
        currentRun: finishedRun,
        completedRuns: [...state.completedRuns, finishedRun],
      };
    });
  },

  addRoutePoint: (point) => {
    set((state) => {
      if (!state.currentRun || state.currentRun.status !== "running")
        return state;

      const updatedRoute = [...state.currentRun.route, point];
      return {
        currentRun: {
          ...state.currentRun,
          route: updatedRoute,
          stats: calculateRunStats(updatedRoute), // live calc or can be deferred
          updatedAt: Date.now(),
        },
      };
    });
  },

  clearCurrentRun: () => {
    set({ currentRun: null });
  },

  loadFakeRun: () => {
    set((state) => {
      const fakeRun = generateFakeRun(state.selectedActivity);
      console.log("🚀 ~ fakeRun:", fakeRun);
      return {
        currentRun: fakeRun,
        completedRuns: [...state.completedRuns, fakeRun],
      };
    });
  },
}));
