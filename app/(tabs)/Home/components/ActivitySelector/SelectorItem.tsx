import { Text, TouchableOpacity, View } from "react-native";

interface SelectorItemProps {
  title: string;
  isActive?: boolean;
}
export const SelectorItem = ({ title, isActive }: SelectorItemProps) => {
  return (
    <TouchableOpacity className="w-1/2 h-12 flex-row items-center justify-center">
      <View
        className={`h-full p-2 rounded-full font-lexend-bold ${isActive ? "bg-primary w-full" : ""}`}
      >
        <Text className={isActive ? "text-white" : "text-gray-400"}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
