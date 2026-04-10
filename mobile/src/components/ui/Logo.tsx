import CoKitchenLogo from "@/assets/logo/Logo.svg";
import { View, Text, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.titleContainer}>
      <CoKitchenLogo width={100} height={50} />
      <View>
        <Text style={styles.title}>coKITCHEN</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 10,
    borderRadius: 15,
    backgroundColor: "#F2F4F3",
  },
  title: {
    fontSize: 22,
  },
});
