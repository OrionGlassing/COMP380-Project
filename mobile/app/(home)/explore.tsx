import Arrow from "@/src/components/ui/Arrow";
import Logo from "@/src/components/ui/Logo";
import SearchBar from "@/src/components/home/SearchBar";
import { router } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import textStyles from "@/src/constants/text-styles";
import Filter from "@/src/components/ui/Filter";
import RecipeCard from "@/src/components/recipe-cards/recipeCard";

export default function Explore() {
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Arrow
            type={"arrow-back"}
            onPress={() => router.back()}
          />
        <Logo />
      </View>
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
  );
}
const styles = StyleSheet.create({
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
