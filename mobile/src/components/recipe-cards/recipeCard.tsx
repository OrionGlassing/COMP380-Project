import { StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";

import { theme } from "@/src/constants/theme";
import { useRecipeStore } from "@/utils/data-stores/recipeStore";

interface Props {
  ID: string;
}

const RecipeCard = ({ ID }: Props) => {
  const recipe = useRecipeStore((state) => state.recipes[ID]);
  const fetchRecipeById = useRecipeStore((state) => state.fetchRecipeById);

  useEffect(() => {
    fetchRecipeById(ID);
  }, [ID, fetchRecipeById]);

  if (!recipe) {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <ActivityIndicator size="large" color={theme.colors.text} />
        </View>

        <View style={styles.bodyContainer}>
          <View style={[styles.textContainer, styles.loadingTitleSection]}>
            <View style={[styles.textPlaceholder, { width: "100%" }]} />
            <View style={[styles.textPlaceholder, { width: "100%" }]} />
            <View style={[styles.textPlaceholder, { width: "70%" }]} />
          </View>

          <View style={[styles.textContainer, styles.loadingMetaSection]}>
            <View style={[styles.textPlaceholderPrimary, { width: "50%" }]} />
            <View style={[styles.textPlaceholderPrimary, { width: "50%" }]} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      <Pressable
        onPress={() => router.push(`/recipe/${ID}`)}
        style={({ pressed }) => [
          styles.pressable,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={recipe.imageURL ? { uri: recipe.imageURL } : undefined}
            contentFit="cover"
            transition={300}
          />

          <View style={styles.imageOverlay} />
        </View>

        <View style={styles.centerDivider} />

        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.textTitle} numberOfLines={2}>
              {recipe.title}
            </Text>
          </View>

          <View style={styles.metaContainer}>
            <Text style={styles.textSub} numberOfLines={1}>
              Recipe #{recipe.recipe_id}
            </Text>

            <Text style={styles.textSub} numberOfLines={1}>
              {recipe.cook_time || "Cook time unavailable"}
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
    backgroundColor: "#111111",
    borderRadius: 15,
    overflow: "hidden",

    borderWidth: 3,
    borderColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,

    elevation: 8,
  },

  pressable: {
    flex: 1,
    backgroundColor: "#111111",
  },

  pressed: {
    opacity: 0.85,
  },

  imageContainer: {
    flex: 1,
    backgroundColor: "darkgrey",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "darkgrey",
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },

  centerDivider: {
    width: "100%",
    height: 3,
    backgroundColor: "white",
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: "#111111",
  },

  textContainer: {
    paddingHorizontal: 8,
    alignItems: "flex-start",
  },

  titleContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 6,
    justifyContent: "center",
  },

  metaContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 8,
    justifyContent: "center",
    gap: 4,
  },

  loadingTitleSection: {
    flex: 1,
    paddingTop: 10,
    gap: 6,
  },

  loadingMetaSection: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: "center",
    gap: 8,
  },

  textPlaceholder: {
    height: 10,
    backgroundColor: "white",
    borderRadius: 999,
  },

  textPlaceholderPrimary: {
    height: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 999,
  },

  textTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },

  textSub: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "left",
  },
});