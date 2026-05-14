import { View } from "react-native";
import { useHomeStore } from "../../stores/useHomeStore";
import { SelectorItem } from "./SelectorItem";

const ACTIVITIES = [
  {
    title: "Run",
    icon: "running",
  },
  {
    title: "Walk",
    icon: "walking",
    
  },
];

export const ActivitySelector = () => {
  const { selectedActivity, setSelectedActivity } = useHomeStore();

  return (
    <View className="w-full flex-row justify-around mb-4 bg-background-dark p-1 rounded-full">
      {ACTIVITIES.map((activity) => (
        <SelectorItem
          key={activity.title}
          title={activity.title}
          icon={activity.icon}
          isActive={selectedActivity === activity.title}
          onPress={() => setSelectedActivity(activity.title as "Run" | "Walk")}
        />
      ))}
    </View>
  );
};
