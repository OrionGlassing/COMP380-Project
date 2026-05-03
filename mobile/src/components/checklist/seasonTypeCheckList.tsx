import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import CheckableItem from "./checkableItem";
import { useCreateNewRecipeStore } from "@/utils/data-stores/createNewRecipeStore";
import textstyles from "@/src/constants/textstyles";
import { theme } from "@/src/constants/theme";

const SeasonTypeCheckList = () => {
  const seasonTypeOptions = useCreateNewRecipeStore((state) => state.seasonTypeOptions);
  const toggleSeasonOption = useCreateNewRecipeStore((state) => state.toggleSeasonOption);

  return (
    <View style={styles.container}>
      <Text style={textstyles.subHeader}>Select a season:</Text>
      <View style={styles.window}>
        <ScrollView nestedScrollEnabled contentContainerStyle={styles.listContent}>
          {seasonTypeOptions.map((type) => (
            <CheckableItem
              key={type.id}
              enabled={true}
              shouldCrossOut={false}
              label={type.label}
              isChecked={type.isChecked}
              buttonColor={theme.colors.lightinput}
              callBack={() => toggleSeasonOption(type.id)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default SeasonTypeCheckList;

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
