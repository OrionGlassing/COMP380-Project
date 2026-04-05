import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../constants/text-styles";
import SimpleButton from "../components/simpleButton";
import { useAuthStore } from "@/utils/authStore";

export default function SignUp() {
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
        Welcome to /app/sign-up, here the user can 3rd party auth, login, or create account.{"\n"}
        Log In = Proceed to the app{"\n"}
        Create Account = Visit create account page
      </Text>
      <SimpleButton 
        label="Log In"
        onPress={() => {
          logIn();
          router.replace("/");
        }}
      />
      <SimpleButton
        label="Create Account"
        onPress={() => {
          router.push("/create-account");
        }}
      />
    </View>
  );
}