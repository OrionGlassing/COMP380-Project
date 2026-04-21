import { View, Text, StyleSheet } from "react-native";

interface Props {
  children?: React.ReactNode
}
export default function Divider({children="OR"}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
        <Text style={styles.text}>{children}</Text>
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
    backgroundColor: "#1D2D44",
  },
  text: {
    color: "#1D2D44",
    paddingHorizontal: 10,
    fontSize: 14,
  },
});
