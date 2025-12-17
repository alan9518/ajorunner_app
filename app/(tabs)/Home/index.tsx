import { View } from "react-native";
import { GMapView } from "./components/GMapView/GMapView";
const Home = () => {
  return (
    <View className="flex-1 h-full m-0 p-0 items-center justify-center dark:bg-background-dark bg-background">
      <GMapView />
    </View>
  );
};

export default Home;
