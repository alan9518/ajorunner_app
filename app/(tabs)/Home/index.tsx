import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GMapView } from "./components/GMapView/GMapView";
import { HomeHeader } from "./components/HomHeader/HomeHeader";

const Home = () => {
  return (
    <SafeAreaView className="relative flex-1 h-full m-0 p-0 items-center justify-center bg-background-dark">
      <View className="h-full w-full p-0 flex-1 ">
        <GMapView />
      </View>
      <View className="w-full absolute top-8 z-20">
        <HomeHeader />
      </View>
    </SafeAreaView>
  );
};

export default Home;
