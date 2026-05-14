import { colors } from "@/src/theme/colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { ActivitySelector } from "../ActivitySelector/SelectorContainer";
import { StarTrackingButton } from "../StartButton/StartTrackingButton";
import { WelcomePill } from "../WelcomePill/WelcomePill";

export const ActivityContainer = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);

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
      index={1}
      backgroundStyle={{
        backgroundColor: colors.dark.border,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      handleIndicatorStyle={{ backgroundColor: "#52525B" }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View className="w-full flex justify-center">
          <WelcomePill />
          <ActivitySelector />
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
