import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import CheckableItem from "./checkableItem";
import { useCustomizeProfileStore } from "@/utils/data-stores/customizeProfileStore";
import { theme } from "@/src/constants/theme";
import textstyles from "@/src/constants/textstyles";

const DietCheckList = () => {
  const dietOptions = useCustomizeProfileStore((state) => state.dietOptions);
  const toggleDiet = useCustomizeProfileStore((state) => state.toggleDiet);

  return (
    <View style={styles.container}>
      <Text style={textstyles.subHeader}>Select your diet(s):</Text>
      <View style={styles.window}>
        <ScrollView nestedScrollEnabled contentContainerStyle={styles.listContent}>
          {dietOptions.map((diet) => (
            <CheckableItem
              key={diet.id}
              enabled={true}
              shouldCrossOut={false}
              label={diet.label}
              isChecked={diet.isChecked}
              buttonColor={theme.colors.lightinput}
              callBack={() => toggleDiet(diet.id)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default DietCheckList;

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
