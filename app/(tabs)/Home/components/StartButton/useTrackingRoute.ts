import * as Location from "expo-location";
import { useEffect, useRef } from "react";

import { RoutePoint, useHomeStore } from "../../stores/useHomeStore";

export const useTrackingRoute = () => {
  const { isTracking, addRoutePoint } = useHomeStore();

  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    const startTracking = async () => {
      try {
        // Prevent duplicate subscriptions
        if (subscriptionRef.current) {
          return;
        }

        // Check permissions
        const { status } = await Location.getForegroundPermissionsAsync();

        if (status !== "granted") {
          console.warn("Location permission not granted");
          return;
        }

        // Start GPS tracking
        subscriptionRef.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,

            // Update every second
            timeInterval: 1000,

            // Or every meter moved
            distanceInterval: 1,

            // Android-specific
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

    const stopTracking = () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };

    if (isTracking) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      stopTracking();
    };
  }, [isTracking, addRoutePoint]);
};
