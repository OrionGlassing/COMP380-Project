import { router } from "expo-router";
import { Text, View, ActivityIndicator } from "react-native";
import { theme } from "@/src/constants/theme";
import { useEffect, useRef } from "react";
import { useCreateNewRecipeStore } from "@/utils/data-stores/createNewRecipeStore";
import Arrow from "@/src/components/ui/Arrow";
import textstyles from "@/src/constants/textstyles";

export default function LoadingRecipe() {
  const submitNewRecipe = useCreateNewRecipeStore(
    (state) => state.submitNewRecipe,
  );

  const isSubmitting = useCreateNewRecipeStore(
    (state) => state.isSubmitting,
  );

  const handleCreateNewRecipe = async () => {
    try {
      console.log("Sending recipe...");

      const newRecipeID = await submitNewRecipe();

      if (!newRecipeID) {
        throw new Error("No recipe ID returned from backend.");
      }

      console.log("Received recipe ID:", newRecipeID);

      router.replace(`/recipe/${newRecipeID}`);
    } catch (error) {
      console.log("Failed to create recipe:", error);

      // Optional: send user back if something fails
      router.replace("/create-new-recipe");
    }
  };

  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (hasSubmitted.current) return;

      hasSubmitted.current = true;
      handleCreateNewRecipe();
    }, []);

  return (
    <View
      style={[
        theme.container.page,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Arrow
        type="arrow-back"
        onPress={() => router.replace("/create-new-recipe")}
      />

      <ActivityIndicator size="large" color={theme.colors.primary} />

      <Text style={textstyles.body}>
        {isSubmitting ? "Creating your recipe..." : "Loading..."}
      </Text>
    </View>
  );
}