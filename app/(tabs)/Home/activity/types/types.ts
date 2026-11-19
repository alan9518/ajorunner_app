export type ActivityType = "Run";

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

export interface RunStats {
  distanceMeters: number;
  durationMs: number;
  /** minutes per km */
  avgPace: number;
  /** km per hour */
  avgSpeed: number;
  maxAltitude: number;
}

export interface Run {
  id: string;
  activityType: ActivityType;
  startedAt: number | null;
  endedAt?: number | null;
  status: RunStatus;
  route: RoutePoint[];
  stats: RunStats;
  createdAt: number;
  updatedAt: number;
  synced: boolean;
}
