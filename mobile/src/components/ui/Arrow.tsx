import { theme } from "@/src/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

interface Props {
  type: IoniconsName;
  onPress: () => void;
  style?: object;
}

export default function Arrow({ type, onPress, style }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Ionicons name={type} style={[styles.icon, style]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    padding: theme.spacing.sm,
  },
  icon: {
    fontSize: 35,
    color: theme.colors.text,
  },
});


