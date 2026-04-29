import UserProfileForm from "@/src/components/Login/UserProfileForm";
import Logo from "@/src/components/ui/Logo";
import textstyles from "@/src/constants/textstyles";
import { theme } from "@/src/constants/theme";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function UserProfile() {
  return (
    <ScrollView contentContainerStyle={theme.container.page}>
      <Logo />
      <View style={[theme.container.content, {marginVertical:16, alignSelf: "flex-start",}]}>
        <Text style={textstyles.header}>Your Profile</Text>
        <Text style={textstyles.subHeader}>Help us personalize your experience</Text>
      </View>
      <UserProfileForm />
    </ScrollView>
  );
}
