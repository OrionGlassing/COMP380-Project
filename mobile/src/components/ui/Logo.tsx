import CoKitchenLogo from "@/assets/logo/Logo.svg";
import textStyles from "@/src/constants/text-styles";
import { View, Text, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.titleContainer}>
      <CoKitchenLogo width={50} height={50} />
      <View>
        <Text style={[textStyles.big, {color: 'white'}]}>CoKitchen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 50,
    gap: 10,
    borderRadius: 15,
    backgroundColor: "#0D1321",
  },
  title: {
    fontSize: 22,
    color: "white",
    padding: 10,
  },
});
