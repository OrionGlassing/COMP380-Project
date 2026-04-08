import Button from "@/src/components/ui/Button";
import { router } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to /app/index, this is the landing page by expo convention.
      </Text>
      <Button
        label="Manage Account"
        onPress={() => {
          router.push("/(home)/account");
        }}
      />
      <Button
        label="Explore Page"
        onPress={() => {
          router.push("/(home)/explore");
        }}
      />
      <Button
        label="My Cookbook"
        onPress={() => {
          router.push("/(home)/cookbook");
        }}
      />
      <Button
        label="New Recipe"
        onPress={() => {
          router.push("/(home)/create-recipe");
        }}
      />
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
        backgroundColor: "#1f1f1f",
    },
    text: {
        fontSize: 24,
        color: "white",
    },
});
