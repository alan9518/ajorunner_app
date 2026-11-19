import { useCallback, useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { Circle, PROVIDER_GOOGLE, Polyline } from "react-native-maps";

import { useGetCurrentLocation } from "@/src/shared/hooks/useGetCurrentLocation";
import { useRequestLocationPermission } from "@/src/shared/hooks/useRequestLocationPermission";
import { colors } from "@/src/theme/colors";
import { useActivityStore } from "../../activity/stores/useActivityStore";
import { LocationButton } from "./LocationButton";
import { useFollowRoute } from "./useFollowRoute";

export const GMapView = () => {
  const mapRef = useRef<MapView>(null);

  const { status, requestPermission } = useRequestLocationPermission();
  console.log("🚀 ~ GMapView ~ status:", status);
  const { region } = useGetCurrentLocation(status);
  console.log("🚀 ~ GMapView ~ region:", region);
  const route = useActivityStore(
    (state) => state.currentRun?.route || undefined,
  );

  useFollowRoute(mapRef, route);

  const startPoint = route?.[0];
  const currentPoint = route?.[route.length - 1];

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
      >
        {route && route.length > 0 && (
          <Polyline
            coordinates={route}
            strokeColor={colors.light.primary} // Orange line for the route
            strokeWidth={4}
          />
        )}
        {startPoint && (
          <Circle
            center={startPoint}
            radius={1}
            fillColor="white"
            strokeColor={colors.light.primary}
            strokeWidth={2}
          />
        )}
        {currentPoint && route && route.length > 1 && (
          <Circle
            center={currentPoint}
            radius={1.2}
            fillColor={colors.light.primary}
            strokeColor="white"
            strokeWidth={2}
          />
        )}
      </MapView>
      <View className="absolute top-80 right-4">
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
