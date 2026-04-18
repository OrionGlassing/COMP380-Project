import AccountBtn from "@/src/components/ui/AccountBtn";
import Button from "@/src/components/ui/Button";
import Icon from "@/src/components/ui/Icon";
import Logo from "@/src/components/ui/Logo";
import { router } from "expo-router";
import { View, StyleSheet, Text, Image } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <Logo />
        <AccountBtn onPress={() => router.push("/(home)/Account")} />
      </View>
      <View style={styles.card}>
        <Image
          source={require("@/assets/cards/Variety-Food-Image.png")}
          style={styles.cardImage}
        />
        <View style={styles.cardIconRow}>
          <Icon name="search-outline" color="white" size={18} />
          <Text style={styles.cardLabel}>Explore</Text>
        </View>
        <Button
          label="Browse Recipes"
          onPress={() => router.push("/(home)/Explore")}
        />
      </View>

      <View style={styles.card}>
        <Image
          source={require("@/assets/cards/Recipe-Book-Image.png")}
          style={styles.cardImage}
        />
        <View style={styles.cardIconRow}>
          <Icon name="bookmark-outline" color="white" size={18} />
          <Text style={styles.cardLabel}>My Cookbook</Text>
        </View>
        <Button
          label="My Cookbook"
          onPress={() => router.push("/(home)/Cookbook")}
        />
      </View>

      <View style={styles.card}>
        <Image
          source={require("@/assets/cards/Cooking-Image.png")}
          style={styles.cardImage}
        />
        <View style={styles.cardIconRow}>
          <Icon name="add-circle-outline" color="white" size={18} />
          <Text style={styles.cardLabel}>New Recipe</Text>
        </View>
        <Button
          label="New Recipe"
          onPress={() => router.push("/(home)/Create-recipe")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0EBD8",
  },
  topNav: {
    flexDirection: "row",
    gap: 15,
  },
  card: {
    backgroundColor: "#748CAB",
    borderRadius: 15,
    overflow: "hidden",
    width: 300,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  cardImage: {
    width: "100%",
    height: 130,
  },
  cardIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cardLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  
});
