import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" />
      <Stack.Screen name="account" />
      <Stack.Screen name="customize-profile" />
      <Stack.Screen name="discover" />
      <Stack.Screen name="user-cookbook" />
      <Stack.Screen name="create-new-recipe" />
      <Stack.Screen name="loading-recipe" />
      <Stack.Screen name="recipe/[id]" />
    </Stack>
  );
}
//missing several pages
