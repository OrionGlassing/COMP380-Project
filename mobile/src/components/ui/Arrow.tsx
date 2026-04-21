import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];
interface Props {
  type: IoniconsName;
  onPress: () => void;
}
export default function Arrow({ type, onPress }: Props) {
  return (
    <View>
      <Ionicons name={type} style={styles.arrow} onPress={onPress}></Ionicons>
    </View>
  );
}
const styles = StyleSheet.create({
  arrow: {
    fontSize: 35,
    color: "white",
  },
});
