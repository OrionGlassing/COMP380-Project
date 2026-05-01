import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Button from "../ui/Button";
import { useAuthStore } from "@/utils/authStore";
import Icon from "../ui/Icon";
import { theme } from "@/src/constants/theme";
import textstyles from "@/src/constants/textstyles";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const createNewAccount = useAuthStore((state) => state.createNewAccount);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    try {
      await createNewAccount(username, email, password);
      router.replace("/");
    } catch (error) {
      setError("Sign up failed. Please try again.");
      return;
    }
    setError("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.form}>
          <View style={styles.inputRow}>
            <Icon name="person-outline" color={theme.colors.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={theme.colors.textMuted}
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputRow}>
            <Icon name="mail-outline" color={theme.colors.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={theme.colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputRow}>
            <Icon name="lock-open-outline" color={theme.colors.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor={theme.colors.textMuted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputRow}>
            <Icon name="lock-closed-outline" color={theme.colors.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={theme.colors.textMuted}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          {error ? <Text style={textstyles.error}>{error}</Text> : null}
          <Button label="Create Account" onPress={handleSignUp} style={{ alignSelf: "stretch" }} />
          <Button label="Cancel" onPress={() => router.back()} style={{ alignSelf: "stretch" }} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
