import { colors } from "@/src/theme/colors";
import FeatherIcons from "@expo/vector-icons/Feather";
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
          backgroundColor: colors.dark.background,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: "hidden",
          position: "absolute",
          borderTopWidth: 0,
          paddingTop: 20,
        },
        tabBarItemStyle: tabBarItemStyle,
      }}
    >
      <Tabs.Screen
        name="Home/index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <FeatherIcons
              name="home"
              size={22}
              color={focused ? colors.dark.accent : "white"}
              className="w-full h-full"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
