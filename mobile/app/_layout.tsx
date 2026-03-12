import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" /> {/*this is the homepage */}
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="create-account" />
      <Stack.Screen name="account" />
      <Stack.Screen name="customize-profile" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="cookbook" />
      <Stack.Screen name="create-recipe" />
      <Stack.Screen name="recipe-loading" />
      <Stack.Screen name="recipe" />
    </Stack>
  );
};
