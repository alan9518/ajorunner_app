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
          paddingTop: 12,
          paddingBottom: 24,
        },
        tabBarItemStyle: tabBarItemStyle,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.dark.accent,
        tabBarInactiveTintColor: colors.dark.inactiveTab,
        tabBarLabelStyle: {
          fontFamily: "Lexend_700Bold",
          fontSize: 10,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FeatherIcons
              name="home"
              size={24}
              color={focused ? colors.dark.accent : colors.dark.inactiveTab}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Explore/index"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FeatherIcons
              name="map"
              size={24}
              color={focused ? colors.dark.accent : colors.dark.inactiveTab}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="History/index"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FeatherIcons
              name="clock"
              size={24}
              color={focused ? colors.dark.accent : colors.dark.inactiveTab}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile/index"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FeatherIcons
              name="user"
              size={24}
              color={focused ? colors.dark.accent : colors.dark.inactiveTab}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
