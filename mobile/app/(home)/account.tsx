import { router } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../../src/constant/text-styles";
import { useAuthStore } from "@/utils/authStore";
import Button from "@/src/components/ui/Button";

export default function Account() {
  const { logOut } = useAuthStore();

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
        Welcome to /app/account, here the user can manage their account.
      </Text>
      <Button
        label="Customize Profile"
        onPress={() => {
          router.push("/customize-profile");
        }}
      />
      <Button
        label="Sign Out"
        onPress={() => {
          logOut();
          router.replace("/(Login)/SignUp");
        }}
      />
    </View>
  );
}
