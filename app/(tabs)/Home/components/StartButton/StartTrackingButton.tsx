import { colors } from "@/src/theme/colors";
import Feather from "@expo/vector-icons/Feather";
import { Text, TouchableOpacity, View } from "react-native";

export const StarTrackingButton = () => {
  return (
    <TouchableOpacity>
      <View className="bg-primary w-[100%] h-16 p-4 rounded-full flex-row items-center justify-start gap-x-4">
        <View className="bg-white rounded-[50%] w-10 h-10 flex items-center justify-center">
          <Feather name="play" size={18} color={colors.light.primary} />
        </View>

        <Text className="text-white text-center font-lexend-bold uppercase">
          Start Activity
        </Text>
      </View>
    </TouchableOpacity>
  );
};
