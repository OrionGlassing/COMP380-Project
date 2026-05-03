import { StyleSheet } from "react-native";
import { theme } from "@/src/constants/theme";
import { Text, View, Pressable } from "react-native";
import { useRecipeStore } from "@/utils/data-stores/recipeStore";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";
import { Image } from "expo-image";

/*  Notes:

This component is set up to be initialized with a recipe ID.

It then asks the recipeStore for the recipe
*/

interface Props {
    ID: string;
}


const RecipeCard = ({ID, }: Props) => {

    //Global state from zustand store
    const recipe = useRecipeStore((state) => state.recipes[ID]);
    const fetchRecipeById = useRecipeStore((state) => state.fetchRecipeById);

    //As soon as the component is rendered, get the recipe data from the zustand store
    useEffect(() => {
        fetchRecipeById(ID);
    }, [ID]);

    //The loading version of the card
    if (!recipe) {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.imageContainer} >
                    <ActivityIndicator size="large" color={'#6e6e6e'} />
                </View>
                <View style={styles.textContainer} >
                    <View style={[styles.textPlaceHolder, {width: '100%'}]} />
                    <View style={[styles.textPlaceHolder, {width: '100%'}]} />
                    <View style={[styles.textPlaceHolder, {width: '69%'}]} />
                    <View style={styles.textPlaceHolder} />
                    <View style={[styles.textPlaceHolder, {width: '50%', backgroundColor: theme.colors.primary}]} />
                    <View style={[styles.textPlaceHolder, {width: '50%', backgroundColor: theme.colors.primary}]} />
                </View>
                
            </View>
        );
    }

    //The real version of the card
    return (
        <View style={styles.cardContainer}>
            <Pressable
                onPress={() => {
                    //Function to execute when card is clicked
                    router.push(`/recipe/${ID}`);
                }}
                style={[{flex: 1, }]}
            >
                    <View style={styles.imageContainer} >
                        <Image
                        style={styles.image}
                        source={recipe.imageURL}
                        contentFit="cover"
                        transition={1000}
                        />
                        <View style={styles.imageShadow} />
                    </View>

                    <View style={styles.centerDivider} />

                    <View style={[{flex: 1, backgroundColor: '#111111',}]} >

                        <View style={styles.textContainer} >
                            <Text style={styles.textTitle} >
                                {recipe.title}
                            </Text>
                        </View>
                        
                        <View style={styles.textContainer} >
                            <Text style={styles.textSub} >
                                45 minutes
                            </Text>
                        </View>

                    </View>
            </Pressable>
        </View>
    );
};

export default RecipeCard;

const styles = StyleSheet.create({
    cardContainer: {
        height: 250,
        width: 175,
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
        outlineColor: 'white',
        outlineWidth: 4,
        flexDirection: 'column',
        boxShadow: [{
            offsetX: 1,
            offsetY: 4,
            blurRadius: 10,
            spreadDistance: 0,
            color: 'rgba(0,0,0,0.9)',
            //inset: true, 
        }],
    },
    imageContainer: {
        flex: 1,
        //width: '100%',
        //height: 125,
        backgroundColor: 'lightgrey',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#333333',
    },
    imageShadow: {
      ...StyleSheet.absoluteFillObject,
      boxShadow: [{
          offsetX: 0,
          offsetY: 0,
          blurRadius: 8,
          spreadDistance: 0,
          color: 'rgba(0,0,0,0.75)',
          inset: true,
      }],
    },
    centerDivider: {
        width: '100%',
        height: 3,
        backgroundColor: 'white',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 8,
    },
    textPlaceHolder: {
        height: 10,
        backgroundColor: 'white',
        borderRadius: 999,
    },
    textTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',

    },
    textSub: {
        color: theme.colors.primary,
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'left',
    },

});