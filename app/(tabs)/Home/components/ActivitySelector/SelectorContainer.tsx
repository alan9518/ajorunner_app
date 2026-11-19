import { View } from "react-native";
import { useActivityStore } from "../../activity/stores/useActivityStore";
import { ActivityType } from "../../activity/types/types";
import { SelectorItem } from "./SelectorItem";

const ACTIVITIES: { title: ActivityType; icon: string }[] = [
  {
    title: "Run",
    icon: "running",
  },
];

export const ActivitySelector = () => {
  const { selectedActivity, setSelectedActivity } = useActivityStore();

  return (
    <View className="w-full flex-row justify-around mb-4 bg-background-dark p-1 rounded-full">
      {ACTIVITIES.map((activity) => (
        <SelectorItem
          key={activity.title}
          title={activity.title}
          icon={activity.icon}
          isActive={selectedActivity === activity.title}
          onPress={() => setSelectedActivity(activity.title)}
        />
      ))}
    </View>
  );
};
