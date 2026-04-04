import { Link, router } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../../constants/text-styles";
import SimpleButton from "@/components/simpleButton";

export default function Index() {
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
        Welcome to /app/index, this is the landing page by expo convention.
      </Text>
      <SimpleButton
        label="Manage Account"
        onPress={() => {
          router.push("/account");
        }}
      />
      <SimpleButton
        label="Explore Page"
        onPress={() => {
          router.push("/explore");
        }}
      />
      <SimpleButton
        label="My Cookbook"
        onPress={() => {
          router.push("/cookbook");
        }}
      />
      <SimpleButton
        label="New Recipe"
        onPress={() => {
          router.push("/create-recipe");
        }}
      />
    </View>
  );
}
