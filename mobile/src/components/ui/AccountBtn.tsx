import { StyleSheet, Text, Pressable, View } from "react-native";
import Icon from "./Icon";

interface Props {
    onPress: () => void;
}
export default function AccountBtn({onPress}: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Icon name="person-outline" size={40} color="white" />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3E5C76",

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    padding: 10,
  },
});
