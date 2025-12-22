import { useCallback, useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { useGetCurrentLocation } from "@/src/shared/hooks/useGetCurrentLocation";
import { useRequestLocationPermission } from "@/src/shared/hooks/useRequestLocationPermission";
import { LocationButton } from "./LocationButton";

export const GMapView = () => {
  const mapRef = useRef<MapView>(null);

  const { status, requestPermission } = useRequestLocationPermission();
  const { region } = useGetCurrentLocation(status);

  const onCenterPress = useCallback(() => {
    if (!mapRef.current || !region) return;
    mapRef.current.animateToRegion(region, 500);
  }, [mapRef, region]);

  if (status !== "granted") {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Location permission required</Text>
        <Button title="Enable location" onPress={requestPermission} />
      </View>
    );
  }
  if (!region) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Fetching location...</Text>
      </View>
    );
  }
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        ref={mapRef}
      />
      <View className="absolute bottom-28 right-4">
        <LocationButton onPress={onCenterPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 0,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
