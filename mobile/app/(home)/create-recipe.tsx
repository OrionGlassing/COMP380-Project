import { router } from "expo-router";
import { Text, View } from "react-native";
import Button from "@/src/components/ui/Button";
import textstyles from "@/src/constants/textstyles";

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
      <Text style={textstyles.body}>
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
