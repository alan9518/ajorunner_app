import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { useHomeStore } from "../../stores/useHomeStore";

export const WelcomePill = () => {
  const { loadFakeRoute } = useHomeStore();

  return (
    <TouchableWithoutFeedback onPress={loadFakeRoute}>
      <View className="w-full flex-row items-center bg-background-dark rounded-full px-4 py-4 mb-6">
        <View className="w-12 h-12 rounded-full border-2 border-gray-600 overflow-hidden mr-4">
          <Image
            source={require("@/assets/images/ajolote/user_pill_home.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
        <View className="flex-1 justify-center">
          <Text className="text-white font-lexend-bold text-base mb-1">
            "Let's swim... I mean run!"
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
