import { Link } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../constants/text-styles";

export default function SignUp() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={textStyles.standard}>
        Welcome to /app/sign-up, here the user can 3rd party auth, login, or create account.
      </Text>
      <Link href={"./"} style={textStyles.link}>
        /app/index
      </Link>
    </View>
  );
}
