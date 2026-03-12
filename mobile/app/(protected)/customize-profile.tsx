import { Link } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../../constants/text-styles";

export default function CustomizeProfile() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={textStyles.standard}>
        Welcome to /app/customize-profile, here the user can edit profile settings.
      </Text>
      <Link href={"./"} style={textStyles.link}>
        /app/index
      </Link>
    </View>
  );
}