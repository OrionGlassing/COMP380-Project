import { router } from "expo-router";
import { Text, View, StyleSheet, } from "react-native";
import textStyles from "@/src/constants/text-styles";
import SimpleButton from "@/src/components/simpleButton";

export default function SignUp() {
  return (
    <View
      style={styles.screen}
    >
      <Text style={textStyles.standard}>
        Welcome to /app/recipe-loading, the loading screen while the recipe generates.{"\n"}
        This page will automatically transition to the next page, but for now it's manual.
      </Text>
      <SimpleButton
        label="Proceed"
        onPress={() => {
          router.replace("/recipe");
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f1f1f"
    },
});