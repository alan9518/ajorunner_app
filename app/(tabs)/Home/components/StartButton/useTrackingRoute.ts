import * as Location from "expo-location";
import { useEffect, useRef } from "react";
import {
  RoutePoint,
  useActivityStore,
} from "../../activity/stores/useActivityStore";

export const useTrackingRoute = () => {
  const { currentRun, addRoutePoint } = useActivityStore();

  const isTracking = currentRun?.status === "running";

  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    const startTrackingLocation = async () => {
      try {
        if (subscriptionRef.current) return;

        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Location permission not granted");
          return;
        }

        subscriptionRef.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 1,
            mayShowUserSettingsDialog: true,
          },
          (location) => {
            const { coords, timestamp } = location;
            console.log("🚀 ~ startTracking ~ location:", location);

            const point: RoutePoint = {
              latitude: coords.latitude,
              longitude: coords.longitude,
              timestamp,
              accuracy: coords.accuracy,
              speed: coords.speed,
              heading: coords.heading,
              altitude: coords.altitude,
            };

            addRoutePoint(point);
          },
        );
      } catch (error) {
        console.error("Error starting route tracking:", error);
      }
    };

    const stopTrackingLocation = () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };

    if (isTracking) {
      startTrackingLocation();
    } else {
      stopTrackingLocation();
    }

    return () => {
      stopTrackingLocation();
    };
  }, [isTracking, addRoutePoint]);
};
