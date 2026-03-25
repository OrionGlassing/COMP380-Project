import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
    onPress: () => void;
}

export default function GetStartedBtn({onPress}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.text}>Get Started</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    backgroundColor: "#F2F4F3",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    maxWidth: 200,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
