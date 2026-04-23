import { Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      //do you plan to configure these pages individually?
      <Stack.Screen name="welcome"/>
      <Stack.Screen name="login"/>
      <Stack.Screen name="signUp"/>
      <Stack.Screen name="help"/>
      <Stack.Screen name="userProfile"/>
    </Stack>
  );
}
