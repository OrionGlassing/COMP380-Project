import PageHeader from "@/src/components/ui/PageHeader";
import { View, StyleSheet, ScrollView, } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Recipe } from "@/src/types/dataTypes";
import { useRecipeStore } from "@/utils/data-stores/recipeStore";
import { useEffect, useState } from "react";

export default function Discover() {
  //ui
  const insets = useSafeAreaInsets();

  //zustand data
  const fetchRandomRecipe = useRecipeStore((state) => state.fetchRandomRecipe);
  //local data
  const [random_recipes, setRandom_recipes] = useState<String[]>([]);

  const getNextRecipe = async () => {
    const newRecipeID = await fetchRandomRecipe();
    if (newRecipeID) {
      setRandom_recipes((prev) => [...prev, newRecipeID]);
    }
  };

  //When the page is launched, load 5 recipes
  useEffect(() => {
    for(let i: number = 0; i < 5; i++) {
      getNextRecipe();
    }
  }, []);


  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <PageHeader
          logoText="Discover"
          backButtonEnabled={true}
          profileButtonEnabled={true}
        />

        <View
          style={[styles.contentContainer, { paddingBottom: insets.bottom }]}
        ></View>
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
    paddingHorizontal: "5%",
    paddingTop: "5%",
  },
});