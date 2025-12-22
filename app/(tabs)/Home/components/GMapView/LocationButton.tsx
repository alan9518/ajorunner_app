import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";

interface LocationButtonProps {
  onPress?: () => void;
}

export const LocationButton = ({ onPress }: LocationButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="w-12 h-12 bg-background-dark rounded-full flex items-center justify-center">
        <Ionicons name="locate-outline" size={28} color="white" />
      </View>
    </TouchableOpacity>
  );
};
