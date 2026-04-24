import { router, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import textStyles from "@/src/constants/text-styles";
import { useRecipeStore } from "@/utils/data-stores/recipeStore";
import CheckableItem from "@/src/components/checklist/checkableItem";
import SimpleButton from "@/src/components/simpleButton";
import { useEffect, useState } from "react";
import Arrow from "@/src/components/ui/Arrow";
import PageHeader from "@/src/components/ui/PageHeader";

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
    const recipe = useRecipeStore((state) => state.recipes[id]);
    const fetchRecipeById = useRecipeStore((state) => state.fetchRecipeById);

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
        fetchRecipeById(id);
    }, [id]);

    //ui
    const insets = useSafeAreaInsets();

    //Recipe is undefined when it is not loaded
    if (!recipe) {
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

        <Text style={textStyles.Header}>
            {recipe.title}
        </Text>

        <Text style={[textStyles.Label, {marginBottom: -10}]}>
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
                    callBack={() => toggleIngredient(index)}
                />
            ))}
        </View>

        <Text style={[textStyles.Label, {marginBottom: -10}]}>
            Steps:
        </Text>
        <Text style={[textStyles.longForm, {alignSelf: 'flex-start', lineHeight: 30,}]}>
            {recipe.steps}
        </Text>

        <SimpleButton
            label="Customize Recipe"
            onPress={() => {
            console.log("This does nothing yet.")
            }}
        />

        <SimpleButton
            label="Add to Cookbook"
            onPress={() => {
            console.log("This does nothing yet.")
            }}
        />

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
      paddingTop: '5%',
    },
    ingredientsContainer: {
        alignSelf: 'stretch',
        gap: 0,
    },
    
});