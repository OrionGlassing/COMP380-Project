import { Stack } from "expo-router";
import { useAuthStore } from "@/utils/authStore";

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();
  const hydrated = useAuthStore((state) => state.hydrated);

  if (!hydrated) {
    return null;
  }

  return (
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
  );
};
