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

    {/*THIS NEEDS TO BE A FLATLIST*/}
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <View style={[styles.contentContainer, { paddingBottom: insets.bottom }]}>
            <View style={styles.grid} >
              <RecipeCard ID="5" />
              <RecipeCard ID="5" />
              <RecipeCard ID="5" />

              {/*DYNAMIC CARD GENERATOR GOES HERE*/}

            </View>
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
    gap: 20,
    //justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingTop: "5%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start", 
    gap: 20,
    width: 370, 
},
});