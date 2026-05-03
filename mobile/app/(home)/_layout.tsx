import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="account" />
      <Stack.Screen name="customize-profile" />
      <Stack.Screen name="discover" />
      <Stack.Screen name="user-cookbook" />
      <Stack.Screen name="create-new-recipe" />
      <Stack.Screen name="loading-recipe" />
      <Stack.Screen name="new-picks" />
      <Stack.Screen name="popular-right-now" />
      <Stack.Screen name="your-favorites" />
      <Stack.Screen name="recipe/[id]" />
    </Stack>
  );
}
//missing several pages
