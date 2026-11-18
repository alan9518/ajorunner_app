import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

interface SelectorItemProps {
  title: string;
  icon: any;
  isActive?: boolean;
  onPress: () => void;
}
export const SelectorItem = ({ title, icon, isActive, onPress }: SelectorItemProps) => {
  return (
    <TouchableOpacity 
      className={`flex-1 mx-1 h-12 flex-row items-center justify-center rounded-full ${isActive ? "bg-primary" : ""}`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <FontAwesome5
        name={icon}
        size={18}
        color={isActive ? "white" : "#9ca3af"}
        style={{ marginRight: 8 }}
      />
      <Text className={`font-lexend-bold text-base ${isActive ? "text-white" : "text-gray-400"}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
