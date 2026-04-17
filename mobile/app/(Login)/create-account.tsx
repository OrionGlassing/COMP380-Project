import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "@/src/constants/text-styles";
import SimpleButton from "@/src/components/simpleButton";
import { useAuthStore } from "@/utils/authStore";

export default function CreateAccount() {
  const router = useRouter();
  const { logIn } = useAuthStore();

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
        Welcome to /app/create-account, here the user creates a new account with email and password.{"\n"}
        Create Account = Proceed to the app{"\n"}
        Back = Return to /app/sign-up
      </Text>
      <SimpleButton label="Create Account" onPress={logIn} />
    </View>
  );
}
