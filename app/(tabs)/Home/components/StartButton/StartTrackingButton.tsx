import { colors } from "@/src/theme/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useHomeStore } from "../../stores/useHomeStore";
import { useTrackingRoute } from "./useTrackingRoute";

export const StarTrackingButton = () => {
  const { isTracking, setIsTracking, setShowModal } = useHomeStore();

  // Initialize tracking hook
  useTrackingRoute();

  const handlePress = () => {
    if (isTracking) {
      setShowModal(true);
    } else {
      setIsTracking(true);
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
            {isTracking ? "Stop Activity" : "Start Activity"}
          </Text>

          <View className="w-12 items-center justify-center">
            {!isTracking && (
              <FontAwesome5 name="chevron-right" size={16} color="white" />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
