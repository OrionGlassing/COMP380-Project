import { Stack } from "expo-router";
import { useEffect } from 'react';
import { useAuthStore } from "@/utils/authStore";
import BootSplash from "react-native-bootsplash";

console.log("layout.tsx");

export default function RootLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (hydrated) {
      console.log("Hiding splash screen!");
      BootSplash.hide({ fade: true });
    }
  }, [hydrated]);

  if (!hydrated) {
    return null;
  }

  return (
    //with your version of expo:
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(home)"/>
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(login)"/>
      </Stack.Protected>
     </Stack>

    /*
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(home)" />
      <Stack.Screen name="(login)" />
    </Stack>
    */
  );
};
