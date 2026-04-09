import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  
  return (
    <Stack screenOptions={{headerShown: false}}>

      //do you plan to configure these pages individually? 
      <Stack.Screen name="Home" /> {/*this is the homepage */}
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