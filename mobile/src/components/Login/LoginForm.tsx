import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import Button from "../ui/Button";
import { useAuthStore } from "@/utils/authStore";
import { useRouter } from "expo-router";
import Icon from "../ui/Icon";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const logIn = useAuthStore((state) => state.logIn);
  const router = useRouter();

  const handleLogin = async () => {
    if (!password.trim() || !username.trim()) {
      setError("All field are required.");
      setPassword("");
      return;
    }
    
    try {
      await logIn(username, password);
      router.replace("/");
    } catch (error) {
      setError("Log in failed. Confirm username and password.");
      setPassword("");
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
          placeholder="Username"
          keyboardType="email-address"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View {...inputContainerProps}>
        <Icon name="lock-closed-outline" />
        <TextInput
          {...inputProps}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
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
  error: {
    fontSize: 15,
    color: "white",
  },
});
