import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AppleBtn() {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log("pressed")}
    >
      <Text style={styles.text}>Apple</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F4F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
