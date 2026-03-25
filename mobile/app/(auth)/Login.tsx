import AppleBtn from "@/src/components/auth/AppleBtn";
import CreateAccountBtn from "@/src/components/auth/CreateAcountBtn";
import GoogleBtn from "@/src/components/auth/GoogleBtn";
import HelpBtn from "@/src/components/auth/HelpBtn";
import LoginForm from "@/src/components/auth/LoginForm";
import Divider from "@/src/components/ui/Divider";
import Logo from "@/src/components/ui/Logo";
import { router } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Login() {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <Logo/>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.btnContainer}>
          <GoogleBtn />
          <AppleBtn />
        </View>
        <Divider />
        <LoginForm />
        <Divider />
        <CreateAccountBtn onPress={() => router.replace("/(auth)/CreateAccount")}/>
        <HelpBtn />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#5E503F",
    padding: 20,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    gap: 10,
    padding: 15,

    backgroundColor: "#22333B",

    borderRadius: 15,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    color: "white",
    fontSize: 26,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
