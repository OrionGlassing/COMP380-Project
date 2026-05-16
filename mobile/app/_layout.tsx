import { Stack } from "expo-router";
import { useEffect } from 'react';
import { useAuthStore } from "@/utils/authStore";
//currently in my android emulator, where im using expo go this bootsplash is breaking the app.
// I dont know if that will be a problem when the app is ran on android devices later on
import BootSplash from "react-native-bootsplash";

export default function RootLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (hydrated) {
      BootSplash.hide({ fade: true });
    }
  }, [hydrated]);

  if (!hydrated) {
    return null;
  }

  return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(home)"/>
        <Stack.Screen name="(Login)"/>
     </Stack>
  );
};
