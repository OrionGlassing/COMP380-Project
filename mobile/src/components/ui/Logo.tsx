import CoKitchenLogo from "@/assets/logo/CoKitchenLogo.svg";
import textstyles from "@/src/constants/textstyles";
import { theme } from "@/src/constants/theme";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  style?: object;
  label?: string;
}

export default function Logo({ style, label = "CoKitchen" }: Props) {
  return (
    <View
      style={[styles.container, style,]}
    >
      <CoKitchenLogo width={60} height={60} />
      <Text style={textstyles.header}>{label}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.logo,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.lg,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
});
