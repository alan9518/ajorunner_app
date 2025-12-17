import { Tabs } from "expo-router";

const _Layout = () => {
  return (
    <Tabs>
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
