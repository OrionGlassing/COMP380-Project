import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../constants/text-styles";
import SimpleButton from "@/components/simpleButton";
import { useAuthStore } from "@/utils/authStore";

export default function CreateAccount() {
  const router = useRouter();
  const { logIn } = useAuthStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={textStyles.standard}>
        Welcome to /app/create-account, here the user creates a new account with email and password.{"\n"}
        Create Account = Proceed to the app{"\n"}
        Back = Return to /app/sign-up
      </Text>
      <SimpleButton label="Create Account" onPress={logIn} />
      <SimpleButton
        label="Back"
        onPress={() => {
          router.dismissTo("/sign-up")
        }}
      />
    </View>
  );
}
