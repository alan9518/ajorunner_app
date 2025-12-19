import { Image } from "expo-image";
import { View } from "react-native";

export const Avatar = () => {
  return (
    <View className="rounded-full border-2 border-gray-100 w-10 h-10 overflow-hidden">
      <Image
        source={require("@/assets/images/ajolote/ajolote_mascot.png")}
        contentFit="cover"
        className="rounded-full"
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};
