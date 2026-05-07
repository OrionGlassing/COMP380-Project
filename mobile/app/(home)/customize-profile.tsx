import { useEffect } from "react";
import { router } from "expo-router";
import { ScrollView, Text, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import LabeledSlider from "@/src/components/sliders/LabeledSlider";
import { useCustomizeProfileStore } from "@/utils/data-stores/customizeProfileStore";
import DietCheckList from "@/src/components/checklist/dietCheckList";
import CustomTextInput from "@/src/components/textbox/TextBox";
import KitchenToolsCheckList from "@/src/components/checklist/kitchenToolsCheckList";
import textstyles from "@/src/constants/textstyles";
import Button from "@/src/components/ui/Button";
import { theme } from "@/src/constants/theme";
import PageHeader from "@/src/components/ui/PageHeader";
//Cesar: have not centralized theme.
//Work in progress?

export default function CustomizeProfile() {
  const fetchUserProfile = useCustomizeProfileStore((state) => state.fetchUserProfile);
  const updateUserProfile = useCustomizeProfileStore((state) => state.updateUserProfile);

  useEffect(() => {
    fetchUserProfile();
    }, [fetchUserProfile]);

  //Import customize profile store data (one-by-one for efficient rendering)
  const dietDescription = useCustomizeProfileStore(
    (state) => state.dietDescription,
  );
  const setDietDescription = useCustomizeProfileStore(
    (state) => state.setDietDescription,
  );

  const allergyDescription = useCustomizeProfileStore(
    (state) => state.allergyDescription,
  );
  const setAllergyDescription = useCustomizeProfileStore(
    (state) => state.setAllergyDescription,
  );

  const lovedIngredientsDescription = useCustomizeProfileStore(
    (state) => state.lovedIngredientsDescription,
  );
  const setLovedIngredientsDescription = useCustomizeProfileStore(
    (state) => state.setLovedIngredientsDescription,
  );

  const hatedIngredientsDescription = useCustomizeProfileStore(
    (state) => state.hatedIngredientsDescription,
  );
  const setHatedIngredientsDescription = useCustomizeProfileStore(
    (state) => state.setHatedIngredientsDescription,
  );

  const cookingExperienceIndex = useCustomizeProfileStore(
    (state) => state.cookingExperienceIndex,
  );
  const setCookingExperience = useCustomizeProfileStore(
    (state) => state.setCookingExperience,
  );

  //ui
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {flex: 1, backgroundColor: theme.colors.background },
      ]}
    >
      <KeyboardAvoidingView behavior='padding'>
        <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false} keyboardShouldPersistTaps="handled">

          <PageHeader
          logoText={"Profile"}
          backButtonEnabled={false}
          profileButtonEnabled={false}
          transparent={false}
          />

          <View style={styles.contentContainer}>
          
            <Text style={textstyles.header}>Diet & Restrictions</Text>

            <DietCheckList />

            <Text style={[textstyles.subHeader, { marginBottom: -10, alignSelf: 'flex-start' }]}>
              Describe your diet:
            </Text>
            <CustomTextInput
              value={dietDescription}
              onChangeText={(s) => {
                setDietDescription(s);
              }}
              variant="multiline-fixed"
              placeholder="My diet consists of..."
              keyboardType="default"
              returnKeyType="done"
              submitBehavior="blurAndSubmit"
            />

            <Text style={[textstyles.subHeader, { marginBottom: -10, alignSelf: 'flex-start' }]}>
              List your food allergies:
            </Text>
            <CustomTextInput
              value={allergyDescription}
              onChangeText={(s) => {
                setAllergyDescription(s);
              }}
              variant="multiline-fixed"
              placeholder="Ex: Nuts, Shellfish, Milk..."
              keyboardType="default"
              returnKeyType="done"
              submitBehavior="blurAndSubmit"
            />

            <Text style={textstyles.header}>Food Preferences</Text>

            <Text style={[textstyles.subHeader, { marginBottom: -10, alignSelf: 'flex-start' }]}>
              What are some ingredients you love?
            </Text>
            <CustomTextInput
              value={lovedIngredientsDescription}
              onChangeText={(s) => {
                setLovedIngredientsDescription(s);
              }}
              variant="multiline-fixed"
              placeholder="I love eating..."
              keyboardType="default"
              returnKeyType="done"
              submitBehavior="blurAndSubmit"
            />

            <Text style={[textstyles.subHeader, { marginBottom: -10, alignSelf: 'flex-start' }]}>
              What are some ingredients you hate?
            </Text>
            <CustomTextInput
              value={hatedIngredientsDescription}
              onChangeText={(s) => {
                setHatedIngredientsDescription(s);
              }}
              variant="multiline-fixed"
              placeholder="I'm not a fan of..."
              keyboardType="default"
              returnKeyType="done"
              submitBehavior="blurAndSubmit"
            />

            <Text style={textstyles.header}>Cooking</Text>
            <LabeledSlider
              enabled={true}
              label="Experience Level:"
              stepLabels={["Noob", "Beginner", "Average", "Experienced", "Pro"]}
              index={cookingExperienceIndex}
              callBack={(selectedValue: string, index: number) => {
                setCookingExperience(selectedValue, index);
              }}
            />

            <KitchenToolsCheckList />

            <Button label="Save and Exit" onPress={async () => {
                try {
                    await updateUserProfile();
                    router.back();
                } catch (error) {
                    console.error(error);
                }
            }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      flexDirection: "column",
      gap: 20,
      //justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: '5%',
      paddingTop: '5%',
    },
});