import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/src/shared/components/header";
import { HeaderLeft } from "@/src/shared/components/header/Header";
import { colors } from "@/src/theme/colors";
import { useHomeStore } from "../../stores/useHomeStore";

// Helper to calculate distance between two coordinates in km
const getDistanceFromLatLonInKm = (
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

// Helper to format ms into mm:ss
const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default function SummaryScreen() {
  const router = useRouter();
  const { route, clearRoute } = useHomeStore();
  console.log("🚀 ~ SummaryScreen ~ route:", route);

  const stats = useMemo(() => {
    if (route.length < 2) {
      return {
        distance: 0,
        durationMs: 0,
        pace: 0,
        avgSpeed: 0,
        maxAltitude: 0,
      };
    }

    let distance = 0;
    let maxAltitude = route[0].altitude || 0;

    // Sum distance between points
    for (let i = 1; i < route.length; i++) {
      const prev = route[i - 1];
      const curr = route[i];
      distance += getDistanceFromLatLonInKm(
        prev.latitude,
        prev.longitude,
        curr.latitude,
        curr.longitude,
      );
      if (curr.altitude && curr.altitude > maxAltitude) {
        maxAltitude = curr.altitude;
      }
    }

    // Duration based on timestamps
    const durationMs = route[route.length - 1].timestamp - route[0].timestamp;

    // Pace: minutes per km
    const durationMinutes = durationMs / 1000 / 60;
    const pace = distance > 0 ? durationMinutes / distance : 0;

    // Avg speed: m/s to km/h
    const avgSpeed = distance > 0 ? distance / (durationMinutes / 60) : 0;

    return { distance, durationMs, pace, avgSpeed, maxAltitude };
  }, [route]);

  const mapRegion = useMemo(() => {
    if (route.length === 0) return undefined;

    // Find min/max to center map
    const lats = route.map((p) => p.latitude);
    const lons = route.map((p) => p.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLon + maxLon) / 2,
      latitudeDelta: (maxLat - minLat) * 1.5 || 0.01,
      longitudeDelta: (maxLon - minLon) * 1.5 || 0.01,
    };
  }, [route]);

  const handleClose = () => {
    clearRoute(); // Reset the tracking route
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-dark px-4">
      <Header>
        <HeaderLeft>
          <Text className="text-white text-2xl font-lexend-bold">
            Run Summary
          </Text>
        </HeaderLeft>
      </Header>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Map View */}
        <View className="w-full h-64 rounded-3xl overflow-hidden mt-2">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1, width: "100%" }}
            region={mapRegion}
            scrollEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
          >
            {route.length > 0 && (
              <Polyline
                coordinates={route}
                strokeColor={colors.light.primary}
                strokeWidth={5}
              />
            )}
          </MapView>
        </View>

        {/* Stats Container */}
        <View className=" mt-8 flex-row flex-wrap justify-between">
          <View className="w-[48%] bg-gray-800 p-4 rounded-3xl mb-4 items-center">
            <FontAwesome5
              name="route"
              size={24}
              color={colors.light.primary}
              className="mb-2"
            />
            <Text className="text-gray-400 font-lexend text-sm mt-2">
              Distance
            </Text>
            <Text className="text-white font-lexend-bold text-xl">
              {stats.distance.toFixed(2)} km
            </Text>
          </View>

          <View className="w-[48%] bg-gray-800 p-4 rounded-3xl mb-4 items-center">
            <FontAwesome5
              name="stopwatch"
              size={24}
              color={colors.light.primary}
              className="mb-2"
            />
            <Text className="text-gray-400 font-lexend text-sm mt-2">Time</Text>
            <Text className="text-white font-lexend-bold text-xl">
              {formatTime(stats.durationMs)}
            </Text>
          </View>

          <View className="w-[48%] bg-gray-800 p-4 rounded-3xl mb-4 items-center">
            <FontAwesome5
              name="tachometer-alt"
              size={24}
              color={colors.light.primary}
              className="mb-2"
            />
            <Text className="text-gray-400 font-lexend text-sm mt-2">
              Avg Pace
            </Text>
            <Text className="text-white font-lexend-bold text-xl">
              {formatTime(stats.pace * 60 * 1000)} /km
            </Text>
          </View>

          <View className="w-[48%] bg-gray-800 p-4 rounded-3xl mb-4 items-center">
            <FontAwesome5
              name="mountain"
              size={24}
              color={colors.light.primary}
              className="mb-2"
            />
            <Text className="text-gray-400 font-lexend text-sm mt-2">
              Max Elev.
            </Text>
            <Text className="text-white font-lexend-bold text-xl">
              {stats.maxAltitude.toFixed(0)} m
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-primary mx-4 mt-4 h-16 rounded-full flex items-center justify-center"
          onPress={handleClose}
        >
          <Text className="text-white font-lexend-bold text-lg">DONE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
