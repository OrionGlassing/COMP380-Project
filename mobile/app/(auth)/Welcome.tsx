import GetStartedBtn from "@/src/components/auth/GetStartedBtn";
import { router } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Welcome() {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome!</Text>
        <GetStartedBtn onPress={() => router.replace("/(auth)/Login")}/>
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

  container: {
    backgroundColor: "#22333B",

    borderRadius: 15,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
    margin: 50,
  },

  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
});
