import { Stack } from "expo-router";
import { useEffect } from 'react';
import { useAuthStore } from "@/utils/authStore";
//currently in my android emulator, where im using expo go this bootsplash is breaking the app.
// I dont know if that will be a problem when the app is ran on android devices later on
import BootSplash from "react-native-bootsplash";

console.log("layout.tsx");

export default function RootLayout() {
<<<<<<< HEAD
  const { isLoggedIn } = useAuthStore();
  const hydrated = useAuthStore((state) => state.hydrated);

=======
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (hydrated) {
      console.log("Hiding splash screen!");
      BootSplash.hide({ fade: true });
    }
  }, [hydrated]);

>>>>>>> origin/frontend/shared
  if (!hydrated) {
    return null;
  }

  return (
<<<<<<< HEAD
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(Login)" />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(home)" />
      </Stack.Protected>
    </Stack>
    //Your version:
    //<Stack screenOptions={{ headerShown: false }}>
    //  <Stack.Screen name="index" />
    //  <Stack.Screen name="(home)" />
    //  <Stack.Screen name="(Login)" />
    //</Stack>
=======
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(home)"/>
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(login)"/>
      </Stack.Protected>
     </Stack>
>>>>>>> origin/frontend/shared
  );
};
