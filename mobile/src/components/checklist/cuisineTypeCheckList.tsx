import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import CheckableItem from "./checkableItem";
import { useCreateNewRecipeStore } from "@/utils/data-stores/createNewRecipeStore";
import { theme } from "@/src/constants/theme";
import textstyles from "@/src/constants/textstyles";

const CuisineTypeCheckList = () => {
  const cuisineTypeOptions = useCreateNewRecipeStore((state) => state.cuisineTypeOptions);
  const toggleCuisineOption = useCreateNewRecipeStore((state) => state.toggleCuisineOption);

  return (
    <View style={styles.container}>
      <Text style={textstyles.subHeader}>Select cuisine:</Text>
      <View style={styles.window}>
        <ScrollView nestedScrollEnabled contentContainerStyle={styles.listContent}>
          {cuisineTypeOptions.map((type) => (
            <CheckableItem
              key={type.id}
              enabled={true}
              shouldCrossOut={false}
              label={type.label}
              isChecked={type.isChecked}
              callBack={() => toggleCuisineOption(type.id)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default CuisineTypeCheckList;

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    gap: theme.spacing.sm,
  },
  window: {
    height: 200,
    width: "100%",
    backgroundColor: theme.colors.option,
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