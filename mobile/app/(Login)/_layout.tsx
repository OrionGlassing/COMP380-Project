import { Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      //do you plan to configure these pages individually?
      <Stack.Screen name="Welcome"/>
      <Stack.Screen name="Login"/>
      <Stack.Screen name="SignUp"/>
      <Stack.Screen name="Help"/>
    </Stack>
  );
}
