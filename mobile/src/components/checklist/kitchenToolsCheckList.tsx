import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import CheckableItem from "./checkableItem";
import { useCustomizeProfileStore } from "@/utils/data-stores/customizeProfileStore";
import { theme } from "@/src/constants/theme";
import textstyles from "@/src/constants/textstyles";

const KitchenToolsCheckList = () => {
  const kitchenTools = useCustomizeProfileStore((state) => state.kitchenTools);
  const toggleKitchenTool = useCustomizeProfileStore((state) => state.toggleKitchenTool);

  return (
    <View style={styles.container}>
      <Text style={textstyles.subHeader}>Select your kitchen tools:</Text>
      <View style={styles.window}>
        <ScrollView nestedScrollEnabled contentContainerStyle={styles.listContent}>
          {kitchenTools.map((tool) => (
            <CheckableItem
              key={tool.id}
              enabled={true}
              shouldCrossOut={false}
              label={tool.label}
              isChecked={tool.isChecked}
              callBack={() => toggleKitchenTool(tool.id)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default KitchenToolsCheckList;

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    gap: theme.spacing.sm,
  },
  window: {
    height: 200,
    width: "100%",
    backgroundColor: theme.colors.darkinput,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
  },
  listContent: {
    paddingBottom: theme.spacing.md,
  },
});
