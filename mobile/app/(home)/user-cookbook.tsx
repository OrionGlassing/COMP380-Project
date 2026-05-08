import PageHeader from "@/src/components/ui/PageHeader";
import { theme } from "@/src/constants/theme";
import { View, StyleSheet, ScrollView, FlatList, Text, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RecipeCard from "@/src/components/recipe-cards/recipeCard";
import { useRecipeStore } from "@/utils/data-stores/recipeStore";
import { useEffect, useState } from "react";
import MakeNewRecipeCard from "@/src/components/recipe-cards/makeNewRecipeCard";

export default function UserCookbook() {
  //ui
  const insets = useSafeAreaInsets();

  //data
  const saved_recipes = useRecipeStore((state) => state.saved_recipes);
  const fetchSavedRecipes = useRecipeStore((state) => state.fetchSavedRecipes);

  //local data
  const [hydrated, setHydrated] = useState<boolean>(false);

  //Get the users saved recipes when page loads
  useEffect(() => {
    const load = async () => {
      await fetchSavedRecipes();
      setHydrated(true);
    }

    load();
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

    {hydrated ? (
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
        <View style={styles.rowWrapper}>
          <MakeNewRecipeCard />
        </View>
      }
    />
    ) : (
      <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}]}>
        <View style={[{paddingBottom: 200}]}>
          <ActivityIndicator size={'large'} color={theme.colors.primary} />
        </View>
      </View>
    )}
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