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
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { logIn } = useAuthStore();
  const router = useRouter();

  const handleLogin = () => {
    if (!password.trim() || !email.trim()) {
      setError("All field are required.");
      return;
    }
    logIn();
    router.replace("/(home)/Home");
    setError("");
  };

  const inputProps = {
    style: styles.inputText,
    placeholderTextColor: "white",
  } as const;

  const inputContainerProps = {
    style: styles.input,
  } as const;
  return (
    <View style={styles.formContainer}>
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
        <Icon name="lock-closed-outline" />
        <TextInput
          {...inputProps}
          placeholder="Confirm Password"
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
