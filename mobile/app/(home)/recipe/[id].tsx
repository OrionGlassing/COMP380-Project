import { router, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import textStyles from "@/src/constants/textstyles";
import { useRecipeStore } from "@/utils/data-stores/recipeStore";
import CheckableItem from "@/src/components/checklist/checkableItem";
import { useEffect, useState } from "react";
import PageHeader from "@/src/components/ui/PageHeader";
import { theme } from "@/src/constants/theme";

//
// Notes:
//
/*
This page is responsible for dynamically showcasing recipe data.

It works by taking an id as an input in the page path: /recipe/{id} (ex: recipe/1)
Then with useLocalSearchParams(), we can get that id and use it here on this page.

The page will use the recipe id to request the recipe data from the zustand store. 
    - The zustand store will manage the recipe data. 
And once it has gotten the data, it then displays it.

While the data is loading, the page wants to display loading animations.
    - I think a good option is to use react-native-shimmer-placeholder

*/

export default function ID() {
    //Global state from zustand store
    const { id } = useLocalSearchParams<{ id: string }>();
    const recipe = useRecipeStore((state) => id ? state.recipes[id] : undefined);
    const fetchRecipeById = useRecipeStore((state) => state.fetchRecipeById);
    const isFetchingRecipe = useRecipeStore((state) => state.isFetchingRecipe);
    const fetchRecipeError = useRecipeStore((state) => state.fetchRecipeError);

    //Local state management for the dynamic ingredients array
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
    const toggleIngredient = (index: number) => {
        setCheckedItems((prevState) => ({
            ...prevState,
            [index]: !prevState[index] 
        }));
    };

    //As soon as the page opens, get the recipe data from the zustand store
    useEffect(() => {
        if (!id) return;
        if (recipe) return;

        fetchRecipeById(id).catch((error) => {
            console.error("Recipe page failed to fetch recipe:", error);
        });
    }, [id, recipe, fetchRecipeById]);

    if (fetchRecipeError) {
        return (
            <View style={styles.screen}>
                <Text style={textStyles.body}>Failed to load recipe.</Text>
            </View>
        );
    }

    //ui
    const insets = useSafeAreaInsets();
    //Recipe is undefined when it is not loaded
    if (!recipe || isFetchingRecipe) {
        //Here we can render the loading screen version of the page
        return (
            <View style={styles.screen}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false} >

                <PageHeader 
                logoText="CoKitchen"
                backButtonEnabled={true}
                profileButtonEnabled={true}
                />

            <View style={[styles.contentContainer, {paddingBottom: insets.bottom}]} >

            
            </View>
            </ScrollView>
            </View>
        );
    }

    //Now the recipe is loaded, we can render the normal version of the page
    return (
        <View style={styles.screen}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false} >

            <PageHeader 
            logoText="CoKitchen"
            backButtonEnabled={true}
            profileButtonEnabled={true}
            />

        <View style={[styles.contentContainer, {paddingBottom: insets.bottom}]} >

        <Text style={[textStyles.header, {}]}>
            {recipe.title}
        </Text>

        <View style={styles.imageContainer} >
          <Image
            style={styles.image}
            source={recipe.imageURL}
            contentFit="cover"
            transition={500}
          />
          <View style={styles.imageShadow} />
        </View>

        <Text style={[textStyles.subHeader, {marginBottom: -10, alignSelf: 'flex-start',}]}>
            Ingredients:
        </Text>
        <View style={styles.ingredientsContainer}>
            {recipe.ingredients.map((ingredientString, index) => (
                <CheckableItem
                    key={`ingredient-${index}`} 
                    enabled={true}
                    shouldCrossOut={true} 
                    label={ingredientString}
                    isChecked={!!checkedItems[index]} 
                    buttonColor={theme.colors.text}
                    callBack={() => toggleIngredient(index)}
                />
            ))}
        </View>

        <Text style={[textStyles.subHeader, {marginBottom: -10, alignSelf: 'flex-start',}]}>
            Directions:
        </Text>
        <View style={styles.directionsContainer} >
        {recipe.directions.map((step, index) => (
            <Text 
                key={index} 
                style={[textStyles.body, {alignSelf: 'flex-start', }]}
            >
                {/*{index + 1}.*/}{step}
            </Text>
        ))}
        </View>

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
      //justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: '10%',
      paddingTop: 20,
    },
    imageContainer: {
      width: '100%',
      height: 200,
      borderRadius: 12,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
      backgroundColor: 'darkgrey',
    },
    imageShadow: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 12,
      boxShadow: [{
          offsetX: 0,
          offsetY: 0,
          blurRadius: 15,
          spreadDistance: 0,
          color: 'rgba(0,0,0,0.9)',
          inset: true,
      }],
    },
    ingredientsContainer: {
        alignSelf: 'stretch',
        gap: 0,
    },
    directionsContainer: {
      alignSelf: 'stretch',
      gap: 10,
    },
    
});