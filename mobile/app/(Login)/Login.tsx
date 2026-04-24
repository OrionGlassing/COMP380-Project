import AppleBtn from "@/src/components/Login/SocialButtons/AppleBtn";
import GoogleBtn from "@/src/components/Login/SocialButtons/GoogleBtn";
import LoginForm from "@/src/components/Login/LoginForm";
import Divider from "@/src/components/ui/Divider";
import Logo from "@/src/components/ui/Logo";
import { View, Text, StyleSheet } from "react-native";
import Button from "@/src/components/ui/Button";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <Logo />
        <View style={styles.socialBtnContainer}>
          <GoogleBtn />
          <AppleBtn />
        </View>
        <Divider />
        <LoginForm />
        <Divider />
        <Button label={"Create Account"} onPress={() => {router.push("/signUp")}} />
        <Divider />
        <View style={styles.helpBtn}>
          <Button label={"Help"} onPress={() => router.push("/help")} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
    color: "white",
    fontSize: 26,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
  socialBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  helpBtn: {
    alignItems: "center",
    marginTop: 10,
  },
  arrow: {
    alignSelf: "flex-start",
  },
});
