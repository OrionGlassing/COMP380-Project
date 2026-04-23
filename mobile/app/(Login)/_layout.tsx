import { Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login"/>
      <Stack.Screen name="SignUp"/>
      <Stack.Screen name="Help"/>
    </Stack>
  );
}
