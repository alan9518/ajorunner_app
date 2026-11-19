import { RefObject, useEffect } from "react";
import MapView from "react-native-maps";
import { RoutePoint } from "../../activity/stores/useActivityStore";

const FOLLOW_ZOOM = 19;
const FOLLOW_ANIMATION_MS = 900;

/**
 * Keeps the map camera on the latest point of the route while a run is
 * being tracked, zoomed in enough to see the route being drawn.
 */
export const useFollowRoute = (
  mapRef: RefObject<MapView | null>,
  route: RoutePoint[] | undefined,
) => {
  const lastPoint = route?.[route.length - 1];

  useEffect(() => {
    if (!lastPoint || !mapRef.current) return;
    mapRef.current.animateCamera(
      {
        center: {
          latitude: lastPoint.latitude,
          longitude: lastPoint.longitude,
        },
        zoom: FOLLOW_ZOOM,
      },
      { duration: FOLLOW_ANIMATION_MS },
    );
  }, [lastPoint, mapRef]);
};
