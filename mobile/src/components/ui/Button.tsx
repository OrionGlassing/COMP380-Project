import { Pressable, Text, StyleSheet } from "react-native";
interface Props {
  label: string;
  onPress: () => void;
}

export default function Button({ label, onPress }: Props) {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
    btn: {
    backgroundColor: "#F2F4F3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    padding: 10,
    alignItems: "center",
    width: "50%",
  },

  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
});