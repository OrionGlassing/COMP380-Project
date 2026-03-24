import AppleBtn from "@/src/components/AppleBtn";
import CreateAccountBtn from "@/src/components/CreateAcountBtn";
import Divider from "@/src/components/Divider";
import GoogleBtn from "@/src/components/GoogleBtn";
import HelpBtn from "@/src/components/HelpBtn";
import LoginForm from "@/src/components/LoginForm";
import Logo from "@/src/components/Logo";
import { View, Text, StyleSheet } from "react-native";

export default function Login() {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Logo />
          <View>
            <Text style={styles.title}>coKITCHEN</Text>
          </View>
        </View>
        <Text style={styles.title2}>Sign In</Text>
        <View style={styles.btnContainer}>
          <GoogleBtn />
          <AppleBtn />
        </View>
        <Divider />
        <LoginForm />
        <Divider />
        <CreateAccountBtn />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
  },
  title2: {
    color: "white",
    fontSize: 26,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 10,
    borderRadius: 15,
    backgroundColor: "#F2F4F3",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
