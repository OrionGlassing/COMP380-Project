import { Link } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../constants/text-styles";

export default function CreateAccount() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={textStyles.standard}>
        Welcome to /app/create-account, here the user creates a new acount with email password.
      </Text>
      <Link href={"./"} style={textStyles.link}>
        /app/sign-up
      </Link>
    </View>
  );
}
