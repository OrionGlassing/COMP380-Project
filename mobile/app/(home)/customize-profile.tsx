import { useState, useEffect } from 'react';
import { router } from "expo-router";
import { ScrollView, Text, View, StyleSheet, } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import textStyles from "@/src/constants/text-styles";
import SimpleButton from "@/src/components/simpleButton";
import LabeledSlider from "@/src/components/sliders/LabeledSlider";
import { useCustomizeProfileStore } from "@/utils/data-stores/customizeProfileStore";
import DietCheckList from "@/src/components/checklist/dietCheckList";
import CustomTextInput from "@/src/components/textbox/TextBox";
import KitchenToolsCheckList from '@/src/components/checklist/kitchenToolsCheckList';

export default function CustomizeProfile() {
  //Fetch the data for this page from the database
  //This wants to be called at the launch of the app, might be removed from here
  const fetchUserProfile = useCustomizeProfileStore((state) => state.fetchUserProfile);

    useEffect(() => {
        //fetchUserProfile();
    }, []);

  //Import customize profile store data (one-by-one for efficient rendering)
  const dietDescription = useCustomizeProfileStore((state) => state.dietDescription);
  const setDietDescription = useCustomizeProfileStore((state) => state.setDietDescription);

  const allergyDescription = useCustomizeProfileStore((state) => state.allergyDescription);
  const setAllergyDescription = useCustomizeProfileStore((state) => state.setAllergyDescription);

  const lovedIngredientsDescription = useCustomizeProfileStore((state) => state.lovedIngredientsDescription);
  const setLovedIngredientsDescription = useCustomizeProfileStore((state) => state.setLovedIngredientsDescription);

  const hatedIngredientsDescription = useCustomizeProfileStore((state) => state.hatedIngredientsDescription);
  const setHatedIngredientsDescription = useCustomizeProfileStore((state) => state.setHatedIngredientsDescription);

  const cookingExperienceIndex = useCustomizeProfileStore((state) => state.cookingExperienceIndex);
  const setCookingExperience = useCustomizeProfileStore((state) => state.setCookingExperience);

  return (
    <SafeAreaView style={styles.screen}>
    <ScrollView contentContainerStyle={styles.contentContainer}>

      <Text style={textStyles.Header}>
        Diet & Restrictions
      </Text>

      <DietCheckList />

      <Text style={[textStyles.Label, {marginBottom: -10}]}>
        Describe your diet:
      </Text>
      <CustomTextInput
        value={dietDescription}
        onChangeText={(s) => {setDietDescription(s)}}
        variant="multiline-fixed"
        placeholder="My diet consists of..."
        keyboardType='default'
      />

      <Text style={[textStyles.Label, {marginBottom: -10}]}>
        List your food allergies:
      </Text>
      <CustomTextInput
        value={allergyDescription}
        onChangeText={(s) => {setAllergyDescription(s)}}
        variant="multiline-fixed"
        placeholder="Ex: Nuts, Shellfish, Milk..."
        keyboardType='default'
      />

      <Text style={textStyles.Header}>
        Food Preferences
      </Text>

      <Text style={[textStyles.Label, {marginBottom: -10}]}>
        What are some ingredients you love?
      </Text>
      <CustomTextInput
        value={lovedIngredientsDescription}
        onChangeText={(s) => {setLovedIngredientsDescription(s)}}
        variant="multiline-fixed"
        placeholder="I love eating..."
        keyboardType='default'
      />

      <Text style={[textStyles.Label, {marginBottom: -10}]}>
        What are some ingredients you hate?
      </Text>
      <CustomTextInput
        value={hatedIngredientsDescription}
        onChangeText={(s) => {setHatedIngredientsDescription(s)}}
        variant="multiline-fixed"
        placeholder="I'm not a fan of..."
        keyboardType='default'
      />

      <Text style={textStyles.Header}>
        Cooking
      </Text>

      <LabeledSlider
          enabled={true}
          label="Experience Level:"
          stepLabels={['Noob', 'Beginner', 'Average', 'Experienced', 'Pro']}
          index={cookingExperienceIndex}
          callBack={(selectedValue: string, index: number) => {
            setCookingExperience(selectedValue, index)
          }}
      />

      <KitchenToolsCheckList />

      <SimpleButton
        label="Save and Exit"
        onPress={() => {
          router.dismissTo("/account");
        }}
      />

    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#1f1f1f",
    },
    contentContainer: {
      flexDirection: "column",
      gap: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: '5%'
    },
});
