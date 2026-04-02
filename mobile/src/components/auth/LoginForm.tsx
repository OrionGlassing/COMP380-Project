import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import Button from "../ui/Button";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!password.trim() || !email.trim()) {
      setError("All field are required.");
      return;
    }
    setError("");
  };
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button label={"Login"} onPress={handleLogin} />
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

  error: {
    fontSize: 15,
    color: "red",
  }
});
