import { create } from "zustand";

type ActivityType = "Run" | "Walk";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export type RoutePoint = {
  latitude: number;
  longitude: number;
  timestamp: number;
  accuracy: number | null;
  speed: number | null;
  heading: number | null;
  altitude: number | null;
};

interface HomeState {
  selectedActivity: ActivityType;
  isTracking: boolean;
  route: RoutePoint[];
  showModal: boolean;
  setSelectedActivity: (activity: ActivityType) => void;
  setIsTracking: (isTracking: boolean) => void;
  addRoutePoint: (point: RoutePoint) => void;
  clearRoute: () => void;
  setShowModal: (value: boolean) => void;
  loadFakeRoute: () => void;
}

const generateFakeRun = (): RoutePoint[] => {
  const points: RoutePoint[] = [];

  // Guadalajara downtown
  let lat = 20.6736;
  let lon = -103.344;

  const startTime = Date.now() - 5 * 60 * 1000;

  for (let i = 0; i < 60; i++) {
    // Create a square/block path

    if (i < 15) {
      lat += 0.0001; // North
    } else if (i < 30) {
      lon += 0.0001; // East
    } else if (i < 45) {
      lat -= 0.0001; // South
    } else {
      lon -= 0.0001; // West
    }

    points.push({
      latitude: lat,
      longitude: lon,
      timestamp: startTime + i * 5000,
      accuracy: 5,
      speed: 2.5,
      heading: 0,
      altitude: 1560, // Guadalajara altitude
    });
  }

  return points;
};

const initialState: HomeState = {
  selectedActivity: "Run",
  isTracking: false,
  route: [],
  showModal: false,
  setSelectedActivity: () => {},
  setIsTracking: () => {},
  addRoutePoint: () => {},
  clearRoute: () => {},
  setShowModal: () => {},
  loadFakeRoute: () => {},
};

export const useHomeStore = create<HomeState>((set) => ({
  ...initialState,
  setSelectedActivity: (activity) => set({ selectedActivity: activity }),
  setIsTracking: (isTracking) => set({ isTracking }),
  addRoutePoint: (point) =>
    set((state) => ({ route: [...state.route, point] })),
  clearRoute: () => set({ route: [] }),
  setShowModal: (showModal) => set({ showModal }),
  loadFakeRoute: () => set({ route: generateFakeRun() }),
}));
