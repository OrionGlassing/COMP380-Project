import { router, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useEffect, useState } from "react";

import textStyles from "@/src/constants/textstyles";
import { useRecipeStore } from "@/utils/data-stores/recipeStore";
import CheckableItem from "@/src/components/checklist/checkableItem";
import PageHeader from "@/src/components/ui/PageHeader";
import { theme } from "@/src/constants/theme";
import Button from "@/src/components/ui/Button";

export default function ID() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const recipe = useRecipeStore((state) =>
    id ? state.recipes[id] : undefined
  );

  const fetchRecipeById = useRecipeStore((state) => state.fetchRecipeById);
  const saveRecipe = useRecipeStore((state) => state.saveRecipe);

  const userRecipeIds = useRecipeStore((state) => state.user_recipe_ids);
  const isFetchingRecipes = useRecipeStore(
    (state) => state.isFetchingRecipes
  );
  const fetchRecipesError = useRecipeStore(
    (state) => state.fetchRecipesError
  );

  const isSaved = id ? userRecipeIds.includes(id) : false;

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const insets = useSafeAreaInsets();

  const toggleIngredient = (index: number) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    if (!id) return;
    if (recipe) return;

    fetchRecipeById(id).catch((error) => {
      console.error("Recipe page failed to fetch recipe:", error);
    });
  }, [id, recipe, fetchRecipeById]);

  if (!id) {
    return (
      <View style={styles.screen}>
        <PageHeader
          logoText="CoKitchen"
          backButtonEnabled={true}
          profileButtonEnabled={true}
          transparent={false}
        />

        <View style={styles.contentContainer}>
          <Text style={textStyles.body}>Missing recipe ID.</Text>
        </View>
      </View>
    );
  }

  if (fetchRecipesError) {
    return (
      <View style={styles.screen}>
        <PageHeader
          logoText="CoKitchen"
          backButtonEnabled={true}
          profileButtonEnabled={true}
          transparent={false}
        />

        <View style={styles.contentContainer}>
          <Text style={textStyles.body}>Failed to load recipe.</Text>

          <Button
            label="Go Back"
            onPress={() => router.back()}
          />
        </View>
      </View>
    );
  }

  if (!recipe || isFetchingRecipes) {
    return (
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          <PageHeader
            logoText="CoKitchen"
            backButtonEnabled={true}
            profileButtonEnabled={true}
            transparent={false}
          />

          <View
            style={[
              styles.contentContainer,
              { paddingBottom: insets.bottom },
            ]}
          >
            <Text style={textStyles.body}>Loading recipe...</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <PageHeader
          logoText="CoKitchen"
          backButtonEnabled={true}
          profileButtonEnabled={true}
          transparent={false}
        />

        <View
          style={[
            styles.contentContainer,
            { paddingBottom: insets.bottom },
          ]}
        >
          <Text style={textStyles.header}>{recipe.title}</Text>

          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={recipe.imageURL ? { uri: recipe.imageURL } : undefined}
              contentFit="cover"
              transition={500}
            />
          </View>

          <Text
            style={[
              textStyles.subHeader,
              {
                marginBottom: -10,
                alignSelf: "flex-start",
              },
            ]}
          >
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

          <Text
            style={[
              textStyles.subHeader,
              {
                marginBottom: -10,
                alignSelf: "flex-start",
              },
            ]}
          >
            Directions:
          </Text>

          <View style={styles.directionsContainer}>
            {recipe.directions.map((step, index) => (
              <Text
                key={`direction-${index}`}
                style={[
                  textStyles.body,
                  {
                    alignSelf: "flex-start",
                  },
                ]}
              >
                {step}
              </Text>
            ))}
          </View>

          <Button
            label={isSaved ? "Saved" : "Save Recipe"}
            onPress={() => {
              if (isSaved) return;
              saveRecipe(id);
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
    alignItems: "center",
    paddingHorizontal: "10%",
    paddingTop: 20,
  },

  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "darkgrey",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  ingredientsContainer: {
    alignSelf: "stretch",
    gap: 0,
  },

  directionsContainer: {
    alignSelf: "stretch",
    gap: 10,
  },
});