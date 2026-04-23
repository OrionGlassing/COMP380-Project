import { router } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../../src/constant/text-styles";
import Button from "@/src/components/ui/Button";

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
        Welcome to /app/create-recipe, the page to generate a new recipe.
      </Text>
      <Button
        label="Let's Cook"
        onPress={() => {
          router.replace("/recipe-loading");
        }}
      />
    </View>
  );
}
