import { View, Text, StyleSheet } from "react-native";

export default function Divider() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
        <Text style={styles.text}>OR</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  text: {
    color: "#ccc",
    paddingHorizontal: 10,
    fontSize: 14,
  },
});
