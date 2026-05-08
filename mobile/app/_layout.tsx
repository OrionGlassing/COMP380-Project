import { Stack, Redirect } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "@/utils/authStore";
import * as SplashScreen from "expo-splash-screen";

export default function RootLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (hydrated) {
      SplashScreen.hideAsync();
    }
  }, [hydrated]);

  if (!hydrated) {
    return null;
  }

  return (
    <>
      {!isLoggedIn && <Redirect href="/Login" />}
      {isLoggedIn && <Redirect href="/Home" />}

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="(Login)" />
      </Stack>
    </>
  );
}