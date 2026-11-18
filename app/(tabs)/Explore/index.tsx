import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-dark items-center justify-center">
      <Text className="text-white text-2xl font-lexend-bold">Explore</Text>
    </SafeAreaView>
  );
}
