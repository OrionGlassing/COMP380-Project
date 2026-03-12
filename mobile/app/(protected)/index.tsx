import { Link } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "../../constants/text-styles";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={textStyles.standard}>
        Welcome to /app/index, this is the landing page by expo convention.
      </Text>
      <Link href={"./sign-up"} style={textStyles.link}>
        /app/sign-up
      </Link>
      <Link href={"./create-account"} style={textStyles.link}>
        /app/create-account
      </Link>
      <Link href={"./account"} style={textStyles.link}>
        /app/account
      </Link>
      <Link href={"./customize-profile"} style={textStyles.link}>
        /app/customize-profile
      </Link>
      <Link href={"./explore"} style={textStyles.link}>
        /app/explore
      </Link>
      <Link href={"./cookbook"} style={textStyles.link}>
        /app/cookbook
      </Link>
      <Link href={"./create-recipe"} style={textStyles.link}>
        /app/create-recipe
      </Link>
      <Link href={"./create-account"} style={textStyles.link}>
        /app/recipe-loading
      </Link>
      <Link href={"./recipe"} style={textStyles.link}>
        /app/recipe
      </Link>

    </View>
  );
}
