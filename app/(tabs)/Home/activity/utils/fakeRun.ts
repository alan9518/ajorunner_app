import { Run, RoutePoint, ActivityType } from "../types";
import { calculateRunStats } from "./stats";

export const generateFakeRun = (activityType: ActivityType = "Run"): Run => {
  const points: RoutePoint[] = [];
  // Guadalajara downtown approximate coordinates
  let lat = 20.676667;
  let lon = -103.3475;
  const startTime = Date.now() - 5 * 60 * 1000; // 5 mins ago

  for (let i = 0; i < 60; i++) {
    // 60 points = 5 minutes if each point is 5s apart. Moving in a block shape.
    if (i < 15) lat += 0.0002; // North
    else if (i < 30) lon += 0.0002; // East
    else if (i < 45) lat -= 0.0002; // South
    else lon -= 0.0002; // West

    points.push({
      latitude: lat,
      longitude: lon,
      timestamp: startTime + i * 5000, // +5 seconds per point
      accuracy: 5,
      speed: 2.5, // 2.5 m/s
      heading: 0,
      altitude: 1566, // Guadalajara approximate altitude
    });
  }

  const run: Run = {
    id: Math.random().toString(36).substring(2, 9),
    activityType,
    startedAt: points[0].timestamp,
    endedAt: points[points.length - 1].timestamp,
    status: "completed",
    route: points,
    stats: calculateRunStats(points),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    synced: false,
  };

  return run;
};
