import PageHeader from "@/src/components/ui/PageHeader";
import { View, StyleSheet, ScrollView, ActivityIndicator, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Recipe } from "@/src/types/dataTypes";
import { useRecipeStore } from "@/utils/data-stores/recipeStore";
import React, { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { theme } from "@/src/constants/theme";
import Swiper from "react-native-deck-swiper";
import Button from "@/src/components/ui/Button";
import RecipeCard from "@/src/components/recipe-cards/recipeCard";
import { Ionicons } from "@expo/vector-icons";

export default function Discover() {
  //ui
  const insets = useSafeAreaInsets();

  //zustand data
  const fetchRandomRecipe = useRecipeStore((state) => state.fetchRandomRecipe);
  const saveRecipe = useRecipeStore((state) => state.saveRecipe);
  //local data
  const [random_recipes, setRandom_recipes] = useState<string[]>([]);

  //To control swiper with buttons
  const swiperRef = useRef<Swiper<string>>(null);

  //When the page is launched, load 5 recipes
  useEffect(() => {
    const loadInitialRecipes = async () => {
      const initial_recipes = [
        fetchRandomRecipe(), fetchRandomRecipe(), fetchRandomRecipe(),
        fetchRandomRecipe(), fetchRandomRecipe()
      ];
      const results = await Promise.all(initial_recipes);
      const valid_recipes = results.filter(Boolean) as string[];
      setRandom_recipes(valid_recipes);
      random_recipes.map(a => console.log(a));
    }

    loadInitialRecipes();
  }, []);

  const getNextRecipe = async () => {
    const newRecipeID = await fetchRandomRecipe();
    if (newRecipeID) {
      setRandom_recipes((prev) => [...prev, newRecipeID]);
    }
  };

  const handleSwipeLeft = (cardIndex: number) => {
    //User does not like the recipe
    getNextRecipe();
  }

  const handleSwipeRight = (cardIndex: number) => {
    //User does like the recipe
    const swipedRecipeID = random_recipes[cardIndex];

    //We can either visit OR save the recipe...
    //saveRecipe(swipedRecipeID);
    router.push(`/recipe/${swipedRecipeID}`);

    getNextRecipe();
  }

  return (
    <View style={[{flex: 1}]}>

      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.background, zIndex: 0 }]}
      />

      <PageHeader
        logoText="Discover"
        backButtonEnabled={true}
        profileButtonEnabled={true}
      />
    
      <View style={[{flex: 1, zIndex: 1}]}>
        {random_recipes.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
        ) : (
          <>
        <Swiper 
          ref={swiperRef}
          //Rendering the cards
          cards={random_recipes}
          renderCard={(recipeID) => {
            return (
              <View style={styles.cardScaler} >
                <RecipeCard ID={recipeID} />
              </View>
            )
          }}
          //Handling actions
          onSwipedLeft={handleSwipeLeft}
          onSwipedRight={handleSwipeRight}
          //Component setup
          cardIndex={0}
          infinite={true}
          horizontalSwipe={true}
          verticalSwipe={false}
          backgroundColor="transparent"
          showSecondCard={true}
          stackSize={3}
          stackSeparation={10}
          animateCardOpacity={true}
          animateOverlayLabelsOpacity={true}
          cardHorizontalMargin={0}
          cardVerticalMargin={0}
          overlayLabels={{
            left: {
              title: "PASS",
              style: {
                label: {
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  paddingRight: 30,
                },
              },
            },
            right: {
              title: "VISIT",
              style: {
                label: {
                  backgroundColor: "green",
                  borderColor: "green",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  paddingLeft: 30,
                },
              },
            },
          }}
        />

        <View style={[styles.bottomBar, { marginBottom: insets.bottom + 20 }]}>

          <Pressable 
            style={[styles.roundButton, { borderColor: 'red' }]} 
            onPress={() => swiperRef.current?.swipeLeft()}
          >
            <Ionicons name="close" size={32} color="red" />
          </Pressable>

          <Pressable 
            style={[styles.roundButton, { borderColor: 'green' }]} 
            onPress={() => swiperRef.current?.swipeRight()}
          >
            <Ionicons name="eye" size={32} color="green" />
          </Pressable>
        </View>

        </>

        )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardScaler: {
    alignItems: "center",
    transform: [{scale: 2}],
    marginTop: 200,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 50,
    zIndex: 10,
  },
  roundButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  }
});