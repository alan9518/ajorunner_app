import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

import { colors } from "@/src/theme/colors";
import { Avatar } from "../avatar/Avatar";

/* -------------------- Root -------------------- */

export const HeaderRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <LinearGradient
      colors={[colors.gradients.primary[0], colors.gradients.primary[1]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="w-full h-32 px-2 pt-2"
    >
      <View className="flex-1 flex-row items-center justify-between">
        {children}
      </View>
    </LinearGradient>
  );
};

/* -------------------- Slots -------------------- */

export const HeaderLeft = ({ children }: { children: React.ReactNode }) => {
  return <View className="flex flex-row items-center">{children}</View>;
};

export const HeaderRight = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="ml-auto flex items-center justify-center">{children}</View>
  );
};

/* -------------------- Atoms -------------------- */

export const HeaderAvatar = () => {
  return <Avatar />;
};

export const HeaderTitles = ({
  greeting = "Good morning",
  name = "Runner",
}: {
  greeting?: string;
  name?: string;
}) => {
  return (
    <View className="ml-2">
      <Text className="font-lexend-bold text-xl text-primary">{greeting}</Text>
      <Text className="font-lexend-bold text-xl text-white">{name}</Text>
    </View>
  );
};

export const HeaderActions = ({ children }: { children?: React.ReactNode }) => {
  return <View>{children}</View>;
};
