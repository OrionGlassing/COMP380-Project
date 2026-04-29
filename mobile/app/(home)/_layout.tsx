import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="account" />
      <Stack.Screen name="customize-profile" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="cookbook" />
      <Stack.Screen name="create-new-recipe" />
      <Stack.Screen name="create-recipe" />
      <Stack.Screen name="loading-recipe" />
      <Stack.Screen name="newPicks" />
      <Stack.Screen name="popularRightNow" />
      <Stack.Screen name="recipe-loading" />
      <Stack.Screen name="UserProfile" />
      <Stack.Screen name="yourFavorites" />
      <Stack.Screen name="recipe/[id]" />
    </Stack>
  );
}
//missing several pages
