import { Stack } from "expo-router";
import { useAuthStore } from "@/utils/authStore";

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();

  return (
    //with your version of expo:
    //   <Stack screenOptions={{headerShown: false}}>
    //     //if not logged in (home) pages are guarded
    //     <Stack.Protected guard={isLoggedIn}>
    //       <Stack.Screen name="(home)"/>
    //     </Stack.Protected>
    //     //if not logged in (login) pages are still accesible
    //     <Stack.Protected guard={!isLoggedIn}>
    //       <Stack.Screen name="(login)"/>
    //     </Stack.Protected>
    // </Stack>
    //with my version of expo:
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(home)" />
      <Stack.Screen name="(login)" />
    </Stack>
  );
};
