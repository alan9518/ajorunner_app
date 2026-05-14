import { useRouter } from "expo-router";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useHomeStore } from "../../stores/useHomeStore";

export const TrackingModal = () => {
  const router = useRouter();
  const { setShowModal, setIsTracking, showModal, isTracking } = useHomeStore();

  return (
    <Modal visible={showModal} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/70 px-4">
        <View className="bg-background-dark w-full p-6 rounded-[32px] border border-gray-800">
          <Text className="text-white text-xl font-lexend-bold text-center mb-2">
            Stop Activity
          </Text>
          <Text className="text-gray-400 font-lexend text-center mb-6">
            Do you want to pause or finish your activity?
          </Text>

          <View className="flex-col gap-y-3">
            <TouchableOpacity
              className="bg-primary w-full h-14 rounded-full flex items-center justify-center"
              onPress={() => {
                setShowModal(false);
                setIsTracking(false);
                router.push("/(tabs)/Home/screens/Summary/Summary");
              }}
            >
              <Text className="text-white font-lexend-bold text-lg">
                Finish Run
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-800 w-full h-14 rounded-full flex items-center justify-center"
              onPress={() => {
                setShowModal(false);
                setIsTracking(false);
              }}
            >
              <Text className="text-white font-lexend-bold text-lg">Pause</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-full h-14 rounded-full flex items-center justify-center mt-2"
              onPress={() => setShowModal(false)}
            >
              <Text className="text-gray-400 font-lexend-bold text-lg">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
