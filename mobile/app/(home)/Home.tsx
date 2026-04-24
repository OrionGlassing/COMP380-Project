import AccountBtn from "@/src/components/ui/AccountBtn";
import Button from "@/src/components/ui/Button";
import Icon from "@/src/components/ui/Icon";
import Logo from "@/src/components/ui/Logo";
import PageHeader from "@/src/components/ui/PageHeader";
import { router } from "expo-router";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  //ui
  const insets = useSafeAreaInsets();

  return (
      <View style={styles.screen}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false} >

        <PageHeader 
          logoText="CoKitchen"
          backButtonEnabled={false}
          profileButtonEnabled={true}
        />

      <View style={[styles.contentContainer, {paddingBottom: insets.bottom}]} >
      
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
          onPress={() => router.push("/explore")}
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
          onPress={() => router.push("/cookbook")}
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
          onPress={() => router.push("/create-new-recipe")}
        />
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: '5%',
  },
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
