import { router } from "expo-router";
import { Text, View, StyleSheet, ActivityIndicator, } from "react-native";
import textStyles from "@/src/constants/text-styles";
import SimpleButton from "@/src/components/simpleButton";
import { theme } from "@/src/constants/theme";
import { useEffect } from "react";
import { useCreateNewRecipeStore } from "@/utils/data-stores/createNewRecipeStore";

//
// Notes:
//
/*
This page is responsible for handling sending the create new recipe data,
and recieving the new recipe that was generated.
*/

export default function LoadingRecipe() {

  const submitNewRecipe = useCreateNewRecipeStore((state) => state.submitNewRecipe);
  const isSubmitting = useCreateNewRecipeStore((state) => state.isSubmitting);

  const handleCreateNewRecipe = async () => {
    try {
      console.log("Sending recipe...")
      const newRecipeID = await submitNewRecipe();
      if (newRecipeID) {console.log("Recieved recipe ID...")}
      router.replace(`/recipe/${newRecipeID}`);
    } catch (error) {
      console.log(error);
    }
  }

  //As soon as the page opens, use the zustand store to communicate with the backend
  useEffect(() => {
      handleCreateNewRecipe();
  }, []);


  return (
    <View
      style={styles.screen}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={textStyles.standard}>
        Loading...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f1f1f"
    },
});