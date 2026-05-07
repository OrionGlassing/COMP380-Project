import SignUpForm from "@/src/components/Login/SignUpForm";
import React from "react";
import { View, Text, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from "react-native";
import { theme } from "@/src/constants/theme";
import textstyles from "@/src/constants/textstyles";
import PageHeader from "@/src/components/ui/PageHeader";

export default function SignUp() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior='padding'
        style={{flex:1}}
      >
        <View style={theme.container.page}>
          <PageHeader
            logoText={"CoKitchen"}
            backButtonEnabled={false}
            profileButtonEnabled={false}
            transparent={true}
          />
          <Text style={textstyles.header}>New Account</Text>
          <SignUpForm />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
