import { View, Text, TextInput, StyleSheet } from "react-native";

import { useState } from "react";
import { useRouter } from "expo-router";

import Button from "../ui/Button";
import { useAuthStore } from "@/utils/authStore";
import Icon from "../ui/Icon";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const createNewAccount = useAuthStore((state) => state.createNewAccount);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!username.trim() || !email.trim() || !password.trim()  || !confirmPassword.trim()) {
      setError("All field are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords dont Match");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    
    try {
      await createNewAccount(username, email, password);
      router.replace("/(Login)/Login");
    } catch (error) {
      //We may add a return type from the createNewAccount function
      //So that we can tell the user what went wrong
        //Ex: Username taken, email already exists, etc.
      setError("Account creation failed. Confirm username and password.");
    }

    setError("");
  };

  const inputProps = {
    style: styles.inputText,
    placeholderTextColor: "lightgrey",
  } as const;

  const inputContainerProps = {
    style: styles.input,
  } as const;

  return (
    <View style={styles.formContainer}>
      <View {...inputContainerProps}>
        <Icon name="person-outline" />
        <TextInput
          {...inputProps}
          placeholder="New Username"
          keyboardType="default"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View {...inputContainerProps}>
        <Icon name="mail-outline" />

        <TextInput
          {...inputProps}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View {...inputContainerProps}>
        <Icon name="lock-open-outline" />
        <TextInput
          {...inputProps}
          placeholder="New Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View {...inputContainerProps}>
        <Icon name="lock-closed-outline" />
        <TextInput
          {...inputProps}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button label={"Create Account"} onPress={handleSignUp} />
    </View>
  );
}
const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    gap: 10,
    padding: 30,
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3E5C76",
  },

  input: {
    flexDirection: "row",
    backgroundColor: "#1D2D44",
    borderRadius: 15,
    padding: 10,
    fontSize: 15,
    width: "100%",
    gap: 15,
  },

  inputText: {
    flex: 1,
    color: "white",
    fontSize: 15,
  },

  btn: {
    backgroundColor: "#F2F4F3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    padding: 10,
    alignItems: "center",
    width: "50%",
  },

  btnText: {
    fontSize: 15,
    fontWeight: "bold",
  },

  error: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
