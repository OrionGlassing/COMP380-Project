import PageHeader from "@/src/components/ui/PageHeader";
import { theme } from "@/src/constants/theme";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RecipeCard from "@/src/components/recipe-cards/recipeCard";

export default function UserCookbook() {
    //ui
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
    <PageHeader
        logoText="Cookbook"
        backButtonEnabled={true}
        profileButtonEnabled={true}
    />
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <View style={[styles.contentContainer, { paddingBottom: insets.bottom }]}>
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
            <RecipeCard ID="5" />
        </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
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