import PageHeader from "@/src/components/ui/PageHeader";
import { theme } from "@/src/constants/theme";
import { View, StyleSheet, ScrollView, FlatList, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RecipeCard from "@/src/components/recipe-cards/recipeCard";
import { useRecipeStore } from "@/utils/data-stores/recipeStore";
import { useEffect } from "react";

export default function UserCookbook() {
  //ui
  const insets = useSafeAreaInsets();

  //data
  const saved_recipes = useRecipeStore((state) => state.saved_recipes);
  const fetchSavedRecipes = useRecipeStore((state) => state.fetchSavedRecipes);

  //Get the users saved recipes when page loads
  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={[{zIndex: 10}]}>
        <PageHeader
            logoText="Cookbook"
            backButtonEnabled={true}
            profileButtonEnabled={true}
            transparent={false}
        />
      </View>

    <FlatList
      data={saved_recipes}
      keyExtractor={(item) => item}
      numColumns={2}
      contentContainerStyle={[
        styles.contentContainer,
        {paddingBottom: insets.bottom}
      ]}
      columnWrapperStyle={styles.rowWrapper}
      bounces={true}
      renderItem={({item}) => <RecipeCard ID={item} />}
      ListEmptyComponent={
        //TODO: Add the Create Recipe Card here!
        <Text>Placeholder.</Text>
      }
    />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    gap: 20,
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingTop: "5%",
  },
  rowWrapper: {
    gap: 20,
    justifyContent: 'flex-start',
    width: 370,
  },
});