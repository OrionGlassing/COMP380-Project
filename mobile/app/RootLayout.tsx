import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{headerShown: false}}/>;
}
import { useAuthStore } from "@/utils/authStore";

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();

  return (
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen
            name="(protected)"
            options={{
              headerShown: false,
              animation: "none",
            }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="sign-up" />
          <Stack.Screen name="create-account" />
        </Stack.Protected>
    </Stack>
  );
};
