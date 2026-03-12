import { Link } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../constants/text-styles";

export default function Account() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={textStyles.standard}>
        Welcome to /app/account, here the user can manage their account.
      </Text>
      <Link href={"./"} style={textStyles.link}>
        /app/index
      </Link>
    </View>
  );
}