import { router } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../../src/constant/text-styles";

export default function SignUp() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f1f1f",
      }}
    >
      <Text style={textStyles.standard}>
        Welcome to /app/recipe, the page that displays the recipe data, and
        allows customizing and saving.
      </Text>
    </View>
  );
}
