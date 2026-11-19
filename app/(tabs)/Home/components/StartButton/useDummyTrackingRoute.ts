import * as Location from "expo-location";
import { useCallback, useEffect, useRef } from "react";
import {
  RoutePoint,
  useActivityStore,
} from "../../activity/stores/useActivityStore";
import {
  FAKE_RUN_POINT_INTERVAL_MS,
  generateSquarePoints,
} from "../../activity/utils/fakeRun";

/**
 * Dummy counterpart of useTrackingRoute: instead of watching the GPS, it
 * emits a 200 m² square route that starts and finishes at the user's current
 * position, at a jogging pace, while the current run is "running".
 */
export const useDummyTrackingRoute = () => {
  const currentRun = useActivityStore((state) => state.currentRun);
  const startRun = useActivityStore((state) => state.startRun);
  const addRoutePoint = useActivityStore((state) => state.addRoutePoint);

  const isTracking = currentRun?.status === "running";

  const pointsRef = useRef<RoutePoint[]>([]);
  const indexRef = useRef(0);

  const startDummyRun = useCallback(async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission not granted");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      pointsRef.current = generateSquarePoints({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      indexRef.current = 0;

      startRun();
    } catch (error) {
      console.error("Error starting dummy route tracking:", error);
    }
  }, [startRun]);

  useEffect(() => {
    if (!isTracking) return;

    const emitNextPoint = () => {
      const point = pointsRef.current[indexRef.current];
      if (!point) return false;
      indexRef.current += 1;
      addRoutePoint({ ...point, timestamp: Date.now() });
      return true;
    };

    emitNextPoint();
    const interval = setInterval(() => {
      if (!emitNextPoint()) clearInterval(interval);
    }, FAKE_RUN_POINT_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isTracking, addRoutePoint]);

  return { startDummyRun };
};
