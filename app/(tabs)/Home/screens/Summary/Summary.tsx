import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/src/shared/components/header";
import { HeaderLeft } from "@/src/shared/components/header/Header";
import { colors } from "@/src/theme/colors";
import { useActivityStore } from "../../activity/stores/useActivityStore";

// Helper to format ms into mm:ss
const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default function SummaryScreen() {
  const router = useRouter();
  const { currentRun, completedRuns, clearCurrentRun } = useActivityStore();

  // If there's a finished run in currentRun, use it, otherwise use the last completed run
  const runToDisplay = currentRun || completedRuns[completedRuns.length - 1];

  const mapRegion = useMemo(() => {
    if (!runToDisplay || runToDisplay.route.length === 0) return undefined;

    // Find min/max to center map
    const lats = runToDisplay.route.map((p) => p.latitude);
    const lons = runToDisplay.route.map((p) => p.longitude);
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
  }, [runToDisplay]);

  const handleClose = () => {
    clearCurrentRun(); // Reset the tracking route
    router.back();
  };

  if (!runToDisplay) return null;

  const stats = runToDisplay.stats;
  const route = runToDisplay.route;

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
        {stats && (
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
                {stats?.distanceMeters?.toFixed(2)} km
              </Text>
            </View>

            <View className="w-[48%] bg-gray-800 p-4 rounded-3xl mb-4 items-center">
              <FontAwesome5
                name="stopwatch"
                size={24}
                color={colors.light.primary}
                className="mb-2"
              />
              <Text className="text-gray-400 font-lexend text-sm mt-2">
                Time
              </Text>
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
                {formatTime(stats.avgPace * 60 * 1000)} /km
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
        )}

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
