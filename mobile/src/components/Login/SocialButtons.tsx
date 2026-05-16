import textstyles from "@/src/constants/textstyles";
import { theme } from "@/src/constants/theme";
import { Text, Pressable, View, StyleSheet } from "react-native";

export default function SocialButtons() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={() => console.log("Google pressed")}>
        <Text style={textstyles.button}>Google</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={() => console.log("Apple pressed")}>
        <Text style={textstyles.button}>Apple</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },
  btn: {
    backgroundColor: theme.colors.button,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
});
