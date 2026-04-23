import { useRouter } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import textStyles from "@/src/constants/text-styles";
import SimpleButton from "@/src/components/simpleButton";
import { useAuthStore } from "@/utils/authStore";
import CustomTextInput from "@/src/components/textbox/TextBox";
import { useState } from "react";

export default function CreateAccount() {
  const router = useRouter();
  const createNewAccount = useAuthStore((state) => state.createNewAccount);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={styles.screen}>
    <ScrollView contentContainerStyle={styles.contentContainer}>

      <Text style={textStyles.Header}>
        New Account
      </Text>
      <CustomTextInput 
        value={username}
        onChangeText={setUsername}
        variant={'single'}
        placeholder={'Enter your username...'}
        keyboardType="email-address"
        returnKeyType="done"
      />
      <CustomTextInput 
        value={email}
        onChangeText={setEmail}
        variant={'single'}
        placeholder={'Enter your email...'}
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
      <CustomTextInput 
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        variant={'single'}
        placeholder={'Confirm password...'}
        secureTextEntry={true}
      />
      <SimpleButton 
        label="Create Account"
        onPress={ async () => {
          try {
            await createNewAccount(username, email, password);
            router.replace("/");
          } catch (error) {
            //Set the on screen error message.
          }
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