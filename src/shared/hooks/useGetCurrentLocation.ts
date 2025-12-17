import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { PermissionsLocationStatus } from "./useRequestLocationPermission";

export type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export const useGetCurrentLocation = (
  permissionStatus: PermissionsLocationStatus
) => {
  const [region, setRegion] = useState<Region | null>(null);
  useEffect(() => {
    if (permissionStatus !== "granted") return;

    (async () => {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, [permissionStatus]);

  return {
    region,
  };
};
