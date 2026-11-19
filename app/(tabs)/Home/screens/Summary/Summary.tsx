import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/src/shared/components/header";
import { HeaderLeft } from "@/src/shared/components/header/Header";
import { colors } from "@/src/theme/colors";
import { useActivityStore } from "../../activity/stores/useActivityStore";

// Smallest map span (degrees, about 100 m) so very short routes stay visible
const MIN_MAP_DELTA = 0.001;

export default function SummaryScreen() {
  const router = useRouter();
  const { currentRun, completedRuns, clearCurrentRun } = useActivityStore();
  console.log("🚀 ~ SummaryScreen ~ currentRun:", currentRun);

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
      latitudeDelta: Math.max((maxLat - minLat) * 1.5, MIN_MAP_DELTA),
      longitudeDelta: Math.max((maxLon - minLon) * 1.5, MIN_MAP_DELTA),
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

        {/* Stats Container: recorded values, 2 decimals */}
        {stats && (
          <View className=" mt-8 flex-row flex-wrap justify-between">
            {[
              {
                label: "Distance",
                icon: "route",
                value: `${stats.distanceMeters.toFixed(2)} m`,
              },
              {
                label: "Time",
                icon: "stopwatch",
                value: `${(stats.durationMs / 1000).toFixed(2)} s`,
              },
              {
                label: "Avg Pace",
                icon: "tachometer-alt",
                value: `${stats.avgPace.toFixed(2)} min/km`,
              },
              {
                label: "Avg Speed",
                icon: "running",
                value: `${stats.avgSpeed.toFixed(2)} km/h`,
              },
            ].map((stat) => (
              <View
                key={stat.label}
                className="w-[48%] bg-gray-800 p-4 rounded-3xl mb-4 items-center"
              >
                <FontAwesome5
                  name={stat.icon}
                  size={24}
                  color={colors.light.primary}
                  className="mb-2"
                />
                <Text className="text-gray-400 font-lexend text-sm mt-2">
                  {stat.label}
                </Text>
                <Text
                  className="text-white font-lexend-bold text-xl"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {stat.value}
                </Text>
              </View>
            ))}
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
