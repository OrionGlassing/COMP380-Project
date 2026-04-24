import Arrow from "@/src/components/ui/Arrow";
import Logo from "@/src/components/ui/Logo";
import SearchBar from "@/src/components/home/SearchBar";
import { router } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import textStyles from "@/src/constants/text-styles";
import Filter from "@/src/components/ui/Filter";
import RecipeCard from "@/src/components/recipe-cards/recipeCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PageHeader from "@/src/components/ui/PageHeader";

export default function Explore() {
  //ui
  const insets = useSafeAreaInsets();

  return (
      <View style={styles.screen}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false} >

        <PageHeader 
          logoText="Explore"
          backButtonEnabled={true}
          profileButtonEnabled={true}
        />

      <View style={[styles.contentContainer, {paddingBottom: insets.bottom}]} >

      <View style={styles.searchRow}>
        <SearchBar />
        <Filter />
      </View>
      <View style={styles.options}>
        <View style={styles.optionsNav}>
          <Text>New Picks: </Text>
          <Arrow
            type={"arrow-forward"}
            onPress={() => router.push("/(home)/NewPicks")}
          />
        </View>
        <View>
          <RecipeCard ID={'5'} />
        </View>
      </View>
      <View style={styles.options}>
        <View style={styles.optionsNav}>
          <Text>Popular Right Now: </Text>
          <Arrow
            type={"arrow-forward"}
            onPress={() => router.push("/(home)/PopularRightNow")}
          />
        </View>
        <Text>Display cards</Text>
      </View>
      <View style={styles.options}>
        <View style={styles.optionsNav}>
          <Text>Your Favorites: </Text>
          <Arrow
            type={"arrow-forward"}
            onPress={() => router.push("/(home)/YourFavorites")}
          />
        </View>
        <Text>Display cards</Text>
      </View>

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
    //justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: '5%',
    paddingTop: '5%',
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    gap: 15,
    padding: 15,
    backgroundColor: "#F0EBD8",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },

  options: {
    gap: 20,
  },

  optionsNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#748CAB",
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
