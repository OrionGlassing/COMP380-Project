import { useContext, } from "react";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../constants/text-styles";
import { AuthContext } from "@/utils/authContext";

export default function SignUp() {
  const authContext = useContext(AuthContext);

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
