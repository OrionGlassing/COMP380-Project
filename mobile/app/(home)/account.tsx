import { router } from "expo-router";
import { Text, View } from "react-native";
import textStyles from "@/src/constants/text-styles";
import SimpleButton from "@/src/components/simpleButton";
import { useAuthStore } from "@/utils/authStore";
import Arrow from "@/src/components/ui/Arrow";

export default function Account() {
  const logOut = useAuthStore((state) => state.logOut);

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
        Welcome to /app/account, here the user can manage their account.
      </Text>
      <SimpleButton
        label="Customize Profile"
        onPress={() => {
          router.push("/customize-profile");
        }}
      />
      <SimpleButton
        label="Sign Out"
        onPress={() => {
          logOut();
          router.replace("/");
        }}
      />
      <Arrow
        type={"arrow-back"}
        onPress={() => router.back()}
      />
    </View>
  );
}
