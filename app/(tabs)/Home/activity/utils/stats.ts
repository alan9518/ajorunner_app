import { RoutePoint, RunStats } from "../types";

export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const calculateDistance = (route: RoutePoint[]): number => {
  if (route.length < 2) return 0;
  let distance = 0;
  for (let i = 1; i < route.length; i++) {
    distance += getDistanceFromLatLonInKm(
      route[i - 1].latitude,
      route[i - 1].longitude,
      route[i].latitude,
      route[i].longitude,
    );
  }
  return distance;
};

export const calculateDuration = (route: RoutePoint[]): number => {
  if (route.length < 2) return 0;
  return route[route.length - 1].timestamp - route[0].timestamp;
};

export const calculateAveragePace = (distance: number, durationMs: number): number => {
  if (distance <= 0) return 0;
  const durationMinutes = durationMs / 1000 / 60;
  return durationMinutes / distance;
};

export const calculateAverageSpeed = (distance: number, durationMs: number): number => {
  if (durationMs <= 0) return 0;
  const durationHours = durationMs / 1000 / 60 / 60;
  return distance / durationHours;
};

export const calculateMaxAltitude = (route: RoutePoint[]): number => {
  if (route.length === 0) return 0;
  let max = route[0].altitude || 0;
  for (let i = 1; i < route.length; i++) {
    if (route[i].altitude !== null && route[i].altitude! > max) {
      max = route[i].altitude!;
    }
  }
  return max;
};

export const calculateRunStats = (route: RoutePoint[]): RunStats => {
  const distance = calculateDistance(route);
  const durationMs = calculateDuration(route);
  const pace = calculateAveragePace(distance, durationMs);
  const avgSpeed = calculateAverageSpeed(distance, durationMs);
  const maxAltitude = calculateMaxAltitude(route);

  return {
    distance,
    durationMs,
    pace,
    avgSpeed,
    maxAltitude,
  };
};
