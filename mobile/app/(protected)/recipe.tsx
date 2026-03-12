import { Link } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../../constants/text-styles";

export default function SignUp() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={textStyles.standard}>
        Welcome to /app/recipe, the page that displays the recipe data, and allows customizing and saving.
      </Text>
      <Link href={"./"} style={textStyles.link}>
        /app/index
      </Link>
    </View>
  );
}