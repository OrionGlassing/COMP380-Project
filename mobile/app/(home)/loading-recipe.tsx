import { router } from "expo-router";
import { Text, View, ActivityIndicator } from "react-native";
import { theme } from "@/src/constants/theme";
import { useEffect } from "react";
import { useCreateNewRecipeStore } from "@/utils/data-stores/createNewRecipeStore";
import Arrow from "@/src/components/ui/Arrow";
import textstyles from "@/src/constants/textstyles";

//
// Notes:
//
/*
This page is responsible for handling sending the create new recipe data,
and recieving the new recipe that was generated.
*/

export default function LoadingRecipe() {
  const submitNewRecipe = useCreateNewRecipeStore(
    (state) => state.submitNewRecipe,
  );
  const isSubmitting = useCreateNewRecipeStore((state) => state.isSubmitting);

  const handleCreateNewRecipe = async () => {
    try {
      console.log("Sending recipe...");
      const newRecipeID = await submitNewRecipe();
      if (newRecipeID) {
        console.log("Recieved recipe ID...");
      }
      router.replace(`/recipe/${newRecipeID}`);
    } catch (error) {
      console.log(error);
    }
  };

  //As soon as the page opens, use the zustand store to communicate with the backend
  useEffect(() => {
    setTimeout(() => {
      handleCreateNewRecipe();
    }, 5000);
  }, []);

  return (
    <View
      style={[
        theme.container.page,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {/* If something goes wrong, we will give the user a back button to leave the page.*/}
      <Arrow
        type={"arrow-back"}
        onPress={() => router.replace("/create-new-recipe")}
      />
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={textstyles.body}>Loading...</Text>
    </View>
  );
}
