import SignUpForm from "@/src/components/Login/SignUpForm";
import Logo from "@/src/components/ui/Logo";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Arrow from "@/src/components/ui/Arrow";
import { router } from "expo-router";

export default function SignUp() {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <View style={styles.arrow}>
          <Arrow
            type={"arrow-back"}
            onPress={() => router.dismissTo("/login")}
          />
        </View>
        <Logo />
        <Text style={styles.title}>New Account</Text>
        <SignUpForm />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  arrow: {
    alignSelf: "flex-start",
  },

  pageContainer: {
    flex: 1,
    backgroundColor: "#F0EBD8",
    padding: 20,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    gap: 10,
    padding: 15,

    backgroundColor: "#748CAB",

    borderRadius: 15,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  text: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
  },
});
