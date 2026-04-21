import { View, StyleSheet, Text, Pressable } from "react-native";
import Icon from "./Icon";
import { useState } from "react";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View>
      <Pressable style={styles.filterBtn} onPress={() => setIsOpen(!isOpen)}>
        <Text style={{ color: "white" }}>Filter</Text>
        <Icon name="filter-outline" color="white" />
      </Pressable>
      {isOpen && (<View style={styles.panel}>
        <Text>display options here</Text>
        </View>)}
    </View>
  );
}
const styles = StyleSheet.create({
  filterBtn: {
    backgroundColor: "#3E5C76",
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    gap: 10,
  },

  panel: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    zIndex: 10,
    minWidth: 150,
  },
});
