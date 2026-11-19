import { colors } from "@/src/theme/colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { StarTrackingButton } from "../StartButton/StartTrackingButton";
import { WelcomePill } from "../WelcomePill/WelcomePill";

export const ActivityContainer = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["32%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      index={0}
      enableDynamicSizing={false}
      enablePanDownToClose={false}
      backgroundStyle={{
        backgroundColor: colors.dark.border,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      handleIndicatorStyle={{ backgroundColor: colors.dark.inactiveTab }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View className="w-full flex justify-center">
          <WelcomePill />
          {/* <ActivitySelector /> */}
          <StarTrackingButton />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.border,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    backgroundColor: colors.dark.border,
  },
});
