import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import CheckableItem from "./checkableItem";
import { useCreateNewRecipeStore } from "@/utils/data-stores/createNewRecipeStore";
import { theme } from "@/src/constants/theme";
import textstyles from "@/src/constants/textstyles";

const RecipeTypeCheckList = () => {
  const recipeTypeOptions = useCreateNewRecipeStore((state) => state.recipeTypeOptions);
  const toggleRecipeOption = useCreateNewRecipeStore((state) => state.toggleRecipeOption);

  return (
    <View style={styles.container}>
      <Text style={textstyles.subHeader}>Select recipe type:</Text>
      <View style={styles.window}>
        <ScrollView nestedScrollEnabled contentContainerStyle={styles.listContent}>
          {recipeTypeOptions.map((type) => (
            <CheckableItem
              key={type.id}
              enabled={true}
              shouldCrossOut={false}
              label={type.label}
              isChecked={type.isChecked}
              callBack={() => toggleRecipeOption(type.id)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default RecipeTypeCheckList;

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