import { Tabs } from "expo-router";
import { ViewStyle } from "react-native";
const tabBarItemStyle: ViewStyle = {
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 90,
          backgroundColor: "#18181B",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: "hidden",
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarItemStyle: tabBarItemStyle,
      }}
    >
      <Tabs.Screen
        name="Home/index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _Layout;
