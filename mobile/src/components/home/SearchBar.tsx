import { View, StyleSheet, TextInput } from "react-native";
import Icon from "../ui/Icon";
import { useState } from "react";
import { theme } from "@/src/constants/theme";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a recipe..."
        placeholderTextColor={theme.colors.textMuted}
        value={search}
        onChangeText={setSearch}
        returnKeyType="search"
      />
      <Icon name="search-outline" color={theme.colors.textMuted} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.lightinput,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    gap: theme.spacing.sm,
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.text,
  },
});
