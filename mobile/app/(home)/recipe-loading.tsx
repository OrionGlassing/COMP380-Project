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
        Welcome to /app/recipe-loading, the loading screen while the recipe
        generates.{"\n"}
        This page will automatically transition to the next page, but for now
        it's manual.
      </Text>
      <Button
        label="Proceed"
        onPress={() => {
          router.replace("/(home)/recipe/[id]");
        }}
      />
    </View>
  );
}
