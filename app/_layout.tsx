import {
  Lexend_400Regular,
  Lexend_700Bold,
  useFonts,
} from "@expo-google-fonts/lexend";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, errors] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || errors) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, errors]);

  if (!fontsLoaded && !errors) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {/* Root background */}
      <View className="flex-1">
        <StatusBar style="auto" translucent={true} animated={true} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}
