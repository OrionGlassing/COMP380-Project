import Button from "@/src/components/ui/Button";
import Logo from "@/src/components/ui/Logo";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
//right now this page is being ignored, do we delete it ?

export default function Welcome() {
  const router = useRouter();
  return (
    <View style={styles.pageContainer}>
      <View>
        <Logo />
      </View>
      <Text style={styles.textTitle}>Build your receipe!</Text>
      <Text style={styles.text}>
        coKitchen, your personal recipe app. Here you'll be able to create,
        customize, and adapt your favorite recipes with the help of AI and
        personal input.
      </Text>
      <Button
        label={"Get Started"}
        onPress={() => {
          console.log("pressed");
          router.replace("/(login)/SignUp");
        }}
      />
      <Text>Already have an account?</Text>
      <Button
        label={"Login"}
        onPress={() => {
          console.log("pressed");
          router.replace("/(login)/Login");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    backgroundColor: "#F0EBD8",
  },
  textTitle: {
    fontSize: 25,
    color: "black",
  },

  text: {
    padding: 10,
    margin: 10,
    maxWidth: 300,
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },
});
