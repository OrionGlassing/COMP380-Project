import { useRouter } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import textStyles from "@/src/constants/text-styles";
import SimpleButton from "@/src/components/simpleButton";
import { useAuthStore } from "@/utils/authStore";
import CustomTextInput from "@/src/components/textbox/TextBox";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const logIn = useAuthStore((state) => state.logIn);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.screen}>
    <ScrollView contentContainerStyle={styles.contentContainer}>

      <Text style={textStyles.Header}>
        Welcome to CoKitchen!
      </Text>
      <SimpleButton 
        label="Continue with Google"
        onPress={() => {
          console.log("This is not implemented yet.")
        }}
      />
      <SimpleButton 
        label="Continue with Apple"
        onPress={() => {
          console.log("This is not implemented yet.")
        }}
      />
      <CustomTextInput 
        value={username}
        onChangeText={setUsername}
        variant={'single'}
        placeholder={'Enter your username...'}
        keyboardType="email-address"
        returnKeyType="done"
      />
      <CustomTextInput 
        value={password}
        onChangeText={setPassword}
        variant={'single'}
        placeholder={'Enter your password...'}
        secureTextEntry={true}
      />
      <SimpleButton 
        label="Log In"
        onPress={ async () => {
          try {
            await logIn(username, password);
            router.replace("/");
          } catch (error) {
            //Set the on screen error message.
          }
        }}
      />
      <SimpleButton
        label="New Account"
        onPress={() => {
          router.push("/create-account");
        }}
      />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#1f1f1f",
    },
    contentContainer: {
      flexDirection: "column",
      gap: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: '5%'
    },
});