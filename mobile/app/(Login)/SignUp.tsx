import SignUpForm from "@/src/components/Login/SignUpForm";
import Logo from "@/src/components/ui/Logo";
import React from "react";
import { View, Text } from "react-native";
import { theme } from "@/src/constants/theme";
import textstyles from "@/src/constants/textstyles";

export default function SignUp() {
  return (
    <View style={theme.container.page}>
      <Logo />
      <Text style={textstyles.header}>New Account</Text>
      <SignUpForm />
    </View>
  );
}
