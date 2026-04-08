import { router } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../../src/constant/text-styles";
import Button from "@/src/components/ui/Button";

export default function CustomizeProfile() {
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
        Welcome to /app/customize-profile, here the user can edit profile
        settings.
      </Text>
      <Button
        label="Save and Exit"
        onPress={() => {
          router.dismissTo("/account");
        }}
      />
      <Button
        label="Cancel"
        onPress={() => {
          router.dismissTo("/account");
        }}
      />
    </View>
  );
}
