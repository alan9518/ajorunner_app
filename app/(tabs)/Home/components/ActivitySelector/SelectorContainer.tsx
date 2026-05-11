import { View } from "react-native";
import { SelectorItem } from "./SelectorItem";
const ACTIVITIES = [
  {
    title: "Run",
    isActive: true,
  },
  {
    title: "Walk",
    isActive: false,
  },
];

export const ActivitySelector = () => {
  return (
    <View className="w-full flex-row justify-around mb-4 bg-foreground-dark px-2 py-4 rounded-full">
      {ACTIVITIES.map((activity) => (
        <SelectorItem
          key={activity.title}
          title={activity.title}
          isActive={activity.isActive}
        />
      ))}
    </View>
  );
};
