import { router } from "expo-router";
import { Text, View } from "react-native";
import textstyles from "@/src/constants/textstyles";
import { useAuthStore } from "@/utils/authStore";
import { theme } from "@/src/constants/theme";
import Button from "@/src/components/ui/Button";
import PageHeader from "@/src/components/ui/PageHeader";

export default function Account() {
  const logOut = useAuthStore((state) => state.logOut);


  return (
    <View
      style={[
        theme.container.page,
        {
          backgroundColor: theme.colors.background,
          justifyContent: "flex-start",
          gap: theme.spacing.md,
        },
      ]}
    >

      <PageHeader logoText={"Account"} backButtonEnabled={true} profileButtonEnabled={false}/>

      <Text style={[textstyles.header]}>Manage your account</Text>

      <View style={{ gap: theme.spacing.sm, alignSelf: "stretch" }}>
        <Button
          label="Customize Profile"
          onPress={() => router.push("/customize-profile")}
          style={{ alignSelf: "stretch" }}
        />
        <Button
          label="Sign Out"
          onPress={() => {
            logOut();
            router.replace("/");
          }}
          style={{
            alignSelf: "stretch",
            backgroundColor: theme.colors.primary,
          }}
        />
      </View>
    </View>
  );
}