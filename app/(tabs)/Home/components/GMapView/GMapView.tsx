import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetCurrentLocation } from "@/src/shared/hooks/useGetCurrentLocation";
import { useRequestLocationPermission } from "@/src/shared/hooks/useRequestLocationPermission";

export const GMapView = () => {
  const { status, requestPermission } = useRequestLocationPermission();
  const { region } = useGetCurrentLocation(status);

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
    <SafeAreaView className="w-full h-full flex-1">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation
        followsUserLocation
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
