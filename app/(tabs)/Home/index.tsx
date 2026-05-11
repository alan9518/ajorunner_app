import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActivityContainer } from "./components/ActivityContainer/ActivityContainer";
import { GMapView } from "./components/GMapView/GMapView";
import { HomeHeader } from "./components/HomeHeader/HomeHeader";

const Home = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="relative flex-1 h-full m-0 p-0 items-center justify-center bg-background-dark">
        <View className="h-full w-full p-0 flex-1 ">
          <GMapView />
        </View>
        <View className="w-full absolute top-8 z-20">
          <HomeHeader />
        </View>
        <ActivityContainer />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
