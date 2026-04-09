import Arrow from "@/src/components/ui/Arrow";
import { router } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function Help() {
  return (
    <View>
      <View style={styles.arrow}>
        <Arrow
          type={"arrow-back"}
          onPress={() => router.push("/(login)/Welcome")}
        />
      </View>
      <Text>Help</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    arrow: {
    alignSelf: "flex-start",
  },
});
