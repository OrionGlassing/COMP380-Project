import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import Button from "../ui/Button";
import { useAuthStore } from "@/utils/authStore";
import { useRouter } from "expo-router";
import Icon from "../ui/Icon";
import { theme } from "@/src/constants/theme";
import textstyles from "@/src/constants/textstyles";
//keyboard handling... use keyboardAvoidingView and Platform imports, you
//can also use ScrollViews, Keyboard.dismiss(), and by adding returnKeyType
export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const logIn = useAuthStore((state) => state.logIn);
  const router = useRouter();

  const handleLogin = async () => {
      console.log("LOGIN BUTTON PRESSED");
      console.log("username:", username);
      console.log("password exists:", !!password);
      console.log("API URL:", process.env.EXPO_PUBLIC_API_URL);

      if (!password.trim() || !username.trim()) {
        console.log("LOGIN BLOCKED: missing fields");
        setError("All fields are required.");
        setPassword("");
        return;
      }
    
      try {
        console.log("CALLING logIn()");
        await logIn(username, password);
        console.log("logIn() FINISHED");
        router.replace("/");
      } catch (error) {
        console.error("LOGIN ERROR:", error);
        setError("Login failed. Confirm username and password.");
        setPassword("");
        return;
      }
      setError("");
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputRow}>
        <Icon name="person-outline" color={theme.colors.textMuted} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={theme.colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputRow}>
        <Icon name="lock-closed-outline" color={theme.colors.textMuted} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.colors.textMuted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {error ? <Text style={textstyles.error}>{error}</Text> : null}
      <Button
        label="Login"
        onPress={handleLogin}
        style={{ alignSelf: "stretch" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.lightinput,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.text,
  },
});
