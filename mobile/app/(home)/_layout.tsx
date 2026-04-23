import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" />
      <Stack.Screen name="account" />
      <Stack.Screen name="customize-profile" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="cookbook" />
      <Stack.Screen name="create-new-recipe" />
      <Stack.Screen name="loading-recipe" />
      <Stack.Screen name="recipe/[id]" />
    </Stack>
  );
};