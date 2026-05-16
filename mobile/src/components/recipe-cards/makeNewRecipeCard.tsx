import { StyleSheet } from "react-native";
import { theme } from "@/src/constants/theme";
import { Text, View, Pressable } from "react-native";
import { useRecipeStore } from "@/utils/data-stores/recipeStore";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import textstyles from "@/src/constants/textstyles";
import { Ionicons } from "@expo/vector-icons";

/*  Notes:

This is a recipe card that routes to the create new recipe page.

*/



const MakeNewRecipeCard = () => {

    return (
        <View style={styles.cardContainer}>
            <Pressable
                onPress={() => {
                    //Function to execute when card is clicked
                    router.push(`/create-new-recipe`);
                }}
                style={[{flex: 1, alignItems: 'center', justifyContent: 'center',}]}
            >
                <Ionicons name="add" size={48} color={theme.colors.lightinput} />
                <Text style={styles.text} >
                    Add New Recipe
                </Text>

                <View style={styles.cardHighlight} />
            </Pressable>
        </View>
    );
};

export default MakeNewRecipeCard;

const styles = StyleSheet.create({
    cardContainer: {
        height: 250,
        width: 175,
        backgroundColor: theme.colors.darkinput,
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
    cardHighlight: {
        ...StyleSheet.absoluteFillObject,
        boxShadow: [{
            offsetX: -25,
            offsetY: 10,
            blurRadius: 40,
            spreadDistance: 0,
            color: 'rgba(255, 255, 255, 0.25)',
            inset: true, 
        }],
    },
    text: {
        color: theme.colors.lightinput,
        fontWeight: 'bold',
        fontSize: 15,
    },

});