import { router } from "expo-router";
import { Text, View, ActivityIndicator, Alert } from "react-native";
import { theme } from "@/src/constants/theme";
import { useEffect } from "react";
import { useCreateNewRecipeStore } from "@/utils/data-stores/createNewRecipeStore";
import Arrow from "@/src/components/ui/Arrow";
import textstyles from "@/src/constants/textstyles";
import Button from "@/src/components/ui/Button";

//
// Notes:
//
/*
This page is responsible for handling sending the create new recipe data,
and recieving the new recipe that was generated.
*/

export default function LoadingRecipe() {
  const submitNewRecipe = useCreateNewRecipeStore((state) => state.submitNewRecipe);
  const submitError = useCreateNewRecipeStore((state) => state.submitError);

  const handleCreateNewRecipe = async () => {
    const newRecipeID = await submitNewRecipe();

    if (newRecipeID) {
      //Recipe load success
      router.replace(`/recipe/${newRecipeID}`);
    } else {
      //Recipe load fail
      Alert.alert("Something Went Wrong!", "Sorry, your chef couldn't prepare your recipe.", [
        {
          text: "Try Again",
          style: "cancel",
          onPress: () => {
            handleCreateNewRecipe();
          },
        },
        {
          text: "Go Back",
          onPress: () => {
            router.replace(`/create-new-recipe`);
          }
        },
      ],
      {
        cancelable: false,
      }
    );
    }
  };


  //As soon as the page opens, use the zustand store to communicate with the backend
  useEffect(() => {
    handleCreateNewRecipe();
  }, []);

  //Waiting on backend / database
  return (
    <View
      style={[
        theme.container.page,
        { backgroundColor: theme.colors.background, alignItems: 'center', gap: 25, },
      ]}
    >
      {submitError ? (
          <>
            <Text style={textstyles.body}>Sorry, something went wrong...</Text>
            <Button
              label="Return"
              onPress={() => {
                router.replace(`/create-new-recipe`);
              }}
            />
          </>
        ) : (
            <>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={textstyles.body}>Crafting something delicious...</Text>
            </>
        )}
      
    </View>
  );
}