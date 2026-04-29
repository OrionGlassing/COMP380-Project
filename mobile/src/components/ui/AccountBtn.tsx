import { StyleSheet, Pressable } from "react-native";
import Icon from "./Icon";
import { theme } from "@/src/constants/theme";

interface Props {
  onPress: () => void;
}
export default function AccountBtn({ onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Icon name="person" size={35} color={theme.colors.darkinput} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.button,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 3,
        spreadDistance: 0,
        color: "rgba(0,0,0,0.4)",
        //inset: true,
      },
    ],
  },
});
