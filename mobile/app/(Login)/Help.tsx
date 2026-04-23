import Accordion from "@/src/components/ui/Accordion";
import Arrow from "@/src/components/ui/Arrow";
import { router } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function Help() {
  return (
    <View style={styles.Container}>
      <View style={styles.arrow}>
        <Arrow
          type={"arrow-back"}
          onPress={() => router.back()}
        />
      </View>
      <Accordion title="Getting Started">
        <Text style={{ color: "black" }}>To get started with...</Text>
      </Accordion>
      <Accordion title="Recipes">
        <Text style={{ color: "black" }}>To get started with the... </Text>
      </Accordion>
      <Accordion title="My Cookbook">
        <Text style={{ color: "black" }}>To get started with the... </Text>
      </Accordion>
      <Accordion title="Account">
        <Text style={{ color: "black" }}>To get started with the.. </Text>
      </Accordion>
      <Accordion title="FAQ">
        <Text style={{ color: "black" }}>questions?... </Text>
      </Accordion>
      <Accordion title="Feedback">
        <Text style={{ color: "black" }}>
          What do you think about our app?...
        </Text>
      </Accordion>
      <Accordion title="About">
        <Text style={{ color: "black" }}>Our info...</Text>
      </Accordion>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0EBD8",
  },
  arrow: {
    alignSelf: "flex-start",
    padding: 15,
  },

  card: {},
});
