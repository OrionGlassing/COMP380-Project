import Button from "@/src/components/ui/Button";
import Logo from "@/src/components/ui/Logo";
import {useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Welcome() {
  const router = useRouter();
  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>Welcome</Text>
          <Text style={styles.text}>
            coKitchen, your personal app recipe. Here youll be able to create,
            customize, and adapt your favorite recipes with the help of AI and
            personal input.
          </Text>
        </View>
        <Button
          label={"Get Started"}
          onPress={() => router.replace("/(login)/Login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#5E503F",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#899b39",
    padding: 10,
    margin: 10,
    borderRadius: 15,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },

  logo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    backgroundColor: "#22333B",
    borderRadius: 15,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    maxWidth: 320,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
    margin: 50,
  },

  textTitle: {
    fontSize: 25,
    color: "white",

  },

  text: {
    color: "white",
    fontSize: 15,
  },

});
