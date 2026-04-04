import { router } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../../constants/text-styles";
import SimpleButton from "@/components/simpleButton";

export default function CustomizeProfile() {
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
        Welcome to /app/customize-profile, here the user can edit profile settings.
      </Text>
      <SimpleButton
        label="Save and Exit"
        onPress={() => {
          router.dismissTo("/account");
        }}
      />
      <SimpleButton
        label="Cancel"
        onPress={() => {
          router.dismissTo("/account");
        }}
      />
    </View>
  );
}