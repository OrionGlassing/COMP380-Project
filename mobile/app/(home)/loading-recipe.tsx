import { router } from "expo-router";
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, } from "react-native";
import textStyles from "@/src/constants/text-styles";
import SimpleButton from "@/src/components/simpleButton";
import { theme } from "@/src/constants/theme";
import { useEffect } from "react";
import { useCreateNewRecipeStore } from "@/utils/data-stores/createNewRecipeStore";
import Arrow from "@/src/components/ui/Arrow";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
    setTimeout(() => {
        handleCreateNewRecipe();
      }, 10000);
  }, []);

  //ui
  const insets = useSafeAreaInsets();

  return (
      <View style={styles.screen}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false} >

      <View style={[styles.contentContainer, {paddingBottom: insets.bottom}]} >

      {/* If something goes wrong, we will give the user a back button to leave the page.*/}

      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={textStyles.standard}>
        Crafting something delicious...
      </Text>
    </View>

    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "#F0EBD8",
    },
    contentContainer: {
      flex: 1,
      flexDirection: "column",
      gap: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: '5%',
      paddingTop: '5%',
    },
});