import { Stack } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { colors } from "@/constants/colors";
import "@/global.css";

export default function RootLayout() {

  return (
    <GluestackUIProvider mode="dark">
      <Stack
        // screenOptions apply to every page; the tabs hide this header and draw their own.
        screenOptions={{
          headerTitle: "TimeCrunch",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.foreground,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}
