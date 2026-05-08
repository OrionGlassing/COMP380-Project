import textstyles from "@/src/constants/textstyles";
import { theme } from "@/src/constants/theme";
import { Pressable, Text, StyleSheet } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
  style?: object;
}

export default function Button({ label, onPress, style }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Text style={textstyles.button}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.button,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
});
