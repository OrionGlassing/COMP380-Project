import { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { ScrollView, Text, KeyboardAvoidingView, StyleSheet, View, Modal } from "react-native";
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
import { useAuthStore } from "@/utils/authStore";
//Cesar: have not centralized theme.
//Work in progress?

export default function CustomizeProfile() {
  //Fetch the data for this page from the database
  //This wants to be called at the launch of the app, might be removed from here
  const fetchUserProfile = useCustomizeProfileStore((state) => state.fetchUserProfile);
  const submitUserProfile = useCustomizeProfileStore((state) => state.updateUserProfile);
  const hasCompletedTutorial = useAuthStore((state) => state.hasCompletedTutorial);
  const completeTutorial = useAuthStore((state) => state.completeTutorial);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  //Modal
  const [modalVisible, setModalVisible] = useState(!hasCompletedTutorial);

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

  //router
  const navigation = useNavigation();

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

          <View style={[{marginTop: 25, marginBottom: 100,}]}>
          <Button
            label="Save and Exit"
            onPress={() => {
              submitUserProfile();
              if (navigation.canGoBack()) {
                  router.back();
              } else {
                  router.replace('/Home');
              }
            }}
          />
          </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal 
        visible={modalVisible}
        onRequestClose={() => {
          completeTutorial();
          setModalVisible(false);
        }}
        animationType="fade"
      >

        <View style={styles.modalContainer}>
          <PageHeader
            logoText={"CoKitchen"}
            backButtonEnabled={false}
            profileButtonEnabled={false}
            transparent={true}
          />
          <View style={styles.modalTextBox}>
            <Text style={[textstyles.header, {marginTop: -10, marginBottom: 10}]} >
              Welcome to CoKitchen!
            </Text>
            <Text style={[textstyles.body, {textAlign: 'center'}]} >
              {"To get started, let's build your custom profile!\n\n"}
              {"Tell us about how you like to eat and cook so we can build an experience tailored to you!\n\n"}
              {"You can return to this page at any time. Find this page in your account settings."}
            </Text>
          </View>
          <Button
              label="Continue"
              onPress={() => {
                completeTutorial();
                setModalVisible(false);
              }}
              style={{backgroundColor: theme.colors.card}}
            />
        </View>

      </Modal>

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
    modalContainer: {
      flex: 1,
      paddingHorizontal: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    modalTextBox: {
      width: '100%',
      height: 250,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: 'white',
      backgroundColor: theme.colors.lightinput,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      marginBottom: 15,
    },
});