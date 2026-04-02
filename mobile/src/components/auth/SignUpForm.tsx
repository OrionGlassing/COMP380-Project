import { View, Text, TextInput, StyleSheet } from "react-native";

import { useState } from "react";
import { useRouter } from "expo-router";

import Button from "../ui/Button";

export default function SignUpForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    if (!password || !confirmPassword) {
      setError("All Fields Must Be Filled.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords dont Match");
      return;
    }
    setError("");
  };
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="UserName"
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button label={"Create"} onPress={handleSignUp} />
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
    backgroundColor: "#A9927D",
  },

  input: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    fontSize: 15,
    width: "100%",
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
  },
});
