import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateNewRecipeStore } from "@/utils/data-stores/createNewRecipeStore";
import LabeledSlider from "@/src/components/sliders/LabeledSlider";
import CustomTextInput from "@/src/components/textbox/TextBox";
import RecipeTypeCheckList from "@/src/components/checklist/recipeTypeCheckList";
import CuisineTypeCheckList from "@/src/components/checklist/cuisineTypeCheckList";
import SeasonTypeCheckList from "@/src/components/checklist/seasonTypeCheckList";
import textstyles from "@/src/constants/textstyles";
import { theme } from "@/src/constants/theme";
import Button from "@/src/components/ui/Button";
import PageHeader from "@/src/components/ui/PageHeader";

export default function CreateNewRecipe() {
  //Import customize profile store data (one-by-one for efficient rendering)
  const spiceLevelIndex = useCreateNewRecipeStore(
    (state) => state.spiceLevelIndex,
  );
  const setSpiceLevel = useCreateNewRecipeStore((state) => state.setSpiceLevel);

  const sweetnessLevelIndex = useCreateNewRecipeStore(
    (state) => state.sweetnessLevelIndex,
  );
  const setSweetnessLevel = useCreateNewRecipeStore(
    (state) => state.setSweetnessLevel,
  );

  const recipeComplexityIndex = useCreateNewRecipeStore(
    (state) => state.recipeComplexityIndex,
  );
  const setRecipeComplexity = useCreateNewRecipeStore(
    (state) => state.setRecipeComplexity,
  );

  const recipeTimeIndex = useCreateNewRecipeStore(
    (state) => state.recipeTimeIndex,
  );
  const setRecipeTime = useCreateNewRecipeStore((state) => state.setRecipeTime);

  const recipeDescription = useCreateNewRecipeStore(
    (state) => state.recipeDescription,
  );
  const setRecipeDescription = useCreateNewRecipeStore(
    (state) => state.setRecipeDescription,
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[{zIndex: 10}]}>
        <PageHeader
        logoText={"New Recipe"}
        backButtonEnabled={true}
        profileButtonEnabled={true}
        transparent={false}
        />
      </View>

      <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
        <ScrollView contentContainerStyle={[theme.container.content, {marginTop: 25}]} keyboardShouldPersistTaps="handled">

          <Text style={textstyles.header}>General Options</Text>

          <RecipeTypeCheckList />

          <CuisineTypeCheckList />

          <SeasonTypeCheckList />

          <LabeledSlider
            enabled={true}
            label="Spice Level"
            stepLabels={["None", "Very Low", "Mild", "Spicy", "Very Spicy"]}
            index={spiceLevelIndex}
            callBack={(selectedValue: string, index: number) => {
              setSpiceLevel(selectedValue, index);
            }}
          />

          <LabeledSlider
            enabled={true}
            label="Sweetness Level"
            stepLabels={["None", "Very Low", "Some", "Sweet", "Very Sweet"]}
            index={sweetnessLevelIndex}
            callBack={(selectedValue: string, index: number) => {
              setSweetnessLevel(selectedValue, index);
            }}
          />

          <LabeledSlider
            enabled={true}
            label="Recipe Complexity"
            stepLabels={["Simple", "Average", "Involved", "Complex"]}
            index={recipeComplexityIndex}
            callBack={(selectedValue: string, index: number) => {
              setRecipeComplexity(selectedValue, index);
            }}
          />

          <LabeledSlider
            enabled={true}
            label="Time Limit"
            stepLabels={["15 min", "30 min", "45 min", "1 hr", "No Limit"]}
            index={recipeTimeIndex}
            callBack={(selectedValue: string, index: number) => {
              setRecipeTime(selectedValue, index);
            }}
          />

          <Text style={textstyles.header}>Your Hankering</Text>

          <Text style={[textstyles.body, { marginBottom: -10 }]}>
            Describe what you're in the mood for:
          </Text>
          <CustomTextInput
            value={recipeDescription}
            onChangeText={(s) => {
              setRecipeDescription(s);
            }}
            variant="multiline-fixed"
            placeholder="I'm hungry for..."
            keyboardType="default"
            returnKeyType="done"
            submitBehavior="blurAndSubmit"
          />

          <View style={[{marginBottom: 100}]}>
          <Button
            label="Let's Cook!"
            onPress={() => {
              router.replace("/loading-recipe");
            }}
          />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
