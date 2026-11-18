import { colors } from "@/src/theme/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useActivityStore } from "../../activity/stores/useActivityStore";
import { useTrackingRoute } from "./useTrackingRoute";

export const StarTrackingButton = () => {
  const { setShowModal, currentRun, startRun, resumeRun } = useActivityStore();

  // Initialize tracking hook
  useTrackingRoute();

  const isTracking = currentRun?.status === "running";
  const isPaused = currentRun?.status === "paused";
  const hasRun = !!currentRun;

  const handlePress = () => {
    if (isTracking) {
      setShowModal(true);
    } else if (isPaused) {
      resumeRun();
    } else {
      startRun();
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        className="w-full mt-4"
        onPress={handlePress}
      >
        <View
          className={`${isTracking ? "bg-red-500" : "bg-primary"} w-full h-16 px-3 rounded-full flex-row items-center justify-between`}
          style={{
            shadowColor: isTracking
              ? colors.light.primary
              : colors.light.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 15,
            elevation: 10,
          }}
        >
          <View className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
            {isTracking ? (
              <FontAwesome5
                name="square"
                solid
                size={16}
                color={colors.light.primary}
              />
            ) : (
              <FontAwesome5
                name="play"
                size={16}
                color={colors.light.primary}
                style={{ marginLeft: 4 }}
              />
            )}
          </View>

          <Text className="text-white text-lg font-lexend-bold uppercase tracking-widest flex-1 text-center">
            {isTracking
              ? "Stop Activity"
              : isPaused
                ? "Resume Activity"
                : "Start Activity"}
          </Text>

          <View className="w-12 items-center justify-center">
            {!isTracking && (
              <FontAwesome5 name="chevron-right" size={16} color="white" />
            )}
          </View>
        </View>
      </TouchableOpacity>

      {/* <Modal visible={showModal} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/70 px-4">
          <View className="bg-background-dark w-full p-6 rounded-[32px] border border-gray-800">
            <Text className="text-white text-xl font-lexend-bold text-center mb-2">
              Stop Activity
            </Text>
            <Text className="text-gray-400 font-lexend text-center mb-6">
              Do you want to pause or finish your activity?
            </Text>

            <View className="flex-col gap-y-3">
              <TouchableOpacity
                className="bg-primary w-full h-14 rounded-full flex items-center justify-center"
                onPress={() => {
                  setShowModal(false);
                  finishRun();
                  router.push("/(tabs)/Home/screens/Summary/Summary");
                }}
              >
                <Text className="text-white font-lexend-bold text-lg">
                  Finish Run
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-gray-800 w-full h-14 rounded-full flex items-center justify-center"
                onPress={() => {
                  setShowModal(false);
                  pauseRun();
                }}
              >
                <Text className="text-white font-lexend-bold text-lg">
                  Pause
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-full h-14 rounded-full flex items-center justify-center mt-2"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-gray-400 font-lexend-bold text-lg">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
    </>
  );
};
