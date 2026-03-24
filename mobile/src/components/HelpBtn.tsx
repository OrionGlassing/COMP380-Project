import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HelpBtn() {
  return (
    <TouchableOpacity onPress={() => console.log("help")}>
      <Text style={styles.title}>Help</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
