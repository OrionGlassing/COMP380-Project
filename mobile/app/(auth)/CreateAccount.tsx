import Logo from "@/src/components/ui/Logo";
import { View, Text, StyleSheet } from "react-native";

export default function CreateAccount() {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <Logo />
        <Text style={styles.title}>Create Account</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#5E503F",
    padding: 20,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    gap: 10,
    padding: 15,

    backgroundColor: "#22333B",

    borderRadius: 15,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
