import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import Icon from "./Icon";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}
export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.card}>
      <Pressable style={styles.header} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.title}>{title}</Text>
        <Icon
          name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color="white"
        />
      </Pressable>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#748CAB",
    borderRadius: 15,
    width: 300,
    overflow: "hidden",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
