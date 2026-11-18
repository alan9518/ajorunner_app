import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";

export const SettingsButton = () => {
  return (
    <TouchableOpacity>
      <View className="w-10 h-10 bg-background-dark rounded-full flex items-center justify-center">
        <Ionicons name="settings-outline" size={28} color="white" />
      </View>
    </TouchableOpacity>
  );
};
