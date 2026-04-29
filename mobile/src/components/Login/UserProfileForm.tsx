import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import HorizontalMenu from "../ui/HorizontalMenu";
import Icon from "../ui/Icon";
import { useState } from "react";
import Divider from "../ui/Divider";
import Button from "../ui/Button";
import { Pressable } from "react-native";
import { theme } from "@/src/constants/theme";
import textstyles from "@/src/constants/textstyles";

export default function UserProfileForm() {
  const [allergyNone, setAllergyNone] = useState(false);
  const [add, setAdd] = useState(false);
  const handleSave = () => {};

  return (
    <ScrollView style={styles.scroll}>
      <Divider>DIET & RESTRICTIONS</Divider>

      <Text style={textstyles.body}>Select your diet:</Text>
      <HorizontalMenu />

      <Text style={textstyles.body}>Food allergies?</Text>
      <View style={styles.row}>
        <Pressable
          style={[styles.btn, allergyNone && styles.btnActive]}
          onPress={() => {
            setAllergyNone(true);
            setAdd(false);
          }}
        >
          <Text style={[textstyles.body, allergyNone && styles.textActive]}>
            None
          </Text>
        </Pressable>

        <Pressable
          style={[styles.btn, add && styles.btnActive]}
          onPress={() => {
            setAdd(!add);
            setAllergyNone(false);
          }}
        >
          <Icon name="add-outline" />
          <Text style={[textstyles.body, add && styles.textActive]}>Add</Text>
        </Pressable>
      </View>

      {add && (
        <TextInput
          style={styles.input}
          placeholder="Specify your allergies..."
          placeholderTextColor={theme.colors.textMuted}
        />
      )}

      <Divider>Food Preferences</Divider>

      <Text style={textstyles.body}>Ingredients you love:</Text>
      <TextInput
        style={styles.input}
        placeholder="Specify ingredients..."
        placeholderTextColor={theme.colors.textMuted}
      />

      <Text style={textstyles.body}>Ingredients you dislike:</Text>
      <TextInput
        style={styles.input}
        placeholder="Specify ingredients..."
        placeholderTextColor={theme.colors.textMuted}
      />

      <Text style={textstyles.body}>Preferred Spice Level</Text>
      {/* options work in progress */}

      <Divider>Cooking</Divider>

      <Text style={textstyles.body}>Experience Level:</Text>
      <Text style={textstyles.body}>Select available kitchen tools:</Text>

      <View style={styles.buttons}>
        <Button label="Exit" onPress={() => {}} style={{ flex: 1 }} />
        <Button
          label="Save and Exit"
          onPress={handleSave}
          style={{ flex: 1 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    padding: theme.spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    flexWrap: "wrap",
    marginVertical: theme.spacing.sm,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.lightinput,
  },
  btnActive: {
    backgroundColor: theme.colors.darkinput,
  },
  textActive: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: theme.colors.lightinput,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginVertical: theme.spacing.xs,
    fontSize: 14,
    color: theme.colors.text,
  },
  buttons: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
});
