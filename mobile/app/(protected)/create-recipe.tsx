import { router } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "@/src/constants/text-styles";
import SimpleButton from "@/src/components/simpleButton";

export default function SignUp() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f1f1f"
      }}
    >
      <Text style={textStyles.standard}>
        Welcome to /app/create-recipe, the page to generate a new recipe.
      </Text>
      <SimpleButton
        label="Let's Cook"
        onPress={() => {
          router.replace("/loading-recipe");
        }}
      />
    </View>
  );
}