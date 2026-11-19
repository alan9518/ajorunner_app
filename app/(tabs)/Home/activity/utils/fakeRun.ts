import type { RoutePoint } from "../types/types";

/** Area enclosed by the fake route, in square meters. */
export const FAKE_RUN_AREA_SQ_M = 200;

/** Easy jogging pace: 2.5 m/s is about 9 km/h (6:40 min/km). */
export const FAKE_RUN_SPEED_MS = 2.5;

/** Time between emitted points. */
export const FAKE_RUN_POINT_INTERVAL_MS = 1000;

const EARTH_RADIUS_M = 6371000;

/**
 * Points of a square of FAKE_RUN_AREA_SQ_M that starts and finishes at
 * `start` (one corner of the square). It goes north, east, south, then west,
 * one point every FAKE_RUN_POINT_INTERVAL_MS at FAKE_RUN_SPEED_MS, and the
 * last point is exactly `start`.
 * Timestamps are left as 0: the caller stamps each point when it emits it.
 */
export const generateSquarePoints = (start: {
  latitude: number;
  longitude: number;
}): RoutePoint[] => {
  const side = Math.sqrt(FAKE_RUN_AREA_SQ_M);
  const perimeter = 4 * side;
  const stepM = FAKE_RUN_SPEED_MS * (FAKE_RUN_POINT_INTERVAL_MS / 1000);

  const metersToLat = (m: number) => (m / EARTH_RADIUS_M) * (180 / Math.PI);
  const metersToLon = (m: number) =>
    (m / (EARTH_RADIUS_M * Math.cos((start.latitude * Math.PI) / 180))) *
    (180 / Math.PI);

  // Offsets in meters (north, east) from the start corner, and the heading
  // of the edge, for a distance `d` walked along the perimeter.
  const positionAt = (d: number) => {
    if (d < side) return { north: d, east: 0, heading: 0 };
    if (d < 2 * side) return { north: side, east: d - side, heading: 90 };
    if (d < 3 * side)
      return { north: 3 * side - d, east: side, heading: 180 };
    return { north: 0, east: 4 * side - d, heading: 270 };
  };

  const points: RoutePoint[] = [];
  const steps = Math.ceil(perimeter / stepM);
  for (let i = 0; i <= steps; i++) {
    const d = Math.min(i * stepM, perimeter);
    // At the very end, snap to the start so the square closes exactly.
    const { north, east, heading } =
      d >= perimeter ? { north: 0, east: 0, heading: 270 } : positionAt(d);
    points.push({
      latitude: start.latitude + metersToLat(north),
      longitude: start.longitude + metersToLon(east),
      timestamp: 0,
      accuracy: 5,
      speed: FAKE_RUN_SPEED_MS,
      heading,
      altitude: null,
    });
  }
  return points;
};
