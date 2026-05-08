import { router, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import textStyles from "@/src/constants/textstyles";
import { useRecipeStore } from "@/utils/data-stores/recipeStore";
import CheckableItem from "@/src/components/checklist/checkableItem";
import { useEffect, useState } from "react";
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
  const saved_recipes = useRecipeStore((state) => state.saved_recipes);

  const isFetchingRecipe = useRecipeStore(
    (state) => state.isFetchingRecipe
  );

  const fetchRecipeError = useRecipeStore(
    (state) => state.fetchRecipeError
  );

  const isSaved = id ? saved_recipes.includes(id) : false;

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

  if (fetchRecipeError) {
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
            onPress={() => router.replace("/create-new-recipe")}
          />
        </View>
      </View>
    );
  }

  if (!recipe || isFetchingRecipe) {
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
              source={
                recipe.imageURL
                  ? { uri: recipe.imageURL }
                  : undefined
              }
              contentFit="cover"
              transition={500}
            />
            <View/>
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
              if (isSaved) {
                return;
              }

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
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: "darkgrey",
  },
  imageShadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 15,
        spreadDistance: 0,
        color: "rgba(0,0,0,0.9)",
        inset: true,
      },
    ],
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