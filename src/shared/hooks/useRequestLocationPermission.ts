import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

export type PermissionsLocationStatus = "granted" | "denied" | "undetermined";

export const useRequestLocationPermission = () => {
  const [status, setStatus] =
    useState<PermissionsLocationStatus>("undetermined");
  const [error, setError] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setStatus(status);
      return status;
    } catch (error) {
      setError(error as string);
      return "denied";
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      setStatus(status);
    })();
  }, []);

  return {
    status,
    error,
    requestPermission,
  };
};
