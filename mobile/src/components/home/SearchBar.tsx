import { View, StyleSheet, TextInput } from "react-native";
import Icon from "../ui/Icon";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a recipe..."
        placeholderTextColor="black"
        value={search}
        onChangeText={setSearch}
        returnKeyType="search"
      />
      <Icon name="search-outline" />
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    gap: 10,
    flex: 1,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "black",
  },
});
