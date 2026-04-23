import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="account" />
      <Stack.Screen name="customize-profile" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="cookbook" />
      <Stack.Screen name="create-new-recipe" />
      <Stack.Screen name="loading-recipe" />
      <Stack.Screen name="recipe/1" />
    </Stack>
  );
};